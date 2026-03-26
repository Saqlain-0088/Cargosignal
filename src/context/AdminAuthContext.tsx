"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Permission =
  | "dashboard" | "users" | "organizations" | "plans"
  | "logs" | "settings" | "members" | "roles";

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
  color: string;
}

export interface AdminMember {
  id: string;
  name: string;
  email: string;
  roleId: string;
  status: "active" | "inactive";
  joinedAt: string;
}

export const DEFAULT_ROLES: Role[] = [
  {
    id: "superadmin",
    name: "SuperAdmin",
    color: "#ff6d00",
    permissions: ["dashboard","users","organizations","plans","logs","settings","members","roles"],
  },
  {
    id: "admin",
    name: "Admin",
    color: "#3b82f6",
    permissions: ["dashboard","users","organizations","plans","logs"],
  },
  {
    id: "viewer",
    name: "Viewer",
    color: "#10b981",
    permissions: ["dashboard","organizations"],
  },
];

export const MOCK_MEMBERS: AdminMember[] = [
  { id: "1", name: "Super Admin", email: "admin@cargosignal.com", roleId: "superadmin", status: "active", joinedAt: "2024-01-01" },
  { id: "2", name: "Alice Johnson", email: "alice@cargosignal.com", roleId: "admin", status: "active", joinedAt: "2024-03-15" },
  { id: "3", name: "Bob Smith", email: "bob@cargosignal.com", roleId: "viewer", status: "active", joinedAt: "2024-06-20" },
  { id: "4", name: "Carol White", email: "carol@cargosignal.com", roleId: "admin", status: "inactive", joinedAt: "2024-08-10" },
];

interface AdminAuthContextType {
  currentMember: AdminMember | null;
  currentRole: Role | null;
  roles: Role[];
  members: AdminMember[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  hasPermission: (p: Permission) => boolean;
  setRoles: (r: Role[]) => void;
  setMembers: (m: AdminMember[]) => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [currentMember, setCurrentMember] = useState<AdminMember | null>(null);
  const [roles, setRoles] = useState<Role[]>(DEFAULT_ROLES);
  const [members, setMembers] = useState<AdminMember[]>(MOCK_MEMBERS);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("sa_member") : null;
    if (stored) {
      try { setCurrentMember(JSON.parse(stored)); } catch {}
    }
  }, []);

  const currentRole = currentMember ? roles.find(r => r.id === currentMember.roleId) ?? null : null;

  const login = (email: string, password: string): boolean => {
    if (email === "admin@cargosignal.com" && password === "admin123") {
      const member = members.find(m => m.email === email) ?? members[0];
      setCurrentMember(member);
      localStorage.setItem("sa_member", JSON.stringify(member));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentMember(null);
    localStorage.removeItem("sa_member");
  };

  const hasPermission = (p: Permission): boolean => {
    if (!currentRole) return false;
    return currentRole.permissions.includes(p);
  };

  return (
    <AdminAuthContext.Provider value={{ currentMember, currentRole, roles, members, login, logout, hasPermission, setRoles, setMembers }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
