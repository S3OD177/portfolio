import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/portfolio/section-heading";

interface AboutSectionProps {
  about: {
    fullName: string;
    title: string;
    summary: string;
  };
}

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading title="About Me" subtitle="Get to know me better" />
        <Card className="mx-auto max-w-3xl">
          <CardContent>
            <p className="whitespace-pre-line text-base leading-relaxed text-muted-foreground">
              {about.summary}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
