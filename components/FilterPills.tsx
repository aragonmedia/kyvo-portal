'use client';

import type { FilterCategory } from '@/lib/types';

/**
 * Pill order — MAX Commissions sits LEFTMOST (most prominent, easy to find).
 * "All Brands" sits second as the default/reset state.
 * Mobile-first: horizontal scroll on narrow viewports, wraps on sm+.
 */
const PILLS: FilterCategory[] = [
  'MAX Commissions',  // ← leftmost, most prominent
  'All Brands',
  'Samples Included',
  'Health',
  'Beauty',
  'Skincare',
  'Pet',
  'Trending',
  'Higher Commission',
];

interface Props {
  active: Set<FilterCategory>;
  onToggle: (pill: FilterCategory) => void;
  counts?: Partial<Record<FilterCategory, number>>;
}

export function FilterPills({ active, onToggle, counts }: Props) {
  const allActive = active.has('All Brands') || active.size === 0;
  // Count of non-default active filters — used to surface the multi-select hint
  const activeFilterCount = active.has('All Brands')
    ? 0
    : Array.from(active).filter((p) => p !== 'All Brands').length;

  return (
    <div className="px-4 mt-5">
      <div className="mx-auto max-w-7xl">
        {/* Multi-select hint banner — only shows when no filters yet,
            so users understand they can stack pills */}
        {activeFilterCount === 0 && (
          <div className="mb-2 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-kyvo-muted">
            <LayersIcon className="w-3 h-3 text-kyvo-magenta" />
            <span>Tap multiple pills to layer filters</span>
          </div>
        )}

        {/* Active-filters bar — shows when 1+ filter is on */}
        {activeFilterCount > 0 && (
          <div className="mb-2 flex flex-wrap items-center justify-center gap-2 text-[11px] sm:text-xs">
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

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1
                        sm:flex-wrap sm:justify-center">
          {PILLS.map((pill) => {
            const isAll = pill === 'All Brands';
            const isActive = isAll ? allActive : active.has(pill);
            const isHighlightPill =
              pill === 'MAX Commissions' || pill === 'Samples Included';
            const count = counts?.[pill];

            return (
              <button
                key={pill}
                onClick={() => onToggle(pill)}
                aria-pressed={isActive}
                className={`shrink-0 inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 rounded-full
                            text-xs sm:text-sm font-semibold transition-all duration-200
                            border
                            ${
                              isActive
                                ? isHighlightPill
                                  ? 'bg-gradient-to-r from-kyvo-magenta to-kyvo-pink text-white border-transparent shadow-[0_4px_24px_rgba(233,75,193,0.45)]'
                                  : 'bg-gradient-to-r from-kyvo-violet to-kyvo-magenta text-white border-transparent shadow-[0_4px_24px_rgba(123,63,228,0.4)]'
                                : isHighlightPill
                                  ? 'bg-kyvo-magenta/8 text-kyvo-magenta border-kyvo-magenta/40 hover:border-kyvo-magenta/80 hover:bg-kyvo-magenta/15'
                                  : 'bg-kyvo-surface/60 text-kyvo-muted border-kyvo-border hover:text-white hover:border-kyvo-violet/60'
                            }`}
              >
                {/* Check icon when active (makes selectedness unmistakable) */}
                {isActive && !isAll && (
                  <CheckIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                )}
                {pill === 'MAX Commissions' && !isActive && <FireIcon />}
                {pill === 'Samples Included' && !isActive && <PackageIcon />}
                {pill}
                {typeof count === 'number' && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full
                                ${
                                  isActive
                                    ? 'bg-white/25 text-white'
                                    : isHighlightPill
                                      ? 'bg-kyvo-magenta/20 text-kyvo-magenta'
                                      : 'bg-kyvo-elevated text-kyvo-dim'
                                }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FireIcon() {
  return (
    <span className="text-xs leading-none" aria-hidden>
      🔥
    </span>
  );
}

function PackageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3.5 h-3.5"
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
