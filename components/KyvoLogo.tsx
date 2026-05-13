import Image from 'next/image';

/**
 * Kyvo logo. Uses the real galaxy logo at /public/kyvo-logo.png.
 * Default wordmark is "Powered by Kyvo" — two-line typographic treatment
 * with "Powered by" smaller and muted, "Kyvo" bold and white.
 *
 * Props:
 *   size          — logo icon size in px (default 36)
 *   showWordmark  — show the text next to the icon (default true)
 *   variant       — "powered" (default) | "wordmark" (just 'kyvo') | "full" (Kyvo wordmark only)
 */
export function KyvoLogo({
  size = 36,
  showWordmark = true,
  variant = 'powered',
}: {
  size?: number;
  showWordmark?: boolean;
  variant?: 'powered' | 'wordmark' | 'full';
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="relative shrink-0 rounded-xl overflow-hidden ring-1 ring-white/10
                   shadow-[0_0_18px_rgba(123,63,228,0.35)]"
        style={{ width: size, height: size }}
      >
        <Image
          src="/kyvo-logo.png"
          alt="Kyvo"
          width={size * 2}
          height={size * 2}
          priority
          className="w-full h-full object-cover"
        />
      </div>

      {showWordmark && variant === 'powered' && (
        <div className="flex flex-col leading-none">
          <span
            className="text-[10px] uppercase tracking-[0.18em] text-kyvo-muted font-medium"
            style={{ lineHeight: 1 }}
          >
            Powered by
          </span>
          <span
            className="font-display text-lg font-bold tracking-tight text-white mt-0.5"
            style={{ lineHeight: 1 }}
          >
            Kyvo
          </span>
        </div>
      )}

      {showWordmark && variant === 'wordmark' && (
        <span className="font-display text-xl font-bold tracking-tight text-white">
          kyvo
        </span>
      )}

      {showWordmark && variant === 'full' && (
        <span className="font-display text-xl font-bold tracking-tight text-white">
          Kyvo
        </span>
      )}
    </div>
  );
}
