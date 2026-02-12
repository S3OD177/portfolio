import { Mail, MapPin, Linkedin, Download, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  about: {
    fullName: string;
    title: string;
    summary: string;
    avatarUrl: string | null;
    resumeUrl: string | null;
  };
  contact: {
    email: string;
    phone: string | null;
    location: string | null;
    linkedinUrl: string | null;
    githubUrl: string | null;
  };
}

export function HeroSection({ about, contact }: HeroSectionProps) {
  const tagline = about.summary.split(/[.!?]/)[0] + ".";

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden py-20">
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float absolute -top-10 left-[10%] h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="animate-float-delayed absolute -bottom-10 right-[10%] h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />
        <div className="animate-float-slow absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 text-center">
        <div className="stagger-children">
          {contact.location && (
            <Badge variant="secondary" className="mb-6 gap-1.5 px-3 py-1">
              <MapPin className="h-3.5 w-3.5" />
              {contact.location}
            </Badge>
          )}

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            <span className="gradient-text">{about.fullName}</span>
          </h1>

          <div className="mt-4 flex justify-center">
            <p className="typewriter text-xl text-muted-foreground sm:text-2xl md:text-3xl">
              {about.title}
            </p>
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground/80">
            {tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {about.resumeUrl && (
              <Button asChild size="lg" className="group">
                <a href={about.resumeUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                  Download CV
                </a>
              </Button>
            )}
            <Button variant="outline" size="lg" asChild className="group">
              <a href="#contact">
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                Contact Me
              </a>
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            {contact.email && (
              <Button variant="ghost" size="icon" asChild className="icon-hover">
                <a href={`mailto:${contact.email}`} aria-label="Email">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            )}
            {contact.linkedinUrl && (
              <Button variant="ghost" size="icon" asChild className="icon-hover">
                <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
