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
    // ─ Commission model ─
    //   openCollabRate = 20% (TikTok Shop affiliate baseline — Kevin confirmed)
    //   commissionRate = 35% (Kyvo Boost: what creators get when they tap product link)
    //   maxCommission  = 50% (LOCKED MAX tier: unlocked via Discord)
    openCollabRate: 20,
    commissionRate: 35,
    maxCommission: 50,
    maxTier: true,          // Qualifies for MAX Commissions filter + 50% banner
    priority: true,
    priorityOrder: 1,
    trending: true,
    highCommission: true,
    samplesIncluded: true,
    showcaseUrl: 'https://affiliate-us.tiktok.com/api/v1/share/AJQYAsDa9aHy',
    // ticketUrl: 'https://discord.com/channels/.../...',  // TODO: paste per-brand ticket link
    tagline: 'Premium nootropics & focus stacks — Unlock 50% MAX',
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
    openCollabRate: 20,     // Kevin confirmed
    commissionRate: 35,
    maxCommission: 50,
    maxTier: true,
    priority: true,
    priorityOrder: 2,
    highCommission: true,
    samplesIncluded: true,
    showcaseUrl: 'https://affiliate-us.tiktok.com/api/v1/share/AJQYB79WV7sy',
    tagline: "Women's wellness creatine & supplements — Unlock 50% MAX",
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
    openCollabRate: 20,     // Kevin confirmed
    commissionRate: 35,
    maxCommission: 50,
    maxTier: true,
    priority: true,
    priorityOrder: 3,
    highCommission: true,
    samplesIncluded: true,
    showcaseUrl: 'https://affiliate-us.tiktok.com/api/v1/share/AJQYB0Rq3EsB',
    tagline: 'Beauty, collagen & longevity — Unlock 50% MAX',
    bannerGradient:
      'linear-gradient(135deg, #0a1d3e 0%, #1d4a8a 40%, #5CC8FF 80%, #22F5A3 100%)',
    bannerImage: '/banners/fuel-nutrition.jpg',
    logo: '/logos/fuel-nutrition.png',
    logoTile: { bg: '#11203A', fg: '#5CC8FF', initials: 'FN' },
    // ─── 4 products, sorted by items sold (descending) ────────────────
    links: [
      { productName: 'Multi Collagen Peptides Beauty Powder', slug: 'multi-collagen-peptides', itemsSold: 8539, price: '$35.00-$37.00', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXrt3AsGeX' },
      { productName: 'Fuel Beauty 24-IN-1 Hair, Skin & Nails', slug: 'fuel-beauty-24in1', itemsSold: 807, price: '$28.70', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXsE84YQNg' },
      // Multi Collagen Peptides (3-Pack) removed — no longer active
      { productName: 'Longevity+ Daily Wellness', slug: 'longevity-plus', itemsSold: 58, price: '$20.00-$80.00', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQXrt3BhFg2' },
    ],
  },
  {
    id: 'toplux-nutrition',
    name: 'Toplux Nutrition',
    niche: 'Health',
    // Kevin confirmed: 30% open collab, 32% Kyvo Boost (creator commission),
    // 35% MAX (locked top rate available for Toplux specifically — NOT 50%
    // like the priority brands).
    openCollabRate: 30,
    commissionRate: 32,
    maxCommission: 35,
    // priority/slideshow: REMOVED — only +5% boost over open, doesn't belong in MAX slideshow.
    highCommission: true,
    samplesIncluded: true,
    showcaseUrl: 'https://affiliate-us.tiktok.com/api/v1/share/AJQYBVnjFbzN',
    tagline: 'Megaseller supplements — 32% Kyvo Boost, 35% MAX',
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
  {
    id: 'nello-supercalm',
    name: 'Nello Supercalm',
    niche: 'Health',
    // Spreadsheet:  20% open / 25% creator / 30% MAX.
    openCollabRate: 20,
    commissionRate: 25,
    maxCommission: 30,
    maxTier: false,       // 25% Kyvo Boost — below MAX tier threshold
    highCommission: true, // +5% over open rate
    samplesIncluded: false,
    showcaseUrl: 'https://affiliate-us.tiktok.com/api/v1/share/AJQYHeyjs9gZ',
    tagline: 'Stress, mood & sleep support — Unlock 30% MAX',
    logo: '/logos/nello-supercalm.png',
    logoTile: { bg: '#11183A', fg: '#4A8DFF', initials: 'NL' },
    // ─── 5 products, sorted by items sold (descending) ────────────────
    links: [
      { productName: 'Calming Drink Mix (20 Servings)', slug: 'calming-drink-mix', itemsSold: 852032, price: '$33.96', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQYHdobpl61' },
      { productName: 'Tub 2-Pack (30 Servings)', slug: 'tub-2pack', itemsSold: 50663, price: '$67.42', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQYHfc5nJZL' },
      { productName: 'Calming Drink Mix — Lemon Berry', slug: 'calming-drink-mix-lemon', itemsSold: 45752, price: '$38.21', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQYIclB4Nao' },
      { productName: 'Best Selling Flavors Bundle (2-Pack)', slug: 'bundle-flavors-2pack', itemsSold: 28069, price: '$67.42', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQYHdnAk4Nu' },
      { productName: 'Variety Pack — Original Flavors', slug: 'variety-pack', itemsSold: 8005, price: '$30.55', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQYIciYYYlA' },
    ],
  },
  {
    id: 'dr-melaxin',
    name: 'Dr Melaxin',
    niche: 'Skincare',
    // Spreadsheet: 15% open / 20% creator / 25% MAX.  K-beauty / Korean cosmetics.
    openCollabRate: 15,
    commissionRate: 20,
    maxCommission: 25,
    maxTier: false,
    highCommission: true,    // +5% over open rate
    samplesIncluded: false,
    showcaseUrl: 'https://affiliate-us.tiktok.com/api/v1/share/AJQbCoKc6UQg',
    tagline: 'K-beauty for brightening & dark spots — Unlock 25% MAX',
    logo: '/logos/dr-melaxin.png',
    logoTile: { bg: '#2A1532', fg: '#E94BC1', initials: 'DM' },
    // ─── 3 products, sorted by items sold (descending) ────────────────
    links: [
      { productName: 'Peel Shot Glow Rice Ampoule Duo', slug: 'peel-shot-glow-rice', itemsSold: 852032, price: '$38.70', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQbDiVtYsMb' },
      { productName: 'TX Cream 50ml — Tranexamic Acid', slug: 'tx-cream', itemsSold: 128666, price: '$23.40', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQbEe2a4EUo' },
      { productName: 'Perfect Neck Wrinkle Care Set', slug: 'neck-wrinkle-care-set', itemsSold: 81305, price: '$67.42', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQbEYSs14yL' },
    ],
  },
  {
    id: 'sacheu-beauty',
    name: 'Sacheu Beauty',
    niche: 'Beauty',
    // Spreadsheet: 15% open / 25% creator / 30% MAX.  Viral TikTok lip-liner brand.
    openCollabRate: 15,
    commissionRate: 25,
    maxCommission: 30,
    maxTier: false,
    highCommission: true,    // +10% over open rate — strong boost
    samplesIncluded: false,
    // showcaseUrl: NOT set — single-product brand, so the
    // "ADD ALL TO SHOWCASE" CTA is auto-suppressed (gated on links.length > 1).
    tagline: 'Viral peel-off lip liner stain — Unlock 30% MAX',
    logo: '/logos/sacheu-beauty.png',
    logoTile: { bg: '#2A0F1A', fg: '#FF7AA0', initials: 'SB' },
    // ─── 1 product ─────────────────────────────────────────────────
    links: [
      { productName: 'Lip Liner Stay-N — Peel-Off Lip Stain', slug: 'lip-liner-stay-n', itemsSold: 2094767, price: '$14.00', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQbiwekLR8P' },
    ],
  },
  {
    id: 'pet-honesty',
    name: 'Pet Honesty',
    niche: 'Pet',
    // Spreadsheet: 15% open / 25% creator / 35% MAX.  Natural pet supplements.
    openCollabRate: 15,
    commissionRate: 25,
    maxCommission: 35,
    maxTier: false,
    highCommission: true,    // +10% over open rate
    samplesIncluded: false,
    showcaseUrl: 'https://affiliate-us.tiktok.com/api/v1/share/AJQbwGBUFbJ7',
    tagline: 'Dog dental & gut health — Unlock 35% MAX',
    logo: '/logos/pet-honesty.png',
    logoTile: { bg: '#2A1F1A', fg: '#FFB347', initials: 'PH' },
    // ─── 2 products, sorted by items sold (descending) ────────────────
    links: [
      { productName: 'Dental Powder & Breath Freshener', slug: 'dental-powder', itemsSold: 42419, price: '$26.98', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQbwCWG4zAW' },
      { productName: 'Probiotics for Dogs', slug: 'probiotics', itemsSold: 18555, price: '$23.09', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQbwjKnv62T' },
    ],
  },
  {
    id: 'physicians-choice',
    name: "Physician's Choice",
    niche: 'Health',
    // Spreadsheet: 20% open / 23% creator / 25% MAX.  Gut + women's wellness.
    openCollabRate: 20,
    commissionRate: 23,
    maxCommission: 25,
    maxTier: false,
    highCommission: true,    // +3% over open rate
    samplesIncluded: false,
    showcaseUrl: 'https://affiliate-us.tiktok.com/api/v1/share/AJQcrw49X7hp',
    tagline: "Gut & women's wellness probiotics — Unlock 25% MAX",
    logo: '/logos/physicians-choice.png',
    logoTile: { bg: '#1A2A22', fg: '#7FE0B8', initials: 'PC' },
    // ─── 5 products, sorted by items sold (descending) ────────────────
    links: [
      { productName: 'Hack Your Tummy Bundle', slug: 'hack-your-tummy-bundle', itemsSold: 705482, price: '$38.97', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQcxJ0DO0jm' },
      { productName: 'Vaginal Probiotic', slug: 'vaginal-probiotic', itemsSold: 293623, price: '$22.44', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQcxlGIyVab' },
      { productName: 'Digestive Enzymes', slug: 'digestive-enzymes', itemsSold: 283776, price: '$15.97', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQczxkpWo2u' },
      { productName: 'Gut Guardian Bundle', slug: 'gut-guardian-bundle', itemsSold: 150414, price: '$68.97', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQcvLjsBaQ4' },
      { productName: 'Inner Harmony Duo', slug: 'inner-harmony-duo', itemsSold: 35073, price: '$39.97', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQcvNFsRGN9' },
    ],
  },
  {
    id: 'jiyuskin',
    name: 'JiYuSkin',
    niche: 'Skincare',
    // Spreadsheet: 25% open / 30% creator / 35% MAX.  Korean toner pads.
    openCollabRate: 25,
    commissionRate: 30,
    maxCommission: 35,
    maxTier: false,
    highCommission: true,    // +5% over open rate
    samplesIncluded: false,
    showcaseUrl: 'https://affiliate-us.tiktok.com/api/v1/share/AJQdrqQZZkUO',
    tagline: 'Korean anti-aging toner pads — Unlock 35% MAX',
    logo: '/logos/jiyuskin.png',
    logoTile: { bg: '#2A1F1A', fg: '#FFC79E', initials: 'JY' },
    // ─── 2 products, sorted by items sold (descending) ────────────────
    links: [
      { productName: 'Anti-Aging Toner Pads (100 ct)', slug: 'toner-pads', itemsSold: 252553, price: '$42.95', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQdtjJ7aHUp' },
      { productName: 'Anti-Aging Toner Pads (2-Pack)', slug: 'toner-pads-2pack', itemsSold: 49245, price: '$72.53', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQdtjiOyplq' },
    ],
  },
  {
    id: 'betterbrand',
    name: 'Betterbrand',
    niche: 'Health',
    // Per-product open collab rates differ on Betterbrand — tea bags are at
    // 15% open while gummies are at 20% open. Brand-level openCollabRate is a
    // fallback; each product entry overrides with its real rate.
    openCollabRate: 15,        // fallback baseline (matches tea bags)
    commissionRate: 23,        // Kyvo Boost (consistent across products)
    maxCommission: 25,         // MAX (consistent across products)
    maxTier: false,
    highCommission: true,
    samplesIncluded: false,
    showcaseUrl: 'https://affiliate-us.tiktok.com/api/v1/share/AJQdxwatdhEy',
    tagline: 'Lung detox & respiratory wellness — Unlock 25% MAX',
    logo: '/logos/betterbrand.png',
    logoTile: { bg: '#0A2A2A', fg: '#5FCEC1', initials: 'Bt' },
    // ─── 2 products, sorted by items sold; per-product openCollabRate set explicitly ─
    links: [
      { productName: 'Herbal Lung Detox Tea Bags', slug: 'lung-detox-tea', itemsSold: 133411, price: '$22.95', openCollabRate: 15, url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQdyrEOXR2X' },
      { productName: 'Mullein Lung Detox Gummies', slug: 'lung-detox-gummies', itemsSold: 54399, price: '$34.95', openCollabRate: 20, url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQdyn961HiB' },
    ],
  },
  {
    id: 'bloom-nutrition',
    name: 'Bloom Nutrition',
    niche: 'Health',
    // Spreadsheet: 20% open / 23% creator / 25% MAX.  Rates consistent across products.
    openCollabRate: 20,
    commissionRate: 23,
    maxCommission: 25,
    maxTier: false,
    highCommission: true,    // +3% over open rate
    samplesIncluded: false,
    showcaseUrl: 'https://affiliate-us.tiktok.com/api/v1/share/AJQe6ypb4kx5',
    tagline: 'Creatine, greens & energy — Unlock 25% MAX',
    logo: '/logos/bloom-nutrition.png',
    logoTile: { bg: '#2A1525', fg: '#FFA8BC', initials: 'BL' },
    // ─── 4 products, sorted by items sold (descending) ────────────────
    links: [
      { productName: 'Creatine Gummies', slug: 'creatine-gummies', itemsSold: 112123, price: '$16.99', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQe7d4fRCqM' },
      { productName: 'Creatine Monohydrate Powder (40 servings)', slug: 'creatine-powder', itemsSold: 101009, price: '$14.99', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQe7lVrSPuB' },
      { productName: 'Energy Sticks (10 sticks)', slug: 'energy-sticks', itemsSold: 41650, price: '$6.49', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQe7qkaIIY7' },
      { productName: 'Greens & Superfoods Powder (2-Pack)', slug: 'greens-superfoods', itemsSold: 23941, price: '$45.99', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQe8JDsEACT' },
    ],
  },
  {
    id: 'nusava',
    name: 'Nusava',
    niche: 'Health',
    // Spreadsheet: 22% open / 27% creator / 30% MAX.  B12 liquid supplements.
    openCollabRate: 22,
    commissionRate: 27,
    maxCommission: 30,
    maxTier: false,
    highCommission: true,    // +5% over open rate
    samplesIncluded: false,
    expiresAt: '2026-06-26',  // RENEWABLE — flag set; card shows 'Until Jun 26'
    showcaseUrl: 'https://affiliate-us.tiktok.com/api/v1/share/AJQeBUgkYeHA',
    tagline: 'B12 liquid drops for energy & focus — Unlock 30% MAX',
    logo: '/logos/nusava.png',
    logoTile: { bg: '#2A2818', fg: '#FFE48F', initials: 'NV' },
    // ─── 2 products, sorted by items sold (descending) ────────────────
    links: [
      { productName: 'Vitamin B12 Liquid Drops (2-Pack)', slug: 'b12-drops-original', itemsSold: 202910, price: '$16.99', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQeB6bZc9oJ' },
      { productName: 'Vitamin B12 Strawberry Liquid Drops (2-Pack)', slug: 'b12-drops-strawberry', itemsSold: 7830, price: '$14.99', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQeCP4ptPUE' },
    ],
  },
  {
    id: 'neurogum',
    name: 'NeuroGum',
    niche: 'Health',
    // Spreadsheet: 15% open / 23% creator / 25% MAX.  Rates consistent across products.
    openCollabRate: 15,
    commissionRate: 23,
    maxCommission: 25,
    maxTier: false,
    highCommission: true,    // +8% over open rate
    samplesIncluded: true,
    showcaseUrl: 'https://affiliate-us.tiktok.com/api/v1/share/AJQeGioHR7yO',
    tagline: 'Energy & focus gum with L-theanine — Unlock 25% MAX',
    logo: '/logos/neurogum.png',
    logoTile: { bg: '#0A0F2E', fg: '#8AA6FF', initials: 'NG' },
    // ─── 5 products, sorted by items sold (descending) ────────────────
    links: [
      { productName: 'Energy Gum (Peppermint)', slug: 'energy-peppermint', itemsSold: 957865, price: '$24.99', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQeI4Kb6og4' },
      { productName: 'Decaf Memory & Focus Gum (Peppermint)', slug: 'decaf-peppermint', itemsSold: 21850, price: '$27.88', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQeIWUiqdps' },
      { productName: 'Variety Pack Energy Gum', slug: 'variety-pack', itemsSold: 15981, price: '$24.99', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQeJ05SBMdb' },
      { productName: 'Extra Strength Energy Gum (Spearmint)', slug: 'spearmint-extra-strength', itemsSold: 3391, price: '$26.99', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQeItN2dN1e' },
      { productName: 'Extra Strength Energy Gum (Peppermint)', slug: 'peppermint-extra-strength', itemsSold: 3353, price: '$29.99', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQeK9CZO4eH' },
    ],
  },
  {
    id: 'clean-nutra',
    name: 'Clean Nutra',
    niche: 'Health',
    // Spreadsheet has product-level variance — top 4 sellers at 25% open,
    // bottom 3 at 15% open. 28% Kyvo Boost / 30% MAX consistent across all.
    openCollabRate: 25,   // brand default (top sellers)
    commissionRate: 28,
    maxCommission: 30,
    maxTier: false,
    highCommission: true,
    samplesIncluded: false,
    expiresAt: '2026-06-26',  // RENEWABLE
    showcaseUrl: 'https://affiliate-us.tiktok.com/api/v1/share/AJQeQzYpozGN',
    tagline: 'Liquid herbal supplements & adaptogens — Unlock 30% MAX',
    logo: '/logos/clean-nutra.png',
    logoTile: { bg: '#1A2A18', fg: '#B8E08F', initials: 'CN' },
    // ─── 7 products, sorted by items sold; per-product openCollabRate where it differs ─
    links: [
      { productName: 'Cinnamon Berberine Drops', slug: 'cinnamon-berberine', itemsSold: 107293, price: '$22.45', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQeQgYDS7Bs' },
      { productName: 'Maca Root + Ashwagandha Drops', slug: 'maca-ashwagandha', itemsSold: 73092, price: '$22.45', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQePv1SKyTq' },
      { productName: 'Creatine for Women', slug: 'creatine-for-women', itemsSold: 34030, price: '$29.95', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQePxMPaS06' },
      { productName: 'Thyroid Support Drops', slug: 'thyroid-support', itemsSold: 8572, price: '$22.45', url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQeQknESUrc' },
      { productName: 'PlantFlow Moringa Drops', slug: 'moringa-drops', itemsSold: 3655, price: '$22.45', openCollabRate: 15, url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQeQ3isnO7e' },
      { productName: 'Celluvive NAD+ Drops', slug: 'nad-drops', itemsSold: 3166, price: '$22.45', openCollabRate: 15, url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQeRKnCrsNT' },
      { productName: 'Botaniguard Oil of Oregano', slug: 'oil-of-oregano', itemsSold: 2706, price: '$22.45', openCollabRate: 15, url: 'https://affiliate-us.tiktok.com/api/v1/share/AJQeRZaTtd6h' },
    ],
  },
  // ────────────────────────────────────────────────────────────
  // Add more brands here. Use BRAND_ONBOARDING.md for the workflow.
  // ────────────────────────────────────────────────────────────
];

/** Default Discord ticket URL when a brand doesn't have its own ticketUrl set */
export const DEFAULT_TICKET_URL = 'https://discord.gg/kyvo';

/** Brands shown in the auto-rotating slideshow, ordered by priorityOrder */
export const priorityBrands = brands
  .filter((b) => b.priority)
  .sort((a, b) => (a.priorityOrder ?? 99) - (b.priorityOrder ?? 99));

/** Backwards-compat — heroBrands was the previous stacked-banner export */
export const heroBrands = priorityBrands;
