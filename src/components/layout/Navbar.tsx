"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Globe, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Tracking", href: "#tracking" },
  { name: "Features", href: "#features" },
  { name: "Dashboard", href: "#dashboard" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#contact" },
];

const sectionIds = ["hero", "tracking", "features", "dashboard", "pricing", "contact"];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollY > 40);
      setScrollProgress(docH > 0 ? (scrollY / docH) * 100 : 0);

      // Determine active section
      for (const id of [...sectionIds].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((href: string) => {
    setIsOpen(false);
    if (href.startsWith("#")) {
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent">
        <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-100"
          style={{ width: `${scrollProgress}%` }} />
      </div>

      <nav className={cn(
        "fixed top-0.5 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-[#0B0F19]/95 backdrop-blur-md border-b border-white/10 py-3" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo("#hero")} className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-500 transition-colors">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-white">CargoSignal</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => {
              const id = link.href.slice(1);
              const isActive = activeSection === id;
              return (
                <button key={link.name} onClick={() => scrollTo(link.href)}
                  className={cn("text-sm font-medium transition-colors duration-200 relative",
                    isActive ? "text-blue-400" : "text-zinc-400 hover:text-white")}>
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Log in</Link>
            <Link href="/register">
              <button className="h-9 px-5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20">
                Get Started
              </button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="lg:hidden p-2 text-zinc-400 hover:text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={cn("lg:hidden fixed inset-x-0 top-[64px] bg-[#0B0F19] border-b border-white/10 transition-all duration-300 overflow-hidden",
          isOpen ? "max-h-screen py-6 opacity-100" : "max-h-0 py-0 opacity-0")}>
          <div className="flex flex-col gap-4 px-6">
            {navLinks.map(link => (
              <button key={link.name} onClick={() => scrollTo(link.href)}
                className="text-base font-medium text-zinc-400 hover:text-white transition-colors text-left">
                {link.name}
              </button>
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
    </>
  );
}
