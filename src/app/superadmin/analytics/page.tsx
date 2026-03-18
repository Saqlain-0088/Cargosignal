"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  CalendarDays,
  Zap,
  Activity,
  Server,
  Database,
  Search,
  ArrowRight
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
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { cn } from "@/lib/utils";

const platformSpendData = [
  { month: "Oct", revenue: 420000, margin: 18 },
  { month: "Nov", revenue: 450000, margin: 19 },
  { month: "Dec", revenue: 580000, margin: 22 },
  { month: "Jan", revenue: 520000, margin: 21 },
  { month: "Feb", revenue: 610000, margin: 23 },
  { month: "Mar", revenue: 680000, margin: 25 },
];

const infrastructureHealth = [
  { time: "00:00", cpu: 12, memory: 45, latency: 45 },
  { time: "04:00", cpu: 15, memory: 48, latency: 42 },
  { time: "08:00", cpu: 45, memory: 65, latency: 85 },
  { time: "12:00", cpu: 55, memory: 72, latency: 98 },
  { time: "16:00", cpu: 48, memory: 68, latency: 78 },
  { time: "20:00", cpu: 22, memory: 52, latency: 55 },
  { time: "23:59", cpu: 14, memory: 46, latency: 40 },
];

const subscriptionTiers = [
  { name: "Enterprise", value: 12, color: "#3b82f6" },
  { name: "Professional", value: 28, color: "#10b981" },
  { name: "Basic", value: 45, color: "#6366f1" },
  { name: "Free Trial", value: 15, color: "#f59e0b" },
];

export default function SystemAnalyticsPage() {
  return (
    <div className="flex flex-col gap-8 p-base">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-primary tracking-tight flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-brand-accent" />
            System Analytics
          </h1>
          <p className="text-slate-500 mt-1">Deep-dive into platform performance, revenue, and infrastructure health.</p>
        </div>
        <div className="flex gap-3">
           <Button variant="secondary" className="gap-2 bg-white border-surface-border font-semibold">
             <CalendarDays className="h-4 w-4" />
             Last 30 Days
           </Button>
           <Button className="gap-2 bg-brand-accent hover:bg-brand-accent/90 text-white shadow-premium">
             <Download className="h-4 w-4" />
             Generate Report
           </Button>
        </div>
      </div>

      {/* Global Performance Monitoring */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-premium border-surface-border overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-surface-border">
             <CardTitle className="text-lg font-bold flex items-center gap-2 text-brand-primary text-brand-primary">
                <TrendingUp className="h-5 w-5 text-status-success" />
                Revenue Growth (Monthly GTV)
             </CardTitle>
             <CardDescription>Aggregate value of all logistics transactions processed.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] p-6">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={platformSpendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                   <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-status-success)" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="var(--color-status-success)" stopOpacity={0}/>
                      </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-surface-border)" />
                   <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} dy={10} />
                   <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(val) => `$${val/1000}k`} />
                   <Tooltip 
                     contentStyle={{ borderRadius: '12px', border: '1px solid var(--color-surface-border)', boxShadow: 'var(--shadow-premium)', padding: '12px' }}
                     formatter={(val) => [`$${val.toLocaleString()}`, "GTV"]}
                   />
                   <Area type="monotone" dataKey="revenue" stroke="var(--color-status-success)" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-premium border-surface-border overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-surface-border">
             <CardTitle className="text-lg font-bold flex items-center gap-2 text-brand-primary text-brand-primary">
                <Activity className="h-5 w-5 text-status-info" />
                Platform Infrastructure Load
             </CardTitle>
             <CardDescription>Real-time server resource utilization and API latency (ms).</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] p-6">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={infrastructureHealth} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-surface-border)" />
                   <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} dy={10} />
                   <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                   <Tooltip 
                     contentStyle={{ borderRadius: '12px', border: '1px solid var(--color-surface-border)', boxShadow: 'var(--shadow-premium)', padding: '12px' }}
                   />
                   <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: '20px', fontSize: '12px', fontWeight: 600 }} />
                   <Line type="monotone" dataKey="cpu" name="CPU Avg (%)" stroke="var(--color-brand-accent)" strokeWidth={3} dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
                   <Line type="monotone" dataKey="latency" name="Latency (ms)" stroke="var(--color-status-warning)" strokeWidth={3} dot={false} strokeDasharray="5 5" activeDot={{ r: 4, strokeWidth: 0 }} />
                </LineChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Tier Distribution */}
        <Card className="shadow-premium border-surface-border overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-surface-border">
             <CardTitle className="text-base font-bold text-brand-primary">Subscription Density</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center p-6">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={subscriptionTiers}
                   cx="50%"
                   cy="50%"
                   innerRadius={60}
                   outerRadius={100}
                   paddingAngle={8}
                   dataKey="value"
                 >
                   {subscriptionTiers.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                   ))}
                 </Pie>
                 <Tooltip />
                 <Legend verticalAlign="bottom" align="center" layout="horizontal" iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 600, paddingTop: '20px' }} />
               </PieChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Server Clusters */}
        <Card className="md:col-span-2 shadow-premium border-surface-border overflow-hidden">
           <CardHeader className="bg-slate-50/50 border-b border-surface-border">
              <CardTitle className="text-base font-bold text-brand-primary">Cluster Health Registry</CardTitle>
              <CardDescription>Live status of global production nodes.</CardDescription>
           </CardHeader>
           <CardContent className="p-0">
              <div className="divide-y divide-surface-border">
                 {[
                   { name: "US-EAST-1", usage: 42, health: "HEALTHY", region: "Virginia, USA" },
                   { name: "EU-WEST-1", usage: 78, health: "HIGH LOAD", region: "Dublin, Ireland" },
                   { name: "AP-SOUTH-1", usage: 12, health: "MAINTENANCE", region: "Mumbai, India" },
                   { name: "SA-EAST-1", usage: 35, health: "HEALTHY", region: "São Paulo, Brazil" }
                 ].map((node) => (
                   <div key={node.name} className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                         <div className={cn(
                           "h-11 w-11 rounded-ui flex items-center justify-center border",
                           node.health === "HEALTHY" ? "bg-status-success/10 border-status-success/20 text-status-success" : 
                           node.health === "MAINTENANCE" ? "bg-slate-100 border-surface-border text-slate-400" : "bg-status-warning/10 border-status-warning/20 text-status-warning"
                         )}>
                           <Server className="h-5 w-5" />
                         </div>
                         <div>
                            <p className="font-bold text-brand-primary tracking-tight text-sm uppercase">{node.name}</p>
                            <p className="text-xs text-slate-500 font-medium">{node.region}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-10">
                         <div className="hidden sm:flex flex-col items-end gap-1.5">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Load Factor</span>
                            <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                               <div className="bg-brand-accent h-full" style={{ width: `${node.usage}%` }}></div>
                            </div>
                         </div>
                         <Badge 
                           variant={node.health === "HEALTHY" ? "success" : node.health === "MAINTENANCE" ? "default" : "warning"}
                           className="font-bold uppercase text-[10px] min-w-[110px] justify-center py-1"
                         >
                            {node.health}
                         </Badge>
                      </div>
                   </div>
                 ))}
              </div>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}
