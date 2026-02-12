import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { AnimateOnScroll } from "@/components/portfolio/animate-on-scroll";
import { GraduationCap } from "lucide-react";

interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date | null;
  endDate: Date | null;
  description: string | null;
}

interface EducationSectionProps {
  education: Education[];
}

function formatYear(date: Date): string {
  return new Date(date).getFullYear().toString();
}

export function EducationSection({ education }: EducationSectionProps) {
  if (education.length === 0) return null;

  return (
    <section id="education" className="py-20 bg-muted/30">
      <div className="mx-auto max-w-5xl px-4">
        <AnimateOnScroll>
          <SectionHeading title="Education" subtitle="My academic background" />
        </AnimateOnScroll>
        <div className="mx-auto grid max-w-3xl gap-6">
          {education.map((edu, index) => (
            <AnimateOnScroll key={edu.id} delay={index * 150}>
              <Card className="card-hover">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{edu.degree} in {edu.fieldOfStudy}</CardTitle>
                      <CardDescription className="mt-1">
                        {edu.institution}
                        {edu.endDate && <span> &middot; {formatYear(edu.endDate)}</span>}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                {edu.description && (
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">{edu.description}</p>
                  </CardContent>
                )}
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
