# Product Images

Drop product thumbnails here, organized by brand subfolder.

## File spec

| Property | Recommended |
|---|---|
| Format | **PNG** or JPG |
| Dimensions | 400×400px square (or any square ≥ 300×300) |
| File size | Under 150 KB per image. Run through https://tinypng.com. |
| Background | White or transparent — modal renders them on a white tile |

## Naming convention

`/public/products/<brand-id>/<product-slug>.png`

Where `<product-slug>` is a lowercase hyphenated version of the product name.

Examples:
```
/public/products/natural-stacks/magtech-magnesium.png
/public/products/natural-stacks/dopamine-brain-food.png
/public/products/natural-stacks/smart-caffeine.png
/public/products/natural-stacks/ciltep.png
/public/products/bold-buns/cinnamon-buns.png
```

## Wiring it into a product link

In `data/brands.ts`, add an `image` property to the product link:

```ts
links: [
  {
    productName: 'MagTech Magnesium',
    url: 'https://...',
    image: '/products/natural-stacks/magtech-magnesium.png',
  },
],
```

## Don't have a product image yet?

That's fine — leave `image` unset and the product card will fall back to the
brand's logo tile. Add the real image whenever you have it; the data structure
already supports it.
