# Jaje Health — Product Images

**Brand:** Jaje Health · Health niche · slideshow YES (priorityOrder 5) ·
**MAX tier** (50% unlock) · samples on ALL · **NEW Shop** (no sales history
yet — top-tier MAX commissions to attract early creators).

**Rates:** 20% open · 35% Kyvo Boost · 50% MAX (locked, via Discord).

---

## Brand logo

Place the Jaje Health logo at:

    /public/logos/jaje-health.png

After upload, uncomment the `logo:` line in `data/brands.ts` for this brand.

---

## Banner photo (slideshow cover)

Place the banner photo at:

    /public/banners/jaje-health.jpg

Wide format (2000×600 recommended). The portal applies a dark gradient overlay
for legibility, so submit clean product photography.

---

## Product images — 2 SKUs

| Items Sold | Slug                       | File                           | Product |
| ---------: | :------------------------- | :----------------------------- | :------ |
|   NEW Shop | `gut-support-berberine`    | `gut-support-berberine.png`    | Gut Support Gummies — Berberine ($34.95) |
|   NEW Shop | `superfood-greens`         | `superfood-greens.png`         | Superfood Greens Gummies ($34.95) |

Both products are launching as part of the Jaje Health TikTok Shop debut —
no sales history yet, so the items-sold count is intentionally blank. Once
the brand racks up sales, drop `itemsSold` values into `data/brands.ts` and
the products will sort by volume in the modal.

Place images at `/public/products/jaje-health/<slug>.png`. Use `.png` format,
ideally 600×600px or smaller. JPEG sources are fine — I will re-encode them
on the next pass if they end up mis-labeled.
