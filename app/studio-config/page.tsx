'use client';

/**
 * app/studio-config/page.tsx
 * Studio Config settings page.
 * Enforces A-11 and D-11 single config point: editing the config updates all templates dynamically.
 */

import { useEffect, useState } from 'react';
import { StudioHeader, StudioName } from '@/components/branding/StudioBranding';

interface StudioConfig {
  name: string;
  logoUrl: string;
  commissionRatePercent: number;
  brandAccentColor: string;
}

export default function StudioConfigAdminPage() {
  const [config, setConfig] = useState<StudioConfig>({
    name: 'Hollow & Hale',
    logoUrl: '/logo-placeholder.svg',
    commissionRatePercent: 10,
    brandAccentColor: '#c8a96e',
  });

  const [adminToken, setAdminToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    fetch('/api/studio-config')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch configuration');
        return res.json();
      })
      .then((data) => {
        setConfig({
          name: data.name,
          logoUrl: data.logoUrl,
          commissionRatePercent: Number(data.commissionRatePercent),
          brandAccentColor: data.brandAccentColor,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    try {
      const res = await fetch('/api/studio-config', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {}),
        },
        body: JSON.stringify(config),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update config');

      setStatus({ success: true, message: 'Studio configuration updated successfully! Refresh pages to see changes.' });
      // Clear logo cache trigger
      window.location.reload();
    } catch (err: any) {
      console.error(err);
      setStatus({ success: false, message: err.message || 'Failed to save configuration.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-height-screen">
        <StudioHeader />
        <main className="flex-grow flex items-center justify-center">
          <div className="spinner" />
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-height-screen">
      <StudioHeader />

      <main className="container flex-grow section flex items-center justify-center">
        <div className="container-narrow">
          <div className="card rabbet">
            <h2 className="text-serif text-center mb-5">
              Studio Configuration Admin
            </h2>

            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Studio Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={config.name}
                  onChange={(e) => setConfig((prev) => ({ ...prev, name: e.target.value }))}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="logoUrl" className="form-label">Logo URL</label>
                <input
                  type="text"
                  id="logoUrl"
                  required
                  placeholder="e.g. /logo-placeholder.svg"
                  value={config.logoUrl}
                  onChange={(e) => setConfig((prev) => ({ ...prev, logoUrl: e.target.value }))}
                  className="form-input"
                />
                <p className="text-xs text-muted">Provide path to logo asset or fully qualified image URL.</p>
              </div>

              <div className="form-group">
                <label htmlFor="commission" className="form-label">Referral Commission Rate (%)</label>
                <input
                  type="number"
                  id="commission"
                  required
                  min={0}
                  max={100}
                  step={0.1}
                  value={config.commissionRatePercent}
                  onChange={(e) => setConfig((prev) => ({ ...prev, commissionRatePercent: parseFloat(e.target.value) }))}
                  className="form-input"
                />
                <p className="text-xs text-muted">Default referral commission percentage paid to photographers.</p>
              </div>

              <div className="form-group">
                <label htmlFor="accent" className="form-label">Accent Color (Hex)</label>
                <input
                  type="text"
                  id="accent"
                  required
                  pattern="^#[0-9a-fA-F]{6}$"
                  placeholder="#c8a96e"
                  value={config.brandAccentColor}
                  onChange={(e) => setConfig((prev) => ({ ...prev, brandAccentColor: e.target.value }))}
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ marginTop: 'var(--space-3)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 'var(--space-3)' }}>
                <label htmlFor="adminToken" className="form-label">Admin Secret Token</label>
                <input
                  type="password"
                  id="adminToken"
                  placeholder="Enter ADMIN_SECRET if configured"
                  value={adminToken}
                  onChange={(e) => setAdminToken(e.target.value)}
                  className="form-input"
                />
                <p className="text-xs text-muted">Required if ADMIN_SECRET is set on the server environment variables.</p>
              </div>

              {status && (
                <div className={status.success ? 'p-3 rounded text-xs' : 'warning-banner'} style={status.success ? { background: 'rgba(90,138,90,0.12)', color: '#7ac87a', borderLeft: '3px solid var(--success)' } : {}}>
                  {status.success ? null : <span style={{ fontSize: '1.2rem' }}>⚠️</span>}
                  <div>{status.message}</div>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary btn-lg w-full mt-4 rabbet"
                id="save-studio-config-btn"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Configuration'}
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="p-5 text-center text-xs text-muted" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        © {new Date().getFullYear()} <StudioName />. Config changes propagate to all sessions.
      </footer>
    </div>
  );
}
