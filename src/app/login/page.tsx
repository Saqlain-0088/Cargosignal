"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Globe, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SupplyChainInfographic } from "@/components/marketing/LogisticsInfographic";

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

  return (
    <div className="min-h-screen flex bg-[#1c1c1e]">

      {/* Left — Logistics Infographic */}
      <div className="hidden lg:flex lg:w-[58%] flex-col bg-[#212124] relative overflow-hidden">
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "50px 50px" }} />
        {/* Glow blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#ff6d00] rounded-full blur-[160px] opacity-[0.06] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#3b82f6] rounded-full blur-[160px] opacity-[0.04] pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10 p-10">
          <Link href="/" className="flex items-center gap-2.5 w-fit">
            <div className="bg-[#ff6d00] p-2 rounded-xl">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">CargoSignal</span>
          </Link>
        </div>

        {/* Infographic — fills remaining space */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-8 pb-10">
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-white leading-snug">
              Global Shipment Tracking,<br />
              <span className="text-[#ff6d00]">From Factory to Door.</span>
            </h2>
            <p className="text-zinc-500 text-sm mt-2">
              Monitor every leg of your supply chain in real-time.
            </p>
          </div>
          <div className="flex-1 min-h-[320px] max-h-[380px]">
            <SupplyChainInfographic />
          </div>
        </div>

        {/* Bottom trust bar */}
        <div className="relative z-10 px-10 pb-8 flex items-center gap-6 text-xs text-zinc-600">
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-500" />GDPR Compliant</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-500" />SOC 2 Certified</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-500" />99.9% Uptime SLA</span>
        </div>
      </div>

      {/* Right — Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="bg-[#ff6d00] p-1.5 rounded-lg"><Globe className="h-5 w-5 text-white" /></div>
            <span className="text-lg font-extrabold text-white">CargoSignal</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-white mb-1">Welcome back</h1>
            <p className="text-zinc-500 text-sm">Sign in to your logistics dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  placeholder="name@company.com"
                  className="w-full h-11 pl-10 pr-4 rounded-xl text-sm text-white placeholder:text-zinc-600 bg-[#252528] border border-white/[0.1] outline-none focus:ring-1 focus:ring-[#ff6d00] transition" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-zinc-400">Password</label>
                <a href="#" className="text-xs text-[#ff6d00] hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-10 rounded-xl text-sm text-white placeholder:text-zinc-600 bg-[#252528] border border-white/[0.1] outline-none focus:ring-1 focus:ring-[#ff6d00] transition" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full h-11 rounded-xl bg-[#ff6d00] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#e56200] transition-colors disabled:opacity-60 mt-2">
              {loading
                ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <><span>Sign In</span><ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/[0.1] text-center">
            <p className="text-sm text-zinc-500">
              Don't have an account?{" "}
              <Link href="/register" className="text-[#ff6d00] font-semibold hover:underline">
                Start free trial
              </Link>
            </p>
          </div>

          <p className="text-center text-xs text-zinc-700 mt-4">
            No credit card required · 14-day free trial
          </p>
        </div>
      </div>
    </div>
  );
}
