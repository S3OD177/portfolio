import { prisma } from "@/lib/prisma";
import { AboutForm } from "@/components/admin/forms/about-form";

export default async function AdminAboutPage() {
  const about = await prisma.about.findFirst();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">About / Profile</h1>
      <AboutForm data={about} />
    </div>
  );
}
