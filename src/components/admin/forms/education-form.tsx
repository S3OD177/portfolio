"use client";

import { useState, useMemo, useTransition } from "react";
import { createEducation, updateEducation, deleteEducation } from "@/lib/actions/education";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DeleteDialog } from "@/components/admin/delete-dialog";
import { SearchInput } from "@/components/admin/search-input";
import { RequiredLabel } from "@/components/admin/required-label";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, GraduationCap } from "lucide-react";
import { toast } from "sonner";

type Education = {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date | null;
  endDate: Date | null;
  description: string | null;
  sortOrder: number;
};

function EducationFormDialog({ data, children }: { data?: Education; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    const institution = formData.get("institution") as string;
    const degree = formData.get("degree") as string;
    const fieldOfStudy = formData.get("fieldOfStudy") as string;
    if (!institution?.trim()) { toast.error("Institution is required"); return; }
    if (!degree?.trim()) { toast.error("Degree is required"); return; }
    if (!fieldOfStudy?.trim()) { toast.error("Field of study is required"); return; }

    startTransition(async () => {
      try {
        if (data) { await updateEducation(data.id, formData); toast.success("Education updated"); }
        else { await createEducation(formData); toast.success("Education created"); }
        setOpen(false);
      } catch { toast.error("Failed to save education"); }
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
          <DialogTitle>{data ? "Edit Education" : "Add Education"}</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <RequiredLabel htmlFor="institution">Institution</RequiredLabel>
            <Input id="institution" name="institution" defaultValue={data?.institution ?? ""} required />
          </div>
          <div className="grid gap-4 grid-cols-2">
            <div className="space-y-2">
              <RequiredLabel htmlFor="degree">Degree</RequiredLabel>
              <Input id="degree" name="degree" defaultValue={data?.degree ?? ""} required />
            </div>
            <div className="space-y-2">
              <RequiredLabel htmlFor="fieldOfStudy">Field of Study</RequiredLabel>
              <Input id="fieldOfStudy" name="fieldOfStudy" defaultValue={data?.fieldOfStudy ?? ""} required />
            </div>
          </div>
          <div className="grid gap-4 grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" name="startDate" type="date" defaultValue={formatDate(data?.startDate)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" name="endDate" type="date" defaultValue={formatDate(data?.endDate)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" rows={2} defaultValue={data?.description ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sortOrder">Sort Order</Label>
            <Input id="sortOrder" name="sortOrder" type="number" defaultValue={data?.sortOrder ?? 0} />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Saving..." : data ? "Update" : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function EducationList({ data }: { data: Education[] }) {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter((edu) =>
      edu.institution.toLowerCase().includes(q) || edu.degree.toLowerCase().includes(q) || edu.fieldOfStudy.toLowerCase().includes(q)
    );
  }, [data, search]);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <SearchInput value={search} onChange={setSearch} placeholder="Search education..." />
          <EducationFormDialog><Button size="sm"><Plus className="h-4 w-4 mr-2" />Add Education</Button></EducationFormDialog>
        </div>
        <Table>
          <TableHeader><TableRow><TableHead>Degree</TableHead><TableHead>Institution</TableHead><TableHead>Field</TableHead><TableHead className="w-24">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {filtered.map((edu) => (
              <TableRow key={edu.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{edu.degree}</TableCell>
                <TableCell>{edu.institution}</TableCell>
                <TableCell>{edu.fieldOfStudy}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <EducationFormDialog data={edu}><Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button></EducationFormDialog>
                    <DeleteDialog title={edu.degree} onDelete={async () => { await deleteEducation(edu.id); toast.success("Education deleted"); }} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow><TableCell colSpan={4} className="h-32">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <GraduationCap className="h-8 w-8 mb-2 opacity-50" />
                  <p className="text-sm">{data.length === 0 ? "No education entries yet" : "No results found"}</p>
                  <p className="text-xs mt-1">{data.length === 0 ? 'Click "Add Education" to get started' : "Try adjusting your search"}</p>
                </div>
              </TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
