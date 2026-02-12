"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const pathMap: Record<string, string> = {
  "": "Dashboard",
  about: "About / Profile",
  experiences: "Experiences",
  education: "Education",
  certificates: "Certificates",
  skills: "Skills",
  projects: "Projects",
  contact: "Contact Info",
  messages: "Messages",
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const segment = pathname.replace("/admin", "").replace(/^\//, "");
  const label = pathMap[segment] ?? segment;
  const isDashboard = segment === "";

  return (
    <nav className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
      <Link href="/admin" className="flex items-center gap-1 hover:text-foreground transition-colors">
        <Home className="h-3.5 w-3.5" />
        <span>Admin</span>
      </Link>
      {!isDashboard && (
        <>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">{label}</span>
        </>
      )}
    </nav>
  );
}
