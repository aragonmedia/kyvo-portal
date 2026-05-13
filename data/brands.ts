import type { Brand } from '@/lib/types';

/**
 * KYVO PARTNERED BRANDS
 *
 * ─── 3-tier commission model ────────────────────────────────
 *   openCollabRate  = base rate the brand offers on TikTok Shop to ANY creator
 *   commissionRate  = Kyvo Boost — what creators get through this portal
 *   maxCommission   = LOCKED MAX tier — unlocked via Discord ticket
 *
 * ─── Flags ───────────────────────────────────────────────────
 *   priority         = appears in top auto-rotating slideshow
 *   priorityOrder    = order in slideshow (lower = first)
 *   trending         = 🔥 explicit trending flag (50% brands auto-get 🔥 too)
 *   samplesIncluded  = physical samples sent to approved creators
 *   highCommission   = matches "Higher Commission" filter pill (Kyvo > open rate)
 *   ticketUrl        = brand-specific Discord ticket link (else uses discord.gg/kyvo)
 *
 * ─── Image conventions ───────────────────────────────────────
 *   Brand logo:     /public/logos/<brand-id>.png         → set via `logo` field
 *   Product image:  /public/products/<brand-id>/<slug>.png → set via link.image
 *   Banner photo:   /public/banners/<brand-id>.jpg       → set via `bannerImage`
 *                   2000×600px wide; the portal overlays a dark-left gradient
 *                   for text legibility, so submit clean photos as-is.
 *
 * To add or edit a brand: update this array, re-upload data/brands.ts via
 * GitHub web UI. Vercel auto-redeploys.
 */

export const brands: Brand[] = [
  {
    id: 'natural-stacks',
    name: 'Natural Stacks',
    niche: 'Health',
    // Per Kyvo X Natural Stacks spreadsheet:
    //   Affiliate partner commission = 15% (the "open" rate on TikTok Shop)
    //   Creator commission           = 35% (the Kyvo Boost rate live on platform)
    //   MAX tier                     = 50% (locked, unlocked via Discord ticket)
    openCollabRate: 15,
    commissionRate: 35,
    maxCommission: 50,
    priority: true,
    priorityOrder: 1,
    trending: true,
    highCommission: true,
    samplesIncluded: true,
    // ticketUrl: 'https://discord.com/channels/.../...',  // TODO: paste per-brand ticket link
    tagline: 'Premium nootropics — 35% Kyvo Boost, 50% MAX',
    bannerGradient:
      'linear-gradient(135deg, #1a0b3e 0%, #4a1d8a 35%, #7B3FE4 70%, #22F5A3 100%)',
    bannerImage: '/banners/natural-stacks.jpg',
    logo: '/logos/natural-stacks.png',
    logoTile: { bg: '#1A1838', fg: '#22F5A3', initials: 'NS' },
    // ─── 41 products, sorted by items sold (descending) ────────────────
    links: [
      { productName: 'Dopamine Brain Food (60ct)', slug: 'dopamine-brain-food', itemsSold: 41112, price: '$28.95-$89.95', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXbgtdeElS' },
      { productName: 'Dopamine Brain Food (2-Pack)', slug: 'dopamine-brain-food-2pack', itemsSold: 5189, price: '$34.15', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXjARyIeFi' },
      { productName: 'Dopamine + Serotonin Stack (2-Pack)', slug: 'dopamine-serotonin-stack-2pack', itemsSold: 3557, price: '$38.74', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXjARzOtTu' },
      { productName: 'Dopamine Brain Food (3-Pack)', slug: 'dopamine-brain-food-3pack', itemsSold: 2359, price: '$58.14', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXbgytmCan' },
      { productName: 'Serotonin Brain Food', slug: 'serotonin-brain-food', itemsSold: 458, price: '$28.08', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXbgyWP5N7' },
      { productName: 'Focus & Memory Stack', slug: 'focus-memory-stack', itemsSold: 392, price: '$33.90', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXbgtekExk' },
      { productName: 'Dopamine + NeuroAlert Stack', slug: 'dopamine-neuroalert-stack', itemsSold: 364, price: '$38.75', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXjASC319l' },
      { productName: 'MagTech Magnesium (90ct)', slug: 'magtech-magnesium', itemsSold: 293, price: '$29.05', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXjARaeWM3' },
      { productName: 'Mental Energy Stack', slug: 'mental-energy-stack', itemsSold: 139, price: '$38.75', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXbgyYsLDW' },
      { productName: 'NeuroAlert', slug: 'neuroalert', itemsSold: 125, price: '$24.20', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXbgyvhcqc' },
      { productName: 'Smart Caffeine (60ct)', slug: 'smart-caffeine', itemsSold: 97, price: '$19.95', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXjARbCTEt' },
      { productName: 'Focus Bites', slug: 'focus-bites', itemsSold: 92, price: '$19.95', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXbgyY3K6I' },
      { productName: 'Day & Night Stack', slug: 'day-night-stack', itemsSold: 53, price: '$76.90', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXbgyubRxl' },
      { productName: 'NEUROFUEL Nootropic', slug: 'neurofuel', itemsSold: 31, price: '$34.95', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXjARa6U49' },
      { productName: 'MagTech Magnesium (2-Pack)', slug: 'magtech-magnesium-2pack', itemsSold: 22, price: '$73.90', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXjARyqsPs' },
      { productName: 'Dopamine + Smart Creatine Stack', slug: 'dopamine-creatine-stack', itemsSold: 22, price: '$38.95', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXbgu3luOy' },
      { productName: 'Smart Ginkgo', slug: 'smart-ginkgo', itemsSold: 12, price: '$24.95', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXbgyWx8RB' },
      { productName: 'Acetylcholine Brain Food', slug: 'acetylcholine-brain-food', itemsSold: 12, price: '$39.95', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXbgyXVE1c' },
      { productName: 'GABA Brain Food', slug: 'gaba-brain-food', itemsSold: 11, price: '$39.95', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXbgtfqcKz' },
      { productName: 'Performance & Longevity Stack', slug: 'performance-longevity-stack', itemsSold: 11, price: '$59.00', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXbgu2whgt' },
      { productName: 'NEUROFUEL + Smart Caffeine Stack', slug: 'neurofuel-smart-caffeine-stack', itemsSold: 10, price: '$50.91', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXbgtisCaV' },
      { productName: 'Mood Bites', slug: 'mood-bites', itemsSold: 9, price: '$19.95', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXbgysOu46' },
      { productName: 'Mood & Stress-Relief Stack', slug: 'mood-stress-relief', itemsSold: 7, price: '$67.91', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXbgu1IRUV' },
      { productName: 'MagTech Magnesium (3-Pack)', slug: 'magtech-magnesium-3pack', itemsSold: 7, price: '$110.85', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXbgu3UiFK' },
      { productName: "Smart Lion's Mane", slug: 'smart-lions-mane', itemsSold: 6, price: '$24.95', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXjARcZv09' },
      { productName: 'Mental Performance Stack', slug: 'mental-performance-stack', itemsSold: 6, price: '$117.95', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXbgyrZm1S' },
      { productName: 'Magnesium Sleep Gummies', slug: 'magnesium-gummy', itemsSold: 5, price: '$33.90', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXjARwvN5s' },
      { productName: 'Smart Apigenin', slug: 'smart-apigenin', itemsSold: 4, price: '$29.95', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXbgtgfmBR' },
      { productName: 'Brain Food Stack', slug: 'brain-food-stack', itemsSold: 4, price: '$143.97', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXjARw6Fxx' },
      { productName: 'Sleep & Relaxation Stack', slug: 'sleep-relaxation-stack', itemsSold: 3, price: '$65.37', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXbgyVqs57' },
      { productName: 'Magnesium Mood Gummies', slug: 'magnesium-mood-gummies', itemsSold: 3, price: '$16.95', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXbgtf1Pzk' },
      { productName: 'Smart Creatine', slug: 'smart-creatine', itemsSold: 3, price: '$29.95', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXjARdOw7j' },
      { productName: 'Vitamin D3 + Coconut Oil', slug: 'vitamin-d3', itemsSold: 3, price: '$9.95', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXbgtiK00i' },
      { productName: 'NEUROLIFE', slug: 'neurolife', itemsSold: 3, price: '$34.95', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXjARdx3HV' },
      { productName: 'Smart Resveratrol', slug: 'smart-resveratrol', itemsSold: 3, price: '$29.95', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXbgu1qS60' },
      { productName: 'MagTech Cognition Drink', slug: 'magtech-cognition-drink', itemsSold: 3, price: '$29.95', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXjAS0E3p6' },
      { productName: 'Aging & Longevity Stack', slug: 'aging-longevity-stack', itemsSold: 2, price: '$50.91', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXbgyrIrox' },
      { productName: 'Cordyceps+', slug: 'cordyceps-plus', itemsSold: 2, price: '$24.95', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXjARxTY6r' },
      { productName: 'MagTech Sleep Drink', slug: 'magtech-sleep-drink', itemsSold: 2, price: '$29.95', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXbgyv9Oj0' },
      { productName: 'MagTech Hydrate Drink', slug: 'magtech-hydrate-drink', itemsSold: 1, price: '$29.95', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXbgu4b2xj' },
      { productName: 'MagTech Magnesium Lemonade', slug: 'magtech-lemonade', itemsSold: 0, price: '$44.95', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXjAReE3OD' },
    ],
  },
  {
    id: 'bold-buns',
    name: 'Bold Buns',
    niche: 'Health',
    // Spreadsheet: 35% creator / 15% affiliate partner.  Same model as Natural Stacks.
    openCollabRate: 15,
    commissionRate: 35,
    maxCommission: 50,
    priority: true,
    priorityOrder: 2,
    highCommission: true,
    samplesIncluded: true,
    tagline: "Women's wellness — 35% Kyvo Boost, 50% MAX",
    bannerGradient:
      'linear-gradient(135deg, #2a0a3e 0%, #7a1d8a 40%, #E94BC1 80%, #FF6BCB 100%)',
    bannerImage: '/banners/bold-buns.jpg',
    logo: '/logos/bold-buns.png',
    logoTile: { bg: '#2A1738', fg: '#FF6BCB', initials: 'BB' },
    // ─── 2 products, sorted by items sold (descending) ────────────────
    links: [
      { productName: 'Bold Buns Creatine for Women', slug: 'bold-buns-creatine', itemsSold: 55428, price: '$33.99-$38.99', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXs9cmdk5Q' },
      { productName: "Daily Balance — Women's Wellness", slug: 'daily-balance', itemsSold: 2265, price: '$34.99', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXrki79URe' },
    ],
  },
  {
    id: 'fuel-nutrition',
    name: 'Fuel Nutrition',
    niche: 'Health',
    // Spreadsheet: 35% creator / 15% affiliate partner.  Same model as Natural Stacks.
    openCollabRate: 15,
    commissionRate: 35,
    maxCommission: 50,
    priority: true,
    priorityOrder: 3,
    highCommission: true,
    samplesIncluded: true,
    tagline: 'Beauty & longevity — 35% Kyvo Boost, 50% MAX',
    bannerGradient:
      'linear-gradient(135deg, #0a1d3e 0%, #1d4a8a 40%, #5CC8FF 80%, #22F5A3 100%)',
    bannerImage: '/banners/fuel-nutrition.jpg',
    logo: '/logos/fuel-nutrition.png',
    logoTile: { bg: '#11203A', fg: '#5CC8FF', initials: 'FN' },
    // ─── 4 products, sorted by items sold (descending) ────────────────
    links: [
      { productName: 'Multi Collagen Peptides Beauty Powder', slug: 'multi-collagen-peptides', itemsSold: 8539, price: '$35.00-$37.00', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXrt3AsGeX' },
      { productName: 'Fuel Beauty 24-IN-1 Hair, Skin & Nails', slug: 'fuel-beauty-24in1', itemsSold: 807, price: '$28.70', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXsE84YQNg' },
      { productName: 'Multi Collagen Peptides (3-Pack)', slug: 'multi-collagen-peptides-3pack', itemsSold: 469, price: '$90.00', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXrstdf2zB' },
      { productName: 'Longevity+ Daily Wellness', slug: 'longevity-plus', itemsSold: 58, price: '$20.00-$80.00', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXrt3BhFg2' },
    ],
  },
  {
    id: 'toplux-nutrition',
    name: 'Toplux Nutrition',
    niche: 'Health',
    // Spreadsheet: 32% creator / 3% affiliate partner.  LOWER total payout than the
    // 35%+15% brands above.  Open-collab base rate is just a placeholder estimate.
    openCollabRate: 5,
    commissionRate: 32,
    maxCommission: 50,
    // priority/slideshow: REMOVED — 32% creator rate, doesn't belong in MAX slideshow.
    // Still appears in the brand grid below.
    highCommission: true,
    samplesIncluded: true,
    tagline: 'Megaseller supplements — 32% Kyvo Boost, 50% MAX',
    logo: '/logos/toplux-nutrition.png',
    logoTile: { bg: '#1F1838', fg: '#9D4EDD', initials: 'TX' },
    // ─── 7 products, sorted by items sold (descending) ────────────────
    links: [
      { productName: 'Magnesium Complex 1000mg (8 forms)', slug: 'magnesium-complex', itemsSold: 1385330, price: '$17.97', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXsVxpErPO' },
      { productName: 'Collagen Peptides Complex (5 types)', slug: 'collagen-peptides', itemsSold: 273642, price: '$17.97', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXsVxq3oEJ' },
      { productName: 'Organic Beet Root Tablets', slug: 'beet-root-tablets', itemsSold: 116264, price: '$16.97', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXsW9XBr3u' },
      { productName: 'Moringa Capsules 1200mg', slug: 'moringa-capsules', itemsSold: 84357, price: '$15.97', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXrz1obJ6l' },
      { productName: 'Resveratrol 1800mg Antioxidant', slug: 'resveratrol', itemsSold: 56280, price: '$17.97', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXrz1nmEOZ' },
      { productName: 'Dim Supplement 910mg', slug: 'dim-supplement', itemsSold: 13202, price: '$15.97', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXsW9YZF41' },
      { productName: 'Organic Beet Root Capsules', slug: 'beet-root-capsules', itemsSold: 12049, price: '$15.97', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXsW9Z7BAh' },
    ],
  },
  // ────────────────────────────────────────────────────────────
  // Open-campaign / non-sample brands (higher commission than open
  // collab but Kyvo doesn't ship samples for these)
  // ────────────────────────────────────────────────────────────
  {
    id: 'placeholder-brand-5',
    name: 'Brand Five',
    niche: 'Beauty',
    openCollabRate: 10,
    commissionRate: 25,
    maxCommission: 50,
    highCommission: true,
    samplesIncluded: false,
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
    samplesIncluded: false,
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
    samplesIncluded: false,
    logoTile: { bg: '#1A1838', fg: '#22F5A3', initials: 'B7' },
    links: [
      { productName: 'Replace with real product', url: 'https://example.com/replace-me' },
    ],
  },
];

/** Default Discord ticket URL when a brand doesn't have its own ticketUrl set */
export const DEFAULT_TICKET_URL = 'https://discord.gg/kyvo';

/** Brands shown in the auto-rotating slideshow, ordered by priorityOrder */
export const priorityBrands = brands
  .filter((b) => b.priority)
  .sort((a, b) => (a.priorityOrder ?? 99) - (b.priorityOrder ?? 99));

/** Backwards-compat — heroBrands was the previous stacked-banner export */
export const heroBrands = priorityBrands;
