"use client";

import { useTransition } from "react";
import { updateContact } from "@/lib/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { RequiredLabel } from "@/components/admin/required-label";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ContactFormProps {
  data: {
    id: string;
    email: string;
    phone: string | null;
    location: string | null;
    linkedinUrl: string | null;
    githubUrl: string | null;
    websiteUrl: string | null;
  } | null;
}

export function ContactForm({ data }: ContactFormProps) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string;
    if (!email?.trim()) { toast.error("Email is required"); return; }

    startTransition(async () => {
      try {
        await updateContact(formData);
        toast.success("Contact info updated successfully");
      } catch {
        toast.error("Failed to update contact info");
      }
    });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form action={handleSubmit} className="space-y-4">
          <input type="hidden" name="id" value={data?.id ?? ""} />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <RequiredLabel htmlFor="email">Email</RequiredLabel>
              <Input id="email" name="email" type="email" defaultValue={data?.email ?? ""} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" defaultValue={data?.phone ?? ""} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" defaultValue={data?.location ?? ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
              <Input id="linkedinUrl" name="linkedinUrl" defaultValue={data?.linkedinUrl ?? ""} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input id="githubUrl" name="githubUrl" defaultValue={data?.githubUrl ?? ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="websiteUrl">Website URL</Label>
              <Input id="websiteUrl" name="websiteUrl" defaultValue={data?.websiteUrl ?? ""} />
            </div>
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
