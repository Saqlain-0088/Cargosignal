"use client";

import Link from "next/link";
import { ArrowRight, Globe, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import AnimatedSection from "./AnimatedSection";

export default function LightHeroSection() {
  return (
    <section className="pt-28 pb-20 bg-white relative overflow-hidden">
      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Orange glow top-right */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#ff6d00] rounded-full blur-[120px] opacity-[0.06] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-[#ff6d00]/30 bg-[#ff6d00]/8 text-[#ff6d00] mb-6">
              <Globe className="h-3.5 w-3.5" />
              Built for Modern Logistics Teams
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-slate-900 mb-6">
              The Logistics Platform That{" "}
              <span className="text-[#ff6d00]">Thinks Ahead.</span>
            </h1>

            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto mb-8">
              Manage shipments, containers, customs, costs, and your entire supply chain workflow — from one beautifully designed platform.
            </p>

            {/* Trust line */}
            <p className="text-sm text-slate-400 mb-8">
              No credit card required · Setup in 5 minutes · GDPR-ready
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link href="/register">
                <Button variant="accent" className="gap-2 px-8 h-12 text-base">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/quote">
                <button className="h-12 px-8 rounded-xl border-2 border-slate-200 text-slate-700 text-base font-semibold hover:border-[#ff6d00]/40 hover:text-[#ff6d00] transition-all duration-200">
                  Request a Demo
                </button>
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-slate-500">
              {["2,000+ logistics teams", "120+ countries", "99.8% uptime SLA"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-[#ff6d00]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Hero visual */}
        <AnimatedSection delay={0.2} className="mt-16">
          <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 overflow-hidden shadow-2xl shadow-slate-200/60 max-w-5xl mx-auto">
            <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="flex-1 mx-4 h-6 bg-white rounded-md border border-slate-200 flex items-center px-3">
                <span className="text-xs text-slate-400">app.cargosignal.com/dashboard</span>
              </div>
            </div>
            <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Active Shipments", value: "1,284", color: "#ff6d00" },
                { label: "On-Time Rate", value: "98.4%", color: "#10b981" },
                { label: "Pending Customs", value: "23", color: "#3b82f6" },
                { label: "Alerts Today", value: "7", color: "#f59e0b" },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-white rounded-xl p-4 border border-slate-200 text-center">
                  <div className="text-2xl font-extrabold mb-1" style={{ color: kpi.color }}>{kpi.value}</div>
                  <div className="text-xs text-slate-500 font-medium">{kpi.label}</div>
                </div>
              ))}
            </div>
            <div className="px-8 pb-8">
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-700">Recent Shipments</span>
                  <span className="text-xs text-[#ff6d00] font-medium">View all →</span>
                </div>
                {[
                  { id: "CS-8821", route: "Singapore → Rotterdam", status: "In Transit", color: "#3b82f6" },
                  { id: "CS-8820", route: "Dubai → Hamburg", status: "Customs Hold", color: "#f59e0b" },
                  { id: "CS-8819", route: "Shanghai → LA", status: "Delivered", color: "#10b981" },
                ].map((s) => (
                  <div key={s.id} className="flex items-center justify-between px-4 py-3 border-b border-slate-50 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="text-xs font-mono text-slate-600">{s.id}</span>
                      <span className="text-xs text-slate-400">{s.route}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: s.color + "15", color: s.color }}>{s.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
