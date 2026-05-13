import type { Brand } from '@/lib/types';

/**
 * KYVO PARTNERED BRANDS
 *
 * 3-tier commission model on every brand:
 *   openCollabRate  = base rate the brand offers on TikTok Shop to ANY creator
 *                     (UPDATE these — currently best-guess placeholders)
 *   commissionRate  = Kyvo Boost — what creators get through this portal
 *   maxCommission   = LOCKED MAX tier — unlocked via Discord ticket
 *
 * heroBanner: true     → top-stacked horizontal banner (reserve for 50% brands)
 * trending: true       → 🔥 badge (use sparingly — genuinely surging only)
 * highCommission: true → "Higher Commission" filter pill match
 *
 * To add a brand:
 * 1. Add an entry to this array following the Brand type
 * 2. Drop logo at /public/logos/<brand-id>.png OR use a logoTile placeholder
 * 3. Re-upload data/brands.ts via GitHub web UI → Vercel auto-redeploys
 */

export const brands: Brand[] = [
  {
    id: 'natural-stacks',
    name: 'Natural Stacks',
    niche: 'Health',
    openCollabRate: 15,     // TODO: confirm base rate
    commissionRate: 50,     // Kyvo Boost
    maxCommission: 50,      // MAX (locked tier)
    heroBanner: true,
    bannerOrder: 1,
    trending: true,         // 🔥 only on the genuinely-surging top brand
    highCommission: true,
    tagline: 'Premium nootropics & wellness — 50% Kyvo Boost',
    bannerGradient:
      'linear-gradient(135deg, #1a0b3e 0%, #4a1d8a 35%, #7B3FE4 70%, #22F5A3 100%)',
    logoTile: { bg: '#1A1838', fg: '#22F5A3', initials: 'NS' },
    links: [
      // TODO: Paste real Natural Stacks affiliate links here
      { productName: 'MagTech Magnesium', url: 'https://example.com/replace-me' },
      { productName: 'Dopamine Brain Food', url: 'https://example.com/replace-me' },
      { productName: 'Smart Caffeine', url: 'https://example.com/replace-me' },
      { productName: 'CILTEP', url: 'https://example.com/replace-me' },
    ],
  },
  {
    id: 'bold-buns',
    name: 'Bold Buns',
    niche: 'Health',
    openCollabRate: 15,
    commissionRate: 50,
    maxCommission: 50,
    heroBanner: true,
    bannerOrder: 2,
    highCommission: true,
    tagline: 'Bold flavors, bigger payouts — 50% Kyvo Boost',
    bannerGradient:
      'linear-gradient(135deg, #2a0a3e 0%, #7a1d8a 40%, #E94BC1 80%, #FF6BCB 100%)',
    logoTile: { bg: '#2A1738', fg: '#FF6BCB', initials: 'BB' },
    links: [
      { productName: 'Replace with real product', url: 'https://example.com/replace-me' },
    ],
  },
  {
    id: 'fuel-nutrition',
    name: 'Fuel Nutrition',
    niche: 'Health',
    openCollabRate: 12,
    commissionRate: 50,
    maxCommission: 50,
    heroBanner: true,
    bannerOrder: 3,
    highCommission: true,
    tagline: 'Performance fuel for creators — 50% Kyvo Boost',
    bannerGradient:
      'linear-gradient(135deg, #0a1d3e 0%, #1d4a8a 40%, #5CC8FF 80%, #22F5A3 100%)',
    logoTile: { bg: '#11203A', fg: '#5CC8FF', initials: 'FN' },
    links: [
      { productName: 'Replace with real product', url: 'https://example.com/replace-me' },
    ],
  },
  {
    id: 'toplux-nutrition',
    name: 'Toplux Nutrition',
    niche: 'Health',
    openCollabRate: 10,
    commissionRate: 35,     // Kyvo Boost (35%)
    maxCommission: 50,      // MAX unlocks bigger jump for this brand
    highCommission: true,
    tagline: 'Luxury supplements — 35% Kyvo Boost, 50% MAX',
    logoTile: { bg: '#1F1838', fg: '#9D4EDD', initials: 'TX' },
    links: [
      { productName: 'Replace with real product', url: 'https://example.com/replace-me' },
    ],
  },
  // ────────────────────────────────────────────────────────────
  // Additional partnered brands (Higher Commission tier)
  // Replace these placeholders with your real partners.
  // ────────────────────────────────────────────────────────────
  {
    id: 'placeholder-brand-5',
    name: 'Brand Five',
    niche: 'Beauty',
    openCollabRate: 10,
    commissionRate: 25,
    maxCommission: 50,
    highCommission: true,
    logoTile: { bg: '#1A1838', fg: '#5CC8FF', initials: 'B5' },
    links: [
      { productName: 'Replace with real product', url: 'https://example.com/replace-me' },
    ],
  },
  {
    id: 'placeholder-brand-6',
    name: 'Brand Six',
    niche: 'Skincare',
    openCollabRate: 10,
    commissionRate: 25,
    maxCommission: 50,
    highCommission: true,
    logoTile: { bg: '#1A1838', fg: '#E94BC1', initials: 'B6' },
    links: [
      { productName: 'Replace with real product', url: 'https://example.com/replace-me' },
    ],
  },
  {
    id: 'placeholder-brand-7',
    name: 'Brand Seven',
    niche: 'Pet',
    openCollabRate: 8,
    commissionRate: 25,
    maxCommission: 50,
    highCommission: true,
    logoTile: { bg: '#1A1838', fg: '#22F5A3', initials: 'B7' },
    links: [
      { productName: 'Replace with real product', url: 'https://example.com/replace-me' },
    ],
  },
];

/** Brands shown as top stacked hero banners (50% brands only) */
export const heroBrands = brands
  .filter((b) => b.heroBanner)
  .sort((a, b) => (a.bannerOrder ?? 99) - (b.bannerOrder ?? 99));

/** Backwards-compat export so existing imports don't break */
export const priorityBrands = heroBrands;
