# Multi-Tenant Deploy Guide

This codebase ships ONE portal that can render as multiple branded sites
(Kyvo, StreamlineTTS, future partners). Every Vercel deployment selects its
tenant via a single environment variable: `NEXT_PUBLIC_TENANT`.

Same GitHub repo. Same brand catalog. Different chrome.

---

## Architecture in 60 seconds

```
┌──────────────────────┐
│ aragonmedia/         │
│   kyvo-portal (repo) │ ◄────── single source of truth
└──────────┬───────────┘
           │
   ┌───────┴────────┐
   ▼                ▼
┌──────────┐   ┌─────────────┐
│ Vercel:  │   │ Vercel:     │
│  kyvo    │   │  streamline │
│          │   │             │
│ ENV:     │   │ ENV:        │
│  TENANT  │   │  TENANT     │
│  =kyvo   │   │  =streamline│
└────┬─────┘   └──────┬──────┘
     ▼                ▼
poweredby.       poweredby.
kyvoco.com       streamline.com
```

When you add a brand to `data/brands.ts` and push to `main`, **both
deployments rebuild automatically and pick up the new brand**. No manual
sync between repos.

---

## Adding a NEW partner (~10 min)

### 1. Add the tenant config

Edit `data/tenants.ts` and add an entry to `TENANTS`:

```ts
TENANTS = {
  kyvo: { /* ... */ },
  streamline: { /* ... */ },

  // NEW partner:
  newpartner: {
    id: 'newpartner',
    brandName: 'New Partner',
    brandTagline: 'TikTok Shop Affiliates',
    logoSrc: '/tenants/newpartner/logo.png',
    logoWidth: 180,
    boostLabel: 'Boost',
    discordUrl: null,        // or 'https://discord.gg/newpartner'
    ticketUrl: null,         // or specific Discord deep-link
    ogTitle: 'New Partner — TikTok Shop Affiliates',
    ogDescription: 'Browse partnered brands and tap product links to earn ...',
    ogImage: '/tenants/newpartner/og-image.jpg',
    siteUrl: 'https://poweredby.newpartner.com',
    heroPill: 'Boosted commissions live now',
    heroHeadlineTop: 'Higher Commissions.',
    heroHeadlineBottom: 'One Tap Away.',
    heroSubcopy: 'Browse partnered brands. Tap product links. ...',
  },
};
```

### 2. Drop in the assets

- `/public/tenants/newpartner/logo.png` — wordmark (used in header + footer + favicon fallback)
- `/public/tenants/newpartner/og-image.jpg` — 1200×630, under 300KB (WhatsApp-friendly)

### 3. Commit + push

The Kyvo + existing partner deployments will rebuild but render identically
(the new tenant entry only activates when something sets that env var).

### 4. Create the Vercel project

1. Log in to Vercel → **Add New Project**
2. Import from GitHub → select `aragonmedia/kyvo-portal`
3. Framework preset: **Next.js** (auto-detected)
4. **Environment Variables** → Add:
   - Name: `NEXT_PUBLIC_TENANT`
   - Value: `newpartner` (matching the key you used in `TENANTS`)
   - Apply to: **Production, Preview, Development**
5. Click **Deploy**

You'll get a temp URL like `kyvo-portal-newpartner.vercel.app`. The partner
branding will be live on it.

### 5. Connect the custom domain

Inside the new Vercel project:

1. **Settings → Domains** → Add `poweredby.newpartner.com`
2. Vercel shows the DNS record needed (typically a CNAME pointing to
   `cname.vercel-dns.com`)

At the partner's domain registrar (Namecheap, Squarespace Domains, Cloudflare, etc):

1. Add a **CNAME record**:
   - Host/Name: `poweredby`
   - Value: `cname.vercel-dns.com`
   - TTL: leave default
2. Save → wait 1–10 min for propagation
3. Back in Vercel, the domain status flips to **Valid Configuration**

Vercel auto-provisions an SSL certificate. The partner site is now live.

---

## Streamline-specific notes

The Streamline tenant is already wired up:
- Config: `data/tenants.ts` → `TENANTS.streamline`
- Assets: `/public/tenants/streamline/logo.png` + `og-image.jpg`
- `discordUrl: null` + `ticketUrl: null` — all Discord buttons render
  visually but tapping does nothing (per Kevin's call). Backfill these
  URLs in the tenant config when Streamline provides their channel.

To deploy:
1. New Vercel project from this repo, env var `NEXT_PUBLIC_TENANT=streamline`
2. Custom domain: `poweredby.streamline.com`
3. CNAME `poweredby` → `cname.vercel-dns.com` at the streamline.com registrar

---

## Local preview

To run a specific tenant locally:

```bash
NEXT_PUBLIC_TENANT=streamline npm run dev
```

Switch back to Kyvo:

```bash
NEXT_PUBLIC_TENANT=kyvo npm run dev
# or just:
npm run dev    # defaults to kyvo when env var is unset
```

To build/preview the production bundle:

```bash
NEXT_PUBLIC_TENANT=streamline npm run build
NEXT_PUBLIC_TENANT=streamline npm start
```

---

## Brand catalog is shared

`data/brands.ts` is the single source of truth for all tenants. When you
add a brand (or update an existing one's links/rates/logo), every deployed
tenant picks it up on the next push to `main`.

This is the point of multi-tenant: zero duplicated brand maintenance.

---

## Per-tenant overrides that DO get scoped

Things that ARE tenant-specific (configured in `data/tenants.ts`):
- Brand name + tagline
- Logo (header + footer + favicon fallback)
- Boost label ("Kyvo Boost" vs plain "Boost")
- Discord URL (header + footer button)
- MAX ticket URL (locked tier "Click to Unlock" + slideshow "Click to Unlock")
- OG image + title + description + canonical URL
- Twitter @handles
- Hero copy (pill + headline + subcopy)

Things that are SHARED across all tenants:
- Brand catalog + product links (`data/brands.ts`)
- Reward campaigns (`data/brands.ts → rewardCampaigns`)
- Filter pills (MAX Commissions, Rewards Campaigns, Samples Included, etc.)
- Item-sold sort behavior
- All UI components (layout, animations, mobile-first patterns)

If a partner needs a different filter pill or a custom UI element, that
becomes a new optional Tenant field — backwards-compatible with every
existing tenant.
