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

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterCategory>('All Brands');
  const [openBrand, setOpenBrand] = useState<Brand | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return brands.filter((brand) => {
      // Filter pill
      if (filter === 'Trending' && !brand.trending) return false;
      if (filter === 'Higher Commission' && !brand.highCommission) return false;
      if (
        ['Health', 'Beauty', 'Skincare', 'Pet'].includes(filter) &&
        brand.niche !== filter
      ) {
        return false;
      }

      // Search across brand name + product names
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
  }, [search, filter]);

  // Per-pill counts (respect search but not other filters)
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
      Health: filteredBySearch.filter((b) => b.niche === 'Health').length,
      Beauty: filteredBySearch.filter((b) => b.niche === 'Beauty').length,
      Skincare: filteredBySearch.filter((b) => b.niche === 'Skincare').length,
      Pet: filteredBySearch.filter((b) => b.niche === 'Pet').length,
      Trending: filteredBySearch.filter((b) => b.trending).length,
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

        <FilterPills active={filter} onChange={setFilter} counts={counts} />

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
