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
    if (!containerNumber.trim()) {
      setError("Please enter a container number");
      return;
    }
    setError("");
    if (!isAuthenticated) {
      storePendingTrack(containerNumber.trim());
      router.push("/register");
      return;
    }
    router.push("/tracking");
  };

  return (
    <section className="py-28 relative overflow-hidden bg-[#0B0F19]">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(59,130,246,0.1) 0%, transparent 60%)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-blue-500/30 bg-blue-500/10 text-blue-400">
            Get Started Free
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 leading-tight">
            Start Tracking in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Seconds
            </span>
          </h2>

          <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
            Join 2,000+ logistics teams who trust CargoSignal for real-time visibility and smarter decisions.
          </p>

          <form onSubmit={handleTrack} className="max-w-xl mx-auto">
            <div className="relative flex items-center">
              <div className="absolute left-4 pointer-events-none">
                <Search className="h-5 w-5 text-zinc-500" />
              </div>
              <input
                type="text"
                value={containerNumber}
                onChange={e => { setContainerNumber(e.target.value); setError(""); }}
                placeholder="Enter Container / BL Number"
                className="w-full h-14 pl-12 pr-44 rounded-2xl text-sm text-white placeholder:text-zinc-500 bg-white/5 backdrop-blur-md border border-white/10 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition"
              />
              <button type="submit"
                className="absolute right-2 h-10 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-semibold hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-500/25 flex items-center gap-1.5">
                Track Shipment <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <AnimatePresence>
              {error && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5 text-xs text-red-400 mt-2 text-left">
                  <AlertCircle className="h-3.5 w-3.5" /> {error}
                </motion.p>
              )}
            </AnimatePresence>
          </form>

          <p className="text-xs text-zinc-600 mt-4">No credit card required · 14-day free trial · Cancel anytime</p>
        </motion.div>
      </div>
    </section>
  );
}
