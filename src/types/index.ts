export type ShipmentStatus = "pending" | "in_transit" | "delivered" | "delayed" | "customs_hold";

export interface Shipment {
  id: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  estimatedArrival: string;
  cargoType: string;
  weight: number;
}

export interface Container {
  id: string;
  shipmentId: string;
  containerNumber: string;
  size: "20ft" | "40ft" | "45ft";
  type: "standard" | "reefer" | "open_top";
  currentLocation: string;
  temperature?: number;
  humidity?: number;
}

export interface Alert {
  id: string;
  type: "delay" | "customs" | "temperature" | "route_deviation" | "routing";
  severity: "low" | "medium" | "high" | "critical";
  message: string;
  timestamp: string;
  relatedId?: string; // Shipment or Container ID
}

export interface Port {
  id: string;
  name: string;
  code: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export type CustomsStatus = "submitted" | "processing" | "cleared" | "inspection_required" | "rejected";

export interface CustomsEvent {
  id: string;
  shipmentId: string;
  event: string;
  status: CustomsStatus;
  timestamp: string;
  location: string;
  notes?: string;
}

export interface LogisticsCost {
  id: string;
  shipmentId: string;
  category: "freight" | "customs" | "insurance" | "storage" | "other";
  amount: number;
  currency: string;
  status: "pending" | "paid";
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "invited" | "suspended";
  lastLogin?: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export interface CompanyTenant {
  id: string;
  name: string;
  industry: string;
  status: "active" | "suspended" | "trial";
  activeShipments: number;
  totalSpend: number;
  userCount: number;
  joinDate: string;
  logo?: string;
}
