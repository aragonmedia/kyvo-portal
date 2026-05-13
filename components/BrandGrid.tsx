import type { Brand } from '@/lib/types';
import { BrandCard } from './BrandCard';

interface Props {
  brands: Brand[];
  total: number;
  /** Show MAX / BOOSTED section split (only when "All Brands" is active and no other filters) */
  showSections?: boolean;
  onBrandClick: (brand: Brand) => void;
}

export function BrandGrid({ brands, total, showSections, onBrandClick }: Props) {
  // Split brands into MAX (maxTier=true) and BOOSTED (everyone else)
  const maxBrands = brands.filter((b) => b.maxTier);
  const boostedBrands = brands.filter((b) => !b.maxTier);

  return (
    <section className="px-4 mt-8 sm:mt-10">
      <div className="mx-auto max-w-7xl">
        <div className="text-xs font-semibold uppercase tracking-widest
                        text-kyvo-dim mb-4">
          {brands.length === total
            ? `${total} ${total === 1 ? 'brand' : 'brands'}`
            : `${brands.length} of ${total} brands`}
        </div>

        {brands.length === 0 ? (
          <EmptyState />
        ) : showSections ? (
          // Split view: MAX section, then BOOSTED section
          <div className="space-y-8">
            {maxBrands.length > 0 && (
              <div>
                <SectionDivider
                  label="MAX Commissions"
                  sublabel={`${maxBrands.length} brand${maxBrands.length === 1 ? '' : 's'} · 50% locked top tier`}
                  tone="max"
                />
                <BrandRow brands={maxBrands} onBrandClick={onBrandClick} />
              </div>
            )}

            {boostedBrands.length > 0 && (
              <div>
                <SectionDivider
                  label="Boosted Brands"
                  sublabel={`${boostedBrands.length} brand${boostedBrands.length === 1 ? '' : 's'} · above open-collab rates`}
                  tone="boosted"
                />
                <BrandRow brands={boostedBrands} onBrandClick={onBrandClick} />
              </div>
            )}
          </div>
        ) : (
          // Flat view: single grid (used when a filter is applied)
          <BrandRow brands={brands} onBrandClick={onBrandClick} />
        )}
      </div>
    </section>
  );
}

/**
 * Section header + divider line between MAX and BOOSTED groups.
 * Mobile-first: stacks tighter on small viewports.
 */
function SectionDivider({
  label,
  sublabel,
  tone,
}: {
  label: string;
  sublabel: string;
  tone: 'max' | 'boosted';
}) {
  const isMax = tone === 'max';
  return (
    <div className="mb-4 sm:mb-5">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 shrink-0">
          {isMax ? (
            <span className="text-base sm:text-lg" aria-hidden>🔥</span>
          ) : (
            <BoltIcon className="w-4 h-4 sm:w-5 sm:h-5 text-kyvo-cyan" />
          )}
          <h2
            className={`font-display font-bold text-sm sm:text-base tracking-tight
                        ${isMax ? 'text-kyvo-magenta' : 'text-kyvo-cyan'}`}
          >
            {label}
          </h2>
        </div>
        <div
          className={`flex-1 h-px
                      ${isMax
                        ? 'bg-gradient-to-r from-kyvo-magenta/50 via-kyvo-magenta/20 to-transparent'
                        : 'bg-gradient-to-r from-kyvo-cyan/40 via-kyvo-cyan/15 to-transparent'}`}
        />
      </div>
      <div className="text-[10px] sm:text-xs text-kyvo-dim font-medium mt-1 ml-6 sm:ml-7">
        {sublabel}
      </div>
    </div>
  );
}

function BrandRow({
  brands,
  onBrandClick,
}: {
  brands: Brand[];
  onBrandClick: (brand: Brand) => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
                    gap-3 sm:gap-4">
      {brands.map((brand) => (
        <BrandCard
          key={brand.id}
          brand={brand}
          onClick={() => onBrandClick(brand)}
        />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16 px-4">
      <div className="text-5xl mb-3 opacity-50">🔍</div>
      <div className="text-white font-display font-bold text-lg">
        No brands match your search
      </div>
      <div className="text-kyvo-muted text-sm mt-1">
        Try a different keyword or category.
      </div>
    </div>
  );
}

function BoltIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  );
}
