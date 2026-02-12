"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCertificate(formData: FormData) {
  await prisma.certificate.create({
    data: {
      name: formData.get("name") as string,
      issuer: formData.get("issuer") as string,
      issueDate: formData.get("issueDate")
        ? new Date(formData.get("issueDate") as string)
        : null,
      expiryDate: formData.get("expiryDate")
        ? new Date(formData.get("expiryDate") as string)
        : null,
      credentialUrl: (formData.get("credentialUrl") as string) || null,
      credentialId: (formData.get("credentialId") as string) || null,
      sortOrder: parseInt(formData.get("sortOrder") as string) || 0,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/certificates");
}

export async function updateCertificate(id: string, formData: FormData) {
  await prisma.certificate.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      issuer: formData.get("issuer") as string,
      issueDate: formData.get("issueDate")
        ? new Date(formData.get("issueDate") as string)
        : null,
      expiryDate: formData.get("expiryDate")
        ? new Date(formData.get("expiryDate") as string)
        : null,
      credentialUrl: (formData.get("credentialUrl") as string) || null,
      credentialId: (formData.get("credentialId") as string) || null,
      sortOrder: parseInt(formData.get("sortOrder") as string) || 0,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/certificates");
}

export async function deleteCertificate(id: string) {
  await prisma.certificate.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/certificates");
}
