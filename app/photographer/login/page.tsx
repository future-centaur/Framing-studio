'use client';

/**
 * app/photographer/login/page.tsx
 * Photographer login screen.
 * Two-step verification using OTP codes.
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StudioHeader, StudioName } from '@/components/branding/StudioBranding';
import Link from 'next/link';

export default function PhotographerLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    phone: '',
  });

  const [step, setStep] = useState<'LOGIN' | 'VERIFY'>('LOGIN');
  const [otp, setOtp] = useState('');
  const [devOtp, setDevOtp] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email && !form.phone) {
      setError('Please enter your registered email or phone.');
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch('/api/auth/photographer/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email || undefined,
          phone: form.phone || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      setMessage(data.message);
      if (data.devOtp) {
        setDevOtp(data.devOtp);
      }
      setStep('VERIFY');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Login failed. Account might not exist.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/photographer/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email || undefined,
          phone: form.phone || undefined,
          otpCode: otp,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Verification failed');

      // Store photographer details
      localStorage.setItem('photographer_id', data.photographerId);
      localStorage.setItem('photographer_token', data.sessionToken);

      // Redirect to dashboard
      router.push('/photographer/dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Invalid verification code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-height-screen">
      <StudioHeader />

      <main className="container flex-grow section flex items-center justify-center">
        <div className="container-narrow">
          <div className="card rabbet">
            <h2 className="text-serif text-center mb-5">
              Photographer Login
            </h2>

            {step === 'LOGIN' ? (
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <p className="text-xs text-muted text-center mb-2">
                  Enter your registered phone or email to request a secure entry code.
                </p>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="+254712345678"
                    value={form.phone}
                    onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                    className="form-input"
                  />
                </div>

                {error && (
                  <div className="warning-banner mt-2">
                    <span style={{ fontSize: '1.2rem' }}>⚠️</span>
                    <div className="text-xs text-secondary">{error}</div>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-full mt-4 rabbet"
                  id="login-submit-btn"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Send Access Code'}
                </button>

                <div className="text-center text-xs text-muted mt-4">
                  New partner? <Link href="/photographer/signup" className="text-accent">Sign up here</Link>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerify} className="flex flex-col gap-4 animate-fade-in">
                <p className="text-sm text-secondary text-center mb-2">
                  {message || 'Verify your credentials to enter.'}
                </p>

                <div className="form-group">
                  <label htmlFor="otp" className="form-label">Access Code</label>
                  <input
                    type="text"
                    id="otp"
                    required
                    placeholder="Enter code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="form-input text-center text-mono"
                    maxLength={6}
                  />
                </div>

                {devOtp && (
                  <div className="p-3 text-center" style={{ background: 'rgba(90, 138, 90, 0.08)', border: '1px dashed var(--success)', borderRadius: 'var(--radius-sm)' }}>
                    <div className="text-xs text-success">
                      [DEVELOPMENT MOCK] Use code: <strong>{devOtp}</strong>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="warning-banner mt-2">
                    <span style={{ fontSize: '1.2rem' }}>⚠️</span>
                    <div className="text-xs text-secondary">{error}</div>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-full mt-4 rabbet"
                  id="login-verify-btn"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Access Dashboard'}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <footer className="p-5 text-center text-xs text-muted" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        © {new Date().getFullYear()} <StudioName /> Custom Framing.
      </footer>
    </div>
  );
}
