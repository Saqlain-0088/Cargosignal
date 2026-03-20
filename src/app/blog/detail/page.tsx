"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Tag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function BlogDetailPage() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Navbar />

            <main className="flex-1 pt-32 pb-24">
                <div className="max-w-4xl mx-auto px-6">

                    <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-brand-accent mb-8 transition-colors">
                        <ArrowLeft className="h-4 w-4" /> Back to Blog
                    </Link>

                    {/* Article Header */}
                    <div className="mb-12">
                        <span className="bg-brand-accent/10 text-brand-accent text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-6 inline-block">
                            Technology
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary mb-6 leading-tight">
                            The Future of Smart Supply Chains in 2026
                        </h1>
                        <div className="flex items-center gap-6 text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-8">
                            <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Mar 15, 2026</div>
                            <div className="flex items-center gap-2"><User className="h-4 w-4" /> Elena Rodriguez</div>
                        </div>
                    </div>

                    <div className="aspect-video bg-slate-200 rounded-card mb-12 flex items-center justify-center text-slate-400 font-mono italic shadow-lg text-6xl">
                        📡
                    </div>

                    <article className="prose prose-slate md:prose-lg max-w-none text-slate-600 mb-16">
                        <p className="lead text-xl text-slate-500 font-medium mb-8">
                            Discover how AI and IoT are fundamentally changing the way we track and manage ocean freight globally, bringing unprecedented transparency to international trade.
                        </p>
                        <h2 className="text-2xl font-bold text-brand-primary mt-12 mb-6">The Data Revolution in Ocean Freight</h2>
                        <p className="mb-6">
                            For decades, ocean freight was characterized by a distinct lack of visibility once a container was loaded onto a vessel. Today, the integration of advanced IoT devices directly onto containers has transformed the industry. Shippers no longer rely on daily status updates; they have real-time access to GPS location, internal temperature, and humidity.
                        </p>
                    </article>

                </div>
            </main>

            <Footer />
        </div>
    );
}
