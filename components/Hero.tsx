export function Hero() {
  return (
    <section className="relative pt-12 pb-6 sm:pt-16 sm:pb-8 px-4">
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full
                        border border-kyvo-border/60 bg-kyvo-surface/40
                        text-xs font-medium text-kyvo-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-kyvo-green animate-pulse" />
          Boosted commissions live now
        </div>

        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl
                       leading-[1.05] tracking-tight">
          <span className="text-white">Higher Commissions.</span>
          <br />
          <span className="text-gradient">One Tap Away.</span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-kyvo-muted max-w-xl mx-auto">
          Browse partnered brands. Tap product links. Earn boosted TikTok Shop
          commissions instantly.
        </p>
      </div>
    </section>
  );
}
