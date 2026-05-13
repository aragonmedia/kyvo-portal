'use client';

import { useMemo, useState } from 'react';
import { brands, priorityBrands } from '@/data/brands';
import type { Brand, FilterCategory } from '@/lib/types';

import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { BannerSlideshow } from '@/components/BannerSlideshow';
import { SearchBar } from '@/components/SearchBar';
import { FilterPills } from '@/components/FilterPills';
import { BrandGrid } from '@/components/BrandGrid';
import { BrandModal } from '@/components/BrandModal';
import { LockedTier } from '@/components/LockedTier';
import { Footer } from '@/components/Footer';

const NICHE_FILTERS: FilterCategory[] = ['Health', 'Beauty', 'Skincare', 'Pet'];

export default function HomePage() {
  const [search, setSearch] = useState('');
  // Multi-select filter set. Empty = show everything.
  const [active, setActive] = useState<Set<FilterCategory>>(
    () => new Set<FilterCategory>(['All Brands']),
  );
  const [openBrand, setOpenBrand] = useState<Brand | null>(null);

  /** Toggle a pill on/off. 'All Brands' is exclusive — selecting it clears others. */
  function toggle(pill: FilterCategory) {
    setActive((prev) => {
      const next = new Set(prev);
      if (pill === 'All Brands') {
        // Selecting "All" clears every other pill
        return new Set<FilterCategory>(['All Brands']);
      }
      // Selecting any other pill removes 'All Brands' from the set
      next.delete('All Brands');
      if (next.has(pill)) {
        next.delete(pill);
      } else {
        next.add(pill);
      }
      if (next.size === 0) {
        // No pills selected → fall back to "All Brands"
        next.add('All Brands');
      }
      return next;
    });
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const allMode = active.has('All Brands');

    // Within niches → OR.   Across other filters → AND.
    const selectedNiches = NICHE_FILTERS.filter((n) => active.has(n));
    const wantMax = active.has('MAX Commissions');
    const wantSamples = active.has('Samples Included');
    const wantTrending = active.has('Trending');
    const wantHigher = active.has('Higher Commission');

    return brands.filter((brand) => {
      if (!allMode) {
        if (selectedNiches.length > 0 && !selectedNiches.includes(brand.niche as FilterCategory)) {
          return false;
        }
        if (wantMax && brand.commissionRate < 50) return false;
        if (wantSamples && !brand.samplesIncluded) return false;
        if (wantTrending && !(brand.trending || brand.commissionRate >= 50)) return false;
        if (wantHigher && !brand.highCommission) return false;
      }

      if (q) {
        const hay = [
          brand.name,
          brand.niche,
          ...brand.links.map((l) => l.productName),
        ]
          .join(' ')
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [search, active]);

  // Per-pill counts (respect search, ignore other filters)
  const counts = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filteredBySearch = q
      ? brands.filter((b) =>
          [b.name, b.niche, ...b.links.map((l) => l.productName)]
            .join(' ')
            .toLowerCase()
            .includes(q),
        )
      : brands;

    return {
      'All Brands': filteredBySearch.length,
      'MAX Commissions': filteredBySearch.filter((b) => b.commissionRate >= 50).length,
      'Samples Included': filteredBySearch.filter((b) => b.samplesIncluded).length,
      Health: filteredBySearch.filter((b) => b.niche === 'Health').length,
      Beauty: filteredBySearch.filter((b) => b.niche === 'Beauty').length,
      Skincare: filteredBySearch.filter((b) => b.niche === 'Skincare').length,
      Pet: filteredBySearch.filter((b) => b.niche === 'Pet').length,
      Trending: filteredBySearch.filter((b) => b.trending || b.commissionRate >= 50).length,
      'Higher Commission': filteredBySearch.filter((b) => b.highCommission).length,
    } as const;
  }, [search]);

  return (
    <>
      <Header />

      <main className="relative pb-10">
        <Hero />

        <BannerSlideshow
          brands={priorityBrands}
          onBrandClick={(b) => setOpenBrand(b)}
        />

        <SearchBar value={search} onChange={setSearch} />

        <FilterPills active={active} onToggle={toggle} counts={counts} />

        <BrandGrid
          brands={filtered}
          total={brands.length}
          onBrandClick={(b) => setOpenBrand(b)}
        />

        <LockedTier />
      </main>

      <Footer />

      <BrandModal brand={openBrand} onClose={() => setOpenBrand(null)} />
    </>
  );
}
