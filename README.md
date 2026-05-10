# Kyvo — TAP Links Portal

Public-facing landing page for Kyvo's TikTok Shop creator commission links.
Built with **Next.js 15 (App Router)**, **React 18**, **TypeScript**, and **Tailwind CSS**.

> **Tagline:** Higher Commissions. One Tap Away.

---

## What's in here

```
kyvo-portal/
├── app/
│   ├── layout.tsx        ← Root layout, fonts, metadata
│   ├── page.tsx          ← Single landing page (composes all sections)
│   └── globals.css       ← Cosmic background, fonts, gradient utilities
├── components/
│   ├── Header.tsx        ← Logo + Discord CTA
│   ├── Hero.tsx          ← "Higher Commissions. One Tap Away." headline
│   ├── BannerSlideshow.tsx  ← Auto-rotating priority brand banner
│   ├── SearchBar.tsx     ← Real-time search across brands + products
│   ├── FilterPills.tsx   ← Niche category pills
│   ├── BrandGrid.tsx     ← Responsive brand card grid
│   ├── BrandCard.tsx     ← Individual brand tile
│   ├── BrandModal.tsx    ← Brand → product links drawer/modal
│   ├── LockedTier.tsx    ← Gamified "MAX commissions" Discord CTA
│   ├── Footer.tsx
│   └── KyvoLogo.tsx      ← Inline SVG logo (swap for /public/logo.png if preferred)
├── data/
│   └── brands.ts         ← ★ EDIT THIS to add brands and product links
├── lib/
│   └── types.ts          ← Brand / ProductLink / FilterCategory types
├── public/
│   └── favicon.svg
├── tailwind.config.ts
├── next.config.js
├── package.json
└── tsconfig.json
```

---

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Hot reload is enabled — edit `data/brands.ts` and the grid updates instantly.

---

## Editing brand data

All brand and link data lives in **`data/brands.ts`**. Each brand follows the
`Brand` type in `lib/types.ts`:

```ts
{
  id: 'natural-stacks',
  name: 'Natural Stacks',
  niche: 'Health',
  commissionRate: 50,
  priority: true,         // shows in the top slideshow
  priorityOrder: 1,       // slideshow order
  trending: true,
  highCommission: true,
  tagline: '50% commission on premium nootropics & wellness',
  bannerGradient: 'linear-gradient(135deg, #1a0b3e 0%, ...)',
  logoTile: { bg: '#1A1838', fg: '#22F5A3', initials: 'NS' }, // OR use logo: '/logos/natural-stacks.png'
  links: [
    { productName: 'MagTech Magnesium', url: 'https://...', commission: 50 },
    // ...
  ],
}
```

### Replacing placeholder logos with real ones

1. Drop your logo (PNG/SVG, ~256×256, transparent background) in `public/logos/`
2. In `data/brands.ts`, replace `logoTile: {...}` with `logo: '/logos/your-file.png'`

---

## Pushing to GitHub

```bash
cd kyvo-portal
git init
git add .
git commit -m "Initial Kyvo portal scaffold"
gh repo create kyvo-portal --public --source=. --remote=origin --push
# OR manually:
# git remote add origin https://github.com/YOUR-USER/kyvo-portal.git
# git branch -M main
# git push -u origin main
```

---

## Deploying to Vercel

### Option A — Vercel dashboard (easiest)

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Pick your `kyvo-portal` repo
4. Framework preset auto-detects as **Next.js** — leave defaults
5. Click **Deploy**
6. You'll get a `kyvo-portal.vercel.app` URL within ~60 seconds

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel              # follow prompts, links to your account
vercel --prod       # promote latest preview to production
```

---

## Connecting `kyvoco.com`

After the Vercel deploy is live:

1. **In Vercel:** Project → **Settings → Domains** → add `kyvoco.com`
   and `www.kyvoco.com`. Vercel will show DNS records to add.
2. **In Google Domains** (admin.google.com → Domains → DNS):
   - Add an **A record** for `@` pointing to `76.76.21.21` (Vercel's IP)
   - Add a **CNAME** for `www` pointing to `cname.vercel-dns.com`
   - Remove any conflicting old records
3. Wait ~5–60 minutes for propagation. Vercel auto-issues an SSL cert.

---

## Iterating after deploy

Vercel auto-rebuilds on every push to `main`. To make live changes:

```bash
# edit files locally
git add . && git commit -m "Update brands"
git push
# Vercel deploys in ~30s — check the dashboard
```

For instant preview deploys on feature branches, push to any non-main branch
and Vercel will give you a unique preview URL.

---

## Customization knobs

- **Brand colors** → `tailwind.config.ts` → `colors.kyvo.*`
- **Background gradient** → `app/globals.css` → `body::before`
- **Headline text** → `components/Hero.tsx`
- **Discord URL** → `components/Header.tsx`, `components/LockedTier.tsx`,
  `components/Footer.tsx` (constant `DISCORD_URL` / `DISCORD_TICKET_URL`)
- **Filter categories** → `components/FilterPills.tsx` (`PILLS` array)
  and `app/page.tsx` (filter logic)

---

## Tech notes

- **No backend.** All brand data is statically imported from `data/brands.ts`,
  so the site is fully static + cacheable. Vercel will serve it from edge.
- **No analytics or tracking** baked in — add Vercel Analytics or Plausible
  when ready.
- **Mobile-first** layout. Tested down to ~360px viewport.
- **Performance:** Brand cards use simple SVG/CSS for the placeholder tiles,
  so initial JS bundle is small. When you add real logo images, prefer SVG
  or compressed PNG (<30KB each).

---

## Roadmap (post-launch ideas)

- Per-brand pages (`/brands/[id]`) for SEO and shareable URLs
- Notion / Airtable / Sanity CMS for non-developer brand editing
- Click tracking → Vercel Analytics or PostHog
- Product-level featured cards in the grid
- Creator login + personalized link dashboards

Built for Kevin · Kyvo TikTok Shop affiliate community.
