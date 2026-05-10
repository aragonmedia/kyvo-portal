'use client';

import type { FilterCategory } from '@/lib/types';

const PILLS: FilterCategory[] = [
  'All Brands',
  'Health',
  'Beauty',
  'Skincare',
  'Pet',
  'Trending',
  'Higher Commission',
];

interface Props {
  active: FilterCategory;
  onChange: (next: FilterCategory) => void;
  counts?: Partial<Record<FilterCategory, number>>;
}

export function FilterPills({ active, onChange, counts }: Props) {
  return (
    <div className="px-4 mt-5">
      <div className="mx-auto max-w-7xl">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1
                        sm:flex-wrap sm:justify-center">
          {PILLS.map((pill) => {
            const isActive = pill === active;
            const count = counts?.[pill];
            return (
              <button
                key={pill}
                onClick={() => onChange(pill)}
                className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full
                            text-sm font-medium transition-all duration-200
                            border
                            ${
                              isActive
                                ? 'bg-gradient-to-r from-kyvo-violet to-kyvo-magenta text-white border-transparent shadow-[0_4px_24px_rgba(123,63,228,0.4)]'
                                : 'bg-kyvo-surface/60 text-kyvo-muted border-kyvo-border hover:text-white hover:border-kyvo-violet/60'
                            }`}
              >
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
      </div>
    </div>
  );
}
