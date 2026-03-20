"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Calendar, User, ArrowRight, Search, Tag, ChevronRight } from "lucide-react";
import Link from "next/link";

const posts = [
    {
        title: "The Future of Smart Supply Chains in 2026",
        date: "Mar 15, 2026",
        author: "Elena Rodriguez",
        category: "Technology",
        img: "📡",
        description: "Discover how AI and IoT are fundamentally changing the way we track and manage ocean freight globally."
    },
    {
        title: "Reducing Ocean Freight Costs with Predictive ETA",
        date: "Mar 11, 2026",
        author: "Mark Sinclair",
        category: "Insights",
        img: "⛴️",
        description: "Learn how accurate arrival predictions can save your business thousands in demurrage and detention fees."
    },
    {
        title: "Navigating Global Port Congestion Patterns",
        date: "Mar 05, 2026",
        author: "Sarah Jenkins",
        category: "Strategy",
        img: "🏗️",
        description: "Our analysis of the top 50 ports shows where delays are likely to happen and how to avoid them."
    },
    {
        title: "Sustainable Logistics: Green Shipping Initiatives",
        date: "Feb 28, 2026",
        author: "David Chen",
        category: "Environment",
        img: "🌿",
        description: "How new fuel regulations and route optimization are helping shippers reduce their carbon footprint."
    },
    {
        title: "Understanding Incoterms 2020 for New Shippers",
        date: "Feb 20, 2026",
        author: "Elena Rodriguez",
        category: "Education",
        img: "📚",
        description: "A comprehensive guide to the essential terms of international commerce for any growing business."
    },
    {
        title: "Air Freight vs. Ocean Freight: A Cost-Benefit Analysis",
        date: "Feb 15, 2026",
        author: "Mark Sinclair",
        category: "Insights",
        img: "✈️",
        description: "Data-driven insights to help you decide which transit mode makes the most sense for your cargo."
    },
];

export default function BlogPage() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Navbar />

            <main className="flex-1 pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-brand-primary mb-6">Corporate <span className="text-brand-accent">Logbook</span></h1>
                        <p className="text-lg text-slate-500">The latest news, insights, and expert advice from the world of global trade and logistics technology.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* Posts Listing */}
                        <div className="lg:col-span-2 space-y-12">
                            {posts.map((post, i) => (
                                <div key={i} className="group overflow-hidden flex flex-col md:flex-row gap-8 bg-white p-6 rounded-card border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                                    <div className="aspect-[4/3] md:w-64 bg-slate-50 rounded-xl shrink-0 flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-500 relative">
                                        {post.img}
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-brand-accent text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{post.category}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-3 uppercase tracking-widest">
                                            <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {post.date}</div>
                                            <div className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {post.author}</div>
                                        </div>
                                        <h2 className="text-2xl font-bold text-brand-primary mb-4 group-hover:text-brand-accent transition-colors leading-tight">
                                            {post.title}
                                        </h2>
                                        <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-2">
                                            {post.description}
                                        </p>
                                        <Link href="/blog/detail" className="inline-flex items-center gap-2 text-sm font-bold text-brand-accent">
                                            Read Full Article <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            ))}

                            {/* Pagination */}
                            <div className="flex justify-center gap-2 pt-8">
                                <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center bg-white text-brand-primary disabled:opacity-30" disabled>1</button>
                                <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center bg-white hover:bg-brand-accent hover:text-white transition-colors">2</button>
                                <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center bg-white hover:bg-brand-accent hover:text-white transition-colors">3</button>
                                <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center bg-white hover:bg-brand-accent hover:text-white transition-colors"><ChevronRight className="h-4 w-4" /></button>
                            </div>
                        </div>

                        {/* Sidebar Widgets */}
                        <div className="space-y-10">
                            {/* Search */}
                            <div className="bg-white p-8 rounded-card border border-slate-100 shadow-sm">
                                <h4 className="font-bold text-brand-primary mb-6">Search Blog</h4>
                                <div className="relative">
                                    <input type="text" placeholder="Keywords..." className="w-full h-12 pl-4 pr-12 bg-slate-50 border-none rounded-ui outline-none focus:ring-2 focus:ring-brand-accent/10" />
                                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-accent">
                                        <Search className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="bg-white p-8 rounded-card border border-slate-100 shadow-sm">
                                <h4 className="font-bold text-brand-primary mb-6">Categories</h4>
                                <div className="space-y-4">
                                    {["Technology", "Insights", "Industry Trends", "Logistics Tips", "Company News", "Environmental"].map((cat) => (
                                        <div key={cat} className="flex justify-between items-center group cursor-pointer">
                                            <div className="flex items-center gap-2 text-sm text-slate-500 group-hover:text-brand-accent transition-colors">
                                                <Tag className="h-3.5 w-3.5 text-slate-300 group-hover:text-brand-accent" />
                                                {cat}
                                            </div>
                                            <span className="text-[10px] font-bold bg-slate-50 text-slate-400 px-2 py-0.5 rounded-full">(12)</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Newsletter Card */}
                            <div className="bg-brand-accent p-8 rounded-card text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full pointer-events-none"></div>
                                <h4 className="text-xl font-bold mb-4 relative z-10">Stay Updated</h4>
                                <p className="text-sm text-white/80 mb-6 relative z-10">Join 10,000+ industry pros receiving our weekly logistics digest.</p>
                                <div className="space-y-3 relative z-10">
                                    <input type="email" placeholder="Email address" className="w-full h-11 px-4 bg-white/10 border border-white/20 rounded-ui outline-none placeholder:text-white/40 text-sm focus:ring-2 focus:ring-white/20" />
                                    <Button className="w-full bg-white text-brand-accent hover:bg-slate-50 shadow-lg">Subscribe Now</Button>
                                </div>
                            </div>

                            {/* Promo Image */}
                            <div className="aspect-[4/5] bg-slate-100 rounded-card flex items-center justify-center text-slate-400 text-xs text-center p-10 font-mono italic">
                                [ Image Placeholder: Download our 2026 Logistics Report ]
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
