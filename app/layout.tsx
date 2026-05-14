import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Manrope } from 'next/font/google';
import './globals.css';

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

// Primary canonical URL — this is what social platforms display when the
// portal is shared. Subdomain of kyvoco.com → 'poweredby.kyvoco.com'
// (Powered by Kyvo branding, kept short for verbal sharing in TikToks).
const SITE_URL = 'https://poweredby.kyvoco.com';
const TITLE = 'Kyvo — Higher Commissions. One Tap Away.';
const DESCRIPTION =
  'Browse partnered brands and tap product links to earn boosted TikTok Shop commissions instantly. Built for creators by Kyvo.';

/**
 * Open Graph + Twitter card configuration drives how the URL renders when
 * pasted into Discord, iMessage, Twitter, Slack, WhatsApp, etc.
 *
 * Upload spec for the social preview image:
 *   File path:  /public/og-image.png  (or .jpg)
 *   Dimensions: 1200 × 630 px  (Facebook/Twitter standard)
 *   File size:  Under 1 MB
 *   Format:     PNG or JPG, sRGB color space
 *
 * If /public/og-image.png is missing, link previews still render with the
 * title + description but no image. Drop the file in and the next deploy
 * picks it up automatically.
 */
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  applicationName: 'Kyvo',
  keywords: [
    'TikTok Shop affiliate',
    'creator commission',
    'Kyvo',
    'TAP links',
    'higher commissions',
    'TikTok creator program',
  ],
  authors: [{ name: 'Kyvo' }],
  openGraph: {
    title: TITLE,
    description: 'Boosted TikTok Shop commissions across partnered brands. One tap away.',
    url: SITE_URL,
    siteName: 'Kyvo',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        // Standard 1200×630 — re-export your og-image.png at these exact
        // dimensions for best results across Discord, iMessage, Twitter, etc.
        width: 1200,
        height: 630,
        alt: 'Kyvo — Higher Commissions. One Tap Away.',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: 'Boosted TikTok Shop commissions across partnered brands. One tap away.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kyvo — Higher Commissions. One Tap Away.',
      },
    ],
    creator: '@kyvoco',
    site: '@kyvoco',
  },
  // Favicon set — references the exact filenames in /public/.
  // Order matters: browsers prefer .ico first, then .svg for scalable, then PNG fallback.
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },                                       // legacy browsers
      { url: '/favicon.svg', type: 'image/svg+xml' },                              // modern browsers (scalable)
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },            // PNG fallback
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },       // iOS home screen
    ],
    shortcut: ['/favicon.ico'],
  },
  // Web manifest enables PWA "Add to Home Screen" with proper branding
  manifest: '/site.webmanifest',
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#05030F',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
