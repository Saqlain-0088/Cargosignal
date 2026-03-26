"use client";

import { Ship, Calendar, Package, BarChart3, Check } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const spotlights = [
  {
    tag: "SHIPMENTS",
    headline: "Every Shipment,\nPerfectly Tracked.",
    desc: "Complete shipment profiles with full history, live GPS, customs status, and automated milestone alerts. Import from Excel in 3 clicks.",
    features: ["Smart Excel import", "Full shipment timeline", "Automated milestone alerts", "Multi-modal support"],
    icon: Ship,
    color: "#ff6d00",
    flip: false,
  },
  {
    tag: "SCHEDULING",
    headline: "Zero Missed\nDeadlines.",
    desc: "Calendar and list views. Status tracking. One-click booking. Automated carrier reminders so nothing slips through the cracks.",
    features: ["Calendar + list views", "4 status types", "Instant booking", "Carrier reminders"],
    icon: Calendar,
    color: "#3b82f6",
    flip: true,
  },
  {
    tag: "INVENTORY",
    headline: "Know What You Have.\nBefore You Run Out.",
    desc: "Real-time container and cargo tracking with low-stock alerts. Link supplier samples directly to inventory records.",
    features: ["Low-stock alerts", "Supplier linking", "Category tracking", "Real-time sync"],
    icon: Package,
    color: "#10b981",
    flip: false,
  },
];

export default function FeatureSpotlight() {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 space-y-24">
        {spotlights.map((s, i) => (
          <AnimatedSection key={s.tag} delay={0.1}>
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${s.flip ? "lg:flex-row-reverse" : ""}`}>
              {/* Text */}
              <div className={s.flip ? "lg:order-2" : ""}>
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ backgroundColor: s.color + "15", color: s.color }}
                >
                  {s.tag}
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 leading-tight whitespace-pre-line">
                  {s.headline}
                </h2>
                <p className="text-slate-500 leading-relaxed mb-6">{s.desc}</p>
                <ul className="space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: s.color + "20" }}>
                        <Check className="h-3 w-3" style={{ color: s.color }} />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual card */}
              <div className={s.flip ? "lg:order-1" : ""}>
                <div
                  className="rounded-2xl p-10 flex items-center justify-center min-h-[280px] border"
                  style={{ backgroundColor: s.color + "08", borderColor: s.color + "20" }}
                >
                  <div className="text-center">
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: s.color + "15" }}
                    >
                      <s.icon className="h-10 w-10" style={{ color: s.color }} />
                    </div>
                    <div className="text-sm font-semibold text-slate-500">{s.tag} Module</div>
                    <div className="text-xs text-slate-400 mt-1">Live preview available in dashboard</div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
