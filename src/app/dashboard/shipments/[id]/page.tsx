"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Package, 
  Truck, 
  Ship, 
  Clock, 
  CheckCircle2,
  AlertTriangle,
  FileText,
  Anchor,
  TrendingUp,
  ArrowRight,
  Activity,
  Layers,
  ShieldCheck,
  Globe,
  ThermometerSnowflake
} from "lucide-react";
import { shipments, containers, alerts, customsEvents } from "@/mock";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function ShipmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [activeView, setActiveView] = useState<'details' | 'bl'>('details');

  const shipment = shipments.find(s => s.id === id);
  const shipmentContainers = containers.filter(c => c.shipmentId === id);
  const shipmentAlerts = alerts.filter(a => a.relatedId === id);
  const shipmentEvents = customsEvents.filter(e => e.shipmentId === id);

  if (!shipment) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-base">
          <h2 className="text-2xl font-bold text-brand-primary">Shipment not found</h2>
          <Button className="bg-brand-accent text-white" onClick={() => router.push("/dashboard/shipments")}>
            Back to Global Exports
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge variant="success" className="font-bold uppercase text-[11px] px-4 py-1.5 shadow-sm">Delivered</Badge>;
      case "in_transit":
        return <Badge variant="info" className="font-bold uppercase text-[11px] px-4 py-1.5 shadow-sm">In Transit</Badge>;
      case "delayed":
        return <Badge variant="warning" className="font-bold uppercase text-[11px] px-4 py-1.5 shadow-sm">Delayed</Badge>;
      case "customs_hold":
        return <Badge variant="error" className="font-bold uppercase text-[11px] px-4 py-1.5 shadow-sm">Customs Hold</Badge>;
      default:
        return <Badge variant="default" className="font-bold uppercase text-[11px] px-4 py-1.5 shadow-sm">Pending</Badge>;
    }
  };

  // Mock timeline events refined
  const timelineEvents = [
    { title: "Booking Confirmed", date: "2026-03-05T10:00:00Z", status: "completed", desc: "Shipment booking has been confirmed by carrier." },
    { title: "Picked Up", date: "2026-03-06T14:30:00Z", status: "completed", desc: "Container picked up from warehouse." },
    { title: "Loaded on Vessel", date: "2026-03-08T09:00:00Z", status: "completed", desc: "Vessel: EVER GIVEN | Voyage: 042W" },
    { title: "In Transit", date: "2026-03-10T00:00:00Z", status: "current", desc: "Crossing Pacific Ocean." },
    { title: "Arrive at Destination Port", date: "2026-03-25T00:00:00Z", status: "upcoming", desc: "Expected arrival at LA Port." },
    { title: "Final Delivery", date: "2026-03-28T00:00:00Z", status: "upcoming", desc: "Estimated delivery to customer warehouse." },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 p-base">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-5">
            <Button variant="secondary" className="h-12 w-12 p-0 border-surface-border bg-white shadow-premium rounded-ui" onClick={() => router.push("/dashboard/shipments")}>
              <ArrowLeft className="h-5 w-5 text-slate-600" />
            </Button>
            <div>
              <div className="flex items-center gap-3">
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global Shipment ID</span>
                 {getStatusBadge(shipment.status)}
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-brand-primary mt-1">{shipment.trackingNumber}</h1>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-ui border border-surface-border shadow-sm">
             <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Route Summary</span>
                <div className="flex items-center gap-2 mt-0.5">
                   <span className="font-bold text-slate-900">{shipment.origin}</span>
                   <ArrowRight className="h-4 w-4 text-brand-accent mx-1" />
                   <span className="font-bold text-slate-900">{shipment.destination}</span>
                </div>
             </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {activeView === 'details' ? (
              <>
                <Card className="shadow-premium border-surface-border overflow-hidden">
                  <CardHeader className="bg-slate-50/50 border-b border-surface-border">
                    <CardTitle className="text-lg font-bold text-brand-primary flex items-center gap-2">
                       <FileText className="h-5 w-5 text-brand-accent" />
                       Logistics Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">ETA (Destination)</p>
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 bg-status-info/10 text-status-info rounded-ui flex items-center justify-center">
                            <Calendar className="h-5 w-5" />
                          </div>
                          <span className="font-bold text-brand-primary text-lg">{format(new Date(shipment.estimatedArrival), "MMM dd, yyyy")}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Cargo Type</p>
                        <div className="flex items-center gap-3">
                           <div className="h-9 w-9 bg-brand-primary/5 text-brand-primary rounded-ui flex items-center justify-center">
                             <Package className="h-5 w-5" />
                           </div>
                           <span className="font-bold text-brand-primary text-lg">{shipment.cargoType}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Weight</p>
                        <div className="flex items-center gap-3">
                           <div className="h-9 w-9 bg-status-success/10 text-status-success rounded-ui flex items-center justify-center">
                             <TrendingUp className="h-5 w-5" />
                           </div>
                           <span className="font-bold text-brand-primary text-lg">{shipment.weight.toLocaleString()} kg</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline */}
                <Card className="shadow-premium border-surface-border">
                  <CardHeader className="bg-slate-50/50 border-b border-surface-border">
                    <CardTitle className="text-lg font-bold text-brand-primary flex items-center gap-2">
                       <Ship className="h-5 w-5 text-brand-accent" />
                       Journey Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="relative space-y-10 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-[2px] before:bg-slate-100 before:content-['']">
                      {timelineEvents.map((event, idx) => (
                        <div key={idx} className="relative flex items-start gap-8">
                          <div className={cn(
                            "flex h-11 w-11 shrink-0 items-center justify-center rounded-ui border-4 border-white shadow-premium z-10 transition-all duration-300",
                            event.status === "completed" ? "bg-status-success text-white" : 
                            event.status === "current" ? "bg-brand-accent text-white scale-110 ring-4 ring-brand-accent/20" : "bg-slate-100 text-slate-400"
                          )}>
                            {event.status === "completed" ? <CheckCircle2 className="h-5 w-5" /> : 
                             event.status === "current" ? <Clock className="h-5 w-5 animate-pulse" /> : <Layers className="h-4 w-4" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1 gap-1">
                              <h4 className={cn("font-bold text-lg", event.status === "upcoming" ? "text-slate-400" : "text-brand-primary")}>
                                {event.title}
                              </h4>
                              <span className="text-xs font-bold text-slate-400 uppercase">{format(new Date(event.date), "MMM dd, HH:mm")}</span>
                            </div>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-lg">{event.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              /* Bill of Lading Section */
              <Card className="shadow-premium border-surface-border overflow-hidden">
                <CardHeader className="bg-slate-50/50 border-b border-surface-border">
                  <CardTitle className="text-lg font-bold text-brand-primary flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-brand-accent" />
                      Bill of Lading Compliance
                    </div>
                    <div className="flex items-center gap-3">
                    <Button 
                      variant="secondary" 
                      className="h-8 px-3 text-xs font-bold border-surface-border text-slate-500 hover:text-brand-primary"
                      onClick={() => setActiveView('details')}
                    >
                      <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
                      Back to Details
                    </Button>
                    <Badge variant="success" className="font-bold uppercase text-[10px] px-3 py-1">Verified</Badge>
                  </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row justify-between gap-8 mb-8 pb-8 border-b border-surface-border">
                     <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Master B/L Number</p>
                        <p className="text-xl font-extrabold text-brand-primary tracking-tight">BL-{shipment.id.split('-')[1] || shipment.id}</p>
                     </div>
                     <div className="flex items-center gap-6">
                        <div className="text-right">
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Issuance Date</p>
                           <p className="font-bold text-slate-700">{format(new Date(), "MMM dd, yyyy")}</p>
                        </div>
                        <div className="h-10 w-10 rounded-full border-2 border-status-success/20 flex items-center justify-center text-status-success">
                           <CheckCircle2 className="h-6 w-6" />
                        </div>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Required Documentation</p>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { title: "Master Bill of Lading", size: "2.4 MB", status: "Verified" },
                          { title: "Commercial Invoice", size: "1.1 MB", status: "Verified" },
                          { title: "Packing List", size: "840 KB", status: "Verified" },
                          { title: "Certificate of Origin", size: "1.5 MB", status: "Pending" }
                        ].map((doc, i) => (
                          <div key={i} className="flex items-center justify-between p-4 border border-surface-border rounded-ui hover:bg-slate-50 transition-colors group">
                             <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded bg-brand-primary/5 text-brand-primary flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all">
                                   <FileText className="h-4 w-4" />
                                </div>
                                <div>
                                   <p className="text-sm font-bold text-brand-primary">{doc.title}</p>
                                   <p className="text-[10px] text-slate-400 font-bold uppercase">{doc.size} • PDF</p>
                                </div>
                             </div>
                             <Badge variant={doc.status === "Verified" ? "success" : "info"} className="text-[9px] font-bold px-2 py-0.5">
                                {doc.status}
                             </Badge>
                          </div>
                        ))}
                     </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Containers */}
            <Card className="shadow-premium border-surface-border overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-surface-border">
                <CardTitle className="text-lg font-bold text-brand-primary flex items-center gap-2">
                   <Package className="h-5 w-5 text-brand-accent" />
                   Authenticated Containers ({shipmentContainers.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-surface-border">
                  {shipmentContainers.map((container) => (
                    <div key={container.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 hover:bg-slate-50 transition-colors gap-6">
                      <div className="flex items-center gap-5">
                        <div className="h-14 w-14 bg-white border border-surface-border text-brand-primary rounded-ui flex items-center justify-center shadow-sm">
                          <Truck className="h-7 w-7" />
                        </div>
                        <div>
                          <div className="font-extrabold text-lg text-brand-primary tracking-tight">{container.containerNumber}</div>
                          <div className="text-xs text-slate-400 uppercase font-bold tracking-widest">{container.size} • {container.type} HIGH CUBE</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-6">
                        <div className="flex flex-col items-end">
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Position</span>
                           <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                             <MapPin className="h-3.5 w-3.5 text-brand-accent" />
                             {container.currentLocation}
                           </div>
                        </div>
                        {container.temperature !== undefined && (
                          <div className="flex flex-col items-end">
                             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reefer Telemetry</span>
                             <div className="flex items-center gap-2 px-3 py-1 bg-status-info/10 text-status-info rounded-full text-xs font-bold border border-status-info/20">
                               <Activity className="h-3 w-3" />
                               {container.temperature}°C
                             </div>
                          </div>
                        )}
                        <Button variant="secondary" className="font-bold border-surface-border px-5 h-10">
                          Track Live Map
                        </Button>
                      </div>
                    </div>
                  ))}
                  {shipmentContainers.length === 0 && (
                    <div className="py-20 text-center flex flex-col items-center gap-4 text-slate-400">
                       <Package className="h-12 w-12 opacity-20" />
                       <p className="font-bold">No registered containers for this shipment unit.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            {/* Alerts */}
            <Card className={cn("shadow-premium overflow-hidden", shipmentAlerts.length > 0 ? "border-status-warning ring-1 ring-status-warning/20" : "border-surface-border")}>
              <CardHeader className={cn("border-b", shipmentAlerts.length > 0 ? "bg-status-warning/10 border-status-warning/20" : "bg-slate-50/50 border-surface-border")}>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <AlertTriangle className={cn("h-5 w-5", shipmentAlerts.length > 0 ? "text-status-warning" : "text-slate-400")} />
                  Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {shipmentAlerts.map(alert => (
                    <div key={alert.id} className="p-4 bg-white border border-surface-border rounded-ui shadow-sm group hover:border-status-warning transition-colors">
                      <div className="flex items-center justify-between mb-2">
                         <span className="text-[10px] font-bold text-status-warning uppercase tracking-widest flex items-center gap-1">
                           <span className="w-1.5 h-1.5 rounded-full bg-status-warning animate-pulse"></span>
                           {alert.type} Risk
                         </span>
                         <span className="text-[10px] text-slate-400 font-bold">LATEST</span>
                      </div>
                      <p className="text-sm text-slate-700 font-medium leading-relaxed">
                        {alert.message}
                      </p>
                    </div>
                  ))}
                  {shipmentAlerts.length === 0 && (
                    <div className="text-center py-6 text-slate-400">
                       <CheckCircle2 className="h-10 w-10 mx-auto opacity-10 mb-2" />
                       <p className="text-sm font-bold">No active risk factors identified.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Carrier Track */}
            <Card className="shadow-premium border-surface-border overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-surface-border">
                <CardTitle className="text-lg font-bold text-brand-primary">Transport Logistics</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-8">
                <div className="space-y-6">
                   <div className="flex items-center gap-5 group">
                      <div className="w-12 h-12 rounded-ui border border-surface-border bg-white flex items-center justify-center text-brand-primary shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-all">
                        <Anchor className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Prime Carrier</p>
                        <p className="font-extrabold text-brand-primary uppercase">MAERSK LINE GLOBAL</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-5 group">
                      <div className="w-12 h-12 rounded-ui border border-surface-border bg-white flex items-center justify-center text-brand-primary shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-all">
                        <Ship className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Active Vessel</p>
                        <p className="font-extrabold text-brand-primary text-sm">MAERSK MC-KINNEY MOLLER</p>
                        <p className="text-[10px] text-brand-accent font-bold uppercase mt-0.5">MMSI: 219450000</p>
                      </div>
                   </div>
                </div>
                
                <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
                    <Button 
                      variant="secondary" 
                      className={cn(
                        "w-full justify-between h-12 px-5 font-bold border-surface-border transition-all group",
                        activeView === 'bl' ? "bg-brand-primary/5 border-brand-primary/20" : "bg-slate-50 hover:bg-white"
                      )}
                      onClick={() => setActiveView('bl')}
                    >
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-3 text-brand-accent group-hover:scale-110 transition-transform" />
                        Bill of Lading (Master)
                      </div>
                      <ArrowRight className="h-3 w-3 opacity-30 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button 
                      variant="secondary" 
                      className={cn(
                        "w-full justify-between h-12 px-5 font-bold border-surface-border transition-all group",
                        activeView === 'bl' ? "bg-status-success/5 border-status-success/20" : "bg-slate-50 hover:bg-white"
                      )}
                      onClick={() => setActiveView('bl')}
                    >
                      <div className="flex items-center">
                        <ShieldCheck className="h-4 w-4 mr-3 text-status-success group-hover:scale-110 transition-transform" />
                        Compliance Docs
                      </div>
                      <ArrowRight className="h-3 w-3 opacity-30 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
