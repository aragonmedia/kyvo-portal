import { tenant, ctaProps } from '@/lib/tenant';

export function LockedTier() {
  return (
    <section className="px-4 mt-12 sm:mt-16">
      <div className="mx-auto max-w-7xl">
        <a
          {...ctaProps(tenant.ticketUrl)}
          className="group relative block overflow-hidden rounded-3xl
                     border border-kyvo-border hover:border-kyvo-magenta/60
                     bg-kyvo-surface/60
                     transition-all duration-500
                     animate-pulse-glow"
        >
          {/* Animated gradient backdrop */}
          <div
            className="absolute inset-0 opacity-90"
            style={{
              background:
                'radial-gradient(ellipse 70% 80% at 30% 50%, rgba(var(--kyvo-violet-rgb), 0.35) 0%, transparent 60%), radial-gradient(ellipse 60% 70% at 80% 60%, rgba(var(--kyvo-magenta-rgb), 0.30) 0%, transparent 60%), linear-gradient(135deg, var(--kyvo-deep) 0%, var(--kyvo-surface) 100%)',
            }}
          />

          {/* Starfield */}
          <div
            className="absolute inset-0 opacity-60 mix-blend-screen"
            style={{
              backgroundImage:
                'radial-gradient(1px 1px at 18% 22%, white, transparent), radial-gradient(1px 1px at 73% 31%, white, transparent), radial-gradient(1.5px 1.5px at 45% 78%, white, transparent), radial-gradient(1px 1px at 88% 65%, white, transparent), radial-gradient(1px 1px at 12% 84%, var(--kyvo-cyan), transparent), radial-gradient(1px 1px at 60% 12%, var(--kyvo-pink), transparent)',
            }}
          />

          {/* Diagonal lock-grid texture */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, white 0 1px, transparent 1px 14px)',
            }}
          />

          {/* Content */}
          <div className="relative p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Lock icon with glow */}
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-kyvo-magenta/40 blur-2xl" />
              <div className="relative w-20 h-20 rounded-2xl
                              bg-gradient-to-br from-kyvo-violet via-kyvo-purple to-kyvo-magenta
                              flex items-center justify-center
                              shadow-kyvo-glow
                              group-hover:scale-105 transition-transform duration-300">
                <LockIcon className="w-10 h-10 text-white" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                              bg-white/10 border border-white/20 text-[10px] sm:text-xs
                              font-bold uppercase tracking-[0.2em] text-white">
                <SparkleIcon className="w-3 h-3 text-kyvo-green" />
                Locked Tier
              </div>
              <h3 className="mt-3 font-display font-bold text-2xl sm:text-3xl md:text-4xl
                             text-white leading-tight">
                Unlock <span className="text-gradient">MAX Commissions</span>
              </h3>
              <p className="mt-2 text-sm sm:text-base text-white/75 max-w-xl">
                Top creators get priority access to our highest-paying partnerships.
                Click to unlock the MAX tier and apply for boosted rates.
              </p>
            </div>

            <div className="shrink-0 inline-flex items-center gap-2
                            px-5 py-3 rounded-full
                            bg-white text-kyvo-deep
                            font-display font-bold text-sm sm:text-base
                            shadow-lg
                            group-hover:scale-105 transition-transform duration-300">
              Click to Unlock
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}

function LockIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         className={className} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function SparkleIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2 14 10 22 12 14 14 12 22 10 14 2 12 10 10z" />
    </svg>
  );
}

function ArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
         className={className} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
