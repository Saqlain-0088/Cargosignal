"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Ship, Plane, Truck, Package, MapPin, Calendar, Weight, ChevronRight, Info } from "lucide-react";

export default function QuotePage() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Navbar />

            <main className="flex-1 pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* Left Column: Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-card shadow-premium p-8 md:p-12 border border-slate-100">
                                <h1 className="text-3xl md:text-4xl font-extrabold text-brand-primary mb-2">Request a <span className="text-brand-accent">Quote</span></h1>
                                <p className="text-slate-500 mb-10">Fill out the form below and our logistics experts will get back to you with a custom quote within 24 hours.</p>

                                <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                                    {/* Shipment Mode */}
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-3">
                                            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px]">01</span>
                                            Shipment Mode
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {[
                                                { name: "Ocean", icon: Ship },
                                                { name: "Air", icon: Plane },
                                                { name: "Road", icon: Truck },
                                                { name: "Express", icon: Package },
                                            ].map((mode) => (
                                                <label key={mode.name} className="relative group cursor-pointer">
                                                    <input type="radio" name="mode" className="peer hidden" />
                                                    <div className="flex flex-col items-center p-4 rounded-xl border-2 border-slate-50 bg-slate-50 peer-checked:border-brand-accent peer-checked:bg-brand-accent/5 peer-checked:text-brand-accent transition-all group-hover:border-slate-200">
                                                        <mode.icon className="h-6 w-6 mb-2" />
                                                        <span className="text-sm font-bold">{mode.name}</span>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Route Details */}
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-3">
                                            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px]">02</span>
                                            Route Details
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-600">Origin City/Port</label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                                    <input type="text" placeholder="e.g. Shanghai, China" className="w-full h-12 pl-12 pr-4 bg-slate-50 border-none rounded-ui outline-none focus:ring-2 focus:ring-brand-accent/10" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-600">Destination City/Port</label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                                    <input type="text" placeholder="e.g. Hamburg, Germany" className="w-full h-12 pl-12 pr-4 bg-slate-50 border-none rounded-ui outline-none focus:ring-2 focus:ring-brand-accent/10" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Cargo Details */}
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-3">
                                            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px]">03</span>
                                            Cargo Details
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-600">Weight (kg)</label>
                                                <div className="relative">
                                                    <Weight className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                                    <input type="number" placeholder="5000" className="w-full h-12 pl-12 pr-4 bg-slate-50 border-none rounded-ui outline-none focus:ring-2 focus:ring-brand-accent/10" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-600">Dimensions (cm)</label>
                                                <input type="text" placeholder="LxWxH" className="w-full h-12 px-4 bg-slate-50 border-none rounded-ui outline-none focus:ring-2 focus:ring-brand-accent/10" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-600">Ship Date</label>
                                                <div className="relative">
                                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                                    <input type="date" className="w-full h-12 pl-12 pr-4 bg-slate-50 border-none rounded-ui outline-none focus:ring-2 focus:ring-brand-accent/10" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Button className="w-full h-14 text-lg shadow-xl shadow-brand-accent/20">
                                        Submit Quote Request <ChevronRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </form>
                            </div>
                        </div>

                        {/* Right Column: Info & Help */}
                        <div className="space-y-8">
                            <div className="bg-brand-primary rounded-card p-8 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none"></div>
                                <h4 className="text-xl font-bold mb-4 relative z-10">Why CargoSignal?</h4>
                                <ul className="space-y-4 relative z-10">
                                    {[
                                        "Instant pricing on common routes",
                                        "Best-in-class logistics carriers",
                                        "24/7 dedicated support team",
                                        "End-to-end visibility included"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                                            <div className="mt-1 bg-brand-accent p-0.5 rounded-full">
                                                <ChevronRight className="h-3 w-3 text-white" />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white rounded-card p-8 border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="bg-slate-50 p-3 rounded-lg text-brand-accent">
                                        <Info className="h-6 w-6" />
                                    </div>
                                    <div className="font-bold text-brand-primary">Need Help?</div>
                                </div>
                                <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                                    Have questions about labels, documentation, or international regulations? Our support team is here to assist you.
                                </p>
                                <Link href="/contact" className="text-sm font-bold text-brand-accent hover:underline">
                                    Contact Specialist →
                                </Link>
                            </div>

                            <div className="aspect-[4/5] bg-slate-100 rounded-card flex items-center justify-center text-slate-400 text-xs text-center p-10 font-mono italic">
                                [ Image Placeholder: Customer Support Specialist ]
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
