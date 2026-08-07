'use client';

/**
 * app/configure/page.tsx
 * Live configurator page.
 * Handles client photo upload, catalog items selection, live preview, live price,
 * low-res warning modal, quality guarantee banner, and sharing design links.
 */

import { useEffect, useState, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { StudioHeader, StudioLogo } from '@/components/branding/StudioBranding';
import { CatalogPicker } from '@/components/configurator/CatalogPicker';
import { LivePreview } from '@/components/configurator/LivePreview';
import { PriceTotal } from '@/components/configurator/PriceTotal';
import { LowResWarning } from '@/components/configurator/LowResWarning';
import { GuaranteeBanner } from '@/components/configurator/GuaranteeBanner';
import { CatalogItem, CatalogItemType } from '@prisma/client';
import { PriceBreakdown } from '@/lib/pricing';

function ConfiguratorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Route query params
  const designId = searchParams.get('design');
  const pathParam = searchParams.get('path')?.toUpperCase() || 'DIRECT';
  const photographerId = searchParams.get('photographerId');
  const referralCode = searchParams.get('referralCode');

  // Configurator state
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([]);
  const [selections, setSelections] = useState<{
    mouldingId: string | null;
    matId: string | null;
    glazingId: string | null;
    mountId: string | null;
  }>({
    mouldingId: null,
    matId: null,
    glazingId: null,
    mountId: null,
  });

  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null>(null);
  const [resolutionCheck, setResolutionCheck] = useState<{
    warning: boolean;
    message: string;
  } | null>(null);

  // Status states
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [priceLoading, setPriceLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Modals / Warnings
  const [showLowResModal, setShowLowResModal] = useState(false);
  const [isLowResAcknowledged, setIsLowResAcknowledged] = useState(false);

  // Session / Event tracking (E-3)
  const [sessionId, setSessionId] = useState<string>('');
  const hasStartedEventFired = useRef(false);

  // Initialize Session ID
  useEffect(() => {
    let sid = sessionStorage.getItem('framing_session_id');
    if (!sid) {
      sid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem('framing_session_id', sid);
    }
    setSessionId(sid);
  }, []);

  // Load catalog
  useEffect(() => {
    fetch('/api/catalog')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load catalog options');
        return res.json();
      })
      .then((data: CatalogItem[]) => {
        setCatalogItems(data);
        // Pre-select budget options for direct client comfort, except Mounting (D-10)
        const budgetMoulding = data.find((i) => i.type === 'MOULDING' && i.tier === 'BUDGET');
        const budgetMat = data.find((i) => i.type === 'MAT' && i.tier === 'BUDGET');
        const budgetGlazing = data.find((i) => i.type === 'GLAZING' && i.tier === 'BUDGET');

        setSelections({
          mouldingId: budgetMoulding?.id || null,
          matId: budgetMat?.id || null,
          glazingId: budgetGlazing?.id || null,
          mountId: null, // D-10: no mount pre-selected
        });
        setCatalogLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Error initializing catalog options.');
        setCatalogLoading(false);
      });
  }, []);

  // Load design if designId present
  useEffect(() => {
    if (!designId || catalogLoading) return;

    fetch(`/api/design-link/${designId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Shared design not found');
        return res.json();
      })
      .then((config) => {
        setUploadedPhotoUrl(config.fileUrl);
        setSelections({
          mouldingId: config.mouldingId,
          matId: config.matId,
          glazingId: config.glazingId,
          mountId: config.mountId || null,
        });
      })
      .catch((err) => {
        console.error(err);
        setError('Could not load shared configuration.');
      });
  }, [designId, catalogLoading]);

  // Handle Event tracking configuration_started (E-3)
  const triggerStartEvent = async () => {
    if (hasStartedEventFired.current || !sessionId) return;
    hasStartedEventFired.current = true;
    try {
      await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'configuration_started', sessionId }),
      });
    } catch (e) {
      console.error('Failed to log event', e);
    }
  };

  // Re-calculate price and update preview
  useEffect(() => {
    const { mouldingId, matId, glazingId, mountId } = selections;
    if (!mouldingId || !matId || !glazingId) return;

    // Trigger price calculation
    setPriceLoading(true);
    fetch('/api/price', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mouldingId, matId, glazingId, mountId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTotalPrice(data.totalKES);
        setPriceBreakdown(data.breakdown);
        setPriceLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setPriceLoading(false);
      });

    // Update Live Preview if photo uploaded
    if (uploadedPhotoUrl) {
      setPreviewLoading(true);
      fetch('/api/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileUrl: uploadedPhotoUrl, mouldingId, matId, glazingId, mountId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.previewImageUrl) {
            setPreviewUrl(data.previewImageUrl);
          }
          setPreviewLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setPreviewLoading(false);
        });
    }
  }, [selections, uploadedPhotoUrl]);

  // Handle selection changes
  const handleSelection = (type: CatalogItemType, id: string | null) => {
    triggerStartEvent();

    if (type === 'GLAZING' && id && uploadedPhotoUrl && !isLowResAcknowledged) {
      // D-4: check glazing tier resolution requirements
      const selectedItem = catalogItems.find((i) => i.id === id);
      if (selectedItem && (selectedItem.tier === 'MID' || selectedItem.tier === 'PREMIUM')) {
        if (resolutionCheck?.warning) {
          setShowLowResModal(true);
        }
      }
    }

    setSelections((prev) => ({
      ...prev,
      [type === 'MOULDING' ? 'mouldingId' : type === 'MAT' ? 'matId' : type === 'GLAZING' ? 'glazingId' : 'mountId']: id,
    }));
  };

  // Upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    triggerStartEvent();
    setActionLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('photo', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      setUploadedPhotoUrl(data.fileUrl);

      if (data.resolutionWarning) {
        setResolutionCheck({
          warning: true,
          message: data.warningMessage || 'Low resolution warning.',
        });
        // Check if premium glazing is selected
        const currentGlazing = catalogItems.find((i) => i.id === selections.glazingId);
        if (currentGlazing && (currentGlazing.tier === 'MID' || currentGlazing.tier === 'PREMIUM')) {
          setShowLowResModal(true);
        }
      } else {
        setResolutionCheck(null);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Image upload failed. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  // Handle add-to-cart
  const handleAddToCart = async () => {
    const { mouldingId, matId, glazingId, mountId } = selections;
    if (!uploadedPhotoUrl || !mouldingId || !matId || !glazingId) {
      setError('Please upload a photo and complete your configurations.');
      return;
    }

    setActionLoading(true);

    try {
      // First save configuration to get a Configuration row
      const designRes = await fetch('/api/design-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileUrl: uploadedPhotoUrl,
          mouldingId,
          matId,
          glazingId,
          mountId,
          sessionId,
        }),
      });

      const designData = await designRes.json();
      if (!designRes.ok) throw new Error(designData.error || 'Failed to save configuration.');

      // Add to Cart
      const cartRes = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: pathParam,
          photographerId,
          referralCode,
          configurationId: designData.shareableId,
          mouldingId,
          matId,
          glazingId,
          mountId,
          existingCartId: localStorage.getItem('framing_cart_id') || null,
        }),
      });

      const cartData = await cartRes.json();
      if (!cartRes.ok) throw new Error(cartData.error || 'Failed to add to cart.');

      // Store cart ID locally
      localStorage.setItem('framing_cart_id', cartData.id);

      // Route to Cart page
      router.push('/cart');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to add item to cart.');
      setActionLoading(false);
    }
  };

  // Generate Shareable Design Link (D-5)
  const handleShareDesign = async () => {
    const { mouldingId, matId, glazingId, mountId } = selections;
    if (!uploadedPhotoUrl || !mouldingId || !matId || !glazingId) {
      setError('You must upload a photo and select options before sharing.');
      return;
    }

    setActionLoading(true);
    try {
      const res = await fetch('/api/design-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileUrl: uploadedPhotoUrl,
          mouldingId,
          matId,
          glazingId,
          mountId,
          sessionId,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate design link');

      // Copy to clipboard
      await navigator.clipboard.writeText(data.shareableUrl);
      alert('Design link copied to clipboard!');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Could not generate shareable design link.');
    } finally {
      setActionLoading(false);
    }
  };

  // Visualize in a Room (Slice 2 entry point)
  // Saves the configuration (same as Share) then navigates to /visualize/<id>.
  const handleVisualizeInRoom = async () => {
    const { mouldingId, matId, glazingId, mountId } = selections;
    if (!uploadedPhotoUrl || !mouldingId || !matId || !glazingId) {
      setError('Upload a photo and select frame options before visualizing.');
      return;
    }

    setActionLoading(true);
    try {
      const res = await fetch('/api/design-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileUrl: uploadedPhotoUrl,
          mouldingId,
          matId,
          glazingId,
          mountId,
          sessionId,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save configuration');

      // Navigate to the scene visualizer with this configuration pre-loaded.
      // /visualize/[configurationId] is the Slice 2 entry point.
      router.push(`/visualize/${data.shareableId}`);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Could not open scene visualizer.');
      setActionLoading(false);
    }
  };

  if (catalogLoading) {

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

      <main className="container flex-grow">
        <div className="configurator-layout">
          {/* Left Visual Preview Sticky Panel */}
          <div className="preview-panel flex flex-col gap-4">
            <LivePreview
              previewImageUrl={previewUrl}
              loading={previewLoading || actionLoading}
              error={error}
            />

            {/* Upload Selector */}
            <div className="card rabbet">
              <label htmlFor="photo-file" className="form-label text-center">
                Upload Your Image
              </label>
              <div
                className="upload-area flex flex-col items-center justify-center"
                onClick={() => document.getElementById('photo-file')?.click()}
              >
                <span className="upload-area__icon">☁️</span>
                <span className="text-sm">
                  {uploadedPhotoUrl ? 'Replace Photo' : 'Select JPG/PNG (Max 20MB)'}
                </span>
                <input
                  type="file"
                  id="photo-file"
                  accept="image/png, image/jpeg, image/jpg"
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                />
              </div>

              {resolutionCheck?.warning && (
                <div className="warning-banner mt-4">
                  <span style={{ fontSize: '1.2rem' }}>⚠️</span>
                  <div className="text-xs text-secondary">
                    {resolutionCheck.message}
                  </div>
                </div>
              )}
            </div>

            {/* Design Link Share Option (D-5) */}
            {uploadedPhotoUrl && (
              <>
                <button
                  onClick={handleShareDesign}
                  className="btn btn-outline w-full"
                  id="share-design-btn"
                  disabled={actionLoading}
                >
                  🔗 Share This Design (No Account Required)
                </button>
                {/* Slice 2 entry point: scene visualizer */}
                <button
                  onClick={handleVisualizeInRoom}
                  className="btn btn-outline w-full"
                  id="visualize-in-room-btn"
                  disabled={actionLoading || !selections.mouldingId || !selections.matId || !selections.glazingId}
                >
                  🖼 Visualize in a Room
                </button>
              </>
            )}
          </div>

          {/* Right Selector Side Panel */}
          <div className="flex flex-col gap-5">
            <CatalogPicker
              items={catalogItems}
              selections={selections}
              onSelect={handleSelection}
            />

            <PriceTotal
              totalKES={totalPrice}
              breakdown={priceBreakdown}
              loading={priceLoading}
            />

            {/* Guarantee Banner (D-6) */}
            <GuaranteeBanner />

            {/* Action Bar */}
            <button
              onClick={handleAddToCart}
              className="btn btn-primary btn-lg w-full mt-4 rabbet"
              id="add-to-cart-btn"
              disabled={!uploadedPhotoUrl || actionLoading || priceLoading}
            >
              {actionLoading ? 'Saving...' : 'Add to Cart & Checkout'}
            </button>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Sticky Action Bar */}
      <div className="mobile-action-bar">
        <div>
          <span className="text-xs text-muted" style={{ display: 'block' }}>Total Price</span>
          <span className="price-kes" style={{ fontSize: '1.1rem', fontWeight: 600 }}>
            KES {totalPrice.toLocaleString()}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          {uploadedPhotoUrl && selections.mouldingId && selections.matId && selections.glazingId && (
            <button
              onClick={handleVisualizeInRoom}
              className="btn btn-outline btn-sm"
              disabled={actionLoading}
            >
              🖼 Visualize
            </button>
          )}
          <button
            onClick={handleAddToCart}
            className="btn btn-primary btn-sm"
            disabled={!uploadedPhotoUrl || actionLoading || priceLoading}
          >
            Checkout 🛒
          </button>
        </div>
      </div>

      {/* Low-res warning modal (D-4) */}
      {resolutionCheck && (
        <LowResWarning
          isOpen={showLowResModal}
          message={resolutionCheck.message}
          onAcknowledge={() => {
            setShowLowResModal(false);
            setIsLowResAcknowledged(true);
          }}
          onSelectBudget={() => {
            const budgetGlazing = catalogItems.find((i) => i.type === 'GLAZING' && i.tier === 'BUDGET');
            if (budgetGlazing) {
              handleSelection('GLAZING', budgetGlazing.id);
            }
            setShowLowResModal(false);
          }}
        />
      )}
    </div>
  );
}

export default function ConfiguratorPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col min-height-screen">
        <StudioHeader />
        <main className="flex-grow flex items-center justify-center">
          <div className="spinner" />
        </main>
      </div>
    }>
      <ConfiguratorContent />
    </Suspense>
  );
}
