"use client";

import React, { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { 
  Plus, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Eye, 
  MoreHorizontal,
  ChevronDown,
  Clock
} from "lucide-react";
import { shipments } from "@/mock";
import { format } from "date-fns";
import Link from "next/link";

export default function ShipmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' | null }>({ key: 'id', direction: null });

  // Handle sorting
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Filter and Sort logic
  const filteredShipments = useMemo(() => {
    let result = [...shipments];

    // Filter by search term
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(s => 
        s.trackingNumber.toLowerCase().includes(lowerSearch) ||
        s.origin.toLowerCase().includes(lowerSearch) ||
        s.destination.toLowerCase().includes(lowerSearch)
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      result = result.filter(s => s.status === statusFilter);
    }

    // Sort
    if (sortConfig.direction) {
      result.sort((a: any, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [searchTerm, statusFilter, sortConfig]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge variant="success" className="font-bold uppercase text-[10px] min-w-[100px] justify-center py-1">Delivered</Badge>;
      case "in_transit":
        return <Badge variant="info" className="font-bold uppercase text-[10px] min-w-[100px] justify-center py-1">In Transit</Badge>;
      case "delayed":
        return <Badge variant="warning" className="font-bold uppercase text-[10px] min-w-[100px] justify-center py-1">Delayed</Badge>;
      case "customs_hold":
        return <Badge variant="error" className="font-bold uppercase text-[10px] min-w-[100px] justify-center py-1">Customs Hold</Badge>;
      default:
        return <Badge variant="default" className="font-bold uppercase text-[10px] min-w-[100px] justify-center py-1">Pending</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 p-base">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-brand-primary tracking-tight">Shipments</h1>
            <p className="text-slate-500 mt-1">Manage and monitor all your fleet movements globally.</p>
          </div>
          <Link href="/dashboard/shipments/new">
            <Button className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accent/90 text-white shadow-premium font-bold">
              <Plus className="h-4 w-4" />
              Add Shipment
            </Button>
          </Link>
        </div>

        {/* Filters & Search */}
        <Card className="border-surface-border shadow-premium overflow-hidden">
          <CardContent className="p-4 bg-slate-50/30">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Search by ID, Origin, Destination..." 
                  className="pl-10 h-10 border-surface-border focus:ring-brand-accent/20 focus:border-brand-accent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <div className="relative inline-block text-left">
                  <select 
                    className="h-10 rounded-ui border border-surface-border bg-white px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-accent/20 appearance-none pr-10 min-w-[160px] text-slate-600"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="in_transit">In Transit</option>
                    <option value="delivered">Delivered</option>
                    <option value="delayed">Delayed</option>
                    <option value="customs_hold">Customs Hold</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
                <Button variant="secondary" className="h-10 flex items-center gap-2 border-surface-border font-bold px-6">
                  <Filter className="h-4 w-4" />
                  Advanced Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipments Table */}
        <Card className="border-surface-border shadow-premium overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto max-h-[calc(100vh-320px)]">
              <Table>
                <TableHeader className="sticky top-0 z-10 bg-slate-50/90 backdrop-blur-sm border-b border-surface-border shadow-sm">
                  <TableRow className="hover:bg-transparent border-b-0">
                    <TableHead className="w-[120px] font-bold text-slate-600 uppercase tracking-wider text-[11px] py-4">Shipment ID</TableHead>
                    <TableHead className="font-bold text-slate-600 uppercase tracking-wider text-[11px] py-4">Origin Hub</TableHead>
                    <TableHead className="font-bold text-slate-600 uppercase tracking-wider text-[11px] py-4">Destination</TableHead>
                    <TableHead className="font-bold text-slate-600 uppercase tracking-wider text-[11px] py-4">Status</TableHead>
                    <TableHead className="font-bold text-slate-600 uppercase tracking-wider text-[11px] py-4">Estimated Arrival</TableHead>
                    <TableHead className="font-bold text-slate-600 uppercase tracking-wider text-[11px] py-4">Carrier</TableHead>
                    <TableHead className="text-right font-bold text-slate-600 uppercase tracking-wider text-[11px] py-4 px-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredShipments.length > 0 ? (
                    filteredShipments.map((shipment) => (
                      <TableRow key={shipment.id} className="group hover:bg-slate-50 transition-colors border-b border-surface-border last:border-0">
                        <TableCell className="font-bold text-brand-primary py-5">
                          {shipment.id}
                        </TableCell>
                        <TableCell className="py-5">
                           <div className="flex flex-col">
                              <span className="font-semibold text-slate-700">{shipment.origin}</span>
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Port of Load</span>
                           </div>
                        </TableCell>
                        <TableCell className="py-5">
                           <div className="flex flex-col">
                              <span className="font-semibold text-slate-700">{shipment.destination}</span>
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Consignee City</span>
                           </div>
                        </TableCell>
                        <TableCell className="py-5">
                          {getStatusBadge(shipment.status)}
                        </TableCell>
                        <TableCell className="py-5 text-slate-600 font-semibold">
                          <div className="flex items-center gap-2">
                             <Clock className="h-3.5 w-3.5 text-slate-400" />
                             {format(new Date(shipment.estimatedArrival), "MMM dd, yyyy")}
                          </div>
                        </TableCell>
                        <TableCell className="py-5">
                          <Badge variant="info" className="font-bold px-2 py-0.5 border-slate-200 text-slate-600">
                             {shipment.id === "SH-001" ? "Maersk" : shipment.id === "SH-002" ? "ZIM" : "Hapag-Lloyd"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right py-5 px-6">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/dashboard/shipments/${shipment.id}`}>
                              <Button variant="secondary" className="h-9 w-9 p-0 border-surface-border text-slate-400 hover:text-brand-accent transition-all">
                                <Eye className="h-4.5 w-4.5" />
                              </Button>
                            </Link>
                            <Button variant="secondary" className="h-9 w-9 p-0 border-surface-border text-slate-400">
                              <MoreHorizontal className="h-4.5 w-4.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="hover:bg-transparent">
                      <TableCell colSpan={7} className="py-24 text-center">
                         <div className="flex flex-col items-center justify-center gap-4 text-slate-400">
                            <Search className="h-12 w-12 opacity-20" />
                            <p className="font-bold">No shipments found matching your criteria.</p>
                            <Button variant="secondary" onClick={() => { setSearchTerm(""); setStatusFilter("all"); }}>Clear All Filters</Button>
                         </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
