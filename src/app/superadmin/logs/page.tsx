"use client";
import { useState } from "react";
import { ScrollText, Filter } from "lucide-react";

const allLogs = [
  { id: "1", event: "User Login", user: "john.doe@acme.com", timestamp: "2026-03-26 09:45:12", type: "auth" },
  { id: "2", event: "Plan Upgraded", user: "sarah@logistics.co", timestamp: "2026-03-26 09:30:05", type: "billing" },
  { id: "3", event: "Organization Suspended", user: "admin@cargosignal.com", timestamp: "2026-03-26 08:15:44", type: "admin" },
  { id: "4", event: "API Limit Exceeded", user: "dev@fastship.com", timestamp: "2026-03-26 07:55:22", type: "system" },
  { id: "5", event: "Password Reset", user: "mike@cargoplus.net", timestamp: "2026-03-26 07:20:11", type: "auth" },
  { id: "6", event: "New Shipment Created", user: "ops@globalfreight.com", timestamp: "2026-03-26 06:45:33", type: "shipment" },
  { id: "7", event: "User Suspended", user: "admin@cargosignal.com", timestamp: "2026-03-25 22:10:08", type: "admin" },
  { id: "8", event: "Invoice Generated", user: "billing@acme.com", timestamp: "2026-03-25 20:00:00", type: "billing" },
  { id: "9", event: "API Key Rotated", user: "dev@techlogix.io", timestamp: "2026-03-25 18:30:55", type: "system" },
  { id: "10", event: "Login Failed", user: "unknown@hacker.io", timestamp: "2026-03-25 17:45:01", type: "auth" },
];

const typeColors: Record<string, { bg: string; color: string }> = {
  auth: { bg: "rgba(59,130,246,0.12)", color: "#60a5fa" },
  billing: { bg: "rgba(96,165,250,0.12)", color: "#93c5fd" },
  admin: { bg: "rgba(139,92,246,0.12)", color: "#a78bfa" },
  system: { bg: "rgba(100,116,139,0.12)", color: "#94a3b8" },
  shipment: { bg: "rgba(52,211,153,0.12)", color: "#34d399" },
};

const eventTypes = ["All", "auth", "billing", "admin", "system", "shipment"];
const SA_STYLE = { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(59,130,246,0.12)" };

export default function LogsPage() {
  const [typeFilter, setTypeFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const filtered = allLogs.filter(l => {
    const matchType = typeFilter === "All" || l.type === typeFilter;
    const matchDate = !dateFilter || l.timestamp.startsWith(dateFilter);
    return matchType && matchDate;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <ScrollText className="h-6 w-6" style={{ color: "#60a5fa" }} />
        <div>
          <h1 className="text-2xl font-extrabold text-white">System Logs</h1>
          <p className="text-sm" style={{ color: "#64748b" }}>Audit trail of all platform events.</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" style={{ color: "#64748b" }} />
          <span className="text-xs font-medium" style={{ color: "#64748b" }}>Event Type:</span>
        </div>
        {eventTypes.map(t => (
          <button key={t} onClick={() => setTypeFilter(t)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
            style={typeFilter === t
              ? { background: "linear-gradient(135deg, #2563eb, #1d4ed8)", color: "white" }
              : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(59,130,246,0.15)", color: "#94a3b8" }}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
        <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)}
          className="h-8 px-3 rounded-xl text-xs text-white outline-none"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(59,130,246,0.15)" }} />
        {dateFilter && <button onClick={() => setDateFilter("")} className="text-xs transition-colors" style={{ color: "#64748b" }}>Clear</button>}
      </div>

      <div className="rounded-xl border overflow-hidden" style={SA_STYLE}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(59,130,246,0.12)" }}>
                {["Event", "User", "Timestamp", "Type"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(log => (
                <tr key={log.id} className="transition-colors" style={{ borderBottom: "1px solid rgba(59,130,246,0.06)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(59,130,246,0.04)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "")}>
                  <td className="px-5 py-3 font-medium text-white">{log.event}</td>
                  <td className="px-5 py-3" style={{ color: "#94a3b8" }}>{log.user}</td>
                  <td className="px-5 py-3 font-mono text-xs" style={{ color: "#64748b" }}>{log.timestamp}</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
                      style={typeColors[log.type] ?? { bg: "rgba(100,116,139,0.12)", color: "#94a3b8" }}>
                      {log.type}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={4} className="px-5 py-12 text-center text-sm" style={{ color: "#64748b" }}>No logs match the current filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
