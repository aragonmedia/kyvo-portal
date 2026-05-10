import type { Brand } from '@/lib/types';
import { BrandCard } from './BrandCard';

interface Props {
  brands: Brand[];
  total: number;
  onBrandClick: (brand: Brand) => void;
}

export function BrandGrid({ brands, total, onBrandClick }: Props) {
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
        ) : (
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
        )}
      </div>
    </section>
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
