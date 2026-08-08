import type { Metadata } from 'next';
import './globals.css';

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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
