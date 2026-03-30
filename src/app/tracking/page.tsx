"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Tracking is now inline on the homepage — redirect all /tracking traffic there
export default function TrackingPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  }, [router]);
  return null;
}
