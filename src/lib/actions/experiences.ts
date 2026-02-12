"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createExperience(formData: FormData) {
  await prisma.experience.create({
    data: {
      company: formData.get("company") as string,
      position: formData.get("position") as string,
      location: (formData.get("location") as string) || null,
      startDate: new Date(formData.get("startDate") as string),
      endDate: formData.get("endDate")
        ? new Date(formData.get("endDate") as string)
        : null,
      description: (formData.get("description") as string) || null,
      isCurrent: formData.get("isCurrent") === "true",
      sortOrder: parseInt(formData.get("sortOrder") as string) || 0,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/experiences");
}

export async function updateExperience(id: string, formData: FormData) {
  await prisma.experience.update({
    where: { id },
    data: {
      company: formData.get("company") as string,
      position: formData.get("position") as string,
      location: (formData.get("location") as string) || null,
      startDate: new Date(formData.get("startDate") as string),
      endDate: formData.get("endDate")
        ? new Date(formData.get("endDate") as string)
        : null,
      description: (formData.get("description") as string) || null,
      isCurrent: formData.get("isCurrent") === "true",
      sortOrder: parseInt(formData.get("sortOrder") as string) || 0,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/experiences");
}

export async function deleteExperience(id: string) {
  await prisma.experience.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/experiences");
}
