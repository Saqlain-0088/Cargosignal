"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, Lock, Mail, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAdminAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const ok = login(email, password);
      if (ok) {
        router.push("/superadmin");
      } else {
        setError("Invalid credentials. Try admin@cargosignal.com / admin123");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#ff6d00] rounded-full blur-[120px] opacity-5 pointer-events-none" />

      <div className="w-full max-w-sm relative">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-[#ff6d00] rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_40px_rgba(255,109,0,0.3)]">
            <ShieldAlert className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">CargoSignal</h1>
          <p className="text-xs text-[#ff6d00] font-semibold uppercase tracking-widest mt-1">Admin Portal</p>
        </div>

        {/* Card */}
        <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8">
          <h2 className="text-lg font-bold text-white mb-1">Sign in</h2>
          <p className="text-sm text-zinc-500 mb-6">Access the admin control panel</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  placeholder="admin@cargosignal.com"
                  className="w-full h-11 pl-10 pr-4 rounded-lg text-sm text-white placeholder:text-zinc-600 bg-[#0f0f0f] border border-white/10 outline-none focus:ring-1 focus:ring-[#ff6d00] transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-10 rounded-lg text-sm text-white placeholder:text-zinc-600 bg-[#0f0f0f] border border-white/10 outline-none focus:ring-1 focus:ring-[#ff6d00] transition"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <button
              type="submit" disabled={loading}
              className="w-full h-11 rounded-lg bg-[#ff6d00] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#e56200] transition-colors disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><span>Sign In</span><ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-white/10">
            <p className="text-xs text-zinc-600 text-center">
              Demo: <span className="text-zinc-400">admin@cargosignal.com</span> / <span className="text-zinc-400">admin123</span>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-zinc-700 mt-6">
          Secure admin access · Activity is logged
        </p>
      </div>
    </div>
  );
}
