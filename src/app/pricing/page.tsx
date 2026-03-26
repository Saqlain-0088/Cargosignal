"use client";
import { useState } from "react";
import MarketingLayout from "@/components/layout/MarketingLayout";
import { Button } from "@/components/ui/Button";
import { Check, Zap, Shield, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedSection from "@/components/marketing/AnimatedSection";

const plans = [
  { name: "Basic", icon: Zap, desc: "Ideal for small businesses.", monthly: 99, yearly: 79, highlight: false, cta: "Start Free Trial",
    features: ["Up to 10 Shipments/Month", "Standard Tracking", "Basic Analytics", "Email Support", "1 User Account"] },
  { name: "Professional", icon: Shield, desc: "For growing companies.", monthly: 299, yearly: 239, highlight: true, cta: "Get Started Now",
    features: ["Up to 100 Shipments/Month", "Real-time GPS Tracking", "Predictive ETA", "Priority Support", "5 User Accounts", "API Access"] },
  { name: "Enterprise", icon: Building2, desc: "Custom enterprise solutions.", monthly: null, yearly: null, highlight: false, cta: "Talk to Sales",
    features: ["Unlimited Shipments", "Advanced Visibility", "Custom AI", "Dedicated Manager", "Unlimited Users", "SLA Guarantees"] },
];

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);
  return (
    <MarketingLayout>
      <section className="py-20 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-[#ff6d00]/30 bg-[#ff6d00]/10 text-[#ff6d00]">Pricing</div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Simple, Transparent <span className="text-[#ff6d00]">Pricing</span></h1>
              <p className="text-zinc-400 mb-8">Choose the plan that fits your logistics operations.</p>
              <div className="flex items-center justify-center gap-4">
                <span className={cn("text-sm font-bold", !yearly ? "text-white" : "text-zinc-500")}>Monthly</span>
                <button onClick={() => setYearly(!yearly)} className="w-12 h-6 bg-white/10 rounded-full p-1 relative border border-white/20">
                  <div className={cn("w-4 h-4 bg-[#ff6d00] rounded-full transition-transform duration-300", yearly ? "translate-x-6" : "translate-x-0")} />
                </button>
                <div className="flex items-center gap-2">
                  <span className={cn("text-sm font-bold", yearly ? "text-white" : "text-zinc-500")}>Yearly</span>
                  <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full">Save 20%</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {plans.map((plan, i) => (
              <AnimatedSection key={plan.name} delay={i * 0.1}>
                <div className={cn("relative rounded-xl p-8 border h-full flex flex-col transition-all duration-200",
                  plan.highlight ? "border-[#ff6d00] bg-[#1a1a1a] shadow-[0_0_40px_rgba(255,109,0,0.15)]" : "border-white/10 bg-[#1a1a1a] hover:border-[#ff6d00]/40")}>
                  {plan.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff6d00] text-white text-xs font-bold px-4 py-1 rounded-full uppercase">Most Popular</div>}
                  <div className="mb-6">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-[#ff6d00]/10">
                      <plan.icon className="h-5 w-5 text-[#ff6d00]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                    <p className="text-sm text-zinc-400 mb-4">{plan.desc}</p>
                    <div className="flex items-baseline gap-1">
                      {plan.monthly
                        ? <><span className="text-4xl font-black text-white">${yearly ? plan.yearly : plan.monthly}</span><span className="text-zinc-500 text-sm">/mo</span></>
                        : <span className="text-3xl font-black text-white">Custom</span>}
                    </div>
                  </div>
                  <div className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#ff6d00]/10 flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3 text-[#ff6d00]" />
                        </div>
                        <span className="text-sm text-zinc-300">{f}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant={plan.highlight ? "accent" : "dark-outline"} className="w-full">{plan.cta}</Button>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection>
            <div className="rounded-xl p-10 bg-[#1a1a1a] border border-white/10 text-center">
              <h3 className="text-2xl font-bold text-white mb-3">Need a custom plan?</h3>
              <p className="text-zinc-400 mb-6 max-w-lg mx-auto">Contact our team to design a bespoke solution.</p>
              <div className="flex justify-center gap-4">
                <Button variant="dark-outline">View All Features</Button>
                <Button variant="accent">Contact Sales</Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </MarketingLayout>
  );
}
