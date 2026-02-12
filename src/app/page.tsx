export const dynamic = "force-dynamic";

import { getPortfolioData } from "@/lib/queries/get-portfolio-data";
import { Navbar } from "@/components/portfolio/navbar";
import { HeroSection } from "@/components/portfolio/hero-section";
import { AboutSection } from "@/components/portfolio/about-section";
import { ExperienceSection } from "@/components/portfolio/experience-section";
import { EducationSection } from "@/components/portfolio/education-section";
import { CertificatesSection } from "@/components/portfolio/certificates-section";
import { SkillsSection } from "@/components/portfolio/skills-section";
import { ProjectsSection } from "@/components/portfolio/projects-section";
import { ContactSection } from "@/components/portfolio/contact-section";
import { Footer } from "@/components/portfolio/footer";

export default async function Home() {
  const {
    about,
    contact,
    experiences,
    education,
    certificates,
    skills,
    projects,
  } = await getPortfolioData();

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {about && contact ? (
        <HeroSection about={about} contact={contact} />
      ) : (
        <section className="flex min-h-[60vh] items-center justify-center">
          <p className="text-muted-foreground">Portfolio data is loading...</p>
        </section>
      )}

      {about && <AboutSection about={about} />}

      <ExperienceSection experiences={experiences} />

      <EducationSection education={education} />

      <CertificatesSection certificates={certificates} />

      <SkillsSection skills={skills} />

      <ProjectsSection projects={projects} />

      {contact && <ContactSection contact={contact} />}

      <Footer />
    </div>
  );
}
