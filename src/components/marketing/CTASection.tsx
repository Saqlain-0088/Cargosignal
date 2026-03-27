"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, AlertCircle, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { storePendingTrack } from "@/lib/trackingGuard";

export default function CTASection() {
  const [containerNumber, setContainerNumber] = useState("");
  const [error, setError] = useState("");
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!containerNumber.trim()) { setError("Please enter a container number"); return; }
    setError("");
    if (!isAuthenticated) { storePendingTrack(containerNumber.trim()); router.push("/register"); return; }
    router.push("/tracking");
  };

  return (
    <section className="py-28 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #060b14 0%, #030609 100%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(59,130,246,0.08) 0%, transparent 60%)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)" }} />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8 }}>
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-6 border border-blue-500/25 bg-blue-500/8 text-blue-400">
            Get Started Free
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            Start Tracking in{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #60a5fa, #34d399)" }}>
              Seconds
            </span>
          </h2>
          <p className="text-zinc-500 text-lg mb-10 max-w-xl mx-auto">
            Join 2,000+ logistics teams who trust CargoSignal for real-time visibility and smarter decisions.
          </p>

          <form onSubmit={handleTrack} className="max-w-xl mx-auto">
            <div className="relative flex items-center p-1.5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl shadow-black/40">
              <div className="absolute left-5 pointer-events-none">
                <Search className="h-5 w-5 text-zinc-500" />
              </div>
              <input type="text" value={containerNumber}
                onChange={e => { setContainerNumber(e.target.value); setError(""); }}
                placeholder="Enter Container / BL Number"
                className="flex-1 h-12 pl-12 pr-4 bg-transparent text-white placeholder:text-zinc-500 text-sm outline-none" />
              <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 h-12 px-7 rounded-xl text-sm font-bold text-white"
                style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 4px 20px rgba(37,99,235,0.35)" }}>
                Track Shipment <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
            <AnimatePresence>
              {error && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5 text-xs text-red-400 mt-2 text-left px-2">
                  <AlertCircle className="h-3.5 w-3.5" /> {error}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
          <p className="text-xs text-zinc-700 mt-4">No credit card required · 14-day free trial · Cancel anytime</p>
        </motion.div>
      </div>
    </section>
  );
}
