"use client";

import React, { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { 
  FileCheck, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Building,
  ArrowRight,
  ChevronDown,
  Eye
} from "lucide-react";
import { shipments, customsEvents as initialCustomsEvents } from "@/mock";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Enhanced mock data for customs tracking
const mockCustomsData = shipments.map(shipment => {
  // Determine a random current status based on shipment status
  let status: 'cleared' | 'pending' | 'held' = 'pending';
  let progress = 50;

  if (shipment.status === 'delivered') {
    status = 'cleared';
    progress = 100;
  } else if (shipment.status === 'customs_hold') {
    status = 'held';
    progress = 75;
  } else if (shipment.status === 'in_transit') {
    status = Math.random() > 0.5 ? 'cleared' : 'pending';
    progress = status === 'cleared' ? 100 : 50;
  }

  // Generate timeline events based on the status
  const timeline = [
    { step: "Documentation Submitted", date: new Date(new Date(shipment.estimatedArrival).getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(), status: "completed" },
    { step: "Payment & Duties", date: new Date(new Date(shipment.estimatedArrival).getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(), status: progress >= 50 ? "completed" : "pending" },
    { step: "Customs Examination", date: new Date(new Date(shipment.estimatedArrival).getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(), status: status === 'held' ? "error" : progress >= 75 ? "completed" : "pending" },
    { step: "Clearance Granted", date: new Date(new Date(shipment.estimatedArrival).getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(), status: status === 'cleared' ? "completed" : "pending" },
  ];

  return {
    ...shipment,
    customsStatus: status,
    customsLocation: shipment.destination,
    clearanceProgress: progress,
    brokerName: ['Flexport', 'Expeditors', 'Kuehne+Nagel', 'DHL Global'][Math.floor(Math.random() * 4)],
    timeline
  };
});

export default function CustomsTrackingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredCustoms = useMemo(() => {
    return mockCustomsData.filter(item => {
      const matchesSearch = item.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.customsLocation.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || item.customsStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "cleared":
        return <Badge variant="success" className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Cleared</Badge>;
      case "pending":
        return <Badge variant="info" className="flex items-center gap-1"><Clock className="w-3 h-3"/> Pending</Badge>;
      case "held":
        return <Badge variant="error" className="flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Held</Badge>;
      default:
        return <Badge variant="default">Unknown</Badge>;
    }
  };

  const getProgressBarColor = (status: string) => {
    if (status === 'cleared') return 'bg-green-500';
    if (status === 'held') return 'bg-red-500';
    return 'bg-blue-500';
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <FileCheck className="h-6 w-6 text-blue-600" />
              Customs Tracking
            </h1>
            <p className="text-sm text-slate-500 mt-1">Monitor clearance progress, documentation, and regulatory holds.</p>
          </div>
        </div>

        {/* Action Bar */}
        <Card className="border-slate-200">
          <CardContent className="p-4 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search by Shipment ID or Location..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative inline-block text-left w-full md:w-48">
              <select 
                className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-8"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending Clearance</option>
                <option value="cleared">Cleared</option>
                <option value="held">Customs Hold</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
          </CardContent>
        </Card>

        {/* Customs List */}
        <div className="grid gap-6">
          {filteredCustoms.length > 0 ? (
            filteredCustoms.map((item) => (
              <Card key={item.id} className={cn("overflow-hidden transition-all hover:shadow-md border-l-4", 
                item.customsStatus === 'cleared' ? 'border-l-green-500' :
                item.customsStatus === 'held' ? 'border-l-red-500' : 'border-l-blue-500'
              )}>
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    
                    {/* Shipment Info Left Panel */}
                    <div className="p-6 bg-slate-50/50 lg:w-1/3 border-b lg:border-b-0 lg:border-r border-slate-100 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Shipment ID</span>
                          {getStatusBadge(item.customsStatus)}
                        </div>
                        <Link href={`/dashboard/shipments/${item.id}`} className="text-lg font-bold text-blue-600 hover:underline inline-flex items-center gap-1">
                          {item.trackingNumber}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                        
                        <div className="mt-4 space-y-3">
                          <div className="flex items-start gap-3 text-sm">
                            <Building className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                            <div>
                               <p className="font-medium text-slate-900">Customs Location</p>
                               <p className="text-slate-600">{item.customsLocation}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 text-sm">
                            <FileText className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                            <div>
                               <p className="font-medium text-slate-900">Broker</p>
                               <p className="text-slate-600">{item.brokerName}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-4 border-t border-slate-200">
                         <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                           <span className="text-slate-600">Clearance Progress</span>
                           <span className="text-slate-900">{item.clearanceProgress}%</span>
                         </div>
                         <div className="w-full bg-slate-200 rounded-full h-2">
                           <div className={cn("h-2 rounded-full", getProgressBarColor(item.customsStatus))} style={{ width: `${item.clearanceProgress}%` }}></div>
                         </div>
                      </div>
                    </div>

                    {/* Timeline Right Panel */}
                    <div className="p-6 lg:w-2/3">
                      <h3 className="text-sm font-bold text-slate-800 mb-6">Clearance Timeline</h3>
                      
                      <div className="relative">
                        {/* Horizontal Line connecting steps */}
                        <div className="hidden sm:block absolute top-[15px] left-8 right-8 h-0.5 bg-slate-200 -z-10"></div>
                        
                        <div className="flex flex-col sm:flex-row gap-6 sm:gap-2 justify-between">
                          {item.timeline.map((step, idx) => (
                            <div key={idx} className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-2 flex-1 relative">
                               <div className={cn(
                                 "flex h-8 w-8 items-center justify-center rounded-full border-2 bg-white z-10 shrink-0 transition-colors",
                                 step.status === "completed" ? "border-green-500 text-green-600" :
                                 step.status === "error" ? "border-red-500 text-red-600 bg-red-50" :
                                 "border-slate-200 text-slate-300"
                               )}>
                                  {step.status === "completed" ? <CheckCircle2 className="h-4 w-4" /> :
                                   step.status === "error" ? <AlertCircle className="h-4 w-4" /> :
                                   <div className="h-2 w-2 rounded-full bg-slate-200"></div>}
                               </div>
                               <div className="flex-1 sm:flex-none">
                                  <p className={cn(
                                    "text-sm font-semibold sm:leading-tight",
                                    step.status === "completed" ? "text-slate-900" :
                                    step.status === "error" ? "text-red-700" :
                                    "text-slate-500"
                                  )}>{step.step}</p>
                                  {step.status !== "pending" && (
                                    <p className="text-[11px] text-slate-500 mt-0.5 sm:mt-1 font-medium">
                                      {format(new Date(step.date), "MMM dd, HH:mm")}
                                    </p>
                                  )}
                                  {step.status === "error" && (
                                     <Badge variant="error" className="mt-1 text-[10px] sm:mx-auto">Action Required</Badge>
                                  )}
                               </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {item.customsStatus === 'held' && (
                        <div className="mt-6 bg-red-50 border border-red-100 rounded-md p-4 flex gap-3">
                           <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
                           <div>
                             <h4 className="text-sm font-bold text-red-800">Customs Examination Hold</h4>
                             <p className="text-xs text-red-700 mt-1">Additional commercial documents required. Please contact your broker immediately.</p>
                             <Button variant="secondary" className="mt-3 h-8 text-xs bg-white border-red-200 text-red-700 hover:bg-red-50">Upload Documents</Button>
                           </div>
                        </div>
                      )}
                    </div>
                    
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
             <div className="text-center p-12 bg-white rounded-lg border border-slate-200 shadow-sm">
                <FileCheck className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900">No customs records found</h3>
                <p className="text-slate-500 mt-1">Try adjusting your filters or search term.</p>
             </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
