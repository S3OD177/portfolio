import { prisma } from "@/lib/prisma";
import { CertificatesList } from "@/components/admin/forms/certificate-form";

export default async function AdminCertificatesPage() {
  const certificates = await prisma.certificate.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Certificates</h1>
        <p className="text-muted-foreground mt-1">Manage your professional certifications and credentials</p>
      </div>
      <CertificatesList data={certificates} />
    </div>
  );
}
