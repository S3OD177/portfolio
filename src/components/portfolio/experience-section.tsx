import { SectionHeading } from "@/components/portfolio/section-heading";
import { AnimateOnScroll } from "@/components/portfolio/animate-on-scroll";

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string | null;
  startDate: Date;
  endDate: Date | null;
  description: string | null;
  isCurrent: boolean;
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="py-20">
      <div className="mx-auto max-w-5xl px-4">
        <AnimateOnScroll>
          <SectionHeading title="Experience" subtitle="My professional journey" />
        </AnimateOnScroll>
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-border md:left-6" />
          <div className="flex flex-col gap-10">
            {experiences.map((exp, index) => (
              <AnimateOnScroll key={exp.id} delay={index * 150}>
                <div className="relative pl-12 md:pl-16">
                  <div className="timeline-dot absolute left-[11px] top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background md:left-[19px]" />
                  <div className="rounded-lg p-4 transition-colors hover:bg-muted/50">
                    <h3 className="text-lg font-semibold">{exp.position}</h3>
                    <p className="text-base font-medium text-primary">{exp.company}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                      <span>
                        {formatDate(exp.startDate)} &mdash;{" "}
                        {exp.isCurrent ? "Present" : exp.endDate ? formatDate(exp.endDate) : "Present"}
                      </span>
                      {exp.location && (
                        <>
                          <span className="hidden sm:inline">&middot;</span>
                          <span>{exp.location}</span>
                        </>
                      )}
                    </div>
                    {exp.description && (
                      <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
