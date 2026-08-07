'use client';

/**
 * app/photographer/dashboard/page.tsx
 * Photographer dashboard.
 * A-10, D-9: Photographer-scoped view showing commission tracking, discounts, and referral link generation.
 */

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { StudioHeader, StudioName } from '@/components/branding/StudioBranding';
import Link from 'next/link';

interface ReferralLink {
  id: string;
  code: string;
  url: string;
  createdAt: string;
}

interface CommissionEntry {
  id: string;
  amountKES: string;
  createdAt: string;
  cart: {
    id: string;
    paymentStatus: string;
  };
}

interface ResaleDiscount {
  id: string;
  discountAmountKES: string;
  createdAt: string;
  cart: {
    id: string;
    paymentStatus: string;
  };
}

interface DashboardData {
  photographer: {
    email: string | null;
    phone: string | null;
    resaleDiscountRate: string;
  };
  summary: {
    totalCommissionKES: number;
    totalDiscountSavedKES: number;
    referralCount: number;
    pendingCommissions: number;
  };
  commissionEntries: CommissionEntry[];
  resaleDiscounts: ResaleDiscount[];
  referralLinks: ReferralLink[];
}

export default function PhotographerDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generatingLink, setGeneratingLink] = useState(false);

  const fetchDashboard = useCallback(async () => {
    const token = localStorage.getItem('photographer_token');
    if (!token) {
      router.replace('/photographer/login');
      return;
    }

    try {
      const res = await fetch('/api/photographer/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to load dashboard');

      setData(json);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error loading photographer dashboard.');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const handleGenerateLink = async () => {
    const token = localStorage.getItem('photographer_token');
    if (!token) return;

    setGeneratingLink(true);
    try {
      const res = await fetch('/api/referral-link', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to generate link');

      // Refresh data
      await fetchDashboard();
      alert('Referral link generated successfully!');
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Failed to generate referral link.');
    } finally {
      setGeneratingLink(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('photographer_token');
    localStorage.removeItem('photographer_id');
    document.cookie = 'photographer_session=; Max-Age=0; path=/;';
    router.replace('/photographer/login');
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

  if (error) {
    return (
      <div className="flex flex-col min-height-screen">
        <StudioHeader />
        <main className="container flex-grow section flex items-center justify-center">
          <div className="card rabbet text-center p-6 flex flex-col items-center gap-4">
            <span style={{ fontSize: '2rem' }}>⚠️</span>
            <p className="text-secondary text-sm">{error}</p>
            <button onClick={handleLogout} className="btn btn-primary rabbet">Log Out & Retry</button>
          </div>
        </main>
      </div>
    );
  }

  const { summary, photographer, commissionEntries, resaleDiscounts, referralLinks } = data!;

  return (
    <div className="flex flex-col min-height-screen">
      <StudioHeader />

      <main className="container flex-grow section">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-serif">Photographer Partner Dashboard</h2>
            <p className="text-xs text-muted">
              Logged in as: {photographer.email || photographer.phone}
            </p>
          </div>
          <button onClick={handleLogout} className="btn btn-outline btn-sm">
            Logout
          </button>
        </div>

        {/* Totals Summary */}
        <div className="dashboard-grid">
          <div className="stat-card rabbet">
            <div className="stat-card__label">Cash Commissions Earned</div>
            <div className="stat-card__value">KES {summary.totalCommissionKES.toLocaleString()}</div>
            <div className="text-xs text-muted mt-2">Paid on confirmed client referrals</div>
          </div>

          <div className="stat-card rabbet">
            <div className="stat-card__label">Total Resale Discount Saved</div>
            <div className="stat-card__value">KES {summary.totalDiscountSavedKES.toLocaleString()}</div>
            <div className="text-xs text-muted mt-2">Active discount rate: {photographer.resaleDiscountRate}%</div>
          </div>

          <div className="stat-card rabbet">
            <div className="stat-card__label">Referral Links Generated</div>
            <div className="stat-card__value">{summary.referralCount}</div>
            <div className="text-xs text-muted mt-2">Active customer invitation links</div>
          </div>
        </div>

        {/* Actions panel */}
        <div className="card rabbet p-5 flex flex-col sm:flex-row gap-4 justify-between items-center mb-6" style={{ background: 'rgba(200, 169, 110, 0.04)' }}>
          <div>
            <h4 className="text-serif text-accent">Studio Actions</h4>
            <p className="text-xs text-muted">Invite clients or configure wholesale orders directly.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleGenerateLink}
              className="btn btn-outline"
              disabled={generatingLink}
              id="generate-referral-btn"
            >
              {generatingLink ? 'Generating...' : 'Generate Referral Link'}
            </button>
            <Link href="/photographer/resale" className="btn btn-primary rabbet" id="create-resale-btn">
              Create Resale Order
            </Link>
          </div>
        </div>

        <div className="rabbet-divider" style={{ margin: 'var(--space-6) 0' }} />

        {/* Referral Links Section */}
        <section className="mb-6">
          <h3 className="text-serif text-accent mb-4">Your Referral Links</h3>
          {referralLinks.length === 0 ? (
            <p className="text-xs text-muted">You haven&apos;t generated any referral links yet.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {referralLinks.map((link) => (
                <div key={link.id} className="flex justify-between items-center p-3" style={{ background: 'var(--bg-1)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <span className="text-xs text-mono text-secondary" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>
                    {link.url}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(link.url);
                      alert('Copied to clipboard!');
                    }}
                    className="btn btn-ghost btn-sm"
                    style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    Copy Link
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Commission Ledger Details */}
        <section className="mb-6">
          <h3 className="text-serif text-accent mb-4">Referral Commission Ledger</h3>
          {commissionEntries.length === 0 ? (
            <p className="text-xs text-muted">No client purchases recorded under your referrals.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {commissionEntries.map((entry) => (
                <div key={entry.id} className="flex justify-between items-center p-3 text-xs" style={{ background: 'var(--bg-1)', borderRadius: 'var(--radius-sm)' }}>
                  <div>
                    <span className="text-muted">Order Ref:</span> <span className="text-mono">{entry.cart.id.slice(0, 8)}</span>
                    <span className="text-muted ml-3">Date:</span> {new Date(entry.createdAt).toLocaleDateString()}
                  </div>
                  <div className="text-right">
                    <span className="badge badge-success text-mono">KES {Number(entry.amountKES).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="p-5 text-center text-xs text-muted" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        © {new Date().getFullYear()} <StudioName /> Custom Framing. All commissions paid in KES.
      </footer>
    </div>
  );
}
