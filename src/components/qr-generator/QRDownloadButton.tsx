"use client";

import { QRDownloadButtonProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { downloadQRCodePNG, downloadQRCodeSVG } from "@/lib/qr-code";
import { formatInputForQR } from "@/lib/validation";
import { useState } from "react";

interface QRDownloadButtonGroupProps {
  qrDataUrl: string | null;
  inputValue: string;
  inputType: "text" | "url" | "email" | "phone";
}

export function QRDownloadButtonGroup({
  qrDataUrl,
  inputValue,
  inputType,
}: QRDownloadButtonGroupProps) {
  const [isDownloadingPNG, setIsDownloadingPNG] = useState(false);
  const [isDownloadingSVG, setIsDownloadingSVG] = useState(false);

  const handleDownloadPNG = async () => {
    if (!inputValue.trim() || !qrDataUrl) return;

    setIsDownloadingPNG(true);
    try {
      const formattedText = formatInputForQR(inputType, inputValue);
      await downloadQRCodePNG(formattedText);
    } catch (error) {
      console.error("Error downloading PNG:", error);
      alert("Failed to download QR code. Please try again.");
    } finally {
      setIsDownloadingPNG(false);
    }
  };

  const handleDownloadSVG = async () => {
    if (!inputValue.trim() || !qrDataUrl) return;

    setIsDownloadingSVG(true);
    try {
      const formattedText = formatInputForQR(inputType, inputValue);
      await downloadQRCodeSVG(formattedText);
    } catch (error) {
      console.error("Error downloading SVG:", error);
      alert("Failed to download QR code. Please try again.");
    } finally {
      setIsDownloadingSVG(false);
    }
  };

  const isDisabled = !qrDataUrl || !inputValue.trim();

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
      <Button
        onClick={handleDownloadPNG}
        disabled={isDisabled || isDownloadingPNG}
        className="w-full sm:w-auto"
        aria-label="Download QR code as PNG"
      >
        <Download className="size-4" aria-hidden="true" />
        {isDownloadingPNG ? "Downloading..." : "Download PNG"}
      </Button>
      <Button
        onClick={handleDownloadSVG}
        disabled={isDisabled || isDownloadingSVG}
        variant="outline"
        className="w-full sm:w-auto"
        aria-label="Download QR code as SVG"
      >
        <Download className="size-4" aria-hidden="true" />
        {isDownloadingSVG ? "Downloading..." : "Download SVG"}
      </Button>
    </div>
  );
}
