import { PrismaClient, CatalogItemType, Tier } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding catalog items and studio config...');

  // ─────────────────────────────────────────
  // Moulding options (A-1: visible frame material, aesthetic choice)
  // D-7: archivalDescription must be concrete, not generic copy
  // ─────────────────────────────────────────
  const mouldings = [
    {
      name: 'Classic Walnut',
      type: CatalogItemType.MOULDING,
      imageUrl: '/catalog/moulding-walnut.jpg',
      priceKES: 3200,
      tier: Tier.BUDGET,
      archivalDescription: 'Solid walnut veneer over MDF core, 22mm profile width. Natural grain, unsealed — suited for dry indoor environments.',
    },
    {
      name: 'Oak Natural',
      type: CatalogItemType.MOULDING,
      imageUrl: '/catalog/moulding-oak.jpg',
      priceKES: 5500,
      tier: Tier.MID,
      archivalDescription: 'Kiln-dried oak with clear lacquer seal, 30mm deep rabbet, FSC-certified timber. Resists warping in humid climates.',
    },
    {
      name: 'Brushed Aluminium',
      type: CatalogItemType.MOULDING,
      imageUrl: '/catalog/moulding-aluminium.jpg',
      priceKES: 6800,
      tier: Tier.MID,
      archivalDescription: 'Extruded aluminium, brushed satin finish, 18mm profile. Chemically inert — will not off-gas or react with archival media.',
    },
    {
      name: 'Museum Ebony',
      type: CatalogItemType.MOULDING,
      imageUrl: '/catalog/moulding-ebony.jpg',
      priceKES: 12500,
      tier: Tier.PREMIUM,
      archivalDescription: 'Ebonised hardwood, hand-finished with acid-free lacquer, 40mm deep shadow-box rabbet. GREENGUARD Gold certified finish.',
    },
  ];

  // ─────────────────────────────────────────
  // Mat options (A-2: ranges from acidic → cotton rag archival standard)
  // ─────────────────────────────────────────
  const mats = [
    {
      name: 'White Standard Mat',
      type: CatalogItemType.MAT,
      imageUrl: '/catalog/mat-standard.jpg',
      priceKES: 1200,
      tier: Tier.BUDGET,
      archivalDescription: 'Wood-pulp board, pH 7.0–7.5, not buffered. May cause acid migration to artwork over 5–10 years. Suitable for prints not intended for long-term preservation.',
    },
    {
      name: 'Ivory Alpha-Cellulose Mat',
      type: CatalogItemType.MAT,
      imageUrl: '/catalog/mat-alpha.jpg',
      priceKES: 2800,
      tier: Tier.MID,
      archivalDescription: 'Alpha-cellulose board, pH 8.0–8.5, calcium carbonate buffered (2% CaCO₃). Meets Library of Congress archival standards for photographic materials.',
    },
    {
      name: 'Cotton Rag Archival Mat',
      type: CatalogItemType.MAT,
      imageUrl: '/catalog/mat-cotton.jpg',
      priceKES: 5200,
      tier: Tier.PREMIUM,
      archivalDescription: '100% cotton rag, lignin-free, pH 8.5+, unbuffered facing (safe for cyanotypes and albumen prints). ISO 9706:1994 compliant. The professional conservation standard.',
    },
  ];

  // ─────────────────────────────────────────
  // Glazing options (A-3: standard → UV-protective → museum anti-reflective)
  // D-7: concrete UV percentages required
  // ─────────────────────────────────────────
  const glazings = [
    {
      name: 'Clear Glass',
      type: CatalogItemType.GLAZING,
      imageUrl: '/catalog/glazing-standard.jpg',
      priceKES: 2500,
      tier: Tier.BUDGET,
      archivalDescription: 'Standard float glass, 2mm. Blocks approximately 30% of UV radiation. Suitable for prints displayed away from direct sunlight.',
    },
    {
      name: 'UV-Protective Glass',
      type: CatalogItemType.GLAZING,
      imageUrl: '/catalog/glazing-uv.jpg',
      priceKES: 5800,
      tier: Tier.MID,
      archivalDescription: 'Laminated UV-filtering glass, 2mm. Blocks 70% of UV radiation (300–380nm range). Significantly slows colour fading for dye-based inkjet prints.',
    },
    {
      name: 'Museum-Grade Anti-Reflective',
      type: CatalogItemType.GLAZING,
      imageUrl: '/catalog/glazing-museum.jpg',
      priceKES: 11000,
      tier: Tier.PREMIUM,
      archivalDescription: '99% UV-blocking, museum-grade acrylic (Tru Vue Museum Glass® equivalent). Anti-reflective multi-coat reduces glare to <1% reflectance. Shatter-resistant. The conservation standard for works on paper.',
    },
  ];

  // ─────────────────────────────────────────
  // Mount options (A-4: float vs standard — neither is default, D-10)
  // No item is marked as default; UI must present as equal choice
  // ─────────────────────────────────────────
  const mounts = [
    {
      name: 'Standard Flush Mount',
      type: CatalogItemType.MOUNT,
      imageUrl: '/catalog/mount-standard.jpg',
      priceKES: 1800,
      tier: Tier.MID,
      archivalDescription: 'Archival linen hinging tape (water-activated, reversible). Print secured at top edge only — allows natural expansion/contraction. No adhesive contact with print face.',
    },
    {
      name: 'Float Mount',
      type: CatalogItemType.MOUNT,
      imageUrl: '/catalog/mount-float.jpg',
      priceKES: 2900,
      tier: Tier.PREMIUM,
      archivalDescription: 'Japanese tissue corner pockets, reversible. Exposes full deckled edge and margin of the print — no portion obscured by mat. Preferred for fine-art prints where the physical paper edge is part of the work.',
    },
  ];

  // Upsert all catalog items
  for (const item of [...mouldings, ...mats, ...glazings, ...mounts]) {
    await prisma.catalogItem.upsert({
      where: {
        id: `seed-${item.type.toLowerCase()}-${item.name.toLowerCase().replace(/\s+/g, '-')}`,
      },
      update: item,
      create: {
        id: `seed-${item.type.toLowerCase()}-${item.name.toLowerCase().replace(/\s+/g, '-')}`,
        ...item,
      },
    });
  }

  console.log(`✅ Seeded ${mouldings.length + mats.length + glazings.length + mounts.length} catalog items`);

  // ─────────────────────────────────────────
  // Studio Config — single row, id=1
  // A-11, D-11: "Hollow & Hale" is placeholder content — not fixed identity
  // commissionRatePercent: 10% (user-confirmed)
  // ─────────────────────────────────────────
  await prisma.studioConfig.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Hollow & Hale',
      logoUrl: '/logo-placeholder.svg',
      commissionRatePercent: 10.00,
      brandAccentColor: '#c8a96e',
    },
  });

  console.log('✅ Seeded StudioConfig (id=1)');

  // ─────────────────────────────────────────
  // Scene library — Slice 2 (A-9, D-14)
  // 4 curated, on-brand static room/wall backgrounds.
  // Swappable via admin POST /api/scenes — not hardcoded in UI (A-11 pattern).
  // Images: Unsplash free-to-use, landscape rooms with suitable wall space.
  // ─────────────────────────────────────────
  const scenes = [
    {
      id: 'scene-neutral-living',
      name: 'Neutral Living Room',
      description: 'A calm, light-toned sitting room with a large plaster wall — works with any frame style.',
      imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80&fm=jpg',
      sortOrder: 1,
    },
    {
      id: 'scene-dark-study',
      name: 'Dark Study',
      description: 'Moodily lit home study with dark panelling — ideal for showing premium/ebony frames.',
      imageUrl: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1600&q=80&fm=jpg',
      sortOrder: 2,
    },
    {
      id: 'scene-minimal-white',
      name: 'Minimal White Wall',
      description: 'Clean white gallery-style wall — puts all focus on the framed piece itself.',
      imageUrl: 'https://images.unsplash.com/photo-1499955085172-a104c9463ece?w=1600&q=80&fm=jpg',
      sortOrder: 3,
    },
    {
      id: 'scene-warm-bedroom',
      name: 'Warm Bedroom Corner',
      description: 'Warm-toned bedroom wall above a bed — popular placement for portrait and fine-art prints.',
      imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=80&fm=jpg',
      sortOrder: 4,
    },
  ];

  for (const scene of scenes) {
    await prisma.scene.upsert({
      where: { id: scene.id },
      update: { name: scene.name, description: scene.description, imageUrl: scene.imageUrl, sortOrder: scene.sortOrder },
      create: { ...scene, isActive: true },
    });
  }

  console.log(`✅ Seeded ${scenes.length} curated scenes`);
  console.log('🎉 Seed complete');

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
