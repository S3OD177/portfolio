import { prisma } from "@/lib/prisma";
import { ExperiencesList } from "@/components/admin/forms/experience-form";

export default async function AdminExperiencesPage() {
  const experiences = await prisma.experience.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Experiences</h1>
        <p className="text-muted-foreground mt-1">Manage your work experience and career history</p>
      </div>
      <ExperiencesList data={experiences} />
    </div>
  );
}
