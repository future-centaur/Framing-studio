import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'Hollow & Hale — Custom Framing Studio',
  description: 'Commission a custom frame for your photography. Live preview, transparent KES pricing, museum-grade materials. Order direct or through your photographer.',
  keywords: 'custom framing, photo framing, Nairobi framing, KES, museum-grade framing, moulding, matting',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    siteName: 'Hollow & Hale',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}

