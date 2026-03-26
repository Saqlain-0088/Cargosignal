import Link from "next/link";
import { Globe, Mail, Phone } from "lucide-react";

export function LightFooter() {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-[#ff6d00] p-1.5 rounded-lg"><Globe className="h-5 w-5 text-white" /></div>
            <span className="text-lg font-extrabold text-white">CargoSignal</span>
          </Link>
          <p className="text-sm leading-relaxed max-w-xs">Intelligent supply chain visibility for modern logistics teams.</p>
        </div>
        {[
          { title: "Product", links: [{ l: "Features", h: "/#features" }, { l: "Pricing", h: "/pricing" }, { l: "Integrations", h: "/services" }, { l: "Changelog", h: "/blog" }] },
          { title: "Company", links: [{ l: "About", h: "/about" }, { l: "Blog", h: "/blog" }, { l: "Careers", h: "#" }, { l: "Contact", h: "/contact" }] },
          { title: "Legal", links: [{ l: "Privacy Policy", h: "#" }, { l: "Terms of Service", h: "#" }, { l: "GDPR", h: "#" }, { l: "Security", h: "#" }] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">{col.title}</h4>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.l}><Link href={link.h} className="text-sm hover:text-[#ff6d00] transition-colors duration-200">{link.l}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> support@cargosignal.com</span>
          <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> +1 (555) 123-4567</span>
        </div>
        <span>© {new Date().getFullYear()} CargoSignal. All Rights Reserved.</span>
      </div>
    </footer>
  );
}
