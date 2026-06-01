import { KyvoLogo } from './KyvoLogo';
import { tenant, isKyvoTenant, ctaProps } from '@/lib/tenant';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-kyvo-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10
                      flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start gap-2">
          {isKyvoTenant ? (
            <KyvoLogo size={28} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={tenant.logoSrc}
              alt={tenant.brandName}
              className="h-7 sm:h-8 w-auto object-contain"
              style={{ maxWidth: tenant.logoWidth ?? 160 }}
            />
          )}
          <div className="text-xs text-kyvo-dim">
            {tenant.brandName} · TikTok Shop Affiliate Community
          </div>
        </div>

        <div className="flex items-center gap-5 text-sm">
          {/* Footer Discord link — same visual treatment whether or not the
              tenant has a Discord URL set. ctaProps returns href:undefined
              when the URL is null so tapping does nothing. */}
          <a
            {...ctaProps(tenant.discordUrl)}
            className="text-kyvo-muted hover:text-white transition-colors"
          >
            Discord
          </a>
          <span className="text-kyvo-dim">·</span>
          <span className="text-kyvo-dim text-xs">
            © {new Date().getFullYear()} {tenant.brandName}
          </span>
        </div>
      </div>
    </footer>
  );
}
