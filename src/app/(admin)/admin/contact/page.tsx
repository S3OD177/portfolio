import { prisma } from "@/lib/prisma";
import { ContactForm } from "@/components/admin/forms/contact-form";

export default async function AdminContactPage() {
  const contact = await prisma.contactInfo.findFirst();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Contact Info</h1>
      <ContactForm data={contact} />
    </div>
  );
}
