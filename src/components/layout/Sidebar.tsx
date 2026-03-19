"use client";

import React, { useState, useEffect } from "react";
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
  DollarSign,
  Pin
} from "lucide-react";
import { Button } from "@/components/ui/Button";

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
  const [isPinned, setIsPinned] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  // Load persistence state from localStorage
  useEffect(() => {
    const savedPinnedState = localStorage.getItem("sidebarPinned");
    if (savedPinnedState !== null) {
      setIsPinned(JSON.parse(savedPinnedState));
    }
    setIsMounted(true);
  }, []);

  // Save state to localStorage when it changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("sidebarPinned", JSON.stringify(isPinned));
    }
  }, [isPinned, isMounted]);

  const isExpanded = isPinned || isHovered;

  // Avoid hydration mismatch by not rendering anything with client-state until mounted
  // Alternatively, just render the default state and let useEffect update it
  // But for smooth UX, we can use a CSS variable or a class on body to avoid flicker
  // For now, let's keep it simple.

  return (
    <div 
      className={cn(
        "relative flex h-full flex-col border-r border-slate-200 bg-white transition-all duration-300 ease-in-out",
        isExpanded ? "w-64" : "w-16"
      )}
      onMouseEnter={() => !isPinned && setIsHovered(true)}
      onMouseLeave={() => !isPinned && setIsHovered(false)}
    >
      <div className={cn(
        "flex h-16 items-center border-b border-slate-200 transition-all duration-300",
        isExpanded ? "justify-between px-6" : "justify-center px-0"
      )}>
        <Link href="/" className={cn(
          "flex items-center gap-2 overflow-hidden transition-all duration-300",
          !isExpanded && "w-0 opacity-0"
        )}>
          <Globe className="h-6 w-6 text-blue-600 flex-shrink-0" />
          <span className="text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap">CargoSignal</span>
        </Link>
        {!isExpanded && <Globe className="h-6 w-6 text-blue-600 flex-shrink-0" />}
        
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 text-slate-500 hover:text-slate-900 transition-all duration-300",
            !isExpanded && "absolute -right-4 top-4 z-50 bg-white border border-slate-200 shadow-sm rounded-full h-8 w-8 flex"
          )}
          onClick={() => setIsPinned(!isPinned)}
          title={isPinned ? "Unpin sidebar" : "Pin sidebar"}
        >
          {isPinned ? (
            <Pin className="h-4 w-4 fill-blue-600 text-blue-600 rotate-45" />
          ) : (
            <Pin className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 overflow-x-hidden">
        <nav className="flex-1 space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                  !isExpanded && "justify-center px-0"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 flex-shrink-0 transition-colors",
                    isActive ? "text-blue-700" : "text-slate-400 group-hover:text-slate-500",
                    isExpanded ? "mr-3" : "mr-0"
                  )}
                  aria-hidden="true"
                />
                <span className={cn(
                  "transition-all duration-300 whitespace-nowrap overflow-hidden",
                  isExpanded ? "w-auto opacity-100" : "w-0 opacity-0"
                )}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className={cn(
        "border-t border-slate-200 p-4 transition-all duration-300 overflow-hidden",
        !isExpanded && "h-0 p-0 opacity-0"
      )}>
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
