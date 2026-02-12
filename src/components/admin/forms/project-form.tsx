"use client";

import { useState, useMemo, useTransition } from "react";
import { createProject, updateProject, deleteProject } from "@/lib/actions/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DeleteDialog } from "@/components/admin/delete-dialog";
import { SearchInput } from "@/components/admin/search-input";
import { RequiredLabel } from "@/components/admin/required-label";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, FolderOpen } from "lucide-react";
import { toast } from "sonner";

type Project = {
  id: string;
  title: string;
  description: string | null;
  techStack: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  imageUrl: string | null;
  isFeatured: boolean;
  sortOrder: number;
};

function ProjectFormDialog({ data, children }: { data?: Project; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;
    if (!title?.trim()) { toast.error("Title is required"); return; }

    startTransition(async () => {
      try {
        if (data) { await updateProject(data.id, formData); toast.success("Project updated"); }
        else { await createProject(formData); toast.success("Project created"); }
        setOpen(false);
      } catch { toast.error("Failed to save project"); }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>{data ? "Edit Project" : "Add Project"}</DialogTitle></DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <RequiredLabel htmlFor="title">Title</RequiredLabel>
            <Input id="title" name="title" defaultValue={data?.title ?? ""} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" rows={3} defaultValue={data?.description ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="techStack">Tech Stack (comma-separated)</Label>
            <Input id="techStack" name="techStack" defaultValue={data?.techStack?.join(", ") ?? ""} placeholder="Next.js, PostgreSQL, Tailwind CSS" />
          </div>
          <div className="grid gap-4 grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="liveUrl">Live URL</Label>
              <Input id="liveUrl" name="liveUrl" defaultValue={data?.liveUrl ?? ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input id="githubUrl" name="githubUrl" defaultValue={data?.githubUrl ?? ""} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input id="imageUrl" name="imageUrl" defaultValue={data?.imageUrl ?? ""} />
          </div>
          <div className="grid gap-4 grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sortOrder">Sort Order</Label>
              <Input id="sortOrder" name="sortOrder" type="number" defaultValue={data?.sortOrder ?? 0} />
            </div>
            <div className="flex items-end gap-2 pb-0.5">
              <input type="hidden" name="isFeatured" value={data?.isFeatured ? "true" : "false"} />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  defaultChecked={data?.isFeatured ?? false}
                  onChange={(e) => {
                    const hidden = e.target.closest("form")?.querySelector('input[name="isFeatured"][type="hidden"]') as HTMLInputElement;
                    if (hidden) hidden.value = e.target.checked ? "true" : "false";
                  }}
                />
                Featured
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

export function ProjectsList({ data }: { data: Project[] }) {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter((p) =>
      p.title.toLowerCase().includes(q) ||
      (p.description?.toLowerCase().includes(q) ?? false) ||
      p.techStack.some((t) => t.toLowerCase().includes(q))
    );
  }, [data, search]);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <SearchInput value={search} onChange={setSearch} placeholder="Search projects..." />
          <ProjectFormDialog><Button size="sm"><Plus className="h-4 w-4 mr-2" />Add Project</Button></ProjectFormDialog>
        </div>
        <Table>
          <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Tech Stack</TableHead><TableHead>Featured</TableHead><TableHead className="w-24">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {filtered.map((project) => (
              <TableRow key={project.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.map((tech) => (<Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>))}
                  </div>
                </TableCell>
                <TableCell>{project.isFeatured ? <Badge>Featured</Badge> : <span className="text-muted-foreground">No</span>}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <ProjectFormDialog data={project}><Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button></ProjectFormDialog>
                    <DeleteDialog title={project.title} onDelete={async () => { await deleteProject(project.id); toast.success("Project deleted"); }} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow><TableCell colSpan={4} className="h-32">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <FolderOpen className="h-8 w-8 mb-2 opacity-50" />
                  <p className="text-sm">{data.length === 0 ? "No projects yet" : "No results found"}</p>
                  <p className="text-xs mt-1">{data.length === 0 ? 'Click "Add Project" to get started' : "Try adjusting your search"}</p>
                </div>
              </TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
