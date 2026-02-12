import { NextRequest, NextResponse } from "next/server";
import { seedDatabase } from "@/lib/seed-data";
import pg from "pg";

export const dynamic = "force-dynamic";

const createTablesSQL = `
-- Create enums
DO $$ BEGIN
  CREATE TYPE "SkillCategory" AS ENUM ('TECHNICAL', 'SOFT');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "Proficiency" AS ENUM ('NATIVE', 'FLUENT', 'INTERMEDIATE', 'BASIC');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Create tables
CREATE TABLE IF NOT EXISTS "about" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "fullName" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "summary" TEXT NOT NULL,
  "avatarUrl" TEXT,
  "resumeUrl" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "about_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "contact_info" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "email" TEXT NOT NULL,
  "phone" TEXT,
  "location" TEXT,
  "linkedinUrl" TEXT,
  "githubUrl" TEXT,
  "websiteUrl" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "contact_info_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "experiences" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "company" TEXT NOT NULL,
  "position" TEXT NOT NULL,
  "location" TEXT,
  "startDate" TIMESTAMP(3) NOT NULL,
  "endDate" TIMESTAMP(3),
  "description" TEXT,
  "isCurrent" BOOLEAN NOT NULL DEFAULT false,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "experiences_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "education" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "institution" TEXT NOT NULL,
  "degree" TEXT NOT NULL,
  "fieldOfStudy" TEXT NOT NULL,
  "startDate" TIMESTAMP(3),
  "endDate" TIMESTAMP(3),
  "description" TEXT,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "education_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "certificates" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "name" TEXT NOT NULL,
  "issuer" TEXT NOT NULL,
  "issueDate" TIMESTAMP(3),
  "expiryDate" TIMESTAMP(3),
  "credentialUrl" TEXT,
  "credentialId" TEXT,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "certificates_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "skills" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "name" TEXT NOT NULL,
  "category" "SkillCategory" NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "projects" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "techStack" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "liveUrl" TEXT,
  "githubUrl" TEXT,
  "imageUrl" TEXT,
  "isFeatured" BOOLEAN NOT NULL DEFAULT false,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "memberships" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "organization" TEXT NOT NULL,
  "role" TEXT,
  "startDate" TIMESTAMP(3),
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "memberships_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "languages" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "name" TEXT NOT NULL,
  "proficiency" "Proficiency" NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "contact_messages" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "isRead" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "contact_messages_pkey" PRIMARY KEY ("id")
);
`;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  const force = searchParams.get("force") === "true";

  // Protect with SEED_SECRET (falls back to JWT_SECRET for backwards compat)
  const seedSecret = process.env.SEED_SECRET || process.env.JWT_SECRET;
  if (!key || key !== seedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Step 1: Create tables using raw pg (no prisma CLI needed)
    const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();
    await client.query(createTablesSQL);
    await client.end();

    // Step 2: Check if data already exists
    const { prisma } = await import("@/lib/prisma");
    let existingAbout = null;
    try {
      existingAbout = await prisma.about.findFirst();
    } catch {
      // Table just created, no data
    }

    if (existingAbout && !force) {
      return NextResponse.json({
        message: "Database already seeded. Use ?force=true to re-seed.",
        seeded: false,
      });
    }

    // Step 3: Seed data
    await seedDatabase();

    return NextResponse.json({
      message: "Tables created and database seeded successfully!",
      seeded: true,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
}
