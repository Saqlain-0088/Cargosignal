"use client";
import { useState } from "react";
import { Settings, Save, Eye, EyeOff, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

const SA_STYLE = { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(59,130,246,0.12)" };
const inputStyle = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(59,130,246,0.2)" };

const toggleLabels: Record<string, { label: string; desc: string }> = {
  maintenanceMode: { label: "Maintenance Mode", desc: "Temporarily disable platform access for all users" },
  newRegistrations: { label: "New Registrations", desc: "Allow new users to register on the platform" },
  emailNotifications: { label: "Email Notifications", desc: "Send system emails for alerts and updates" },
  apiAccess: { label: "API Access", desc: "Enable external API access for integrations" },
  twoFactorRequired: { label: "Require 2FA", desc: "Force two-factor authentication for all admin accounts" },
  auditLogging: { label: "Audit Logging", desc: "Log all admin actions for compliance" },
};

export default function SettingsPage() {
  const [systemName, setSystemName] = useState("CargoSignal Platform");
  const [systemNameError, setSystemNameError] = useState("");
  const [apiKey, setApiKey] = useState("sk-live-xxxxxxxxxxxxxxxxxxxxxxxxxxxx");
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toggles, setToggles] = useState({
    maintenanceMode: false, newRegistrations: true, emailNotifications: true,
    apiAccess: true, twoFactorRequired: false, auditLogging: true,
  });
  const { success, error, warning } = useToast();

  const toggle = (key: keyof typeof toggles) => {
    const newVal = !toggles[key];
    setToggles(t => ({ ...t, [key]: newVal }));
    const label = toggleLabels[key].label;
    newVal
      ? success(`${label} enabled`, `${label} has been turned on.`)
      : warning(`${label} disabled`, `${label} has been turned off.`);
  };

  const handleSave = () => {
    if (!systemName.trim()) { setSystemNameError("System name is required"); error("Validation failed", "Please fix the highlighted fields."); return; }
    if (systemName.trim().length < 3) { setSystemNameError("System name must be at least 3 characters"); error("Validation failed", "System name is too short."); return; }
    setSystemNameError("");
    setSaved(true);
    success("Settings saved!", "Your platform settings have been updated successfully.");
    setTimeout(() => setSaved(false), 3000);
  };

  const regenerateKey = () => {
    const newKey = "sk-live-" + Math.random().toString(36).slice(2, 34);
    setApiKey(newKey);
    warning("API Key regenerated", "The old key is now invalid. Update your integrations.");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Settings className="h-6 w-6" style={{ color: "#60a5fa" }} />
        <div>
          <h1 className="text-2xl font-extrabold text-white">Settings</h1>
          <p className="text-sm" style={{ color: "#64748b" }}>Platform configuration and feature toggles.</p>
        </div>
      </div>

      {/* General */}
      <div className="rounded-xl border p-6 space-y-5" style={SA_STYLE}>
        <h2 className="text-sm font-bold text-white border-b pb-3" style={{ borderColor: "rgba(59,130,246,0.15)" }}>General</h2>
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>System Name *</label>
          <input value={systemName} onChange={e => { setSystemName(e.target.value); setSystemNameError(""); }}
            className="w-full h-10 px-3 rounded-xl text-sm text-white outline-none transition-all"
            style={{ ...inputStyle, ...(systemNameError ? { border: "1px solid #f87171" } : {}) }} />
          {systemNameError && <p className="flex items-center gap-1 text-xs text-red-400 mt-1"><AlertCircle className="h-3 w-3" />{systemNameError}</p>}
        </div>
        <div>
          <label className="block text-xs font-medium mb-1.5" style={{ color: "#94a3b8" }}>Platform API Key</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input type={showKey ? "text" : "password"} value={apiKey} readOnly
                className="w-full h-10 px-3 pr-10 rounded-xl text-sm text-white font-mono outline-none"
                style={inputStyle} />
              <button onClick={() => setShowKey(!showKey)} className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: "#64748b" }}>
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <button onClick={regenerateKey} className="flex items-center gap-1.5 h-10 px-3 rounded-xl text-xs font-medium transition-all"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(59,130,246,0.2)", color: "#94a3b8" }}>
              <RefreshCw className="h-3.5 w-3.5" /> Regenerate
            </button>
          </div>
          <p className="text-xs mt-1.5" style={{ color: "#475569" }}>Keep this key secret. Regenerating will invalidate the current key.</p>
        </div>
      </div>

      {/* Feature Toggles */}
      <div className="rounded-xl border p-6 space-y-4" style={SA_STYLE}>
        <h2 className="text-sm font-bold text-white border-b pb-3" style={{ borderColor: "rgba(59,130,246,0.15)" }}>Feature Toggles</h2>
        {(Object.keys(toggles) as (keyof typeof toggles)[]).map(key => (
          <div key={key} className="flex items-center justify-between py-2">
            <div>
              <div className="text-sm font-medium text-white">{toggleLabels[key].label}</div>
              <div className="text-xs mt-0.5" style={{ color: "#64748b" }}>{toggleLabels[key].desc}</div>
            </div>
            <button onClick={() => toggle(key)}
              className="w-11 h-6 rounded-full transition-colors relative shrink-0"
              style={{ background: toggles[key] ? "#2563eb" : "rgba(255,255,255,0.1)" }}>
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${toggles[key] ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave}
          className="flex items-center gap-2 h-10 px-6 rounded-xl text-sm font-semibold text-white transition-all"
          style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)", boxShadow: "0 4px 16px rgba(37,99,235,0.3)" }}>
          {saved ? <><CheckCircle2 className="h-4 w-4" /> Saved!</> : <><Save className="h-4 w-4" /> Save Settings</>}
        </button>
      </div>
    </div>
  );
}
