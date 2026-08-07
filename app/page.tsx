'use client';

/**
 * app/page.tsx
 * Landing page.
 * Displays two clear entry points: "Order for myself" vs. "I'm a photographer".
 * Reads studio config dynamically to show branding.
 * Incorporates the rabbet visual groove.
 */

import { StudioHeader, StudioName, StudioLogo } from '@/components/branding/StudioBranding';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-height-screen">
      <StudioHeader />

      <main className="section flex-grow flex items-center justify-center">
        <div className="container-narrow text-center flex flex-col items-center gap-6">
          <div className="mb-4 animate-fade-in">
            <StudioLogo width={180} height={60} />
          </div>

          <h1 className="text-serif animate-slide-up" style={{ color: 'var(--text-0)' }}>
            Exquisite framing for fine art photography.
          </h1>

          <p className="text-secondary text-sm animate-slide-up" style={{ maxWidth: '540px' }}>
            We composite your photographs into premium gallery mouldings, acid-free mats,
            and 99% UV-blocking glazings in real-time. denominating everything transparently.
          </p>

          <div className="rabbet-divider" />

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-4">
            <Link
              href="/configure"
              className="btn btn-primary btn-lg rabbet"
              style={{ flex: 1, maxWidth: '280px' }}
              id="order-for-myself-btn"
            >
              Order for Myself
            </Link>
            <Link
              href="/photographer/signup"
              className="btn btn-outline btn-lg rabbet"
              style={{ flex: 1, maxWidth: '280px' }}
              id="photographer-entry-btn"
            >
              I&apos;m a Photographer
            </Link>
          </div>

          <div className="mt-7 text-xs text-muted">
            Partnered photographer? <Link href="/photographer/login" className="text-accent" style={{ textDecoration: 'underline' }}>Log in here</Link> to access your dashboard.
          </div>
        </div>
      </main>

      <footer className="p-5 text-center text-xs text-muted" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        © {new Date().getFullYear()} <StudioName /> Framing Studio. All rights reserved. Denominated in KES.
      </footer>
    </div>
  );
}
