# Adding a New Brand — Fast Workflow

This is the minimum-effort process for getting a new brand onto the portal.
**Your time: ~5 min per brand.** I do everything else.

---

## What you send me (in one message)

### A. The product spreadsheet

A `.numbers`, `.xlsx`, or `.csv` export with these columns:

| Column | Required? | What it maps to in code |
|---|---|---|
| `product name` | ✅ | productName |
| `Product ID` | ✅ | used to dedupe |
| `Sale price` | ✅ | price |
| `items sold` | ✅ | itemsSold (drives sort order — top sellers first) |
| `Shop name` | ✅ | brand name |
| `Creator commission rate` | ✅ | commissionRate (Kyvo Boost — what they get when they tap) |
| `open collab` | ✅ | openCollabRate (TikTok Shop baseline) |
| `max rate` | ✅ | maxCommission (the highest rate available — varies per brand) |
| `Product link` | ✅ | url (the affiliate URL) |

**Tip:** the `open collab` and `max rate` columns can be added by hand to the
TikTok export. They tell me the exact 3-tier model without me having to ask.

### B. A short metadata block in chat (copy this template, fill in)

```
BRAND NAME:        e.g. Toplux Nutrition
NICHE:             Health / Beauty / Skincare / Pet / Fitness / Wellness / Lifestyle
PRIORITY (slideshow):     yes / no
MAX TIER (50% locked):    yes / no
SAMPLES INCLUDED:         yes / no
ADD ALL TO SHOWCASE URL:  https://affiliate-us.tiktok.com/api/v1/share/...
TICKET URL (optional):    Discord channel deep-link if you have one
TAGLINE (optional):       short marketing line, I'll write one if blank
```

### C. The image files (in matching folders)

After I generate the slug list, you drop the image files in:

```
public/
├── logos/<brand-id>.png             ← brand logo (256×256, transparent)
├── banners/<brand-id>.jpg           ← slideshow cover (2000×600) — ONLY if priority=yes
└── products/<brand-id>/
    ├── <product-slug-1>.png
    ├── <product-slug-2>.png         ← (400×400 product thumbnails, one per row in spreadsheet)
    └── ...
```

If you don't have all images yet — that's fine, send what you have. Missing
files fall back to colored placeholder tiles. Add images incrementally.

---

## What I do (after you send the above)

1. Parse your spreadsheet, sort products by `items sold` descending
2. Generate clean URL-safe slugs for every product
3. Set the 3-tier commission model from the data:
   - `openCollabRate` = Affiliate partner commission rate
   - `commissionRate` = Creator commission rate (what they get when they tap)
   - `maxCommission` = 50% (locked, MAX tier)
4. Add the brand entry to `data/brands.ts`
5. Generate a `public/products/<brand-id>/README.md` with the exact image
   filenames you need to upload
6. Run typecheck + verify clean build
7. Hand you a list of files to push to GitHub

**Round trip time:** under 10 minutes of my time per brand.

---

## What you push to GitHub

Just two folders, dragged onto github.com → Add file → Upload files:

- 📁 `data` (the updated `brands.ts`)
- 📁 `public` (logos, banners, products — including any images you've uploaded)

Vercel auto-redeploys. Done.

---

## Example flow — adding a hypothetical "Bloom Skincare" brand

You send me one chat message:

> Brand: Bloom Skincare
> Niche: Skincare
> Priority: no
> MAX tier: no
> Samples: yes
> Add All URL: https://affiliate-us.tiktok.com/api/v1/share/AJQYABC123
> [attaches bloom-skincare-products.xlsx]

I respond:

> Parsed. 12 products, top seller is "Glow Serum (1.2K sold)". Wired into
> data/brands.ts with niche=Skincare, samplesIncluded=true, showcase URL set.
> Slugs generated — see `public/products/bloom-skincare/README.md` for the
> 12 exact filenames you need. Drop the brand logo at
> `public/logos/bloom-skincare.png` whenever you have it. Push when ready.

You drag the logo + product images into the right folders, push to GitHub,
go live.

---

## What slows things down (avoid these)

- ❌ Sending images without the spreadsheet first (I can't generate slug
  names until I see the products)
- ❌ Spreadsheet missing the `items sold` column (breaks the sort order)
- ❌ Image files named with spaces, special characters, or uppercase
  (must match generated slugs exactly — they'll be lowercase + hyphens)
- ❌ Product images that aren't square (they'll display awkwardly cropped)
- ❌ Brand logo > 500 KB (slows page load — run through tinypng.com first)

## What's optional (won't block you)

- Open collab rate — I'll use the spreadsheet value if present; otherwise estimate 15%
- Tagline — I'll write one from the brand name/niche if you skip it
- Banner photo — only needed if `priority: yes`. Non-priority brands don't appear in the slideshow.
- Per-brand `ticketUrl` — falls back to the global discord.gg/kyvo

---

## Bulk brand drop (5+ at once)

If you're onboarding many brands at once, send:

1. **One** spreadsheet with multiple tabs (one tab per brand), like your
   previous "KYVO X Links" file
2. **One** chat message with all metadata blocks stacked (same template above,
   one block per brand)
3. Images folder dropped into `public/logos/`, `public/banners/`,
   `public/products/<brand-id>/` — drop them all in one batch

I'll process the whole batch in one pass.
