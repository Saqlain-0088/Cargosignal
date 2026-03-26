"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import AnimatedSection from "./AnimatedSection";

export default function CTASection() {
  return (
    <section className="py-24 bg-[#1c1c1e] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 100%, #ff6d00, transparent)" }}
      />
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="relative text-center max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-[#ff6d00]/30 bg-[#ff6d00]/10 text-[#ff6d00]">
            Get Started Today
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            Ready to take control of your{" "}
            <span className="text-[#ff6d00]">supply chain?</span>
          </h2>
          <p className="text-lg mb-10 max-w-xl mx-auto text-zinc-400">
            Join thousands of logistics teams who trust CargoSignal for real-time visibility, smarter decisions, and fewer surprises.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <Button variant="accent" className="gap-2 px-8 py-3 text-base">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="dark-outline" className="px-8 py-3 text-base">
                Talk to Sales
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-xs text-zinc-500">
            No credit card required · Cancel anytime · 14-day free trial
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
