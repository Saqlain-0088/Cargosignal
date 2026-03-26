"use client";

import { Ship, Container, Bell, FileCheck, DollarSign, BarChart3 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const features = [
  {
    icon: Ship,
    title: "Real-Time Shipment Tracking",
    desc: "Monitor every shipment across air, sea, and land with live GPS updates, milestone alerts, and predictive ETAs powered by AI.",
    tag: "Core Feature",
  },
  {
    icon: Container,
    title: "Container Management",
    desc: "Track container status, location, temperature, and humidity from origin to destination with IoT sensor integration.",
    tag: "IoT Enabled",
  },
  {
    icon: Bell,
    title: "Intelligent Alerts",
    desc: "Get notified instantly on delays, route deviations, customs holds, and temperature breaches via SMS, email, or webhook.",
    tag: "Automation",
  },
  {
    icon: FileCheck,
    title: "Customs Clearance",
    desc: "Full customs event timeline with document status, duty estimates, and clearance tracking across 120+ countries.",
    tag: "Compliance",
  },
  {
    icon: DollarSign,
    title: "Cost Analytics",
    desc: "Break down logistics costs by freight, customs, insurance, and storage with trend analysis and budget forecasting.",
    tag: "Finance",
  },
  {
    icon: BarChart3,
    title: "Performance Reporting",
    desc: "Measure carrier performance, on-time delivery rates, and operational KPIs with exportable dashboards.",
    tag: "Analytics",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-[#1c1c1e]">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-[#ff6d00]/30 bg-[#ff6d00]/10 text-[#ff6d00]">
              Platform Features
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Everything your logistics team needs
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-zinc-400">
              From first mile to last mile, CargoSignal gives you complete visibility and control.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <AnimatedSection key={f.title} delay={i * 0.07}>
              <div className="rounded-xl p-6 border border-white/[0.14] bg-[#252528] h-full group cursor-default transition-all duration-200 hover:border-[#ff6d00] hover:bg-[#2e2e32]">
                <div className="flex items-start justify-between mb-4">
                  <div className="inline-flex p-3 rounded-xl bg-[#ff6d00]/10">
                    <f.icon className="h-6 w-6 text-[#ff6d00]" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-white/[0.06] text-zinc-500 border border-white/[0.14]">
                    {f.tag}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{f.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
