"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, AlertCircle, ArrowRight, Ship, Package, TrendingUp } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { storePendingTrack } from "@/lib/trackingGuard";

// ── Animated SVG globe/map background ──────────────────────────────────────
function AnimatedMapBg() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 40);
    return () => clearInterval(id);
  }, []);

  const progress = (tick % 250) / 250;
  const routes = [
    { pts: [[580,195],[480,210],[340,180],[200,200],[120,195]] as [number,number][], color: "#3b82f6" },
    { pts: [[640,160],[560,140],[440,130],[320,150],[220,170]] as [number,number][], color: "#06b6d4" },
    { pts: [[560,230],[460,250],[360,240],[260,230],[160,220]] as [number,number][], color: "#8b5cf6" },
  ];

  function interp(pts: [number,number][], t: number): [number,number] {
    const n = pts.length - 1;
    const s = t * n;
    const i = Math.min(Math.floor(s), n - 1);
    const f = s - i;
    return [pts[i][0] + (pts[i+1][0]-pts[i][0])*f, pts[i][1] + (pts[i+1][1]-pts[i][1])*f];
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep space gradient */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 120% 100% at 60% 40%, #0a1628 0%, #060b14 50%, #030609 100%)" }} />

      {/* Particle field */}
      {Array.from({ length: 60 }).map((_, i) => (
        <div key={i} className="absolute rounded-full bg-white"
          style={{
            width: i % 5 === 0 ? 2 : 1,
            height: i % 5 === 0 ? 2 : 1,
            left: `${(i * 17.3) % 100}%`,
            top: `${(i * 13.7) % 100}%`,
            opacity: 0.1 + (i % 4) * 0.08,
          }} />
      ))}

      {/* SVG routes */}
      <svg viewBox="0 0 760 400" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          {routes.map((r, i) => (
            <linearGradient key={i} id={`rg${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={r.color} stopOpacity="0" />
              <stop offset="50%" stopColor={r.color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={r.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        {/* Continent silhouettes */}
        <path d="M70,75 L155,68 L195,95 L215,135 L195,175 L155,195 L115,215 L75,195 L55,155 L65,115 Z" fill="#0d2040" opacity="0.8" />
        <path d="M155,215 L195,205 L215,245 L205,295 L175,325 L145,305 L135,265 L145,235 Z" fill="#0d2040" opacity="0.8" />
        <path d="M355,55 L415,50 L435,75 L415,95 L375,105 L345,85 Z" fill="#0d2040" opacity="0.8" />
        <path d="M355,105 L415,95 L445,135 L435,195 L395,235 L355,215 L335,175 L345,135 Z" fill="#0d2040" opacity="0.8" />
        <path d="M435,50 L615,45 L675,75 L695,115 L655,155 L575,175 L495,165 L455,135 L435,95 Z" fill="#0d2040" opacity="0.8" />
        <path d="M615,235 L675,225 L695,255 L675,285 L635,290 L605,265 Z" fill="#0d2040" opacity="0.8" />

        {/* Route lines */}
        {routes.map((r, i) => {
          const d = r.pts.map((p, j) => `${j===0?"M":"L"} ${p[0]} ${p[1]}`).join(" ");
          return (
            <g key={i}>
              <path d={d} stroke={r.color} strokeWidth="6" fill="none" opacity="0.06" />
              <path d={d} stroke={`url(#rg${i})`} strokeWidth="1.5" fill="none" opacity="0.7" strokeDasharray="6 3" />
            </g>
          );
        })}

        {/* Moving ships */}
        {routes.map((r, i) => {
          const offset = i / routes.length;
          const p = ((progress + offset) % 1);
          const [x, y] = interp(r.pts, p);
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="4" fill={r.color} opacity="0.9" />
              <circle cx={x} cy={y} r="8" fill={r.color} opacity="0.2" />
              <circle cx={x} cy={y} r="14" fill="none" stroke={r.color} strokeWidth="1" opacity="0.15" />
            </g>
          );
        })}

        {/* Port dots */}
        {[[120,195],[580,195],[640,160],[220,170],[560,230],[160,220]].map(([x,y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="3" fill="#3b82f6" opacity="0.7" />
            <circle cx={x} cy={y} r="3" fill="#3b82f6" opacity="0.3">
              <animate attributeName="r" values="3;10;3" dur={`${2+i*0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0;0.3" dur={`${2+i*0.3}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </svg>

      {/* Vignette */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(3,6,9,0.7) 100%)" }} />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48" style={{ background: "linear-gradient(to top, #060b14, transparent)" }} />
    </div>
  );
}

// ── Live ticker ─────────────────────────────────────────────────────────────
const tickerItems = [
  { id: "CS-8821", route: "Mumbai → LA", status: "In Transit", color: "#3b82f6" },
  { id: "CS-8819", route: "Shanghai → Rotterdam", status: "Arrived", color: "#10b981" },
  { id: "CS-8820", route: "Dubai → Hamburg", status: "Customs", color: "#f59e0b" },
  { id: "CS-8823", route: "Singapore → NY", status: "In Transit", color: "#3b82f6" },
  { id: "CS-8817", route: "Tokyo → LA", status: "Arrived", color: "#10b981" },
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
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">
      <AnimatedMapBg />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-28 pb-16">
        <motion.div className="text-center max-w-4xl mx-auto"
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
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #60a5fa 0%, #34d399 50%, #818cf8 100%)" }}>
              Track Everything.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Real-time container tracking, predictive ETAs, and full supply chain visibility — across 120+ countries and 340+ carriers.
          </p>

          {/* Tracking input */}
          <form onSubmit={handleTrack} className="max-w-2xl mx-auto mb-4">
            <div className="relative flex items-center p-1.5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/40">
              <div className="absolute left-5 pointer-events-none">
                <Search className="h-5 w-5 text-zinc-500" />
              </div>
              <input type="text" value={containerNumber}
                onChange={e => { setContainerNumber(e.target.value); setError(""); }}
                placeholder="Enter Container / BL / Booking Number"
                className="flex-1 h-12 pl-12 pr-4 bg-transparent text-white placeholder:text-zinc-500 text-sm outline-none" />
              <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 h-12 px-7 rounded-xl text-sm font-bold text-white transition-all"
                style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 4px 20px rgba(37,99,235,0.4)" }}>
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

          <p className="text-xs text-zinc-600">No credit card required · 14-day free trial · Cancel anytime</p>
        </motion.div>

        {/* Live ticker */}
        <motion.div className="w-full max-w-4xl mx-auto mt-14"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Live Shipments</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {tickerItems.map((item, i) => (
              <motion.div key={item.id}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + i * 0.08 }}
                className="rounded-xl px-3 py-2.5 border border-white/8 backdrop-blur-md"
                style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] font-bold text-zinc-300 font-mono">{item.id}</span>
                </div>
                <div className="text-[10px] text-zinc-500 truncate">{item.route}</div>
                <div className="text-[10px] font-semibold mt-0.5" style={{ color: item.color }}>{item.status}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
        <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Scroll</span>
        <motion.div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1"
          animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}>
          <motion.div className="w-1 h-2 rounded-full bg-blue-400"
            animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
