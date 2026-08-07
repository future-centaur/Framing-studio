'use client';

/**
 * app/photographer/signup/page.tsx
 * Photographer registration page.
 * Enforces resolved C-3: phone/email + self-declared photographer checkbox (no verification gate).
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StudioHeader, StudioName } from '@/components/branding/StudioBranding';
import Link from 'next/link';

export default function PhotographerSignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    phone: '',
    isPhotographer: false,
  });

  const [step, setStep] = useState<'REGISTER' | 'VERIFY'>('REGISTER');
  const [photographerId, setPhotographerId] = useState<string | null>(null);
  const [otp, setOtp] = useState('');
  const [devOtp, setDevOtp] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email && !form.phone) {
      setError('Please provide either email or phone number.');
      return;
    }
    if (!form.isPhotographer) {
      setError('You must confirm you are a photographer to sign up.');
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch('/api/auth/photographer/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email || undefined,
          phone: form.phone || undefined,
          isPhotographer: true,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Signup failed');

      setPhotographerId(data.photographerId);
      setMessage(data.message);
      if (data.devOtp) {
        setDevOtp(data.devOtp);
      }
      setStep('VERIFY');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Signup failed. Please try again.');
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

      // Store photographer session details
      localStorage.setItem('photographer_id', data.photographerId);
      localStorage.setItem('photographer_token', data.sessionToken);

      // Redirect to dashboard
      router.push('/photographer/dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Invalid code or verification failed.');
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
              Photographer Registration
            </h2>

            {step === 'REGISTER' ? (
              <form onSubmit={handleRegister} className="flex flex-col gap-4">
                <p className="text-xs text-muted text-center mb-2">
                  Create an account to track client referrals or order resale wholesale pieces.
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

                {/* Self-declared checkbox gate (C-3) */}
                <div className="form-group mt-2">
                  <label className="form-checkbox-row text-sm text-secondary">
                    <input
                      type="checkbox"
                      required
                      checked={form.isPhotographer}
                      onChange={(e) => setForm((prev) => ({ ...prev, isPhotographer: e.target.checked }))}
                      className="form-checkbox"
                      id="is-photographer-checkbox"
                    />
                    <span>
                      I declare that I am a professional photographer. I understand this checkbox acts as my account self-verification.
                    </span>
                  </label>
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
                  id="signup-submit-btn"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Register'}
                </button>

                <div className="text-center text-xs text-muted mt-4">
                  Already have an account? <Link href="/photographer/login" className="text-accent">Login here</Link>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerify} className="flex flex-col gap-4 animate-fade-in">
                <p className="text-sm text-secondary text-center mb-2">
                  {message || 'Enter verification code.'}
                </p>

                <div className="form-group">
                  <label htmlFor="otp" className="form-label">Verification Code</label>
                  <input
                    type="text"
                    id="otp"
                    required
                    placeholder="Enter 6-digit OTP code"
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
                  id="verify-otp-btn"
                  disabled={loading}
                >
                  {loading ? 'Verifying...' : 'Verify Code'}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <footer className="p-5 text-center text-xs text-muted" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        © {new Date().getFullYear()} <StudioName /> Framing Studio.
      </footer>
    </div>
  );
}
