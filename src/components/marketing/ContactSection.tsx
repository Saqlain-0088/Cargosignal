"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  const inputCls = "w-full h-11 px-4 rounded-xl text-sm text-white placeholder:text-zinc-600 bg-white/5 border border-white/10 outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition";

  return (
    <section id="contact" className="py-24 bg-[#0B0F19]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-14">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-500/30 bg-blue-500/10 text-blue-400">
            Contact
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Get in Touch</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">Have questions? Our team is ready to help you get started.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
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

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Full Name</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required placeholder="John Doe" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Email</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required placeholder="john@company.com" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Message</label>
                <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required rows={4}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-zinc-600 bg-white/5 border border-white/10 outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition resize-none" />
              </div>
              <button type="submit"
                className="w-full h-11 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
                {sent ? "Message Sent!" : <><Send className="h-4 w-4" /> Send Message</>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
