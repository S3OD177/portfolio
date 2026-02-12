import { prisma } from "@/lib/prisma";
import { SkillsList } from "@/components/admin/forms/skill-form";

export default async function AdminSkillsPage() {
  const skills = await prisma.skill.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Skills</h1>
        <p className="text-muted-foreground mt-1">Manage your technical and soft skills</p>
      </div>
      <SkillsList data={skills} />
    </div>
  );
}
