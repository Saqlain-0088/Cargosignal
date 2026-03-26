"use client";

import { ArrowRight, Quote as QuoteIcon, Calendar } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

import HeroSection from "@/components/marketing/HeroSection";
import StatsSection from "@/components/marketing/StatsSection";
import FeaturesSection from "@/components/marketing/FeaturesSection";
import WorkflowSection from "@/components/marketing/WorkflowSection";
import IndustriesSection from "@/components/marketing/IndustriesSection";
import CTASection from "@/components/marketing/CTASection";
import AnimatedSection from "@/components/marketing/AnimatedSection";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#1c1c1e] text-white">
      <Navbar />
      <main className="flex-1">

        <HeroSection />

        <StatsSection />
        <FeaturesSection />
        <IndustriesSection />

        {/* Process Steps */}
        <section className="py-24 bg-[#212124] border-t border-white/[0.14]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-[#ff6d00]/30 bg-[#ff6d00]/10 text-[#ff6d00]">Our Process</div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white">How CargoSignal Works</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
              <div className="hidden md:block absolute top-10 left-[18%] right-[18%] h-px bg-white/[0.14]" />
              {[
                { step: "01", title: "Connect Operations", desc: "Integrate your shipments via API, manual entry, or data sync with our seamless onboarding." },
                { step: "02", title: "Continuous Monitoring", desc: "Our 24/7 intelligence engine tracks every move, alert, and event across the supply chain." },
                { step: "03", title: "Actionable Insights", desc: "Receive real-time notifications and predictive analytics to optimize routes and reduce costs." },
              ].map((item) => (
                <div key={item.step} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black mb-6 border-2 border-[#ff6d00]/40 bg-[#1c1c1e] text-[#ff6d00]">{item.step}</div>
                  <h4 className="text-lg font-bold mb-3 text-white">{item.title}</h4>
                  <p className="text-sm leading-relaxed max-w-xs text-zinc-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-24 bg-[#1c1c1e] border-t border-white/[0.14]">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <QuoteIcon className="h-12 w-12 mx-auto mb-6 text-[#ff6d00]/30" />
            <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8 italic text-white">
              "CargoSignal has transformed our logistics operations. We've seen a 30% reduction in demurrage costs and a significant improvement in customer satisfaction with accurate ETAs."
            </blockquote>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-white mb-3 bg-[#ff6d00]/20">JD</div>
              <p className="font-bold text-white">James D.</p>
              <p className="text-sm text-zinc-400">Logistics Director, Global Trade Corp</p>
            </div>
          </div>
        </section>

        {/* Blog Preview */}
        <section className="py-24 bg-[#212124] border-t border-white/[0.14]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 border border-[#ff6d00]/30 bg-[#ff6d00]/10 text-[#ff6d00]">Latest Updates</div>
                <h3 className="text-3xl font-extrabold text-white">Corporate Logbook</h3>
              </div>
              <Link href="/blog"><Button variant="dark-outline">View All Articles</Button></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "The Future of Smart Supply Chains in 2026", date: "Mar 15, 2026", category: "Technology", emoji: "📡" },
                { title: "Reducing Ocean Freight Costs with Predictive ETA", date: "Mar 11, 2026", category: "Insights", emoji: "⛴️" },
                { title: "Navigating Global Port Congestion Patterns", date: "Mar 05, 2026", category: "Strategy", emoji: "🏗️" },
              ].map((post) => (
                <div key={post.title} className="group cursor-pointer rounded-xl overflow-hidden border border-white/[0.14] bg-[#1c1c1e] hover:border-[#ff6d00]/30 transition-all duration-200">
                  <div className="aspect-[16/9] flex items-center justify-center text-5xl relative bg-[#252528]">
                    {post.emoji}
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider text-white bg-[#ff6d00]">{post.category}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs mb-3 text-zinc-500">
                      <Calendar className="h-3.5 w-3.5" /><span>{post.date}</span>
                    </div>
                    <h4 className="font-bold text-white mb-2 group-hover:text-[#ff6d00] transition-colors duration-200 leading-snug">{post.title}</h4>
                    <p className="text-xs leading-relaxed line-clamp-2 text-zinc-400">Discover how new technologies are reshaping the way we think about global trade and logistics operations...</p>
                    <div className="inline-flex items-center gap-1 mt-4 text-xs font-semibold text-[#ff6d00]">Read More <ArrowRight className="h-3 w-3" /></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
