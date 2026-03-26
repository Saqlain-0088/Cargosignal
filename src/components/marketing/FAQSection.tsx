"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { cn } from "@/lib/utils";

const faqs = [
  { q: "Do I need a credit card to start?", a: "No. You can start your 14-day free trial with just your email. No credit card required until you decide to upgrade." },
  { q: "How long does setup take?", a: "Most teams are fully operational within 5 minutes. Import your existing shipment data from Excel and you're ready to go." },
  { q: "Is CargoSignal GDPR compliant?", a: "Yes. All data is encrypted at rest and in transit. We are fully GDPR compliant and offer data residency options for enterprise customers." },
  { q: "Can I import my existing data?", a: "Absolutely. CargoSignal supports Excel and CSV imports for shipments, contacts, and inventory. Our onboarding team will help you migrate." },
  { q: "How many users can I add?", a: "It depends on your plan. Starter supports up to 5 users, Professional up to 25, and Enterprise is unlimited with role-based access control." },
  { q: "What carriers and integrations do you support?", a: "We integrate with 340+ carriers globally including Maersk, MSC, CMA CGM, FedEx, DHL, and UPS. API access is available on Professional and above." },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-100">
      <div className="max-w-3xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Frequently Asked Questions</h2>
            <p className="text-slate-500">Everything you need to know before getting started.</p>
          </div>
        </AnimatedSection>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-800 text-sm">{faq.q}</span>
                  <ChevronDown className={cn("h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200", open === i && "rotate-180")} />
                </button>
                {open === i && (
                  <div className="px-6 pb-5 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
