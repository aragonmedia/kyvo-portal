'use client';

import { useEffect } from 'react';
import type { Brand } from '@/lib/types';

interface Props {
  brand: Brand | null;
  onClose: () => void;
}

export function BrandModal({ brand, onClose }: Props) {
  // Lock body scroll + handle Escape key
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
      {/* Backdrop */}
      <div className="absolute inset-0 bg-kyvo-void/80 backdrop-blur-md" />

      {/* Panel */}
      <div
        className="relative w-full sm:max-w-2xl
                   max-h-[90vh] sm:max-h-[85vh]
                   bg-kyvo-deep border border-kyvo-border
                   rounded-t-3xl sm:rounded-3xl
                   shadow-kyvo-glow
                   flex flex-col
                   animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle (mobile) */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center">
          <div className="w-10 h-1 rounded-full bg-kyvo-border" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-kyvo-border/50">
          <div className="flex items-center gap-4">
            <ModalTile brand={brand} />
            <div>
              <div className="font-display font-bold text-xl sm:text-2xl text-white">
                {brand.name}
              </div>
              <div className="text-sm text-kyvo-green font-semibold mt-0.5">
                {brand.commissionRate}% commission · {brand.links.length}{' '}
                {brand.links.length === 1 ? 'link' : 'links'}
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

        {/* Links list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2">
          {brand.links.map((link, i) => {
            const commission = link.commission ?? brand.commissionRate;
            return (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4
                           px-4 py-4 rounded-xl
                           bg-kyvo-surface/70 hover:bg-kyvo-elevated
                           border border-kyvo-border hover:border-kyvo-violet/60
                           transition-all"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white truncate">
                    {link.productName}
                  </div>
                  <div className="text-xs text-kyvo-muted mt-0.5 truncate">
                    {prettyUrl(link.url)}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-sm font-bold text-kyvo-green">
                    {commission}%
                  </div>
                  <div className="w-9 h-9 rounded-full
                                  bg-gradient-to-br from-kyvo-violet to-kyvo-magenta
                                  flex items-center justify-center
                                  group-hover:scale-110 transition-transform">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
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
