'use client';

import { useEffect } from 'react';
import type { Brand, ProductLink } from '@/lib/types';
import { DEFAULT_TICKET_URL } from '@/data/brands';

interface Props {
  brand: Brand | null;
  onClose: () => void;
}

export function BrandModal({ brand, onClose }: Props) {
  useEffect(() => {
    if (!brand) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [brand, onClose]);

  if (!brand) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center
                 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${brand.name} affiliate links`}
    >
      <div className="absolute inset-0 bg-kyvo-void/80 backdrop-blur-md" />

      <div
        className="relative w-full sm:max-w-3xl
                   max-h-[92vh] sm:max-h-[88vh]
                   bg-kyvo-deep border border-kyvo-border
                   rounded-t-3xl sm:rounded-3xl
                   shadow-kyvo-glow
                   flex flex-col
                   animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile drag handle */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center">
          <div className="w-10 h-1 rounded-full bg-kyvo-border" />
        </div>

        {/* Brand header */}
        <div className="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-kyvo-border/50">
          <div className="flex items-center gap-4">
            <ModalTile brand={brand} />
            <div>
              <div className="font-display font-bold text-xl sm:text-2xl text-white">
                {brand.name}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-semibold text-kyvo-muted">{brand.niche}</span>
                <span className="text-kyvo-dim">·</span>
                <span className="text-xs font-semibold text-kyvo-green">
                  {brand.links.length} {brand.links.length === 1 ? 'product' : 'products'}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-full hover:bg-kyvo-elevated text-kyvo-muted hover:text-white
                       transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Product cards — sorted by items sold (descending) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* ADD ALL TO SHOWCASE — only when brand has multiple products */}
          {brand.links.length > 1 && <ShowcaseAllCTA brand={brand} />}

          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {[...brand.links]
              .sort((a, b) => (b.itemsSold ?? 0) - (a.itemsSold ?? 0))
              .map((link, i) => (
                <ProductCard key={link.slug ?? link.url ?? i} link={link} brand={brand} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * "ADD ALL TO SHOWCASE" CTA — sits above the product list when brand has >1
 * product.  Encourages creators to grab the whole brand lineup at once.
 * Wires to brand.showcaseUrl, falling back to ticketUrl, then DEFAULT_TICKET_URL.
 */
function ShowcaseAllCTA({ brand }: { brand: Brand }) {
  const href = brand.showcaseUrl ?? brand.ticketUrl ?? DEFAULT_TICKET_URL;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block mb-4 overflow-hidden rounded-2xl
                 bg-gradient-to-r from-kyvo-violet via-kyvo-purple to-kyvo-magenta
                 hover:from-kyvo-magenta hover:to-kyvo-pink
                 shadow-[0_4px_28px_rgba(123,63,228,0.35)]
                 hover:shadow-[0_4px_32px_rgba(233,75,193,0.5)]
                 transition-all duration-200"
    >
      {/* Subtle starfield overlay */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(1px 1px at 20% 30%, white, transparent), radial-gradient(1px 1px at 70% 60%, white, transparent), radial-gradient(1.5px 1.5px at 40% 80%, white, transparent)',
        }}
      />
      <div className="relative flex items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/15 backdrop-blur
                          border border-white/30 flex items-center justify-center shrink-0">
            <PlusIcon className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <div className="font-display font-bold text-sm sm:text-base text-white leading-tight">
              Add All to Showcase
            </div>
            <div className="text-[10px] sm:text-xs text-white/75 leading-tight">
              {brand.links.length} products · one tap to add the whole lineup
            </div>
          </div>
        </div>
        <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-kyvo-deep
                        flex items-center justify-center
                        group-hover:scale-110 transition-transform">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </a>
  );
}

function PlusIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
         className={className} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

/**
 * Product card with 3-tier commission display:
 *   Row 1: Open Collab — base TikTok Shop rate (greyed)
 *   Row 2: Kyvo Boost — highlighted, click → opens affiliate URL
 *   Row 3: 🔒 MAX Tier — locked, "Click to Unlock" → Discord
 */
function ProductCard({ link, brand }: { link: ProductLink; brand: Brand }) {
  // Per-product overrides take precedence over brand-level rates. This matters
  // when products in the same brand have different TikTok Shop rates — show what
  // the creator will actually earn, never generalize.
  const openRate = link.openCollabRate ?? brand.openCollabRate ?? 10;
  const kyvoRate = link.commission ?? brand.commissionRate;
  const maxRate = link.maxCommission ?? brand.maxCommission ?? 50;
  const boostLift = kyvoRate - openRate;
  const ticketUrl = brand.ticketUrl ?? DEFAULT_TICKET_URL;
  // Per-product samples flag — falls back to brand-level. Mixed-sample brands
  // (some products Yes, some No) set link.samplesIncluded explicitly per row.
  const hasSamples = link.samplesIncluded ?? brand.samplesIncluded ?? false;

  return (
    <div className="relative rounded-2xl bg-kyvo-surface/70 border border-kyvo-border
                    overflow-hidden">
      {/* Product header */}
      <div className="flex items-center gap-4 p-4 sm:p-5 border-b border-kyvo-border/40">
        <ProductThumb link={link} brand={brand} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="font-semibold text-white text-sm sm:text-base leading-snug line-clamp-2 flex-1 min-w-0">
              {link.productName}
            </div>
            {hasSamples && (
              <span
                className="shrink-0 px-1.5 py-0.5 rounded-md
                           text-[9px] sm:text-[10px] font-bold uppercase tracking-wider
                           bg-kyvo-green/15 text-kyvo-green border border-kyvo-green/30"
                title="Sample included for approved creators"
              >
                Sample
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1 text-xs">
            {link.price && (
              <span className="font-bold text-white">{link.price}</span>
            )}
            {typeof link.itemsSold === 'number' && link.itemsSold > 0 && (
              <>
                {link.price && <span className="text-kyvo-dim">·</span>}
                <span className="font-semibold text-kyvo-green">
                  {formatItemsSold(link.itemsSold)} sold
                </span>
              </>
            )}
            {boostLift > 0 && (
              <>
                <span className="text-kyvo-dim">·</span>
                <span className="font-semibold text-kyvo-green">+{boostLift}% boost</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 3-tier commission rows */}
      <div className="p-3 sm:p-4 space-y-2">
        <TierRow
          label="Open Collab"
          sublabel="TikTok Shop base rate"
          rate={openRate}
          tone="muted"
        />
        <TierRow
          label="Kyvo Boost"
          sublabel="Tap to earn at this rate"
          rate={kyvoRate}
          tone="primary"
          href={link.url}
        />
        <TierRow
          label="MAX Tier"
          sublabel="Click to Unlock"
          rate={maxRate}
          tone="locked"
          href={ticketUrl}
        />
      </div>
    </div>
  );
}

function TierRow({
  label,
  sublabel,
  rate,
  tone,
  href,
}: {
  label: string;
  sublabel: string;
  rate: number;
  tone: 'muted' | 'primary' | 'locked';
  href?: string;
}) {
  const base =
    'group flex items-center justify-between gap-3 px-4 py-3 rounded-xl border transition-all';

  if (tone === 'muted') {
    return (
      <div className={`${base} bg-kyvo-void/40 border-kyvo-border/60 cursor-default`}>
        <TierLeft icon={<UnlockIcon className="w-4 h-4" />} label={label} sublabel={sublabel} muted />
        <div className="text-base font-display font-bold text-kyvo-muted shrink-0">
          {rate}%
        </div>
      </div>
    );
  }

  if (tone === 'primary') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base}
                    bg-gradient-to-r from-kyvo-green/15 to-kyvo-green/5
                    border-kyvo-green/40
                    hover:from-kyvo-green/25 hover:to-kyvo-green/10
                    hover:border-kyvo-green/70
                    hover:shadow-[0_0_24px_rgba(34,245,163,0.25)]`}
      >
        <TierLeft
          icon={<BoltIcon className="w-4 h-4 text-kyvo-green" />}
          label={label}
          sublabel={sublabel}
        />
        <div className="flex items-center gap-2 shrink-0">
          <div className="text-lg sm:text-xl font-display font-bold text-kyvo-green leading-none">
            {rate}%
          </div>
          <div className="w-8 h-8 rounded-full bg-kyvo-green text-kyvo-void
                          flex items-center justify-center
                          group-hover:scale-110 transition-transform">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </a>
    );
  }

  // tone === 'locked'
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base}
                  relative overflow-hidden
                  bg-gradient-to-r from-kyvo-violet/20 via-kyvo-purple/15 to-kyvo-magenta/20
                  border-kyvo-magenta/40
                  hover:border-kyvo-magenta/80
                  hover:shadow-[0_0_28px_rgba(233,75,193,0.35)]
                  animate-pulse-glow`}
    >
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(1px 1px at 20% 30%, white, transparent), radial-gradient(1px 1px at 70% 60%, white, transparent), radial-gradient(1.5px 1.5px at 40% 80%, #FF6BCB, transparent)',
        }}
      />
      <TierLeft
        icon={<LockIcon className="w-4 h-4 text-kyvo-magenta" />}
        label={label}
        sublabel={sublabel}
        accent
      />
      <div className="relative flex items-center gap-2 shrink-0">
        <div className="text-lg sm:text-xl font-display font-bold text-white leading-none">
          {rate}%
        </div>
        <div className="w-8 h-8 rounded-full
                        bg-gradient-to-br from-kyvo-violet to-kyvo-magenta
                        flex items-center justify-center
                        group-hover:scale-110 transition-transform">
          <LockIcon className="w-3.5 h-3.5 text-white" />
        </div>
      </div>
    </a>
  );
}

function TierLeft({
  icon,
  label,
  sublabel,
  muted = false,
  accent = false,
}: {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  muted?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <div
        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0
                    ${
                      muted
                        ? 'bg-kyvo-elevated text-kyvo-muted'
                        : accent
                          ? 'bg-kyvo-magenta/15 text-kyvo-magenta'
                          : 'bg-kyvo-green/15 text-kyvo-green'
                    }`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <div className={`text-sm font-bold leading-tight ${muted ? 'text-kyvo-muted' : 'text-white'}`}>
          {label}
        </div>
        <div className="text-[11px] text-kyvo-muted leading-tight mt-0.5 truncate">
          {sublabel}
        </div>
      </div>
    </div>
  );
}

function ProductThumb({ link, brand }: { link: ProductLink; brand: Brand }) {
  // Resolve image source in priority order:
  //   1. Explicit `link.image` path
  //   2. Auto-derived from slug: /products/<brand-id>/<slug>.png
  //   3. Fall back to brand's logoTile (colored initials)
  const imageSrc =
    link.image ?? (link.slug ? `/products/${brand.id}/${link.slug}.png` : null);

  if (imageSrc) {
    return (
      <div className="w-14 h-14 rounded-xl bg-white p-1.5 shrink-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={link.productName}
          className="w-full h-full object-contain"
          onError={(e) => {
            // If image file doesn't exist yet, hide it so the brand-tile fallback shows
            (e.target as HTMLImageElement).style.display = 'none';
            const parent = (e.target as HTMLImageElement).parentElement;
            if (parent) parent.style.display = 'none';
          }}
        />
      </div>
    );
  }

  const tile = brand.logoTile ?? { bg: '#1A1838', fg: '#5CC8FF', initials: brand.name.slice(0, 2).toUpperCase() };
  return (
    <div
      className="w-14 h-14 rounded-xl shrink-0 flex items-center justify-center
                 font-display font-bold text-base border border-white/10"
      style={{ background: tile.bg, color: tile.fg }}
    >
      {tile.initials}
    </div>
  );
}

/** Format items-sold count: 41112 → "41.1K", 5189 → "5.2K", 458 → "458" */
function formatItemsSold(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

function ModalTile({ brand }: { brand: Brand }) {
  if (brand.logo) {
    return (
      <div className="w-14 h-14 rounded-xl bg-white p-1.5 flex items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" />
      </div>
    );
  }
  const tile = brand.logoTile ?? { bg: '#1A1838', fg: '#5CC8FF', initials: brand.name.slice(0, 2).toUpperCase() };
  return (
    <div
      className="w-14 h-14 rounded-xl flex items-center justify-center
                 font-display font-bold text-lg border border-white/10"
      style={{ background: tile.bg, color: tile.fg }}
    >
      {tile.initials}
    </div>
  );
}

function prettyUrl(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function XIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
         className={className} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function ArrowUpRight({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
         className={className} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

function UnlockIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         className={className} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
    </svg>
  );
}

function LockIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         className={className} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function BoltIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  );
}
