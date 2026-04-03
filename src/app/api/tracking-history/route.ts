import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET /api/tracking-history?userId=xxx — fetch user's search history
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });

  try {
    const searches = await prisma.trackingSearch.findMany({
      where: { userId },
      orderBy: { searchedAt: "desc" },
      take: 20,
    });
    return NextResponse.json(searches);
  } catch (err) {
    console.error("[tracking-history GET]", err);
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}

// POST /api/tracking-history — save a search
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, containerNumber, carrier, origin, destination, status, vessel, eta } = body;

    if (!userId || !containerNumber) {
      return NextResponse.json({ error: "userId and containerNumber required" }, { status: 400 });
    }

    // Upsert — update if same user+container already exists, else create
    const record = await prisma.trackingSearch.upsert({
      where: {
        // Use a compound unique — we'll add it via the index
        // Fallback: find existing and update, or create new
        id: (await prisma.trackingSearch.findFirst({
          where: { userId, containerNumber },
          select: { id: true },
        }))?.id ?? "new",
      },
      update: {
        carrier, origin, destination, status, vessel, eta,
        searchedAt: new Date(),
      },
      create: {
        userId,
        containerNumber: containerNumber.toUpperCase(),
        carrier, origin, destination, status, vessel, eta,
      },
    });

    return NextResponse.json(record);
  } catch (err) {
    console.error("[tracking-history POST]", err);
    return NextResponse.json({ error: "Failed to save search" }, { status: 500 });
  }
}

// DELETE /api/tracking-history?id=xxx — remove a single entry
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  try {
    await prisma.trackingSearch.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[tracking-history DELETE]", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
