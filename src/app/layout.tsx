import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QR Code Generator - Free Online QR Code Maker",
  description:
    "Generate QR codes instantly for URLs, text, email, and phone numbers. Download as PNG or SVG. Free, fast, and easy to use.",
  keywords: [
    "QR code",
    "QR code generator",
    "QR code maker",
    "free QR code",
    "QR code PNG",
    "QR code SVG",
  ],
  authors: [{ name: "QR Code Generator" }],
  openGraph: {
    title: "QR Code Generator - Free Online QR Code Maker",
    description:
      "Generate QR codes instantly for URLs, text, email, and phone numbers. Download as PNG or SVG.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code Generator - Free Online QR Code Maker",
    description:
      "Generate QR codes instantly for URLs, text, email, and phone numbers. Download as PNG or SVG.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
