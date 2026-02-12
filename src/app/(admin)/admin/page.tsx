import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Briefcase,
  GraduationCap,
  Award,
  Wrench,
  FolderOpen,
  MessageSquare,
  Plus,
  Clock,
} from "lucide-react";

export default async function AdminDashboard() {
  const [
    experiences,
    education,
    certificates,
    skills,
    projects,
    totalMessages,
    unreadMessages,
    recentExperiences,
    recentProjects,
    recentCertificates,
    recentMessages,
  ] = await Promise.all([
    prisma.experience.count(),
    prisma.education.count(),
    prisma.certificate.count(),
    prisma.skill.count(),
    prisma.project.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.experience.findMany({
      orderBy: { createdAt: "desc" },
      take: 2,
      select: { id: true, position: true, company: true, createdAt: true },
    }),
    prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      take: 2,
      select: { id: true, title: true, createdAt: true },
    }),
    prisma.certificate.findMany({
      orderBy: { createdAt: "desc" },
      take: 2,
      select: { id: true, name: true, createdAt: true },
    }),
    prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 2,
      select: { id: true, name: true, createdAt: true },
    }),
  ]);

  const stats = [
    { label: "Experiences", count: experiences, icon: Briefcase, href: "/admin/experiences" },
    { label: "Education", count: education, icon: GraduationCap, href: "/admin/education" },
    { label: "Certificates", count: certificates, icon: Award, href: "/admin/certificates" },
    { label: "Skills", count: skills, icon: Wrench, href: "/admin/skills" },
    { label: "Projects", count: projects, icon: FolderOpen, href: "/admin/projects" },
    {
      label: "Messages",
      count: totalMessages,
      icon: MessageSquare,
      href: "/admin/messages",
      badge: unreadMessages > 0 ? `${unreadMessages} unread` : undefined,
    },
  ];

  // Build recent activity feed
  type ActivityItem = { label: string; section: string; icon: typeof Briefcase; date: Date; href: string };
  const recentItems: ActivityItem[] = [
    ...recentExperiences.map((e) => ({
      label: `${e.position} at ${e.company}`,
      section: "Experience",
      icon: Briefcase,
      date: e.createdAt,
      href: "/admin/experiences",
    })),
    ...recentProjects.map((p) => ({
      label: p.title,
      section: "Project",
      icon: FolderOpen,
      date: p.createdAt,
      href: "/admin/projects",
    })),
    ...recentCertificates.map((c) => ({
      label: c.name,
      section: "Certificate",
      icon: Award,
      date: c.createdAt,
      href: "/admin/certificates",
    })),
    ...recentMessages.map((m) => ({
      label: `Message from ${m.name}`,
      section: "Message",
      icon: MessageSquare,
      date: m.createdAt,
      href: "/admin/messages",
    })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground mt-1">{today}</p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold">{stat.count}</p>
                  {stat.badge && (
                    <Badge variant="default" className="text-xs">
                      {stat.badge}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/experiences">
              <Plus className="h-4 w-4 mr-1" />
              Add Experience
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/projects">
              <Plus className="h-4 w-4 mr-1" />
              Add Project
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/certificates">
              <Plus className="h-4 w-4 mr-1" />
              Add Certificate
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/messages">
              <MessageSquare className="h-4 w-4 mr-1" />
              View Messages
              {unreadMessages > 0 && (
                <Badge variant="destructive" className="ml-1 text-xs">
                  {unreadMessages}
                </Badge>
              )}
            </Link>
          </Button>
        </div>
      </div>

      {/* Recent Activity */}
      {recentItems.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentItems.map((item, i) => (
                <Link
                  key={`${item.section}-${i}`}
                  href={item.href}
                  className="flex items-center justify-between text-sm hover:bg-muted/50 rounded-lg p-2 -mx-2 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <item.icon className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="truncate">{item.label}</span>
                    <Badge variant="outline" className="text-xs shrink-0">
                      {item.section}
                    </Badge>
                  </div>
                  <span className="text-muted-foreground text-xs shrink-0 ml-4">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
