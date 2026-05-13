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
  /** Override the brand's Kyvo Boost rate for this specific product */
  commission?: number;
  /** Optional product thumbnail (PNG / JPG / SVG path in /public or external URL) */
  image?: string;
}

export interface Brand {
  id: string;
  name: string;
  /** Path to logo in /public, or external URL */
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

  /** Banner gradient/image for hero banner */
  bannerImage?: string;
  bannerGradient?: string;
  /** Marketing tagline shown in hero banner */
  tagline?: string;

  /** Show this brand as a top-stacked hero banner (reserve for 50% brands) */
  heroBanner?: boolean;
  /** Sort order in the hero banner stack — lower = higher on the page */
  bannerOrder?: number;

  /** Show 🔥 trending badge — reserve for genuinely surging brands */
  trending?: boolean;
  /** Used by the 'Higher Commission' filter pill — brands where Kyvo Boost > open rate */
  highCommission?: boolean;

  /** All product affiliate links for this brand */
  links: ProductLink[];
}

export type FilterCategory =
  | 'All Brands'
  | 'Health'
  | 'Beauty'
  | 'Skincare'
  | 'Pet'
  | 'Trending'
  | 'Higher Commission';
