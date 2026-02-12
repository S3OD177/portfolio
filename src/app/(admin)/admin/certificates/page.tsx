import { prisma } from "@/lib/prisma";
import { CertificatesList } from "@/components/admin/forms/certificate-form";

export default async function AdminCertificatesPage() {
  const certificates = await prisma.certificate.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Certificates</h1>
      <CertificatesList data={certificates} />
    </div>
  );
}
