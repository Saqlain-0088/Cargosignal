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

  // Basic format validation: 4 letters + 7 digits (e.g. MSDU8368827)
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
      next: { revalidate: 60 }, // cache 60s to respect rate limits
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`[TimeToCargo] ${res.status}:`, text);
      if (res.status === 404) {
        return NextResponse.json({ error: "Container not found. Check the number and try again." }, { status: 404 });
      }
      if (res.status === 429) {
        return NextResponse.json({ error: "Rate limit reached. Please wait a moment and try again." }, { status: 429 });
      }
      return NextResponse.json({ error: "Tracking service unavailable. Please try again later." }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json(mapResponse(containerNumber, data));
  } catch (err) {
    console.error("[TimeToCargo] fetch error:", err);
    return NextResponse.json({ error: "Failed to reach tracking service." }, { status: 503 });
  }
}

// ── Map TimeToCargo response → our TrackingResult shape ──────────────────────

function mapResponse(containerNumber: string, raw: TTCResponse): MappedTracking {
  const info = raw.container ?? raw;
  const events: TTCEvent[] = raw.events ?? raw.tracking_events ?? [];

  // Derive status
  const lastEvent = events[0];
  const rawStatus = info.status ?? lastEvent?.event_type ?? "In Transit";
  const status = normalizeStatus(rawStatus);

  // Build timeline from events (most recent first → reverse for display)
  const timeline = [...events].reverse().map((e, i, arr) => ({
    status: e.description ?? e.event_type ?? "Update",
    location: [e.location?.name, e.location?.country].filter(Boolean).join(", ") || "—",
    date: formatDate(e.timestamp ?? e.date),
    time: formatTime(e.timestamp ?? e.date),
    done: i < arr.length - 1,
    active: i === arr.length - 1,
  }));

  // If no events, add a placeholder
  if (timeline.length === 0) {
    timeline.push({
      status: "Tracking initiated",
      location: "—",
      date: formatDate(new Date().toISOString()),
      time: formatTime(new Date().toISOString()),
      done: false,
      active: true,
    });
  }

  const origin = info.pol ?? info.origin ?? info.port_of_loading ?? events[events.length - 1]?.location?.name ?? "—";
  const destination = info.pod ?? info.destination ?? info.port_of_discharge ?? events[0]?.location?.name ?? "—";
  const eta = info.eta ? formatDate(info.eta) : "—";
  const vessel = info.vessel ?? info.vessel_name ?? "—";
  const carrier = info.carrier ?? info.shipping_line ?? "—";
  const currentLocation = lastEvent
    ? [lastEvent.location?.name, lastEvent.location?.country].filter(Boolean).join(", ")
    : "—";

  // Estimate progress from events
  const progress = estimateProgress(status, events.length);

  return {
    id: containerNumber,
    containerId: containerNumber,
    status,
    vessel,
    carrier,
    origin,
    destination,
    currentLocation,
    eta,
    progress,
    timeline,
    raw, // pass through for debugging
  };
}

function normalizeStatus(s: string): string {
  const lower = s.toLowerCase();
  if (lower.includes("transit") || lower.includes("sailing") || lower.includes("departed")) return "In Transit";
  if (lower.includes("customs") || lower.includes("hold")) return "Customs Hold";
  if (lower.includes("arriv") || lower.includes("discharg") || lower.includes("delivered")) return "Arrived";
  if (lower.includes("book") || lower.includes("loaded") || lower.includes("gate in")) return "Booked";
  return s;
}

function estimateProgress(status: string, eventCount: number): number {
  if (status === "Arrived") return 100;
  if (status === "Booked") return 5;
  if (status === "Customs Hold") return 85;
  // In Transit: estimate from event count
  return Math.min(20 + eventCount * 8, 90);
}

function formatDate(iso?: string): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch { return iso; }
}

function formatTime(iso?: string): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  } catch { return "—"; }
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface TTCLocation { name?: string; country?: string; locode?: string; }
interface TTCEvent {
  event_type?: string;
  description?: string;
  timestamp?: string;
  date?: string;
  location?: TTCLocation;
}
interface TTCResponse {
  container?: Record<string, string>;
  events?: TTCEvent[];
  tracking_events?: TTCEvent[];
  status?: string;
  pol?: string;
  pod?: string;
  origin?: string;
  destination?: string;
  port_of_loading?: string;
  port_of_discharge?: string;
  eta?: string;
  vessel?: string;
  vessel_name?: string;
  carrier?: string;
  shipping_line?: string;
  [key: string]: unknown;
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
  timeline: { status: string; location: string; date: string; time: string; done: boolean; active: boolean }[];
  raw?: unknown;
}
