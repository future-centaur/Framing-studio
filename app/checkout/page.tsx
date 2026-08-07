'use client';

/**
 * app/checkout/page.tsx
 * Checkout flow page.
 * Prompts user for their M-Pesa number, triggers Daraja STK Push,
 * and handles payment status updates.
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { StudioHeader, StudioName } from '@/components/branding/StudioBranding';
import Link from 'next/link';

interface CartItem {
  id: string;
  priceSnapshotKES: string;
}

interface Cart {
  id: string;
  path: 'DIRECT' | 'REFERRAL' | 'RESALE';
  orders: CartItem[];
  photographer?: {
    resaleDiscountRate: string;
  } | null;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [status, setStatus] = useState<'IDLE' | 'PENDING' | 'CONFIRMED' | 'REJECTED'>('IDLE');
  const [checkoutResponse, setCheckoutResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cartId = localStorage.getItem('framing_cart_id');
    if (!cartId) {
      setLoading(false);
      return;
    }

    fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: 'DIRECT',
        existingCartId: cartId,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load cart');
        return res.json();
      })
      .then((data) => {
        setCart(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Error loading checkout cart.');
        setLoading(false);
      });
  }, []);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cart || !phone) return;

    setCheckoutLoading(true);
    setError(null);
    setStatus('PENDING');

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartId: cart.id,
          mpesaPhone: phone,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Checkout failed');

      setCheckoutResponse(data);
      if (data.status === 'CONFIRMED') {
        setStatus('CONFIRMED');
        // Register configuration_completed event
        const sessionId = sessionStorage.getItem('framing_session_id');
        if (sessionId) {
          await fetch('/api/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'configuration_completed', sessionId }),
          }).catch(console.error);
        }
        // Clear local cart
        localStorage.removeItem('framing_cart_id');
      } else {
        setStatus('PENDING');
        // Real payment: would start polling for webhook callback
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Checkout failed. Please try again.');
      setStatus('IDLE');
    } finally {
      setCheckoutLoading(false);
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

  if (!cart) {
    return (
      <div className="flex flex-col min-height-screen">
        <StudioHeader />
        <main className="container flex-grow section flex items-center justify-center">
          <div className="card rabbet text-center p-6 flex flex-col items-center gap-4">
            <p className="text-secondary text-sm">No checkout session found.</p>
            <Link href="/configure" className="btn btn-primary rabbet">Go Configure</Link>
          </div>
        </main>
      </div>
    );
  }

  const orderTotal = cart.orders.reduce((sum, item) => sum + Number(item.priceSnapshotKES), 0);
  const isResale = cart.path === 'RESALE';
  const discountRate = cart.photographer?.resaleDiscountRate ? Number(cart.photographer.resaleDiscountRate) : 13;
  const discountAmount = isResale ? orderTotal * (discountRate / 100) : 0;
  const finalTotal = orderTotal - discountAmount;

  return (
    <div className="flex flex-col min-height-screen">
      <StudioHeader />

      <main className="container flex-grow section">
        <div className="container-narrow">
          <h2 className="text-serif mb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 'var(--space-3)' }}>
            Checkout with M-Pesa
          </h2>

          {status === 'CONFIRMED' ? (
            <div className="card rabbet text-center p-6 flex flex-col items-center gap-4 animate-fade-in">
              <span style={{ fontSize: '3rem' }}>🎉</span>
              <h3 className="text-serif text-accent">Order Confirmed!</h3>
              <p className="text-secondary text-sm">
                Your payment of <strong>KES {finalTotal.toLocaleString()}</strong> has been verified.
                {cart.path !== 'DIRECT' && ' This order has been submitted for photographer approval.'}
              </p>
              {checkoutResponse?.checkoutRequestId && (
                <div className="text-mono text-xs text-muted">
                  Transaction Reference: {checkoutResponse.checkoutRequestId}
                </div>
              )}
              <Link href="/" className="btn btn-primary mt-4 rabbet">
                Back to Home
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {/* Order summary */}
              <div className="card rabbet" style={{ background: 'var(--bg-2)' }}>
                <h4 className="text-serif text-accent mb-3">Order Summary</h4>
                <div className="flex justify-between text-sm text-secondary mb-2">
                  <span>Items Count</span>
                  <span>{cart.orders.length} prints</span>
                </div>
                {isResale && (
                  <div className="flex justify-between text-sm text-secondary mb-2" style={{ color: 'var(--success)' }}>
                    <span>Resale Discount ({discountRate}%)</span>
                    <span>- KES {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between items-center font-bold text-sm">
                  <span>Amount to Pay</span>
                  <span className="price-kes">KES {finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* M-Pesa Input Form */}
              <form onSubmit={handleCheckout} className="card rabbet flex flex-col gap-4">
                <div className="form-group">
                  <label htmlFor="mpesa-phone" className="form-label">
                    M-Pesa Phone Number
                  </label>
                  <input
                    type="tel"
                    id="mpesa-phone"
                    required
                    placeholder="e.g. 0712345678 or +254712345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-input"
                    disabled={status === 'PENDING'}
                  />
                  <p className="text-xs text-muted">
                    We will send an M-Pesa STK Push popup request directly to your phone.
                  </p>
                </div>

                {error && (
                  <div className="warning-banner">
                    <span style={{ fontSize: '1.2rem' }}>⚠️</span>
                    <div className="text-xs text-secondary">{error}</div>
                  </div>
                )}

                {status === 'PENDING' ? (
                  <div className="flex flex-col items-center gap-3 p-4">
                    <div className="spinner" />
                    <p className="text-sm text-secondary text-center">
                      Processing transaction... Check your phone for the M-Pesa prompt.
                    </p>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg rabbet"
                    id="trigger-stk-push-btn"
                    disabled={!phone}
                  >
                    Send M-Pesa Prompt
                  </button>
                )}
              </form>
            </div>
          )}
        </div>
      </main>

      <footer className="p-5 text-center text-xs text-muted" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        © {new Date().getFullYear()} <StudioName /> Custom Framing. Secure transactions processed via Safaricom Daraja.
      </footer>
    </div>
  );
}
