"use client";

import React from "react";
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
  Anchor, 
  Ship,
  Navigation,
  CheckCircle2,
  Clock,
  ThermometerSnowflake,
  Droplets
} from "lucide-react";
import { containers, shipments } from "@/mock";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ContainerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const container = containers.find(c => c.id === id);
  const shipment = container ? shipments.find(s => s.id === container.shipmentId) : null;

  if (!container || !shipment) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h2 className="text-xl font-semibold">Container not found</h2>
          <Button className="mt-4" onClick={() => router.push("/dashboard/tracking")}>
            Back to Tracking
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge variant="success">Delivered</Badge>;
      case "in_transit":
        return <Badge variant="info">In Transit</Badge>;
      case "delayed":
        return <Badge variant="warning">Delayed</Badge>;
      case "customs_hold":
        return <Badge variant="error">Customs Hold</Badge>;
      default:
        return <Badge variant="default">Pending</Badge>;
    }
  };

  // Mock container timeline tracking events
  const timelineEvents = [
    { title: "Container Loaded", branch: shipment.origin, date: "2026-03-05T10:00:00Z", status: "completed", icon: Package },
    { title: "Departed Port of Origin", branch: shipment.origin, date: "2026-03-08T18:30:00Z", status: "completed", icon: Ship },
    { title: "Arrived at Transit Port", branch: container.currentLocation, date: "2026-03-15T09:00:00Z", status: "current", icon: Anchor },
    { title: "Out for Delivery", branch: "Local Hub", date: "2026-03-24T08:00:00Z", status: "upcoming", icon: Navigation },
    { title: "Delivered", branch: shipment.destination, date: shipment.estimatedArrival, status: "upcoming", icon: CheckCircle2 },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button variant="secondary" className="h-9 w-9 p-0" onClick={() => router.push("/dashboard/tracking")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">{container.containerNumber}</h1>
              {getStatusBadge(shipment.status)}
            </div>
            <p className="text-sm text-slate-500 uppercase font-semibold tracking-wider mt-1">
              {container.size} {container.type} Container
            </p>
          </div>
          <div className="hidden sm:block text-right">
             <div className="text-xs text-slate-500 font-semibold uppercase">Associated Shipment</div>
             <Link href={`/dashboard/shipments/${shipment.id}`} className="text-sm font-bold text-blue-600 hover:underline">
               {shipment.trackingNumber}
             </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Visual Location Map Placeholder */}
            <Card className="overflow-hidden">
               <div className="h-64 w-full bg-slate-100 relative items-center justify-center flex flex-col border-b border-slate-200">
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                  <MapPin className="h-12 w-12 text-blue-500 mb-2 relative z-10 animate-bounce" />
                  <div className="relative z-10 bg-white px-4 py-2 rounded-full shadow-md text-sm font-bold text-slate-700">
                    {container.currentLocation}
                  </div>
                  <p className="relative z-10 text-xs text-slate-500 mt-2">Live Map Visualization Plugin Placeholder</p>

                  {/* Draw a fake active route line */}
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-blue-200 -translate-y-1/2">
                    <div className="h-full bg-blue-500 w-1/2 rounded-full relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white border-2 border-blue-500 rounded-full shadow"></div>
                    </div>
                  </div>
               </div>
               
               <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
                  <div className="p-4 text-center">
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Origin</p>
                    <p className="text-sm font-medium text-slate-800 truncate" title={shipment.origin}>{shipment.origin.split(",")[0]}</p>
                  </div>
                  <div className="p-4 text-center">
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Destination</p>
                    <p className="text-sm font-medium text-slate-800 truncate" title={shipment.destination}>{shipment.destination.split(",")[0]}</p>
                  </div>
                  <div className="p-4 text-center">
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">ETA</p>
                    <p className="text-sm font-medium text-slate-800">{format(new Date(shipment.estimatedArrival), "MMM dd")}</p>
                  </div>
                  <div className="p-4 text-center bg-blue-50/50">
                    <p className="text-xs font-semibold text-blue-600 uppercase mb-1">Current Status</p>
                    <p className="text-sm font-bold text-blue-700 capitalize">{shipment.status.replace("_", " ")}</p>
                  </div>
               </div>
            </Card>

            {/* Container Location Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Location History & Events</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-200 before:content-['']">
                  {timelineEvents.map((event, idx) => (
                    <div key={idx} className="relative flex items-start gap-5">
                      <div className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white shadow-sm z-10",
                        event.status === "completed" ? "bg-slate-800 text-white" : 
                        event.status === "current" ? "bg-blue-600 text-white shadow-blue-200 shadow-md" : "bg-slate-100 text-slate-400"
                      )}>
                        <event.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 pb-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start md:items-center mb-1">
                          <h4 className={cn("font-bold text-sm", event.status === "upcoming" ? "text-slate-500" : "text-slate-900")}>
                            {event.title}
                          </h4>
                          <span className="text-xs text-slate-500 flex items-center gap-1 mt-1 sm:mt-0">
                            <Clock className="w-3 h-3" />
                            {format(new Date(event.date), "MMM dd, yyyy HH:mm")}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 font-medium flex items-center gap-1.5 mt-1 border border-slate-200 bg-slate-50 w-fit px-2 py-0.5 rounded">
                           <MapPin className="w-3 h-3 text-slate-400" />
                           {event.branch}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
             {/* Sensor Data (if reefer) */}
             {container.type === "reefer" && (
                <Card className="border-blue-200 bg-blue-50/50">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-sm text-blue-800 flex items-center justify-between">
                       Live Telemetry
                       <span className="flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                       </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-blue-100">
                        <div className="flex items-center gap-3">
                           <div className="bg-blue-100 p-2 rounded text-blue-600">
                              <ThermometerSnowflake className="h-5 w-5" />
                           </div>
                           <div>
                              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Temperature</p>
                              <p className="text-xl font-bold text-slate-800">{container.temperature}°C</p>
                           </div>
                        </div>
                        <Badge variant="success">Optimal</Badge>
                     </div>
                     <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-blue-100">
                        <div className="flex items-center gap-3">
                           <div className="bg-cyan-100 p-2 rounded text-cyan-600">
                              <Droplets className="h-5 w-5" />
                           </div>
                           <div>
                              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Humidity</p>
                              <p className="text-xl font-bold text-slate-800">{container.humidity}%</p>
                           </div>
                        </div>
                     </div>
                  </CardContent>
                </Card>
             )}

             <Card>
                <CardHeader>
                   <CardTitle className="text-lg">Carrier Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                       <p className="text-xs text-slate-500 uppercase font-bold mb-1">Shipping Line</p>
                       <p className="text-sm font-medium">MAERSK LINE</p>
                    </div>
                    <div>
                       <p className="text-xs text-slate-500 uppercase font-bold mb-1">Vessel / Voyage</p>
                       <p className="text-sm font-medium text-blue-600">EVER GIVEN / 042W</p>
                    </div>
                    <div>
                       <p className="text-xs text-slate-500 uppercase font-bold mb-1">Master Bill of Lading</p>
                       <p className="text-sm font-medium text-slate-700">MBL-88776655</p>
                    </div>
                </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
