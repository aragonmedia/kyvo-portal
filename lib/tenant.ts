/**
 * Resolves the active tenant from the NEXT_PUBLIC_TENANT environment variable.
 *
 * NEXT_PUBLIC_TENANT is read at BUILD time and inlined into the client bundle
 * by Next.js — so each Vercel deployment ships with its own tenant baked in.
 * No runtime feature flag, no slow header sniff, no per-request branching.
 *
 * Usage in a component:
 *   import { tenant } from '@/lib/tenant';
 *   <a href={tenant.discordUrl ?? '#'}>Discord</a>
 *
 * Add a new tenant by editing data/tenants.ts — this file doesn't need to
 * change.
 */

import { TENANTS, DEFAULT_TENANT_ID, type Tenant } from '@/data/tenants';

/** Currently-active tenant for this build. Resolved once at module load. */
export const tenant: Tenant =
  TENANTS[process.env.NEXT_PUBLIC_TENANT ?? ''] ?? TENANTS[DEFAULT_TENANT_ID];

/** Convenience: is this the Kyvo (first-party) tenant?
 *  Useful for the rare case where a UI element should only show on Kyvo,
 *  e.g. internal links or the original "Powered by Kyvo" wordmark. */
export const isKyvoTenant = tenant.id === 'kyvo';

/** Convenience: render-time guard for empty CTAs.
 *  When the active tenant has no Discord/ticket URL, we still want to
 *  render the visual button (per Kevin's call) but with href cleared. */
export function ctaProps(url: string | null): {
  href: string | undefined;
  onClick?: (e: React.MouseEvent) => void;
  rel?: string;
  target?: string;
} {
  if (!url) {
    // No-op button: render the visual but block navigation
    return {
      href: undefined,
      onClick: (e) => e.preventDefault(),
    };
  }
  return {
    href: url,
    target: '_blank',
    rel: 'noopener noreferrer',
  };
}
