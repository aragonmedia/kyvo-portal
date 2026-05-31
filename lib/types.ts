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
  /** Override the brand's open-collab (TikTok Shop baseline) rate for this product.
   *  Use when products in the same brand have different open collab rates — never
   *  generalize or average. Accuracy over marketing. */
  openCollabRate?: number;
  /** Override the brand's MAX commission for this specific product */
  maxCommission?: number;
  /** Per-product samples flag. Falls back to brand.samplesIncluded if not set.
   *  Set explicitly when a brand has MIXED samples (some products yes, some no). */
  samplesIncluded?: boolean;
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
  /** Niche category. Use a single string for single-category brands, or an
   *  array for cross-category brands (e.g. hair/skin/nails supplements belong
   *  in both 'Health' and 'Beauty' filters). Use the `niches()` helper to
   *  always read as an array. */
  niche: Niche | Niche[];

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

  /** Per-brand Discord unlock URL. Falls back to discord.gg/kyvo if not set. */
  ticketUrl?: string;

  /** Per-brand "Add all to TikTok showcase" URL. Falls back to ticketUrl/Discord. */
  showcaseUrl?: string;

  /** MAX tier — qualifies for MAX Commissions filter + 50% banner display.
   *  Independent of commissionRate so we can keep the click-through rate (35%)
   *  while still marketing the brand as MAX (50% via Discord). */
  maxTier?: boolean;

  /** Campaign expiration date (ISO YYYY-MM-DD). When set, the brand card
   *  shows a subtle 'Until MMM DD' pill so renewals are easy to spot. */
  expiresAt?: string;

  /** NEW badge — shown as a green pip on the brand card. Lets creators quickly
   *  spot freshly-added brands. Set manually when launching a new brand; clear
   *  after a couple of weeks. */
  isNew?: boolean;

  /** Optional URL for sample registration (Google Forms, Typeform, etc.).
   *  When set, the BrandModal shows a prominent "Register for samples" CTA
   *  that opens this URL in a new tab. Use this for brands that gate sample
   *  shipments behind a registration flow (often a QR code in TikTok bio). */
  sampleRegistrationUrl?: string;

  /** All product affiliate links for this brand */
  links: ProductLink[];
}

/** Reward campaign — "Generate X GMV earn $X" style promotions a brand runs
 *  for creators. Rendered as a highlighted card in the homepage Rewards
 *  section between the slideshow and search. Tap the card to zoom the
 *  image (or render the PDF if documentUrl is set). */
export interface RewardCampaign {
  /** brand.id this campaign belongs to. Used to look up brand metadata
   *  (logo + name) so the card stays in sync with the brand record. */
  brandId: string;
  /** Card preview thumbnail — JPEG or PNG under ~300KB.
   *  Path under /public/rewards/<brand-id>.<ext>. The image IS the headline
   *  of the card on the homepage. For PDF campaigns, this should be a
   *  raster preview generated from the first page of the PDF. */
  image: string;
  /** Optional path to a high-quality PDF version of the campaign material.
   *  When set, the zoom modal renders the PDF in an iframe instead of the
   *  preview image — preserves crisp text/graphics for desktop creators. */
  documentUrl?: string;
  /** Optional short headline shown above the image. */
  title?: string;
  /** Optional one-line description shown below the image. */
  description?: string;
  /** Optional registration URL. When set, the card renders a prominent
   *  "Register for Campaign" CTA below the image. */
  registrationUrl?: string;
  /** Override the default "Register for Campaign" CTA label. */
  registrationLabel?: string;
  /** Optional CTA URL the entire card links to in addition to the zoom modal.
   *  Defaults to opening the zoom-image modal only. */
  href?: string;
}

/** Always-an-array view of brand.niche. Use this everywhere instead of
 *  branching on `Array.isArray(brand.niche)` at the call site. */
export function niches(brand: Brand): Niche[] {
  return Array.isArray(brand.niche) ? brand.niche : [brand.niche];
}

export type FilterCategory =
  | 'All Brands'
  | 'MAX Commissions'
  | 'Rewards Campaigns'
  | 'Samples Included'
  | 'Items Sold'
  | 'Health'
  | 'Beauty'
  | 'Skincare'
  | 'Pet'
  | 'Trending'
  | 'Higher Commission';
