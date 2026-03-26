"use client";

import MarketingLayout from "@/components/layout/MarketingLayout";
import { Globe2, TrendingUp, Ship, MapPin, Award } from "lucide-react";
import AnimatedSection from "@/components/marketing/AnimatedSection";

export default function AboutPage() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="py-20 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-[#ff6d00]/30 bg-[#ff6d00]/10 text-[#ff6d00]">
              Our Story
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight max-w-3xl">
              Making the world's supply chains{" "}
              <span className="text-[#ff6d00]">visible</span>.
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
              Founded in 2022, CargoSignal was born from a simple observation: global trade is incredibly complex, yet the tools to manage it were outdated and fragmented.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#111111] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "2022", label: "Founded" },
            { value: "250+", label: "Team Members" },
            { value: "12", label: "Global Offices" },
            { value: "120+", label: "Countries" },
          ].map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 0.1}>
              <div className="text-center p-6 rounded-xl bg-[#1a1a1a] border border-white/10">
                <div className="text-3xl font-extrabold text-[#ff6d00] mb-1">{s.value}</div>
                <div className="text-sm text-zinc-400">{s.label}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#0f0f0f] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-14">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-[#ff6d00]/30 bg-[#ff6d00]/10 text-[#ff6d00]">
                What We Stand For
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">Our Mission & Values</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Transparency", desc: "Real data, real-time, for real decisions. We believe in total visibility across every shipment.", icon: Globe2 },
              { title: "Innovation", desc: "Pushing the boundaries of what's possible with AI and supply chain intelligence.", icon: TrendingUp },
              { title: "Global Impact", desc: "Optimizing logistics for a more sustainable and efficient global economy.", icon: Ship },
            ].map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1}>
                <div className="p-8 rounded-xl bg-[#1a1a1a] border border-white/10 hover:border-[#ff6d00]/30 transition-all duration-200 h-full">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-[#ff6d00]/10">
                    <v.icon className="h-6 w-6 text-[#ff6d00]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{v.title}</h3>
                  <p className="text-zinc-400 leading-relaxed text-sm">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="py-24 bg-[#111111] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-14">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-[#ff6d00]/30 bg-[#ff6d00]/10 text-[#ff6d00]">
                Our Presence
              </div>
              <h2 className="text-3xl font-extrabold text-white">Located Worldwide</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { city: "San Francisco", region: "North America (HQ)" },
              { city: "Shanghai", region: "Asia Pacific" },
              { city: "Hamburg", region: "Europe" },
              { city: "Dubai", region: "Middle East" },
            ].map((loc, i) => (
              <AnimatedSection key={loc.city} delay={i * 0.08}>
                <div className="p-5 rounded-xl bg-[#1a1a1a] border border-white/10 flex items-center gap-4 hover:border-[#ff6d00]/30 transition-all duration-200">
                  <div className="p-2 rounded-lg bg-[#ff6d00]/10">
                    <MapPin className="h-5 w-5 text-[#ff6d00]" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{loc.city}</div>
                    <div className="text-xs text-zinc-500">{loc.region}</div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
