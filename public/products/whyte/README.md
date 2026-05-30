# Whyte — Product Images

**Brand:** Whyte · Health **+** Beauty (cross-category) · slideshow NO ·
NOT MAX tier · **20% flat for ALL creators (no Discord unlock)** ·
samples YES via QR-code registration · NEW badge active ·
**First brand in the Reward Campaigns section.**

**Rates:** 15% open · 20% Kyvo Boost (no MAX lock — everyone gets top rate)

**Sample registration URL** (QR code points here):
`https://docs.google.com/forms/d/e/1FAIpQLScfSU27q_s0CIA3_qJVH9OX-yrcyW4_azhc68aWKvXlcSLzrQ/viewform?pli=1`

---

## Brand logo

Place the Whyte logo at:

    /public/logos/whyte.png

After upload, uncomment the `logo:` line in `data/brands.ts` for this brand.

---

## Reward campaign image

Drop the campaign image at:

    /public/rewards/whyte.png

This is the highlighted card on the homepage Rewards section. The image IS
the headline — make sure the offer ("Generate $X GMV earn $X") is legible.

---

## Product images — 6 SKUs, sorted by items sold (desc)

| Rank | Items Sold | Slug                            | File                                | Product |
| ---: | ---------: | :------------------------------ | :---------------------------------- | :------ |
|   1  |   15,676   | `oil-pulling-spearmint`         | `oil-pulling-spearmint.png`         | Organic Oil Pulling Rinse (Spearmint, 8oz) |
|   2  |   13,716   | `purple-brightening-powder`     | `purple-brightening-powder.png`     | Purple Teeth Brightening Powder (15g, Mint) |
|   3  |    3,124   | `oil-pulling-clove-bubblegum`   | `oil-pulling-clove-bubblegum.png`   | Clove Oil Pulling Rinse (Bubblegum, 8oz) |
|   4  |    1,764   | `oil-pulling-cinnamon`          | `oil-pulling-cinnamon.png`          | Cinnamon Coconut Oil Pulling Rinse (8oz) |
|   5  |      172   | `rinse-powder-bundle`           | `rinse-powder-bundle.png`           | Oil Pulling Rinse + Whitening Powder Bundle |
|   6  |       88   | `three-flavor-bundle`           | `three-flavor-bundle.png`           | 3-Flavor Coconut Mouthwash Bundle (8oz × 3) |

Total brand units sold: **34,540**

Place images at `/public/products/whyte/<slug>.png`. Use `.png` format,
ideally 600×600px or smaller. JPEG sources are fine — I will re-encode them
on the next pass if they end up mis-labeled.
