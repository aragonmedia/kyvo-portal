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

export const metadata: Metadata = {
  title: 'Kyvo — Higher Commissions. One Tap Away.',
  description:
    'Browse partnered brands and tap product links to earn boosted TikTok Shop commissions instantly. Built for creators by Kyvo.',
  metadataBase: new URL('https://kyvoco.com'),
  openGraph: {
    title: 'Kyvo — Higher Commissions. One Tap Away.',
    description:
      'Boosted TikTok Shop commissions across partnered brands. One tap away.',
    url: 'https://kyvoco.com',
    siteName: 'Kyvo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kyvo — Higher Commissions. One Tap Away.',
    description:
      'Boosted TikTok Shop commissions across partnered brands. One tap away.',
  },
  icons: { icon: '/favicon.svg' },
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
