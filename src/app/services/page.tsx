"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Ship, Plane, Truck, Building2, ShieldCheck, BarChart3, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const services = [
    {
        title: "Ocean Freight",
        icon: Ship,
        description: "Our ocean freight services provide you with reliable and cost-effective sea transportation solutions. From FCL to LCL, we handle it all.",
        features: ["FCL (Full Container Load)", "LCL (Less than Container Load)", "Port-to-Port & Door-to-Door", "Customs Clearance"],
    },
    {
        title: "Air Freight",
        icon: Plane,
        description: "When time is of the essence, our air freight services ensure your cargo reaches its destination quickly and safely across the globe.",
        features: ["Express Shipping", "Charter Services", "Global Network", "Priority Handling"],
    },
    {
        title: "Road Transport",
        icon: Truck,
        description: "Our extensive trucking network provides flexible and efficient road transport solutions for regional and continental deliveries.",
        features: ["Last-Mile Delivery", "FTL (Full Truckload)", "LTL (Less than Truckload)", "Real-time GPS Tracking"],
    },
    {
        title: "Warehousing",
        icon: Building2,
        description: "Secure and modern warehousing facilities to store your goods with advanced inventory management and picking services.",
        features: ["Climate Controlled", "Inventory Management", "Distribution", "Order Fulfillment"],
    },
    {
        title: "Customs Brokerage",
        icon: ShieldCheck,
        description: "Expert assistance in navigating complex international trade regulations to ensure your cargo clears customs without delays.",
        features: ["Compliance Documentation", "Duty Management", "HS Code Classification", "Entry Filing"],
    },
    {
        title: "Supply Chain Consulting",
        icon: BarChart3,
        description: "Strategic optimization of your logistics network to reduce costs, improve efficiency, and enhance visibility.",
        features: ["Network Design", "Process Optimization", "Cost Analysis", "Visibility Strategy"],
    },
];

export default function ServicesPage() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Navbar />

            <main className="flex-1 pt-32 pb-24">
                {/* Banner Section */}
                <section className="bg-brand-primary text-white py-24 mb-20 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
                    <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Our <span className="text-brand-accent">Services</span></h1>
                        <p className="text-lg text-slate-300 max-w-2xl mx-auto border-t border-white/10 pt-8 mt-8">
                            Comprehensive logistics solutions tailored for the modern supply chain. We move your business forward with precision and intelligence.
                        </p>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, idx) => (
                            <div key={idx} className="bg-white rounded-card p-10 shadow-sm border border-slate-100 hover:shadow-xl hover:border-brand-accent/20 transition-all group">
                                <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-accent group-hover:text-white transition-all">
                                    <service.icon className="h-8 w-8" />
                                </div>
                                <h2 className="text-2xl font-bold text-brand-primary mb-4 group-hover:text-brand-accent transition-colors">{service.title}</h2>
                                <p className="text-slate-500 mb-8 leading-relaxed italic">{service.description}</p>

                                <div className="space-y-3 mb-10">
                                    {service.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="bg-brand-accent/10 p-1 rounded-full shrink-0">
                                                <Check className="h-3 w-3 text-brand-accent" />
                                            </div>
                                            <span className="text-sm font-medium text-slate-600">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Button variant="outline" className="w-full border-slate-200 group-hover:border-brand-accent group-hover:bg-brand-accent group-hover:text-white">
                                    Learn More
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <section className="max-w-7xl mx-auto px-6 mt-24">
                    <div className="bg-brand-accent rounded-card p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-[200px] -mr-16 -mt-16 pointer-events-none"></div>
                        <div className="max-w-xl relative z-10 text-center md:text-left">
                            <h3 className="text-3xl font-extrabold mb-4">Don't know which service to choose?</h3>
                            <p className="text-white/80">Our logistics experts are ready to help you find the best solution for your business needs.</p>
                        </div>
                        <div className="flex gap-4 relative z-10 shrink-0">
                            <Link href="/contact">
                                <Button className="bg-white text-brand-accent hover:bg-slate-50 h-12 px-8">Talk To Support</Button>
                            </Link>
                            <Link href="/quote">
                                <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 h-12 px-8">Get A Quote</Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
