/**
 * Centralized tracking service.
 * Handles pending tracking state and mock shipment data generation.
 */

const PENDING_KEY = "pendingTracking";

// ── Pending tracking (localStorage) ─────────────────────────────────────────

export function setPendingTracking(containerId: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(PENDING_KEY, containerId.trim().toUpperCase());
  }
}

export function getPendingTracking(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(PENDING_KEY);
}

export function clearPendingTracking() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(PENDING_KEY);
  }
}

// ── Mock shipment data ────────────────────────────────────────────────────────

export interface ShipmentData {
  id: string;
  containerId: string;
  status: "In Transit" | "Customs Hold" | "Arrived" | "Departed" | "Booked";
  vessel: string;
  origin: string;
  destination: string;
  currentLocation: string;
  eta: string;
  progress: number;
  carrier: string;
  timeline: TimelineEvent[];
}

export interface TimelineEvent {
  status: string;
  location: string;
  date: string;
  time: string;
  done: boolean;
  active: boolean;
}

// ── Real API tracking ─────────────────────────────────────────────────────────

export async function fetchShipmentData(containerId: string): Promise<ShipmentData> {
  const res = await fetch(`/api/track?container_number=${encodeURIComponent(containerId.trim().toUpperCase())}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error ?? "Tracking failed");
  }

  // Map MappedTracking → ShipmentData
  return {
    id: `SHP-${containerId.replace(/[^A-Z0-9]/gi, "").slice(0, 8).toUpperCase()}`,
    containerId: containerId.toUpperCase(),
    status: data.status as ShipmentData["status"],
    vessel: data.vessel,
    carrier: data.carrier ?? "—",
    origin: data.origin,
    destination: data.destination,
    currentLocation: data.currentLocation,
    eta: data.eta,
    progress: data.progress,
    timeline: data.timeline,
  };
}

// ── Mock "save to DB" ─────────────────────────────────────────────────────────

export async function saveShipmentToUser(shipment: ShipmentData, userId: string): Promise<string> {
  // In production: POST /api/shipments with shipment data + userId
  await new Promise(r => setTimeout(r, 300));
  // Return a mock shipment ID for routing
  return shipment.id;
}
