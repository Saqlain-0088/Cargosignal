"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Search, AlertCircle, ArrowRight, Ship, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { storePendingTrack } from "@/lib/trackingGuard";
import Link from "next/link";
import { Globe } from "lucide-react";

// Lazy-load the heavy Mapbox globe
const GlobeMap = dynamic(() => import("./GlobeMap"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 w-full h-full" style={{ background: "radial-gradient(ellipse 120% 100% at 60% 40%, #0a1628 0%, #060b14 60%, #030609 100%)" }}>
      {/* Particle fallback while map loads */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div key={i} className="absolute rounded-full bg-white"
          style={{ width: i % 5 === 0 ? 2 : 1, height: i % 5 === 0 ? 2 : 1, left: `${(i * 17.3) % 100}%`, top: `${(i * 13.7) % 100}%`, opacity: 0.06 + (i % 4) * 0.04 }} />
      ))}
    </div>
  ),
});

const tickerItems = [
  { id: "CS-8821", route: "Mumbai → LA", status: "In Transit", color: "#60a5fa" },
  { id: "CS-8819", route: "Shanghai → Rotterdam", status: "Arrived", color: "#34d399" },
  { id: "CS-8820", route: "Dubai → Singapore", status: "In Transit", color: "#a78bfa" },
  { id: "CS-8823", route: "Tokyo → NY", status: "Customs", color: "#fbbf24" },
  { id: "CS-8817", route: "LA → Hamburg", status: "Arrived", color: "#34d399" },
];

export default function HeroMapSection() {
  const [containerNumber, setContainerNumber] = useState("");
  const [error, setError] = useState("");
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!containerNumber.trim()) { setError("Please enter a container number"); return; }
    setError("");
    if (!isAuthenticated) { storePendingTrack(containerNumber.trim()); router.push("/register"); return; }
    router.push("/tracking");
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden bg-[#030609]">

      {/* 3D Mapbox Globe — full screen background */}
      <div className="absolute inset-0 z-0">
        <GlobeMap />
      </div>

      {/* Dark overlay gradient — keeps text readable over the globe */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(3,6,9,0.3) 0%, rgba(3,6,9,0.65) 60%, rgba(3,6,9,0.92) 100%)" }} />

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 z-[1] pointer-events-none"
        style={{ background: "linear-gradient(to top, #060b14, transparent)" }} />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-28 pb-16">
        <motion.div className="text-center max-w-4xl mx-auto w-full"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>

          {/* Badge */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest border border-blue-500/25 bg-blue-500/8 text-blue-300 mb-8 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Live Global Tracking Platform
          </motion.div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
            <span className="text-white">Ship Smarter.</span>
            <br />
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #60a5fa 0%, #34d399 50%, #818cf8 100%)" }}>
              Track Everything.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Real-time container tracking, predictive ETAs, and full supply chain visibility — across 120+ countries and 340+ carriers.
          </p>

          {/* Tracking input */}
          <form onSubmit={handleTrack} className="max-w-2xl mx-auto mb-4">
            <div className="relative flex items-center p-1.5 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl shadow-2xl shadow-black/60">
              <div className="absolute left-5 pointer-events-none">
                <Search className="h-5 w-5 text-zinc-500" />
              </div>
              <input type="text" value={containerNumber}
                onChange={e => { setContainerNumber(e.target.value); setError(""); }}
                placeholder="Enter Container / BL / Booking Number"
                className="flex-1 h-12 pl-12 pr-4 bg-transparent text-white placeholder:text-zinc-500 text-sm outline-none" />
              <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 h-12 px-7 rounded-xl text-sm font-bold text-white transition-all"
                style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 4px 20px rgba(37,99,235,0.45)" }}>
                Track Shipment <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
            <AnimatePresence>
              {error && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5 text-xs text-red-400 mt-2 text-left px-2">
                  <AlertCircle className="h-3.5 w-3.5" /> {error}
                </motion.p>
              )}
            </AnimatePresence>
          </form>

          <p className="text-xs text-zinc-600 mb-12">No credit card required · 14-day free trial · Cancel anytime</p>

          {/* Live shipment ticker */}
          <div className="w-full">
            <div className="flex items-center gap-3 mb-3 justify-center">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Live Shipments</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
              {tickerItems.map((item, i) => (
                <motion.div key={item.id}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + i * 0.08 }}
                  className="rounded-xl px-3 py-2.5 border border-white/8 backdrop-blur-md"
                  style={{ background: "rgba(0,0,0,0.4)" }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[10px] font-bold text-zinc-300 font-mono">{item.id}</span>
                  </div>
                  <div className="text-[10px] text-zinc-500 truncate">{item.route}</div>
                  <div className="text-[10px] font-semibold mt-0.5" style={{ color: item.color }}>{item.status}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
        <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Scroll</span>
        <motion.div className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1">
          <motion.div className="w-1 h-2 rounded-full bg-blue-400"
            animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
