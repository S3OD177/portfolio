import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Briefcase,
  GraduationCap,
  Award,
  Wrench,
  FolderOpen,
} from "lucide-react";

export default async function AdminDashboard() {
  const [experiences, education, certificates, skills, projects] =
    await Promise.all([
      prisma.experience.count(),
      prisma.education.count(),
      prisma.certificate.count(),
      prisma.skill.count(),
      prisma.project.count(),
    ]);

  const stats = [
    { label: "Experiences", count: experiences, icon: Briefcase },
    { label: "Education", count: education, icon: GraduationCap },
    { label: "Certificates", count: certificates, icon: Award },
    { label: "Skills", count: skills, icon: Wrench },
    { label: "Projects", count: projects, icon: FolderOpen },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stat.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
