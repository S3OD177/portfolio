import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { seedDatabase } from "@/lib/seed-data";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

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
    // Step 1: Push schema to create/sync tables
    try {
      const { stdout, stderr } = await execAsync("npx prisma db push --skip-generate");
      console.log("prisma db push output:", stdout);
      if (stderr) console.log("prisma db push stderr:", stderr);
    } catch (pushError) {
      console.error("prisma db push error:", pushError);
      return NextResponse.json(
        { error: "Failed to push database schema", details: String(pushError) },
        { status: 500 }
      );
    }

    // Step 2: Check if data already exists
    let existingAbout = null;
    try {
      existingAbout = await prisma.about.findFirst();
    } catch {
      // Table might have just been created, no data yet
    }

    if (existingAbout && !force) {
      return NextResponse.json({
        message: "Database already seeded. Use ?force=true to re-seed (this will delete all existing data).",
        seeded: false,
      });
    }

    // Step 3: Seed the data
    await seedDatabase();

    return NextResponse.json({
      message: "Database schema pushed and seeded successfully!",
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
