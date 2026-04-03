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

    // Debug mode — return raw response so we can inspect the structure
    if (debug) {
      return NextResponse.json({ httpStatus: res.status, raw });
    }

    if (!res.ok) {
      console.error(`[TimeToCargo] ${res.status}:`, JSON.stringify(raw).slice(0, 500));
      if (res.status === 404) return NextResponse.json({ error: "Container not found. Check the number and try again." }, { status: 404 });
      if (res.status === 429) return NextResponse.json({ error: "Rate limit reached. Please wait a moment and try again." }, { status: 429 });
      if (res.status === 401 || res.status === 403) return NextResponse.json({ error: "API authentication failed." }, { status: 502 });
      return NextResponse.json({ error: raw?.message ?? raw?.error ?? "Tracking service unavailable." }, { status: 502 });
    }

    return NextResponse.json(mapResponse(containerNumber, raw));
  } catch (err) {
    console.error("[TimeToCargo] fetch error:", err);
    return NextResponse.json({ error: "Failed to reach tracking service." }, { status: 503 });
  }
}

// ── Deep mapper — walks the entire response tree to find fields ───────────────

function mapResponse(containerNumber: string, raw: Record<string, unknown>): MappedTracking {
  // TimeToCargo may wrap data under various keys
  const top = raw as Record<string, unknown>;

  // Try to find the main data object
  const d: Record<string, unknown> =
    (top.data as Record<string, unknown>) ??
    (top.container as Record<string, unknown>) ??
    (top.result as Record<string, unknown>) ??
    (top.tracking as Record<string, unknown>) ??
    top;

  // Events — try every possible key at top level and nested
  const events: TTCEvent[] = (
    (top.events ?? top.tracking_events ?? top.route ?? top.movements ??
     d.events ?? d.tracking_events ?? d.route ?? d.movements ?? []) as TTCEvent[]
  );

  // Status
  const rawStatus = pick(d, top, ["status", "container_status", "current_status", "state"]) ??
    (events[0] as TTCEvent | undefined)?.event_type ?? "In Transit";
  const status = normalizeStatus(String(rawStatus));

  // Vessel
  const vessel = pick(d, top, ["vessel", "vessel_name", "ship_name", "ship", "vessel_imo_name"]) ?? "—";

  // Carrier / company
  const carrier = pick(d, top, ["company", "carrier", "shipping_line", "scac", "line", "carrier_name", "operator"]) ?? "—";

  // Ports
  const origin = pick(d, top, ["pol", "pol_name", "origin", "port_of_loading", "loading_port", "from_port", "departure_port"]) ?? "—";
  const destination = pick(d, top, ["pod", "pod_name", "destination", "port_of_discharge", "discharge_port", "to_port", "arrival_port"]) ?? "—";

  // ETA
  const etaRaw = pick(d, top, ["eta", "estimated_arrival", "estimated_time_of_arrival", "arrival_date", "ata"]);
  const eta = etaRaw ? formatDate(String(etaRaw)) : "—";

  // Current location from last event
  const lastEvent = events[0];
  const currentLocation = lastEvent ? buildLocation(lastEvent) :
    String(pick(d, top, ["current_location", "location", "current_port", "last_location"]) ?? "—");

  // Progress
  const progress = estimateProgress(status, events.length);

  // Timeline — newest first from API, reverse for chronological display
  const timeline: TimelineItem[] = [...events].reverse().map((e, i, arr) => ({
    status: String(e.description ?? e.event_type ?? e.status ?? e.event ?? e.activity ?? e.move_type ?? "Update"),
    location: buildLocation(e),
    date: formatDate(String(e.timestamp ?? e.date ?? e.event_date ?? e.actual_time ?? e.time ?? "")),
    time: formatTime(String(e.timestamp ?? e.date ?? e.event_date ?? e.actual_time ?? e.time ?? "")),
    done: i < arr.length - 1,
    active: i === arr.length - 1,
  }));

  if (timeline.length === 0) {
    timeline.push({
      status: "Tracking initiated",
      location: currentLocation !== "—" ? currentLocation : containerNumber,
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
    vessel: String(vessel),
    carrier: String(carrier),
    origin: String(origin),
    destination: String(destination),
    currentLocation: String(currentLocation),
    eta,
    progress,
    timeline,
  };
}

// Pick first non-empty value from multiple possible keys across two objects
function pick(primary: Record<string, unknown>, secondary: Record<string, unknown>, keys: string[]): string | null {
  for (const k of keys) {
    const v = primary[k] ?? secondary[k];
    if (v !== null && v !== undefined && String(v).trim() !== "" && String(v) !== "null" && String(v) !== "undefined") {
      return String(v);
    }
  }
  return null;
}

function buildLocation(e: TTCEvent): string {
  if (!e) return "—";
  // Nested location object
  if (e.location && typeof e.location === "object") {
    const loc = e.location as Record<string, unknown>;
    const parts = [loc.name ?? loc.port_name ?? loc.city, loc.country ?? loc.country_code].filter(v => v && String(v).trim());
    if (parts.length) return parts.map(String).join(", ");
  }
  // Flat string location
  const flat = e.location_name ?? e.port ?? e.place ?? e.port_name ?? e.facility ??
    (typeof e.location === "string" ? e.location : null);
  if (flat && String(flat).trim()) return String(flat);
  return "—";
}

function normalizeStatus(s: string): string {
  const lower = s.toLowerCase();
  if (lower.includes("transit") || lower.includes("sailing") || lower.includes("vessel") || lower.includes("departed") || lower.includes("sea")) return "In Transit";
  if (lower.includes("customs") || lower.includes("hold") || lower.includes("inspection") || lower.includes("exam")) return "Customs Hold";
  if (lower.includes("arriv") || lower.includes("discharg") || lower.includes("delivered") || lower.includes("delivery") || lower.includes("empty return")) return "Arrived";
  if (lower.includes("book") || lower.includes("loaded") || lower.includes("gate in") || lower.includes("stuffed") || lower.includes("picked up")) return "Booked";
  return s || "In Transit";
}

function estimateProgress(status: string, eventCount: number): number {
  if (status === "Arrived") return 100;
  if (status === "Booked") return Math.min(5 + eventCount * 3, 15);
  if (status === "Customs Hold") return 85;
  return Math.min(20 + eventCount * 7, 90);
}

function formatDate(iso: string): string {
  if (!iso || iso === "—" || iso === "null" || iso === "undefined") return "—";
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch { return iso; }
}

function formatTime(iso: string): string {
  if (!iso || iso === "—" || iso === "null" || iso === "undefined") return "—";
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
  activity?: string;
  move_type?: string;
  timestamp?: string;
  date?: string;
  event_date?: string;
  actual_time?: string;
  time?: string;
  location?: unknown;
  location_name?: string;
  port?: string;
  port_name?: string;
  place?: string;
  facility?: string;
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
