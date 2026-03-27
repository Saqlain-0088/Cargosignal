"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Globe, Mail, Lock, Eye, EyeOff, ArrowRight, User, Building2, CheckCircle2, Star } from "lucide-react";
import Link from "next/link";

const testimonial = {
  quote: "Setup took less than a day. Our team was tracking shipments live by morning.",
  name: "Sarah K.", title: "COO, FastFreight Ltd", initials: "SK",
};

const steps = ["Create your account", "Set up your company", "Import shipments & go live"];

function AnimatedBg() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 120% 100% at 30% 50%, #0a1628 0%, #060b14 60%, #030609 100%)" }} />
      {Array.from({ length: 40 }).map((_, i) => (
        <div key={i} className="absolute rounded-full bg-white"
          style={{ width: i % 4 === 0 ? 2 : 1, height: i % 4 === 0 ? 2 : 1, left: `${(i * 23.1) % 100}%`, top: `${(i * 11.9) % 100}%`, opacity: 0.05 + (i % 3) * 0.04 }} />
      ))}
      <svg viewBox="0 0 600 500" className="absolute inset-0 w-full h-full opacity-25" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="lg2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M80,180 Q180,150 280,160 Q380,170 500,140" stroke="url(#lg2)" strokeWidth="1.5" fill="none" strokeDasharray="6 3" />
        <path d="M80,280 Q180,260 280,270 Q380,280 500,250" stroke="#8b5cf6" strokeWidth="1" fill="none" strokeDasharray="4 4" opacity="0.35" />
        <circle cx="80" cy="180" r="4" fill="#10b981" opacity="0.7" />
        <circle cx="500" cy="140" r="4" fill="#3b82f6" opacity="0.7" />
        <circle cx="80" cy="180" r="10" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.3">
          <animate attributeName="r" values="4;16;4" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
        </circle>
      </svg>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 80% at 30% 50%, transparent 40%, rgba(3,6,9,0.8) 100%)" }} />
    </div>
  );
}

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try { await register(name, email); } catch {}
    finally { setLoading(false); }
  };

  const inputCls = "w-full h-12 rounded-xl text-sm text-white placeholder:text-zinc-600 border border-white/10 outline-none focus:ring-1 focus:ring-blue-500/60 focus:border-blue-500/40 transition-all duration-200 bg-white/[0.04]";

  return (
    <div className="min-h-screen flex bg-[#030609]">
      {/* Left panel — form */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(16,185,129,0.03) 0%, transparent 60%)" }} />

        <motion.div className="w-full max-w-sm relative z-10"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="bg-blue-600 p-1.5 rounded-lg"><Globe className="h-5 w-5 text-white" /></div>
            <span className="text-lg font-extrabold text-white">CargoSignal</span>
          </div>

          <div className="mb-7">
            <h1 className="text-2xl font-black text-white mb-1.5">Start your free trial</h1>
            <p className="text-zinc-500 text-sm">No credit card required · Setup in 5 minutes</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                <input type="text" value={name} onChange={e => setName(e.target.value)} required
                  placeholder="John Doe" className={`${inputCls} pl-10 pr-4`} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2">Company Name</label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                <input type="text" value={company} onChange={e => setCompany(e.target.value)}
                  placeholder="Acme Logistics" className={`${inputCls} pl-10 pr-4`} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  placeholder="name@company.com" className={`${inputCls} pl-10 pr-4`} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required
                  placeholder="Min. 8 characters" className={`${inputCls} pl-10 pr-11`} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300 transition-colors">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <motion.button type="submit" disabled={loading}
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              className="w-full h-12 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 mt-1 transition-all disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 4px 24px rgba(37,99,235,0.35)" }}>
              {loading
                ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <><span>Create Free Account</span><ArrowRight className="h-4 w-4" /></>}
            </motion.button>

            <p className="text-[10px] text-zinc-700 text-center pt-1">
              By signing up you agree to our{" "}
              <a href="#" className="text-zinc-500 hover:text-white transition-colors">Terms</a> and{" "}
              <a href="#" className="text-zinc-500 hover:text-white transition-colors">Privacy Policy</a>
            </p>
          </form>

          <div className="mt-5 pt-5 border-t border-white/[0.08] text-center">
            <p className="text-sm text-zinc-500">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">Sign in</Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right panel — visual */}
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
              One Platform for Your<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #34d399, #60a5fa)" }}>
                Entire Supply Chain
              </span>
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
              From supplier to final delivery — every step tracked, every alert automated.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step, i) => (
              <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-[11px] font-black text-white shrink-0">
                  {i + 1}
                </div>
                <span className="text-sm text-zinc-400">{step}</span>
              </motion.div>
            ))}
          </div>

          {/* Testimonial */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="rounded-2xl border border-white/10 p-5 backdrop-blur-sm"
            style={{ background: "rgba(255,255,255,0.02)" }}>
            <div className="flex gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />)}
            </div>
            <p className="text-sm text-zinc-300 italic leading-relaxed mb-4">"{testimonial.quote}"</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">
                {testimonial.initials}
              </div>
              <div>
                <div className="text-xs font-bold text-white">{testimonial.name}</div>
                <div className="text-[10px] text-zinc-600">{testimonial.title}</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-xs text-zinc-700">
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-500" />Free 14-day trial</span>
          <span>·</span>
          <span>No credit card</span>
          <span>·</span>
          <span>Cancel anytime</span>
        </div>
      </div>
    </div>
  );
}
