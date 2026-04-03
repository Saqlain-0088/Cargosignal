import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const BASE = "https://tracking.timetocargo.com/v1";
const API_KEY = process.env.TIMETOCARGO_API_KEY!;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const containerNumber = searchParams.get("container_number")?.trim().toUpperCase();
  const debug = searchParams.get("debug") === "1";

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
    const res = await fetch(url, {
      headers: { "Accept": "application/json" },
      cache: "no-store",
    });

    const raw = await res.json();

    // Return raw for debugging
    if (debug) {
      return NextResponse.json({ raw, status: res.status });
    }

    if (!res.ok) {
      console.error(`[TimeToCargo] ${res.status}:`, JSON.stringify(raw));
      if (res.status === 404) return NextResponse.json({ error: "Container not found." }, { status: 404 });
      if (res.status === 429) return NextResponse.json({ error: "Rate limit reached. Please wait and try again." }, { status: 429 });
      return NextResponse.json({ error: raw?.message ?? "Tracking service unavailable." }, { status: 502 });
    }

    console.log("[TimeToCargo] raw keys:", Object.keys(raw));
    return NextResponse.json(mapResponse(containerNumber, raw));
  } catch (err) {
    console.error("[TimeToCargo] fetch error:", err);
    return NextResponse.json({ error: "Failed to reach tracking service." }, { status: 503 });
  }
}

// ── Mapper — handles multiple possible response shapes from TimeToCargo ───────

function mapResponse(containerNumber: string, raw: Record<string, unknown>): MappedTracking {
  // TimeToCargo v1 actual response shape (based on their docs):
  // { container_number, company, status, vessel, voyage, pol, pod, eta, events: [...] }
  // OR nested under a "data" key
  const d = (raw.data ?? raw) as Record<string, unknown>;

  // Events array — try multiple possible keys
  const events: TTCEvent[] = (
    (d.events ?? d.tracking_events ?? d.route ?? raw.events ?? []) as TTCEvent[]
  );

  // Status
  const rawStatus = str(d.status ?? d.container_status ?? (events[0] as TTCEvent | undefined)?.event_type ?? "In Transit");
  const status = normalizeStatus(rawStatus);

  // Vessel / carrier
  const vessel = str(d.vessel ?? d.vessel_name ?? d.ship_name ?? "—");
  const carrier = str(d.company ?? d.carrier ?? d.shipping_line ?? d.scac ?? "—");

  // Ports
  const origin = str(d.pol ?? d.pol_name ?? d.origin ?? d.port_of_loading ?? "—");
  const destination = str(d.pod ?? d.pod_name ?? d.destination ?? d.port_of_discharge ?? "—");

  // ETA
  const eta = d.eta ? formatDate(str(d.eta)) : "—";

  // Current location — last event location
  const lastEvent = events[0];
  const currentLocation = lastEvent
    ? buildLocation(lastEvent)
    : str(d.current_location ?? d.location ?? "—");

  // Progress
  const progress = estimateProgress(status, events.length);

  // Timeline — TimeToCargo returns newest first, reverse for chronological display
  const timeline: TimelineItem[] = [...events].reverse().map((e, i, arr) => ({
    status: str(e.description ?? e.event_type ?? e.status ?? e.event ?? "Update"),
    location: buildLocation(e),
    date: formatDate(str(e.timestamp ?? e.date ?? e.event_date ?? "")),
    time: formatTime(str(e.timestamp ?? e.date ?? e.event_date ?? "")),
    done: i < arr.length - 1,
    active: i === arr.length - 1,
  }));

  if (timeline.length === 0) {
    timeline.push({
      status: "Tracking initiated",
      location: currentLocation || "—",
      date: formatDate(new Date().toISOString()),
      time: formatTime(new Date().toISOString()),
      done: false,
      active: true,
    });
  }

  return {
    id: containerNumber,
    containerId: containerNumber,
    status,
    vessel,
    carrier,
    origin,
    destination,
    currentLocation: currentLocation || "—",
    eta,
    progress,
    timeline,
  };
}

function buildLocation(e: TTCEvent): string {
  if (!e) return "—";
  // Try nested location object first
  if (e.location && typeof e.location === "object") {
    const loc = e.location as Record<string, unknown>;
    return [loc.name, loc.city, loc.country].filter(Boolean).join(", ") || "—";
  }
  // Try flat fields
  return str(
    (e as Record<string, unknown>).location_name ??
    (e as Record<string, unknown>).port ??
    (e as Record<string, unknown>).place ??
    (e as Record<string, unknown>).location ??
    "—"
  );
}

function str(v: unknown): string {
  if (v === null || v === undefined) return "";
  return String(v);
}

function normalizeStatus(s: string): string {
  const lower = s.toLowerCase();
  if (lower.includes("transit") || lower.includes("sailing") || lower.includes("departed") || lower.includes("vessel")) return "In Transit";
  if (lower.includes("customs") || lower.includes("hold") || lower.includes("inspection")) return "Customs Hold";
  if (lower.includes("arriv") || lower.includes("discharg") || lower.includes("delivered") || lower.includes("delivery")) return "Arrived";
  if (lower.includes("book") || lower.includes("loaded") || lower.includes("gate in") || lower.includes("stuffed")) return "Booked";
  return s || "In Transit";
}

function estimateProgress(status: string, eventCount: number): number {
  if (status === "Arrived") return 100;
  if (status === "Booked") return Math.min(5 + eventCount * 3, 15);
  if (status === "Customs Hold") return 85;
  return Math.min(20 + eventCount * 7, 90);
}

function formatDate(iso: string): string {
  if (!iso || iso === "—") return "—";
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch { return iso; }
}

function formatTime(iso: string): string {
  if (!iso || iso === "—") return "—";
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  } catch { return "—"; }
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface TTCEvent {
  event_type?: string;
  description?: string;
  status?: string;
  event?: string;
  timestamp?: string;
  date?: string;
  event_date?: string;
  location?: unknown;
  location_name?: string;
  port?: string;
  place?: string;
  [key: string]: unknown;
}

interface TimelineItem {
  status: string;
  location: string;
  date: string;
  time: string;
  done: boolean;
  active: boolean;
}

export interface MappedTracking {
  id: string;
  containerId: string;
  status: string;
  vessel: string;
  carrier: string;
  origin: string;
  destination: string;
  currentLocation: string;
  eta: string;
  progress: number;
  timeline: TimelineItem[];
}
