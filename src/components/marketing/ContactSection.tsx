"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { validateForm, validators } from "@/lib/validation";

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="flex items-center gap-1.5 text-xs text-red-400 mt-1.5">
      <AlertCircle className="h-3 w-3 shrink-0" /> {msg}
    </p>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();

  const rules = {
    name: [validators.required, validators.name],
    email: [validators.required, validators.email],
    message: [validators.required],
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
    setTouched({ name: true, email: true, message: true });
    const errs = validateForm(form, rules);
    setErrors(errs as Record<string, string>);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    success("Message sent!", "We'll get back to you within 2 hours.");
    setForm({ name: "", email: "", message: "" });
    setTouched({});
    setErrors({});
  };

  const inputCls = (field: string) =>
    `w-full rounded-xl text-sm text-white placeholder:text-zinc-600 border outline-none transition-all duration-200 bg-white/5 ${
      touched[field] && errors[field]
        ? "border-red-500/60 focus:ring-1 focus:ring-red-500/40"
        : "border-white/10 focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50"
    }`;

  return (
    <section id="contact" className="py-24 bg-[#0B0F19]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }}
          className="text-center mb-14">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4 border border-blue-500/25 bg-blue-500/8 text-blue-400">Contact</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Get in Touch</h2>
          <p className="text-zinc-500 max-w-xl mx-auto">Have questions? Our team is ready to help you get started.</p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}
            className="space-y-6">
            {[
              { icon: Mail, label: "Email", value: "support@cargosignal.com" },
              { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
              { icon: MapPin, label: "HQ", value: "San Francisco, CA 94105" },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">{item.label}</div>
                  <div className="text-sm font-medium text-white">{item.value}</div>
                </div>
              </div>
            ))}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 mt-8">
              <div className="text-sm font-bold text-white mb-2">Response Time</div>
              <p className="text-sm text-zinc-400">We typically respond within 2 hours during business hours (Mon–Fri, 9am–6pm PST).</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay: 0.1 }}>
            <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-8" noValidate>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Full Name *</label>
                <input value={form.name} onChange={e => set("name", e.target.value)} onBlur={() => blur("name")}
                  placeholder="John Doe" className={`${inputCls("name")} h-11 px-4`} />
                <FieldError msg={touched.name ? errors.name : undefined} />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Email *</label>
                <input type="email" value={form.email} onChange={e => set("email", e.target.value)} onBlur={() => blur("email")}
                  placeholder="john@company.com" className={`${inputCls("email")} h-11 px-4`} />
                <FieldError msg={touched.email ? errors.email : undefined} />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Message *</label>
                <textarea value={form.message} onChange={e => set("message", e.target.value)} onBlur={() => blur("message")}
                  rows={4} placeholder="How can we help you?"
                  className={`${inputCls("message")} px-4 py-3 resize-none`} />
                <FieldError msg={touched.message ? errors.message : undefined} />
              </div>
              <button type="submit" disabled={loading}
                className="w-full h-11 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 4px 20px rgba(37,99,235,0.3)" }}>
                {loading
                  ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  : <><Send className="h-4 w-4" /> Send Message</>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
