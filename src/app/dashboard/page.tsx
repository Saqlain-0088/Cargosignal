"use client";

import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { 
  Package, 
  Activity, 
  Clock,
  TrendingUp,
  Zap,
  ArrowUpRight,
  ShieldCheck,
  Layers,
  Search,
  MoreVertical
} from "lucide-react";
import { ShipmentMap } from "@/components/dashboard/ShipmentMap";
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { shipments, containers, logisticsCosts } from "@/mock";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mock data for charts
const monthlyData = [
  { name: "Jan", total: 120, revenue: 45000 },
  { name: "Feb", total: 154, revenue: 52000 },
  { name: "Mar", total: 198, revenue: 61000 },
  { name: "Apr", total: 165, revenue: 58000 },
  { name: "May", total: 240, revenue: 72000 },
  { name: "Jun", total: 280, revenue: 85000 },
];

import { useRouter } from "next/navigation";

export default function DashboardOverview() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Calculate KPIs from mock data
  const totalShipments = shipments.length + 1240;
  const activeContainersCount = containers.length + 158;
  const delayedShipmentsCount = shipments.filter(s => s.status === "delayed").length + 3;
  const totalCostValue = logisticsCosts.reduce((acc, cost) => acc + cost.amount, 0) + 124500;

  const company = {
    plan: "Professional",
    status: "Active",
    renewsAt: "2026-04-10",
    usage: {
      shipments: { used: 1240, limit: 5000 },
      containers: { used: 158, limit: 500 },
      alerts: { used: 12, limit: 100 },
    }
  };

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

  const handleUpgrade = () => {
    router.push("/dashboard/billing");
  };

  const handleCreateShipment = () => {
    router.push("/dashboard/shipments/new");
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-8 animate-pulse p-base">
          <div className="h-20 bg-slate-200 rounded-xl w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-slate-200 rounded-xl"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-[400px] bg-slate-200 rounded-xl"></div>
            <div className="h-[400px] bg-slate-200 rounded-xl"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 p-base pb-16">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Dashboard</h1>
            <p className="text-slate-500 mt-1 font-medium italic">Welcome back to your intelligence hub.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative group">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-brand-accent transition-colors" />
               <input 
                 type="text" 
                 placeholder="Search shipments..." 
                 className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-ui text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all w-64 shadow-premium"
               />
            </div>
            <Button 
              className="bg-brand-primary hover:bg-slate-800 text-white shadow-premium active:scale-95 transition-transform"
              onClick={handleCreateShipment}
            >
               Create Shipment
            </Button>
          </div>
        </div>

        {/* Global Shipment Map */}
        <ShipmentMap shipments={shipments} />

        {/* KPI Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Shipments", value: totalShipments, icon: Package, trend: "+12.5%", trendUp: true, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Active Containers", value: activeContainersCount, icon: Layers, trend: "+5.2%", trendUp: true, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Delayed Units", value: delayedShipmentsCount, icon: Clock, trend: "-2.4%", trendUp: false, color: "text-rose-600", bg: "bg-rose-50" },
            { label: "Logistics Spend", value: `$${totalCostValue.toLocaleString()}`, icon: TrendingUp, trend: "+18.9%", trendUp: true, color: "text-amber-600", bg: "bg-amber-50" },
          ].map((kpi, i) => (
            <Card key={i} className="border-none shadow-premium hover:shadow-card-hover transition-all duration-300 group overflow-hidden relative">
              <div className={cn("absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 transition-transform group-hover:scale-110", kpi.bg)}></div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{kpi.label}</p>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">{kpi.value}</h3>
                  </div>
                  <div className={cn("p-2.5 rounded-xl shadow-sm transition-transform group-hover:rotate-12", kpi.bg, kpi.color)}>
                    <kpi.icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className={cn(
                    "flex items-center text-xs font-bold px-1.5 py-0.5 rounded-md",
                    kpi.trendUp ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                  )}>
                    {kpi.trendUp ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <TrendingUp className="h-3 w-3 mr-0.5 rotate-180" />}
                    {kpi.trend}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium uppercase">vs last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Chart Section */}
          <Card className="lg:col-span-2 border-none shadow-premium overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 pb-4">
              <div>
                <CardTitle className="text-lg font-bold text-slate-900">Performance Over Time</CardTitle>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-tighter mt-0.5">Shipment volume vs Revenue</p>
              </div>
              <select className="text-xs font-bold bg-slate-50 border-none rounded-md px-2 py-1 outline-none cursor-pointer">
                <option>Last 6 Months</option>
                <option>Last Year</option>
              </select>
            </CardHeader>
            <CardContent className="h-[350px] pt-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-brand-accent)" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="var(--color-brand-accent)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: '#94a3b8' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: '#94a3b8' }} />
                  <RechartsTooltip 
                    contentStyle={{ border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="total" stroke="var(--color-brand-accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Billing / Subscription High-Quality Widget */}
          <Card className="border-none shadow-premium overflow-hidden relative group">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-accent opacity-20"></div>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-slate-900">Subscription</CardTitle>
                <p className="text-xs text-slate-500 font-medium">Manage your plan & limits</p>
              </div>
              <Badge variant="success" className="bg-emerald-500 text-white border-none px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-sm">
                Active
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <div 
                className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors group/sub"
                onClick={handleUpgrade}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-brand-primary text-white rounded-xl flex items-center justify-center shadow-lg">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Current Plan</p>
                    <p className="text-lg font-black text-slate-900 leading-tight">{company.plan}</p>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-slate-300 group-hover/sub:text-brand-accent transition-colors transition-transform group-hover/sub:translate-x-1 group-hover/sub:-translate-y-1" />
              </div>

              <div className="space-y-4">
                {[
                  { label: "Shipments", used: company.usage.shipments.used, limit: company.usage.shipments.limit, icon: Package },
                  { label: "Containers", used: company.usage.containers.used, limit: company.usage.containers.limit, icon: Layers },
                  { label: "Smart Alerts", used: company.usage.alerts.used, limit: company.usage.alerts.limit, icon: Activity },
                ].map((item, idx) => {
                  const percent = Math.round((item.used / item.limit) * 100);
                  return (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2">
                           <item.icon className="h-3.5 w-3.5 text-slate-400" />
                           <span className="text-xs font-bold text-slate-600">{item.label}</span>
                        </div>
                        <span className="text-xs font-bold text-slate-900">{item.used} <span className="text-slate-400 font-medium">/ {item.limit}</span></span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full transition-all duration-1000",
                            percent > 80 ? "bg-rose-500" : percent > 50 ? "bg-amber-500" : "bg-brand-accent"
                          )}
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2">
                <Button 
                  className="w-full bg-slate-900 border-none text-white font-bold h-11 rounded-xl shadow-premium hover:bg-slate-800 transition-all active:scale-[0.98] cursor-pointer"
                  onClick={handleUpgrade}
                >
                  <Zap className="h-4 w-4 mr-2 fill-current" />
                  Upgrade Capacity
                </Button>
                <p className="text-[10px] text-center text-slate-400 font-medium mt-3 uppercase tracking-tighter italic">
                  Next renewal on {format(new Date(company.renewsAt), "MMMM dd, yyyy")}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Improved Table Layout */}
        <Card className="border-none shadow-premium overflow-hidden bg-white">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 px-6 py-5">
            <div>
              <CardTitle className="text-xl font-bold text-slate-900 leading-none">Global Active Shipments</CardTitle>
              <p className="text-xs text-slate-500 font-medium mt-1 uppercase border-l-2 border-brand-accent pl-2 ml-0.5">Monitoring {shipments.length} live units</p>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50/70 border-b border-slate-100">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="py-4 px-6 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">ID Reference</TableHead>
                    <TableHead className="py-4 px-6 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Transit Vector</TableHead>
                    <TableHead className="py-4 px-6 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest text-center">Current Status</TableHead>
                    <TableHead className="py-4 px-6 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest text-right">ETA Profile</TableHead>
                    <TableHead className="py-4 px-6 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shipments.map((shipment) => (
                    <TableRow 
                      key={shipment.id} 
                      className="group hover:bg-slate-50/80 transition-all border-b border-slate-100/50 cursor-pointer"
                      onClick={() => router.push(`/orders/${shipment.id}`)}
                    >
                      <TableCell className="px-6 py-4">
                        <div className="flex flex-col">
                           <span className="font-black text-brand-primary text-sm tracking-tight">{shipment.id}</span>
                           <span className="text-[10px] text-slate-400 font-bold tracking-tighter uppercase">{shipment.cargoType}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex flex-col">
                             <span className="text-xs font-bold text-slate-700">{shipment.origin.split(',')[0]}</span>
                             <span className="text-[9px] text-slate-400 uppercase font-medium">{shipment.origin.split(',')[1]}</span>
                          </div>
                          
                          <span className="text-slate-300 font-medium text-xs px-2">—</span>
                          
                          <div className="flex flex-col">
                             <span className="text-xs font-bold text-slate-700">{shipment.destination.split(',')[0]}</span>
                             <span className="text-[9px] text-slate-400 uppercase font-medium">{shipment.destination.split(',')[1]}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-center">
                        <div className="inline-block transform transition-transform group-hover:scale-105">
                           {getStatusBadge(shipment.status)}
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-right">
                        <div className="flex flex-col items-end">
                           <span className="text-sm font-black text-slate-700 tracking-tight">{format(new Date(shipment.estimatedArrival), "MMM dd")}</span>
                           <span className="text-[10px] text-slate-400 font-bold uppercase">{format(new Date(shipment.estimatedArrival), "yyyy")}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-center">
                         <button className="p-1.5 rounded-lg hover:bg-slate-200/50 transition-colors cursor-pointer">
                            <MoreVertical className="h-4 w-4 text-slate-400" />
                         </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {shipments.length === 0 && (
              <div className="py-20 flex flex-col items-center justify-center text-center px-10">
                 <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <Package className="h-10 w-10 text-slate-200" />
                 </div>
                 <h4 className="text-lg font-bold text-slate-900">No shipments found</h4>
                 <p className="text-sm text-slate-500 max-w-xs mt-1">Start tracking your fleet by initializing your first global shipment unit.</p>
                 <Button 
                  className="mt-6 font-bold px-8 cursor-pointer"
                  onClick={() => console.log("Open quick start")}
                 >
                  Quick Start Guide
                 </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
