import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { AnimateOnScroll } from "@/components/portfolio/animate-on-scroll";
import { ContactForm } from "@/components/portfolio/contact-form";

interface ContactSectionProps {
  contact: {
    email: string;
    phone: string | null;
    location: string | null;
    linkedinUrl: string | null;
    githubUrl: string | null;
  };
}

export function ContactSection({ contact }: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="mx-auto max-w-5xl px-4">
        <AnimateOnScroll>
          <SectionHeading
            title="Contact"
            subtitle="Get in touch with me"
          />
        </AnimateOnScroll>
        <AnimateOnScroll delay={100}>
          <Card className="mx-auto max-w-xl card-hover">
            <CardContent>
              <div className="flex flex-col gap-5">
                <a
                  href={`mailto:${contact.email}`}
                  className="icon-hover flex items-center gap-3 rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Mail className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">{contact.email}</span>
                </a>

                {contact.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="icon-hover flex items-center gap-3 rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <Phone className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm">{contact.phone}</span>
                  </a>
                )}

                {contact.location && (
                  <div className="flex items-center gap-3 p-2 text-muted-foreground">
                    <MapPin className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm">{contact.location}</span>
                  </div>
                )}

                {contact.linkedinUrl && (
                  <a
                    href={contact.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-hover flex items-center gap-3 rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <Linkedin className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm">LinkedIn Profile</span>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        </AnimateOnScroll>
        <AnimateOnScroll delay={250}>
          <ContactForm />
        </AnimateOnScroll>
      </div>
    </section>
  );
}
