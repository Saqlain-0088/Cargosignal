"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Globe, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Tracking", href: "/tracking" },
    { name: "Pricing", href: "/pricing" },
    { name: "Quote", href: "/quote" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
                scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-brand-accent p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
                        <Globe className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-brand-primary">
                        CargoSignal
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-brand-accent",
                                pathname === link.href ? "text-brand-accent" : "text-slate-600"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Auth */}
                <div className="hidden lg:flex items-center gap-4">
                    <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-brand-accent transition-colors">
                        Log in
                    </Link>
                    <Button size="sm">Get Started</Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden p-2 text-slate-600 hover:text-brand-accent"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Navigation */}
            <div
                className={cn(
                    "lg:hidden fixed inset-x-0 top-[72px] bg-white border-b shadow-xl transition-all duration-300 overflow-hidden",
                    isOpen ? "max-h-screen py-6 opacity-100" : "max-h-0 py-0 opacity-0"
                )}
            >
                <div className="flex flex-col gap-4 px-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-base font-medium transition-colors hover:text-brand-accent",
                                pathname === link.href ? "text-brand-accent" : "text-slate-600"
                            )}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="pt-4 border-t flex flex-col gap-4">
                        <Link href="/login" onClick={() => setIsOpen(false)} className="text-base font-medium text-slate-600">
                            Log in
                        </Link>
                        <Button className="w-full">Get Started</Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
