"use client";

import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder = "Search..." }: SearchInputProps) {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-9 pr-8"
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6"
          onClick={() => onChange("")}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}
