"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight, Globe, TrendingUp, ShieldCheck, Clock, CheckCircle2,
  Map, Zap, FileText, Anchor, Search, Ship, Truck, Plane, Package,
  BarChart3, Users2, Building2, Quote as QuoteIcon, Calendar
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section with Quick Quote Form */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-brand-primary">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full text-brand-accent text-sm font-semibold mb-6">
                <Zap className="h-4 w-4" />
                <span>Next-Gen Logistics Platform</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                Global Logistics <br />
                <span className="text-brand-accent">Solutions</span> simplified.
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-lg leading-relaxed">
                Streamline your supply chain with real-time visibility and AI-powered intelligence. From ocean freight to final mile delivery.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="h-12 px-8">Explores Services</Button>
                <Link href="/about">
                  <Button variant="outline" className="h-12 px-8 text-white border-white/20 hover:bg-white/10">About Us</Button>
                </Link>
              </div>
            </div>

            {/* Quick Quote Form */}
            <div className="bg-white rounded-card shadow-premium p-8 border border-slate-100">
              <h3 className="text-xl font-bold mb-6 text-brand-primary">Request a Quick Quote</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">Origin</label>
                    <input type="text" placeholder="City or Port" className="w-full bg-slate-50 border-none rounded-ui px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-accent outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">Destination</label>
                    <input type="text" placeholder="City or Port" className="w-full bg-slate-50 border-none rounded-ui px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-accent outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">Cargo Type</label>
                    <select className="w-full bg-slate-50 border-none rounded-ui px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-accent outline-none appearance-none">
                      <option>General</option>
                      <option>Fragile</option>
                      <option>Hazardous</option>
                    </select>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <label className="text-sm font-semibold text-slate-600">Approx. Weight (kg)</label>
                    <input type="number" placeholder="5000" className="w-full bg-slate-50 border-none rounded-ui px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-accent outline-none" />
                  </div>
                </div>
                <Button className="w-full h-12 mt-4 shadow-lg shadow-brand-accent/20">Get My Quote Now</Button>
                <p className="text-xs text-center text-slate-400 mt-4 italic">* Instant pricing estimates may vary based on final shipment details.</p>
              </form>
            </div>
          </div>
        </section>

        {/* Tracking Banner */}
        <section className="bg-white py-12 border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-6">
            <div className="relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-brand-accent transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Enter Shipment ID / Bill of Lading / Container #"
                className="w-full h-16 pl-14 pr-40 bg-slate-50 border-2 border-slate-100 rounded-full text-base focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none transition-all shadow-sm"
              />
              <div className="absolute right-2 top-2 bottom-2">
                <Button className="h-full px-8 rounded-full">Track Now</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Counter Section */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Successful Shipments", value: "50,000+", icon: Ship },
                { label: "Countries Reached", value: "150+", icon: Globe },
                { label: "Satisfied Clients", value: "2,500+", icon: Users2 },
                { label: "Global Partners", value: "850+", icon: Building2 },
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-6 bg-white rounded-card shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                  <div className="bg-slate-50 p-3 rounded-2xl mb-4 group-hover:bg-brand-accent/10 transition-colors">
                    <stat.icon className="h-6 w-6 text-brand-accent" />
                  </div>
                  <div className="text-3xl font-black text-brand-primary mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 bg-white px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-sm font-bold text-brand-accent tracking-[0.2em] uppercase mb-3">Our Core Services</h2>
              <h3 className="text-3xl md:text-5xl font-extrabold text-brand-primary mb-6">World Wide Freight Services</h3>
              <p className="text-slate-500">We provide a wide range of logistics and supply chain services designed to move your business forward.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Ocean Freight", desc: "Reliable and cost-effective sea transportation solutions for full and partial container loads.", icon: Ship },
                { title: "Air Freight", desc: "Express delivery for time-critical cargo with global reach and priority handling.", icon: Plane },
                { title: "Road Transport", desc: "Last-mile delivery and regional trucking across continents with GPS tracking.", icon: Truck },
                { title: "Warehousing", desc: "Secure, climate-controlled storage solutions with inventory management systems.", icon: Building2 },
                { title: "Customs Brokerage", desc: "Navigating complex international trade regulations to ensure smooth clearance.", icon: ShieldCheck },
                { title: "Supply Chain Consulting", desc: "Strategic optimization of your logistics network for maximum efficiency.", icon: BarChart3 },
              ].map((service, idx) => (
                <div key={idx} className="group p-8 rounded-card border border-slate-100 hover:border-brand-accent/20 hover:shadow-xl transition-all relative overflow-hidden bg-white">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-[100px] -mr-8 -mt-8 group-hover:bg-brand-accent/5 transition-colors"></div>
                  <div className="bg-slate-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-accent group-hover:text-white transition-all">
                    <service.icon className="h-7 w-7" />
                  </div>
                  <h4 className="text-xl font-bold mb-4 text-brand-primary group-hover:text-brand-accent transition-colors">{service.title}</h4>
                  <p className="text-slate-500 leading-relaxed mb-6">{service.desc}</p>
                  <Link href="/services" className="inline-flex items-center gap-2 text-sm font-bold text-brand-accent">
                    Read More <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-24 bg-slate-900 text-white px-6 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-accent/5 skew-x-12 transform translate-x-20"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-sm font-bold text-brand-accent tracking-[0.2em] uppercase mb-3">Targeted Industries</h2>
                <h3 className="text-3xl md:text-5xl font-extrabold mb-8">Specialized solutions for every sector.</h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { name: "Automotive", icon: Truck },
                    { name: "Retail & E-commerce", icon: Package },
                    { name: "Healthcare & Pharma", icon: ShieldCheck },
                    { name: "Consumer Goods", icon: Building2 },
                    { name: "Industrial Equipment", icon: Anchor },
                    { name: "Technology", icon: Zap },
                  ].map((industry, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-white/5 p-4 rounded-ui border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="bg-brand-accent/20 p-2 rounded-lg">
                        <industry.icon className="h-5 w-5 text-brand-accent" />
                      </div>
                      <span className="font-semibold text-sm">{industry.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-white shadow-2xl rounded-circle overflow-hidden relative border-8 border-white/5">
                  <div className="absolute inset-0 bg-slate-800 flex items-center justify-center text-slate-600 font-mono text-xs p-12 text-center">
                    [ Image Placeholder: High-tech logistics operations ]
                  </div>
                </div>
                {/* Floating card */}
                <div className="absolute -bottom-8 -left-8 bg-brand-accent text-white p-6 rounded-card shadow-2xl max-w-xs animate-bounce-slow">
                  <div className="text-3xl font-black mb-2">99.8%</div>
                  <p className="text-sm font-medium text-white/80">On-time delivery rate across all supported industries globally.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-24 bg-white px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="text-sm font-bold text-brand-accent tracking-[0.2em] uppercase mb-3">Our Process</h2>
              <h3 className="text-3xl md:text-5xl font-extrabold text-brand-primary">How CargoSignal Works</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connection line */}
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-1 bg-slate-100 -z-0"></div>

              {[
                { step: "01", title: "Connect Operations", desc: "Integrate your shipments via API, manual entry, or data sync with our seamless onboarding." },
                { step: "02", title: "Continuous Monitoring", desc: "Our 24/7 intelligence engine tracks every move, alert, and event across the supply chain." },
                { step: "03", title: "Actionable Insights", desc: "Receive real-time notifications and predictive analytics to optimize routes and reduce costs." },
              ].map((item, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-100 flex items-center justify-center text-3xl font-black text-brand-accent shadow-xl mb-8 group hover:border-brand-accent transition-colors">
                    {item.step}
                  </div>
                  <h4 className="text-xl font-bold mb-4 text-brand-primary">{item.title}</h4>
                  <p className="text-slate-500 leading-relaxed max-w-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-brand-accent px-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 2px, transparent 2px)", backgroundSize: "40px 40px" }}></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white mb-16">
              <QuoteIcon className="h-16 w-16 mx-auto mb-6 text-white/20" />
              <h3 className="text-3xl md:text-5xl font-extrabold mb-12">What our global partners say about CargoSignal</h3>

              <div className="relative bg-white/10 backdrop-blur-md rounded-card p-10 border border-white/20 shadow-2xl">
                <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8 italic">
                  "CargoSignal has transformed our logistics operations. We've seen a 30% reduction in demurrage costs and a significant improvement in customer satisfaction with accurate ETAs."
                </p>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 mb-4 border-2 border-white/40 overflow-hidden">
                    <div className="flex items-center justify-center h-full text-white font-bold">JD</div>
                  </div>
                  <h5 className="font-bold text-lg">James D.</h5>
                  <p className="text-white/60 text-sm">Logistics Director, Global Trade Corp</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Preview */}
        <section className="py-24 bg-white px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 text-center md:text-left">
              <div>
                <h2 className="text-sm font-bold text-brand-accent tracking-[0.2em] uppercase mb-3">Latest Updates</h2>
                <h3 className="text-3xl md:text-5xl font-extrabold text-brand-primary">Corporate Logbook</h3>
              </div>
              <Link href="/blog">
                <Button variant="outline" className="border-slate-200">View All Articles</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "The Future of Smart Supply Chains in 2026", date: "Mar 15, 2026", category: "Technology", img: "📡" },
                { title: "Reducing Ocean Freight Costs with Predictive ETA", date: "Mar 11, 2026", category: "Insights", img: "⛴️" },
                { title: "Navigating Global Port Congestion Patterns", date: "Mar 05, 2026", category: "Strategy", img: "🏗️" },
              ].map((post, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="aspect-[16/10] bg-slate-50 rounded-card mb-6 overflow-hidden relative flex items-center justify-center text-6xl group-hover:scale-[1.02] transition-transform">
                    {post.img}
                    <div className="absolute top-4 left-4">
                      <span className="bg-brand-accent text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{post.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 text-sm mb-3">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <h4 className="text-xl font-bold text-brand-primary group-hover:text-brand-accent transition-colors mb-3">{post.title}</h4>
                  <p className="text-slate-500 line-clamp-2 text-sm">Discover how new technologies are reshaping the way we think about global trade and logistics operations...</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-brand-primary text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(#fff 2px, transparent 2px)", backgroundSize: "30px 30px" }}></div>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-8">Ready to grow your business with CargoSignal?</h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Join 2,500+ companies who trust CargoSignal for their global logistics needs. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="h-14 px-10 text-lg shadow-xl shadow-brand-accent/20">Sign Up Now !</Button>
              <Button variant="outline" className="h-14 px-10 text-lg text-white border-white/20 hover:bg-white/10">Talk to Support</Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

