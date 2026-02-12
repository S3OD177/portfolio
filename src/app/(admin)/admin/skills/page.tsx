import { prisma } from "@/lib/prisma";
import { SkillsList } from "@/components/admin/forms/skill-form";

export default async function AdminSkillsPage() {
  const skills = await prisma.skill.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Skills</h1>
      <SkillsList data={skills} />
    </div>
  );
}
