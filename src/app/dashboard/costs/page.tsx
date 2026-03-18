"use client";

import React, { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  Clock, 
  ArrowRight,
  PieChart as PieChartIcon,
  BarChart3,
  Download
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie,
  Legend,
  LineChart,
  Line
} from "recharts";
import { shipments, logisticsCosts } from "@/mock";
import { cn } from "@/lib/utils";
import Link from "next/link";

const CATEGORY_COLORS: Record<string, string> = {
  freight: "#3b82f6",   // Blue
  customs: "#ef4444",   // Red
  insurance: "#10b981", // Green
  storage: "#f59e0b",   // Amber
  other: "#6366f1",     // Indigo
};

// Monthly cost trend data
const monthlyTrendData = [
  { month: "Oct", freight: 12500, customs: 3200, insurance: 800, storage: 400 },
  { month: "Nov", freight: 14200, customs: 2800, insurance: 750, storage: 600 },
  { month: "Dec", freight: 18500, customs: 4100, insurance: 920, storage: 1200 },
  { month: "Jan", freight: 15100, customs: 3500, insurance: 880, storage: 500 },
  { month: "Feb", freight: 16800, customs: 3900, insurance: 850, storage: 450 },
  { month: "Mar", freight: 12800, customs: 2000, insurance: 550, storage: 200 },
];

const carrierCostData = [
  { name: "Maersk", avgCost: 4200, shipments: 45 },
  { name: "MSC", avgCost: 3850, shipments: 38 },
  { name: "CMA CGM", avgCost: 4500, shipments: 32 },
  { name: "Hapag-Lloyd", avgCost: 4100, shipments: 28 },
  { name: "Evergreen", avgCost: 3600, shipments: 22 },
];

export default function LogisticsCostsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Calculate totals from mock data
  const totals = useMemo(() => {
    const total = logisticsCosts.reduce((acc, curr) => acc + curr.amount, 0);
    const paid = logisticsCosts.filter(c => c.status === "paid").reduce((acc, curr) => acc + curr.amount, 0);
    const pending = total - paid;
    return { total, paid, pending };
  }, []);

  const categoryData = useMemo(() => {
    const categories: Record<string, number> = {};
    logisticsCosts.forEach(cost => {
      categories[cost.category] = (categories[cost.category] || 0) + cost.amount;
    });
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-emerald-600" />
              Logistics Cost Analysis
            </h1>
            <p className="text-sm text-slate-500 mt-1">Global logistics spend, carrier benchmarking, and invoice tracking.</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
              <Download className="h-4 w-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold shadow-md hover:bg-emerald-700 transition-colors">
              Add Invoice
            </button>
          </div>
        </div>

        {/* Global Financial KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
                <DollarSign className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Spend (YTD)</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-black text-slate-900">${totals.total.toLocaleString()}</h3>
                  <Badge variant="success" className="text-[10px] py-0 px-1">
                    <TrendingDown className="h-2.5 w-2.5 mr-0.5" /> 8.2%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Avg. Cost / Shipment</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-black text-slate-900">$5,240</h3>
                  <Badge variant="error" className="text-[10px] py-0 px-1">
                    <TrendingUp className="h-2.5 w-2.5 mr-0.5" /> 4.1%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-lg shrink-0">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Pending Invoices</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-black text-slate-900">${totals.pending.toLocaleString()}</h3>
                  <span className="text-xs text-slate-400 font-medium italic">5 Items</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-slate-400">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 bg-slate-50 text-slate-600 rounded-lg shrink-0">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Paid to Date</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-black text-slate-900">${totals.paid.toLocaleString()}</h3>
                  <div className="w-16 bg-slate-100 rounded-full h-1.5 mt-1.5 overflow-hidden">
                    <div className="bg-emerald-500 h-full" style={{ width: '68%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Monthly Cost Breakdown Chart */}
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                Monthly Spend Trends
              </CardTitle>
              <CardDescription>Visualizing global logistics expenditure across categories.</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyTrendData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(v) => `$${v/1000}k`} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '12px' }} />
                  <Bar dataKey="freight" name="Freight" stackId="a" fill={CATEGORY_COLORS.freight} radius={[0, 0, 0, 0]} />
                  <Bar dataKey="customs" name="Customs" stackId="a" fill={CATEGORY_COLORS.customs} />
                  <Bar dataKey="insurance" name="Insurance" stackId="a" fill={CATEGORY_COLORS.insurance} />
                  <Bar dataKey="storage" name="Storage" stackId="a" fill={CATEGORY_COLORS.storage} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Carrier Performance Comparison */}
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <PieChartIcon className="h-5 w-5 text-emerald-500" />
                Carrier Cost Benchmarking
              </CardTitle>
              <CardDescription>Analyzing average per-unit costs compared to volume.</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={carrierCostData} layout="vertical" margin={{ left: 20 }}>
                   <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                   <XAxis type="number" hide />
                   <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 13, fontWeight: 600, fill: '#1e293b' }} />
                   <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    formatter={(value) => [`$${value}`, 'Avg Cost']}
                  />
                  <Bar dataKey="avgCost" fill="#10b981" radius={[0, 4, 4, 0]} barSize={24}>
                    {carrierCostData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? "#10b981" : "#d1fae5"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Costs Table */}
        <Card className="shadow-sm border-slate-200 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg">Recent Financial Transactions</CardTitle>
              <CardDescription>Tracking invoices and categorical costs per shipment.</CardDescription>
            </div>
            <Link href="/dashboard/shipments" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
              Manage Shipments <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
             <Table>
               <TableHeader className="bg-slate-50">
                 <TableRow>
                   <TableHead className="font-bold text-slate-800">Date</TableHead>
                   <TableHead className="font-bold text-slate-800">Shipment ID</TableHead>
                   <TableHead className="font-bold text-slate-800">Category</TableHead>
                   <TableHead className="font-bold text-slate-800 text-right">Amount</TableHead>
                   <TableHead className="font-bold text-slate-800">Status</TableHead>
                   <TableHead className="font-bold text-slate-800 text-right">Actions</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {logisticsCosts.map((cost) => {
                   const shipment = shipments.find(s => s.id === cost.shipmentId);
                   return (
                     <TableRow key={cost.id} className="hover:bg-slate-50/50 transition-colors group">
                       <TableCell className="text-sm font-medium text-slate-500">
                         {cost.date}
                       </TableCell>
                       <TableCell>
                         <Link href={`/dashboard/shipments/${cost.shipmentId}`} className="font-bold text-blue-600 hover:underline">
                            {shipment?.trackingNumber || cost.shipmentId}
                         </Link>
                       </TableCell>
                       <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[cost.category] }}></div>
                            <span className="capitalize text-sm font-semibold text-slate-700">{cost.category}</span>
                          </div>
                       </TableCell>
                       <TableCell className="text-right font-black text-slate-900">
                          ${cost.amount.toLocaleString()}
                       </TableCell>
                       <TableCell>
                         <Badge variant={cost.status === "paid" ? "success" : "warning"} className="uppercase text-[10px] font-black">
                            {cost.status}
                         </Badge>
                       </TableCell>
                       <TableCell className="text-right">
                         <button className="text-slate-400 hover:text-blue-600 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                           <Download className="h-4 w-4" />
                         </button>
                       </TableCell>
                     </TableRow>
                   );
                 })}
               </TableBody>
             </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
