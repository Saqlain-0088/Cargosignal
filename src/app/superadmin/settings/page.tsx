"use client";
import { useState } from "react";
import { Settings, Save, Eye, EyeOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  const [systemName, setSystemName] = useState("CargoSignal Platform");
  const [apiKey, setApiKey] = useState("sk-live-xxxxxxxxxxxxxxxxxxxxxxxxxxxx");
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toggles, setToggles] = useState({
    maintenanceMode: false,
    newRegistrations: true,
    emailNotifications: true,
    apiAccess: true,
    twoFactorRequired: false,
    auditLogging: true,
  });

  const toggle = (key: keyof typeof toggles) => setToggles(t => ({ ...t, [key]: !t[key] }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const regenerateKey = () => setApiKey("sk-live-" + Math.random().toString(36).slice(2, 34));

  const toggleLabels: Record<keyof typeof toggles, { label: string; desc: string }> = {
    maintenanceMode: { label: "Maintenance Mode", desc: "Temporarily disable platform access for all users" },
    newRegistrations: { label: "New Registrations", desc: "Allow new users to register on the platform" },
    emailNotifications: { label: "Email Notifications", desc: "Send system emails for alerts and updates" },
    apiAccess: { label: "API Access", desc: "Enable external API access for integrations" },
    twoFactorRequired: { label: "Require 2FA", desc: "Force two-factor authentication for all admin accounts" },
    auditLogging: { label: "Audit Logging", desc: "Log all admin actions for compliance" },
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Settings className="h-6 w-6 text-[#ff6d00]" />
        <div><h1 className="text-2xl font-extrabold text-white">Settings</h1><p className="text-zinc-500 text-sm">Platform configuration and feature toggles.</p></div>
      </div>

      {/* General */}
      <div className="rounded-xl bg-[#1a1a1a] border border-white/10 p-6 space-y-5">
        <h2 className="text-sm font-bold text-white border-b border-white/10 pb-3">General</h2>
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1.5">System Name</label>
          <input value={systemName} onChange={e => setSystemName(e.target.value)}
            className="w-full h-10 px-3 rounded-lg text-sm text-white bg-[#0f0f0f] border border-white/10 outline-none focus:ring-1 focus:ring-[#ff6d00]" />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1.5">Platform API Key</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input type={showKey ? "text" : "password"} value={apiKey} readOnly
                className="w-full h-10 px-3 pr-10 rounded-lg text-sm text-white bg-[#0f0f0f] border border-white/10 outline-none font-mono" />
              <button onClick={() => setShowKey(!showKey)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors">
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <button onClick={regenerateKey} className="flex items-center gap-1.5 h-10 px-3 rounded-lg text-xs text-zinc-400 bg-white/5 border border-white/10 hover:text-white hover:bg-white/10 transition-all">
              <RefreshCw className="h-3.5 w-3.5" /> Regenerate
            </button>
          </div>
          <p className="text-xs text-zinc-600 mt-1.5">Keep this key secret. Regenerating will invalidate the current key.</p>
        </div>
      </div>

      {/* Feature Toggles */}
      <div className="rounded-xl bg-[#1a1a1a] border border-white/10 p-6 space-y-4">
        <h2 className="text-sm font-bold text-white border-b border-white/10 pb-3">Feature Toggles</h2>
        {(Object.keys(toggles) as (keyof typeof toggles)[]).map(key => (
          <div key={key} className="flex items-center justify-between py-2">
            <div>
              <div className="text-sm font-medium text-white">{toggleLabels[key].label}</div>
              <div className="text-xs text-zinc-500 mt-0.5">{toggleLabels[key].desc}</div>
            </div>
            <button onClick={() => toggle(key)}
              className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${toggles[key] ? "bg-[#ff6d00]" : "bg-white/10"}`}>
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${toggles[key] ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button variant="accent" className="gap-2" onClick={handleSave}>
          <Save className="h-4 w-4" />
          {saved ? "Saved!" : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}
