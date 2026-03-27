"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Ship, AlertTriangle, Clock, TrendingUp } from "lucide-react";

const kpis = [
  { label: "Total Shipments", value: "1,284", change: "+12%", up: true, icon: Ship, color: "#3b82f6" },
  { label: "Delayed", value: "23", change: "-4%", up: false, icon: AlertTriangle, color: "#f59e0b" },
  { label: "ETA Accuracy", value: "98.4%", change: "+0.6%", up: true, icon: Clock, color: "#10b981" },
  { label: "On-Time Rate", value: "94.2%", change: "+1.2%", up: true, icon: TrendingUp, color: "#8b5cf6" },
];

const shipments = [
  { id: "CS-8821", route: "Mumbai → LA", status: "In Transit", progress: 72, color: "#3b82f6" },
  { id: "CS-8820", route: "Dubai → Hamburg", status: "Customs Hold", progress: 45, color: "#f59e0b" },
  { id: "CS-8819", route: "Shanghai → Rotterdam", status: "Delivered", progress: 100, color: "#10b981" },
  { id: "CS-8818", route: "Singapore → NY", status: "In Transit", progress: 30, color: "#3b82f6" },
  { id: "CS-8817", route: "Tokyo → LA", status: "Delivered", progress: 100, color: "#10b981" },
];

export default function DashboardPreview() {
  return (
    <section id="dashboard" className="py-28 bg-[#030609]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }}
          className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4 border border-blue-500/25 bg-blue-500/8 text-blue-400">
            Platform Preview
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Your Logistics Command Center</h2>
          <p className="text-zinc-500 max-w-xl mx-auto">Everything you need to manage global shipments in one unified dashboard.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8 }}
          className="rounded-2xl border border-white/10 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0a1628 0%, #060b14 100%)", boxShadow: "0 0 100px rgba(59,130,246,0.06), 0 60px 120px rgba(0,0,0,0.7)" }}>

          {/* Browser chrome */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/8 bg-white/[0.015]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/8">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] text-zinc-500 font-mono">app.cargosignal.com/dashboard</span>
            </div>
            <div className="text-[10px] text-zinc-600">Live</div>
          </div>

          <div className="p-6">
            {/* KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {kpis.map((kpi, i) => (
                <motion.div key={kpi.label}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="rounded-xl p-4 border border-white/8 bg-white/[0.02]">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: kpi.color + "15" }}>
                      <kpi.icon className="h-4 w-4" style={{ color: kpi.color }} />
                    </div>
                    <div className={`flex items-center gap-0.5 text-[10px] font-bold ${kpi.up ? "text-green-400" : "text-red-400"}`}>
                      {kpi.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {kpi.change}
                    </div>
                  </div>
                  <div className="text-xl font-extrabold text-white mb-0.5">{kpi.value}</div>
                  <div className="text-[10px] text-zinc-600 uppercase tracking-wider">{kpi.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Table */}
            <div className="rounded-xl border border-white/8 overflow-hidden bg-white/[0.015]">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/8">
                <span className="text-sm font-bold text-white">Active Shipments</span>
                <span className="text-xs text-blue-400 cursor-pointer">View all →</span>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {shipments.map((s, i) => (
                  <motion.div key={s.id}
                    initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-white/[0.02] transition-colors">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                    <div className="w-24 shrink-0 text-xs font-mono text-zinc-400">{s.id}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-zinc-500 mb-1.5 truncate">{s.route}</div>
                      <div className="h-1 bg-white/8 rounded-full overflow-hidden">
                        <motion.div className="h-full rounded-full"
                          initial={{ width: 0 }} whileInView={{ width: `${s.progress}%` }}
                          viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                          style={{ backgroundColor: s.color }} />
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
                      style={{ background: s.color + "18", color: s.color }}>{s.status}</span>
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
