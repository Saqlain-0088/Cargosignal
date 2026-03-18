import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  BarChart3, 
  Settings,
  Globe,
  Bell,
  Ship,
  FileCheck,
  DollarSign
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Shipments", href: "/dashboard/shipments", icon: Package },
  { name: "Containers", href: "/dashboard/containers", icon: Layers },
  { name: "Alerts", href: "/dashboard/alerts", icon: Bell },
  { name: "Ports", href: "/dashboard/ports", icon: Ship },
  { name: "Customs", href: "/dashboard/customs", icon: FileCheck },
  { name: "Costs", href: "/dashboard/costs", icon: DollarSign },
  { name: "Billing", href: "/dashboard/billing", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r border-slate-200 bg-white">
      <div className="flex h-16 items-center border-b border-slate-200 px-6">
        <Link href="/" className="flex items-center gap-2">
          <Globe className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold tracking-tight text-slate-900">CargoSignal</span>
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="flex-1 space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                    isActive ? "text-blue-700" : "text-slate-400 group-hover:text-slate-500"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="border-t border-slate-200 p-4">
        <div className="rounded-lg bg-slate-50 p-4 text-center border border-slate-100">
          <p className="text-sm font-medium text-slate-900">Need help?</p>
          <p className="mt-1 text-xs text-slate-500">Check our documentation or contact support.</p>
          <Link href="/support" className="mt-3 block text-xs font-semibold text-blue-600 hover:text-blue-500">
            Go to Support →
          </Link>
        </div>
      </div>
    </div>
  );
}
