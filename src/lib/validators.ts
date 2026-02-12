import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(255, "Email is too long"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(5000, "Message is too long"),
});

export const loginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});
