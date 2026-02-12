"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateAbout(formData: FormData) {
  const id = formData.get("id") as string;
  const fullName = formData.get("fullName") as string;
  const title = formData.get("title") as string;
  const summary = formData.get("summary") as string;
  const avatarUrl = (formData.get("avatarUrl") as string) || null;
  const resumeUrl = (formData.get("resumeUrl") as string) || null;

  if (id) {
    await prisma.about.update({
      where: { id },
      data: { fullName, title, summary, avatarUrl, resumeUrl },
    });
  } else {
    await prisma.about.create({
      data: { fullName, title, summary, avatarUrl, resumeUrl },
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/about");
}
