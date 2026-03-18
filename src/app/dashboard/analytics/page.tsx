"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Clock,
  PackageCheck,
  Truck,
  CalendarDays,
  Download
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { shipments } from "@/mock";
import { cn } from "@/lib/utils";

// Mock Data for Analytics
const volumeTrendsData = [
  { month: "Jan", volume: 145 },
  { month: "Feb", volume: 168 },
  { month: "Mar", volume: 210 },
  { month: "Apr", volume: 190 },
  { month: "May", volume: 245 },
  { month: "Jun", volume: 280 },
  { month: "Jul", volume: 310 },
];

const delayTrendsData = [
  { week: "W1", weather: 12, customs: 5, port: 8 },
  { week: "W2", weather: 4, customs: 7, port: 15 },
  { week: "W3", weather: 18, customs: 4, port: 10 },
  { week: "W4", weather: 2, customs: 6, port: 22 },
];

const onTimeDeliveryData = [
  { name: "On Time", value: 78 },
  { name: "Delayed < 3 days", value: 12 },
  { name: "Delayed > 3 days", value: 7 },
  { name: "Lost/Damaged", value: 3 },
];

const carrierPerformanceData = [
  { name: "Maersk", shipments: 1240, onTime: 82, avgDelay: 2.1, rating: 4.8 },
  { name: "MSC", shipments: 980, onTime: 76, avgDelay: 3.4, rating: 4.2 },
  { name: "CMA CGM", shipments: 850, onTime: 88, avgDelay: 1.2, rating: 4.9 },
  { name: "Hapag-Lloyd", shipments: 620, onTime: 71, avgDelay: 4.5, rating: 3.8 },
  { name: "Evergreen", shipments: 410, onTime: 79, avgDelay: 2.8, rating: 4.4 },
];

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#64748b'];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6m");

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-blue-600" />
              Analytics & Performance
            </h1>
            <p className="text-sm text-slate-500 mt-1">Operational insights and carrier performance metrics.</p>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="flex bg-slate-100 p-1 rounded-lg">
               {(["1m", "3m", "6m", "1y"] as const).map(f => (
                 <button
                   key={f}
                   onClick={() => setTimeRange(f)}
                   className={`px-3 py-1 text-xs font-medium rounded-md uppercase transition-colors ${
                     timeRange === f ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                   }`}
                 >
                   {f}
                 </button>
               ))}
             </div>
             <Button variant="secondary" className="h-8 md:h-9 text-xs gap-1.5 shrink-0 hidden sm:flex">
               <Download className="h-3.5 w-3.5" />
               Export Report
             </Button>
          </div>
        </div>

        {/* Global KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                <PackageCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 mb-1">Total Volume</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-slate-900">4,850</h3>
                  <span className="flex items-center text-xs font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                    <TrendingUp className="h-3 w-3 mr-0.5" /> 14%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-lg shrink-0">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 mb-1">On-Time Delivery</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-slate-900">78%</h3>
                  <span className="flex items-center text-xs font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                    <TrendingUp className="h-3 w-3 mr-0.5" /> 2.4%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-lg shrink-0">
                <CalendarDays className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 mb-1">Avg Transit Time</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-slate-900">22<span className="text-base text-slate-500 font-medium ml-1">Days</span></h3>
                  <span className="flex items-center text-xs font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                    <TrendingUp className="h-3 w-3 mr-0.5" /> 1.2d
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-lg shrink-0">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 mb-1">Active Carriers</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-slate-900">14</h3>
                  <span className="flex items-center text-xs font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                    Stable
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6">
           
           {/* Volume Trends */}
           <Card className="lg:col-span-2">
             <CardHeader>
               <CardTitle>Shipment Volume Trends</CardTitle>
               <CardDescription>Monthly shipment lifecycle completion across regions.</CardDescription>
             </CardHeader>
             <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={volumeTrendsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area type="monotone" dataKey="volume" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorVolume)" />
                  </AreaChart>
                </ResponsiveContainer>
             </CardContent>
           </Card>

           {/* On-Time Delivery */}
           <Card>
             <CardHeader>
               <CardTitle>Delivery Performance</CardTitle>
               <CardDescription>Overall schedule adherence rate.</CardDescription>
             </CardHeader>
             <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={onTimeDeliveryData}
                      cx="50%"
                      cy="45%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {onTimeDeliveryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ fontWeight: 600 }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#64748b' }} />
                  </PieChart>
                </ResponsiveContainer>
             </CardContent>
           </Card>

        </div>

        {/* Lower Row */}
        <div className="grid lg:grid-cols-3 gap-6">
           
           {/* Delay Root Causes */}
           <Card className="lg:col-span-1">
             <CardHeader>
               <CardTitle>Top Delay Root Causes</CardTitle>
               <CardDescription>Weekly breakdown of delay factors.</CardDescription>
             </CardHeader>
             <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={delayTrendsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <RechartsTooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Legend verticalAlign="top" iconType="circle" wrapperStyle={{ fontSize: '12px', paddingBottom: '10px' }} />
                    <Bar dataKey="weather" stackId="a" fill="#0ea5e9" name="Weather" radius={[0, 0, 4, 4]} />
                    <Bar dataKey="customs" stackId="a" fill="#8b5cf6" name="Customs" />
                    <Bar dataKey="port" stackId="a" fill="#f43f5e" name="Port Congestion" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
             </CardContent>
           </Card>

           {/* Carrier Performance Table */}
           <Card className="lg:col-span-2 flex flex-col">
             <CardHeader>
               <CardTitle>Carrier Reliability Metrics</CardTitle>
               <CardDescription>Performance scorecard for top shipping lines.</CardDescription>
             </CardHeader>
             <CardContent className="flex-1 p-0 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Carrier Name</TableHead>
                      <TableHead className="text-right">Shipments (YTD)</TableHead>
                      <TableHead className="text-right">On-Time %</TableHead>
                      <TableHead className="text-right">Avg Delay (Days)</TableHead>
                      <TableHead className="text-right">Rating</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {carrierPerformanceData.map((carrier, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-bold text-slate-800">{carrier.name}</TableCell>
                        <TableCell className="text-right font-medium text-slate-600">{carrier.shipments.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <span className={cn(
                            "font-bold",
                            carrier.onTime >= 80 ? "text-green-600" : carrier.onTime >= 75 ? "text-amber-500" : "text-red-500"
                          )}>
                            {carrier.onTime}%
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                           {carrier.avgDelay}d
                        </TableCell>
                        <TableCell className="text-right">
                           <Badge variant={carrier.rating >= 4.5 ? "success" : carrier.rating >= 4.0 ? "info" : "warning"}>
                             {carrier.rating} / 5.0
                           </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
             </CardContent>
           </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
