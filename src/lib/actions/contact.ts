"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateContact(formData: FormData) {
  const id = formData.get("id") as string;
  const email = formData.get("email") as string;
  const phone = (formData.get("phone") as string) || null;
  const location = (formData.get("location") as string) || null;
  const linkedinUrl = (formData.get("linkedinUrl") as string) || null;
  const githubUrl = (formData.get("githubUrl") as string) || null;
  const websiteUrl = (formData.get("websiteUrl") as string) || null;

  if (id) {
    await prisma.contactInfo.update({
      where: { id },
      data: { email, phone, location, linkedinUrl, githubUrl, websiteUrl },
    });
  } else {
    await prisma.contactInfo.create({
      data: { email, phone, location, linkedinUrl, githubUrl, websiteUrl },
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/contact");
}
