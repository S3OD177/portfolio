"use client";

import { useState } from "react";
import {
  createExperience,
  updateExperience,
  deleteExperience,
} from "@/lib/actions/experiences";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteDialog } from "@/components/admin/delete-dialog";
import { Plus, Pencil } from "lucide-react";
import { toast } from "sonner";

type Experience = {
  id: string;
  company: string;
  position: string;
  location: string | null;
  startDate: Date;
  endDate: Date | null;
  description: string | null;
  isCurrent: boolean;
  sortOrder: number;
};

function ExperienceFormDialog({
  data,
  children,
}: {
  data?: Experience;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    try {
      if (data) {
        await updateExperience(data.id, formData);
        toast.success("Experience updated");
      } else {
        await createExperience(formData);
        toast.success("Experience created");
      }
      setOpen(false);
    } catch {
      toast.error("Failed to save experience");
    }
  };

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {data ? "Edit Experience" : "Add Experience"}
          </DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              defaultValue={data?.company ?? ""}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              name="position"
              defaultValue={data?.position ?? ""}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              defaultValue={data?.location ?? ""}
            />
          </div>
          <div className="grid gap-4 grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                defaultValue={formatDate(data?.startDate)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                defaultValue={formatDate(data?.endDate)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              rows={3}
              defaultValue={data?.description ?? ""}
            />
          </div>
          <div className="grid gap-4 grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sortOrder">Sort Order</Label>
              <Input
                id="sortOrder"
                name="sortOrder"
                type="number"
                defaultValue={data?.sortOrder ?? 0}
              />
            </div>
            <div className="flex items-end gap-2 pb-0.5">
              <input
                type="hidden"
                name="isCurrent"
                value={data?.isCurrent ? "true" : "false"}
              />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  defaultChecked={data?.isCurrent ?? false}
                  onChange={(e) => {
                    const hidden = e.target
                      .closest("form")
                      ?.querySelector(
                        'input[name="isCurrent"][type="hidden"]'
                      ) as HTMLInputElement;
                    if (hidden)
                      hidden.value = e.target.checked ? "true" : "false";
                  }}
                />
                Current Position
              </label>
            </div>
          </div>
          <Button type="submit" className="w-full">
            {data ? "Update" : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function ExperiencesList({ data }: { data: Experience[] }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-end mb-4">
          <ExperienceFormDialog>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </ExperienceFormDialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Position</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Period</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((exp) => (
              <TableRow key={exp.id}>
                <TableCell className="font-medium">{exp.position}</TableCell>
                <TableCell>{exp.company}</TableCell>
                <TableCell>
                  {new Date(exp.startDate).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  -{" "}
                  {exp.isCurrent
                    ? "Present"
                    : exp.endDate
                      ? new Date(exp.endDate).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <ExperienceFormDialog data={exp}>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </ExperienceFormDialog>
                    <DeleteDialog
                      title={exp.position}
                      onDelete={async () => {
                        await deleteExperience(exp.id);
                        toast.success("Experience deleted");
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No experiences yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
