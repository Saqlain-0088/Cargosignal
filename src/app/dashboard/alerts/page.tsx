"use client";

import React, { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  CheckCircle2,
  X,
  Eye,
  Clock
} from "lucide-react";
import { alerts as initialAlerts, shipments } from "@/mock";
import { format } from "date-fns";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LocalAlert = typeof initialAlerts[0] & { localStatus: "active" | "acknowledged" | "dismissed" };

export default function AlertsPage() {
  const [filter, setFilter] = useState<"all" | "high" | "medium" | "low">("all");
  
  // Set up local state for mocking dismiss/acknowledge actions
  const [alertsList, setAlertsList] = useState<LocalAlert[]>(() => {
    // Generate a few more mock alerts for variety if there are only 2
    const base = initialAlerts.map(a => ({ ...a, localStatus: "active" as const }));
    if (base.length < 5) {
      base.push({
        id: "AL-003",
        type: "temperature",
        severity: "low",
        message: "Temperature fluctuation detected in Container CN-002, still within safe limits.",
        timestamp: "2026-03-15T14:20:00Z",
        relatedId: "SH-003",
        localStatus: "active"
      });
      base.push({
        id: "AL-004",
        type: "routing",
        severity: "high",
        message: "Port strike at Los Angeles Port. Expect severe delays for incoming vessels.",
        timestamp: new Date().toISOString(),
        relatedId: "SH-001",
        localStatus: "active"
      });
      base.push({
        id: "AL-005",
        type: "customs",
        severity: "medium",
        message: "Missing commercial invoice for HS Codes. Please upload to clear SH-002.",
        timestamp: "2026-03-14T09:15:00Z",
        relatedId: "SH-002",
        localStatus: "acknowledged"
      });
    }
    return base;
  });

  const handleAction = (id: string, action: "acknowledged" | "dismissed") => {
    setAlertsList(prev => prev.map(a => a.id === id ? { ...a, localStatus: action } : a));
  };

  const visibleAlerts = useMemo(() => {
    let list = alertsList.filter(a => a.localStatus !== "dismissed");
    if (filter !== "all") {
      list = list.filter(a => a.severity === filter);
    }
    // Sort so high severity or newest are at top
    return list.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [alertsList, filter]);

  const activeCount = alertsList.filter(a => a.localStatus === "active").length;

  const groupedAlerts = {
    high: visibleAlerts.filter(a => a.severity === "high"),
    medium: visibleAlerts.filter(a => a.severity === "medium"),
    low: visibleAlerts.filter(a => a.severity === "low"),
  };

  const renderAlertCard = (alert: LocalAlert) => {
    const isAck = alert.localStatus === "acknowledged";
    const shipment = shipments.find(s => s.id === alert.relatedId);

    return (
      <div 
        key={alert.id} 
        className={cn(
          "flex flex-col sm:flex-row gap-4 p-4 rounded-lg border transition-all",
          isAck ? "bg-slate-50 border-slate-200 opacity-70" : 
          alert.severity === "high" ? "bg-red-50/30 border-red-200 shadow-sm" : 
          alert.severity === "medium" ? "bg-amber-50/30 border-amber-200 shadow-sm" : 
          "bg-white border-slate-200 shadow-sm"
        )}
      >
        <div className="flex-shrink-0 pt-1">
          {alert.severity === "high" ? <AlertCircle className={cn("h-6 w-6", isAck ? "text-slate-400" : "text-red-600")} /> :
           alert.severity === "medium" ? <AlertTriangle className={cn("h-6 w-6", isAck ? "text-slate-400" : "text-amber-500")} /> :
           <Info className={cn("h-6 w-6", isAck ? "text-slate-400" : "text-blue-500")} />}
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className={cn("font-bold", isAck ? "text-slate-700" : "text-slate-900")}>
                  {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)} Alert
                </h3>
                {alert.severity === "high" && !isAck && <Badge variant="error" className="h-5 text-[10px] px-1.5">Critical</Badge>}
                {isAck && <Badge variant="default" className="h-5 text-[10px] px-1.5 bg-slate-200 text-slate-600">Acknowledged</Badge>}
              </div>
              <p className={cn("text-sm", isAck ? "text-slate-500" : "text-slate-700")}>{alert.message}</p>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-1 shrink-0 whitespace-nowrap">
              <Clock className="h-3.5 w-3.5" />
              {format(new Date(alert.timestamp), "MMM dd, HH:mm")}
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 pt-2">
             <div className="text-xs bg-white border border-slate-200 px-2.5 py-1 rounded text-slate-600 font-medium whitespace-nowrap">
                 Ref: <Link href={`/dashboard/shipments/${alert.relatedId}`} className="text-blue-600 hover:underline">{shipment?.trackingNumber || alert.relatedId}</Link>
             </div>
             
             <div className="flex items-center gap-2 ml-auto w-full sm:w-auto mt-2 sm:mt-0">
               {!isAck ? (
                 <Button 
                    variant="secondary" 
                    className="h-8 text-xs bg-white border-slate-200 hover:bg-slate-50 flex-1 sm:flex-none"
                    onClick={() => handleAction(alert.id, "acknowledged")}
                 >
                   <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-green-600" />
                   Acknowledge
                 </Button>
               ) : (
                 <span className="text-xs font-medium text-slate-500 italic mr-2 hidden sm:block">Under reviewing...</span>
               )}
               <Button 
                 variant="secondary" 
                 className="h-8 text-xs bg-white border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 flex-1 sm:flex-none"
                 onClick={() => handleAction(alert.id, "dismissed")}
               >
                 <X className="h-3.5 w-3.5 mr-1" />
                 Dismiss
               </Button>
               <Link href={`/dashboard/shipments/${alert.relatedId}`} className="flex-1 sm:flex-none">
                 <Button className="h-8 text-xs w-full sm:w-auto">
                   <Eye className="h-3.5 w-3.5 mr-1" />
                   View Details
                 </Button>
               </Link>
             </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Notifications</h1>
              {activeCount > 0 && (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
                  {activeCount}
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500 mt-1">Review alerts, delays, and critical updates to your supply chain.</p>
          </div>
          
          <div className="flex bg-slate-100 p-1 rounded-lg">
            {(["all", "high", "medium", "low"] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-colors",
                  filter === f ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {groupedAlerts.high.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-red-600 uppercase tracking-wider border-b border-red-100 pb-2">High Priority ({groupedAlerts.high.length})</h2>
            <div className="space-y-3">
              {groupedAlerts.high.map(renderAlertCard)}
            </div>
          </div>
        )}

        {groupedAlerts.medium.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wider border-b border-amber-100 pb-2 mt-4">Medium Priority ({groupedAlerts.medium.length})</h2>
            <div className="space-y-3">
              {groupedAlerts.medium.map(renderAlertCard)}
            </div>
          </div>
        )}

        {groupedAlerts.low.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wider border-b border-blue-100 pb-2 mt-4">Low Priority ({groupedAlerts.low.length})</h2>
            <div className="space-y-3">
              {groupedAlerts.low.map(renderAlertCard)}
            </div>
          </div>
        )}

        {visibleAlerts.length === 0 && (
          <Card className="border-dashed border-slate-300 bg-slate-50/50">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <CheckCircle2 className="h-12 w-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-semibold text-slate-800">No active alerts</h3>
              <p className="text-slate-500 text-center max-w-sm mt-1">
                You're all caught up! There are currently no {filter !== "all" ? `${filter} severity ` : ""}notifications requiring your attention.
              </p>
              {filter !== "all" && (
                <Button variant="secondary" className="mt-6" onClick={() => setFilter("all")}>
                  View All Alerts
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
