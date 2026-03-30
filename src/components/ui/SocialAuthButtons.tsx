"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { validators } from "@/lib/validation";

// Google SVG icon
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}

interface SocialAuthButtonsProps {
  mode: "login" | "register";
  showMagicLink?: boolean;
}

export default function SocialAuthButtons({ mode, showMagicLink = false }: SocialAuthButtonsProps) {
  const { loginWithGoogle, registerWithGoogle, sendMagicLink } = useAuth();
  const { success, error, warning } = useToast();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [magicEmail, setMagicEmail] = useState("");
  const [magicLoading, setMagicLoading] = useState(false);
  const [magicSent, setMagicSent] = useState(false);
  const [showMagicForm, setShowMagicForm] = useState(false);

  const handleGoogle = async () => {
    if (googleLoading) return;
    setGoogleLoading(true);
    try {
      if (mode === "login") await loginWithGoogle();
      else await registerWithGoogle();
      success("Signed in with Google!", "Redirecting to your dashboard...");
    } catch {
      error("Google sign-in failed", "Please try again or use email/password.");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailErr = validators.email(magicEmail);
    if (emailErr !== true) { warning("Invalid email", emailErr); return; }
    if (magicLoading || magicSent) return;
    setMagicLoading(true);
    try {
      await sendMagicLink(magicEmail);
      setMagicSent(true);
      success("Magic link sent!", `Check ${magicEmail} — you'll be signed in automatically.`);
    } catch {
      error("Failed to send link", "Please try again.");
    } finally {
      setMagicLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* Google button */}
      <motion.button
        type="button"
        onClick={handleGoogle}
        disabled={googleLoading}
        whileHover={!googleLoading ? { scale: 1.01 } : {}}
        whileTap={!googleLoading ? { scale: 0.99 } : {}}
        className="w-full h-12 rounded-xl flex items-center justify-center gap-3 text-sm font-semibold text-white border border-white/15 bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {googleLoading
          ? <Loader2 className="h-4 w-4 animate-spin" />
          : <GoogleIcon />}
        <span>{googleLoading ? "Connecting..." : `Continue with Google`}</span>
      </motion.button>

      {/* Magic link */}
      {showMagicLink && (
        <>
          {!showMagicForm ? (
            <motion.button
              type="button"
              onClick={() => setShowMagicForm(true)}
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              className="w-full h-12 rounded-xl flex items-center justify-center gap-3 text-sm font-semibold text-white border border-white/15 bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/25 transition-all"
            >
              <Mail className="h-4 w-4 text-zinc-400" />
              Continue with Email Link
            </motion.button>
          ) : (
            <motion.form
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              onSubmit={handleMagicLink}
              className="rounded-xl border border-white/15 bg-white/[0.03] p-4 space-y-3"
            >
              <p className="text-xs text-zinc-400">Enter your email and we'll send a magic sign-in link.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={magicEmail}
                  onChange={e => setMagicEmail(e.target.value)}
                  placeholder="name@company.com"
                  disabled={magicSent}
                  className="flex-1 h-10 px-3 rounded-lg text-sm text-white placeholder:text-zinc-600 bg-white/5 border border-white/10 outline-none focus:ring-1 focus:ring-blue-500/50 disabled:opacity-50"
                />
                <button type="submit" disabled={magicLoading || magicSent}
                  className="h-10 px-4 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-1.5">
                  {magicLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : magicSent ? "Sent ✓" : "Send"}
                </button>
              </div>
              {magicSent && (
                <p className="text-xs text-green-400 flex items-center gap-1.5">
                  ✓ Link sent — check your inbox. You'll be signed in automatically.
                </p>
              )}
              <button type="button" onClick={() => { setShowMagicForm(false); setMagicSent(false); setMagicEmail(""); }}
                className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
                ← Back
              </button>
            </motion.form>
          )}
        </>
      )}

      {/* Divider */}
      <div className="flex items-center gap-3 py-1">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-xs text-zinc-600 font-medium uppercase tracking-wider">or</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>
    </div>
  );
}
