import { prisma } from "@/lib/prisma";
import { EducationList } from "@/components/admin/forms/education-form";

export default async function AdminEducationPage() {
  const education = await prisma.education.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Education</h1>
      <EducationList data={education} />
    </div>
  );
}
