"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Check, HelpCircle, Zap, Shield, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
    {
        name: "Basic",
        description: "Ideal for small businesses starting with international trade.",
        monthlyPrice: 99,
        yearlyPrice: 79,
        features: [
            "Up to 10 Shipments / Month",
            "Standard Tracking Access",
            "Basic Analytics Dashboard",
            "Email Support (24h response)",
            "Standard Customs Documentation",
            "1 User Account",
        ],
        cta: "Start Free Trial",
        highlight: false,
        icon: Zap,
    },
    {
        name: "Professional",
        description: "For growing companies needing advanced visibility and speed.",
        monthlyPrice: 299,
        yearlyPrice: 239,
        features: [
            "Up to 100 Shipments / Month",
            "Real-time GPS Tracking",
            "Predictive ETA Analytics",
            "Priority Support (4h response)",
            "Automated Document Workflows",
            "5 User Accounts",
            "API Integration Access",
        ],
        cta: "Get Started Now",
        highlight: true,
        icon: Shield,
    },
    {
        name: "Enterprise",
        description: "Custom solutions for global enterprises with complex needs.",
        monthlyPrice: "Custom",
        yearlyPrice: "Custom",
        features: [
            "Unlimited Shipments",
            "Advanced Global Visibility",
            "Custom AI Predictions",
            "Dedicated Account Manager",
            "Custom Integration Support",
            "Unlimited User Accounts",
            "SLA Guarantees",
            "White-label Reports",
        ],
        cta: "Talk to Sales",
        highlight: false,
        icon: Building2,
    },
];

export default function PricingPage() {
    const [isYearly, setIsYearly] = useState(false);

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Navbar />

            <main className="flex-1 pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-brand-primary mb-6">
                            Simple, Transparent <span className="text-brand-accent">Pricing</span>
                        </h1>
                        <p className="text-lg text-slate-500 mb-10">
                            Choose the plan that best fits your logistics operations. We scale with you as your business grows.
                        </p>

                        {/* Toggle */}
                        <div className="flex items-center justify-center gap-4">
                            <span className={cn("text-sm font-bold transition-colors", !isYearly ? "text-brand-primary" : "text-slate-400")}>Monthly</span>
                            <button
                                onClick={() => setIsYearly(!isYearly)}
                                className="w-14 h-7 bg-slate-200 rounded-full p-1 relative transition-colors focus:outline-none"
                            >
                                <div className={cn(
                                    "w-5 h-5 bg-brand-accent rounded-full transition-transform duration-300",
                                    isYearly ? "translate-x-7" : "translate-x-0"
                                )} />
                            </button>
                            <div className="flex items-center gap-2">
                                <span className={cn("text-sm font-bold transition-colors", isYearly ? "text-brand-primary" : "text-slate-400")}>Yearly</span>
                                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Save 20%</span>
                            </div>
                        </div>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        {plans.map((plan) => (
                            <div
                                key={plan.name}
                                className={cn(
                                    "relative bg-white rounded-card p-8 transition-all duration-300 border-2",
                                    plan.highlight
                                        ? "border-brand-accent shadow-2xl scale-[1.02] z-10"
                                        : "border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200"
                                )}
                            >
                                {plan.highlight && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-accent text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-8">
                                    <div className={cn(
                                        "w-12 h-12 rounded-xl flex items-center justify-center mb-6",
                                        plan.highlight ? "bg-brand-accent text-white" : "bg-slate-50 text-brand-primary"
                                    )}>
                                        <plan.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-brand-primary mb-2">{plan.name}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed mb-6">{plan.description}</p>

                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-black text-brand-primary">
                                            {typeof (isYearly ? plan.yearlyPrice : plan.monthlyPrice) === 'number' ? '$' : ''}
                                            {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                                        </span>
                                        {typeof plan.monthlyPrice === 'number' && (
                                            <span className="text-slate-400 font-medium">/month</span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4 mb-10">
                                    {plan.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="mt-1 bg-brand-accent/10 p-0.5 rounded-full">
                                                <Check className="h-3.5 w-3.5 text-brand-accent" />
                                            </div>
                                            <span className="text-sm text-slate-600 font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    className={cn(
                                        "w-full h-12 shadow-lg",
                                        plan.highlight ? "shadow-brand-accent/20" : "bg-slate-900 shadow-slate-900/10"
                                    )}
                                    variant={plan.highlight ? "primary" : "primary"}
                                >
                                    {plan.cta}
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* FAQ Preview or Comparison Table */}
                    <div className="bg-white rounded-card shadow-sm border border-slate-100 p-12 text-center overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-full -mr-32 -mt-32 -z-0"></div>
                        <h3 className="text-2xl font-bold text-brand-primary mb-6 relative z-10">Need a more customized plan?</h3>
                        <p className="text-slate-500 mb-8 max-w-xl mx-auto relative z-10">
                            We understand that every business has unique requirements. Contact our team to design a bespoke logistics visibility solution for your specific needs.
                        </p>
                        <div className="flex justify-center gap-4 relative z-10">
                            <Button variant="outline" className="border-slate-200">View All Features</Button>
                            <Button>Contact Sales</Button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
