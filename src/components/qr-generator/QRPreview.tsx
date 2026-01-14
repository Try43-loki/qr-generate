"use client";

import { QRPreviewProps } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function QRPreview({ qrDataUrl, isLoading, error }: QRPreviewProps) {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center justify-center p-6 min-h-[300px] sm:min-h-[400px]">
        {isLoading && (
          <div className="flex flex-col items-center justify-center gap-4">
            <div
              className="size-[200px] sm:size-[300px] md:size-[400px] animate-pulse rounded-lg bg-muted"
              aria-label="Generating QR code"
            />
            <p className="text-sm text-muted-foreground">
              Generating QR code...
            </p>
          </div>
        )}

        {!isLoading && error && (
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div
              className="size-[200px] sm:size-[300px] md:size-[400px] flex items-center justify-center rounded-lg border-2 border-destructive bg-destructive/10"
              role="alert"
              aria-live="assertive"
            >
              <p className="text-destructive font-medium">{error}</p>
            </div>
          </div>
        )}

        {!isLoading && !error && qrDataUrl && (
          <div className="flex flex-col items-center gap-4">
            <img
              src={qrDataUrl}
              alt="QR Code"
              className={cn(
                "w-full max-w-[200px] sm:max-w-[300px] md:max-w-[400px]",
                "h-auto rounded-lg border-2 border-border shadow-md"
              )}
              aria-label="Generated QR code"
            />
          </div>
        )}

        {!isLoading && !error && !qrDataUrl && (
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div
              className="size-[200px] sm:size-[300px] md:size-[400px] flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30"
              aria-label="QR code preview area"
            >
              <p className="text-muted-foreground text-sm">
                Enter content above to generate QR code
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
