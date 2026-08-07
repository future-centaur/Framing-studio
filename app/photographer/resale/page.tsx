'use client';

/**
 * app/photographer/resale/page.tsx
 * Photographer Resale Setup Flow (A-7).
 * Checks photographer session, collects Client Shipping Address (client is ship-to,
 * photographer is billing party), and forwards to configurator in RESALE mode.
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { StudioHeader, StudioName } from '@/components/branding/StudioBranding';

export default function ResaleSetupPage() {
  const router = useRouter();
  const [photographerId, setPhotographerId] = useState<string | null>(null);
  const [shipping, setShipping] = useState({
    clientName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    phone: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Authenticate photographer on client-side
    const token = localStorage.getItem('photographer_token');
    const pid = localStorage.getItem('photographer_id');

    if (!token || !pid) {
      router.replace('/photographer/login');
      return;
    }

    setPhotographerId(pid);
    setLoading(false);
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shipping.clientName || !shipping.addressLine1 || !shipping.city) {
      alert('Please fill out all required fields.');
      return;
    }

    // Cache shipping destination for checkout logic
    localStorage.setItem('resale_shipping_destination', JSON.stringify(shipping));

    // Redirect to configurator under RESALE context
    router.push(`/configure?path=RESALE&photographerId=${photographerId}`);
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
            <h2 className="text-serif text-center mb-4">
              Create Resale Order
            </h2>
            <p className="text-xs text-muted text-center mb-6">
              You (the photographer) will be the billing party. The client will be the ship-to destination.
              Resale orders suppress studio branding on packaging.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="form-group">
                <label htmlFor="clientName" className="form-label">Client / Recipient Name</label>
                <input
                  type="text"
                  id="clientName"
                  required
                  placeholder="e.g. Jane Doe"
                  value={shipping.clientName}
                  onChange={(e) => setShipping(prev => ({ ...prev, clientName: e.target.value }))}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="addressLine1" className="form-label">Shipping Address Line 1</label>
                <input
                  type="text"
                  id="addressLine1"
                  required
                  placeholder="Street address, P.O. Box, or Apartment"
                  value={shipping.addressLine1}
                  onChange={(e) => setShipping(prev => ({ ...prev, addressLine1: e.target.value }))}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="addressLine2" className="form-label">Address Line 2 (Optional)</label>
                <input
                  type="text"
                  id="addressLine2"
                  placeholder="Suite, Unit, Building, etc."
                  value={shipping.addressLine2}
                  onChange={(e) => setShipping(prev => ({ ...prev, addressLine2: e.target.value }))}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="city" className="form-label">City / Town</label>
                <input
                  type="text"
                  id="city"
                  required
                  placeholder="e.g. Nairobi"
                  value={shipping.city}
                  onChange={(e) => setShipping(prev => ({ ...prev, city: e.target.value }))}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="clientPhone" className="form-label">Recipient Contact Phone</label>
                <input
                  type="tel"
                  id="clientPhone"
                  placeholder="For shipping courier notification"
                  value={shipping.phone}
                  onChange={(e) => setShipping(prev => ({ ...prev, phone: e.target.value }))}
                  className="form-input"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-full mt-4 rabbet"
                id="start-resale-order-btn"
              >
                Proceed to Configurator
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="p-5 text-center text-xs text-muted" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        © {new Date().getFullYear()} <StudioName /> Custom Framing.
      </footer>
    </div>
  );
}
