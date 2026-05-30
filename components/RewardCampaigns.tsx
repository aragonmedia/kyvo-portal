'use client';

import { useEffect, useState } from 'react';
import type { Brand, RewardCampaign } from '@/lib/types';

/**
 * Homepage section that surfaces active reward campaigns ("Generate X GMV
 * earn $X" style promotions). Sits between the BannerSlideshow and the
 * SearchBar so creators can spot extra-earnings opportunities at a glance.
 *
 * Mobile-first: horizontal-scroll card row that snaps. Tap a card to open
 * a full-screen zoom modal of the campaign image.
 */
interface Props {
  campaigns: RewardCampaign[];
  brands: Brand[];
}

export function RewardCampaigns({ campaigns, brands }: Props) {
  const [zoom, setZoom] = useState<RewardCampaign | null>(null);

  if (campaigns.length === 0) return null;

  const brandById = new Map(brands.map((b) => [b.id, b]));

  return (
    <section className="px-4 mt-6 sm:mt-8">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
          <span className="text-base sm:text-lg" aria-hidden>
            🎁
          </span>
          <h2 className="font-display font-bold text-sm sm:text-base text-kyvo-cyan
                         tracking-tight">
            Reward Campaigns
          </h2>
          <span className="text-[10px] uppercase tracking-widest text-kyvo-dim font-bold">
            Live
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-kyvo-cyan/40 via-kyvo-cyan/15 to-transparent" />
        </div>

        {/* Horizontal scrolling row of campaign cards.
            On mobile: one-and-a-half cards visible so the row reads as scrollable.
            On desktop: cards line up and fill the row. */}
        <div className="-mx-4 px-4 overflow-x-auto no-scrollbar">
          <div className="flex gap-3 sm:gap-4 pb-2 snap-x snap-mandatory">
            {campaigns.map((c) => {
              const brand = brandById.get(c.brandId);
              return (
                <CampaignCard
                  key={`${c.brandId}-${c.image}`}
                  campaign={c}
                  brand={brand}
                  onZoom={() => setZoom(c)}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Zoom modal — full-screen image view */}
      {zoom && (
        <CampaignZoom
          campaign={zoom}
          brand={brandById.get(zoom.brandId)}
          onClose={() => setZoom(null)}
        />
      )}
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * Campaign card — highlighted box with brand logo + image + zoom CTA
 * ─────────────────────────────────────────────────────────────────────── */

function CampaignCard({
  campaign,
  brand,
  onZoom,
}: {
  campaign: RewardCampaign;
  brand: Brand | undefined;
  onZoom: () => void;
}) {
  return (
    <button
      onClick={onZoom}
      className="group relative shrink-0 snap-start
                 w-[280px] sm:w-[340px] md:w-[380px]
                 rounded-2xl
                 bg-gradient-to-br from-kyvo-cyan/12 via-kyvo-violet/10 to-kyvo-magenta/12
                 border border-kyvo-cyan/40
                 hover:border-kyvo-cyan/80
                 shadow-[0_4px_28px_rgba(92,200,255,0.18)]
                 hover:shadow-[0_4px_32px_rgba(92,200,255,0.4)]
                 transition-all duration-200
                 hover:-translate-y-0.5
                 overflow-hidden text-left"
      aria-label={`Zoom ${brand?.name ?? 'campaign'} reward details`}
    >
      {/* Brand chip on top-left */}
      {brand && (
        <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5
                        px-2 py-1 rounded-full
                        bg-kyvo-void/70 backdrop-blur-md border border-white/20">
          <BrandMiniLogo brand={brand} />
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">
            {brand.name}
          </span>
        </div>
      )}

      {/* Zoom-icon chip top-right (telegraphs interactivity) */}
      <div className="absolute top-2.5 right-2.5 z-10
                      w-7 h-7 rounded-full
                      bg-kyvo-void/70 backdrop-blur-md border border-white/20
                      flex items-center justify-center
                      group-hover:bg-kyvo-cyan group-hover:text-kyvo-deep
                      group-hover:scale-110
                      transition-all duration-200
                      text-white">
        <ZoomIcon className="w-3.5 h-3.5" />
      </div>

      {/* Campaign image — `object-top` anchors tall infographics so the
          brand headline shows in the card preview (e.g. "CLIMB THE CROWN"
          on the Whyte campaign). Tap to zoom for the full readable image. */}
      <div className="aspect-[5/4] w-full bg-kyvo-deep overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={campaign.image}
          alt={campaign.title ?? `${brand?.name ?? 'Brand'} reward campaign`}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Optional title + description footer */}
      {(campaign.title || campaign.description) && (
        <div className="px-3 py-2.5 sm:px-4 sm:py-3 border-t border-kyvo-cyan/20">
          {campaign.title && (
            <div className="font-display font-bold text-sm text-white leading-tight">
              {campaign.title}
            </div>
          )}
          {campaign.description && (
            <div className="text-[11px] text-kyvo-muted leading-tight mt-1">
              {campaign.description}
            </div>
          )}
        </div>
      )}
    </button>
  );
}

function BrandMiniLogo({ brand }: { brand: Brand }) {
  if (brand.logo) {
    return (
      <div className="w-4 h-4 rounded-sm bg-white p-0.5 flex items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={brand.logo} alt="" className="w-full h-full object-contain" />
      </div>
    );
  }
  const tile = brand.logoTile;
  if (!tile) return null;
  return (
    <div
      className="w-4 h-4 rounded-sm flex items-center justify-center
                 text-[7px] font-bold border border-white/10"
      style={{ background: tile.bg, color: tile.fg }}
    >
      {tile.initials}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * Zoom modal — tap the card to view the campaign image larger
 * ─────────────────────────────────────────────────────────────────────── */

function CampaignZoom({
  campaign,
  brand,
  onClose,
}: {
  campaign: RewardCampaign;
  brand: Brand | undefined;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
                 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${brand?.name ?? 'Brand'} reward campaign details`}
    >
      <div className="absolute inset-0 bg-kyvo-void/90 backdrop-blur-md" />

      <div
        className="relative max-w-2xl max-h-[92vh] m-4
                   bg-kyvo-deep border border-kyvo-cyan/40 rounded-2xl
                   shadow-[0_8px_48px_rgba(92,200,255,0.35)]
                   overflow-hidden
                   flex flex-col
                   animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-kyvo-border/50">
          <div className="flex items-center gap-2.5 min-w-0">
            {brand && <BrandMiniLogo brand={brand} />}
            <div className="font-display font-bold text-sm sm:text-base text-white truncate">
              {brand?.name ?? 'Reward Campaign'}
            </div>
            <span className="text-[10px] uppercase tracking-widest text-kyvo-cyan font-bold shrink-0">
              Rewards
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-full hover:bg-kyvo-elevated text-kyvo-muted hover:text-white
                       transition-colors shrink-0"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Image (scrollable if tall) */}
        <div className="flex-1 overflow-auto bg-kyvo-void/40 flex items-center justify-center p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={campaign.image}
            alt={campaign.title ?? `${brand?.name ?? 'Brand'} reward campaign`}
            className="max-w-full max-h-full object-contain rounded-xl"
          />
        </div>

        {(campaign.title || campaign.description) && (
          <div className="px-4 py-3 border-t border-kyvo-border/50">
            {campaign.title && (
              <div className="font-display font-bold text-sm text-white leading-tight">
                {campaign.title}
              </div>
            )}
            {campaign.description && (
              <div className="text-xs text-kyvo-muted leading-snug mt-1">
                {campaign.description}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * Icons
 * ─────────────────────────────────────────────────────────────────────── */

function ZoomIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3M11 8v6M8 11h6" />
    </svg>
  );
}

function XIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
