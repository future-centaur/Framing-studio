'use client';

/**
 * app/cart/page.tsx
 * Cart view page.
 * Supports displaying multiple orders checked out together.
 * Locks the cart path (D-15: set once, immutable). Shows corresponding badges.
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { StudioHeader, StudioName } from '@/components/branding/StudioBranding';
import Link from 'next/link';

interface CartItem {
  id: string;
  priceSnapshotKES: string;
  configuration: {
    id: string;
    fileUrl: string;
    mouldingId: string;
    matId: string;
    glazingId: string;
    mountId: string | null;
  };
}

interface Cart {
  id: string;
  path: 'DIRECT' | 'REFERRAL' | 'RESALE';
  photographerId: string | null;
  paymentStatus: string;
  orders: CartItem[];
  approval?: {
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
  } | null;
}

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = () => {
    const cartId = localStorage.getItem('framing_cart_id');
    if (!cartId) {
      setLoading(false);
      return;
    }

    // Since we don't have a GET /api/cart route in the PRD, we can create a temporary or query endpoint,
    // or call the check/post cart API without configurations to fetch existing.
    // Wait, let's check: POST /api/cart with only existingCartId fetches and returns the full cart!
    // Yes! Let's call POST /api/cart with { existingCartId } to retrieve it.
    fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: 'DIRECT', // Fallback, will be ignored/overridden if existingCartId exists
        existingCartId: cartId,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Could not load cart details.');
        return res.json();
      })
      .then((data) => {
        setCart(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Cart is currently empty or could not be retrieved.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleClearCart = () => {
    localStorage.removeItem('framing_cart_id');
    setCart(null);
  };

  const getPathBadgeClass = (path: string) => {
    switch (path) {
      case 'DIRECT': return 'badge-direct';
      case 'REFERRAL': return 'badge-referral';
      case 'RESALE': return 'badge-resale';
      default: return 'badge-muted';
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

  const items = cart?.orders || [];
  const orderTotal = items.reduce((sum, item) => sum + Number(item.priceSnapshotKES), 0);

  // Apply default 13% discount for resale paths in presentation
  const isResale = cart?.path === 'RESALE';
  const discountAmount = isResale ? orderTotal * 0.13 : 0;
  const finalTotal = orderTotal - discountAmount;

  return (
    <div className="flex flex-col min-height-screen">
      <StudioHeader />

      <main className="container flex-grow section">
        <div className="container-narrow">
          <h2 className="text-serif mb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 'var(--space-3)' }}>
            Shopping Cart
          </h2>

          {error || items.length === 0 ? (
            <div className="card rabbet text-center p-6 flex flex-col items-center gap-4">
              <span style={{ fontSize: '2.5rem', opacity: 0.4 }}>🛒</span>
              <p className="text-secondary text-sm">Your shopping cart is empty.</p>
              <Link href="/configure" className="btn btn-primary rabbet">
                Start Framing
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {/* Path and Restrictions Warning (D-15) */}
              <div className="flex justify-between items-center p-3" style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-md)' }}>
                <span className="text-xs text-muted">
                  Cart Path Type (Locked & Immutable):
                </span>
                <span className={`badge ${getPathBadgeClass(cart!.path)}`}>
                  {cart!.path} Path
                </span>
              </div>

              {/* Items List */}
              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <div key={item.id} className="cart-item rabbet">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.configuration.fileUrl}
                      alt="Framed piece"
                      style={{
                        width: '100px',
                        height: '75px',
                        objectFit: 'cover',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(255,255,255,0.05)',
                      }}
                    />
                    <div>
                      <div className="text-sm font-semibold" style={{ color: 'var(--text-0)' }}>
                        Custom Framed Print
                      </div>
                      <div className="text-xs text-muted mt-1">
                        Configuration ID: {item.configuration.id.slice(0, 8)}...
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="price-kes">KES {Number(item.priceSnapshotKES).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Approval status banner for photographer paths */}
              {cart?.path !== 'DIRECT' && cart?.approval && (
                <div className="p-4 flex items-center justify-between" style={{ background: 'rgba(200, 169, 110, 0.08)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(200, 169, 110, 0.2)' }}>
                  <div className="text-xs text-secondary">
                    <strong>Order Approval Status:</strong> Requiring photographer approval.
                  </div>
                  <span className={`badge ${cart.approval.status === 'APPROVED' ? 'badge-success' : cart.approval.status === 'PENDING' ? 'badge-warning' : 'badge-error'}`}>
                    {cart.approval.status}
                  </span>
                </div>
              )}

              {/* Pricing Totals */}
              <div className="card rabbet flex flex-col gap-3" style={{ background: 'var(--bg-2)' }}>
                <div className="flex justify-between items-center text-sm text-secondary">
                  <span>Cart Subtotal</span>
                  <span className="text-mono">KES {orderTotal.toLocaleString()}</span>
                </div>

                {isResale && (
                  <div className="flex justify-between items-center text-sm" style={{ color: 'var(--success)' }}>
                    <span>Wholesale Resale Discount (13%)</span>
                    <span className="text-mono">- KES {discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="rabbet-divider" style={{ margin: 'var(--space-2) 0', height: '1px' }} />

                <div className="flex justify-between items-center font-bold">
                  <span>Total Amount</span>
                  <span className="price-kes" style={{ fontSize: '1.25rem' }}>
                    KES {finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout actions */}
              <div className="flex flex-wrap gap-3 mt-2 justify-between items-center">
                <button
                  onClick={handleClearCart}
                  className="btn btn-outline btn-sm"
                  style={{ color: 'var(--error)', borderColor: 'rgba(200,90,90,0.4)' }}
                >
                  Clear Cart
                </button>
                <div className="flex gap-2 flex-wrap items-center">
                  <Link href="/configure" className="btn btn-outline btn-sm">
                    + Add Design
                  </Link>
                  <button
                    onClick={() => router.push('/checkout')}
                    className="btn btn-primary btn-sm"
                    id="checkout-cart-btn"
                  >
                    Checkout with M-Pesa
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="p-5 text-center text-xs text-muted" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        © {new Date().getFullYear()} <StudioName /> Framing Studio. All prices in KES.
      </footer>
    </div>
  );
}
