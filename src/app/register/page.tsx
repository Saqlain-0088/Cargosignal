"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { Globe, Mail, Lock, Eye, EyeOff, ArrowRight, User, Building2, AlertCircle, Star } from "lucide-react";
import Link from "next/link";
import { validateForm, validators } from "@/lib/validation";

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="flex items-center gap-1.5 text-xs text-red-400 mt-1.5">
      <AlertCircle className="h-3 w-3 shrink-0" /> {msg}
    </p>
  );
}

const testimonial = { quote: "Setup took less than a day. Our team was tracking shipments live by morning.", name: "Sarah K.", title: "COO, FastFreight Ltd", initials: "SK" };
const steps = ["Create your account", "Set up your company", "Import shipments & go live"];

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { success, error } = useToast();

  const rules = {
    name: [validators.required, validators.name],
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, company: true, password: true });
    const errs = validateForm(form, rules);
    setErrors(errs as Record<string, string>);
    if (Object.keys(errs).length > 0) {
      error("Please fix the errors", "Check the highlighted fields and try again.");
      return;
    }
    setLoading(true);
    try {
      await register(form.name, form.email);
      success("Account created!", "Welcome to CargoSignal. Setting up your workspace...");
    } catch {
      error("Registration failed", "Something went wrong. Please try again.");
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
      {/* Left — form */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(16,185,129,0.03) 0%, transparent 60%)" }} />
        <motion.div className="w-full max-w-sm relative z-10"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="bg-blue-600 p-1.5 rounded-lg"><Globe className="h-5 w-5 text-white" /></div>
            <span className="text-lg font-extrabold text-white">CargoSignal</span>
          </div>
          <div className="mb-7">
            <h1 className="text-2xl font-black text-white mb-1.5">Start your free trial</h1>
            <p className="text-zinc-500 text-sm">No credit card required · Setup in 5 minutes</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                <input type="text" value={form.name} onChange={e => set("name", e.target.value)} onBlur={() => blur("name")}
                  placeholder="John Doe" className={`${inputCls("name")} pl-10 pr-4`} />
              </div>
              <FieldError msg={touched.name ? errors.name : undefined} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2">Company Name</label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                <input type="text" value={form.company} onChange={e => set("company", e.target.value)}
                  placeholder="Acme Logistics" className="w-full h-12 rounded-xl text-sm text-white placeholder:text-zinc-600 border border-white/10 outline-none focus:ring-1 focus:ring-blue-500/60 focus:border-blue-500/40 transition-all bg-white/[0.04] pl-10 pr-4" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2">Work Email *</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                <input type="email" value={form.email} onChange={e => set("email", e.target.value)} onBlur={() => blur("email")}
                  placeholder="name@company.com" className={`${inputCls("email")} pl-10 pr-4`} />
              </div>
              <FieldError msg={touched.email ? errors.email : undefined} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-2">Password *</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                <input type={showPw ? "text" : "password"} value={form.password} onChange={e => set("password", e.target.value)} onBlur={() => blur("password")}
                  placeholder="Min. 8 characters" className={`${inputCls("password")} pl-10 pr-11`} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300 transition-colors">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <FieldError msg={touched.password ? errors.password : undefined} />
            </div>
            <motion.button type="submit" disabled={loading}
              whileHover={!loading ? { scale: 1.01 } : {}} whileTap={!loading ? { scale: 0.99 } : {}}
              className="w-full h-12 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 mt-1 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 4px 24px rgba(37,99,235,0.35)" }}>
              {loading
                ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <><span>Create Free Account</span><ArrowRight className="h-4 w-4" /></>}
            </motion.button>
            <p className="text-[10px] text-zinc-700 text-center pt-1">
              By signing up you agree to our <a href="#" className="text-zinc-500 hover:text-white transition-colors">Terms</a> and <a href="#" className="text-zinc-500 hover:text-white transition-colors">Privacy Policy</a>
            </p>
          </form>
          <div className="mt-5 pt-5 border-t border-white/[0.08] text-center">
            <p className="text-sm text-zinc-500">Already have an account?{" "}
              <Link href="/login" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">Sign in</Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right — visual */}
      <div className="hidden lg:flex lg:w-[52%] relative flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 120% 100% at 30% 50%, #0a1628 0%, #060b14 60%, #030609 100%)" }} />
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{ width: i % 4 === 0 ? 2 : 1, height: i % 4 === 0 ? 2 : 1, left: `${(i * 23.1) % 100}%`, top: `${(i * 11.9) % 100}%`, opacity: 0.05 + (i % 3) * 0.04 }} />
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
              One Platform for Your<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #34d399, #60a5fa)" }}>Entire Supply Chain</span>
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">From supplier to final delivery — every step tracked, every alert automated.</p>
          </div>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-[11px] font-black text-white shrink-0">{i + 1}</div>
                <span className="text-sm text-zinc-400">{step}</span>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="rounded-2xl border border-white/10 p-5 backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.02)" }}>
            <div className="flex gap-0.5 mb-3">{[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />)}</div>
            <p className="text-sm text-zinc-300 italic leading-relaxed mb-4">"{testimonial.quote}"</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">{testimonial.initials}</div>
              <div>
                <div className="text-xs font-bold text-white">{testimonial.name}</div>
                <div className="text-[10px] text-zinc-600">{testimonial.title}</div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="relative z-10 flex items-center gap-4 text-xs text-zinc-700">
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-500" />Free 14-day trial</span>
          <span>·</span><span>No credit card</span><span>·</span><span>Cancel anytime</span>
        </div>
      </div>
    </div>
  );
}
