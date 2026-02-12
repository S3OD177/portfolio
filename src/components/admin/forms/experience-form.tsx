"use client";

import { useState, useMemo, useTransition } from "react";
import {
  createExperience,
  updateExperience,
  deleteExperience,
} from "@/lib/actions/experiences";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { SearchInput } from "@/components/admin/search-input";
import { RequiredLabel } from "@/components/admin/required-label";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Briefcase } from "lucide-react";
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
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    const company = formData.get("company") as string;
    const position = formData.get("position") as string;
    const startDate = formData.get("startDate") as string;

    if (!company?.trim()) { toast.error("Company is required"); return; }
    if (!position?.trim()) { toast.error("Position is required"); return; }
    if (!startDate) { toast.error("Start date is required"); return; }

    startTransition(async () => {
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
    });
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
          <DialogTitle>{data ? "Edit Experience" : "Add Experience"}</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <RequiredLabel htmlFor="company">Company</RequiredLabel>
            <Input id="company" name="company" defaultValue={data?.company ?? ""} required />
          </div>
          <div className="space-y-2">
            <RequiredLabel htmlFor="position">Position</RequiredLabel>
            <Input id="position" name="position" defaultValue={data?.position ?? ""} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" defaultValue={data?.location ?? ""} />
          </div>
          <div className="grid gap-4 grid-cols-2">
            <div className="space-y-2">
              <RequiredLabel htmlFor="startDate">Start Date</RequiredLabel>
              <Input id="startDate" name="startDate" type="date" defaultValue={formatDate(data?.startDate)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" name="endDate" type="date" defaultValue={formatDate(data?.endDate)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" rows={3} defaultValue={data?.description ?? ""} />
          </div>
          <div className="grid gap-4 grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sortOrder">Sort Order</Label>
              <Input id="sortOrder" name="sortOrder" type="number" defaultValue={data?.sortOrder ?? 0} />
            </div>
            <div className="flex items-end gap-2 pb-0.5">
              <input type="hidden" name="isCurrent" value={data?.isCurrent ? "true" : "false"} />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  defaultChecked={data?.isCurrent ?? false}
                  onChange={(e) => {
                    const hidden = e.target.closest("form")?.querySelector('input[name="isCurrent"][type="hidden"]') as HTMLInputElement;
                    if (hidden) hidden.value = e.target.checked ? "true" : "false";
                  }}
                />
                Current Position
              </label>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Saving..." : data ? "Update" : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function ExperiencesList({ data }: { data: Experience[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter(
      (exp) =>
        exp.company.toLowerCase().includes(q) ||
        exp.position.toLowerCase().includes(q) ||
        (exp.location?.toLowerCase().includes(q) ?? false)
    );
  }, [data, search]);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <SearchInput value={search} onChange={setSearch} placeholder="Search experiences..." />
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
            {filtered.map((exp) => (
              <TableRow key={exp.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{exp.position}</TableCell>
                <TableCell>{exp.company}</TableCell>
                <TableCell>
                  {new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}{" "}
                  -{" "}
                  {exp.isCurrent
                    ? "Present"
                    : exp.endDate
                      ? new Date(exp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                      : "N/A"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <ExperienceFormDialog data={exp}>
                      <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                    </ExperienceFormDialog>
                    <DeleteDialog title={exp.position} onDelete={async () => { await deleteExperience(exp.id); toast.success("Experience deleted"); }} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="h-32">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Briefcase className="h-8 w-8 mb-2 opacity-50" />
                    <p className="text-sm">{data.length === 0 ? "No experiences yet" : "No results found"}</p>
                    <p className="text-xs mt-1">{data.length === 0 ? 'Click "Add Experience" to get started' : "Try adjusting your search"}</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
