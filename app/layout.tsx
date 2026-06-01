import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Manrope } from 'next/font/google';
import './globals.css';
import { tenant, isKyvoTenant } from '@/lib/tenant';

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '600', '700'],
});

const body = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

/**
 * Open Graph + Twitter card configuration drives how the URL renders when
 * pasted into Discord, iMessage, Twitter, Slack, WhatsApp, etc.
 *
 * Multi-tenant: every metadata field is sourced from `tenant` in lib/tenant.ts
 * so each Vercel build with a different NEXT_PUBLIC_TENANT env var ships
 * with its own title, description, OG image, canonical URL, and Twitter
 * handles. See data/tenants.ts for the per-tenant config.
 *
 * WhatsApp quirk: its preview crawler silently drops OG images larger than
 * ~300KB. Drop a JPEG ≤300KB at the tenant's ogImage path and the link
 * preview will fetch reliably on every platform.
 */
export const metadata: Metadata = {
  title: tenant.ogTitle,
  description: tenant.ogDescription,
  metadataBase: new URL(tenant.siteUrl),
  applicationName: tenant.brandName,
  keywords: [
    'TikTok Shop affiliate',
    'creator commission',
    'TAP links',
    'higher commissions',
    'TikTok creator program',
    tenant.brandName,
  ],
  authors: [{ name: tenant.brandName }],
  openGraph: {
    title: tenant.ogTitle,
    description: tenant.ogDescription,
    url: tenant.siteUrl,
    siteName: tenant.brandName,
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: tenant.ogImage,
        width: 1200,
        height: 630,
        alt: tenant.ogTitle,
        type: tenant.ogImage.endsWith('.png') ? 'image/png' : 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: tenant.ogTitle,
    description: tenant.ogDescription,
    images: [
      {
        url: tenant.ogImage,
        width: 1200,
        height: 630,
        alt: tenant.ogTitle,
      },
    ],
    // Only include Twitter handles when the tenant has them.
    ...(tenant.twitterCreator ? { creator: tenant.twitterCreator } : {}),
    ...(tenant.twitterSite ? { site: tenant.twitterSite } : {}),
  },
  // Favicon set — Kyvo ships the full /favicon.* set in /public/. Other
  // tenants reuse the same favicon files unless they ship their own at
  // /public/tenants/<id>/favicon.* — wire those overrides here when needed.
  icons: isKyvoTenant
    ? {
        icon: [
          { url: '/favicon.ico', sizes: 'any' },
          { url: '/favicon.svg', type: 'image/svg+xml' },
          { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
        ],
        apple: [
          { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
        shortcut: ['/favicon.ico'],
      }
    : {
        // Tenant fallback: use the logo as the favicon until a proper set is
        // provided. Browsers handle the scaling.
        icon: [{ url: tenant.logoSrc }],
      },
  // Web manifest enables PWA "Add to Home Screen" with proper branding.
  // Kyvo ships /site.webmanifest; other tenants fall back to no manifest.
  ...(isKyvoTenant ? { manifest: '/site.webmanifest' } : {}),
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#05030F',
  width: 'device-width',
  initialScale: 1,
};

/** Build a `<style>` string that overrides the default CSS variables in
 *  globals.css when the active tenant ships a custom palette. Inlined in
 *  the document head so the override applies before first paint — no FOUC. */
function tenantPaletteCSS(): string | null {
  const p = tenant.palette;
  if (!p) return null;
  const lines: string[] = [];
  if (p.void)      lines.push(`--kyvo-void: ${p.void};`);
  if (p.deep)      lines.push(`--kyvo-deep: ${p.deep};`);
  if (p.surface)   lines.push(`--kyvo-surface: ${p.surface};`);
  if (p.elevated)  lines.push(`--kyvo-elevated: ${p.elevated};`);
  if (p.border)    lines.push(`--kyvo-border: ${p.border};`);
  if (p.violet)    lines.push(`--kyvo-violet: ${p.violet.hex}; --kyvo-violet-rgb: ${p.violet.rgb};`);
  if (p.purple)    lines.push(`--kyvo-purple: ${p.purple.hex}; --kyvo-purple-rgb: ${p.purple.rgb};`);
  if (p.magenta)   lines.push(`--kyvo-magenta: ${p.magenta.hex}; --kyvo-magenta-rgb: ${p.magenta.rgb};`);
  if (p.pink)      lines.push(`--kyvo-pink: ${p.pink.hex}; --kyvo-pink-rgb: ${p.pink.rgb};`);
  if (p.cyan)      lines.push(`--kyvo-cyan: ${p.cyan.hex}; --kyvo-cyan-rgb: ${p.cyan.rgb};`);
  if (p.blue)      lines.push(`--kyvo-blue: ${p.blue.hex}; --kyvo-blue-rgb: ${p.blue.rgb};`);
  if (p.green)     lines.push(`--kyvo-green: ${p.green};`);
  if (p.greenDeep) lines.push(`--kyvo-green-deep: ${p.greenDeep};`);
  return `:root{${lines.join('')}}`;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const paletteCSS = tenantPaletteCSS();
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        {paletteCSS && (
          <style
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: paletteCSS }}
          />
        )}
      </head>
      <body className="font-body">{children}</body>
    </html>
  );
}
