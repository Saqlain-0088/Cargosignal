import { Shipment, Container, Alert, Port, CustomsEvent, LogisticsCost, User, Role, CompanyTenant } from "../types";

export const shipments: Shipment[] = [
  {
    id: "SH-001",
    trackingNumber: "CSL123456789",
    origin: "Shanghai, China",
    destination: "Los Angeles, USA",
    status: "in_transit",
    estimatedArrival: "2026-03-25T14:00:00Z",
    cargoType: "Electronics",
    weight: 12500,
  },
  {
    id: "SH-002",
    trackingNumber: "CSL987654321",
    origin: "Rotterdam, Netherlands",
    destination: "Hamburg, Germany",
    status: "delivered",
    estimatedArrival: "2026-03-15T09:30:00Z",
    cargoType: "Automotive Parts",
    weight: 8200,
  },
  {
    id: "SH-003",
    trackingNumber: "CSL456123789",
    origin: "Singapore",
    destination: "Dubai, UAE",
    status: "customs_hold",
    estimatedArrival: "2026-03-28T18:00:00Z",
    cargoType: "Pharmaceuticals",
    weight: 3400,
  },
];

export const containers: Container[] = [
  {
    id: "CN-001",
    shipmentId: "SH-001",
    containerNumber: "MSKU5234123",
    size: "40ft",
    type: "standard",
    currentLocation: "Mid-Pacific Ocean",
  },
  {
    id: "CN-002",
    shipmentId: "SH-003",
    containerNumber: "ZIMU8823114",
    size: "20ft",
    type: "reefer",
    currentLocation: "Singapore Port",
    temperature: -18,
    humidity: 45,
  },
];

export const alerts: Alert[] = [
  {
    id: "AL-001",
    type: "customs",
    severity: "high",
    message: "Customs documentation incomplete for Shipment SH-003",
    timestamp: "2026-03-16T10:00:00Z",
    relatedId: "SH-003",
  },
  {
    id: "AL-002",
    type: "delay",
    severity: "medium",
    message: "Weather delay at Shanghai Port affecting SH-001",
    timestamp: "2026-03-16T08:30:00Z",
    relatedId: "SH-001",
  },
];

export const ports: Port[] = [
  {
    id: "P-001",
    name: "Port of Shanghai",
    code: "CNSHA",
    country: "China",
    coordinates: { lat: 31.2304, lng: 121.4737 },
  },
  {
    id: "P-002",
    name: "Port of Los Angeles",
    code: "USLAX",
    country: "USA",
    coordinates: { lat: 33.7701, lng: -118.2437 },
  },
];

export const customsEvents: CustomsEvent[] = [
  {
    id: "CE-001",
    shipmentId: "SH-003",
    event: "Entry Filed",
    status: "processing",
    timestamp: "2026-03-16T09:00:00Z",
    location: "Singapore",
  },
];

export const logisticsCosts: LogisticsCost[] = [
  { id: "LC-001", shipmentId: "SH-001", category: "freight", amount: 4500, currency: "USD", status: "paid", date: "2026-03-10" },
  { id: "LC-002", shipmentId: "SH-001", category: "insurance", amount: 250, currency: "USD", status: "pending", date: "2026-03-11" },
  { id: "LC-003", shipmentId: "SH-001", category: "customs", amount: 800, currency: "USD", status: "paid", date: "2026-03-12" },
  { id: "LC-004", shipmentId: "SH-002", category: "freight", amount: 3200, currency: "USD", status: "paid", date: "2026-02-15" },
  { id: "LC-005", shipmentId: "SH-002", category: "storage", amount: 450, currency: "USD", status: "paid", date: "2026-02-18" },
  { id: "LC-006", shipmentId: "SH-003", category: "freight", amount: 5100, currency: "USD", status: "pending", date: "2026-03-20" },
  { id: "LC-007", shipmentId: "SH-003", category: "customs", amount: 1200, currency: "USD", status: "pending", date: "2026-03-22" },
  { id: "LC-008", shipmentId: "SH-003", category: "insurance", amount: 300, currency: "USD", status: "pending", date: "2026-03-22" },
];

export const users: User[] = [
  { id: "U-001", name: "Saqlain Shah", email: "saqlain@cargosignal.com", role: "Administrator", status: "active", lastLogin: "2026-03-16T10:00:00Z" },
  { id: "U-002", name: "John Doe", email: "john@cargosignal.com", role: "Logistics Manager", status: "active", lastLogin: "2026-03-15T09:30:00Z" },
  { id: "U-003", name: "Jane Smith", email: "jane@cargosignal.com", role: "Viewer", status: "active", lastLogin: "2026-03-14T18:00:00Z" },
  { id: "U-004", name: "Mike Johnson", email: "mike@cargosignal.com", role: "Billing", status: "invited" },
];

export const roles: Role[] = [
  { id: "R-001", name: "Administrator", description: "Full access to all modules and settings.", permissions: ["all"] },
  { id: "R-002", name: "Logistics Manager", description: "Manage shipments, containers, and alerts.", permissions: ["shipments.manage", "tracking.view", "alerts.manage"] },
  { id: "R-003", name: "Billing", description: "Access to logistics costs and invoices.", permissions: ["costs.view", "costs.manage"] },
  { id: "R-004", name: "Viewer", description: "Read-only access to tracking and dashboards.", permissions: ["view_only"] },
];

export const companyTenants: CompanyTenant[] = [
  { 
    id: "COMP-001", 
    name: "Global Logistics Inc.", 
    industry: "Freight Forwarding", 
    status: "active", 
    activeShipments: 45, 
    totalSpend: 245000, 
    userCount: 12, 
    joinDate: "2025-01-10" 
  },
  { 
    id: "COMP-002", 
    name: "TechTronix Europe", 
    industry: "Electronics", 
    status: "active", 
    activeShipments: 112, 
    totalSpend: 890000, 
    userCount: 28, 
    joinDate: "2025-03-15" 
  },
  { 
    id: "COMP-003", 
    name: "Nordic Fresh Foods", 
    industry: "Food & Beverage", 
    status: "trial", 
    activeShipments: 8, 
    totalSpend: 12000, 
    userCount: 4, 
    joinDate: "2026-03-01" 
  },
  { 
    id: "COMP-004", 
    name: "South Star Mining", 
    industry: "Resources", 
    status: "suspended", 
    activeShipments: 0, 
    totalSpend: 45000, 
    userCount: 6, 
    joinDate: "2025-06-22" 
  },
];
