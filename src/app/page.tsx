"use client";

import { useState, useEffect, useCallback } from "react";
import { QRInputType } from "@/types";
import { QRInputForm } from "@/components/qr-generator/QRInputForm";
import { QRPreview } from "@/components/qr-generator/QRPreview";
import { QRDownloadButtonGroup } from "@/components/qr-generator/QRDownloadButton";
import { validateInput, formatInputForQR } from "@/lib/validation";
import { generateQRCodePreview } from "@/lib/qr-code";

export default function HomePage() {
  const [inputType, setInputType] = useState<QRInputType>("text");
  const [inputValue, setInputValue] = useState<string>("");
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Get responsive QR size based on window width
  const getQRSize = useCallback(() => {
    if (typeof window === "undefined") return 400;
    if (window.innerWidth < 640) return 200; // mobile
    if (window.innerWidth < 1024) return 300; // tablet
    return 400; // desktop
  }, []);

  // Generate QR code when input changes
  useEffect(() => {
    const generateQR = async () => {
      const trimmedValue = inputValue.trim();

      // Clear QR if input is empty
      if (!trimmedValue) {
        setQrDataUrl(null);
        setError(null);
        return;
      }

      // Validate input
      const validation = validateInput(inputType, trimmedValue);
      if (!validation.isValid) {
        setError(validation.error || null);
        setQrDataUrl(null);
        return;
      }

      // Clear previous error if validation passes
      setError(null);
      setIsGenerating(true);

      try {
        // Format input for QR encoding
        const formattedText = formatInputForQR(inputType, trimmedValue);

        // Generate QR code
        const size = getQRSize();
        const dataUrl = await generateQRCodePreview(formattedText, size);
        setQrDataUrl(dataUrl);
      } catch (err) {
        console.error("Error generating QR code:", err);
        setError("Failed to generate QR code. Please try again.");
        setQrDataUrl(null);
      } finally {
        setIsGenerating(false);
      }
    };

    // Debounce QR generation to avoid too many calls
    const timeoutId = setTimeout(() => {
      generateQR();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [inputValue, inputType, getQRSize]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleTypeChange = (type: QRInputType) => {
    setInputType(type);
    // Clear error when type changes
    setError(null);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl space-y-8">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            QR Code Generator
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Generate QR codes instantly for URLs, text, email, and phone numbers
          </p>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <QRInputForm
              inputType={inputType}
              inputValue={inputValue}
              error={error}
              onInputChange={handleInputChange}
              onTypeChange={handleTypeChange}
            />
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <QRPreview
              qrDataUrl={qrDataUrl}
              isLoading={isGenerating}
              error={error}
            />
          </div>
        </div>

        {/* Download Buttons */}
        <div className="flex justify-center">
          <QRDownloadButtonGroup
            qrDataUrl={qrDataUrl}
            inputValue={inputValue}
            inputType={inputType}
          />
        </div>
      </div>
    </main>
  );
}
