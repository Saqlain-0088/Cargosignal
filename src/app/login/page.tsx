"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Globe, Mail, Lock, Eye, EyeOff, ArrowRight, Ship, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const perks = [
  "Real-time GPS tracking across 120+ countries",
  "Instant alerts for delays and customs holds",
  "AI-powered ETA predictions",
  "340+ carrier integrations",
];

function AnimatedBg() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 120% 100% at 70% 50%, #0a1628 0%, #060b14 60%, #030609 100%)" }} />
      {Array.from({ length: 40 }).map((_, i) => (
        <div key={i} className="absolute rounded-full bg-white"
          style={{ width: i % 4 === 0 ? 2 : 1, height: i % 4 === 0 ? 2 : 1, left: `${(i * 19.3) % 100}%`, top: `${(i * 14.7) % 100}%`, opacity: 0.06 + (i % 3) * 0.04 }} />
      ))}
      <svg viewBox="0 0 600 500" className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M500,150 Q400,200 300,220 Q200,240 100,200" stroke="url(#lg1)" strokeWidth="1.5" fill="none" strokeDasharray="6 3" />
        <path d="M520,250 Q420,280 320,270 Q220,260 120,230" stroke="#8b5cf6" strokeWidth="1" fill="none" strokeDasharray="4 4" opacity="0.4" />
        <circle cx="500" cy="150" r="4" fill="#3b82f6" opacity="0.7" />
        <circle cx="100" cy="200" r="4" fill="#06b6d4" opacity="0.7" />
        <circle cx="500" cy="150" r="10" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.3">
          <animate attributeName="r" values="4;16;4" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite" />
        </circle>
      </svg>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 80% at 70% 50%, transparent 40%, rgba(3,6,9,0.8) 100%)" }} />
    </div>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try { await login(email); } catch {}
    finally { setLoading(false); }
  };

  const inputCls = "w-full h-12 rounded-xl text-sm text-white placeholder:text-zinc-600 border border-white/10 outline-none focus:ring-1 focus:ring-blue-500/60 focus:border-blue-500/40 transition-all duration-200";

  return (
    <div className="min-h-screen flex bg-[#030609]">
      {/* Left panel — visual */}
      <div className="hidden lg:flex lg:w-[52%] relative flex-col justify-between p-12 overflow-hidden">
        <AnimatedBg />
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2.5 w-fit group">
            <div className="bg-blue-600 p-2 rounded-xl group-hover:bg-blue-500 transition-colors">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">CargoSignal</span>
          </Link>
        </div>

        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-3xl font-black text-white leading-tight mb-3">
              Global Logistics<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #60a5fa, #34d399)" }}>
                Intelligence Platform
              </span>
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
              Track every container, vessel, and delivery across the world with real-time precision.
            </p>
          </div>

          <div className="space-y-3">
            {perks.map((p, i) => (
              <motion.div key={p} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500/15 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-3 w-3 text-blue-400" />
                </div>
                <span className="text-sm text-zinc-400">{p}</span>
              </motion.div>
            ))}
          </div>

          {/* Mini shipment card */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="rounded-2xl border border-white/10 p-4 backdrop-blur-sm max-w-xs"
            style={{ background: "rgba(255,255,255,0.03)" }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center">
                <Ship className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-white font-mono">CS-8821</div>
                <div className="text-[10px] text-zinc-500">Mumbai → Los Angeles</div>
              </div>
              <div className="ml-auto">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400">In Transit</span>
              </div>
            </div>
            <div className="h-1 bg-white/8 rounded-full overflow-hidden">
              <div className="h-full w-[72%] rounded-full" style={{ background: "linear-gradient(90deg, #3b82f6, #06b6d4)" }} />
            </div>
            <div className="flex justify-between mt-1.5 text-[10px] text-zinc-600">
              <span>72% complete</span>
              <span>ETA Mar 28</span>
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-xs text-zinc-700">
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-500" />GDPR Compliant</span>
          <span>·</span>
          <span>SOC 2 Certified</span>
          <span>·</span>
          <span>99.9% Uptime</span>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(59,130,246,0.04) 0%, transparent 60%)" }} />

        <motion.div className="w-full max-w-sm relative z-10"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="bg-blue-600 p-1.5 rounded-lg"><Globe className="h-5 w-5 text-white" /></div>
            <span className="text-lg font-extrabold text-white">CargoSignal</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-black text-white mb-1.5">Welcome back</h1>
            <p className="text-zinc-500 text-sm">Sign in to your logistics dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  placeholder="name@company.com"
                  className={`${inputCls} pl-10 pr-4 bg-white/[0.04]`} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-zinc-400">Password</label>
                <a href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required
                  placeholder="••••••••"
                  className={`${inputCls} pl-10 pr-11 bg-white/[0.04]`} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300 transition-colors">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <motion.button type="submit" disabled={loading}
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              className="w-full h-12 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 mt-2 transition-all disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 4px 24px rgba(37,99,235,0.35)" }}>
              {loading
                ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <><span>Sign In</span><ArrowRight className="h-4 w-4" /></>}
            </motion.button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/[0.08] text-center">
            <p className="text-sm text-zinc-500">
              Don't have an account?{" "}
              <Link href="/register" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                Start free trial
              </Link>
            </p>
          </div>

          <p className="text-center text-xs text-zinc-700 mt-4">No credit card required · 14-day free trial</p>
        </motion.div>
      </div>
    </div>
  );
}
