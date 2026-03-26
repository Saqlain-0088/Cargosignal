"use client";

import MarketingLayout from "@/components/layout/MarketingLayout";
import { Button } from "@/components/ui/Button";
import { Ship, Plane, Truck, Package, MapPin, Calendar, Weight, ChevronRight } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/marketing/AnimatedSection";

export default function QuotePage() {
  return (
    <MarketingLayout>
      <section className="py-16 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <div className="bg-[#1a1a1a] rounded-xl border border-white/10 p-8 md:p-10">
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-[#ff6d00]/30 bg-[#ff6d00]/10 text-[#ff6d00]">Get a Quote</div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Request a <span className="text-[#ff6d00]">Quote</span></h1>
                  <p className="text-zinc-400 mb-8 text-sm">Fill out the form and our logistics experts will respond within 24 hours.</p>

                  <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                    {/* Mode */}
                    <div>
                      <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">01 — Shipment Mode</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[{ name: "Ocean", icon: Ship }, { name: "Air", icon: Plane }, { name: "Road", icon: Truck }, { name: "Express", icon: Package }].map((mode) => (
                          <label key={mode.name} className="relative cursor-pointer group">
                            <input type="radio" name="mode" className="peer hidden" />
                            <div className="flex flex-col items-center p-4 rounded-xl border border-white/10 bg-[#0f0f0f] peer-checked:border-[#ff6d00] peer-checked:bg-[#ff6d00]/10 peer-checked:text-[#ff6d00] text-zinc-400 transition-all group-hover:border-white/30">
                              <mode.icon className="h-5 w-5 mb-2" />
                              <span className="text-xs font-bold">{mode.name}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Route */}
                    <div>
                      <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">02 — Route Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {["Origin City/Port", "Destination City/Port"].map((label) => (
                          <div key={label}>
                            <label className="block text-xs font-medium text-zinc-400 mb-1.5">{label}</label>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                              <input type="text" placeholder="e.g. Shanghai, China" className="w-full h-11 pl-10 pr-4 rounded-lg text-sm text-white placeholder:text-zinc-600 bg-[#0f0f0f] border border-white/10 outline-none focus:ring-1 focus:ring-[#ff6d00]" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Cargo */}
                    <div>
                      <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">03 — Cargo Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-zinc-400 mb-1.5">Weight (kg)</label>
                          <div className="relative">
                            <Weight className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                            <input type="number" placeholder="5000" className="w-full h-11 pl-10 pr-4 rounded-lg text-sm text-white placeholder:text-zinc-600 bg-[#0f0f0f] border border-white/10 outline-none focus:ring-1 focus:ring-[#ff6d00]" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-zinc-400 mb-1.5">Dimensions (cm)</label>
                          <input type="text" placeholder="LxWxH" className="w-full h-11 px-4 rounded-lg text-sm text-white placeholder:text-zinc-600 bg-[#0f0f0f] border border-white/10 outline-none focus:ring-1 focus:ring-[#ff6d00]" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-zinc-400 mb-1.5">Ship Date</label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                            <input type="date" className="w-full h-11 pl-10 pr-4 rounded-lg text-sm text-white bg-[#0f0f0f] border border-white/10 outline-none focus:ring-1 focus:ring-[#ff6d00]" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button variant="accent" className="w-full gap-2 h-12 text-base">
                      Submit Quote Request <ChevronRight className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <AnimatedSection delay={0.15}>
                <div className="bg-[#1a1a1a] rounded-xl border border-white/10 p-6">
                  <h4 className="text-lg font-bold text-white mb-4">Why CargoSignal?</h4>
                  <ul className="space-y-3">
                    {["Instant pricing on common routes", "Best-in-class logistics carriers", "24/7 dedicated support team", "End-to-end visibility included"].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-zinc-400">
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-[#ff6d00]/10 flex items-center justify-center shrink-0">
                          <ChevronRight className="h-3 w-3 text-[#ff6d00]" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#1a1a1a] rounded-xl border border-white/10 p-6 mt-6">
                  <h4 className="font-bold text-white mb-3">Need Help?</h4>
                  <p className="text-sm text-zinc-400 mb-4 leading-relaxed">Have questions about documentation or regulations? Our support team is here.</p>
                  <Link href="/contact" className="text-sm font-bold text-[#ff6d00] hover:underline">Contact Specialist →</Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
