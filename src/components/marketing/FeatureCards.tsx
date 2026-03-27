"use client";

import { motion } from "framer-motion";
import { Globe, Zap, Bell, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Global Coverage",
    desc: "Track shipments across 120+ countries and 340+ carrier networks worldwide.",
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.15)",
  },
  {
    icon: Zap,
    title: "Real-Time Tracking",
    desc: "Live GPS updates every 60 seconds with milestone alerts at every port.",
    color: "#10b981",
    glow: "rgba(16,185,129,0.15)",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    desc: "Instant notifications for delays, customs holds, and route deviations.",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.15)",
  },
  {
    icon: BarChart3,
    title: "Predictive Analytics",
    desc: "AI-powered ETA predictions and cost optimization recommendations.",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.15)",
  },
];

export default function FeatureCards() {
  return (
    <section className="py-24 bg-[#0d1120]" id="features">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-14">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-500/30 bg-blue-500/10 text-blue-400">
            Platform Features
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Everything You Need to Ship Smarter
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Built for logistics teams who need precision, speed, and visibility.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="relative rounded-2xl p-6 border border-white/10 bg-[#0B0F19] cursor-default overflow-hidden group transition-all duration-300"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 40px ${f.glow}, 0 4px 24px rgba(0,0,0,0.4)`; (e.currentTarget as HTMLElement).style.borderColor = f.color + "40"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.4)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
            >
              {/* Glow bg */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${f.glow}, transparent)` }} />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: f.color + "15" }}>
                  <f.icon className="h-6 w-6" style={{ color: f.color }} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
