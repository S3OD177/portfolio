import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { seedDatabase } from "@/lib/seed-data";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  const force = searchParams.get("force") === "true";

  // Protect with JWT_SECRET
  if (!key || key !== process.env.JWT_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Check if data already exists
    const existingAbout = await prisma.about.findFirst();

    if (existingAbout && !force) {
      return NextResponse.json({
        message: "Database already seeded. Use ?force=true to re-seed (this will delete all existing data).",
        seeded: false,
      });
    }

    await seedDatabase();

    return NextResponse.json({
      message: "Database seeded successfully!",
      seeded: true,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed database", details: String(error) },
      { status: 500 }
    );
  }
}
