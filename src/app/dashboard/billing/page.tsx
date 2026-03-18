"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import {
  ShieldCheck,
  Zap,
  Package,
  Layers,
  Activity,
  CheckCircle2,
  ArrowUpRight,
  CreditCard,
  Calendar,
  Star
} from "lucide-react";
import { shipments, containers } from "@/mock";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function BillingPage() {
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  const company = {
    plan: "Professional",
    status: "Active",
    renewsAt: "2026-04-10",
    billingEmail: "billing@cargosignal.com",
    usage: {
      shipments: { used: 1240, limit: 5000 },
      containers: { used: 158, limit: 500 },
      alerts: { used: 12, limit: 100 },
    }
  };

  const plans = [
    { name: "Starter", price: "$49", features: ["50 Shipments", "20 Containers", "10 Alerts", "Email Support"], current: false },
    { name: "Professional", price: "$199", features: ["5,000 Shipments", "500 Containers", "100 Alerts", "Priority Support", "Custom Reports"], current: true },
    { name: "Enterprise", price: "Custom", features: ["Unlimited Shipments", "Unlimited Containers", "Unlimited Alerts", "Dedicated Manager", "SLA Guarantee", "SSO & RBAC"], current: false },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 p-base pb-16">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Billing & Subscription</h1>
          <p className="text-slate-500 mt-1 font-medium">Manage your plan, usage limits, and payment details.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Current Plan Card */}
          <Card className="lg:col-span-2 border-none shadow-premium overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-accent to-emerald-500"></div>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">Current Plan</CardTitle>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Your active subscription details</p>
              </div>
              <Badge variant="success" className="bg-emerald-500 text-white border-none px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest shadow-sm">
                {company.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 bg-brand-primary text-white rounded-2xl flex items-center justify-center shadow-lg">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-slate-900 leading-none">{company.plan}</p>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">$199 / month</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 md:ml-auto">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    Renews {format(new Date(company.renewsAt), "MMM dd, yyyy")}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                    <CreditCard className="h-3.5 w-3.5 text-slate-400" />
                    {company.billingEmail}
                  </div>
                </div>
              </div>

              {/* Usage Meters */}
              <div className="space-y-5">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Usage This Period</p>
                {[
                  { label: "Shipments", used: company.usage.shipments.used, limit: company.usage.shipments.limit, icon: Package, color: "bg-blue-500" },
                  { label: "Containers", used: company.usage.containers.used, limit: company.usage.containers.limit, icon: Layers, color: "bg-emerald-500" },
                  { label: "Smart Alerts", used: company.usage.alerts.used, limit: company.usage.alerts.limit, icon: Activity, color: "bg-amber-500" },
                ].map((item, idx) => {
                  const percent = Math.round((item.used / item.limit) * 100);
                  return (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2">
                          <item.icon className="h-4 w-4 text-slate-400" />
                          <span className="text-sm font-bold text-slate-700">{item.label}</span>
                        </div>
                        <span className="text-sm font-black text-slate-900">
                          {item.used.toLocaleString()} <span className="text-slate-400 font-medium text-xs">/ {item.limit.toLocaleString()}</span>
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-1000",
                            percent > 80 ? "bg-rose-500" : percent > 50 ? "bg-amber-500" : item.color
                          )}
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-none shadow-premium">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-slate-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className="w-full bg-slate-900 text-white font-bold h-12 rounded-xl shadow-premium hover:bg-slate-800 transition-all active:scale-[0.98]"
                onClick={() => setUpgradeOpen(true)}
              >
                <Zap className="h-4 w-4 mr-2 fill-current" />
                Upgrade Plan
              </Button>
              <Button variant="secondary" className="w-full font-bold h-12 rounded-xl border-slate-200">
                <CreditCard className="h-4 w-4 mr-2" />
                Update Payment Method
              </Button>
              <Button variant="secondary" className="w-full font-bold h-12 rounded-xl border-slate-200">
                Download Invoices
              </Button>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Plan Benefits</p>
                {["Priority support channel", "Custom analytics reports", "Multi-user team access", "API integrations"].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    {benefit}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upgrade Modal */}
        <Modal isOpen={upgradeOpen} onClose={() => setUpgradeOpen(false)} title="Upgrade Your Plan" className="max-w-2xl">
          <p className="text-sm text-slate-500 mb-6">Choose a plan that fits your logistics scale.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={cn(
                  "relative p-5 rounded-2xl border-2 flex flex-col gap-4 transition-all",
                  plan.current
                    ? "border-brand-accent bg-brand-accent/5 ring-2 ring-brand-accent/10"
                    : "border-slate-200 hover:border-slate-300"
                )}
              >
                {plan.current && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-brand-accent text-white text-[9px] font-bold px-3 py-0.5 rounded-full uppercase tracking-widest shadow-sm">
                    Current
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-black text-slate-900">{plan.name}</h3>
                  <p className="text-2xl font-black text-brand-accent mt-1">{plan.price}<span className="text-xs font-medium text-slate-400">{plan.price !== "Custom" ? "/mo" : ""}</span></p>
                </div>
                <div className="flex-1 space-y-2">
                  {plan.features.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
                <Button
                  className={cn(
                    "w-full font-bold h-10 rounded-xl text-sm",
                    plan.current
                      ? "bg-slate-200 text-slate-500 cursor-default"
                      : "bg-brand-primary text-white hover:bg-slate-800"
                  )}
                  onClick={() => !plan.current && setUpgradeOpen(false)}
                >
                  {plan.current ? "Active" : plan.price === "Custom" ? "Contact Sales" : "Select Plan"}
                </Button>
              </div>
            ))}
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
