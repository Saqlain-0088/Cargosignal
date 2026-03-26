"use client";

import MarketingLayout from "@/components/layout/MarketingLayout";
import { Button } from "@/components/ui/Button";
import { Ship, Plane, Truck, Building2, ShieldCheck, BarChart3, Check } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/marketing/AnimatedSection";

const services = [
  { title: "Ocean Freight", icon: Ship, desc: "Reliable sea transportation for FCL and LCL shipments worldwide.", features: ["FCL & LCL", "Port-to-Port", "Door-to-Door", "Customs Clearance"] },
  { title: "Air Freight", icon: Plane, desc: "Express delivery for time-critical cargo with global reach.", features: ["Express Shipping", "Charter Services", "Global Network", "Priority Handling"] },
  { title: "Road Transport", icon: Truck, desc: "Flexible trucking solutions for regional and continental deliveries.", features: ["Last-Mile Delivery", "FTL & LTL", "GPS Tracking", "Flexible Scheduling"] },
  { title: "Warehousing", icon: Building2, desc: "Secure, modern facilities with advanced inventory management.", features: ["Climate Controlled", "Inventory Mgmt", "Distribution", "Order Fulfillment"] },
  { title: "Customs Brokerage", icon: ShieldCheck, desc: "Expert assistance navigating international trade regulations.", features: ["Compliance Docs", "Duty Management", "HS Classification", "Entry Filing"] },
  { title: "Supply Chain Consulting", icon: BarChart3, desc: "Strategic optimization to reduce costs and improve efficiency.", features: ["Network Design", "Process Optimization", "Cost Analysis", "Visibility Strategy"] },
];

export default function ServicesPage() {
  return (
    <MarketingLayout>
      {/* Banner */}
      <section className="py-20 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-[#ff6d00]/30 bg-[#ff6d00]/10 text-[#ff6d00]">Our Services</div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Comprehensive <span className="text-[#ff6d00]">Logistics Solutions</span></h1>
              <p className="text-zinc-400 max-w-2xl mx-auto">Tailored for the modern supply chain. We move your business forward with precision and intelligence.</p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.08}>
                <div className="rounded-xl p-8 bg-[#1a1a1a] border border-white/10 hover:border-[#ff6d00] transition-all duration-200 group h-full flex flex-col">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-[#ff6d00]/10 group-hover:bg-[#ff6d00] transition-colors duration-200">
                    <s.icon className="h-7 w-7 text-[#ff6d00] group-hover:text-white transition-colors duration-200" />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#ff6d00] transition-colors duration-200">{s.title}</h2>
                  <p className="text-zinc-400 text-sm mb-6 leading-relaxed flex-1">{s.desc}</p>
                  <div className="space-y-2 mb-6">
                    {s.features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-[#ff6d00]/10 flex items-center justify-center shrink-0"><Check className="h-2.5 w-2.5 text-[#ff6d00]" /></div>
                        <span className="text-xs text-zinc-400">{f}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="dark-outline" className="w-full">Learn More</Button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#111111] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="rounded-xl p-10 bg-[#ff6d00]/10 border border-[#ff6d00]/30 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Don't know which service to choose?</h3>
                <p className="text-zinc-400">Our logistics experts are ready to help you find the best solution.</p>
              </div>
              <div className="flex gap-4 shrink-0">
                <Link href="/contact"><Button variant="dark-outline">Talk to Support</Button></Link>
                <Link href="/quote"><Button variant="accent">Get a Quote</Button></Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </MarketingLayout>
  );
}
