"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface SAModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
}

export default function SAModal({ open, onClose, title, children, width = "max-w-lg" }: SAModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 backdrop-blur-sm" style={{ background: "rgba(2,13,26,0.8)" }} onClick={onClose} />
      <div className={`relative w-full ${width} rounded-2xl border shadow-2xl`}
        style={{ background: "#030f1f", borderColor: "rgba(59,130,246,0.2)", boxShadow: "0 0 60px rgba(37,99,235,0.15)" }}>
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: "rgba(59,130,246,0.15)" }}>
          <h2 className="text-base font-bold text-white">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-zinc-500 hover:text-white transition-all"
            style={{ background: "rgba(255,255,255,0.05)" }}>
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
