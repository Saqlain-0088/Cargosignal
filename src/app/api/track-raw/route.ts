import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const BASE = "https://tracking.timetocargo.com/v1";
const API_KEY = process.env.TIMETOCARGO_API_KEY!;

// Raw passthrough — returns exact API response for debugging
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const containerNumber = searchParams.get("c") ?? "TGBU2056426";

  const url = `${BASE}/container?api_key=${API_KEY}&company=AUTO&container_number=${containerNumber}`;
  
  try {
    const res = await fetch(url, { cache: "no-store" });
    const raw = await res.json();
    return NextResponse.json({ 
      httpStatus: res.status, 
      containerNumber,
      raw 
    }, { 
      headers: { "Content-Type": "application/json" } 
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
