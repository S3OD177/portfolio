import { Label } from "@/components/ui/label";

interface RequiredLabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

export function RequiredLabel({ htmlFor, children }: RequiredLabelProps) {
  return (
    <Label htmlFor={htmlFor}>
      {children} <span className="text-destructive">*</span>
    </Label>
  );
}
