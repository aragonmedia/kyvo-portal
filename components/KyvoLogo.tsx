import Image from 'next/image';

/**
 * Kyvo logo. Uses the real galaxy logo at /public/kyvo-logo.png.
 * The image already has a galaxy background, so we render it as a rounded
 * square (no extra background needed). Add a wordmark beside it.
 */
export function KyvoLogo({ size = 36, showWordmark = true }: { size?: number; showWordmark?: boolean }) {
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
      {showWordmark && (
        <span className="font-display text-xl font-bold tracking-tight text-white">
          kyvo
        </span>
      )}
    </div>
  );
}
