"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, Lock, Mail, ArrowRight, Loader2, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";

export default function SuperAdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [pwErr, setPwErr] = useState("");
  const { login } = useAdminAuth();
  const router = useRouter();

  const validate = () => {
    let valid = true;
    if (!email.trim()) { setEmailErr("Email is required"); valid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setEmailErr("Enter a valid email"); valid = false; }
    else setEmailErr("");
    if (!password) { setPwErr("Password is required"); valid = false; }
    else if (password.length < 4) { setPwErr("Password is too short"); valid = false; }
    else setPwErr("");
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      const ok = login(email, password);
      if (ok) {
        router.push("/superadmin");
      } else {
        setError("Invalid credentials. Check your email and password.");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600 rounded-full blur-[140px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-600 rounded-full blur-[120px] opacity-8 pointer-events-none" />

      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_40px_rgba(37,99,235,0.4)]">
            <ShieldAlert className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">CargoSignal</h1>
          <p className="text-xs text-blue-400 font-semibold uppercase tracking-widest mt-1">Super Admin Portal</p>
        </div>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-lg font-bold text-white mb-1">Sign in</h2>
          <p className="text-sm text-slate-500 mb-6">Access the admin control panel</p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="email" value={email}
                  onChange={e => { setEmail(e.target.value); setEmailErr(""); }}
                  placeholder="admin@cargosignal.com"
                  className={`w-full h-11 pl-10 pr-4 rounded-lg text-sm text-white placeholder:text-slate-600 bg-slate-800 border outline-none focus:ring-1 transition ${emailErr ? "border-red-500 focus:ring-red-500" : "border-slate-700 focus:ring-blue-500"}`}
                />
              </div>
              {emailErr && <p className="flex items-center gap-1 text-xs text-red-400 mt-1"><AlertCircle className="h-3 w-3" />{emailErr}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type={showPw ? "text" : "password"} value={password}
                  onChange={e => { setPassword(e.target.value); setPwErr(""); }}
                  placeholder="••••••••"
                  className={`w-full h-11 pl-10 pr-10 rounded-lg text-sm text-white placeholder:text-slate-600 bg-slate-800 border outline-none focus:ring-1 transition ${pwErr ? "border-red-500 focus:ring-red-500" : "border-slate-700 focus:ring-blue-500"}`}
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {pwErr && <p className="flex items-center gap-1 text-xs text-red-400 mt-1"><AlertCircle className="h-3 w-3" />{pwErr}</p>}
            </div>

            {error && (
              <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />{error}
              </div>
            )}

            <button
              type="submit" disabled={loading}
              className="w-full h-11 rounded-lg bg-blue-600 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-60 mt-2"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><span>Sign In</span><ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-slate-800">
            <p className="text-xs text-slate-600 text-center">
              Demo: <span className="text-slate-400">admin@cargosignal.com</span> / <span className="text-slate-400">admin123</span>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-slate-700 mt-6">
          Secure admin access · Activity is logged
        </p>
      </div>
    </div>
  );
}
