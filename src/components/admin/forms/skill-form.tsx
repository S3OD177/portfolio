"use client";

import { useState } from "react";
import { createSkill, updateSkill, deleteSkill } from "@/lib/actions/skills";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DeleteDialog } from "@/components/admin/delete-dialog";
import { Plus, Pencil } from "lucide-react";
import { toast } from "sonner";

type Skill = {
  id: string;
  name: string;
  category: "TECHNICAL" | "SOFT";
  sortOrder: number;
};

function SkillFormDialog({
  data,
  children,
}: {
  data?: Skill;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(data?.category ?? "TECHNICAL");

  const handleSubmit = async (formData: FormData) => {
    formData.set("category", category);
    try {
      if (data) {
        await updateSkill(data.id, formData);
        toast.success("Skill updated");
      } else {
        await createSkill(formData);
        toast.success("Skill created");
      }
      setOpen(false);
    } catch {
      toast.error("Failed to save skill");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{data ? "Edit Skill" : "Add Skill"}</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Skill Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={data?.name ?? ""}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as "TECHNICAL" | "SOFT")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TECHNICAL">Technical</SelectItem>
                <SelectItem value="SOFT">Soft</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sortOrder">Sort Order</Label>
            <Input
              id="sortOrder"
              name="sortOrder"
              type="number"
              defaultValue={data?.sortOrder ?? 0}
            />
          </div>
          <Button type="submit" className="w-full">
            {data ? "Update" : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function SkillsList({ data }: { data: Skill[] }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-end mb-4">
          <SkillFormDialog>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </SkillFormDialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Skill</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Order</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((skill) => (
              <TableRow key={skill.id}>
                <TableCell className="font-medium">{skill.name}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      skill.category === "TECHNICAL" ? "default" : "secondary"
                    }
                  >
                    {skill.category.toLowerCase()}
                  </Badge>
                </TableCell>
                <TableCell>{skill.sortOrder}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <SkillFormDialog data={skill}>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </SkillFormDialog>
                    <DeleteDialog
                      title={skill.name}
                      onDelete={async () => {
                        await deleteSkill(skill.id);
                        toast.success("Skill deleted");
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No skills yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
