"use client";

import { X, Check } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const oldWay = [
  "Scattered spreadsheets and emails",
  "Missed delivery deadlines",
  "Manual customs paperwork",
  "Lost shipment records",
  "No real-time visibility",
  "Reactive problem-solving",
];

const newWay = [
  "Everything in one platform",
  "Every shipment tracked live",
  "Automated customs workflows",
  "Complete audit trail",
  "Real-time GPS visibility",
  "Predictive alerts & AI insights",
];

export default function ComparisonSection() {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
              The Old Way vs The CargoSignal Way
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              See why 2,000+ logistics teams switched to CargoSignal.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Old Way */}
          <AnimatedSection delay={0.1}>
            <div className="rounded-2xl border-2 border-red-100 bg-red-50/50 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                  <X className="h-5 w-5 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">The Old Way</h3>
              </div>
              <ul className="space-y-3">
                {oldWay.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                    <X className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* New Way */}
          <AnimatedSection delay={0.2}>
            <div className="rounded-2xl border-2 border-[#ff6d00]/20 bg-[#ff6d00]/5 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#ff6d00]/15 flex items-center justify-center">
                  <Check className="h-5 w-5 text-[#ff6d00]" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">The CargoSignal Way</h3>
              </div>
              <ul className="space-y-3">
                {newWay.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                    <Check className="h-4 w-4 text-[#ff6d00] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
