"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProject(formData: FormData) {
  const techStackRaw = formData.get("techStack") as string;
  const techStack = techStackRaw
    ? techStackRaw.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  await prisma.project.create({
    data: {
      title: formData.get("title") as string,
      description: (formData.get("description") as string) || null,
      techStack,
      liveUrl: (formData.get("liveUrl") as string) || null,
      githubUrl: (formData.get("githubUrl") as string) || null,
      imageUrl: (formData.get("imageUrl") as string) || null,
      isFeatured: formData.get("isFeatured") === "true",
      sortOrder: parseInt(formData.get("sortOrder") as string) || 0,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const techStackRaw = formData.get("techStack") as string;
  const techStack = techStackRaw
    ? techStackRaw.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  await prisma.project.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      description: (formData.get("description") as string) || null,
      techStack,
      liveUrl: (formData.get("liveUrl") as string) || null,
      githubUrl: (formData.get("githubUrl") as string) || null,
      imageUrl: (formData.get("imageUrl") as string) || null,
      isFeatured: formData.get("isFeatured") === "true",
      sortOrder: parseInt(formData.get("sortOrder") as string) || 0,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/projects");
}
