"use server";

import { prisma } from "@/lib/prisma";
import type { SkillCategory } from "@/generated/prisma/enums";
import { revalidatePath } from "next/cache";

export async function createSkill(formData: FormData) {
  await prisma.skill.create({
    data: {
      name: formData.get("name") as string,
      category: formData.get("category") as SkillCategory,
      sortOrder: parseInt(formData.get("sortOrder") as string) || 0,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/skills");
}

export async function updateSkill(id: string, formData: FormData) {
  await prisma.skill.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      category: formData.get("category") as SkillCategory,
      sortOrder: parseInt(formData.get("sortOrder") as string) || 0,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/skills");
}

export async function deleteSkill(id: string) {
  await prisma.skill.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/skills");
}
