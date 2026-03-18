"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface User {
  id: string;
  email: string;
  name: string;
  companyId?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  register: (name: string, email: string) => Promise<void>;
  logout: () => void;
  updateCompany: (companyId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check localStorage on mount
    const storedUser = localStorage.getItem("cargosignal_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string) => {
    // Mock login logic
    const mockUser: User = { id: "u-123", email, name: "Demo User", companyId: "c-456" };
    localStorage.setItem("cargosignal_user", JSON.stringify(mockUser));
    setUser(mockUser);
    router.push("/dashboard");
  };

  const register = async (name: string, email: string) => {
    // Mock register logic - no company yet
    const newUser: User = { id: `u-${Date.now()}`, email, name };
    localStorage.setItem("cargosignal_user", JSON.stringify(newUser));
    setUser(newUser);
    router.push("/onboarding");
  };

  const logout = () => {
    localStorage.removeItem("cargosignal_user");
    setUser(null);
    router.push("/login");
  };

  const updateCompany = (companyId: string) => {
    if (user) {
      const updatedUser = { ...user, companyId };
      localStorage.setItem("cargosignal_user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout, updateCompany }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
