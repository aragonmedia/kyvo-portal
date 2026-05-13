'use client';

import type { Brand } from '@/lib/types';

/**
 * Stacked horizontal hero banners — one per 50% commission brand.
 * Always visible, no auto-rotation. Click any banner → opens brand modal.
 *
 * Kept the filename BannerSlideshow.tsx for upload simplicity, but this is
 * no longer a slideshow — it's a stack of always-visible banners.
 */

interface Props {
  brands: Brand[];
  onBrandClick: (brand: Brand) => void;
}

export function BannerSlideshow({ brands, onBrandClick }: Props) {
  if (brands.length === 0) return null;

  return (
    <section className="px-4 mt-6">
      <div className="mx-auto max-w-7xl space-y-3 sm:space-y-4">
        {brands.map((brand) => (
          <HeroBanner key={brand.id} brand={brand} onClick={() => onBrandClick(brand)} />
        ))}
      </div>
    </section>
  );
}

function HeroBanner({ brand, onClick }: { brand: Brand; onClick: () => void }) {
  const openRate = brand.openCollabRate ?? 10;
  const kyvoRate = brand.commissionRate;
  const boostLift = kyvoRate - openRate;

  return (
    <button
      onClick={onClick}
      className="group relative w-full overflow-hidden rounded-2xl sm:rounded-3xl
                 h-[180px] sm:h-[200px] md:h-[220px]
                 border border-kyvo-border/60 hover:border-white/30
                 shadow-kyvo-card hover:shadow-kyvo-card-hover
                 transition-all duration-300
                 text-left"
      style={{
        background:
          brand.bannerGradient ||
          'linear-gradient(135deg, #1a0b3e 0%, #4a1d8a 50%, #7B3FE4 100%)',
      }}
      aria-label={`Open ${brand.name} product links`}
    >
      {/* Starfield overlay */}
      <div
        className="absolute inset-0 opacity-50 mix-blend-screen pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(1px 1px at 12% 24%, white, transparent), radial-gradient(1px 1px at 73% 31%, white, transparent), radial-gradient(1.5px 1.5px at 45% 78%, white, transparent), radial-gradient(1px 1px at 88% 65%, white, transparent), radial-gradient(1px 1px at 12% 84%, white, transparent), radial-gradient(1px 1px at 55% 12%, white, transparent)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-between
                      px-5 sm:px-8 md:px-10 gap-4">
        <div className="flex items-center gap-3 sm:gap-5 min-w-0">
          <BannerLogo brand={brand} />

          <div className="min-w-0">
            <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em]
                            text-white/70 mb-1">
              50% Kyvo Boost · Top Tier
            </div>
            <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl
                           text-white leading-tight tracking-tight truncate">
              {brand.name}
            </h2>
            {brand.tagline && (
              <p className="mt-1 text-xs sm:text-sm text-white/80 line-clamp-2 max-w-md">
                {brand.tagline}
              </p>
            )}
          </div>
        </div>

        {/* Right side — commission stamp + CTA */}
        <div className="flex flex-col items-end gap-2 sm:gap-3 shrink-0">
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-kyvo-green/30 blur-2xl" />
            <div className="relative bg-kyvo-void/50 backdrop-blur-md
                            border border-white/20 rounded-2xl
                            px-3 py-2 sm:px-4 sm:py-3 text-right">
              <div className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-white/70 leading-none">
                Commission
              </div>
              <div className="font-display font-bold text-2xl sm:text-3xl md:text-4xl
                              text-kyvo-green leading-none mt-1">
                {kyvoRate}%
              </div>
              {boostLift > 0 && (
                <div className="text-[9px] sm:text-[10px] font-semibold text-white/80 mt-1 leading-none">
                  +{boostLift}% vs open
                </div>
              )}
            </div>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5
                          rounded-full bg-white text-kyvo-deep
                          text-xs font-bold
                          group-hover:scale-105 transition-transform">
            Tap to unlock
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </button>
  );
}

function BannerLogo({ brand }: { brand: Brand }) {
  if (brand.logo) {
    return (
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white p-1.5 shrink-0
                      overflow-hidden border border-white/30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" />
      </div>
    );
  }
  const tile = brand.logoTile ?? { bg: '#1A1838', fg: '#5CC8FF', initials: brand.name.slice(0, 2).toUpperCase() };
  return (
    <div
      className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl shrink-0
                 flex items-center justify-center
                 font-display font-bold text-xl
                 border border-white/30 shadow-lg"
      style={{ background: tile.bg, color: tile.fg }}
    >
      {tile.initials}
    </div>
  );
}

function ArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
         className={className} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
