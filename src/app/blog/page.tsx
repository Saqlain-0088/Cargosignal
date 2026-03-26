"use client";

import MarketingLayout from "@/components/layout/MarketingLayout";
import { Button } from "@/components/ui/Button";
import { Calendar, User, ArrowRight, Search, Tag, ChevronRight } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/marketing/AnimatedSection";

const posts = [
  { title: "The Future of Smart Supply Chains in 2026", date: "Mar 15, 2026", author: "Elena Rodriguez", category: "Technology", img: "📡", description: "Discover how AI and IoT are fundamentally changing the way we track and manage ocean freight globally." },
  { title: "Reducing Ocean Freight Costs with Predictive ETA", date: "Mar 11, 2026", author: "Mark Sinclair", category: "Insights", img: "⛴️", description: "Learn how accurate arrival predictions can save your business thousands in demurrage and detention fees." },
  { title: "Navigating Global Port Congestion Patterns", date: "Mar 05, 2026", author: "Sarah Jenkins", category: "Strategy", img: "🏗️", description: "Our analysis of the top 50 ports shows where delays are likely to happen and how to avoid them." },
  { title: "Sustainable Logistics: Green Shipping Initiatives", date: "Feb 28, 2026", author: "David Chen", category: "Environment", img: "🌿", description: "How new fuel regulations and route optimization are helping shippers reduce their carbon footprint." },
  { title: "Understanding Incoterms 2020 for New Shippers", date: "Feb 20, 2026", author: "Elena Rodriguez", category: "Education", img: "📚", description: "A comprehensive guide to the essential terms of international commerce for any growing business." },
  { title: "Air Freight vs. Ocean Freight: A Cost-Benefit Analysis", date: "Feb 15, 2026", author: "Mark Sinclair", category: "Insights", img: "✈️", description: "Data-driven insights to help you decide which transit mode makes the most sense for your cargo." },
];

export default function BlogPage() {
  return (
    <MarketingLayout>
      <section className="py-16 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-[#ff6d00]/30 bg-[#ff6d00]/10 text-[#ff6d00]">Blog</div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Corporate <span className="text-[#ff6d00]">Logbook</span></h1>
              <p className="text-zinc-400">The latest news, insights, and expert advice from the world of global trade.</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Posts */}
            <div className="lg:col-span-2 space-y-6">
              {posts.map((post, i) => (
                <AnimatedSection key={i} delay={i * 0.06}>
                  <div className="group flex flex-col md:flex-row gap-6 bg-[#1a1a1a] p-6 rounded-xl border border-white/10 hover:border-[#ff6d00]/30 transition-all duration-200">
                    <div className="md:w-48 aspect-[4/3] bg-[#0f0f0f] rounded-xl shrink-0 flex items-center justify-center text-4xl relative overflow-hidden">
                      {post.img}
                      <div className="absolute top-2 left-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase text-white bg-[#ff6d00]">{post.category}</span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-4 text-xs text-zinc-500 mb-3">
                        <div className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</div>
                        <div className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</div>
                      </div>
                      <h2 className="text-lg font-bold text-white mb-2 group-hover:text-[#ff6d00] transition-colors duration-200 leading-snug">{post.title}</h2>
                      <p className="text-zinc-400 text-sm mb-4 line-clamp-2 leading-relaxed">{post.description}</p>
                      <Link href="/blog/detail" className="inline-flex items-center gap-1 text-sm font-bold text-[#ff6d00]">
                        Read More <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
              <div className="flex justify-center gap-2 pt-4">
                {[1, 2, 3].map((n) => (
                  <button key={n} className="w-9 h-9 rounded-full border border-white/10 bg-[#1a1a1a] text-zinc-400 hover:bg-[#ff6d00] hover:text-white hover:border-[#ff6d00] transition-all text-sm font-bold">{n}</button>
                ))}
                <button className="w-9 h-9 rounded-full border border-white/10 bg-[#1a1a1a] text-zinc-400 hover:bg-[#ff6d00] hover:text-white hover:border-[#ff6d00] transition-all flex items-center justify-center">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-[#1a1a1a] p-6 rounded-xl border border-white/10">
                <h4 className="font-bold text-white mb-4">Search Blog</h4>
                <div className="relative">
                  <input type="text" placeholder="Keywords..." className="w-full h-11 pl-4 pr-10 rounded-lg text-sm text-white placeholder:text-zinc-600 bg-[#0f0f0f] border border-white/10 outline-none focus:ring-1 focus:ring-[#ff6d00]" />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-[#ff6d00]"><Search className="h-4 w-4" /></button>
                </div>
              </div>

              <div className="bg-[#1a1a1a] p-6 rounded-xl border border-white/10">
                <h4 className="font-bold text-white mb-4">Categories</h4>
                <div className="space-y-3">
                  {["Technology", "Insights", "Industry Trends", "Logistics Tips", "Company News", "Environmental"].map((cat) => (
                    <div key={cat} className="flex justify-between items-center group cursor-pointer">
                      <div className="flex items-center gap-2 text-sm text-zinc-400 group-hover:text-[#ff6d00] transition-colors">
                        <Tag className="h-3.5 w-3.5" />{cat}
                      </div>
                      <span className="text-[10px] font-bold bg-white/5 text-zinc-500 px-2 py-0.5 rounded-full">(12)</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#ff6d00]/10 border border-[#ff6d00]/30 p-6 rounded-xl">
                <h4 className="text-lg font-bold text-white mb-3">Stay Updated</h4>
                <p className="text-sm text-zinc-400 mb-4">Join 10,000+ industry pros receiving our weekly logistics digest.</p>
                <div className="space-y-3">
                  <input type="email" placeholder="Email address" className="w-full h-10 px-4 rounded-lg text-sm text-white placeholder:text-zinc-600 bg-[#0f0f0f] border border-white/10 outline-none focus:ring-1 focus:ring-[#ff6d00]" />
                  <Button variant="accent" className="w-full">Subscribe Now</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
