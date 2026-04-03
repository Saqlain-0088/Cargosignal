import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const BASE = "https://tracking.timetocargo.com/v1";
const API_KEY = process.env.TIMETOCARGO_API_KEY!;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const containerNumber = searchParams.get("container_number")?.trim().toUpperCase();

  if (!containerNumber) {
    return NextResponse.json({ error: "container_number is required" }, { status: 400 });
  }

  const valid = /^[A-Z]{4}\d{7}$/.test(containerNumber);
  if (!valid) {
    return NextResponse.json(
      { error: "Invalid container number format. Expected 4 letters + 7 digits (e.g. MSDU8368827)" },
      { status: 422 }
    );
  }

  try {
    const url = `${BASE}/container?api_key=${API_KEY}&company=AUTO&container_number=${containerNumber}`;
    const res = await fetch(url, { cache: "no-store" });
    const raw = await res.json();

    if (!res.ok || !raw.success) {
      if (res.status === 404) return NextResponse.json({ error: "Container not found." }, { status: 404 });
      if (res.status === 429) return NextResponse.json({ error: "Rate limit reached. Please wait and try again." }, { status: 429 });
      return NextResponse.json({ error: raw?.status_description ?? "Tracking service unavailable." }, { status: 502 });
    }

    return NextResponse.json(mapResponse(containerNumber, raw.data));
  } catch (err) {
    console.error("[TimeToCargo] error:", err);
    return NextResponse.json({ error: "Failed to reach tracking service." }, { status: 503 });
  }
}

// ── Precise mapper based on actual API response structure ─────────────────────
// Response shape: raw.data = { summary, locations[], terminals[], container, shipment_status, tracking_metadata }

interface TTCLocation {
  id: number;
  name: string;
  state: string | null;
  terminal: string | null;
  country: string | null;
  country_iso_code: string | null;
  lat: number | null;
  lng: number | null;
  locode: string | null;
}

interface TTCTerminal {
  id: number;
  name: string;
}

interface TTCEvent {
  location: number; // index into locations[]
  terminal: number | null;
  status: string;
  status_code: string;
  date: string;
  actual: boolean;
  vessel: string | null;
  voyage: string | null;
}

interface TTCData {
  summary: {
    origin: { location: number; terminal: number | null; date: string | null };
    pol: { location: number; terminal: number | null; date: string | null };
    pod: { location: number; terminal: number | null; date: string | null };
    destination: { location: number; terminal: number | null; date: string | null };
    company: { name: string; full_name: string; url: string; scacs: string[] };
  };
  locations: TTCLocation[];
  terminals: TTCTerminal[];
  container: {
    number: string;
    type: string;
    events: TTCEvent[];
  };
  route_info: unknown;
  shipment_status: string;
  tracking_metadata: {
    end_date: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
}

function getLocation(locations: TTCLocation[], id: number): string {
  const loc = locations.find(l => l.id === id);
  if (!loc) return "—";
  const parts = [loc.name, loc.country].filter(Boolean);
  return parts.join(", ") || "—";
}

function normalizeStatus(s: string): string {
  const lower = s.toLowerCase();
  if (lower.includes("in_transit") || lower.includes("transit") || lower.includes("sailing") || lower.includes("vessel departure") || lower.includes("vdl")) return "In Transit";
  if (lower.includes("customs") || lower.includes("hold") || lower.includes("exam")) return "Customs Hold";
  if (lower.includes("arriv") || lower.includes("discharg") || lower.includes("delivered") || lower.includes("vad") || lower.includes("pod")) return "Arrived";
  if (lower.includes("loaded") || lower.includes("cll") || lower.includes("gate in") || lower.includes("book")) return "Booked";
  return "In Transit";
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch { return "—"; }
}

function formatTime(iso: string | null): string {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  } catch { return "—"; }
}

function estimateProgress(status: string, events: TTCEvent[]): number {
  if (status === "Arrived") return 100;
  if (status === "Booked") return 10;
  if (status === "Customs Hold") return 85;
  // In Transit: use actual events vs total
  const actualCount = events.filter(e => e.actual).length;
  const total = events.length;
  if (total === 0) return 20;
  return Math.min(Math.round((actualCount / total) * 80) + 15, 90);
}

function mapResponse(containerNumber: string, data: TTCData): MappedTracking {
  const { summary, locations, container, shipment_status } = data;

  // Carrier
  const carrier = summary.company?.full_name ?? summary.company?.name ?? "—";

  // Origin / Destination ports
  const origin = getLocation(locations, summary.pol?.location ?? summary.origin?.location ?? 0);
  const destination = getLocation(locations, summary.pod?.location ?? summary.destination?.location ?? 1);

  // ETA from POD date
  const eta = formatDate(summary.pod?.date ?? null);

  // Status
  const status = normalizeStatus(shipment_status ?? "IN_TRANSIT");

  // Vessel from most recent event that has a vessel
  const vesselEvent = container.events.find(e => e.vessel);
  const vessel = vesselEvent?.vessel ?? "—";
  const voyage = vesselEvent?.voyage ?? "";

  // Current location — most recent actual event
  const lastActual = container.events.find(e => e.actual);
  const currentLocation = lastActual ? getLocation(locations, lastActual.location) : getLocation(locations, summary.pol?.location ?? 0);

  // Progress
  const progress = estimateProgress(status, container.events);

  // Timeline — API returns newest first, reverse for chronological display
  const timeline = [...container.events].reverse().map((e, i, arr) => {
    const locName = getLocation(locations, e.location);
    const isLast = i === arr.length - 1;
    const isActual = e.actual;
    return {
      status: e.status,
      location: locName,
      date: formatDate(e.date),
      time: formatTime(e.date),
      vessel: e.vessel ?? undefined,
      voyage: e.voyage ?? undefined,
      statusCode: e.status_code,
      done: isActual && !isLast,
      active: isLast || (!isActual && i === arr.findIndex(ev => !ev.actual)),
    };
  });

  return {
    id: containerNumber,
    containerId: containerNumber,
    containerType: container.type,
    status,
    vessel,
    voyage,
    carrier,
    origin,
    destination,
    currentLocation,
    eta,
    progress,
    timeline,
  };
}

export interface MappedTracking {
  id: string;
  containerId: string;
  containerType: string;
  status: string;
  vessel: string;
  voyage: string;
  carrier: string;
  origin: string;
  destination: string;
  currentLocation: string;
  eta: string;
  progress: number;
  timeline: {
    status: string;
    location: string;
    date: string;
    time: string;
    vessel?: string;
    voyage?: string;
    statusCode?: string;
    done: boolean;
    active: boolean;
  }[];
}
