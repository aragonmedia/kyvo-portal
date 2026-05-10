'use client';

import { useEffect, useState } from 'react';
import type { Brand } from '@/lib/types';

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

  return (
    <section
      className="relative px-4 mt-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl
                        h-[260px] sm:h-[320px] md:h-[380px]
                        shadow-kyvo-glow border border-kyvo-border/60">
          {brands.map((brand, i) => (
            <BannerSlide
              key={brand.id}
              brand={brand}
              active={i === index}
              onClick={() => onBrandClick(brand)}
            />
          ))}

          {/* Navigation dots */}
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

function BannerSlide({
  brand,
  active,
  onClick,
}: {
  brand: Brand;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`absolute inset-0 w-full h-full text-left
                  transition-opacity duration-700 ease-out
                  ${active ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
      style={{
        background:
          brand.bannerGradient ||
          'linear-gradient(135deg, #1a0b3e 0%, #4a1d8a 50%, #7B3FE4 100%)',
      }}
    >
      {/* Soft starfield overlay on banner */}
      <div
        className="absolute inset-0 opacity-50 mix-blend-screen"
        style={{
          backgroundImage:
            'radial-gradient(1px 1px at 18% 22%, white, transparent), radial-gradient(1px 1px at 73% 31%, white, transparent), radial-gradient(1.5px 1.5px at 45% 78%, white, transparent), radial-gradient(1px 1px at 88% 65%, white, transparent), radial-gradient(1px 1px at 12% 84%, white, transparent)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-between
                      px-6 sm:px-10 md:px-14">
        <div className="max-w-md">
          <div className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]
                          text-white/70 mb-3">
            Featured Partner · #{brand.priorityOrder ?? 1}
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl
                         text-white leading-[1.05] tracking-tight">
            {brand.name}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/80 max-w-sm">
            {brand.tagline ?? `${brand.commissionRate}% commission on every link`}
          </p>
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-2
                          rounded-full bg-white text-kyvo-deep
                          text-sm font-bold shadow-lg
                          group-hover:scale-105 transition-transform">
            Tap to access links
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Commission rate stamp */}
        <div className="hidden sm:flex flex-col items-center justify-center
                        relative">
          <div className="absolute inset-0 rounded-full
                          bg-gradient-to-br from-kyvo-green/40 to-kyvo-green/0
                          blur-2xl" />
          <div className="relative bg-kyvo-void/40 backdrop-blur-md
                          border border-white/30 rounded-2xl
                          px-5 py-4 sm:px-7 sm:py-5">
            <div className="text-[10px] sm:text-xs font-semibold
                            uppercase tracking-widest text-white/70">
              Commission
            </div>
            <div className="font-display font-bold text-4xl sm:text-5xl
                            text-kyvo-green leading-none mt-1">
              {brand.commissionRate}%
            </div>
          </div>
        </div>
      </div>
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
