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

const MOCK_ROUTES = [
  {
    origin: "SHANGHAI, CN", destination: "LOS ANGELES, US",
    vessel: "MAERSK HOUSTON", carrier: "Maersk Line",
    location: "Pacific Ocean (35°N, 160°W)", eta: "Mar 28, 2026", progress: 72,
    status: "In Transit" as const,
  },
  {
    origin: "DUBAI, UAE", destination: "HAMBURG, DE",
    vessel: "MSC OSCAR", carrier: "MSC",
    location: "Arabian Sea (18°N, 62°E)", eta: "Apr 02, 2026", progress: 45,
    status: "Customs Hold" as const,
  },
  {
    origin: "SINGAPORE, SG", destination: "ROTTERDAM, NL",
    vessel: "CMA CGM MARCO POLO", carrier: "CMA CGM",
    location: "Indian Ocean (5°S, 80°E)", eta: "Apr 10, 2026", progress: 30,
    status: "In Transit" as const,
  },
  {
    origin: "MUMBAI, IN", destination: "NEW YORK, US",
    vessel: "EVER GIVEN", carrier: "Evergreen",
    location: "Suez Canal, Egypt", eta: "Mar 25, 2026", progress: 88,
    status: "In Transit" as const,
  },
];

export async function fetchShipmentData(containerId: string): Promise<ShipmentData> {
  // Simulate network delay
  await new Promise(r => setTimeout(r, 1200));

  const seed = containerId.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % MOCK_ROUTES.length;
  const route = MOCK_ROUTES[seed];
  const id = `SHP-${containerId.replace(/[^A-Z0-9]/g, "").slice(0, 8)}`;

  return {
    id,
    containerId: containerId.toUpperCase(),
    status: route.status,
    vessel: route.vessel,
    carrier: route.carrier,
    origin: route.origin,
    destination: route.destination,
    currentLocation: route.location,
    eta: route.eta,
    progress: route.progress,
    timeline: [
      { status: "Booking Confirmed", location: route.origin, date: "Mar 05, 2026", time: "10:00 AM", done: true, active: false },
      { status: "Container Loaded", location: route.origin, date: "Mar 10, 2026", time: "08:15 AM", done: true, active: false },
      { status: "Departed Port", location: route.origin, date: "Mar 12, 2026", time: "02:20 PM", done: true, active: false },
      { status: "Customs Cleared", location: `${route.origin} Customs`, date: "Mar 13, 2026", time: "11:00 AM", done: (route.status as string) !== "Customs Hold", active: (route.status as string) === "Customs Hold" },
      { status: "In Transit", location: route.location, date: "Mar 20, 2026", time: "09:45 AM", done: false, active: (route.status as string) === "In Transit" },
      { status: "Arrived at Destination", location: route.destination, date: route.eta, time: "ETA", done: (route.status as string) === "Arrived", active: false },
    ],
  };
}

// ── Mock "save to DB" ─────────────────────────────────────────────────────────

export async function saveShipmentToUser(shipment: ShipmentData, userId: string): Promise<string> {
  // In production: POST /api/shipments with shipment data + userId
  await new Promise(r => setTimeout(r, 300));
  // Return a mock shipment ID for routing
  return shipment.id;
}
