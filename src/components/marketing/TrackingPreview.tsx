"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Package, Ship, FileCheck, MapPin, Clock } from "lucide-react";

const steps = [
  { label: "Booked", icon: FileCheck, done: true, active: false, time: "Mar 10, 08:15" },
  { label: "Loaded", icon: Package, done: true, active: false, time: "Mar 12, 11:00" },
  { label: "In Transit", icon: Ship, done: false, active: true, time: "Mar 20, 09:45" },
  { label: "Arrived", icon: MapPin, done: false, active: false, time: "Est. Mar 28" },
];

function MiniRouteMap() {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 relative" style={{ background: "linear-gradient(135deg, #060f1e 0%, #0a1628 100%)" }}>
      <svg viewBox="0 0 420 280" className="w-full h-full">
        {/* Grid */}
        {[0,1,2,3,4,5,6,7].map(i => <line key={`v${i}`} x1={i*60} y1="0" x2={i*60} y2="280" stroke="#0d2040" strokeWidth="1" />)}
        {[0,1,2,3,4].map(i => <line key={`h${i}`} x1="0" y1={i*70} x2="420" y2={i*70} stroke="#0d2040" strokeWidth="1" />)}

        {/* Continents */}
        <path d="M30,55 L80,50 L100,75 L90,105 L60,115 L30,100 Z" fill="#0d2040" opacity="0.9" />
        <path d="M185,45 L245,42 L265,65 L255,95 L215,100 L185,80 Z" fill="#0d2040" opacity="0.9" />
        <path d="M265,42 L375,38 L395,65 L385,95 L325,105 L275,90 Z" fill="#0d2040" opacity="0.9" />
        <path d="M185,105 L245,100 L260,135 L245,170 L205,175 L180,150 Z" fill="#0d2040" opacity="0.9" />
        <path d="M325,145 L375,140 L390,165 L375,190 L340,193 L318,170 Z" fill="#0d2040" opacity="0.9" />

        {/* Route glow */}
        <path d="M350,80 Q290,130 210,140 Q150,148 80,110" stroke="#3b82f6" strokeWidth="8" fill="none" opacity="0.08" />
        <path d="M350,80 Q290,130 210,140 Q150,148 80,110" stroke="#3b82f6" strokeWidth="2" fill="none" strokeDasharray="6 3" opacity="0.7" />

        {/* Progress overlay */}
        <path d="M350,80 Q290,130 210,140 Q150,148 80,110" stroke="#60a5fa" strokeWidth="2" fill="none" strokeDasharray="200 400" opacity="0.9" />

        {/* Origin */}
        <circle cx="350" cy="80" r="5" fill="#3b82f6" />
        <circle cx="350" cy="80" r="12" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.4">
          <animate attributeName="r" values="5;16;5" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <text x="350" y="68" textAnchor="middle" fill="#93c5fd" fontSize="9" fontWeight="700">Mumbai</text>

        {/* Ship */}
        <circle cx="210" cy="140" r="5" fill="white" opacity="0.95" />
        <circle cx="210" cy="140" r="10" fill="#3b82f6" opacity="0.25" />

        {/* Destination */}
        <circle cx="80" cy="110" r="5" fill="#10b981" />
        <text x="80" y="98" textAnchor="middle" fill="#6ee7b7" fontSize="9" fontWeight="700">Los Angeles</text>

        {/* Progress bar */}
        <rect x="20" y="255" width="380" height="3" rx="1.5" fill="#0d2040" />
        <rect x="20" y="255" width="210" height="3" rx="1.5" fill="url(#pg)" />
        <defs>
          <linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <text x="20" y="272" fill="#374151" fontSize="8">0%</text>
        <text x="210" y="272" textAnchor="middle" fill="#60a5fa" fontSize="8" fontWeight="600">55%</text>
        <text x="400" y="272" textAnchor="end" fill="#374151" fontSize="8">100%</text>
      </svg>

      {/* Overlay badge */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/10 bg-black/40 backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
        <span className="text-[10px] font-bold text-zinc-300">LIVE</span>
      </div>
    </div>
  );
}

export default function TrackingPreview() {
  return (
    <section id="tracking" className="py-28 bg-[#060b14]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }}
          className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4 border border-blue-500/25 bg-blue-500/8 text-blue-400">
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">See Your Shipment's Journey</h2>
          <p className="text-zinc-500 max-w-xl mx-auto">Every milestone, every port, every update — in real-time.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }}
            className="h-[340px]">
            <MiniRouteMap />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay: 0.1 }}>
            <div className="rounded-2xl border border-white/10 p-6" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/8">
                <div>
                  <div className="text-xs text-zinc-600 uppercase tracking-wider mb-0.5">Shipment</div>
                  <div className="font-bold text-white font-mono">CS-8821-MUM-LA</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-zinc-600 uppercase tracking-wider mb-0.5">ETA</div>
                  <div className="font-bold text-blue-400">Mar 28, 2026</div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-5 top-5 bottom-5 w-px bg-white/8" />
                <div className="space-y-5">
                  {steps.map((step, i) => (
                    <motion.div key={step.label}
                      initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4 relative z-10">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                        step.done ? "bg-blue-600 border-blue-600" :
                        step.active ? "bg-[#060b14] border-blue-400" : "bg-[#060b14] border-white/15"
                      }`}
                        style={step.active ? { boxShadow: "0 0 16px rgba(96,165,250,0.4)" } : {}}>
                        {step.done ? <CheckCircle2 className="h-4 w-4 text-white" />
                          : step.active ? <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-pulse" />
                          : <Circle className="h-4 w-4 text-white/15" />}
                      </div>
                      <div className="flex-1 pt-1.5">
                        <div className="flex items-center justify-between">
                          <span className={`font-semibold text-sm ${step.active ? "text-blue-400" : step.done ? "text-white" : "text-zinc-600"}`}>
                            {step.label}
                          </span>
                          <div className="flex items-center gap-1 text-[10px] text-zinc-600">
                            <Clock className="h-3 w-3" />{step.time}
                          </div>
                        </div>
                        {step.active && <p className="text-xs text-zinc-600 mt-0.5">Pacific Ocean · Updated 2 min ago</p>}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
