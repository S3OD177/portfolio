import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getPortfolioData = unstable_cache(
  async () => {
    const [
      about,
      contact,
      experiences,
      education,
      certificates,
      skills,
      projects,
      memberships,
      languages,
    ] = await Promise.all([
      prisma.about.findFirst(),
      prisma.contactInfo.findFirst(),
      prisma.experience.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.education.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.certificate.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.skill.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.project.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.membership.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.language.findMany({ orderBy: { sortOrder: "asc" } }),
    ]);

    return {
      about,
      contact,
      experiences,
      education,
      certificates,
      skills,
      projects,
      memberships,
      languages,
    };
  },
  ["portfolio-data"],
  { revalidate: 3600 }
);
