const KEY = "pending_track";

/** Store container number before redirecting to auth */
export function storePendingTrack(id: string) {
  sessionStorage.setItem(KEY, id);
}

/** Retrieve and clear stored container number after auth */
export function consumePendingTrack(): string | null {
  if (typeof window === "undefined") return null;
  const val = sessionStorage.getItem(KEY);
  if (val) sessionStorage.removeItem(KEY);
  return val;
}

/** Check without consuming */
export function hasPendingTrack(): boolean {
  if (typeof window === "undefined") return false;
  return !!sessionStorage.getItem(KEY);
}
