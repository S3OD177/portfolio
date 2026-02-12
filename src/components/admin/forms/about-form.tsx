"use client";

import { useRef } from "react";
import { updateAbout } from "@/lib/actions/about";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
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
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    try {
      await updateAbout(formData);
      toast.success("About info updated successfully");
    } catch {
      toast.error("Failed to update about info");
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form ref={formRef} action={handleSubmit} className="space-y-4">
          <input type="hidden" name="id" value={data?.id ?? ""} />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                defaultValue={data?.fullName ?? ""}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={data?.title ?? ""}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              name="summary"
              rows={5}
              defaultValue={data?.summary ?? ""}
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="avatarUrl">Avatar URL</Label>
              <Input
                id="avatarUrl"
                name="avatarUrl"
                defaultValue={data?.avatarUrl ?? ""}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resumeUrl">Resume URL</Label>
              <Input
                id="resumeUrl"
                name="resumeUrl"
                defaultValue={data?.resumeUrl ?? ""}
                placeholder="https://..."
              />
            </div>
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </CardContent>
    </Card>
  );
}
