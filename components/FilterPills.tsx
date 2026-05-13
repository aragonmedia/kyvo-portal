'use client';

import type { FilterCategory } from '@/lib/types';

const PILLS: FilterCategory[] = [
  'All Brands',
  'MAX Commissions',
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

  return (
    <div className="px-4 mt-5">
      <div className="mx-auto max-w-7xl">
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
                className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full
                            text-sm font-medium transition-all duration-200
                            border
                            ${
                              isActive
                                ? isHighlightPill
                                  ? 'bg-gradient-to-r from-kyvo-magenta to-kyvo-pink text-white border-transparent shadow-[0_4px_24px_rgba(233,75,193,0.45)]'
                                  : 'bg-gradient-to-r from-kyvo-violet to-kyvo-magenta text-white border-transparent shadow-[0_4px_24px_rgba(123,63,228,0.4)]'
                                : isHighlightPill
                                  ? 'bg-kyvo-surface/60 text-kyvo-magenta border-kyvo-magenta/30 hover:border-kyvo-magenta/70 hover:bg-kyvo-magenta/10'
                                  : 'bg-kyvo-surface/60 text-kyvo-muted border-kyvo-border hover:text-white hover:border-kyvo-violet/60'
                            }`}
              >
                {pill === 'MAX Commissions' && <FireIcon />}
                {pill === 'Samples Included' && <PackageIcon />}
                {pill}
                {typeof count === 'number' && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full
                                ${
                                  isActive
                                    ? 'bg-white/25 text-white'
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

        {/* Hint: multi-select */}
        {active.size > 0 && !active.has('All Brands') && (
          <div className="mt-2 text-center text-[11px] text-kyvo-muted">
            Tap multiple filters to layer them. Tap a pill again to remove it.
          </div>
        )}
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
