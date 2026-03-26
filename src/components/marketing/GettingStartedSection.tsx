"use client";

import AnimatedSection from "./AnimatedSection";

const steps = [
  { num: "01", title: "Set Up Your Account", desc: "Add your company details, branding, and carrier preferences in minutes." },
  { num: "02", title: "Configure Your Team", desc: "Invite logistics managers, customs agents, and staff with role-based access." },
  { num: "03", title: "Start Managing", desc: "Import shipments, book carriers, and get full visibility from day one." },
];

export default function GettingStartedSection() {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 bg-[#ff6d00]/10 text-[#ff6d00]">
              Getting Started
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
              Up and Running in Minutes
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              No lengthy onboarding. No IT team required. Just sign up and go.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-px bg-gradient-to-r from-[#ff6d00]/20 via-[#ff6d00]/40 to-[#ff6d00]/20" />

          {steps.map((step, i) => (
            <AnimatedSection key={step.num} delay={i * 0.12}>
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-[#ff6d00]/10 border-2 border-[#ff6d00]/20 flex items-center justify-center mb-5">
                  <span className="text-2xl font-black text-[#ff6d00]">{step.num}</span>
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-[#ff6d00] mb-2">Step {step.num}</div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
