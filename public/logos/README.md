# Brand Logos

Drop brand logo files here, one per brand. The filename must match the brand's
`id` field in `data/brands.ts` exactly (case-sensitive, lowercase, hyphens).

## File spec

| Property | Recommended |
|---|---|
| Format | **PNG** with transparent background (preferred) or SVG |
| Dimensions | 256×256px square (or any square ≥ 200×200) |
| File size | Under 200 KB. Run through https://tinypng.com if larger. |
| Background | Transparent — the portal renders logos on a white tile |

## Naming convention

`/public/logos/<brand-id>.png`

Examples (matches IDs from `data/brands.ts`):
- `natural-stacks.png`
- `bold-buns.png`
- `fuel-nutrition.png`
- `toplux-nutrition.png`

## Wiring it into a brand

After uploading the file, edit the brand entry in `data/brands.ts` and add:

```ts
logo: '/logos/natural-stacks.png',
```

(The leading `/` resolves to `/public/`. Don't include `/public/` in the path.)

You can keep the `logoTile` fallback alongside `logo` — `logoTile` is used only
when `logo` is undefined or fails to load.

## Don't have a logo yet?

That's fine — leave `logo` unset and the brand will render its colored
initials tile (`logoTile`) instead. You can swap in the real logo later.
