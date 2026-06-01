'use client';

import { useEffect, useState } from 'react';
import type { FilterCategory } from '@/lib/types';

/**
 * Pill order — MAX Commissions sits LEFTMOST (most prominent, easy to find).
 * "All Brands" sits second as the default/reset state.
 *
 * Mobile-first: under sm: viewports we render a "Filter" button + slide-down
 * panel with checkbox list (Kevin: "almost everyone will be using mobile").
 * At sm:+ we render the horizontal pill row.
 */
const PILLS: FilterCategory[] = [
  'MAX Commissions',     // leftmost, most prominent
  'All Brands',
  'Rewards Campaigns',   // cyan/gift treatment — ties to the Rewards section above
  'Items Sold',          // sort: rank brands by total units sold descending
  'Samples Included',
  'Health',
  'Beauty',
  'Skincare',
  'Pet',
  'Trending',
  'Higher Commission',
];

/** Pills that SORT instead of filtering — no count badge, ranking icon. */
const SORT_PILLS = new Set<FilterCategory>(['Items Sold']);

/** Pills that visually share the cyan/rewards treatment. */
const REWARDS_PILLS = new Set<FilterCategory>(['Rewards Campaigns']);

interface Props {
  active: Set<FilterCategory>;
  onToggle: (pill: FilterCategory) => void;
  counts?: Partial<Record<FilterCategory, number>>;
}

export function FilterPills({ active, onToggle, counts }: Props) {
  return (
    <div className="px-4 mt-5">
      <div className="mx-auto max-w-7xl">
        {/* Mobile: dropdown panel */}
        <div className="sm:hidden">
          <MobileFilterDropdown active={active} onToggle={onToggle} counts={counts} />
        </div>

        {/* Desktop: pill row */}
        <div className="hidden sm:block">
          <DesktopPillRow active={active} onToggle={onToggle} counts={counts} />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * Mobile dropdown
 * ─────────────────────────────────────────────────────────────────────── */

function MobileFilterDropdown({ active, onToggle, counts }: Props) {
  const [open, setOpen] = useState(false);
  const allActive = active.has('All Brands') || active.size === 0;
  // Sort pills are intentionally excluded from the "X filters active" count
  // (they re-order, they don't filter).
  const activeFilterCount = active.has('All Brands')
    ? 0
    : Array.from(active).filter((p) => p !== 'All Brands' && !SORT_PILLS.has(p)).length;
  const sortActive = Array.from(active).some((p) => SORT_PILLS.has(p));

  // Close panel on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const summary = allActive
    ? sortActive
      ? 'All Brands · Sorted'
      : 'All Brands'
    : activeFilterCount === 0 && sortActive
      ? 'Sorted by Items Sold'
      : activeFilterCount === 1
        ? Array.from(active).find((p) => p !== 'All Brands' && !SORT_PILLS.has(p))
        : `${activeFilterCount} filters${sortActive ? ' · sorted' : ''}`;

  return (
    <div className="relative">
      {/* Trigger button — full-width on mobile, prominent */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`w-full flex items-center justify-between gap-3
                    px-4 py-3 rounded-2xl
                    border transition-all duration-200
                    ${
                      activeFilterCount > 0
                        ? 'bg-gradient-to-r from-kyvo-violet/15 to-kyvo-magenta/15 border-kyvo-magenta/50'
                        : 'bg-kyvo-surface/70 border-kyvo-border'
                    }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <FilterIcon className="w-4 h-4 text-kyvo-magenta shrink-0" />
          <div className="flex flex-col items-start min-w-0">
            <span className="text-[10px] uppercase tracking-widest text-kyvo-muted font-semibold leading-none">
              Filter
            </span>
            <span className="text-sm font-bold text-white truncate leading-tight mt-0.5">
              {summary}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {activeFilterCount > 0 && (
            <span className="text-[10px] font-bold text-white bg-kyvo-magenta px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
          <ChevronIcon
            className={`w-4 h-4 text-kyvo-muted transition-transform duration-200
                        ${open ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* Backdrop — tap outside to close */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm animate-fade-in"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Panel */}
      {open && (
        <div
          className="absolute left-0 right-0 top-full mt-2 z-50
                     bg-kyvo-deep border border-kyvo-border rounded-2xl
                     shadow-kyvo-glow overflow-hidden
                     animate-slide-up"
          role="listbox"
        >
          <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
            {PILLS.map((pill) => {
              const isAll = pill === 'All Brands';
              const isSort = SORT_PILLS.has(pill);
              const isRewards = REWARDS_PILLS.has(pill);
              const isActive = isAll ? allActive : active.has(pill);
              const isHighlight =
                pill === 'MAX Commissions' || pill === 'Samples Included';
              const count = counts?.[pill];

              return (
                <button
                  key={pill}
                  onClick={() => onToggle(pill)}
                  role="option"
                  aria-selected={isActive}
                  className={`w-full flex items-center justify-between gap-3
                              px-3 py-3 rounded-xl
                              transition-all duration-150
                              ${
                                isActive
                                  ? isHighlight
                                    ? 'bg-gradient-to-r from-kyvo-magenta/20 to-kyvo-pink/15 border border-kyvo-magenta/50'
                                    : isSort || isRewards
                                      ? 'bg-gradient-to-r from-kyvo-cyan/15 to-kyvo-violet/15 border border-kyvo-cyan/50'
                                      : 'bg-gradient-to-r from-kyvo-violet/20 to-kyvo-magenta/15 border border-kyvo-violet/50'
                                  : 'hover:bg-kyvo-elevated border border-transparent'
                              }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <CheckBox active={isActive} highlight={isHighlight} />
                    <div className="flex items-center gap-1.5">
                      {pill === 'MAX Commissions' && (
                        <span className="text-sm" aria-hidden>🔥</span>
                      )}
                      {pill === 'Rewards Campaigns' && (
                        <span className="text-sm" aria-hidden>🎁</span>
                      )}
                      {pill === 'Samples Included' && (
                        <PackageIcon className="w-3.5 h-3.5 text-kyvo-magenta" />
                      )}
                      {pill === 'Items Sold' && (
                        <RankIcon className="w-3.5 h-3.5 text-kyvo-cyan" />
                      )}
                      <span className={`text-sm font-semibold
                                        ${isActive ? 'text-white' : 'text-kyvo-text'}`}>
                        {pill}
                      </span>
                      {isSort && (
                        <span className="text-[9px] uppercase tracking-widest text-kyvo-dim font-bold">
                          sort
                        </span>
                      )}
                    </div>
                  </div>
                  {!isSort && typeof count === 'number' && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0
                                       ${isActive
                                         ? 'bg-white/25 text-white'
                                         : 'bg-kyvo-elevated text-kyvo-dim'}`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sticky footer with Clear + Done */}
          <div className="flex items-center justify-between gap-2 px-3 py-2.5
                          border-t border-kyvo-border bg-kyvo-surface/50">
            <button
              onClick={() => onToggle('All Brands')}
              className="text-xs font-semibold text-kyvo-magenta hover:text-kyvo-pink"
            >
              Clear all
            </button>
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-kyvo-violet to-kyvo-magenta
                         text-white text-xs font-bold shadow-md
                         hover:scale-105 transition-transform"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * Desktop pill row
 * ─────────────────────────────────────────────────────────────────────── */

function DesktopPillRow({ active, onToggle, counts }: Props) {
  const allActive = active.has('All Brands') || active.size === 0;
  // Sort pills are intentionally excluded from the "X filters active" count.
  const activeFilterCount = active.has('All Brands')
    ? 0
    : Array.from(active).filter((p) => p !== 'All Brands' && !SORT_PILLS.has(p)).length;

  return (
    <>
      {/* Hint banner — when nothing is selected, communicate multi-select */}
      {activeFilterCount === 0 && (
        <div className="mb-2 flex items-center justify-center gap-1.5 text-xs text-kyvo-muted">
          <LayersIcon className="w-3 h-3 text-kyvo-magenta" />
          <span>Tap multiple pills to layer filters</span>
        </div>
      )}

      {/* Active filter count + Clear all */}
      {activeFilterCount > 0 && (
        <div className="mb-2 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-kyvo-muted">
            {activeFilterCount} filter{activeFilterCount === 1 ? '' : 's'} active
          </span>
          <span className="text-kyvo-dim">·</span>
          <button
            onClick={() => onToggle('All Brands')}
            className="text-kyvo-magenta hover:text-kyvo-pink font-semibold underline-offset-2 hover:underline"
          >
            Clear all
          </button>
        </div>
      )}

      <div className="flex gap-2 flex-wrap justify-center pb-1">
        {PILLS.map((pill) => {
          const isAll = pill === 'All Brands';
          const isSort = SORT_PILLS.has(pill);
          const isRewards = REWARDS_PILLS.has(pill);
          const isActive = isAll ? allActive : active.has(pill);
          const isHighlight = pill === 'MAX Commissions' || pill === 'Samples Included';
          const count = counts?.[pill];
          // Rewards + sort pills share the cyan visual treatment but rewards is
          // a real filter (gets the checkmark, gets the count badge).
          const useCyanTreatment = isSort || isRewards;

          return (
            <button
              key={pill}
              onClick={() => onToggle(pill)}
              aria-pressed={isActive}
              className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full
                          text-sm font-semibold transition-all duration-200
                          border
                          ${
                            isActive
                              ? isHighlight
                                ? 'bg-gradient-to-r from-kyvo-magenta to-kyvo-pink text-white border-transparent shadow-[0_4px_24px_rgba(var(--kyvo-magenta-rgb),_0.45)]'
                                : useCyanTreatment
                                  ? 'bg-gradient-to-r from-kyvo-cyan to-kyvo-violet text-white border-transparent shadow-[0_4px_24px_rgba(var(--kyvo-cyan-rgb),_0.4)]'
                                  : 'bg-gradient-to-r from-kyvo-violet to-kyvo-magenta text-white border-transparent shadow-[0_4px_24px_rgba(var(--kyvo-violet-rgb),_0.4)]'
                              : isHighlight
                                ? 'bg-kyvo-magenta/8 text-kyvo-magenta border-kyvo-magenta/40 hover:border-kyvo-magenta/80 hover:bg-kyvo-magenta/15'
                                : useCyanTreatment
                                  ? 'bg-kyvo-cyan/8 text-kyvo-cyan border-kyvo-cyan/40 hover:border-kyvo-cyan/80 hover:bg-kyvo-cyan/15'
                                  : 'bg-kyvo-surface/60 text-kyvo-muted border-kyvo-border hover:text-white hover:border-kyvo-violet/60'
                          }`}
            >
              {isActive && !isAll && !isSort && <CheckIcon className="w-3.5 h-3.5" />}
              {pill === 'MAX Commissions' && !isActive && <FireSpan />}
              {pill === 'Rewards Campaigns' && !isActive && <GiftSpan />}
              {pill === 'Samples Included' && !isActive && (
                <PackageIcon className="w-3.5 h-3.5" />
              )}
              {pill === 'Items Sold' && (
                <RankIcon className="w-3.5 h-3.5" />
              )}
              {pill}
              {!isSort && typeof count === 'number' && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full
                                   ${isActive
                                     ? 'bg-white/25 text-white'
                                     : isHighlight
                                       ? 'bg-kyvo-magenta/20 text-kyvo-magenta'
                                       : 'bg-kyvo-elevated text-kyvo-dim'}`}>
                  {count}
                </span>
              )}
              {isSort && (
                <span className={`text-[9px] uppercase tracking-widest font-bold
                                   ${isActive ? 'text-white/70' : 'text-kyvo-dim'}`}>
                  sort
                </span>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * Helpers
 * ─────────────────────────────────────────────────────────────────────── */

function CheckBox({ active, highlight }: { active: boolean; highlight: boolean }) {
  return (
    <div
      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0
                  transition-all duration-150
                  ${
                    active
                      ? highlight
                        ? 'bg-kyvo-magenta border-kyvo-magenta'
                        : 'bg-kyvo-violet border-kyvo-violet'
                      : 'bg-transparent border-kyvo-border'
                  }`}
    >
      {active && <CheckIcon className="w-3 h-3 text-white" />}
    </div>
  );
}

function FireSpan() {
  return <span className="text-xs leading-none" aria-hidden>🔥</span>;
}

function GiftSpan() {
  return <span className="text-xs leading-none" aria-hidden>🎁</span>;
}

function RankIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {/* Bar chart — bars increase right-to-left to suggest "ranked" ordering */}
      <path d="M3 20h18" />
      <rect x="5" y="13" width="3.2" height="6" rx="0.6" />
      <rect x="10.4" y="9" width="3.2" height="10" rx="0.6" />
      <rect x="15.8" y="5" width="3.2" height="14" rx="0.6" />
    </svg>
  );
}

function PackageIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="M3.27 6.96 12 12.01l8.73-5.05" />
      <path d="M12 22.08V12" />
    </svg>
  );
}

function LayersIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 12.18-9.17 4.18a2 2 0 0 1-1.66 0L2 12.18" />
      <path d="m22 17.18-9.17 4.18a2 2 0 0 1-1.66 0L2 17.18" />
    </svg>
  );
}

function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function FilterIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
    </svg>
  );
}

function ChevronIcon({ className = '' }: { className?: string }) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
