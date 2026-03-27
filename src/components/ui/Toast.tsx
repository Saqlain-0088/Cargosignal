"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, AlertTriangle, X } from "lucide-react";

type ToastType = "success" | "error" | "warning";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextType {
  toast: (type: ToastType, title: string, message?: string) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

const styles: Record<ToastType, { bg: string; border: string; icon: string; Icon: typeof CheckCircle2 }> = {
  success: { bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.3)", icon: "#10b981", Icon: CheckCircle2 },
  error:   { bg: "rgba(239,68,68,0.1)",  border: "rgba(239,68,68,0.3)",  icon: "#ef4444", Icon: XCircle },
  warning: { bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)", icon: "#f59e0b", Icon: AlertTriangle },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts(t => t.filter(x => x.id !== id));
  }, []);

  const toast = useCallback((type: ToastType, title: string, message?: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(t => [...t, { id, type, title, message }]);
    setTimeout(() => dismiss(id), 4000);
  }, [dismiss]);

  const success = useCallback((title: string, msg?: string) => toast("success", title, msg), [toast]);
  const error   = useCallback((title: string, msg?: string) => toast("error",   title, msg), [toast]);
  const warning = useCallback((title: string, msg?: string) => toast("warning", title, msg), [toast]);

  return (
    <ToastContext.Provider value={{ toast, success, error, warning }}>
      {children}
      {/* Toast container */}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 pointer-events-none" style={{ maxWidth: 360 }}>
        <AnimatePresence>
          {toasts.map(t => {
            const s = styles[t.type];
            return (
              <motion.div key={t.id}
                initial={{ opacity: 0, x: 60, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 60, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="pointer-events-auto flex items-start gap-3 px-4 py-3.5 rounded-xl border backdrop-blur-xl shadow-2xl"
                style={{ background: s.bg, borderColor: s.border }}>
                <s.Icon className="h-5 w-5 shrink-0 mt-0.5" style={{ color: s.icon }} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white">{t.title}</div>
                  {t.message && <div className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{t.message}</div>}
                </div>
                <button onClick={() => dismiss(t.id)} className="text-zinc-500 hover:text-white transition-colors shrink-0">
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
