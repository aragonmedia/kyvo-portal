# Clean Nutra — Product Images

Drop product thumbnails here. Each image **must be named exactly per the
slug** below, with a `.png` (preferred) or `.jpg` extension.

## File spec
- **PNG** (true PNG, not renamed JPEG) with white or transparent background
- **400×400px to 600×600px** square (or near-square)
- Under 500 KB each — run through https://tinypng.com if larger

## Product slugs (7 products, sorted by lifetime items sold)

| # | Items Sold | Open Rate | Filename | Product |
|---|---:|---:|---|---|
| 1 | 107,293 | 25% | `cinnamon-berberine.png` | Cinnamon Berberine Drops |
| 2 | 73,092 | 25% | `maca-ashwagandha.png` | Maca Root + Ashwagandha Drops |
| 3 | 34,030 | 25% | `creatine-for-women.png` | Creatine for Women |
| 4 | 8,572 | 25% | `thyroid-support.png` | Thyroid Support Drops |
| 5 | 3,655 | **15%** | `moringa-drops.png` | PlantFlow Moringa Drops |
| 6 | 3,166 | **15%** | `nad-drops.png` | Celluvive NAD+ Drops |
| 7 | 2,706 | **15%** | `oil-of-oregano.png` | Botaniguard Oil of Oregano |

## Brand logo

Drop the Clean Nutra logo here:
`/public/logos/clean-nutra.png` (256×256 PNG, transparent background preferred)

## ⚠️ Renewable — campaign expires 2026-06-26

Same expiration date as Nusava. The brand card will show an amber
`Until Jun 26` pill so renewals are visible at a glance.

## Note on tier + variance

Clean Nutra is **Health niche · not slideshow · not MAX tier · no samples**.
Appears in the **Boosted Brands** section.

**Per-product open collab rates:** the top 4 sellers operate at 25% open
(matches the brand default). The bottom 3 (Moringa, NAD+, Oil of Oregano)
operate at 15% open — these have explicit `openCollabRate: 15` overrides
in `data/brands.ts` so creators see the accurate +13% boost lift instead
of a misleading +3%.
