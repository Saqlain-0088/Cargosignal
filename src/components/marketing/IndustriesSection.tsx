"use client";

import { Cpu, Leaf, Pill, Car, ShoppingCart, Fuel, Anchor, Package } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const industries = [
  { name: "Technology", icon: Cpu },
  { name: "Agriculture", icon: Leaf },
  { name: "Pharmaceuticals", icon: Pill },
  { name: "Automotive", icon: Car },
  { name: "Retail & E-Commerce", icon: ShoppingCart },
  { name: "Energy & Resources", icon: Fuel },
  { name: "Maritime", icon: Anchor },
  { name: "Consumer Goods", icon: Package },
];

export default function IndustriesSection() {
  return (
    <section id="industries" className="py-24 bg-[#212124] border-t border-white/[0.14]">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-14">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-[#ff6d00]/30 bg-[#ff6d00]/10 text-[#ff6d00]">
              Industries We Serve
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Built for every sector
            </h2>
            <p className="text-lg max-w-xl mx-auto text-zinc-400">
              CargoSignal adapts to the unique logistics demands of your industry.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {industries.map((industry, i) => (
            <AnimatedSection key={industry.name} delay={i * 0.06}>
              <div className="rounded-xl p-4 border border-white/[0.14] bg-[#252528] flex flex-col items-center gap-3 cursor-default transition-all duration-200 hover:bg-[#333337] hover:border-[#ff6d00]/30 group">
                <div className="p-3 rounded-xl bg-[#ff6d00]/10 group-hover:bg-[#ff6d00]/20 transition-colors duration-200">
                  <industry.icon className="h-5 w-5 text-[#ff6d00]" />
                </div>
                <span className="text-xs font-medium text-white text-center leading-tight">
                  {industry.name}
                </span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
