/**
 * Centralized tracking auth guard.
 * Use this in any component that has a tracking form.
 *
 * Usage:
 *   import { guardedTrack, restorePendingTracking } from "@/lib/trackingGuard";
 *
 *   // On form submit:
 *   guardedTrack(containerId, isAuthenticated, router);
 *
 *   // On page mount (after auth):
 *   const pending = restorePendingTracking();
 *   if (pending) { setTrackingId(pending); triggerTrack(); }
 */

const STORAGE_KEY = "cs_pending_tracking_id";

/**
 * Call on any tracking form submit.
 * - If authenticated: returns true (caller should proceed with tracking)
 * - If not authenticated: saves containerId to localStorage, redirects to /register, returns false
 */
export function guardedTrack(
  containerId: string,
  isAuthenticated: boolean,
  push: (path: string) => void
): boolean {
  if (!containerId.trim()) return false; // no ID — do nothing

  if (isAuthenticated) return true; // proceed normally

  // Not authenticated — save and redirect
  localStorage.setItem(STORAGE_KEY, containerId.trim());
  push("/register?redirect=tracking");
  return false;
}

/**
 * Call on mount of any tracking page/component after auth resolves.
 * Returns the stored container ID and clears it, or null if none.
 */
export function restorePendingTracking(): string | null {
  if (typeof window === "undefined") return null;
  const pending = localStorage.getItem(STORAGE_KEY);
  if (pending) {
    localStorage.removeItem(STORAGE_KEY);
    return pending;
  }
  return null;
}

/**
 * Check if there's a pending tracking ID without consuming it.
 */
export function hasPendingTracking(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem(STORAGE_KEY);
}

/**
 * Clear any stored tracking ID (e.g. if user cancels auth).
 */
export function clearPendingTracking(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
}
