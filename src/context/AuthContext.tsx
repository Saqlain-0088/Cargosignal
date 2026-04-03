"use client";

import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { getPendingTracking, clearPendingTracking } from "@/lib/trackingService";

export type AuthProvider = "email" | "google" | "magic_link";

interface User {
  id: string;
  email: string;
  name: string;
  companyId?: string;
  provider?: AuthProvider;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  sendMagicLink: (email: string) => Promise<void>;
  register: (name: string, email: string, password?: string) => Promise<void>;
  registerWithGoogle: () => Promise<void>;
  logout: () => void;
  updateCompany: (companyId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getInitialUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("cargosignal_user");
    return stored ? JSON.parse(stored) : null;
  } catch { return null; }
}

function saveUser(user: User) {
  localStorage.setItem("cargosignal_user", JSON.stringify(user));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(getInitialUser);
  const [isLoading] = useState(false);
  const router = useRouter();

  // Shared post-auth redirect logic
  const afterAuth = async (u: User) => {
    saveUser(u);
    setUser(u);

    const pending = getPendingTracking();
    if (pending) {
      clearPendingTracking();
      // Redirect to dashboard tracking page with the container pre-filled
      router.push(`/dashboard/tracking?q=${encodeURIComponent(pending)}`);
    } else {
      router.push("/dashboard");
    }
  };

  // ── Email + Password ──────────────────────────────────────────────────────
  const login = async (email: string, _password?: string) => {
    // Mock: accept any credentials
    const u: User = { id: "u-123", email, name: "Demo User", companyId: "c-456", provider: "email" };
    afterAuth(u);
  };

  const register = async (name: string, email: string, _password?: string) => {
    const u: User = { id: `u-${Date.now()}`, email, name, provider: "email" };
    await afterAuth(u);
  };

  // ── Google OAuth (mock — real impl needs NextAuth/Supabase) ───────────────
  const loginWithGoogle = async () => {
    // Simulate OAuth popup delay
    await new Promise(r => setTimeout(r, 1200));
    const u: User = {
      id: `g-${Date.now()}`,
      email: "demo@gmail.com",
      name: "Google User",
      provider: "google",
      avatar: "https://lh3.googleusercontent.com/a/default-user",
    };
    afterAuth(u);
  };

  const registerWithGoogle = async () => {
    await loginWithGoogle(); // same flow — create or link
  };

  // ── Magic Link (mock) ─────────────────────────────────────────────────────
  const sendMagicLink = async (email: string) => {
    // In production: call API to send magic link email
    // Here we simulate the send and auto-login after delay
    await new Promise(r => setTimeout(r, 800));
    // Store email so the magic link callback page can use it
    if (typeof window !== "undefined") {
      sessionStorage.setItem("magic_link_email", email);
    }
    // Mock: auto-login after 2s (simulates clicking the link)
    setTimeout(() => {
      const u: User = { id: `ml-${Date.now()}`, email, name: email.split("@")[0], provider: "magic_link" };
      afterAuth(u);
    }, 2000);
  };

  // ── Logout ────────────────────────────────────────────────────────────────
  const logout = () => {
    localStorage.removeItem("cargosignal_user");
    setUser(null);
    router.push("/login");
  };

  const updateCompany = (companyId: string) => {
    if (user) {
      const updated = { ...user, companyId };
      saveUser(updated);
      setUser(updated);
    }
  };

  return (
    <AuthContext.Provider value={{
      user, isAuthenticated: !!user, isLoading,
      login, loginWithGoogle, sendMagicLink,
      register, registerWithGoogle,
      logout, updateCompany,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
