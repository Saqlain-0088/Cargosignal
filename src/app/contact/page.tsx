"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Linkedin, Twitter, Facebook } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Navbar />

            <main className="flex-1 pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                        {/* Contact Info */}
                        <div>
                            <h2 className="text-sm font-bold text-brand-accent tracking-[0.2em] uppercase mb-3">Get In Touch</h2>
                            <h1 className="text-4xl md:text-6xl font-extrabold text-brand-primary mb-8 leading-tight">
                                Let's Talk About Your <span className="text-brand-accent">Logistics</span>.
                            </h1>
                            <p className="text-lg text-slate-500 mb-12 max-w-lg leading-relaxed">
                                Have a question or ready to optimize your supply chain? Our team is standing by to help you navigate global trade with ease.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-6">
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-brand-accent shrink-0">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-primary mb-1">Our Headquarters</h4>
                                        <p className="text-slate-500 text-sm">123 Logistics Way, Suite 500, San Francisco, CA 94105</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-brand-accent shrink-0">
                                        <Phone className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-primary mb-1">Phone Support</h4>
                                        <p className="text-slate-500 text-sm">+1 (555) 123-4567 | Toll Free: 1-800-CARGO-SIG</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6">
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-brand-accent shrink-0">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-primary mb-1">Email Queries</h4>
                                        <p className="text-slate-500 text-sm">support@cargosignal.com | sales@cargosignal.com</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-16 pt-16 border-t border-slate-200">
                                <h4 className="font-bold text-brand-primary mb-4 uppercase text-xs tracking-widest font-mono">Follow Us</h4>
                                <div className="flex gap-4">
                                    {[Twitter, Linkedin, Facebook].map((Icon, i) => (
                                        <a key={i} href="#" className="bg-slate-100 p-3 rounded-full hover:bg-brand-accent hover:text-white transition-all">
                                            <Icon className="h-5 w-5" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white rounded-card shadow-premium p-10 border border-slate-100">
                            <h3 className="text-2xl font-bold text-brand-primary mb-8">Send Us a Message</h3>
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-600">Full Name</label>
                                        <input type="text" placeholder="John Doe" className="w-full h-12 px-4 bg-slate-50 border-none rounded-ui outline-none focus:ring-2 focus:ring-brand-accent/10" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-600">Email Address</label>
                                        <input type="email" placeholder="john@company.com" className="w-full h-12 px-4 bg-slate-50 border-none rounded-ui outline-none focus:ring-2 focus:ring-brand-accent/10" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-600">Subject</label>
                                    <select className="w-full h-12 px-4 bg-slate-50 border-none rounded-ui outline-none focus:ring-2 focus:ring-brand-accent/10 appearance-none">
                                        <option>General Inquiry</option>
                                        <option>Sales & Pricing</option>
                                        <option>Technical Support</option>
                                        <option>Partnerships</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-600">Your Message</label>
                                    <textarea rows={6} placeholder="How can we help you today?" className="w-full p-4 bg-slate-50 border-none rounded-ui outline-none focus:ring-2 focus:ring-brand-accent/10 resize-none"></textarea>
                                </div>
                                <Button className="w-full h-14 text-lg shadow-xl shadow-brand-accent/20">
                                    Send Message Now <Send className="ml-2 h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* Map Placeholder */}
                    <div className="mt-24 h-[400px] bg-slate-200 rounded-card flex items-center justify-center text-slate-400 font-mono italic p-12 text-center border-4 border-white shadow-xl">
                        [ Interactive Map: Our Global Headquarters Locations ]
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
