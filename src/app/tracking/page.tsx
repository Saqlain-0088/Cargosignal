"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Search, Ship, MapPin, Calendar, Clock, CheckCircle2, Package, Globe, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TrackingPage() {
    const [trackingId, setTrackingId] = useState("");
    const [showStatus, setShowStatus] = useState(false);

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        if (trackingId.trim()) {
            setShowStatus(true);
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Navbar />

            <main className="flex-1 pt-32 pb-24">
                {/* Header Section */}
                <div className="max-w-4xl mx-auto px-6 text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-brand-primary mb-6">Track Your <span className="text-brand-accent">Shipment</span></h1>
                    <p className="text-lg text-slate-500 mb-10">
                        Get real-time updates on your cargo's journey. Enter your Tracking ID, Bill of Lading, or Container Number.
                    </p>

                    <form onSubmit={handleTrack} className="relative group max-w-2xl mx-auto">
                        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-brand-accent transition-colors" />
                        </div>
                        <input
                            type="text"
                            value={trackingId}
                            onChange={(e) => setTrackingId(e.target.value)}
                            placeholder="Example: CS-12345678"
                            className="w-full h-16 pl-14 pr-44 bg-white border-2 border-slate-100 rounded-full text-base focus:ring-4 focus:ring-brand-accent/10 focus:border-brand-accent outline-none transition-all shadow-sm"
                        />
                        <div className="absolute right-2 top-2 bottom-2">
                            <Button type="submit" className="h-full px-10 rounded-full">Track Now</Button>
                        </div>
                    </form>
                </div>

                {showStatus ? (
                    <div className="max-w-5xl mx-auto px-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
                        <div className="bg-white rounded-card shadow-premium border border-slate-100 overflow-hidden">
                            {/* Status Summary Banner */}
                            <div className="bg-slate-900 text-white p-8 flex flex-col md:flex-row justify-between items-center gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="bg-brand-accent p-3 rounded-full">
                                        <Ship className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Current Status</div>
                                        <div className="text-2xl font-bold">In Transit (Offshore)</div>
                                    </div>
                                </div>
                                <div className="text-center md:text-right">
                                    <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Estimated Arrival</div>
                                    <div className="text-2xl font-bold text-brand-accent">Mar 25, 2026</div>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-slate-100">
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Shipment ID</div>
                                    <div className="font-bold text-brand-primary">{trackingId}</div>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Vessel Name</div>
                                    <div className="font-bold text-brand-primary">MAERSK HOUSTON</div>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Origin</div>
                                    <div className="font-bold text-brand-primary">SHANGHAI, CN</div>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Destination</div>
                                    <div className="font-bold text-brand-primary">LONG BEACH, US</div>
                                </div>
                            </div>

                            {/* Tracking Timeline */}
                            <div className="p-10">
                                <h3 className="text-lg font-bold text-brand-primary mb-10">Tracking History</h3>
                                <div className="space-y-0 relative">
                                    {/* Vertical line linking steps */}
                                    <div className="absolute left-4 top-1 bottom-1 w-0.5 bg-slate-100 -z-0"></div>

                                    {[
                                        { status: "In Transit", location: "Pacific Ocean", date: "Mar 20, 2026", time: "09:45 AM", completed: false, active: true },
                                        { status: "Departed Port", location: "Shanghai East Terminal", date: "Mar 15, 2026", time: "02:20 PM", completed: true },
                                        { status: "Customs Cleared", location: "Shanghai Customs Office", date: "Mar 12, 2026", time: "11:00 AM", completed: true },
                                        { status: "Container Loaded", location: "Zeng's Logistics Hub", date: "Mar 10, 2026", time: "08:15 AM", completed: true },
                                    ].map((step, i) => (
                                        <div key={i} className="relative z-10 flex gap-10 pb-12 last:pb-0">
                                            <div className="shrink-0 flex flex-col items-center">
                                                <div className={cn(
                                                    "w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                                                    step.completed ? "bg-green-500 border-green-500 scale-90" :
                                                        step.active ? "bg-white border-brand-accent ring-4 ring-brand-accent/10" : "bg-white border-slate-200"
                                                )}>
                                                    {step.completed ? (
                                                        <CheckCircle2 className="h-5 w-5 text-white" />
                                                    ) : step.active ? (
                                                        <div className="w-2.5 h-2.5 bg-brand-accent rounded-full animate-pulse"></div>
                                                    ) : (
                                                        <div className="w-2 h-2 bg-slate-200 rounded-full"></div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-2 mb-1">
                                                    <h4 className={cn("text-lg font-bold", step.active ? "text-brand-accent" : "text-brand-primary")}>{step.status}</h4>
                                                    <div className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-full">{step.date} | {step.time}</div>
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-500 text-sm italic">
                                                    <MapPin className="h-3.5 w-3.5" />
                                                    {step.location}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer Insight */}
                            <div className="bg-slate-50 p-6 border-t border-slate-100 flex items-center gap-4">
                                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                                    <Info className="h-5 w-5" />
                                </div>
                                <p className="text-sm text-slate-600">
                                    <strong>AI Prediction:</strong> Weather patterns indicate a potential 6-hour delay near Port of Long Beach. Our team is monitoring the situation.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 opacity-50 grayscale transition-all hover:grayscale-0 hover:opacity-100 duration-1000">
                        <div className="bg-white rounded-card p-6 border border-slate-100 text-center">
                            <Globe className="h-10 w-10 text-slate-300 mx-auto mb-4" />
                            <div className="font-bold text-slate-400">Global Coverage</div>
                        </div>
                        <div className="bg-white rounded-card p-6 border border-slate-100 text-center">
                            <Package className="h-10 w-10 text-slate-300 mx-auto mb-4" />
                            <div className="font-bold text-slate-400">Every Cargo Type</div>
                        </div>
                        <div className="bg-white rounded-card p-6 border border-slate-100 text-center">
                            <Clock className="h-10 w-10 text-slate-300 mx-auto mb-4" />
                            <div className="font-bold text-slate-400">24/7 Monitoring</div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
