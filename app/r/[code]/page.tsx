'use client';

/**
 * app/r/[code]/page.tsx
 * Referral Link Landing Redirection.
 * Resolves photographer referral code (A-6), caches context, and routes to configurator.
 */

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { StudioHeader, StudioName } from '@/components/branding/StudioBranding';

export default function ReferralRedirectionPage() {
  const router = useRouter();
  const { code } = useParams() as { code: string };
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!code) return;

    fetch(`/api/referral/${code}`)
      .then((res) => {
        if (!res.ok) throw new Error('Invalid or expired referral link');
        return res.json();
      })
      .then((data) => {
        // Cache the referral state for the session
        sessionStorage.setItem('referral_photographer_id', data.photographerId);
        sessionStorage.setItem('referral_code', code);
        
        // Redirect to configurator pre-set with path=referral
        router.replace(
          `/configure?path=referral&photographerId=${data.photographerId}&referralCode=${code}`
        );
      })
      .catch((err) => {
        console.error(err);
        setError('The link you used appears to be invalid or has expired.');
      });
  }, [code, router]);

  return (
    <div className="flex flex-col min-height-screen">
      <StudioHeader />

      <main className="container flex-grow section flex items-center justify-center">
        <div className="container-narrow text-center">
          {error ? (
            <div className="card rabbet p-6 flex flex-col items-center gap-4">
              <span style={{ fontSize: '2rem' }}>⚠️</span>
              <p className="text-secondary text-sm">{error}</p>
              <a href="/configure" className="btn btn-primary rabbet">Go to Configurator</a>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="spinner" />
              <p className="text-sm text-secondary animate-pulse">
                Setting up your photographer referral details...
              </p>
              <div className="text-xs text-muted">
                Entering <StudioName /> Framing Studio
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
