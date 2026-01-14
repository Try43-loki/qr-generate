export type QRInputType = "text" | "url" | "email" | "phone";

export interface QRCodeData {
  dataUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface QRInputFormProps {
  inputType: QRInputType;
  inputValue: string;
  error: string | null;
  onInputChange: (value: string) => void;
  onTypeChange: (type: QRInputType) => void;
}

export interface QRPreviewProps {
  qrDataUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface QRDownloadButtonProps {
  qrDataUrl: string | null;
  format: "png" | "svg";
  onDownload: () => void;
  disabled?: boolean;
}
