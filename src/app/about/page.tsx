"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Globe, Users, TrendingUp, Award, Globe2, Ship, MapPin } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Navbar />

            <main className="flex-1 pt-32 pb-24">
                {/* Story Section */}
                <section className="max-w-7xl mx-auto px-6 mb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-sm font-bold text-brand-accent tracking-[0.2em] uppercase mb-3">Our Core Story</h2>
                            <h1 className="text-4xl md:text-6xl font-extrabold text-brand-primary mb-8 leading-tight">
                                Making the world's supply chains <span className="text-brand-accent">visible</span>.
                            </h1>
                            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                                Founded in 2022, CargoSignal was born from a simple observation: global trade is incredibly complex, yet the tools to manage it were outdated and fragmented.
                            </p>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                We set out to build a platform that combines real-time data from carriers, ports, and IoT sensors with advanced AI to give shippers total control over their logistics operations.
                            </p>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <div className="text-3xl font-black text-brand-primary">250+</div>
                                    <div className="text-sm text-slate-500 font-medium">Logistics Experts</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-black text-brand-primary">12</div>
                                    <div className="text-sm text-slate-500 font-medium">Global Offices</div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square bg-white rounded-card shadow-2xl overflow-hidden border-8 border-white p-1 flex items-center justify-center text-slate-400 font-mono italic p-20 text-center">
                                [ Image Placeholder: CargoSignal Founders & Team ]
                            </div>
                            <div className="absolute -bottom-8 -right-8 bg-brand-primary text-white p-8 rounded-card shadow-2xl max-w-xs">
                                <Award className="h-10 w-10 text-brand-accent mb-4" />
                                <h4 className="font-bold text-lg mb-2">Award Winning</h4>
                                <p className="text-sm text-slate-400">Recognized as the most innovative logistics SaaS platform of 2025.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="bg-brand-primary py-24 text-white overflow-hidden relative">
                    <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(#fff 2px, transparent 2px)", backgroundSize: "40px 40px" }}></div>
                    <div className="max-w-7xl mx-auto px-6 relative z-10 text-center mb-16">
                        <h2 className="text-sm font-bold text-brand-accent tracking-[0.2em] uppercase mb-3">What We Stand For</h2>
                        <h3 className="text-3xl md:text-5xl font-extrabold">Our Mission & Values</h3>
                    </div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Transparency", desc: "We believe in total visibility. Real data, real-time, for real decisions.", icon: Globe2 },
                                { title: "Innovation", desc: "Pushing the boundaries of what's possible with AI and supply chain visibility.", icon: TrendingUp },
                                { title: "Global Impact", desc: "Optimizing logistics for a more sustainable and efficient global economy.", icon: Ship },
                            ].map((value, idx) => (
                                <div key={idx} className="bg-white/5 border border-white/10 p-10 rounded-card hover:bg-white/10 transition-colors">
                                    <div className="bg-brand-accent w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                                        <value.icon className="h-6 w-6" />
                                    </div>
                                    <h4 className="text-xl font-bold mb-4">{value.title}</h4>
                                    <p className="text-slate-400 leading-relaxed">{value.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Location / Presence */}
                <section className="py-24 px-6 max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold text-brand-accent tracking-[0.2em] uppercase mb-3">Our Presence</h2>
                        <h3 className="text-3xl md:text-5xl font-extrabold text-brand-primary">Located Worldwide</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { city: "San Francisco", region: "North America (HQ)", icon: MapPin },
                            { city: "Shanghai", region: "Asia Pacific", icon: MapPin },
                            { city: "Hamburg", region: "Europe", icon: MapPin },
                            { city: "Dubai", region: "Middle East", icon: MapPin },
                        ].map((loc, i) => (
                            <div key={i} className="bg-white p-6 rounded-card border border-slate-100 shadow-sm flex items-center gap-4">
                                <div className="bg-slate-50 p-2 rounded-lg text-brand-accent">
                                    <loc.icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="font-bold text-brand-primary">{loc.city}</div>
                                    <div className="text-xs text-slate-500">{loc.region}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
