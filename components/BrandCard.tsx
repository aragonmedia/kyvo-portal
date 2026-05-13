import type { Brand } from '@/lib/types';

interface Props {
  brand: Brand;
  onClick: () => void;
}

export function BrandCard({ brand, onClick }: Props) {
  // 🔥 reserved for genuinely trending brands only (set `trending: true` sparingly in data/brands.ts)
  const fire = brand.trending;

  return (
    <button
      onClick={onClick}
      className={`group relative text-left rounded-2xl
                  bg-kyvo-surface/70 hover:bg-kyvo-elevated
                  border border-kyvo-border hover:border-kyvo-magenta/50
                  p-4 sm:p-5
                  transition-all duration-200
                  shadow-kyvo-card hover:shadow-kyvo-card-hover
                  hover:-translate-y-0.5`}
    >
      {fire && (
        <span className="absolute top-2.5 right-2.5 text-base sm:text-lg
                         drop-shadow-[0_0_8px_rgba(255,107,0,0.8)]">
          🔥
        </span>
      )}

      <div className="flex flex-col items-center text-center gap-3">
        <BrandTile brand={brand} />

        <div className="space-y-1">
          <div className="font-display font-bold text-sm sm:text-base text-white
                          leading-tight line-clamp-2">
            {brand.name}
          </div>
          <div className="text-xs font-semibold text-kyvo-green
                          flex items-center justify-center gap-1.5">
            <span>{brand.links.length} {brand.links.length === 1 ? 'link' : 'links'}</span>
            <span className="text-kyvo-dim">·</span>
            <span>{brand.commissionRate}%</span>
          </div>
        </div>
      </div>
    </button>
  );
}

function BrandTile({ brand }: { brand: Brand }) {
  if (brand.logo) {
    return (
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white p-1.5
                      flex items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={brand.logo}
          alt={brand.name}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  const tile = brand.logoTile ?? { bg: '#1A1838', fg: '#5CC8FF', initials: brand.name.slice(0, 2).toUpperCase() };

  return (
    <div
      className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl
                 flex items-center justify-center
                 font-display font-bold text-lg
                 border border-white/10"
      style={{ background: tile.bg, color: tile.fg }}
    >
      {tile.initials}
    </div>
  );
}
