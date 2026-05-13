# Nello Supercalm — Product Images

Drop product thumbnails here. Each image **must be named exactly per the
slug** below, with a `.png` (preferred) or `.jpg` extension.

## File spec
- **PNG** with transparent or white background
- **400×400px** square (or larger, square)
- Under 150 KB each — run through https://tinypng.com if larger

## Product slugs (5 products, sorted by lifetime items sold)

| # | Items Sold | Filename (drop here) | Product |
|---|---:|---|---|
| 1 | 852,032 | `calming-drink-mix.png` | Calming Drink Mix (20 Servings) |
| 2 | 50,663 | `tub-2pack.png` | Tub 2-Pack (30 Servings) |
| 3 | 45,752 | `calming-drink-mix-lemon.png` | Calming Drink Mix — Lemon Berry |
| 4 | 28,069 | `bundle-flavors-2pack.png` | Best Selling Flavors Bundle (2-Pack) |
| 5 | 8,005 | `variety-pack.png` | Variety Pack — Original Flavors |

## Brand logo (separate from product images)

Drop the Nello Supercalm logo here:
`/public/logos/nello-supercalm.png` (256×256 PNG, transparent background)

Then in `data/brands.ts`, uncomment the `logo:` line for Nello — or just
ping me and I'll uncomment it on the next round.

## How it works

The portal automatically looks for each image at
`/products/nello-supercalm/<slug>.png`. If an image is present, it shows;
if missing, the brand's colored initials tile shows instead.

## Note on Nello's commission tier

Nello is **not** in the priority slideshow and **not** in the MAX
Commissions filter (25% Kyvo Boost is below the 50% MAX threshold). It
appears in the **Boosted Brands** section of the grid alongside Toplux.
