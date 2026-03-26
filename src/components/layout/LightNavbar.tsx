"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Features", href: "/#features" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function LightNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-[#ff6d00] p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <Globe className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-slate-900">CargoSignal</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}
              className={cn("text-sm font-medium transition-colors duration-200",
                pathname === link.href ? "text-[#ff6d00]" : "text-slate-600 hover:text-[#ff6d00]"
              )}>
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-[#ff6d00] transition-colors">Log in</Link>
          <Link href="/register">
            <button className="h-9 px-5 rounded-xl bg-[#ff6d00] text-white text-sm font-semibold hover:bg-[#e56200] transition-colors">
              Get Started Free
            </button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden p-2 text-slate-600 hover:text-[#ff6d00]" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={cn("lg:hidden fixed inset-x-0 top-[64px] bg-white border-b border-slate-200 transition-all duration-300 overflow-hidden",
        open ? "max-h-screen py-6 opacity-100" : "max-h-0 py-0 opacity-0")}>
        <div className="flex flex-col gap-4 px-6">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} onClick={() => setOpen(false)}
              className="text-base font-medium text-slate-600 hover:text-[#ff6d00] transition-colors">{link.name}</Link>
          ))}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <Link href="/login" onClick={() => setOpen(false)} className="text-base font-medium text-slate-600">Log in</Link>
            <Link href="/register" onClick={() => setOpen(false)}>
              <button className="w-full h-10 rounded-xl bg-[#ff6d00] text-white text-sm font-semibold">Get Started Free</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
