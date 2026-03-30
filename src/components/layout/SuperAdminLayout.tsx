"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ShieldAlert, LayoutDashboard, Building2, Users, CreditCard,
  ScrollText, Settings, LogOut, Menu, X, Bell, Search,
  UserCog, Shield, Pin, Globe, User as UserIcon
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

function SuperAdminSidebar() {
  const pathname = usePathname();
  const [isPinned, setIsPinned] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const { currentRole, hasPermission } = useAdminAuth();

  const isExpanded = isPinned || isHovered;
  const visibleNav = currentRole ? navItems.filter(item => hasPermission(item.permission)) : navItems;

  return (
    <div
      className={cn(
        "relative flex h-full flex-col border-r border-slate-200 bg-white transition-all duration-300 ease-in-out",
        isExpanded ? "w-64" : "w-16"
      )}
      onMouseEnter={() => !isPinned && setIsHovered(true)}
      onMouseLeave={() => !isPinned && setIsHovered(false)}
    >
      {/* Logo */}
      <div className={cn(
        "flex h-16 items-center border-b border-slate-200 transition-all duration-300",
        isExpanded ? "justify-between px-6" : "justify-center px-0"
      )}>
        <Link href="/superadmin" className={cn(
          "flex items-center gap-2 overflow-hidden transition-all duration-300",
          !isExpanded && "w-0 opacity-0"
        )}>
          <ShieldAlert className="h-6 w-6 text-blue-600 flex-shrink-0" />
          <div className="whitespace-nowrap">
            <div className="text-sm font-bold text-slate-900 leading-none">CargoSignal</div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-blue-600">Super Admin</div>
          </div>
        </Link>
        {!isExpanded && <ShieldAlert className="h-6 w-6 text-blue-600 flex-shrink-0" />}

        <button
          className={cn(
            "h-8 w-8 flex items-center justify-center rounded-full text-slate-500 hover:text-slate-900 transition-all duration-300",
            !isExpanded && "absolute -right-4 top-4 z-50 bg-white border border-slate-200 shadow-sm"
          )}
          onClick={() => setIsPinned(!isPinned)}
          title={isPinned ? "Unpin sidebar" : "Pin sidebar"}
        >
          <Pin className={cn("h-4 w-4", isPinned ? "fill-blue-600 text-blue-600 rotate-45" : "")} />
        </button>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto py-4 overflow-x-hidden">
        <nav className="flex-1 space-y-1 px-3">
          {visibleNav.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/superadmin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
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

      {/* Help box */}
      <div className={cn(
        "border-t border-slate-200 p-4 transition-all duration-300 overflow-hidden",
        !isExpanded && "h-0 p-0 opacity-0"
      )}>
        <div className="rounded-lg bg-slate-50 p-4 text-center border border-slate-100">
          <p className="text-sm font-medium text-slate-900">Admin Portal</p>
          <p className="mt-1 text-xs text-slate-500">Manage platform settings and users.</p>
          <Link href="/superadmin/settings" className="mt-3 block text-xs font-semibold text-blue-600 hover:text-blue-500">
            Go to Settings →
          </Link>
        </div>
      </div>
    </div>
  );
}

function SuperAdminHeader() {
  const router = useRouter();
  const { currentMember, currentRole, logout } = useAdminAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/superadmin/login");
  };

  const initials = currentMember?.name.split(" ").map(n => n[0]).join("").slice(0, 2) ?? "SA";

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      {/* Mobile menu button */}
      <button
        className="md:hidden p-2 text-slate-500 hover:text-slate-700"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        {/* Search */}
        <form className="relative flex flex-1" action="#" method="GET">
          <label htmlFor="sa-search" className="sr-only">Search</label>
          <Search className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-slate-400" />
          <input
            id="sa-search"
            className="block h-full w-full border-0 py-0 pl-8 pr-0 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm bg-transparent"
            placeholder="Search users, organizations, logs..."
            type="search"
          />
        </form>

        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Role badge */}
          {currentRole && (
            <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-blue-50 text-blue-700 border border-blue-100">
              {currentRole.name}
            </span>
          )}

          {/* Bell */}
          <button type="button" className="-m-2.5 p-2.5 text-slate-400 hover:text-slate-500 relative">
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-500 rounded-full" />
          </button>

          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-slate-200" />

          {/* Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              type="button"
              className="-m-1.5 flex items-center p-1.5"
            >
              <span className="sr-only">Open user menu</span>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200 text-xs">
                {initials}
              </div>
              <span className="hidden lg:flex lg:items-center">
                <span className="ml-4 text-sm font-semibold leading-6 text-slate-900">
                  {currentMember?.name ?? "Admin"}
                </span>
              </span>
            </button>

            {dropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                <div className="absolute right-0 z-20 mt-2.5 w-52 origin-top-right rounded-xl bg-white py-2 shadow-lg ring-1 ring-slate-900/5">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-900 truncate">{currentMember?.name ?? "Admin"}</p>
                    <p className="text-xs text-slate-500 truncate">{currentMember?.email ?? ""}</p>
                  </div>
                  <Link href="/superadmin" onClick={() => setDropdownOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <UserIcon className="mr-3 h-4 w-4 text-slate-400" />
                    Profile
                  </Link>
                  <Link href="/superadmin/settings" onClick={() => setDropdownOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <Settings className="mr-3 h-4 w-4 text-slate-400" />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
                  >
                    <LogOut className="mr-3 h-4 w-4 text-red-500" />
                    Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function SuperAdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Don't wrap login page in the shell
  if (pathname === "/superadmin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <SuperAdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <SuperAdminHeader />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
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
