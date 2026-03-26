"use client";

import AnimatedSection from "./AnimatedSection";

const testimonials = [
  { quote: "We cut our shipment delays by 40%. The automated alerts alone are worth every penny.", name: "James D.", title: "Logistics Director, Global Trade Corp", initials: "JD" },
  { quote: "Finally, a system our operations team actually wanted to use. Setup took less than a day.", name: "Sarah K.", title: "COO, FastFreight Ltd", initials: "SK" },
  { quote: "The customs tracking saved us from two major compliance issues already this quarter.", name: "Michael R.", title: "Import Manager, Pacific Cargo", initials: "MR" },
  { quote: "Moving from spreadsheets to CargoSignal was the best decision we made this year.", name: "Priya N.", title: "Supply Chain Head, TechLogix", initials: "PN" },
  { quote: "Multi-carrier scheduling was a nightmare before. Now it just works. Every single day.", name: "David L.", title: "Fleet Manager, OceanRoute", initials: "DL" },
  { quote: "The cost analytics module alone saves us 5 hours per week. No more manual reports.", name: "Emma W.", title: "Finance Lead, CargoPlus", initials: "EW" },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-14">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 bg-[#ff6d00]/10 text-[#ff6d00]">
              Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
              Logistics Teams Love It.
            </h2>
            <p className="text-slate-500">Operations managers live by it.</p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.07}>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg hover:border-[#ff6d00]/20 transition-all duration-200 h-full flex flex-col">
                <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-5">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#ff6d00]/10 flex items-center justify-center text-xs font-bold text-[#ff6d00] shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.title}</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
