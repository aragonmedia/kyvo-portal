# Beauty of Joseon — Product Images

**Brand:** Beauty of Joseon · Beauty niche · slideshow NO · NOT MAX tier ·
no samples · NEW badge active.

K-beauty skincare specialist — ginseng + retinal eye care, rice-based
brightening, and the viral daily tinted SPF.

**Rates:** Mixed per product (always shown accurately in the modal):

| Tier | Brand default | Exceptions |
| --- | --- | --- |
| Open Collab | 15% | 10% on Tinted Sunscreen + Eye Patches |
| Kyvo Boost | 25% | 20% on Eye Serum + Combination Routine |
| MAX tier | 30% | 25% on Eye Serum + Combination Routine |

The per-product overrides are in `data/brands.ts` so creators always see the
real rate they'll earn on each link.

---

## Brand logo

Place the Beauty of Joseon logo at:

    /public/logos/beauty-of-joseon.png

After upload, uncomment the `logo:` line in `data/brands.ts` for this brand.

---

## Product images — 6 SKUs, sorted by items sold (desc)

| Rank | Items Sold | Slug                          | File                              | Product |
| ---: | ---------: | :---------------------------- | :-------------------------------- | :------ |
|   1  |  342,727   | `daily-tinted-sunscreen`      | `daily-tinted-sunscreen.png`      | Daily Tinted Fluid Sunscreen (50ml SPF) |
|   2  |   38,725   | `revive-eye-serum`            | `revive-eye-serum.png`            | Revive Eye Serum — Ginseng + Retinal (30ml) |
|   3  |   24,105   | `combination-skin-routine`    | `combination-skin-routine.png`    | Combination Skin Routine — Balance, Refine, Glow |
|   4  |    8,786   | `revive-under-eye-patches`    | `revive-under-eye-patches.png`    | Revive Under Eye Patches — Ginseng + Retinal (60pcs) |
|   5  |    7,508   | `ginseng-retinal-eye-set`     | `ginseng-retinal-eye-set.png`     | Ginseng Retinal Eye Care Set |
|   6  |    1,534   | `radiance-care-trio`          | `radiance-care-trio.png`          | Radiance Care Trio — Ginseng + Retinal + Rice |

Total brand units sold: **423,385**

Place images at `/public/products/beauty-of-joseon/<slug>.png`. Use `.png`
format, ideally 600×600px or smaller. JPEG sources are fine — I will re-encode
them on the next pass if they end up mis-labeled.
