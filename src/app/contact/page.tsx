"use client";

import MarketingLayout from "@/components/layout/MarketingLayout";
import { Button } from "@/components/ui/Button";
import { MapPin, Phone, Mail, Send, Twitter, Linkedin, Facebook } from "lucide-react";
import AnimatedSection from "@/components/marketing/AnimatedSection";

export default function ContactPage() {
  return (
    <MarketingLayout>
      <section className="py-20 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Info */}
            <AnimatedSection>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-[#ff6d00]/30 bg-[#ff6d00]/10 text-[#ff6d00]">
                Get In Touch
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                Let's Talk About Your{" "}
                <span className="text-[#ff6d00]">Logistics</span>.
              </h1>
              <p className="text-zinc-400 mb-10 leading-relaxed">
                Have a question or ready to optimize your supply chain? Our team is standing by to help.
              </p>
              <div className="space-y-6">
                {[
                  { icon: MapPin, title: "Headquarters", text: "123 Logistics Way, Suite 500, San Francisco, CA 94105" },
                  { icon: Phone, title: "Phone Support", text: "+1 (555) 123-4567 | Toll Free: 1-800-CARGO-SIG" },
                  { icon: Mail, title: "Email", text: "support@cargosignal.com | sales@cargosignal.com" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-[#ff6d00]/10 shrink-0">
                      <item.icon className="h-5 w-5 text-[#ff6d00]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1 text-sm">{item.title}</h4>
                      <p className="text-zinc-400 text-sm">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 pt-10 border-t border-white/10 flex gap-3">
                {[Twitter, Linkedin, Facebook].map((Icon, i) => (
                  <a key={i} href="#" className="p-3 rounded-full bg-white/5 hover:bg-[#ff6d00] transition-all duration-200">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection delay={0.15}>
              <div className="rounded-xl p-8 bg-[#1a1a1a] border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Send Us a Message</h3>
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["Full Name", "Email Address"].map((label) => (
                      <div key={label}>
                        <label className="block text-xs font-medium text-zinc-400 mb-1.5">{label}</label>
                        <input type="text" className="w-full h-11 px-4 rounded-lg text-sm text-white placeholder:text-zinc-600 bg-[#0f0f0f] border border-white/10 outline-none focus:ring-1 focus:ring-[#ff6d00]" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">Subject</label>
                    <select className="w-full h-11 px-4 rounded-lg text-sm text-white bg-[#0f0f0f] border border-white/10 outline-none focus:ring-1 focus:ring-[#ff6d00]">
                      <option>General Inquiry</option>
                      <option>Sales & Pricing</option>
                      <option>Technical Support</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">Message</label>
                    <textarea rows={5} className="w-full p-4 rounded-lg text-sm text-white placeholder:text-zinc-600 bg-[#0f0f0f] border border-white/10 outline-none focus:ring-1 focus:ring-[#ff6d00] resize-none" />
                  </div>
                  <Button variant="accent" className="w-full gap-2">
                    Send Message <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
