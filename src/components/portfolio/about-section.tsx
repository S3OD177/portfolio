import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { AnimateOnScroll } from "@/components/portfolio/animate-on-scroll";

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
        <AnimateOnScroll>
          <SectionHeading title="About Me" subtitle="Get to know me better" />
        </AnimateOnScroll>
        <AnimateOnScroll delay={200}>
          <Card className="mx-auto max-w-3xl card-hover">
            <CardContent>
              <p className="whitespace-pre-line text-base leading-relaxed text-muted-foreground">
                {about.summary}
              </p>
            </CardContent>
          </Card>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
