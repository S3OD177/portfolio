"use client";

import { useState, useMemo, useTransition } from "react";
import { createSkill, updateSkill, deleteSkill } from "@/lib/actions/skills";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DeleteDialog } from "@/components/admin/delete-dialog";
import { SearchInput } from "@/components/admin/search-input";
import { RequiredLabel } from "@/components/admin/required-label";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Wrench } from "lucide-react";
import { toast } from "sonner";

type Skill = {
  id: string;
  name: string;
  category: "TECHNICAL" | "SOFT";
  sortOrder: number;
};

function SkillFormDialog({ data, children }: { data?: Skill; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(data?.category ?? "TECHNICAL");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    const name = formData.get("name") as string;
    if (!name?.trim()) { toast.error("Skill name is required"); return; }

    formData.set("category", category);
    startTransition(async () => {
      try {
        if (data) { await updateSkill(data.id, formData); toast.success("Skill updated"); }
        else { await createSkill(formData); toast.success("Skill created"); }
        setOpen(false);
      } catch { toast.error("Failed to save skill"); }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>{data ? "Edit Skill" : "Add Skill"}</DialogTitle></DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <RequiredLabel htmlFor="name">Skill Name</RequiredLabel>
            <Input id="name" name="name" defaultValue={data?.name ?? ""} required />
          </div>
          <div className="space-y-2">
            <RequiredLabel htmlFor="category">Category</RequiredLabel>
            <Select value={category} onValueChange={(v) => setCategory(v as "TECHNICAL" | "SOFT")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="TECHNICAL">Technical</SelectItem>
                <SelectItem value="SOFT">Soft</SelectItem>
              </SelectContent>
            </Select>
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

export function SkillsList({ data }: { data: Skill[] }) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"ALL" | "TECHNICAL" | "SOFT">("ALL");

  const filtered = useMemo(() => {
    return data.filter((skill) => {
      const matchesSearch = !search || skill.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === "ALL" || skill.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [data, search, categoryFilter]);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
            <SearchInput value={search} onChange={setSearch} placeholder="Search skills..." />
            <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as "ALL" | "TECHNICAL" | "SOFT")}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Categories</SelectItem>
                <SelectItem value="TECHNICAL">Technical</SelectItem>
                <SelectItem value="SOFT">Soft</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <SkillFormDialog><Button size="sm"><Plus className="h-4 w-4 mr-2" />Add Skill</Button></SkillFormDialog>
        </div>
        <Table>
          <TableHeader><TableRow><TableHead>Skill</TableHead><TableHead>Category</TableHead><TableHead>Order</TableHead><TableHead className="w-24">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {filtered.map((skill) => (
              <TableRow key={skill.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{skill.name}</TableCell>
                <TableCell>
                  <Badge variant={skill.category === "TECHNICAL" ? "default" : "secondary"}>{skill.category.toLowerCase()}</Badge>
                </TableCell>
                <TableCell>{skill.sortOrder}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <SkillFormDialog data={skill}><Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button></SkillFormDialog>
                    <DeleteDialog title={skill.name} onDelete={async () => { await deleteSkill(skill.id); toast.success("Skill deleted"); }} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow><TableCell colSpan={4} className="h-32">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <Wrench className="h-8 w-8 mb-2 opacity-50" />
                  <p className="text-sm">{data.length === 0 ? "No skills yet" : "No results found"}</p>
                  <p className="text-xs mt-1">{data.length === 0 ? 'Click "Add Skill" to get started' : "Try adjusting your search or filter"}</p>
                </div>
              </TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
