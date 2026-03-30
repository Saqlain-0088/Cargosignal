"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Search, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { setPendingTracking } from "@/lib/trackingService";
import InlineTrackingResult, { getMockTrackingData, TrackingResult } from "./InlineTrackingResult";
const TacticalWorldMap = dynamic(() => import("./TacticalWorldMap"), {
  ssr: false,
  loading: () => <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #020d1a 0%, #030f1f 100%)" }} />,
});

const ticker = [
  { id: "CS-8821", route: "Shanghai → LA", status: "In Transit", color: "#f59e0b" },
  { id: "CS-8819", route: "Singapore → Rotterdam", status: "Arrived", color: "#34d399" },
  { id: "CS-8820", route: "Dubai → Hamburg", status: "In Transit", color: "#60a5fa" },
];

export default function HeroMapSection() {
  const [containerNumber, setContainerNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrackingResult | null>(null);
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const resultRef = useRef<HTMLDivElement>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!containerNumber.trim()) { setError("Please enter a container number"); return; }
    if (loading) return;
    setError("");

    // Auth gate — store container number and redirect to register with message
    if (!isAuthenticated) {
      setPendingTracking(containerNumber.trim());
      router.push("/register");
      return;
    }

    // Authenticated — show inline results
    setLoading(true);
    setResult(null);

    // Simulate API call delay
    await new Promise(r => setTimeout(r, 1200));

    const data = getMockTrackingData(containerNumber.trim().toUpperCase());
    setResult(data);
    setLoading(false);

    // Smooth scroll to results
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <>
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        <TacticalWorldMap />

        <div className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: "linear-gradient(90deg, rgba(2,13,26,0.88) 0%, rgba(2,13,26,0.65) 55%, rgba(2,13,26,0.25) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-32 z-[1] pointer-events-none"
          style={{ background: "linear-gradient(to top, #020d1a, transparent)" }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-16">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="space-y-7">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest border border-blue-500/30 bg-blue-500/10 text-blue-300 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Live Global Tracking Platform
              </div>

              <div>
                <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black leading-[1.08] tracking-tight mb-5">
                  <span className="text-white">Track Every Container.</span>
                  <br />
                  <span className="text-transparent bg-clip-text"
                    style={{ backgroundImage: "linear-gradient(135deg, #60a5fa 0%, #34d399 60%, #818cf8 100%)" }}>
                    In Real-Time.
                  </span>
                </h1>
                <p className="text-lg text-zinc-300 leading-relaxed max-w-lg">
                  Monitor global shipments across ports, carriers, and routes — with live GPS tracking, predictive ETAs, and instant alerts.
                </p>
              </div>

              {/* Tracking input */}
              <div>
                <form onSubmit={handleTrack}>
                  <div className="relative flex items-center p-1.5 rounded-2xl border border-white/15 backdrop-blur-xl shadow-2xl shadow-black/60"
                    style={{ background: "rgba(2,13,26,0.7)" }}>
                    <div className="absolute left-5 pointer-events-none">
                      <Search className="h-5 w-5 text-zinc-500" />
                    </div>
                    <input type="text" value={containerNumber}
                      onChange={e => { setContainerNumber(e.target.value); setError(""); }}
                      placeholder="Enter Container / BL / Booking Number"
                      className="flex-1 h-12 pl-12 pr-4 bg-transparent text-white placeholder:text-zinc-500 text-sm outline-none"
                      disabled={loading}
                    />
                    <motion.button type="submit" disabled={loading}
                      whileHover={!loading ? { scale: 1.02 } : {}} whileTap={!loading ? { scale: 0.98 } : {}}
                      className="flex items-center gap-2 h-12 px-6 rounded-xl text-sm font-bold text-white disabled:opacity-70 disabled:cursor-not-allowed"
                      style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 4px 20px rgba(37,99,235,0.5)" }}>
                      {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Tracking...</> : <>Track Shipment <ArrowRight className="h-4 w-4" /></>}
                    </motion.button>
                  </div>
                  <AnimatePresence>
                    {error && (
                      <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="flex items-center gap-1.5 text-xs text-red-400 mt-2 px-2">
                        <AlertCircle className="h-3.5 w-3.5" /> {error}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </form>
                <p className="text-xs text-zinc-600 mt-3 px-1">No credit card required · 14-day free trial</p>
              </div>

              {/* Live ticker */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">Live Shipments</span>
                </div>
                {ticker.map((item, i) => (
                  <motion.div key={item.id}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.1 }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl border border-white/[0.08] backdrop-blur-sm"
                    style={{ background: "rgba(2,13,26,0.6)" }}>
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-[11px] font-mono text-zinc-400">{item.id}</span>
                    <span className="text-[11px] text-zinc-600 flex-1 truncate">{item.route}</span>
                    <span className="text-[10px] font-bold" style={{ color: item.color }}>{item.status}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
          <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-mono">Scroll</span>
          <motion.div className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1">
            <motion.div className="w-1 h-2 rounded-full bg-blue-400"
              animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} />
          </motion.div>
        </motion.div>
      </section>

      {/* Inline tracking result — appears below hero */}
      <AnimatePresence>
        {(loading || result) && (
          <section className="py-12 px-6 bg-[#020d1a]" ref={resultRef}>
            <div className="max-w-4xl mx-auto">
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-4 py-16">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-2 border-blue-500/20 flex items-center justify-center">
                      <Loader2 className="h-7 w-7 text-blue-400 animate-spin" />
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-blue-500/40 animate-ping" />
                  </div>
                  <div className="text-center">
                    <div className="text-white font-semibold mb-1">Fetching shipment data...</div>
                    <div className="text-zinc-500 text-sm">Querying {containerNumber.toUpperCase()} across 340+ carriers</div>
                  </div>
                </motion.div>
              )}
              {result && !loading && (
                <InlineTrackingResult result={result} onClose={() => { setResult(null); setContainerNumber(""); }} />
              )}
            </div>
          </section>
        )}
      </AnimatePresence>
    </>
  );
}
