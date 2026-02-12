"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createEducation(formData: FormData) {
  await prisma.education.create({
    data: {
      institution: formData.get("institution") as string,
      degree: formData.get("degree") as string,
      fieldOfStudy: formData.get("fieldOfStudy") as string,
      startDate: formData.get("startDate")
        ? new Date(formData.get("startDate") as string)
        : null,
      endDate: formData.get("endDate")
        ? new Date(formData.get("endDate") as string)
        : null,
      description: (formData.get("description") as string) || null,
      sortOrder: parseInt(formData.get("sortOrder") as string) || 0,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/education");
}

export async function updateEducation(id: string, formData: FormData) {
  await prisma.education.update({
    where: { id },
    data: {
      institution: formData.get("institution") as string,
      degree: formData.get("degree") as string,
      fieldOfStudy: formData.get("fieldOfStudy") as string,
      startDate: formData.get("startDate")
        ? new Date(formData.get("startDate") as string)
        : null,
      endDate: formData.get("endDate")
        ? new Date(formData.get("endDate") as string)
        : null,
      description: (formData.get("description") as string) || null,
      sortOrder: parseInt(formData.get("sortOrder") as string) || 0,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/education");
}

export async function deleteEducation(id: string) {
  await prisma.education.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/education");
}
