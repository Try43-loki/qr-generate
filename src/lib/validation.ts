import { QRInputType } from "@/types";

/**
 * Validates a URL format
 */
export function validateURL(url: string): {
  isValid: boolean;
  error: string | null;
} {
  if (!url.trim()) {
    return { isValid: false, error: null }; // Empty is not an error, just empty
  }

  try {
    // Try to construct a URL object
    const urlObj = new URL(url);
    // Check if it's http or https
    if (urlObj.protocol !== "http:" && urlObj.protocol !== "https:") {
      return {
        isValid: false,
        error: "Please enter a valid URL starting with http:// or https://",
      };
    }
    return { isValid: true, error: null };
  } catch {
    // If URL constructor fails, check if it starts with http:// or https://
    if (/^https?:\/\/.+/.test(url)) {
      return { isValid: true, error: null };
    }
    return {
      isValid: false,
      error: "Please enter a valid URL starting with http:// or https://",
    };
  }
}

/**
 * Validates an email format
 */
export function validateEmail(email: string): {
  isValid: boolean;
  error: string | null;
} {
  if (!email.trim()) {
    return { isValid: false, error: null }; // Empty is not an error, just empty
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email)) {
    return { isValid: true, error: null };
  }
  return {
    isValid: false,
    error: "Please enter a valid email address",
  };
}

/**
 * Validates and normalizes a phone number
 */
export function validatePhone(phone: string): {
  isValid: boolean;
  error: string | null;
  normalized: string;
} {
  if (!phone.trim()) {
    return { isValid: false, error: null, normalized: "" }; // Empty is not an error
  }

  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, "");

  // Check if it has at least some digits
  if (cleaned.replace(/\+/g, "").length < 7) {
    return {
      isValid: false,
      error: "Please enter a valid phone number",
      normalized: cleaned,
    };
  }

  // Normalize: if it doesn't start with +, add it (optional, or keep as is)
  const normalized = cleaned.startsWith("+") ? cleaned : `+${cleaned}`;

  return { isValid: true, error: null, normalized };
}

/**
 * Validates input based on type
 */
export function validateInput(
  type: QRInputType,
  value: string
): { isValid: boolean; error: string | null; normalized?: string } {
  switch (type) {
    case "url":
      return validateURL(value);
    case "email":
      return validateEmail(value);
    case "phone":
      return validatePhone(value);
    case "text":
    default:
      // Text input is always valid (just check length limit)
      if (value.length > 2000) {
        return {
          isValid: false,
          error: "Text is too long. Maximum 2000 characters allowed.",
        };
      }
      return { isValid: true, error: null };
  }
}

/**
 * Formats input value based on type for QR encoding
 */
export function formatInputForQR(type: QRInputType, value: string): string {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  switch (type) {
    case "email":
      return `mailto:${trimmed}`;
    case "phone": {
      const phoneResult = validatePhone(trimmed);
      return `tel:${phoneResult.normalized}`;
    }
    case "url":
      // Ensure URL has protocol
      if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
        return `https://${trimmed}`;
      }
      return trimmed;
    case "text":
    default:
      return trimmed;
  }
}
