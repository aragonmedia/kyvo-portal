import type { Brand } from '@/lib/types';

interface Props {
  brand: Brand;
  onClick: () => void;
}

export function BrandCard({ brand, onClick }: Props) {
  // 🔥 shown on every MAX-tier brand or any brand explicitly marked trending
  const isMax = brand.maxTier === true;
  const fire = isMax || brand.trending === true;
  // Headline rate shown on the card: prefer MAX (the marketing top number);
  // otherwise show the actual click-through commissionRate.
  const headlineRate = isMax ? (brand.maxCommission ?? brand.commissionRate) : brand.commissionRate;

  return (
    <button
      onClick={onClick}
      className={`group relative text-left rounded-2xl
                  bg-kyvo-surface/70 hover:bg-kyvo-elevated
                  border ${isMax ? 'border-kyvo-magenta/40' : 'border-kyvo-border'}
                  hover:border-kyvo-magenta/60
                  p-4 sm:p-5
                  transition-all duration-200
                  shadow-kyvo-card hover:shadow-kyvo-card-hover
                  hover:-translate-y-0.5`}
    >
      {fire && (
        <span
          className="absolute top-2.5 right-2.5 text-base sm:text-lg
                     drop-shadow-[0_0_8px_rgba(255,107,0,0.8)]"
          aria-label={isMax ? 'MAX commission tier' : 'Trending'}
        >
          🔥
        </span>
      )}

      {/* Top-left indicator stack: NEW + Sample + Renewable pips (stackable) */}
      <div className="absolute top-2.5 left-2.5 flex flex-col items-start gap-1">
        {brand.isNew && (
          <span
            className="px-1.5 py-0.5 rounded-md
                       text-[9px] sm:text-[10px] font-bold uppercase tracking-wider
                       bg-kyvo-cyan/15 text-kyvo-cyan border border-kyvo-cyan/40
                       shadow-[0_0_12px_rgba(var(--kyvo-cyan-rgb),_0.35)]"
            title="Newly added brand"
          >
            NEW
          </span>
        )}
        {brand.samplesIncluded && (
          <span
            className="px-1.5 py-0.5 rounded-md
                       text-[9px] sm:text-[10px] font-bold uppercase tracking-wider
                       bg-kyvo-green/15 text-kyvo-green border border-kyvo-green/30"
            title="Samples included"
          >
            Sample
          </span>
        )}
        {brand.expiresAt && (
          <span
            className="px-1.5 py-0.5 rounded-md
                       text-[9px] sm:text-[10px] font-bold uppercase tracking-wider
                       bg-amber-400/15 text-amber-300 border border-amber-400/30"
            title={`Campaign expires ${brand.expiresAt} — renewable`}
          >
            Until {formatExpiresShort(brand.expiresAt)}
          </span>
        )}
      </div>

      <div className="flex flex-col items-center text-center gap-3 mt-2">
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
            <span>{headlineRate}%{isMax && <span className="text-[9px] ml-0.5 text-kyvo-magenta">MAX</span>}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

/** Format an ISO date string (YYYY-MM-DD) as 'Jun 26' style */
function formatExpiresShort(isoDate: string): string {
  try {
    const d = new Date(`${isoDate}T00:00:00`);
    if (Number.isNaN(d.getTime())) return isoDate;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return isoDate;
  }
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
