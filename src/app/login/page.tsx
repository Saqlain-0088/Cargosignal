"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { Globe, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { validateForm, validators } from "@/lib/validation";
import SocialAuthButtons from "@/components/ui/SocialAuthButtons";

const perks = [
  "Real-time GPS tracking across 120+ countries",
  "Instant alerts for delays and customs holds",
  "AI-powered ETA predictions",
  "340+ carrier integrations",
];

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="flex items-center gap-1.5 text-xs text-red-400 mt-1.5">
      <AlertCircle className="h-3 w-3 shrink-0" /> {msg}
    </p>
  );
}

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { success, error } = useToast();

  const rules = {
    email: [validators.required, validators.email],
    password: [validators.required, validators.password],
  };

  const set = (field: string, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    if (touched[field]) {
      const errs = validateForm({ ...form, [field]: value }, rules);
      setErrors(e => ({ ...e, [field]: errs[field as keyof typeof errs] ?? "" }));
    }
  };

  const blur = (field: string) => {
    setTouched(t => ({ ...t, [field]: true }));
    const errs = validateForm(form, rules);
    setErrors(e => ({ ...e, [field]: errs[field as keyof typeof errs] ?? "" }));
  };

  const isValid = !validateForm(form, rules).email && !validateForm(form, rules).password;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    const errs = validateForm(form, rules);
    setErrors(errs as Record<string, string>);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    try {
      await login(form.email);
      success("Welcome back!", "Redirecting to your dashboard...");
    } catch {
      error("Sign in failed", "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = (field: string) =>
    `w-full h-12 rounded-xl text-sm text-white placeholder:text-zinc-600 border outline-none transition-all duration-200 bg-white/[0.04] ${
      touched[field] && errors[field]
        ? "border-red-500/60 focus:ring-1 focus:ring-red-500/40"
        : "border-white/10 focus:ring-1 focus:ring-blue-500/60 focus:border-blue-500/40"
    }`;

  return (
    <div className="min-h-screen flex bg-[#030609]">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[52%] relative flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 120% 100% at 70% 50%, #0a1628 0%, #060b14 60%, #030609 100%)" }} />
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{ width: i % 4 === 0 ? 2 : 1, height: i % 4 === 0 ? 2 : 1, left: `${(i * 19.3) % 100}%`, top: `${(i * 14.7) % 100}%`, opacity: 0.06 + (i % 3) * 0.04 }} />
        ))}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2.5 w-fit group">
            <div className="bg-blue-600 p-2 rounded-xl group-hover:bg-blue-500 transition-colors"><Globe className="h-5 w-5 text-white" /></div>
            <span className="text-xl font-extrabold text-white tracking-tight">CargoSignal</span>
          </Link>
        </div>
        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-3xl font-black text-white leading-tight mb-3">
              Global Logistics<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #60a5fa, #34d399)" }}>Intelligence Platform</span>
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">Track every container, vessel, and delivery across the world with real-time precision.</p>
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
        </div>
        <div className="relative z-10 flex items-center gap-4 text-xs text-zinc-700">
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-500" />GDPR Compliant</span>
          <span>·</span><span>SOC 2 Certified</span><span>·</span><span>99.9% Uptime</span>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(59,130,246,0.04) 0%, transparent 60%)" }} />
        <motion.div className="w-full max-w-sm relative z-10"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="bg-blue-600 p-1.5 rounded-lg"><Globe className="h-5 w-5 text-white" /></div>
            <span className="text-lg font-extrabold text-white">CargoSignal</span>
          </div>
          <div className="mb-8">
            <h1 className="text-2xl font-black text-white mb-1.5">Welcome back</h1>
            <p className="text-zinc-500 text-sm">Sign in to your logistics dashboard</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Social auth at top */}
            <SocialAuthButtons mode="login" showMagicLink />
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                <input type="email" value={form.email}
                  onChange={e => set("email", e.target.value)}
                  onBlur={() => blur("email")}
                  placeholder="name@company.com"
                  className={`${inputCls("email")} pl-10 pr-4`} />
              </div>
              <FieldError msg={touched.email ? errors.email : undefined} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-zinc-400">Password</label>
                <a href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                <input type={showPw ? "text" : "password"} value={form.password}
                  onChange={e => set("password", e.target.value)}
                  onBlur={() => blur("password")}
                  placeholder="••••••••"
                  className={`${inputCls("password")} pl-10 pr-11`} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300 transition-colors">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <FieldError msg={touched.password ? errors.password : undefined} />
            </div>
            <motion.button type="submit" disabled={loading}
              whileHover={!loading ? { scale: 1.01 } : {}} whileTap={!loading ? { scale: 0.99 } : {}}
              className="w-full h-12 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 mt-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 4px 24px rgba(37,99,235,0.35)" }}>
              {loading
                ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <><span>Sign In</span><ArrowRight className="h-4 w-4" /></>}
            </motion.button>
          </form>
          <div className="mt-6 pt-6 border-t border-white/[0.08] text-center">
            <p className="text-sm text-zinc-500">
              Don't have an account?{" "}
              <Link href="/register" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">Start free trial</Link>
            </p>
          </div>
          <p className="text-center text-xs text-zinc-700 mt-4">No credit card required · 14-day free trial</p>
        </motion.div>
      </div>
    </div>
  );
}
