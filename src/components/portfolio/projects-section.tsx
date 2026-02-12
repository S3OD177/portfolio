import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { AnimateOnScroll } from "@/components/portfolio/animate-on-scroll";

interface Project {
  id: string;
  title: string;
  description: string | null;
  techStack: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  imageUrl: string | null;
  isFeatured: boolean;
}

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  if (projects.length === 0) return null;

  return (
    <section id="projects" className="py-20">
      <div className="mx-auto max-w-5xl px-4">
        <AnimateOnScroll>
          <SectionHeading title="Projects" subtitle="Things I have built" />
        </AnimateOnScroll>
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <AnimateOnScroll key={project.id} delay={index * 150}>
              <Card className="card-hover flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    {project.isFeatured && (
                      <Badge variant="secondary" className="shrink-0 text-xs">Featured</Badge>
                    )}
                  </div>
                  {project.description && (
                    <CardDescription className="mt-1 line-clamp-3">{project.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="mt-auto flex flex-col gap-4">
                  {project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <Badge key={tech} variant="outline" className="badge-hover text-xs">{tech}</Badge>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    {project.liveUrl && (
                      <Button variant="outline" size="sm" asChild className="group">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button variant="outline" size="sm" asChild className="group">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
                          Source
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
