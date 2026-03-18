"use client";

import React, { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { 
  Search, 
  MapPin,
  ArrowUpDown, 
  Eye, 
  Package,
  Filter
} from "lucide-react";
import { containers, shipments } from "@/mock";
import { format } from "date-fns";
import Link from "next/link";

export default function TrackingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' | null }>({ key: 'containerNumber', direction: null });

  // Compute enriched containers with shipment data
  const enrichedContainers = useMemo(() => {
    return containers.map(container => {
      const shipment = shipments.find(s => s.id === container.shipmentId);
      return {
        ...container,
        shipmentTracking: shipment?.trackingNumber || "Unknown",
        status: shipment?.status || "pending",
        estimatedArrival: shipment?.estimatedArrival || new Date().toISOString()
      };
    });
  }, []);

  // Handle sorting
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Filter and Sort logic
  const filteredContainers = useMemo(() => {
    let result = [...enrichedContainers];

    // Filter by search term
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(c => 
        c.containerNumber.toLowerCase().includes(lowerSearch) ||
        c.shipmentTracking.toLowerCase().includes(lowerSearch) ||
        c.currentLocation.toLowerCase().includes(lowerSearch) ||
        c.status.toLowerCase().includes(lowerSearch)
      );
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
  }, [enrichedContainers, searchTerm, sortConfig]);

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

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Container Tracking</h1>
            <p className="text-sm text-slate-500">Monitor live container locations and status.</p>
          </div>
        </div>

        {/* Filters & Search */}
        <Card className="border-slate-200">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Search by Container Number, Shipment ID, or Location..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="secondary" className="flex items-center gap-2 shrink-0">
                <Filter className="h-4 w-4" />
                Advanced Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Containers Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px] cursor-pointer" onClick={() => handleSort('containerNumber')}>
                    <div className="flex items-center gap-2">
                       Container Number <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('shipmentTracking')}>
                    <div className="flex items-center gap-2">
                       Shipment ID <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('currentLocation')}>
                    <div className="flex items-center gap-2">
                       Current Location <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('estimatedArrival')}>
                    <div className="flex items-center gap-2">
                       ETA <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>
                     <div className="flex items-center gap-2">
                       Status <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Track</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContainers.length > 0 ? (
                  filteredContainers.map((container) => (
                    <TableRow key={container.id} className="group">
                      <TableCell className="font-medium">
                         <div className="flex items-center gap-2">
                           <Package className="h-4 w-4 text-blue-600" />
                           {container.containerNumber}
                         </div>
                         <div className="text-xs text-slate-500 uppercase ml-6 mt-1">{container.size} {container.type}</div>
                      </TableCell>
                      <TableCell>
                        <Link href={`/dashboard/shipments/${container.shipmentId}`} className="text-blue-600 hover:underline">
                           {container.shipmentTracking}
                        </Link>
                      </TableCell>
                      <TableCell>
                         <div className="flex items-center gap-1.5 text-slate-700">
                           <MapPin className="h-4 w-4 text-slate-400" />
                           {container.currentLocation}
                         </div>
                      </TableCell>
                      <TableCell className="text-slate-500">
                        {format(new Date(container.estimatedArrival), "MMM dd, yyyy")}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(container.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/dashboard/tracking/${container.id}`}>
                          <Button variant="secondary" className="h-8 px-3 text-xs flex items-center gap-1 ml-auto">
                            <Eye className="h-3.5 w-3.5" />
                            View Journey
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-slate-500">
                      No containers tracking information found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
