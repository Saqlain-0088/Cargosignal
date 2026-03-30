"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, AlertCircle, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { storePendingTrack } from "@/lib/trackingGuard";

// ── Animated SVG World Map (right panel) ─────────────────────────────────────
const ROUTES = [
  // Mumbai → Los Angeles
  { pts: [[580,195],[480,210],[340,180],[200,200],[120,195]] as [number,number][], color: "#3b82f6", delay: 0 },
  // Shanghai → Rotterdam
  { pts: [[640,160],[540,145],[420,130],[300,150],[180,165],[100,170]] as [number,number][], color: "#06b6d4", delay: 0.33 },
  // Dubai → Singapore
  { pts: [[555,215],[590,230],[620,240],[650,235],[660,220]] as [number,number][], color: "#8b5cf6", delay: 0.66 },
  // NY → Hamburg
  { pts: [[130,175],[200,160],[300,155],[380,150],[440,145]] as [number,number][], color: "#10b981", delay: 0.5 },
];

function lerp(a: [number,number], b: [number,number], t: number): [number,number] {
  return [a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t];
}

function getPos(pts: [number,number][], t: number): [number,number] {
  const n = pts.length - 1;
  const s = t * n;
  const i = Math.min(Math.floor(s), n-1);
  return lerp(pts[i], pts[i+1], s-i);
}

function WorldMapViz() {
  const [tick, setTick] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      setTick(ts - startRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const CYCLE = 8000; // 8s per loop

  return (
    <svg viewBox="0 0 760 420" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        {ROUTES.map((r, i) => (
          <linearGradient key={i} id={`rg${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={r.color} stopOpacity="0" />
            <stop offset="40%" stopColor={r.color} stopOpacity="0.7" />
            <stop offset="100%" stopColor={r.color} stopOpacity="0" />
          </linearGradient>
        ))}
      </defs>

      {/* Ocean background */}
      <rect width="760" height="420" fill="transparent" />

      {/* Continent silhouettes — simplified, low opacity */}
      <g opacity="0.18" fill="#3b82f6">
        {/* North America */}
        <path d="M65,70 L155,62 L195,90 L215,130 L195,170 L155,190 L115,210 L75,190 L55,150 L65,110 Z" />
        {/* South America */}
        <path d="M155,210 L195,200 L215,240 L205,290 L175,320 L145,300 L135,260 L145,230 Z" />
        {/* Europe */}
        <path d="M355,50 L415,45 L435,70 L415,90 L375,100 L345,80 Z" />
        {/* Africa */}
        <path d="M355,100 L415,90 L445,130 L435,190 L395,230 L355,210 L335,170 L345,130 Z" />
        {/* Asia */}
        <path d="M435,45 L615,40 L675,70 L695,110 L655,150 L575,170 L495,160 L455,130 L435,90 Z" />
        {/* Australia */}
        <path d="M615,230 L675,220 L695,250 L675,280 L635,285 L605,260 Z" />
        {/* Greenland */}
        <path d="M200,30 L250,25 L265,45 L245,60 L210,58 Z" />
      </g>

      {/* Grid lines — very subtle */}
      {[0,1,2,3,4,5,6].map(i => (
        <line key={`v${i}`} x1={i*120} y1="0" x2={i*120} y2="420" stroke="#3b82f6" strokeWidth="0.3" opacity="0.08" />
      ))}
      {[0,1,2,3,4].map(i => (
        <line key={`h${i}`} x1="0" y1={i*105} x2="760" y2={i*105} stroke="#3b82f6" strokeWidth="0.3" opacity="0.08" />
      ))}

      {/* Route lines + moving dots */}
      {ROUTES.map((route, i) => {
        const pathD = route.pts.map((p, j) => `${j===0?"M":"L"} ${p[0]} ${p[1]}`).join(" ");
        const progress = ((tick / CYCLE + route.delay) % 1);
        const [dx, dy] = getPos(route.pts, progress);

        return (
          <g key={i}>
            {/* Glow */}
            <path d={pathD} stroke={route.color} strokeWidth="5" fill="none" opacity="0.06" />
            {/* Main dashed line */}
            <path d={pathD} stroke={`url(#rg${i})`} strokeWidth="1.5" fill="none" opacity="0.5" strokeDasharray="5 3" />
            {/* Moving ship dot */}
            <circle cx={dx} cy={dy} r="4" fill={route.color} opacity="0.9" />
            <circle cx={dx} cy={dy} r="8" fill={route.color} opacity="0.2" />
          </g>
        );
      })}

      {/* Port pulse dots */}
      {[
        [580,195], [120,195], [640,160], [100,170], [555,215], [660,220], [130,175], [440,145]
      ].map(([x,y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3" fill="#60a5fa" opacity="0.7" />
          <circle cx={x} cy={y} r="3" fill="#60a5fa" opacity="0.25">
            <animate attributeName="r" values="3;12;3" dur={`${2.5+i*0.2}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.25;0;0.25" dur={`${2.5+i*0.2}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
    </svg>
  );
}

// ── Live shipment ticker ──────────────────────────────────────────────────────
const ticker = [
  { id: "CS-8821", route: "Mumbai → LA", status: "In Transit", color: "#60a5fa" },
  { id: "CS-8819", route: "Shanghai → Rotterdam", status: "Arrived", color: "#34d399" },
  { id: "CS-8820", route: "Dubai → Singapore", status: "In Transit", color: "#a78bfa" },
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
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-[#030609]">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 80% at 20% 50%, rgba(59,130,246,0.06) 0%, transparent 60%)" }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT — Text + Input */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest border border-blue-500/25 bg-blue-500/8 text-blue-300 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Live Global Tracking Platform
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black leading-[1.08] tracking-tight mb-5">
                <span className="text-white">Track Every Container.</span>
                <br />
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg, #60a5fa 0%, #34d399 60%, #818cf8 100%)" }}>
                  In Real-Time.
                </span>
              </h1>
              <p className="text-lg text-zinc-400 leading-relaxed max-w-lg">
                Monitor global shipments across ports, carriers, and routes — with live GPS tracking, predictive ETAs, and instant alerts.
              </p>
            </div>

            {/* Tracking input */}
            <div>
              <form onSubmit={handleTrack}>
                <div className="relative flex items-center p-1.5 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-xl shadow-black/40">
                  <div className="absolute left-5 pointer-events-none">
                    <Search className="h-5 w-5 text-zinc-500" />
                  </div>
                  <input
                    type="text"
                    value={containerNumber}
                    onChange={e => { setContainerNumber(e.target.value); setError(""); }}
                    placeholder="Enter Container / BL / Booking Number"
                    className="flex-1 h-12 pl-12 pr-4 bg-transparent text-white placeholder:text-zinc-500 text-sm outline-none"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 h-12 px-6 rounded-xl text-sm font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 4px 20px rgba(37,99,235,0.4)" }}
                  >
                    Track Shipment <ArrowRight className="h-4 w-4" />
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
                <span className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest">Live Shipments</span>
              </div>
              {ticker.map((item, i) => (
                <motion.div key={item.id}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-[11px] font-mono text-zinc-400">{item.id}</span>
                  <span className="text-[11px] text-zinc-600 flex-1 truncate">{item.route}</span>
                  <span className="text-[10px] font-bold" style={{ color: item.color }}>{item.status}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Animated World Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="relative h-[420px] lg:h-[500px]"
          >
            {/* Map container */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/[0.08]"
              style={{ background: "linear-gradient(135deg, #060f1e 0%, #030609 100%)" }}>

              {/* Subtle radial glow */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(59,130,246,0.05) 0%, transparent 70%)" }} />

              {/* SVG map */}
              <div className="absolute inset-0 p-4">
                <WorldMapViz />
              </div>

              {/* Edge fade */}
              <div className="absolute inset-0 pointer-events-none rounded-2xl"
                style={{ boxShadow: "inset 0 0 60px rgba(3,6,9,0.6)" }} />
            </div>

            {/* Floating status cards */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
              className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 backdrop-blur-md"
              style={{ background: "rgba(3,6,9,0.7)" }}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-wider">Live Tracking</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
              className="absolute bottom-4 right-4 px-3 py-2 rounded-xl border border-white/10 backdrop-blur-md text-right"
              style={{ background: "rgba(3,6,9,0.7)" }}>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Active Routes</div>
              <div className="text-sm font-bold text-white">2,847 <span className="text-green-400 text-[10px]">↑ 12%</span></div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to top, #060b14, transparent)" }} />
    </section>
  );
}
