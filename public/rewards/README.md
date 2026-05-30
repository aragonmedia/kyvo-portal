# Reward Campaign Images

This folder holds the headline images for active reward campaigns shown in the
homepage Reward Campaigns section (between the slideshow and the search bar).

The image **is** the campaign card — keep it self-explanatory so creators
understand the offer at a glance without needing extra copy.

## File convention

    /public/rewards/<brand-id>.png    (or .jpg)

The `<brand-id>` must match the `id` field of the brand in `data/brands.ts`.
For multi-campaign brands, suffix with a slug:

    /public/rewards/whyte.png
    /public/rewards/whyte-summer-bonus.png

Then add a matching entry in `data/brands.ts → rewardCampaigns` array, e.g.

    {
      brandId: 'whyte',
      image: '/rewards/whyte.png',
    }

## Image specs

- **Dimensions:** ~800×640 to 1200×960 (roughly 5:4 aspect — that's the card ratio)
- **Format:** PNG with transparency OR JPEG
- **File size:** Under 300KB ideal for fast load
- **Content:** Should include the brand name + the offer (e.g. "Generate $1K
  GMV earn $50") in legible text. The card displays at ~280–380px wide on
  the homepage, then opens a zoom modal for full detail.

## Adding a campaign

1. Drop the image file here as `/public/rewards/<brand-id>.png`
2. Add an entry to `rewardCampaigns` in `data/brands.ts`:
   ```ts
   { brandId: 'whyte', image: '/rewards/whyte.png' }
   ```
3. Optional: include `title`, `description`, or `href` fields if you want
   extra copy or a clickthrough link on the card.

The order of entries in the `rewardCampaigns` array controls left-to-right
display order in the horizontal scroll row.
