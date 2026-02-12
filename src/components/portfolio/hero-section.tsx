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
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center py-20">
      <div className="mx-auto max-w-5xl px-4 text-center">
        {contact.location && (
          <Badge variant="secondary" className="mb-6 gap-1.5 px-3 py-1">
            <MapPin className="h-3.5 w-3.5" />
            {contact.location}
          </Badge>
        )}

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          {about.fullName}
        </h1>

        <p className="mt-4 text-xl text-muted-foreground sm:text-2xl">
          {about.title}
        </p>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground/80">
          {tagline}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {about.resumeUrl && (
            <Button asChild size="lg">
              <a href={about.resumeUrl} target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </Button>
          )}
          <Button variant="outline" size="lg" asChild>
            <a href="#contact">
              <ArrowDown className="h-4 w-4" />
              Contact Me
            </a>
          </Button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          {contact.email && (
            <Button variant="ghost" size="icon" asChild>
              <a href={`mailto:${contact.email}`} aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          )}
          {contact.linkedinUrl && (
            <Button variant="ghost" size="icon" asChild>
              <a
                href={contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
