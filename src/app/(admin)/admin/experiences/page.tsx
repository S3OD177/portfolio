import { prisma } from "@/lib/prisma";
import { ExperiencesList } from "@/components/admin/forms/experience-form";

export default async function AdminExperiencesPage() {
  const experiences = await prisma.experience.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Experiences</h1>
      <ExperiencesList data={experiences} />
    </div>
  );
}
