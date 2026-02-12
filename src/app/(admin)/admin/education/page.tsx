import { prisma } from "@/lib/prisma";
import { EducationList } from "@/components/admin/forms/education-form";

export default async function AdminEducationPage() {
  const education = await prisma.education.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Education</h1>
        <p className="text-muted-foreground mt-1">Manage your academic background and degrees</p>
      </div>
      <EducationList data={education} />
    </div>
  );
}
