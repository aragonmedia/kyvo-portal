# Favicon + Link Preview (Open Graph) Assets

Drop these files into `/public/` (this folder). The portal references them
by exact name — match the filenames precisely.

## 1. Favicon — browser tab icon

You already have `favicon.svg` (the gradient leaf icon I generated). If you
want to replace it with the real Kyvo logo, drop these files:

| Filename | Dimensions | Format | Purpose |
|---|---:|---|---|
| `favicon.svg` | scalable | SVG | Modern browsers (recommended) |
| `favicon.png` | 32×32 | PNG | Older browsers / Windows |
| `apple-touch-icon.png` | 180×180 | PNG | iOS home-screen icon |
| `icon-512.png` | 512×512 | PNG | Android home-screen + PWA install |

**Quick-start:** if you only have one logo file, generate these four sizes at
once using https://realfavicongenerator.net/ — paste your Kyvo logo (1024×1024
or higher), download the package, drop the 4 files into this folder.

## 2. Open Graph image — link preview

This is what shows when someone shares `kyvoco.com` in **Discord**,
**iMessage**, **Twitter / X**, **Slack**, **WhatsApp**, **Facebook**,
**LinkedIn**, etc.

| Filename | Dimensions | Format | File size |
|---|---:|---|---:|
| `og-image.png` | **1200 × 630** | PNG (or JPG) | Under 1 MB |

### Design recommendations

- **Dark background** (matches the portal's `#05030F` cosmic black)
- **Kyvo logo + wordmark** prominently
- Headline text: *"Higher Commissions. One Tap Away."*
- Optional subtitle: *"Boosted TikTok Shop commissions across partnered brands"*
- **Safe zones:** keep critical text ≥ 60px from edges (some platforms crop)
- Aspect ratio is **fixed at 1200×630** — don't change

### After uploading

Push to GitHub. The next deploy generates correct meta tags automatically.

To **test the preview** before showing anyone:
- Discord: paste the URL in a private channel — preview renders within ~5 sec
- Twitter/X: https://cards-dev.twitter.com/validator
- Facebook: https://developers.facebook.com/tools/debug/
- LinkedIn: https://www.linkedin.com/post-inspector/

(Some platforms cache the OG image for ~24h. Use the Debug/Inspector tools
above to force a re-fetch if needed.)

## 3. PWA manifest (already set up)

`site.webmanifest` is wired. When a creator on iOS/Android does "Add to
Home Screen" from the portal, they get a proper standalone-app launcher
icon (using `icon-512.png`) with the dark cosmic theme color.

---

**Current state of this folder:**

| File | Status |
|---|---|
| `favicon.svg` | ✅ placeholder gradient leaf (working) |
| `favicon.png` | ❌ upload to replace fallback |
| `apple-touch-icon.png` | ❌ upload for iOS |
| `icon-512.png` | ❌ upload for Android PWA |
| `og-image.png` | ❌ upload for link previews |
| `kyvo-logo.png` | ✅ your full-res logo (used in header) |
| `site.webmanifest` | ✅ wired |

Until each `❌` file is uploaded, the corresponding feature falls back to
defaults — no errors, just no branding on that surface yet.
