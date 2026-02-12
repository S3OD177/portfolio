export const dynamic = "force-dynamic";

import { Sidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { Breadcrumbs } from "@/components/admin/breadcrumbs";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-4 md:p-6">
          <Breadcrumbs />
          {children}
        </main>
      </div>
    </div>
  );
}
