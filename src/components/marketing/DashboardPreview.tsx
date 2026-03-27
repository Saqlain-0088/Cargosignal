"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

export default function DashboardPreview() {
  return (
    <section id="dashboard" className="py-28 bg-[#030609]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4 border border-blue-500/25 bg-blue-500/8 text-blue-400">
            Platform Preview
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Your Logistics Command Center
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto">
            Everything you need to manage global shipments in one unified dashboard.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl border border-white/10 overflow-hidden group"
          style={{
            boxShadow: "0 0 100px rgba(59,130,246,0.08), 0 60px 120px rgba(0,0,0,0.8)",
          }}
        >
          {/* Browser chrome bar */}
          <div
            className="flex items-center justify-between px-5 py-3 border-b border-white/8 z-10 relative"
            style={{ background: "rgba(10,22,40,0.98)" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[11px] text-zinc-400 font-mono">
                app.cargosignal.com/dashboard
              </span>
            </div>
            <Link
              href="/dashboard"
              target="_blank"
              className="flex items-center gap-1 text-[10px] text-zinc-500 hover:text-blue-400 transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              Open
            </Link>
          </div>

          {/* Live iframe of the real dashboard */}
          <div className="relative w-full" style={{ height: "600px" }}>
            <iframe
              src="/dashboard"
              className="w-full h-full border-0 block"
              style={{
                transform: "scale(0.85)",
                transformOrigin: "top left",
                width: "117.6%",   /* 1 / 0.85 */
                height: "117.6%",
                pointerEvents: "none",
                userSelect: "none",
              }}
              tabIndex={-1}
              aria-hidden="true"
              title="CargoSignal Dashboard Preview"
            />

            {/* Gradient fade at bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
              style={{
                background:
                  "linear-gradient(to top, #030609 0%, rgba(3,6,9,0.6) 60%, transparent 100%)",
              }}
            />

            {/* CTA overlay on hover */}
            <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div
                className="rounded-2xl border border-white/10 px-8 py-6 text-center backdrop-blur-xl"
                style={{ background: "rgba(3,6,9,0.85)" }}
              >
                <p className="text-white font-bold text-lg mb-1">
                  See it live in action
                </p>
                <p className="text-zinc-400 text-sm mb-5">
                  Sign up free and get full access to the dashboard
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Link href="/register">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 h-10 px-6 rounded-xl text-sm font-bold text-white"
                      style={{
                        background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                        boxShadow: "0 4px 20px rgba(37,99,235,0.4)",
                      }}
                    >
                      Start Free Trial <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </Link>
                  <Link href="/login">
                    <button className="h-10 px-5 rounded-xl text-sm font-semibold text-zinc-300 border border-white/15 hover:border-white/30 hover:text-white transition-all">
                      Log In
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Below-frame CTA for mobile */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
        >
          <Link href="/register">
            <button
              className="flex items-center gap-2 h-11 px-7 rounded-xl text-sm font-bold text-white transition-all"
              style={{
                background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                boxShadow: "0 4px 20px rgba(37,99,235,0.3)",
              }}
            >
              Start Free Trial <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
          <Link href="/dashboard" target="_blank">
            <button className="flex items-center gap-2 h-11 px-6 rounded-xl text-sm font-semibold text-zinc-400 border border-white/10 hover:border-white/20 hover:text-white transition-all">
              <ExternalLink className="h-4 w-4" /> View Live Dashboard
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
