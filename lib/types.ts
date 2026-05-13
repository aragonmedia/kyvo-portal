export type Niche =
  | 'Health'
  | 'Beauty'
  | 'Skincare'
  | 'Pet'
  | 'Fitness'
  | 'Wellness'
  | 'Lifestyle';

export interface ProductLink {
  productName: string;
  url: string;
  /** Short URL-safe identifier — used for `/products/<brand-id>/<slug>.png` image lookup */
  slug?: string;
  /** Lifetime units sold on TikTok Shop. Used to sort products within a brand. */
  itemsSold?: number;
  /** Product price as a string (e.g. "$28.95" or "$28.95-$89.95" for variants) */
  price?: string;
  /** Override the brand's Kyvo Boost rate for this specific product */
  commission?: number;
  /** Optional product thumbnail. Use /products/<brand-id>/<slug>.png convention. */
  image?: string;
}

export interface Brand {
  id: string;
  name: string;
  /** Path to logo in /public/logos/<brand-id>.png, or external URL */
  logo?: string;
  /** Fallback colored tile when no logo image exists */
  logoTile?: { bg: string; fg: string; initials: string };
  niche: Niche;

  /** ───────── 3-tier commission model ─────────
   *  openCollabRate  = base rate the brand offers on TikTok Shop to ANY creator
   *  commissionRate  = Kyvo Boost — what creators get through this portal
   *  maxCommission   = LOCKED MAX tier — unlocked via Discord ticket (usually 50%)
   */
  openCollabRate?: number;
  commissionRate: number;
  maxCommission?: number;

  /** Banner gradient/image for slideshow */
  bannerImage?: string;
  bannerGradient?: string;
  /** Marketing tagline shown in slideshow */
  tagline?: string;

  /** Show this brand in the top auto-rotating slideshow */
  priority?: boolean;
  /** Order in the slideshow — lower = earlier */
  priorityOrder?: number;

  /** Show 🔥 badge — automatically shown for 50% brands too */
  trending?: boolean;
  /** Used by the 'Higher Commission' filter — brands where Kyvo Boost > open rate */
  highCommission?: boolean;
  /** Used by the 'Samples Included' filter — brand sends physical samples to approved creators */
  samplesIncluded?: boolean;

  /** Per-brand Discord ticket URL. Falls back to discord.gg/kyvo if not set. */
  ticketUrl?: string;

  /** All product affiliate links for this brand */
  links: ProductLink[];
}

export type FilterCategory =
  | 'All Brands'
  | 'MAX Commissions'
  | 'Samples Included'
  | 'Health'
  | 'Beauty'
  | 'Skincare'
  | 'Pet'
  | 'Trending'
  | 'Higher Commission';
