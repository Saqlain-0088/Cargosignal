"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import HeroMapSection from "@/components/marketing/HeroMapSection";
import TrackingPreview from "@/components/marketing/TrackingPreview";
import FeatureCards from "@/components/marketing/FeatureCards";
import DashboardPreview from "@/components/marketing/DashboardPreview";
import PricingSection from "@/components/marketing/PricingSection";
import StatsSection from "@/components/marketing/StatsSection";
import ContactSection from "@/components/marketing/ContactSection";
import CTASection from "@/components/marketing/CTASection";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0B0F19] text-white">
      <Navbar />
      <main className="flex-1">
        {/* 1. Hero — fullscreen map + tracking input */}
        <HeroMapSection />

        {/* 2. Tracking Preview — map + timeline */}
        <TrackingPreview />

        {/* 3. Features — card grid */}
        <FeatureCards />

        {/* 4. Dashboard Preview — analytics mock */}
        <DashboardPreview />

        {/* 5. Pricing — monthly/yearly toggle */}
        <PricingSection />

        {/* 6. Stats — animated counters */}
        <StatsSection />

        {/* 7. Contact — form + info */}
        <ContactSection />

        {/* 8. Final CTA — tracking input again */}
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
