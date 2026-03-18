"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { ShieldAlert, Lock, ArrowRight, Loader2 } from "lucide-react";

export default function SuperAdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login delay
    setTimeout(() => {
      router.push("/superadmin");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md z-10 transition-all duration-500 animate-in fade-in zoom-in slide-in-from-bottom-4">
        <div className="flex flex-col items-center mb-8">
          <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20 mb-4 transform hover:rotate-12 transition-transform cursor-pointer">
            <ShieldAlert className="h-10 w-10 text-slate-950" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter">CARGOSIGNAL</h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mt-1">Super Admin Gateway</p>
        </div>

        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white">Admin Authentication</CardTitle>
            <CardDescription className="text-slate-400">Restricted access area. Please enter your root credentials.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">Admin Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="admin@cargosignal.com" 
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-600 focus:ring-blue-500" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-slate-300">Secret Key</Label>
                </div>
                <div className="relative">
                  <Input 
                    id="password" 
                    type="password" 
                    className="bg-slate-800/50 border-slate-700 text-white pl-10 focus:ring-blue-500" 
                    required 
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-white text-slate-950 hover:bg-slate-200 font-black h-11 transition-all"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Access Root Panel
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="mt-8 text-center text-xs text-slate-500 font-medium">
          Secure, encrypted tunnel established. Activity is logged.
        </p>
      </div>
    </div>
  );
}
