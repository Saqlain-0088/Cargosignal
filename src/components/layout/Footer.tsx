import Link from "next/link";
import { Globe, Twitter, Linkedin, Github, ArrowUpRight } from "lucide-react";

const links = {
  Product: [
    { name: "Tracking", href: "#tracking" },
    { name: "Features", href: "#features" },
    { name: "Dashboard", href: "#dashboard" },
    { name: "Pricing", href: "#pricing" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "#" },
    { name: "Contact", href: "#contact" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "GDPR", href: "#" },
    { name: "Security", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#030609] border-t border-white/[0.06]">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight">CargoSignal</span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              Intelligent supply chain visibility for modern logistics teams. Track every shipment, container, and delivery in real-time.
            </p>
            <div className="flex gap-3">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/20 hover:bg-white/[0.06] transition-all duration-200">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-5">{title}</h4>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item.name}>
                    <Link href={item.href}
                      className="text-sm text-zinc-500 hover:text-white transition-colors duration-200 flex items-center gap-1 group">
                      {item.name}
                      {item.href.startsWith("http") && <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-600">© {new Date().getFullYear()} CargoSignal. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-zinc-600">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              All systems operational
            </span>
            <span>·</span>
            <span>GDPR Compliant</span>
            <span>·</span>
            <span>SOC 2 Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
