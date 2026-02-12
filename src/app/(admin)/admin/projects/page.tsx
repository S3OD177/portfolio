import { prisma } from "@/lib/prisma";
import { ProjectsList } from "@/components/admin/forms/project-form";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Projects</h1>
      <ProjectsList data={projects} />
    </div>
  );
}
