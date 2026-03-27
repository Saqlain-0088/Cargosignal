"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Features", href: "/#features" },
  { name: "Tracking", href: "/tracking" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      scrolled ? "bg-[#0B0F19]/95 backdrop-blur-md border-b border-white/10 py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-500 transition-colors">
            <Globe className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-white">CargoSignal</span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => (
            <Link key={link.name} href={link.href}
              className={cn("text-sm font-medium transition-colors duration-200",
                pathname === link.href ? "text-blue-400" : "text-zinc-400 hover:text-white")}>
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Log in</Link>
          <Link href="/register">
            <button className="h-9 px-5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20">
              Get Started
            </button>
          </Link>
        </div>

        <button className="lg:hidden p-2 text-zinc-400 hover:text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className={cn("lg:hidden fixed inset-x-0 top-[64px] bg-[#0B0F19] border-b border-white/10 transition-all duration-300 overflow-hidden",
        isOpen ? "max-h-screen py-6 opacity-100" : "max-h-0 py-0 opacity-0")}>
        <div className="flex flex-col gap-4 px-6">
          {navLinks.map(link => (
            <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)}
              className="text-base font-medium text-zinc-400 hover:text-white transition-colors">{link.name}</Link>
          ))}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <Link href="/login" onClick={() => setIsOpen(false)} className="text-base font-medium text-zinc-400">Log in</Link>
            <Link href="/register" onClick={() => setIsOpen(false)}>
              <button className="w-full h-10 rounded-xl bg-blue-600 text-white text-sm font-semibold">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
