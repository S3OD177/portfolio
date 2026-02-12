"use client";

import { useTransition } from "react";
import { updateAbout } from "@/lib/actions/about";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { RequiredLabel } from "@/components/admin/required-label";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface AboutFormProps {
  data: {
    id: string;
    fullName: string;
    title: string;
    summary: string;
    avatarUrl: string | null;
    resumeUrl: string | null;
  } | null;
}

export function AboutForm({ data }: AboutFormProps) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    const fullName = formData.get("fullName") as string;
    const title = formData.get("title") as string;
    const summary = formData.get("summary") as string;

    if (!fullName?.trim()) { toast.error("Full name is required"); return; }
    if (!title?.trim()) { toast.error("Title is required"); return; }
    if (!summary?.trim()) { toast.error("Summary is required"); return; }

    startTransition(async () => {
      try {
        await updateAbout(formData);
        toast.success("About info updated successfully");
      } catch {
        toast.error("Failed to update about info");
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
              <RequiredLabel htmlFor="fullName">Full Name</RequiredLabel>
              <Input id="fullName" name="fullName" defaultValue={data?.fullName ?? ""} required />
            </div>
            <div className="space-y-2">
              <RequiredLabel htmlFor="title">Title</RequiredLabel>
              <Input id="title" name="title" defaultValue={data?.title ?? ""} required />
            </div>
          </div>
          <div className="space-y-2">
            <RequiredLabel htmlFor="summary">Summary</RequiredLabel>
            <Textarea id="summary" name="summary" rows={5} defaultValue={data?.summary ?? ""} required />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="avatarUrl">Avatar URL</Label>
              <Input id="avatarUrl" name="avatarUrl" defaultValue={data?.avatarUrl ?? ""} placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resumeUrl">Resume URL</Label>
              <Input id="resumeUrl" name="resumeUrl" defaultValue={data?.resumeUrl ?? ""} placeholder="https://..." />
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
