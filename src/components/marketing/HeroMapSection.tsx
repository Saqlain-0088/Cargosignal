"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, AlertCircle, Ship, Package } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { storePendingTrack } from "@/lib/trackingGuard";

// Animated SVG world map background with glowing route
function WorldMapBg() {
  const [dotPos, setDotPos] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotPos(p => (p + 0.4) % 100);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Route: Mumbai (India) → Los Angeles (USA) — approximate SVG coords on 800x400 viewBox
  const routePoints = [
    { x: 580, y: 210 }, // Mumbai
    { x: 620, y: 190 }, // Arabian Sea
    { x: 520, y: 230 }, // Indian Ocean
    { x: 420, y: 260 }, // Mid Indian Ocean
    { x: 300, y: 240 }, // Pacific
    { x: 180, y: 210 }, // Near Hawaii
    { x: 120, y: 200 }, // Los Angeles
  ];

  const pathD = routePoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  // Interpolate dot position along route
  const totalSegs = routePoints.length - 1;
  const scaled = (dotPos / 100) * totalSegs;
  const seg = Math.min(Math.floor(scaled), totalSegs - 1);
  const t = scaled - seg;
  const a = routePoints[seg], b = routePoints[seg + 1];
  const dx = a.x + (b.x - a.x) * t;
  const dy = a.y + (b.y - a.y) * t;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Dark gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F19] via-[#0d1526] to-[#0B0F19]" />

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: "linear-gradient(rgba(59,130,246,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.5) 1px,transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      {/* SVG map + route */}
      <svg viewBox="0 0 800 400" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
        {/* Continent silhouettes (simplified) */}
        {/* North America */}
        <path d="M80,80 L160,70 L200,100 L220,140 L200,180 L160,200 L120,220 L80,200 L60,160 L70,120 Z" fill="#1a2744" opacity="0.6" />
        {/* South America */}
        <path d="M160,220 L200,210 L220,250 L210,300 L180,330 L150,310 L140,270 L150,240 Z" fill="#1a2744" opacity="0.6" />
        {/* Europe */}
        <path d="M360,60 L420,55 L440,80 L420,100 L380,110 L350,90 Z" fill="#1a2744" opacity="0.6" />
        {/* Africa */}
        <path d="M360,110 L420,100 L450,140 L440,200 L400,240 L360,220 L340,180 L350,140 Z" fill="#1a2744" opacity="0.6" />
        {/* Asia */}
        <path d="M440,55 L620,50 L680,80 L700,120 L660,160 L580,180 L500,170 L460,140 L440,100 Z" fill="#1a2744" opacity="0.6" />
        {/* Australia */}
        <path d="M620,240 L680,230 L700,260 L680,290 L640,295 L610,270 Z" fill="#1a2744" opacity="0.6" />

        {/* Glow route line */}
        <path d={pathD} stroke="#3b82f6" strokeWidth="3" fill="none" strokeDasharray="8 4" opacity="0.5" />
        <path d={pathD} stroke="#60a5fa" strokeWidth="1.5" fill="none" opacity="0.8" />

        {/* Glow effect on route */}
        <path d={pathD} stroke="#3b82f6" strokeWidth="8" fill="none" opacity="0.15" />

        {/* Origin dot — Mumbai */}
        <circle cx="580" cy="210" r="6" fill="#3b82f6" opacity="0.9" />
        <circle cx="580" cy="210" r="12" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.4">
          <animate attributeName="r" values="6;18;6" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Destination dot — LA */}
        <circle cx="120" cy="200" r="6" fill="#10b981" opacity="0.9" />
        <circle cx="120" cy="200" r="12" fill="none" stroke="#10b981" strokeWidth="1.5" opacity="0.4">
          <animate attributeName="r" values="6;18;6" dur="2s" repeatCount="indefinite" begin="1s" />
          <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" begin="1s" />
        </circle>

        {/* Moving ship dot */}
        <circle cx={dx} cy={dy} r="5" fill="#ffffff" opacity="0.95" />
        <circle cx={dx} cy={dy} r="10" fill="#3b82f6" opacity="0.3" />

        {/* Labels */}
        <text x="580" y="200" textAnchor="middle" fill="#93c5fd" fontSize="10" fontWeight="600">Mumbai</text>
        <text x="120" y="190" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="600">Los Angeles</text>
      </svg>

      {/* Radial glow center */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(59,130,246,0.08) 0%, transparent 70%)"
      }} />
    </div>
  );
}

// Floating shipment status cards
const floatingCards = [
  { id: "CS-8821", status: "In Transit", route: "Mumbai → LA", color: "#3b82f6", x: "8%", y: "20%" },
  { id: "CS-8819", status: "Arrived", route: "Shanghai → Rotterdam", color: "#10b981", x: "75%", y: "15%" },
  { id: "CS-8820", status: "Customs Hold", route: "Dubai → Hamburg", color: "#f59e0b", x: "82%", y: "65%" },
];

export default function HeroMapSection() {
  const [containerNumber, setContainerNumber] = useState("");
  const [error, setError] = useState("");
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!containerNumber.trim()) {
      setError("Please enter a container number");
      return;
    }
    setError("");
    if (!isAuthenticated) {
      storePendingTrack(containerNumber.trim());
      router.push("/register");
      return;
    }
    router.push("/tracking");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="hero">
      <WorldMapBg />

      {/* Floating cards */}
      {floatingCards.map((card, i) => (
        <motion.div
          key={card.id}
          className="absolute hidden lg:flex items-center gap-2.5 px-3 py-2 rounded-xl border backdrop-blur-md z-10"
          style={{
            left: card.x, top: card.y,
            backgroundColor: "rgba(11,15,25,0.8)",
            borderColor: card.color + "40",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, -6, 0] }}
          transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, repeatType: "loop" }}
        >
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: card.color }} />
          <div>
            <div className="text-[10px] font-bold text-white">{card.id}</div>
            <div className="text-[9px]" style={{ color: card.color }}>{card.status}</div>
            <div className="text-[9px] text-zinc-500">{card.route}</div>
          </div>
        </motion.div>
      ))}

      {/* Center content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-blue-500/30 bg-blue-500/10 text-blue-400 mb-6">
            <Ship className="h-3.5 w-3.5" />
            Real-Time Global Logistics Intelligence
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-5">
            Track Containers Globally<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              with Real-Time Intelligence
            </span>
          </h1>

          <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto leading-relaxed">
            Live tracking, predictive insights, and shipment visibility in one platform.
          </p>

          {/* Tracking input */}
          <form onSubmit={handleTrack} className="max-w-xl mx-auto">
            <div className="relative flex items-center">
              <div className="absolute left-4 pointer-events-none">
                <Search className="h-5 w-5 text-zinc-500" />
              </div>
              <input
                type="text"
                value={containerNumber}
                onChange={e => { setContainerNumber(e.target.value); setError(""); }}
                placeholder="Enter Container / BL Number"
                className="w-full h-14 pl-12 pr-40 rounded-2xl text-sm text-white placeholder:text-zinc-500 bg-white/5 backdrop-blur-md border border-white/10 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition"
              />
              <button type="submit"
                className="absolute right-2 h-10 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-semibold hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-500/25">
                Track Shipment
              </button>
            </div>
            <AnimatePresence>
              {error && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5 text-xs text-red-400 mt-2 text-left">
                  <AlertCircle className="h-3.5 w-3.5" /> {error}
                </motion.p>
              )}
            </AnimatePresence>
          </form>

          <p className="text-xs text-zinc-600 mt-4">No credit card required · 14-day free trial</p>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0F19] to-transparent pointer-events-none" />
    </section>
  );
}
