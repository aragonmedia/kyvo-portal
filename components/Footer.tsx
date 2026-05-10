import { KyvoLogo } from './KyvoLogo';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-kyvo-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10
                      flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start gap-2">
          <KyvoLogo size={28} />
          <div className="text-xs text-kyvo-dim">
            Kyvo · TikTok Shop Affiliate Community
          </div>
        </div>

        <div className="flex items-center gap-5 text-sm">
          <a
            href="https://discord.gg/kyvo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-kyvo-muted hover:text-white transition-colors"
          >
            Discord
          </a>
          <span className="text-kyvo-dim">·</span>
          <span className="text-kyvo-dim text-xs">
            © {new Date().getFullYear()} Kyvo
          </span>
        </div>
      </div>
    </footer>
  );
}
