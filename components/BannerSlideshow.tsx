'use client';

import { useEffect, useState } from 'react';
import type { Brand } from '@/lib/types';
import { tenant, ctaProps } from '@/lib/tenant';

/**
 * Auto-rotating priority-brands slideshow.
 * - Single visible banner, rotates every 5.5s, pauses on hover.
 * - Glass-bubble prev/next arrow buttons on each side (slide navigation).
 * - "Click to Unlock" CTA links to brand.ticketUrl (or default discord.gg/kyvo).
 * - Tapping the brand name / left content area opens the brand modal.
 */

interface Props {
  brands: Brand[];
  onBrandClick: (brand: Brand) => void;
}

export function BannerSlideshow({ brands, onBrandClick }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || brands.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % brands.length);
    }, 5500);
    return () => clearInterval(id);
  }, [paused, brands.length]);

  if (brands.length === 0) return null;

  const prev = () => setIndex((i) => (i - 1 + brands.length) % brands.length);
  const next = () => setIndex((i) => (i + 1) % brands.length);

  return (
    <section
      className="relative px-4 mt-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl relative">
        <div
          className="relative overflow-hidden rounded-3xl
                     h-[280px] sm:h-[340px] md:h-[400px]
                     shadow-kyvo-glow border border-kyvo-border/60"
        >
          {brands.map((brand, i) => (
            <Slide
              key={brand.id}
              brand={brand}
              active={i === index}
              onBrandClick={() => onBrandClick(brand)}
            />
          ))}

          {/* Glass arrow buttons */}
          <GlassArrow direction="left" onClick={prev} />
          <GlassArrow direction="right" onClick={next} />

          {/* Slide dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {brands.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? 'w-8 bg-white'
                    : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Slide({
  brand,
  active,
  onBrandClick,
}: {
  brand: Brand;
  active: boolean;
  onBrandClick: () => void;
}) {
  // Resolve unlock destination: per-brand override → tenant default → null
  // (when tenant has no Discord/ticket URL, ctaProps renders a no-op button).
  const ticketUrl = brand.ticketUrl ?? tenant.ticketUrl;
  const hasBannerImage = Boolean(brand.bannerImage);

  // Resolve banner gradient: per-tenant override → brand default → fallback.
  // The per-tenant lookup lets partner portals tint specific brand banners
  // to match their palette without affecting other tenants' visuals.
  const bannerGradient =
    brand.bannerGradientByTenant?.[tenant.id] ??
    brand.bannerGradient ??
    'linear-gradient(135deg, var(--kyvo-deep) 0%, var(--kyvo-purple) 50%, var(--kyvo-violet) 100%)';

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 ease-out
                  ${active ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
      style={{
        background: bannerGradient,
      }}
    >
      {/* Banner photo layer (if set) — cover-fit, sits above the gradient fallback */}
      {hasBannerImage && (
        <div
          className="absolute inset-0 bg-center bg-cover pointer-events-none"
          style={{ backgroundImage: `url(${brand.bannerImage})` }}
        />
      )}

      {/* Symmetric left+right vignette gradient — protects text legibility on BOTH
          sides (left brand-name text + right commission stamp).  Transparent middle
          lets the hero photo show through. */}
      {hasBannerImage && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, ' +
              'rgba(5,3,15,0.78) 0%, ' +
              'rgba(5,3,15,0.55) 18%, ' +
              'rgba(5,3,15,0.20) 40%, ' +
              'rgba(5,3,15,0.20) 60%, ' +
              'rgba(5,3,15,0.55) 82%, ' +
              'rgba(5,3,15,0.78) 100%)',
          }}
        />
      )}

      {/* Starfield overlay (only on gradient-only slides — photos don't need it) */}
      {!hasBannerImage && (
        <div
          className="absolute inset-0 opacity-50 mix-blend-screen pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(1px 1px at 12% 22%, white, transparent), radial-gradient(1px 1px at 73% 31%, white, transparent), radial-gradient(1.5px 1.5px at 45% 78%, white, transparent), radial-gradient(1px 1px at 88% 65%, white, transparent), radial-gradient(1px 1px at 12% 84%, white, transparent), radial-gradient(1px 1px at 55% 12%, white, transparent)',
          }}
        />
      )}

      {/*
        Mobile-first layout: tighter horizontal padding on small screens so
        the glass arrow buttons + content all fit on a 380px viewport.
      */}
      <div className="relative z-10 h-full flex items-center justify-between
                      px-14 sm:px-20 md:px-24 gap-3 sm:gap-4">
        {/* Left content — clickable area for opening the modal */}
        <button
          onClick={onBrandClick}
          className="text-left max-w-md min-w-0 group"
          aria-label={`Open ${brand.name} product links`}
        >
          <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-kyvo-green mb-1.5 flex items-center gap-1.5">
            <span className="inline-flex w-1.5 h-1.5 rounded-full bg-kyvo-green animate-pulse" />
            50% MAX · Featured #{brand.priorityOrder ?? 1}
          </div>
          <h2 className="font-display font-bold text-xl sm:text-3xl md:text-4xl text-white leading-tight tracking-tight">
            {brand.name}
          </h2>
          {brand.tagline && (
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-base text-white/80 max-w-sm line-clamp-2">
              {brand.tagline}
            </p>
          )}

          {/* "Click to Unlock" CTA — visual stays identical whether or not
              tenant.ticketUrl is set. ctaProps clears href when null so a
              tap does nothing instead of routing to a partner-less URL.
              The onClick stopPropagation is added on top of ctaProps. */}
          <a
            {...(() => {
              const props = ctaProps(ticketUrl);
              return {
                ...props,
                onClick: (e: React.MouseEvent) => {
                  e.stopPropagation();
                  props.onClick?.(e);
                },
              };
            })()}
            className="mt-3 sm:mt-4 inline-flex items-center gap-1.5 sm:gap-2
                       px-3 py-1.5 sm:px-4 sm:py-2
                       rounded-full bg-white text-kyvo-deep
                       text-xs sm:text-sm font-bold shadow-lg
                       hover:scale-105 transition-transform"
          >
            <LockIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            Click to Unlock
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </a>
        </button>

        {/* Right — commission stamp showing MAX (locked top rate, marketing headline). */}
        <div className="flex flex-col items-center justify-center relative shrink-0">
          <div className="absolute inset-0 rounded-full bg-kyvo-green/40 blur-2xl" />
          <div className="relative bg-kyvo-void/40 backdrop-blur-md border border-white/30 rounded-2xl
                          px-3 py-2.5 sm:px-7 sm:py-5">
            <div className="text-[8px] sm:text-xs font-semibold uppercase tracking-widest text-white/70 leading-none">
              MAX
            </div>
            <div className="font-display font-bold text-2xl sm:text-5xl text-kyvo-green leading-none mt-0.5 sm:mt-1">
              {brand.maxCommission ?? brand.commissionRate}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Glass-bubble arrow button — left or right edge of slideshow.
 * Cycles slides (prev/next). Frosted-glass + gradient ring on hover.
 */
function GlassArrow({
  direction,
  onClick,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
}) {
  const isLeft = direction === 'left';
  return (
    <button
      onClick={onClick}
      aria-label={isLeft ? 'Previous brand' : 'Next brand'}
      className={`absolute top-1/2 -translate-y-1/2 z-30
                  ${isLeft ? 'left-3 sm:left-4' : 'right-3 sm:right-4'}
                  w-11 h-11 sm:w-12 sm:h-12
                  rounded-full
                  bg-white/15 backdrop-blur-md
                  border border-white/30
                  text-white
                  flex items-center justify-center
                  shadow-[0_4px_24px_rgba(0,0,0,0.35)]
                  hover:bg-white/25 hover:border-white/50
                  hover:shadow-[0_4px_30px_rgba(var(--kyvo-magenta-rgb),_0.45)]
                  active:scale-95
                  transition-all duration-200`}
    >
      {isLeft ? (
        <ArrowLeft className="w-5 h-5" />
      ) : (
        <ArrowRight className="w-5 h-5" />
      )}
    </button>
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

function ArrowLeft({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
         className={className} strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M11 5l-7 7 7 7" />
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
