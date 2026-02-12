"use client";

import { useState, useMemo, useTransition } from "react";
import { createCertificate, updateCertificate, deleteCertificate } from "@/lib/actions/certificates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DeleteDialog } from "@/components/admin/delete-dialog";
import { SearchInput } from "@/components/admin/search-input";
import { RequiredLabel } from "@/components/admin/required-label";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Award } from "lucide-react";
import { toast } from "sonner";

type Certificate = {
  id: string;
  name: string;
  issuer: string;
  issueDate: Date | null;
  expiryDate: Date | null;
  credentialUrl: string | null;
  credentialId: string | null;
  sortOrder: number;
};

function CertificateFormDialog({ data, children }: { data?: Certificate; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const issuer = formData.get("issuer") as string;
    if (!name?.trim()) { toast.error("Certificate name is required"); return; }
    if (!issuer?.trim()) { toast.error("Issuer is required"); return; }

    startTransition(async () => {
      try {
        if (data) { await updateCertificate(data.id, formData); toast.success("Certificate updated"); }
        else { await createCertificate(formData); toast.success("Certificate created"); }
        setOpen(false);
      } catch { toast.error("Failed to save certificate"); }
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
        <DialogHeader><DialogTitle>{data ? "Edit Certificate" : "Add Certificate"}</DialogTitle></DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <RequiredLabel htmlFor="name">Certificate Name</RequiredLabel>
            <Input id="name" name="name" defaultValue={data?.name ?? ""} required />
          </div>
          <div className="space-y-2">
            <RequiredLabel htmlFor="issuer">Issuer</RequiredLabel>
            <Input id="issuer" name="issuer" defaultValue={data?.issuer ?? ""} required />
          </div>
          <div className="grid gap-4 grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="issueDate">Issue Date</Label>
              <Input id="issueDate" name="issueDate" type="date" defaultValue={formatDate(data?.issueDate)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input id="expiryDate" name="expiryDate" type="date" defaultValue={formatDate(data?.expiryDate)} />
            </div>
          </div>
          <div className="grid gap-4 grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="credentialUrl">Credential URL</Label>
              <Input id="credentialUrl" name="credentialUrl" defaultValue={data?.credentialUrl ?? ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="credentialId">Credential ID</Label>
              <Input id="credentialId" name="credentialId" defaultValue={data?.credentialId ?? ""} />
            </div>
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

export function CertificatesList({ data }: { data: Certificate[] }) {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter((cert) => cert.name.toLowerCase().includes(q) || cert.issuer.toLowerCase().includes(q));
  }, [data, search]);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <SearchInput value={search} onChange={setSearch} placeholder="Search certificates..." />
          <CertificateFormDialog><Button size="sm"><Plus className="h-4 w-4 mr-2" />Add Certificate</Button></CertificateFormDialog>
        </div>
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Issuer</TableHead><TableHead>Issue Date</TableHead><TableHead className="w-24">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {filtered.map((cert) => (
              <TableRow key={cert.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{cert.name}</TableCell>
                <TableCell>{cert.issuer}</TableCell>
                <TableCell>{cert.issueDate ? new Date(cert.issueDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "N/A"}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <CertificateFormDialog data={cert}><Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button></CertificateFormDialog>
                    <DeleteDialog title={cert.name} onDelete={async () => { await deleteCertificate(cert.id); toast.success("Certificate deleted"); }} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow><TableCell colSpan={4} className="h-32">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <Award className="h-8 w-8 mb-2 opacity-50" />
                  <p className="text-sm">{data.length === 0 ? "No certificates yet" : "No results found"}</p>
                  <p className="text-xs mt-1">{data.length === 0 ? 'Click "Add Certificate" to get started' : "Try adjusting your search"}</p>
                </div>
              </TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
