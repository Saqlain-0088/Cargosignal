"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  ShieldAlert, 
  LayoutDashboard, 
  Building2, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell,
  Search,
  Globe,
  Database,
  Cpu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const adminNavItems = [
  { name: "Platform Overview", href: "/superadmin", icon: LayoutDashboard },
  { name: "Companies", href: "/superadmin/companies", icon: Building2 },
  { name: "Global Users", href: "/superadmin/users", icon: Users },
  { name: "System Analytics", href: "/superadmin/analytics", icon: BarChart3 },
];

export function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push("/superadmin/login");
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar for Desktop */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 text-white transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 border-r border-slate-800",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-6">
            <Link href="/superadmin" className="flex items-center gap-3">
              <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-white/10">
                <ShieldAlert className="h-6 w-6 text-slate-950" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter leading-none">CARGOSIGNAL</span>
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-1">Super Admin Panel</span>
              </div>
            </Link>
          </div>

          <div className="px-4 py-2">
             <div className="h-px bg-slate-800/50 w-full mb-6"></div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
            <p className="px-3 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Operations</p>
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all group",
                    isActive 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                      : "text-slate-400 hover:text-white hover:bg-slate-900"
                  )}
                >
                  <Icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-slate-500 group-hover:text-blue-400")} />
                  {item.name}
                </Link>
              );
            })}

            <div className="mt-8 pt-8 border-t border-slate-800/50">
              <p className="px-3 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">System</p>
              <Link
                href="/superadmin/settings"
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-slate-900 text-slate-400 hover:text-white"
                )}
              >
                <Settings className="h-4 w-4" />
                Control Settings
              </Link>
            </div>
          </nav>

          {/* Footer User Profile */}
          <div className="p-4 bg-slate-900/40 border-t border-slate-800">
            <div className="flex items-center gap-3 p-2">
              <div className="h-9 w-9 rounded-full bg-blue-500 flex items-center justify-center font-bold text-sm text-white border-2 border-slate-800 shadow-xl">
                SS
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black text-white truncate">Super Administrator</p>
                <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <div className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse"></div>
                  System Online
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                title="Log Out Root Access"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 z-20">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 uppercase tracking-wider">
               <Globe className="h-3 w-3 text-blue-500" />
               Global Region: All
            </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="hidden sm:flex items-center gap-6 mr-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                   <Database className="h-3.5 w-3.5" />
                   DB: Healthy
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                   <Cpu className="h-3.5 w-3.5" />
                   CPU: 12%
                </div>
             </div>

             <div className="relative">
                <button className="h-9 w-9 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:bg-white hover:shadow-md transition-all">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
             </div>
             <div className="h-8 w-px bg-slate-200 mx-1"></div>
             <Button variant="secondary" className="h-9 gap-2 text-xs font-bold border-slate-300">
                System Status
             </Button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar bg-slate-50/50">
          {children}
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
