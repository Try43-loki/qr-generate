"use client";

import { QRInputFormProps, QRInputType } from "@/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const INPUT_TYPE_LABELS: Record<QRInputType, string> = {
  text: "Text",
  url: "URL",
  email: "Email",
  phone: "Phone",
};

const INPUT_PLACEHOLDERS: Record<QRInputType, string> = {
  text: "Enter text...",
  url: "https://example.com",
  email: "example@email.com",
  phone: "+1234567890",
};

export function QRInputForm({
  inputType,
  inputValue,
  error,
  onInputChange,
  onTypeChange,
}: QRInputFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="input-type">Input Type</Label>
        <Select value={inputType} onValueChange={onTypeChange}>
          <SelectTrigger id="input-type" className="w-full sm:w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(INPUT_TYPE_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="qr-input">{INPUT_TYPE_LABELS[inputType]} Content</Label>
        <Input
          id="qr-input"
          type={
            inputType === "email"
              ? "email"
              : inputType === "url"
              ? "url"
              : "text"
          }
          placeholder={INPUT_PLACEHOLDERS[inputType]}
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? "input-error" : undefined}
          className={cn(error && "border-destructive")}
        />
        {error && (
          <p
            id="input-error"
            className="text-sm text-destructive"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
