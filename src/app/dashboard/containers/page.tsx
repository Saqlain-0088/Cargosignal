"use client";

import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Layers,
  MapPin,
  Thermometer,
  Droplets,
  Activity,
  Package,
  Search
} from "lucide-react";
import { containers, shipments } from "@/mock";
import { cn } from "@/lib/utils";

export default function ContainersPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6 animate-pulse p-base">
          <div className="h-12 bg-slate-200 rounded-xl w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-28 bg-slate-200 rounded-xl"></div>
            ))}
          </div>
          <div className="h-[400px] bg-slate-200 rounded-xl"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 p-base pb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Containers</h1>
            <p className="text-slate-500 mt-1 font-medium">Track and manage all registered containers.</p>
          </div>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-brand-accent transition-colors" />
            <input
              type="text"
              placeholder="Search containers..."
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-ui text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all w-64 shadow-premium"
            />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-none shadow-premium">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <Layers className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Containers</p>
                <p className="text-2xl font-black text-slate-900">{containers.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-premium">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Reefer Units</p>
                <p className="text-2xl font-black text-slate-900">{containers.filter(c => c.type === "reefer").length}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-premium">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Standard Units</p>
                <p className="text-2xl font-black text-slate-900">{containers.filter(c => c.type === "standard").length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <Card className="border-none shadow-premium overflow-hidden">
          <CardHeader className="border-b border-slate-50 px-6 py-5">
            <CardTitle className="text-lg font-bold text-slate-900">Container Registry</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50/70 border-b border-slate-100">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="py-4 px-6 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Container #</TableHead>
                  <TableHead className="py-4 px-6 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Shipment</TableHead>
                  <TableHead className="py-4 px-6 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Size / Type</TableHead>
                  <TableHead className="py-4 px-6 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Location</TableHead>
                  <TableHead className="py-4 px-6 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest text-center">Telemetry</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {containers.map((c) => {
                  const linkedShipment = shipments.find(s => s.id === c.shipmentId);
                  return (
                    <TableRow key={c.id} className="group hover:bg-slate-50/50 transition-all border-b border-slate-100/50">
                      <TableCell className="px-6 py-4">
                        <span className="font-black text-brand-primary text-sm tracking-tight">{c.containerNumber}</span>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <span className="text-xs font-bold text-slate-600">{c.shipmentId}</span>
                        {linkedShipment && (
                          <span className="text-[10px] text-slate-400 block">{linkedShipment.origin.split(",")[0]} → {linkedShipment.destination.split(",")[0]}</span>
                        )}
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <Badge variant={c.type === "reefer" ? "info" : "default"} className="text-[9px] font-bold px-2 py-0.5">
                          {c.size} {c.type.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-brand-accent" />
                          <span className="text-xs font-bold text-slate-700">{c.currentLocation}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-center">
                        {c.temperature !== undefined ? (
                          <div className="flex items-center gap-3 justify-center">
                            <span className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                              <Thermometer className="h-3 w-3" /> {c.temperature}°C
                            </span>
                            {c.humidity !== undefined && (
                              <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                                <Droplets className="h-3 w-3" /> {c.humidity}%
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-medium">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {containers.length === 0 && (
              <div className="py-20 flex flex-col items-center justify-center">
                <Layers className="h-12 w-12 text-slate-200 mb-4" />
                <h4 className="text-lg font-bold text-slate-900">No containers registered</h4>
                <p className="text-sm text-slate-500 max-w-xs mt-1 text-center">Your fleet containers will appear here once shipments are created.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
