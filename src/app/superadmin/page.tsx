"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { 
  Building2, 
  Users, 
  Container, 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Globe2,
  Zap,
  ShieldCheck,
  Activity,
  ArrowRight
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { companyTenants } from "@/mock";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Platform-wide growth data
const platformTrafficData = [
  { name: "Sep", shipments: 4500, value: 2.1 },
  { name: "Oct", shipments: 5200, value: 2.4 },
  { name: "Nov", shipments: 6100, value: 2.8 },
  { name: "Dec", shipments: 8400, value: 3.9 },
  { name: "Jan", shipments: 7800, value: 3.6 },
  { name: "Feb", shipments: 9200, value: 4.2 },
  { name: "Mar", shipments: 10500, value: 4.8 },
];

const regionDistribution = [
  { name: "Asia-Pacific", value: 45, color: "#3b82f6" },
  { name: "North America", value: 30, color: "#10b981" },
  { name: "Europe", value: 20, color: "#6366f1" },
  { name: "Middle East", value: 5, color: "#f59e0b" },
];

export default function SuperAdminDashboard() {
  const totalShipments = companyTenants.reduce((acc, curr) => acc + curr.activeShipments, 0);
  const totalRevenue = companyTenants.reduce((acc, curr) => acc + curr.totalSpend, 0);
  const totalUsers = companyTenants.reduce((acc, curr) => acc + curr.userCount, 0);

  return (
    <div className="flex flex-col gap-8">
      {/* Platform Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Platform Control</h1>
          <p className="text-slate-500 font-medium">Real-time oversight across all tenants and infrastructure.</p>
        </div>
        <div className="flex gap-3">
           <Button variant="secondary" className="gap-2 border-slate-200">
             <Zap className="h-4 w-4 text-blue-500" />
             Infrastructure Logs
           </Button>
           <Button className="gap-2 bg-slate-900 text-white shadow-xl shadow-slate-200">
             <ShieldCheck className="h-4 w-4" />
             Security Audit
           </Button>
        </div>
      </div>

      {/* High-Level Global KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-none shadow-sm ring-1 ring-slate-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Building2 className="h-5 w-5" />
              </div>
              <Badge variant="success" className="text-[10px] flex items-center gap-0.5">
                <ArrowUpRight className="h-3 w-3" /> +3
              </Badge>
            </div>
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Total Companies</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">{companyTenants.length}</h3>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm ring-1 ring-slate-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Container className="h-5 w-5" />
              </div>
              <Badge variant="success" className="text-[10px] flex items-center gap-0.5">
                <ArrowUpRight className="h-3 w-3" /> 12%
              </Badge>
            </div>
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Global Shipments</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">{totalShipments}</h3>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm ring-1 ring-slate-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
              <Badge variant="success" className="text-[10px] flex items-center gap-0.5">
                <ArrowUpRight className="h-3 w-3" /> 8%
              </Badge>
            </div>
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Active Users</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">{totalUsers}</h3>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm ring-1 ring-slate-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <DollarSign className="h-5 w-5" />
              </div>
              <Badge variant="error" className="text-[10px] flex items-center gap-0.5">
                <ArrowDownRight className="h-3 w-3" /> 2.4%
              </Badge>
            </div>
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Monthly GTV</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">${(totalRevenue / 10).toLocaleString()}</h3>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Global Traffic Chart */}
        <Card className="lg:col-span-2 shadow-sm border-slate-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2 font-black">
                  <Activity className="h-5 w-5 text-blue-500" />
                  Platform Throughput (Units)
                </CardTitle>
                <CardDescription>Aggregate shipment volume across all verified tenants.</CardDescription>
              </div>
              <select className="bg-slate-100 border-none rounded-lg text-xs font-bold p-2 focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Last 6 Months</option>
                <option>Last Year</option>
              </select>
            </div>
          </CardHeader>
          <CardContent className="h-[350px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={platformTrafficData}>
                <defs>
                   <linearGradient id="colorShipments" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                   </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(val) => `${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '12px' }}
                  labelStyle={{ fontWeight: 800, marginBottom: '4px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="shipments" 
                  stroke="#3b82f6" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorShipments)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Region Distribution */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 font-black">
              <Globe2 className="h-5 w-5 text-emerald-500" />
              Regional Load
            </CardTitle>
            <CardDescription>Server & traffic distribution by region.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] pt-4 flex flex-col items-center justify-center">
             <div className="w-full h-full flex items-center justify-center">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={regionDistribution} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#1e293b' }} width={100} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} />
                    <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={32}>
                       {regionDistribution.map((entry, index) => (
                         <Cell key={index} fill={entry.color} />
                       ))}
                    </Bar>
                 </BarChart>
               </ResponsiveContainer>
             </div>
             <div className="mt-4 grid grid-cols-2 gap-4 w-full">
                {regionDistribution.map(r => (
                  <div key={r.name} className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{r.name}</span>
                    <span className="text-sm font-black text-slate-900">{r.value}%</span>
                  </div>
                ))}
             </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Companies Table */}
      <Card className="shadow-sm border-slate-200 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-black">Performance Leaderboard</CardTitle>
            <CardDescription>Top company tenants by shipment volume and platform utilization.</CardDescription>
          </div>
          <Link href="/superadmin/companies">
            <Button variant="secondary" className="h-9 gap-2 font-bold text-xs ring-1 ring-slate-200">
              Manage All Tenants
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50 border-y border-slate-100">
              <TableRow>
                <TableHead className="font-extrabold text-slate-800 uppercase tracking-tighter text-[11px]">Company</TableHead>
                <TableHead className="font-extrabold text-slate-800 uppercase tracking-tighter text-[11px]">Industry</TableHead>
                <TableHead className="font-extrabold text-slate-800 uppercase tracking-tighter text-[11px] text-center">Active Shipments</TableHead>
                <TableHead className="font-extrabold text-slate-800 uppercase tracking-tighter text-[11px] text-right">Utilization</TableHead>
                <TableHead className="font-extrabold text-slate-800 uppercase tracking-tighter text-[11px]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companyTenants.slice(0, 4).map((company) => (
                <TableRow key={company.id} className="group hover:bg-slate-50/50 transition-all border-b border-slate-100 last:border-0">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 bg-white border border-slate-200 rounded-lg flex items-center justify-center font-black text-blue-600 shadow-sm">
                        {company.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{company.name}</span>
                        <span className="text-[10px] text-slate-500 font-bold">ID: {company.id}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-semibold text-slate-600">{company.industry}</span>
                  </TableCell>
                  <TableCell className="text-center font-black text-slate-900">
                    {company.activeShipments}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-3 text-xs font-bold text-slate-600">
                       <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full transition-all duration-1000",
                              company.activeShipments > 80 ? "bg-emerald-500" : company.activeShipments > 30 ? "bg-amber-500" : "bg-blue-500"
                            )} 
                            style={{ width: `${Math.min(company.activeShipments, 100)}%` }}
                          ></div>
                       </div>
                       {Math.min(company.activeShipments, 100)}%
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={company.status === "active" ? "success" : company.status === "trial" ? "info" : "error"} className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
                      {company.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Footer for System Health */}
      <div className="flex items-center justify-center gap-8 py-4 opacity-50">
         <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
            Main Gateway: Operational
         </div>
         <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
            Edge Nodes: 16/16 Active
         </div>
         <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
            Compliance: Verified
         </div>
      </div>
    </div>
  );
}
