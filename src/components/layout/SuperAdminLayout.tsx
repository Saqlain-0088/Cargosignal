"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ShieldAlert, LayoutDashboard, Building2, Users, CreditCard,
  ScrollText, Settings, LogOut, Menu, X, Bell, Search,
  ChevronLeft, ChevronRight, Activity, UserCog, Shield
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AdminAuthProvider, useAdminAuth, Permission } from "@/context/AdminAuthContext";
import { ToastProvider } from "@/components/ui/Toast";

const navItems: { name: string; href: string; icon: React.ElementType; permission: Permission }[] = [
  { name: "Dashboard", href: "/superadmin", icon: LayoutDashboard, permission: "dashboard" },
  { name: "Users", href: "/superadmin/users", icon: Users, permission: "users" },
  { name: "Organizations", href: "/superadmin/companies", icon: Building2, permission: "organizations" },
  { name: "Plans", href: "/superadmin/plans", icon: CreditCard, permission: "plans" },
  { name: "Logs", href: "/superadmin/logs", icon: ScrollText, permission: "logs" },
  { name: "Members", href: "/superadmin/members", icon: UserCog, permission: "members" },
  { name: "Roles", href: "/superadmin/roles", icon: Shield, permission: "roles" },
  { name: "Settings", href: "/superadmin/settings", icon: Settings, permission: "settings" },
];

function SuperAdminLayoutInner({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { currentMember, currentRole, logout, hasPermission } = useAdminAuth();

  // Don't wrap login page in the shell
  if (pathname === "/superadmin/login") {
    return <>{children}</>;
  }

  // Show all nav if role not yet resolved (hydration), filter once role is known
  const visibleNav = currentRole ? navItems.filter(item => hasPermission(item.permission)) : navItems;
  const handleLogout = () => { logout(); router.push("/superadmin/login"); };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-slate-200 transition-all duration-300 shadow-sm",
        collapsed ? "w-16" : "w-60",
        mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Logo */}
        <div className={cn("flex items-center gap-3 p-4 border-b border-slate-100 h-16", collapsed && "justify-center")}>
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0 shadow-sm">
            <ShieldAlert className="h-4 w-4 text-white" />
          </div>
          {!collapsed && (
            <div>
              <div className="text-sm font-bold text-slate-800 leading-none">CargoSignal</div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-blue-600">Super Admin</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {visibleNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                  active
                    ? "bg-blue-50 text-blue-700 border border-blue-100"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50",
                  collapsed && "justify-center px-2"
                )}
                title={collapsed ? item.name : undefined}
              >
                <item.icon className={cn("h-4 w-4 shrink-0", active ? "text-blue-600" : "text-slate-400")} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <div className="hidden md:flex p-2 border-t border-slate-100">
          <button onClick={() => setCollapsed(!collapsed)}
            className={cn("flex items-center gap-2 px-3 py-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-all w-full text-sm", collapsed && "justify-center")}>
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <><ChevronLeft className="h-4 w-4" /><span>Collapse</span></>}
          </button>
        </div>

        {/* User */}
        <div className={cn("p-3 border-t border-slate-100 flex items-center gap-3", collapsed && "justify-center")}>
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
            {currentMember?.name.split(" ").map(n => n[0]).join("").slice(0, 2) ?? "SA"}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-slate-800 truncate">{currentMember?.name ?? "Admin"}</div>
              <div className="text-[10px] text-slate-400 truncate">{currentRole?.name ?? "—"}</div>
            </div>
          )}
          {!collapsed && (
            <button onClick={handleLogout} className="text-slate-400 hover:text-red-500 transition-colors" title="Logout">
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </aside>

      {/* Main */}
      <div className={cn("flex-1 flex flex-col min-w-0 transition-all duration-300", collapsed ? "md:ml-16" : "md:ml-60")}>
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 text-slate-500 hover:text-slate-700" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input type="text" placeholder="Search..."
                className="h-9 pl-9 pr-4 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 w-56 transition-all" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs">
              <Activity className="h-3.5 w-3.5 text-green-500" />
              <span className="text-green-600 font-medium">System Online</span>
            </div>
            {currentRole && (
              <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-blue-50 text-blue-700 border border-blue-100">
                {currentRole.name}
              </span>
            )}
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
              {currentMember?.name.split(" ").map(n => n[0]).join("").slice(0, 2) ?? "SA"}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50">
          {children}
        </main>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && <div className="fixed inset-0 z-40 bg-black/30 md:hidden" onClick={() => setMobileOpen(false)} />}
    </div>
  );
}

export function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <ToastProvider>
        <SuperAdminLayoutInner>{children}</SuperAdminLayoutInner>
      </ToastProvider>
    </AdminAuthProvider>
  );
}
