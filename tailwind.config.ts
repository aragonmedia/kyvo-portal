import type { Config } from 'tailwindcss';

/**
 * Color tokens read from CSS variables so each tenant can override the
 * palette without forking every component. Defaults are defined in
 * app/globals.css (Kyvo galaxy palette); per-tenant overrides are injected
 * by app/layout.tsx based on the active tenant config.
 *
 * Each brand color has BOTH a hex variable (for solid fills) and an
 * R,G,B triplet variable (for rgba() shadows + gradient overlays). Keep
 * the two in sync when editing globals.css.
 */
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        kyvo: {
          // Backgrounds
          void: 'var(--kyvo-void)',
          deep: 'var(--kyvo-deep)',
          surface: 'var(--kyvo-surface)',
          elevated: 'var(--kyvo-elevated)',
          border: 'var(--kyvo-border)',

          // Brand gradient stops
          violet: 'var(--kyvo-violet)',
          purple: 'var(--kyvo-purple)',
          magenta: 'var(--kyvo-magenta)',
          pink: 'var(--kyvo-pink)',
          cyan: 'var(--kyvo-cyan)',
          blue: 'var(--kyvo-blue)',

          // Accents
          green: 'var(--kyvo-green)',
          greenDeep: 'var(--kyvo-green-deep)',

          // Text
          text: 'var(--kyvo-text)',
          muted: 'var(--kyvo-muted)',
          dim: 'var(--kyvo-dim)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'kyvo-gradient':
          'linear-gradient(135deg, var(--kyvo-cyan) 0%, var(--kyvo-violet) 50%, var(--kyvo-magenta) 100%)',
        'kyvo-gradient-soft':
          'linear-gradient(135deg, rgba(var(--kyvo-cyan-rgb), 0.18) 0%, rgba(var(--kyvo-violet-rgb), 0.18) 50%, rgba(var(--kyvo-magenta-rgb), 0.18) 100%)',
        'kyvo-radial':
          'radial-gradient(ellipse at top, rgba(var(--kyvo-violet-rgb), 0.25) 0%, transparent 60%)',
      },
      boxShadow: {
        'kyvo-glow':
          '0 0 40px rgba(var(--kyvo-violet-rgb), 0.35), 0 0 80px rgba(var(--kyvo-magenta-rgb), 0.15)',
        'kyvo-card':
          '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(var(--kyvo-violet-rgb), 0.12)',
        'kyvo-card-hover':
          '0 12px 48px rgba(var(--kyvo-violet-rgb), 0.35), 0 0 0 1px rgba(var(--kyvo-magenta-rgb), 0.4)',
        'kyvo-fire': '0 0 24px rgba(255, 107, 0, 0.45), 0 0 0 1px rgba(255, 107, 0, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'twinkle': 'twinkle 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': {
            boxShadow:
              '0 0 20px rgba(var(--kyvo-violet-rgb), 0.35), 0 0 40px rgba(var(--kyvo-magenta-rgb), 0.2)',
          },
          '50%': {
            boxShadow:
              '0 0 40px rgba(var(--kyvo-violet-rgb), 0.6), 0 0 80px rgba(var(--kyvo-magenta-rgb), 0.35)',
          },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
