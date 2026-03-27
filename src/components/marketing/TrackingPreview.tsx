"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Package, Ship, FileCheck, MapPin } from "lucide-react";

const steps = [
  { label: "Booked", icon: FileCheck, done: true, active: false },
  { label: "Loaded", icon: Package, done: true, active: false },
  { label: "In Transit", icon: Ship, done: false, active: true },
  { label: "Arrived", icon: MapPin, done: false, active: false },
];

// Mini SVG map for the left panel
function MiniRouteMap() {
  return (
    <div className="w-full h-full relative rounded-xl overflow-hidden bg-[#0d1526] border border-white/10">
      <svg viewBox="0 0 400 260" className="w-full h-full">
        <defs>
          <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
        {/* Grid */}
        <rect width="400" height="260" fill="#0d1526" />
        {[0,1,2,3,4,5,6].map(i => (
          <line key={i} x1={i*60} y1="0" x2={i*60} y2="260" stroke="#1e3a5f" strokeWidth="0.5" />
        ))}
        {[0,1,2,3,4].map(i => (
          <line key={i} x1="0" y1={i*65} x2="400" y2={i*65} stroke="#1e3a5f" strokeWidth="0.5" />
        ))}

        {/* Simplified continents */}
        <path d="M30,50 L80,45 L100,70 L90,100 L60,110 L30,95 Z" fill="#1a2744" opacity="0.7" />
        <path d="M180,40 L240,38 L260,60 L250,90 L210,95 L180,75 Z" fill="#1a2744" opacity="0.7" />
        <path d="M260,38 L360,35 L380,60 L370,90 L310,100 L270,85 Z" fill="#1a2744" opacity="0.7" />
        <path d="M180,100 L240,95 L255,130 L240,165 L200,170 L175,145 Z" fill="#1a2744" opacity="0.7" />
        <path d="M310,140 L360,135 L375,160 L360,185 L325,188 L305,165 Z" fill="#1a2744" opacity="0.7" />

        {/* Route */}
        <path d="M330,75 Q280,120 200,130 Q140,138 80,100" stroke="url(#routeGrad)" strokeWidth="2.5" fill="none" strokeDasharray="6 3" />
        <path d="M330,75 Q280,120 200,130 Q140,138 80,100" stroke="#3b82f6" strokeWidth="6" fill="none" opacity="0.1" />

        {/* Origin */}
        <circle cx="330" cy="75" r="5" fill="#3b82f6" />
        <circle cx="330" cy="75" r="10" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5">
          <animate attributeName="r" values="5;15;5" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
        <text x="330" y="65" textAnchor="middle" fill="#93c5fd" fontSize="9" fontWeight="600">Mumbai</text>

        {/* Ship position */}
        <circle cx="200" cy="130" r="5" fill="white" opacity="0.9" />
        <circle cx="200" cy="130" r="9" fill="#3b82f6" opacity="0.3" />

        {/* Destination */}
        <circle cx="80" cy="100" r="5" fill="#10b981" />
        <text x="80" y="90" textAnchor="middle" fill="#6ee7b7" fontSize="9" fontWeight="600">Los Angeles</text>

        {/* Progress bar */}
        <rect x="20" y="240" width="360" height="4" rx="2" fill="#1e3a5f" />
        <rect x="20" y="240" width="200" height="4" rx="2" fill="url(#routeGrad)" />
        <text x="20" y="258" fill="#6b7280" fontSize="8">0%</text>
        <text x="200" y="258" textAnchor="middle" fill="#93c5fd" fontSize="8">55% complete</text>
        <text x="380" y="258" textAnchor="end" fill="#6b7280" fontSize="8">100%</text>
      </svg>
    </div>
  );
}

export default function TrackingPreview() {
  return (
    <section className="py-24 bg-[#0B0F19]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-14">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-500/30 bg-blue-500/10 text-blue-400">
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            See Your Shipment's Journey
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Real-time route visualization with live milestone tracking at every step.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Mini map */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="h-[320px]">
            <MiniRouteMap />
          </motion.div>

          {/* Right: Timeline */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-0">
            <div className="bg-[#0d1526] rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider">Shipment ID</div>
                  <div className="font-bold text-white">CS-8821-MUM-LA</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-zinc-500 uppercase tracking-wider">ETA</div>
                  <div className="font-bold text-blue-400">Mar 28, 2026</div>
                </div>
              </div>

              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-5 top-5 bottom-5 w-px bg-white/10" />

                <div className="space-y-6">
                  {steps.map((step, i) => (
                    <motion.div key={step.label}
                      initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4 relative z-10">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                        step.done ? "bg-blue-600 border-blue-600" :
                        step.active ? "bg-[#0B0F19] border-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.5)]" :
                        "bg-[#0B0F19] border-white/20"
                      }`}>
                        {step.done
                          ? <CheckCircle2 className="h-5 w-5 text-white" />
                          : step.active
                          ? <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
                          : <Circle className="h-4 w-4 text-white/20" />
                        }
                      </div>
                      <div className="flex-1 pt-1.5">
                        <div className="flex items-center justify-between">
                          <span className={`font-semibold text-sm ${step.active ? "text-blue-400" : step.done ? "text-white" : "text-zinc-600"}`}>
                            {step.label}
                          </span>
                          {step.active && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                              CURRENT
                            </span>
                          )}
                          {step.done && <span className="text-[10px] text-zinc-500">Completed</span>}
                        </div>
                        {step.active && (
                          <p className="text-xs text-zinc-500 mt-0.5">Pacific Ocean · Updated 2 min ago</p>
                        )}
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
