"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter", monthly: 49, yearly: 39,
    desc: "For small teams getting started.",
    features: ["5 users", "10 shipments/mo", "Basic tracking", "Email alerts", "Email support"],
    highlight: false, cta: "Start Free Trial",
  },
  {
    name: "Professional", monthly: 149, yearly: 119,
    desc: "For growing logistics teams.",
    features: ["25 users", "100 shipments/mo", "Real-time GPS", "API access", "Smart alerts", "Priority support"],
    highlight: true, cta: "Get Started",
  },
  {
    name: "Enterprise", monthly: null, yearly: null,
    desc: "Custom solutions for large operations.",
    features: ["Unlimited users", "Unlimited shipments", "Custom AI", "Dedicated manager", "SLA guarantee", "White-label"],
    highlight: false, cta: "Contact Sales",
  },
];

export default function PricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 bg-[#0d1120]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-14">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-500/30 bg-blue-500/10 text-blue-400">
            Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Simple, Transparent Pricing</h2>
          <p className="text-zinc-400 max-w-xl mx-auto mb-8">Start free. Scale as your operations grow.</p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={cn("text-sm font-medium", !yearly ? "text-white" : "text-zinc-500")}>Monthly</span>
            <button onClick={() => setYearly(!yearly)}
              className="w-12 h-6 rounded-full relative border border-white/20 bg-white/5 transition-colors">
              <div className={cn("absolute top-1 w-4 h-4 rounded-full bg-blue-500 transition-transform duration-300", yearly ? "translate-x-6" : "translate-x-1")} />
            </button>
            <div className="flex items-center gap-2">
              <span className={cn("text-sm font-medium", yearly ? "text-white" : "text-zinc-500")}>Yearly</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">Save 20%</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div key={plan.name}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={cn("relative rounded-2xl p-8 border flex flex-col transition-all duration-200",
                plan.highlight
                  ? "border-blue-500/60 bg-gradient-to-b from-blue-950/40 to-[#0B0F19] shadow-[0_0_40px_rgba(59,130,246,0.15)]"
                  : "border-white/10 bg-[#0B0F19] hover:border-white/20")}>
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-zinc-400 mb-4">{plan.desc}</p>
                <div className="flex items-baseline gap-1">
                  {plan.monthly
                    ? <><span className="text-4xl font-extrabold text-white">${yearly ? plan.yearly : plan.monthly}</span><span className="text-zinc-500 text-sm">/mo</span></>
                    : <span className="text-3xl font-extrabold text-white">Custom</span>}
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-zinc-300">
                    <div className="w-5 h-5 rounded-full bg-blue-500/15 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-blue-400" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <button className={cn("w-full h-11 rounded-xl text-sm font-semibold transition-all",
                plan.highlight
                  ? "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20"
                  : "border border-white/20 text-white hover:bg-white/5")}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
