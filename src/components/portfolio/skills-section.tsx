import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { AnimateOnScroll } from "@/components/portfolio/animate-on-scroll";

interface Skill {
  id: string;
  name: string;
  category: "TECHNICAL" | "SOFT";
}

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  if (skills.length === 0) return null;

  const technical = skills.filter((s) => s.category === "TECHNICAL");
  const soft = skills.filter((s) => s.category === "SOFT");

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="mx-auto max-w-5xl px-4">
        <AnimateOnScroll>
          <SectionHeading title="Skills" subtitle="Technologies and competencies" />
        </AnimateOnScroll>
        <div className="mx-auto grid max-w-3xl gap-10 md:grid-cols-2">
          {technical.length > 0 && (
            <AnimateOnScroll delay={100}>
              <div>
                <h3 className="mb-4 text-lg font-semibold">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {technical.map((skill) => (
                    <Badge key={skill.id} variant="default" className="badge-hover cursor-default">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          )}
          {soft.length > 0 && (
            <AnimateOnScroll delay={250}>
              <div>
                <h3 className="mb-4 text-lg font-semibold">Soft Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {soft.map((skill) => (
                    <Badge key={skill.id} variant="secondary" className="badge-hover cursor-default">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          )}
        </div>
      </div>
    </section>
  );
}
