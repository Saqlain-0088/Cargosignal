"use client";

import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle, Clock, ArrowUpRight, Ship, Package, CheckCircle2 } from "lucide-react";

const kpis = [
  { label: "Total Shipments", value: "1,284", change: "+12%", icon: Ship, color: "#3b82f6" },
  { label: "Delayed", value: "23", change: "-4%", icon: AlertTriangle, color: "#f59e0b", down: true },
  { label: "ETA Accuracy", value: "98.4%", change: "+0.6%", icon: Clock, color: "#10b981" },
];

const recentShipments = [
  { id: "CS-8821", route: "Mumbai → LA", status: "In Transit", progress: 72, color: "#3b82f6" },
  { id: "CS-8820", route: "Dubai → Hamburg", status: "Customs Hold", progress: 45, color: "#f59e0b" },
  { id: "CS-8819", route: "Shanghai → Rotterdam", status: "Delivered", progress: 100, color: "#10b981" },
  { id: "CS-8818", route: "Singapore → NY", status: "In Transit", progress: 30, color: "#3b82f6" },
];

export default function DashboardPreview() {
  return (
    <section className="py-24 bg-[#0B0F19]" id="dashboard">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-14">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-500/30 bg-blue-500/10 text-blue-400">
            Platform Preview
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Your Logistics Command Center
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Everything you need to manage global shipments in one unified dashboard.
          </p>
        </motion.div>

        {/* Dashboard mock */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="rounded-2xl border border-white/10 overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(13,21,38,0.95) 0%, rgba(11,15,25,0.98) 100%)", backdropFilter: "blur(20px)", boxShadow: "0 0 80px rgba(59,130,246,0.08), 0 40px 80px rgba(0,0,0,0.6)" }}>

          {/* Topbar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <div className="text-xs text-zinc-500 font-mono">app.cargosignal.com/dashboard</div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] text-green-400 font-medium">Live</span>
            </div>
          </div>

          <div className="p-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {kpis.map((kpi, i) => (
                <motion.div key={kpi.label}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="rounded-xl p-4 border border-white/10"
                  style={{ background: "rgba(255,255,255,0.03)" }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: kpi.color + "15" }}>
                      <kpi.icon className="h-4 w-4" style={{ color: kpi.color }} />
                    </div>
                    <div className={`flex items-center gap-0.5 text-xs font-semibold ${kpi.down ? "text-red-400" : "text-green-400"}`}>
                      <ArrowUpRight className={`h-3 w-3 ${kpi.down ? "rotate-180" : ""}`} />
                      {kpi.change}
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-white mb-0.5">{kpi.value}</div>
                  <div className="text-xs text-zinc-500">{kpi.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Shipments table */}
            <div className="rounded-xl border border-white/10 overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <span className="text-sm font-bold text-white">Active Shipments</span>
                <span className="text-xs text-blue-400 cursor-pointer hover:underline">View all →</span>
              </div>
              <div className="divide-y divide-white/5">
                {recentShipments.map((s, i) => (
                  <motion.div key={s.id}
                    initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-white/[0.02] transition-colors">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                    <div className="w-24 shrink-0">
                      <div className="text-xs font-mono text-zinc-300">{s.id}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-zinc-400 truncate">{s.route}</div>
                      <div className="mt-1 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${s.progress}%`, backgroundColor: s.color }} />
                      </div>
                    </div>
                    <div className="shrink-0">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: s.color + "20", color: s.color }}>
                        {s.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
