import React from "react";
import Link from "next/link";
import { Globe, Mail, Phone, Twitter, Linkedin, Facebook } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#212124] text-zinc-400 pt-16 pb-8 border-t border-white/[0.14]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        {/* Brand */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-[#ff6d00] p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">CargoSignal</span>
          </Link>
          <p className="text-sm leading-relaxed max-w-xs">
            Connecting global trade with intelligent supply chain visibility. Track, manage, and optimize your logistics operations in real-time.
          </p>
          <div className="flex gap-3">
            {[Twitter, Linkedin, Facebook].map((Icon, i) => (
              <a key={i} href="#" className="p-2 rounded-full bg-white/[0.07] hover:bg-[#ff6d00] hover:text-white transition-all duration-200">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            {[
              { label: "Home", href: "/" },
              { label: "About Us", href: "/about" },
              { label: "Our Services", href: "/services" },
              { label: "Pricing Plans", href: "/pricing" },
              { label: "Latest News", href: "/blog" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-[#ff6d00] transition-colors duration-200">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Support</h4>
          <ul className="space-y-3 text-sm">
            {[
              { label: "Contact Us", href: "/contact" },
              { label: "FAQs", href: "/faq" },
              { label: "Shipment Tracking", href: "/tracking" },
              { label: "Terms of Service", href: "/terms" },
              { label: "Privacy Policy", href: "/privacy" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-[#ff6d00] transition-colors duration-200">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Newsletter</h4>
          <p className="text-sm mb-6">Subscribe for the latest logistics insights and updates.</p>
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email Address"
              className="rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-[#ff6d00] text-white placeholder:text-zinc-600 bg-white/[0.07] border border-white/[0.14]"
            />
            <Button variant="accent" className="w-full">Subscribe Now</Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium border-t border-white/[0.14] text-zinc-500">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5" />
            <span>support@cargosignal.com</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5" />
            <span>+1 (555) 123-4567</span>
          </div>
        </div>
        <div>© {currentYear} CargoSignal. All Rights Reserved.</div>
      </div>
    </footer>
  );
}
