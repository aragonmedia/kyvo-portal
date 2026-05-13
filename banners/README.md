# Slideshow Banner Cover Photos

Wide horizontal cover images shown as the background of each slide in the
top auto-rotating slideshow. One image per priority brand.

## File spec

| Property | Recommended |
|---|---|
| Format | **JPG** (smaller file size for photos) or PNG |
| Dimensions | **2000 × 600px** (or any 10:3 aspect ratio ≥ 1600×480) |
| File size | Under 300 KB. Run through https://tinypng.com if larger. |
| Color profile | sRGB |

## Safe-text zone

The portal renders text and the "Tap to unlock" button on the **LEFT side**
of the slide, and the commission stamp on the **RIGHT side**. So the
**center-bottom** of your banner is the safest zone for showing the actual
product/brand visual without it getting covered.

```
┌──────────────────────────────────────────────────┐
│ TEXT ZONE              [ commission stamp ]      │
│ (brand name,                                     │
│  tagline,            HERO IMAGE ZONE             │
│  CTA button)         (product / scene / vibe)    │
│                                                  │
└──────────────────────────────────────────────────┘
```

The portal automatically applies a left-to-right dark gradient overlay so
the left-side text stays legible even on a bright photo. You don't need to
darken the image yourself.

## Naming convention

`/public/banners/<brand-id>.jpg` (or `.png`)

Examples (matches IDs in `data/brands.ts`):
- `natural-stacks.jpg`
- `bold-buns.jpg`
- `fuel-nutrition.jpg`
- `toplux-nutrition.jpg`

## Wiring it into a brand

After uploading the file, edit the brand entry in `data/brands.ts` and add:

```ts
bannerImage: '/banners/natural-stacks.jpg',
```

You can keep `bannerGradient` alongside `bannerImage` — the gradient becomes
a fallback if the image fails to load, or use it as an overlay color.

## Don't have a banner yet?

Leave `bannerImage` unset and the slideshow uses the brand's
`bannerGradient` (currently set on all priority brands). You can swap in
photo banners later, brand by brand.

## Quick-start brand banner gradients (already in `data/brands.ts`)

These match each brand's accent palette and will be used until banner images
are uploaded:

| Brand | Gradient |
|---|---|
| Natural Stacks | navy → violet → green |
| Bold Buns | dark purple → magenta → pink |
| Fuel Nutrition | navy → cyan → green |
| Toplux Nutrition | navy → purple → magenta |
