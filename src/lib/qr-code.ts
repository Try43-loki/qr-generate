import QRCode from "qrcode";

export interface QRCodeOptions {
  size?: number;
  errorCorrectionLevel?: "L" | "M" | "Q" | "H";
  margin?: number;
  color?: {
    dark?: string;
    light?: string;
  };
}

const DEFAULT_OPTIONS: Required<QRCodeOptions> = {
  size: 400,
  errorCorrectionLevel: "M",
  margin: 4,
  color: {
    dark: "#000000",
    light: "#FFFFFF",
  },
};

/**
 * Generates a QR code as PNG data URL
 */
export async function generateQRCodePNG(
  text: string,
  options: QRCodeOptions = {}
): Promise<string> {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  try {
    const dataUrl = await QRCode.toDataURL(text, {
      width: opts.size,
      errorCorrectionLevel: opts.errorCorrectionLevel,
      margin: opts.margin,
      color: opts.color,
    });
    return dataUrl;
  } catch (error) {
    console.error("Error generating QR code PNG:", error);
    throw new Error("Failed to generate QR code. Please try again.");
  }
}

/**
 * Generates a QR code as SVG string
 */
export async function generateQRCodeSVG(
  text: string,
  options: QRCodeOptions = {}
): Promise<string> {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  try {
    const svgString = await QRCode.toString(text, {
      type: "svg",
      width: opts.size,
      errorCorrectionLevel: opts.errorCorrectionLevel,
      margin: opts.margin,
      color: opts.color,
    });
    return svgString;
  } catch (error) {
    console.error("Error generating QR code SVG:", error);
    throw new Error("Failed to generate QR code. Please try again.");
  }
}

/**
 * Generates QR code data URL for preview (PNG format)
 * Expects already formatted text (use formatInputForQR before calling)
 */
export async function generateQRCodePreview(
  formattedText: string,
  size: number = 400
): Promise<string> {
  if (!formattedText.trim()) {
    return "";
  }

  return generateQRCodePNG(formattedText, { size });
}

/**
 * Downloads a file with the given content and filename
 */
export function downloadFile(
  content: string,
  filename: string,
  mimeType: string
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Downloads QR code as PNG
 */
export async function downloadQRCodePNG(
  text: string,
  options: QRCodeOptions = {}
): Promise<void> {
  const dataUrl = await generateQRCodePNG(text, options);
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, -5);
  const filename = `qrcode-${timestamp}.png`;

  // Convert data URL to blob and download
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Downloads QR code as SVG
 */
export async function downloadQRCodeSVG(
  text: string,
  options: QRCodeOptions = {}
): Promise<void> {
  const svgString = await generateQRCodeSVG(text, options);
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, -5);
  const filename = `qrcode-${timestamp}.svg`;

  downloadFile(svgString, filename, "image/svg+xml");
}
