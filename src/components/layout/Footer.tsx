import React from "react";
import Link from "next/link";
import { Globe, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-brand-primary text-slate-300 pt-16 pb-8 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                {/* Brand & About */}
                <div className="space-y-6">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-brand-accent p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
                            <Globe className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">
                            CargoSignal
                        </span>
                    </Link>
                    <p className="text-sm leading-relaxed max-w-xs">
                        Connecting global trade with intelligent supply chain visibility. Track, manage, and optimize your logistics operations in real-time.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-brand-accent hover:text-white transition-all">
                            <Twitter className="h-4 w-4" />
                        </a>
                        <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-brand-accent hover:text-white transition-all">
                            <Linkedin className="h-4 w-4" />
                        </a>
                        <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-brand-accent hover:text-white transition-all">
                            <Facebook className="h-4 w-4" />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Quick Links</h4>
                    <ul className="space-y-4 text-sm">
                        <li><Link href="/" className="hover:text-brand-accent transition-colors">Home</Link></li>
                        <li><Link href="/about" className="hover:text-brand-accent transition-colors">About Us</Link></li>
                        <li><Link href="/services" className="hover:text-brand-accent transition-colors">Our Services</Link></li>
                        <li><Link href="/pricing" className="hover:text-brand-accent transition-colors">Pricing Plans</Link></li>
                        <li><Link href="/blog" className="hover:text-brand-accent transition-colors">Latest News</Link></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Support</h4>
                    <ul className="space-y-4 text-sm">
                        <li><Link href="/contact" className="hover:text-brand-accent transition-colors">Contact Us</Link></li>
                        <li><Link href="/faq" className="hover:text-brand-accent transition-colors">FAQs</Link></li>
                        <li><Link href="/tracking" className="hover:text-brand-accent transition-colors">Shipment Tracking</Link></li>
                        <li><Link href="/terms" className="hover:text-brand-accent transition-colors">Terms of Service</Link></li>
                        <li><Link href="/privacy" className="hover:text-brand-accent transition-colors">Privacy Policy</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Newsletter</h4>
                    <p className="text-sm mb-6">Subscribe to our newsletter for the latest logistics insights and updates.</p>
                    <div className="flex flex-col gap-3">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="bg-slate-800 border-none rounded-ui px-4 py-2.5 text-sm focus:ring-1 focus:ring-brand-accent outline-none"
                        />
                        <Button className="w-full">Subscribe Now</Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1.5 hover:text-slate-300 transition-colors">
                        <Mail className="h-3.5 w-3.5" />
                        <span>support@cargosignal.com</span>
                    </div>
                    <div className="flex items-center gap-1.5 hover:text-slate-300 transition-colors">
                        <Phone className="h-3.5 w-3.5" />
                        <span>+1 (555) 123-4567</span>
                    </div>
                </div>
                <div>
                    © {currentYear} CargoSignal. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}
