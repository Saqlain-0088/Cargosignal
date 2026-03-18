"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Building2, Globe, ArrowRight } from "lucide-react";

export default function OnboardingPage() {
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const { user, updateCompany } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);

  const handleComplete = () => {
    const mockCompanyId = `c-${Date.now()}`;
    updateCompany(mockCompanyId);
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-xl space-y-8">
        <div className="flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-6 font-bold text-xl">
            {step}/2
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">
            Welcome, {user?.name.split(" ")[0]}!
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Let&apos;s set up your workspace to get you started.
          </p>
        </div>

        <Card className="border-slate-200 shadow-xl overflow-hidden">
          <div className="h-2 bg-slate-100">
            <div 
              className="h-full bg-blue-600 transition-all duration-500" 
              style={{ width: step === 1 ? "50%" : "100%" }}
            ></div>
          </div>
          <CardHeader>
            <CardTitle className="text-xl">
              {step === 1 ? "Company Profile" : "Logistics Preferences"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {step === 1 ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    placeholder="Acme Logistics Inc."
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Manufacturing", "Retail", "Wholesale", "Pharma", "Electronics", "Automotive"].map((ind) => (
                      <button
                        key={ind}
                        onClick={() => setIndustry(ind)}
                        className={`px-4 py-2 text-sm rounded-md border text-left transition-colors ${
                          industry === ind 
                            ? "bg-blue-50 border-blue-600 text-blue-600 ring-1 ring-blue-600" 
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                </div>
                <Button 
                  className="w-full mt-6" 
                  disabled={!companyName || !industry}
                  onClick={() => setStep(2)}
                >
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4">
                  <p className="text-sm font-medium text-slate-700">What are your primary tracking needs?</p>
                  <div className="space-y-3">
                    {[
                      "Ocean freight visibility",
                      "Customs status monitoring",
                      "Demurrage cost control",
                      "Carrier performance analytics"
                    ].map((pref) => (
                      <div key={pref} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                        <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600" id={pref} />
                        <label htmlFor={pref} className="text-sm text-slate-600">{pref}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="secondary" className="flex-1" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button className="flex-[2]" onClick={handleComplete}>
                    Complete Setup
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
