/**
 * MULTI-TENANT CONFIG
 *
 * This portal codebase powers MULTIPLE partner deployments off the same brand
 * catalog. Each Vercel deployment sets the `NEXT_PUBLIC_TENANT` environment
 * variable (e.g. "kyvo", "streamline") to select which tenant config is
 * active. The brands/links data stays shared — only the chrome (logo, name,
 * Discord links, color accents, copy) varies per tenant.
 *
 * To add a new partner:
 *   1. Add a `<tenant-id>` entry to TENANTS below
 *   2. Drop the partner logo + OG image in /public/tenants/<tenant-id>/
 *   3. Create a new Vercel project from this GitHub repo
 *   4. Set NEXT_PUBLIC_TENANT=<tenant-id> in Vercel env vars
 *   5. Connect the partner's subdomain
 *
 * See docs/TENANT_DEPLOY.md for full deploy walkthrough.
 */

/** Per-tenant color palette override. When provided, layout.tsx injects
 *  these as CSS variables that override the defaults in globals.css.
 *  Every field is optional — omitted keys fall through to the Kyvo defaults.
 *
 *  Each brand-color field needs BOTH a hex string AND its R,G,B triplet
 *  (e.g. hex '#3B68FE' + rgb '59, 104, 254') because rgba() shadows in
 *  the Tailwind config compose alpha onto the triplet. */
export interface TenantPalette {
  /* Backgrounds (rarely overridden — most partners share the dark cosmic vibe) */
  void?: string;
  deep?: string;
  surface?: string;
  elevated?: string;
  border?: string;

  /* Brand gradient stops */
  violet?: { hex: string; rgb: string };
  purple?: { hex: string; rgb: string };
  magenta?: { hex: string; rgb: string };
  pink?: { hex: string; rgb: string };
  cyan?: { hex: string; rgb: string };
  blue?: { hex: string; rgb: string };

  /* Accents — green is usually kept (universal "earnings" color) */
  green?: string;
  greenDeep?: string;
}

export interface Tenant {
  /** Stable URL-safe identifier matching NEXT_PUBLIC_TENANT */
  id: string;
  /** Display name shown in header + footer + page <title> */
  brandName: string;
  /** Short tagline appended after brandName in the page title */
  brandTagline?: string;

  /** Path to logo (under /public). Used in Header + Footer + favicon set. */
  logoSrc: string;
  /** Header logo width in pixels — keeps logos with different aspect ratios
   *  visually balanced on the same header. */
  logoWidth?: number;

  /** Term used for the boosted commission tier shown on product cards.
   *  Kyvo uses "Kyvo Boost"; whitelabel partners get just "Boost". */
  boostLabel: string;

  /** Discord invite URL shown on the top-right Header + Footer button.
   *  When null, the Discord button still renders (same visual treatment) but
   *  the href is empty — tapping does nothing. Set for tenants that have
   *  their own community link to provide. */
  discordUrl: string | null;
  /** Deep-link URL the locked-MAX "Click to Unlock" CTA points to.
   *  When null, the locked tier UI still renders but the button has no href.
   *  This preserves the marketing message ("MAX is available") while not
   *  routing creators to a partner-specific channel that doesn't exist yet. */
  ticketUrl: string | null;

  /** Open Graph + page metadata */
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  /** Canonical URL used as metadataBase + og:url */
  siteUrl: string;

  /** Twitter handles (with @). Optional — omitted entirely if undefined. */
  twitterCreator?: string;
  twitterSite?: string;

  /** Hero block copy (homepage). Keep brand-agnostic — sells the platform
   *  benefit not the platform itself. */
  heroPill?: string;
  heroHeadlineTop: string;
  heroHeadlineBottom: string;
  heroSubcopy: string;

  /** Per-tenant color palette. When omitted, falls back to the Kyvo
   *  defaults defined in app/globals.css. Set this when the partner has a
   *  brand color scheme (e.g. Streamline blue). */
  palette?: TenantPalette;
}

/* ────────────────────────────────────────────────────────────────────────
 * Tenant registry — one entry per partner deployment
 * ──────────────────────────────────────────────────────────────────────── */

export const TENANTS: Record<string, Tenant> = {
  /* ─── KYVO (the original) ─────────────────────────────────────────── */
  kyvo: {
    id: 'kyvo',
    brandName: 'Powered by Kyvo',
    brandTagline: 'Higher Commissions. One Tap Away.',
    logoSrc: '/logos/kyvo-logo.png',
    boostLabel: 'Kyvo Boost',
    discordUrl: 'https://discord.gg/kyvo',
    ticketUrl:
      'https://discord.com/channels/1407225718089191444/1432664324429709393/1504410437180194878',
    ogTitle: 'Kyvo — Higher Commissions. One Tap Away.',
    ogDescription:
      'Browse partnered brands and tap product links to earn boosted TikTok Shop commissions instantly. Built for creators by Kyvo.',
    ogImage: '/og-image.jpg',
    siteUrl: 'https://poweredby.kyvoco.com',
    twitterCreator: '@kyvoco',
    twitterSite: '@kyvoco',
    heroPill: 'Boosted commissions live now',
    heroHeadlineTop: 'Higher Commissions.',
    heroHeadlineBottom: 'One Tap Away.',
    heroSubcopy:
      'Browse partnered brands. Tap product links. Earn boosted TikTok Shop commissions instantly.',
  },

  /* ─── STREAMLINE TTS (first whitelabel partner) ───────────────────── */
  streamline: {
    id: 'streamline',
    brandName: 'Streamline',
    brandTagline: 'TikTok Shop Affiliates',
    logoSrc: '/tenants/streamline/logo.png',
    logoWidth: 168,
    // White-label term — partner doesn't want "Kyvo" branding in any tier
    boostLabel: 'Boost',
    // Streamline hasn't provided community URLs yet — buttons render as
    // visual-only (same UI, no href) per Kevin's call.
    discordUrl: null,
    ticketUrl: null,
    ogTitle: 'Streamline — TikTok Shop Affiliates',
    ogDescription:
      'Browse partnered brands and tap product links to earn boosted TikTok Shop commissions instantly.',
    ogImage: '/tenants/streamline/og-image.jpg',
    // Hosted as a subdomain of Kevin's existing kyvoco.com — zero domain
    // purchase needed. Swap to a partner-owned domain later by editing
    // this value + adding the new domain in Vercel + updating DNS.
    siteUrl: 'https://streamline.kyvoco.com',
    // No twitter handles for Streamline yet
    heroPill: 'Boosted commissions live now',
    heroHeadlineTop: 'Higher Commissions.',
    heroHeadlineBottom: 'One Tap Away.',
    heroSubcopy:
      'Browse partnered brands. Tap product links. Earn boosted TikTok Shop commissions instantly.',

    /* Streamline blue palette — derived from the logo color (#3B68FE).
     * Replaces Kyvo's violet/magenta/pink with a cohesive blue gradient.
     * Backgrounds stay dark, green accent stays green (universal earnings). */
    palette: {
      // Slightly cooler dark backgrounds to play nicer with blue brand colors
      void:     '#02050F',
      deep:     '#06091F',
      surface:  '#0C1230',
      elevated: '#131A3E',
      border:   '#1F2A55',

      // Brand gradient stops — blue spectrum
      violet:  { hex: '#3B5BFE', rgb: '59, 91, 254' },     // deep brand blue
      purple:  { hex: '#5276FE', rgb: '82, 118, 254' },    // mid blue
      magenta: { hex: '#3B68FE', rgb: '59, 104, 254' },    // primary Streamline blue (logo)
      pink:    { hex: '#6B8FFE', rgb: '107, 143, 254' },   // lighter blue
      cyan:    { hex: '#8AB2FF', rgb: '138, 178, 255' },   // soft sky blue
      blue:    { hex: '#3B68FE', rgb: '59, 104, 254' },    // same as primary
    },
  },
};

/** Default fallback tenant ID when NEXT_PUBLIC_TENANT is missing. */
export const DEFAULT_TENANT_ID = 'kyvo';
