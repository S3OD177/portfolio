import { prisma } from "@/lib/prisma";
import { ContactForm } from "@/components/admin/forms/contact-form";

export default async function AdminContactPage() {
  const contact = await prisma.contactInfo.findFirst();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Contact Info</h1>
        <p className="text-muted-foreground mt-1">Manage your contact details and social links</p>
      </div>
      <ContactForm data={contact} />
    </div>
  );
}
