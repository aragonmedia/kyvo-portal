import type { Brand } from '@/lib/types';

/**
 * KYVO PARTNERED BRANDS
 *
 * To add or edit a brand:
 * 1. Add an entry to this array following the Brand type.
 * 2. Drop the logo PNG/SVG into /public/logos/<brand-id>.png
 *    OR use a logoTile { bg, fg, initials } for a colored placeholder.
 * 3. Set priority: true and priorityOrder for brands you want in the top slideshow.
 * 4. Run `npm run dev` to preview locally, then push to GitHub.
 *
 * Priority brands (at launch):
 *   1. Natural Stacks  — 50%
 *   2. Bold Buns       — 50%
 *   3. Fuel Nutrition  — 50%
 *   4. Toplux Nutrition — 35%
 */

export const brands: Brand[] = [
  {
    id: 'natural-stacks',
    name: 'Natural Stacks',
    niche: 'Health',
    commissionRate: 50,
    priority: true,
    priorityOrder: 1,
    trending: true,
    highCommission: true,
    tagline: '50% commission on premium nootropics & wellness',
    bannerGradient:
      'linear-gradient(135deg, #1a0b3e 0%, #4a1d8a 35%, #7B3FE4 70%, #22F5A3 100%)',
    logoTile: { bg: '#1A1838', fg: '#22F5A3', initials: 'NS' },
    // logo: '/logos/natural-stacks.png',
    links: [
      // TODO: Paste real Natural Stacks affiliate links here
      { productName: 'MagTech Magnesium', url: 'https://example.com/replace-me', commission: 50 },
      { productName: 'Dopamine Brain Food', url: 'https://example.com/replace-me', commission: 50 },
      { productName: 'Smart Caffeine', url: 'https://example.com/replace-me', commission: 50 },
      { productName: 'CILTEP', url: 'https://example.com/replace-me', commission: 50 },
    ],
  },
  {
    id: 'bold-buns',
    name: 'Bold Buns',
    niche: 'Health',
    commissionRate: 50,
    priority: true,
    priorityOrder: 2,
    trending: true,
    highCommission: true,
    tagline: '50% commission — bold flavors, bigger payouts',
    bannerGradient:
      'linear-gradient(135deg, #2a0a3e 0%, #7a1d8a 40%, #E94BC1 80%, #FF6BCB 100%)',
    logoTile: { bg: '#2A1738', fg: '#FF6BCB', initials: 'BB' },
    links: [
      { productName: 'Replace with real product', url: 'https://example.com/replace-me', commission: 50 },
    ],
  },
  {
    id: 'fuel-nutrition',
    name: 'Fuel Nutrition',
    niche: 'Health',
    commissionRate: 50,
    priority: true,
    priorityOrder: 3,
    trending: true,
    highCommission: true,
    tagline: '50% commission on performance fuel',
    bannerGradient:
      'linear-gradient(135deg, #0a1d3e 0%, #1d4a8a 40%, #5CC8FF 80%, #22F5A3 100%)',
    logoTile: { bg: '#11203A', fg: '#5CC8FF', initials: 'FN' },
    links: [
      { productName: 'Replace with real product', url: 'https://example.com/replace-me', commission: 50 },
    ],
  },
  {
    id: 'toplux-nutrition',
    name: 'Toplux Nutrition',
    niche: 'Health',
    commissionRate: 35,
    priority: true,
    priorityOrder: 4,
    highCommission: true,
    tagline: '35% commission on luxury supplements',
    bannerGradient:
      'linear-gradient(135deg, #1a0b3e 0%, #4a1d8a 40%, #9D4EDD 80%, #E94BC1 100%)',
    logoTile: { bg: '#1F1838', fg: '#9D4EDD', initials: 'TX' },
    links: [
      { productName: 'Replace with real product', url: 'https://example.com/replace-me', commission: 35 },
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
    commissionRate: 25,
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
    commissionRate: 25,
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
    commissionRate: 25,
    highCommission: true,
    logoTile: { bg: '#1A1838', fg: '#22F5A3', initials: 'B7' },
    links: [
      { productName: 'Replace with real product', url: 'https://example.com/replace-me' },
    ],
  },
];

/** Brands shown in the top slideshow, ordered by priorityOrder */
export const priorityBrands = brands
  .filter((b) => b.priority)
  .sort((a, b) => (a.priorityOrder ?? 99) - (b.priorityOrder ?? 99));
