"use client";

import { motion } from "framer-motion";
import { Globe, Zap, Bell, BarChart3, Shield, Layers } from "lucide-react";

const features = [
  { icon: Globe, title: "Global Coverage", desc: "Track across 120+ countries and 340+ carrier networks with unified visibility.", color: "#3b82f6" },
  { icon: Zap, title: "Real-Time Tracking", desc: "Live GPS updates every 60 seconds with automated milestone alerts.", color: "#06b6d4" },
  { icon: Bell, title: "Smart Alerts", desc: "Instant notifications for delays, customs holds, and route deviations.", color: "#f59e0b" },
  { icon: BarChart3, title: "Predictive Analytics", desc: "AI-powered ETA predictions and cost optimization recommendations.", color: "#8b5cf6" },
  { icon: Shield, title: "Customs Clearance", desc: "Full customs event timeline with document status and duty estimates.", color: "#10b981" },
  { icon: Layers, title: "Multi-Modal", desc: "Sea, air, road, and rail — all modes tracked in one unified platform.", color: "#ec4899" },
];

export default function FeatureCards() {
  return (
    <section id="features" className="py-28 bg-[#060b14]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }}
          className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4 border border-blue-500/25 bg-blue-500/8 text-blue-400">
            Platform Features
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Everything You Need to Ship Smarter</h2>
          <p className="text-zinc-500 max-w-xl mx-auto">Built for logistics teams who need precision, speed, and visibility at scale.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl p-6 border border-white/8 cursor-default overflow-hidden"
              style={{ background: "rgba(255,255,255,0.02)" }}>
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{ background: `radial-gradient(ellipse 80% 60% at 30% 0%, ${f.color}12, transparent)` }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl pointer-events-none border"
                style={{ borderColor: f.color + "30" }} />

              <div className="relative z-10">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-200 group-hover:scale-110"
                  style={{ background: f.color + "15" }}>
                  <f.icon className="h-5 w-5" style={{ color: f.color }} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
