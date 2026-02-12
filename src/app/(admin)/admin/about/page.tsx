import { prisma } from "@/lib/prisma";
import { AboutForm } from "@/components/admin/forms/about-form";

export default async function AdminAboutPage() {
  const about = await prisma.about.findFirst();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">About / Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your personal information and bio</p>
      </div>
      <AboutForm data={about} />
    </div>
  );
}
