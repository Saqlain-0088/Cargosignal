"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { 
  Building2, 
  MapPin, 
  Search, 
  Ship,
  Clock,
  ArrowRight,
  ChevronDown
} from "lucide-react";
import { ports } from "@/mock";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer 
} from "recharts";

// Mock data generation for congestion
const portCongestionData = ports.map(port => {
  // Generate random past 7 days data for the chart
  const historicalData = Array.from({ length: 7 }).map((_, i) => ({
    day: `Day ${7-i}`,
    score: Math.floor(Math.random() * 60) + 20 + (port.code === 'USLAX' ? 20 : 0) // LAX generally more congested in this mock
  })).reverse();

  const currentScore = historicalData[historicalData.length - 1].score;
  const previousScore = historicalData[historicalData.length - 2].score;
  const trend = currentScore > previousScore ? 'up' : currentScore < previousScore ? 'down' : 'stable';
  const waitTime = Math.floor(currentScore / 10) + 1; // 1 to 10 days

  return {
    ...port,
    currentScore,
    historicalData,
    trend,
    avgWaitTime: `${waitTime} Days`,
    vesselsAtAnchorage: Math.floor(currentScore / 2),
    status: currentScore > 75 ? 'Severe' : currentScore > 50 ? 'Moderate' : 'Normal'
  };
});

// Add a few extra purely mock ports for the list
const extraMockPorts = [
  ...portCongestionData,
  {
    id: "P-003",
    name: "Port of Singapore",
    code: "SGSIN",
    country: "Singapore",
    coordinates: { lat: 1.290270, lng: 103.851959 },
    currentScore: 42,
    trend: 'stable' as const,
    avgWaitTime: "2 Days",
    vesselsAtAnchorage: 15,
    status: 'Normal',
    historicalData: [
      { day: "Day 1", score: 40 }, { day: "Day 2", score: 45 }, { day: "Day 3", score: 42 },
      { day: "Day 4", score: 48 }, { day: "Day 5", score: 41 }, { day: "Day 6", score: 39 }, { day: "Day 7", score: 42 }
    ]
  },
  {
    id: "P-004",
    name: "Port of Rotterdam",
    code: "NLRTM",
    country: "Netherlands",
    coordinates: { lat: 51.9244, lng: 4.4777 },
    currentScore: 68,
    trend: 'up' as const,
    avgWaitTime: "6 Days",
    vesselsAtAnchorage: 35,
    status: 'Moderate',
    historicalData: [
      { day: "Day 1", score: 50 }, { day: "Day 2", score: 55 }, { day: "Day 3", score: 58 },
      { day: "Day 4", score: 62 }, { day: "Day 5", score: 65 }, { day: "Day 6", score: 61 }, { day: "Day 7", score: 68 }
    ]
  }
];

export default function PortCongestionPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPortId, setSelectedPortId] = useState<string>(extraMockPorts[0].id);

  const selectedPort = extraMockPorts.find(p => p.id === selectedPortId) || extraMockPorts[0];

  const filteredPorts = extraMockPorts.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Normal":
        return <Badge variant="success">Normal</Badge>;
      case "Moderate":
        return <Badge variant="warning">Moderate</Badge>;
      case "Severe":
        return <Badge variant="error">Severe</Badge>;
      default:
        return <Badge variant="default">Unknown</Badge>;
    }
  };

  const getScoreColorClass = (score: number) => {
    if (score > 75) return "text-red-600";
    if (score > 50) return "text-amber-500";
    return "text-green-600";
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Port Congestion Monitor</h1>
          <p className="text-sm text-slate-500">Live indicators of global port capacity and predicted delays.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Chart Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-blue-600" />
                    {selectedPort.name} ({selectedPort.country})
                  </CardTitle>
                  <p className="text-sm text-slate-500 flex items-center gap-1">
                     <MapPin className="h-4 w-4" /> 
                     {selectedPort.coordinates.lat.toFixed(4)}, {selectedPort.coordinates.lng.toFixed(4)}
                     <span className="mx-2 text-slate-300">•</span>
                     LOCODE: {selectedPort.code}
                  </p>
                </div>
                <div className="text-right">
                   <p className="text-xs text-slate-500 font-semibold uppercase mb-1">Current Congestion</p>
                   <div className="flex items-center justify-end gap-3">
                     <span className={cn("text-3xl font-black", getScoreColorClass(selectedPort.currentScore))}>
                       {selectedPort.currentScore}
                     </span>
                     {getStatusBadge(selectedPort.status)}
                   </div>
                </div>
              </CardHeader>
              
              <div className="grid grid-cols-2 divide-x divide-slate-100 border-y border-slate-100 bg-slate-50/50">
                <div className="p-4 flex flex-col items-center justify-center">
                   <div className="flex items-center gap-2 text-slate-500 mb-1">
                     <Clock className="h-4 w-4" />
                     <span className="text-xs font-semibold uppercase tracking-wider">Avg Vessel Wait</span>
                   </div>
                   <span className="text-lg font-bold text-slate-800">{selectedPort.avgWaitTime}</span>
                </div>
                <div className="p-4 flex flex-col items-center justify-center">
                   <div className="flex items-center gap-2 text-slate-500 mb-1">
                     <Ship className="h-4 w-4" />
                     <span className="text-xs font-semibold uppercase tracking-wider">Vessels at Anchorage</span>
                   </div>
                   <span className="text-lg font-bold text-slate-800">{selectedPort.vesselsAtAnchorage}</span>
                </div>
              </div>

              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">7-Day Congestion Trend</h3>
                  <div className="flex items-center gap-2 text-xs">
                     <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Congestion Index (0-100)</span>
                  </div>
                </div>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedPort.historicalData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                      <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                      <RechartsTooltip 
                        contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ color: '#3b82f6', fontWeight: 600 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#3b82f6" 
                        strokeWidth={3} 
                        dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} 
                        activeDot={{ r: 6, fill: '#2563eb', strokeWidth: 0 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ports List */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search ports by name or code..." 
                className="pl-10 h-10 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Card className="flex flex-col h-[calc(100vh-[280px])] min-h-[500px]">
              <div className="p-3 border-b border-slate-100 bg-slate-50 rounded-t-xl flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <span>Port Name</span>
                <span>Congestion</span>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {filteredPorts.map((port) => (
                  <div 
                    key={port.id}
                    onClick={() => setSelectedPortId(port.id)}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all hover:border-blue-300 hover:shadow-sm",
                      selectedPortId === port.id ? "bg-blue-50/50 border-blue-400 ring-1 ring-blue-400" : "bg-white border-slate-200"
                    )}
                  >
                    <div className="flex-1 min-w-0 pr-3">
                      <p className={cn("font-bold truncate", selectedPortId === port.id ? "text-blue-900" : "text-slate-900")}>
                        {port.name}
                      </p>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <span className="font-mono bg-slate-100 px-1 rounded text-slate-600">{port.code}</span>
                        {port.country}
                      </p>
                    </div>
                    <div className="flex flex-col items-end shrink-0">
                      <div className="flex items-center gap-1">
                        <span className={cn("text-lg font-black", getScoreColorClass(port.currentScore))}>{port.currentScore}</span>
                      </div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">
                        Index
                      </div>
                    </div>
                  </div>
                ))}
                {filteredPorts.length === 0 && (
                  <div className="p-8 text-center text-slate-500 text-sm">
                    No ports found.
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
