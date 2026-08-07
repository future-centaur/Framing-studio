'use client';

/**
 * StudioBranding — reads from StudioConfig API, never hardcodes name or logo.
 * A-11, D-11: Single config point. "Hollow & Hale" is only a default seed value.
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface StudioConfig {
  name: string;
  logoUrl: string;
  brandAccentColor: string;
}

let cachedConfig: StudioConfig | null = null;

async function fetchStudioConfig(): Promise<StudioConfig> {
  if (cachedConfig) return cachedConfig;
  const res = await fetch('/api/studio-config', { next: { revalidate: 300 } } as RequestInit);
  if (!res.ok) throw new Error('Failed to load studio config');
  cachedConfig = await res.json();
  return cachedConfig!;
}

export function useStudioConfig() {
  const [config, setConfig] = useState<StudioConfig | null>(null);

  useEffect(() => {
    fetchStudioConfig()
      .then(setConfig)
      .catch(console.error);
  }, []);

  return config;
}

interface StudioNameProps {
  className?: string;
  fallback?: string;
}

export function StudioName({ className, fallback = 'Studio' }: StudioNameProps) {
  const config = useStudioConfig();
  return (
    <span className={className}>
      {config?.name ?? fallback}
    </span>
  );
}

interface StudioLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export function StudioLogo({ width = 120, height = 40, className }: StudioLogoProps) {
  const config = useStudioConfig();

  if (!config) {
    // Skeleton while loading
    return (
      <div
        className={className}
        style={{
          width,
          height,
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 4,
          animation: 'pulse 2s ease-in-out infinite',
        }}
        aria-hidden
      />
    );
  }

  const logoUrl = config.logoUrl;

  if (logoUrl === '/logo-placeholder.svg' || !logoUrl) {
    // Text-based wordmark as placeholder
    return (
      <span
        className={className}
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.25rem',
          fontWeight: 500,
          letterSpacing: '0.04em',
          color: 'var(--accent-light)',
          lineHeight: 1,
        }}
      >
        {config.name}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logoUrl}
      alt={`${config.name} logo`}
      width={width}
      height={height}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
}

export function StudioHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" aria-label="Home">
          <StudioLogo />
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="/configure" id="nav-configure">Configure</a>
          <a href="/photographer/login" id="nav-photographer">Photographer Login</a>
        </nav>
      </div>
    </header>
  );
}
