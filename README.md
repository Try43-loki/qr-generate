# QR Code Generator

A modern, responsive QR Code Generator built with Next.js, TypeScript, and shadcn/ui. Generate QR codes instantly for URLs, text, email addresses, and phone numbers. Download your QR codes as PNG or SVG files.

![QR Code Generator](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)

## Features

- **Multiple Input Types**: Generate QR codes from text, URLs, email addresses, and phone numbers
- **Real-time Preview**: See your QR code update instantly as you type
- **Download Options**: Download QR codes as PNG or SVG formats
- **Input Validation**: Built-in validation for URLs, emails, and phone numbers with helpful error messages
- **Responsive Design**: Mobile-first design that works seamlessly on all devices
- **Accessibility**: Full keyboard navigation, ARIA labels, and screen reader support
- **Modern UI**: Clean, minimal interface built with shadcn/ui components
- **Dark Mode**: Automatic dark mode support based on system preferences
- **SEO Optimized**: Proper metadata and Open Graph tags for better discoverability

## Tech Stack

- **Framework**: [Next.js 16.1.1](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **QR Code Generation**: [qrcode](https://www.npmjs.com/package/qrcode)
- **Icons**: [lucide-react](https://lucide.dev/)

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd generate-qr-code/my-app
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
my-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with SEO metadata
│   │   ├── page.tsx             # Main QR generator page
│   │   └── globals.css          # Global styles and Tailwind config
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── label.tsx
│   │   │   └── card.tsx
│   │   └── qr-generator/        # QR-specific components
│   │       ├── QRInputForm.tsx  # Input form with type selector
│   │       ├── QRPreview.tsx    # QR code preview display
│   │       └── QRDownloadButton.tsx # Download buttons
│   ├── lib/
│   │   ├── qr-code.ts           # QR generation utilities
│   │   ├── validation.ts        # Input validation functions
│   │   └── utils.ts             # Utility functions (cn helper)
│   └── types/
│       └── index.ts              # TypeScript type definitions
├── components.json               # shadcn/ui configuration
├── package.json
└── README.md
```

## Usage

### Generating QR Codes

1. **Select Input Type**: Choose from Text, URL, Email, or Phone
2. **Enter Content**: Type your content in the input field
3. **Preview**: The QR code updates in real-time as you type
4. **Download**: Click "Download PNG" or "Download SVG" to save your QR code

### Input Types

- **Text**: Plain text (up to 2000 characters)
- **URL**: Web URLs (automatically adds https:// if missing)
- **Email**: Email addresses (formatted as `mailto:` links)
- **Phone**: Phone numbers (formatted as `tel:` links with international format)

### Validation

- **URLs**: Must start with `http://` or `https://`
- **Emails**: Must follow standard email format
- **Phones**: Accepts digits, spaces, dashes, parentheses, and plus signs

## Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Adding shadcn/ui Components

To add more shadcn/ui components:

```bash
npx shadcn@latest add [component-name]
```

## Deployment

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository in [Vercel Dashboard](https://vercel.com/new)
3. Vercel will auto-detect Next.js and configure the build
4. Your app will be deployed automatically on every push to main

### Build for Production

```bash
pnpm build
pnpm start
```

## Features in Detail

### Real-time Generation

QR codes are generated with a 300ms debounce to optimize performance while maintaining a responsive feel.

### Responsive Design

- **Mobile** (< 640px): Single column, 200px QR codes
- **Tablet** (640px - 1024px): Two columns, 300px QR codes
- **Desktop** (> 1024px): Two columns, 400px QR codes

### Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader announcements
- WCAG AA color contrast compliance

### Error Handling

- Inline validation errors
- User-friendly error messages
- Graceful handling of QR generation failures

## License

This project is open source and available under the MIT License.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- QR code generation by [qrcode](https://www.npmjs.com/package/qrcode)
