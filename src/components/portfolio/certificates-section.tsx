import { Award, ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/portfolio/section-heading";

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: Date | null;
  credentialUrl: string | null;
}

interface CertificatesSectionProps {
  certificates: Certificate[];
}

function formatYear(date: Date): string {
  return new Date(date).getFullYear().toString();
}

export function CertificatesSection({
  certificates,
}: CertificatesSectionProps) {
  if (certificates.length === 0) return null;

  return (
    <section id="certificates" className="py-20">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading
          title="Certificates"
          subtitle="Professional certifications and credentials"
        />
        <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
          {certificates.map((cert) => (
            <Card key={cert.id}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Award className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <CardTitle className="text-base">{cert.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {cert.issuer}
                      {cert.issueDate && (
                        <span> &middot; {formatYear(cert.issueDate)}</span>
                      )}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              {cert.credentialUrl && (
                <CardContent>
                  <Button variant="link" size="sm" className="h-auto p-0" asChild>
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Credential
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
