"use client";

import { BookOpen, Truck, Navigation, CheckCircle2 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const steps = [
  { icon: BookOpen, label: "Book", desc: "Submit shipment details and get instant confirmation", color: "#ff6d00" },
  { icon: Truck, label: "Dispatch", desc: "Carrier assigned, cargo picked up and documented", color: "#ff8c00" },
  { icon: Navigation, label: "In Transit", desc: "Live GPS tracking across sea, air, and road", color: "#ffa500" },
  { icon: CheckCircle2, label: "Delivered", desc: "Proof of delivery, customs cleared, costs settled", color: "#22c55e" },
];

export default function WorkflowSection() {
  return (
    <section id="workflow" className="py-24 bg-[#212124] border-t border-white/[0.14]">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-[#ff6d00]/30 bg-[#ff6d00]/10 text-[#ff6d00]">
              How It Works
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              From booking to delivery — fully tracked
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Every step of your shipment journey is visible in real-time, with automated alerts at each milestone.
            </p>
          </div>
        </AnimatedSection>

        {/* Desktop horizontal flow */}
        <div className="hidden md:flex items-start gap-0">
          {steps.map((step, i) => (
            <div key={step.label} className="flex-1 flex flex-col items-center relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-[#ff6d00]/40 to-[#ff6d00]/10 z-0" />
              )}
              <AnimatedSection delay={i * 0.12} className="flex flex-col items-center z-10">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border border-white/[0.14] bg-[#252528] transition-all duration-200 hover:scale-110"
                  style={{ boxShadow: `0 0 20px ${step.color}20` }}
                >
                  <step.icon className="h-7 w-7" style={{ color: step.color }} />
                </div>
                <div
                  className="text-xs font-bold uppercase tracking-widest mb-2"
                  style={{ color: step.color }}
                >
                  Step {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.label}</h3>
                <p className="text-xs text-zinc-400 text-center max-w-[140px] leading-relaxed">{step.desc}</p>
              </AnimatedSection>
            </div>
          ))}
        </div>

        {/* Mobile vertical flow */}
        <div className="md:hidden flex flex-col gap-6">
          {steps.map((step, i) => (
            <AnimatedSection key={step.label} delay={i * 0.1}>
              <div className="flex items-start gap-4 p-5 rounded-xl bg-[#252528] border border-white/[0.14]">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${step.color}15` }}
                >
                  <step.icon className="h-6 w-6" style={{ color: step.color }} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: step.color }}>
                    Step {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-bold text-white mb-1">{step.label}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
