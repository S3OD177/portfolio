import { prisma } from "@/lib/prisma";
import { ProjectsList } from "@/components/admin/forms/project-form";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-muted-foreground mt-1">Manage your portfolio projects and showcases</p>
      </div>
      <ProjectsList data={projects} />
    </div>
  );
}
