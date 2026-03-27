/**
 * Centralized tracking auth guard.
 *
 * Usage in any component with a tracking form:
 *
 *   import { guardedTrack, restorePendingTracking } from "@/lib/trackingGuard";
 *
 *   // On form submit (homepage, tracking page, etc.):
 *   guardedTrack(containerId, isAuthenticated, router.push);
 *   // → if not authed: saves ID to sessionStorage, redirects to /register
 *   // → if authed: redirects to /tracking with the ID
 *
 *   // On /tracking page mount:
 *   const pending = restorePendingTracking();
 *   if (pending) { setTrackingId(pending); triggerTrack(); }
 */

const STORAGE_KEY = "cs_pending_tracking_id";

/**
 * Main guard — call on ANY tracking form submit across the project.
 * - Empty input → does nothing, returns false
 * - Not authenticated → saves ID, redirects to /register, returns false
 * - Authenticated → redirects to /tracking with ID, returns false
 *   (tracking page handles the actual display)
 */
export function guardedTrack(
  containerId: string,
  isAuthenticated: boolean,
  push: (path: string) => void
): void {
  const id = containerId.trim();
  if (!id) return; // empty input — do nothing

  if (!isAuthenticated) {
    // Save and send to register — do NOT go to tracking page
    sessionStorage.setItem(STORAGE_KEY, id);
    push("/register");
    return;
  }

  // Authenticated — go to tracking page with the ID
  sessionStorage.setItem(STORAGE_KEY, id);
  push("/tracking");
}

/**
 * Call on /tracking page mount after auth resolves.
 * Returns the stored container ID and clears it, or null if none.
 */
export function restorePendingTracking(): string | null {
  if (typeof window === "undefined") return null;
  const pending = sessionStorage.getItem(STORAGE_KEY);
  if (pending) {
    sessionStorage.removeItem(STORAGE_KEY);
    return pending;
  }
  return null;
}

/**
 * Clear any stored tracking ID (e.g. after successful result shown).
 */
export function clearPendingTracking(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(STORAGE_KEY);
  }
}
