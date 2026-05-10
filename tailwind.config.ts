import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Kyvo galaxy palette — sampled from logo
        kyvo: {
          // Backgrounds
          void: '#05030F',        // deepest cosmic black
          deep: '#0A0820',        // primary background
          surface: '#100D2C',     // card surface
          elevated: '#181438',    // hover / elevated surface
          border: '#241D52',      // subtle borders

          // Brand gradient stops
          violet: '#7B3FE4',
          purple: '#9D4EDD',
          magenta: '#E94BC1',
          pink: '#FF6BCB',
          cyan: '#5CC8FF',
          blue: '#4A8DFF',

          // Accents
          green: '#22F5A3',       // commission / link count
          greenDeep: '#0FCB7E',

          // Text
          text: '#F5F2FF',
          muted: '#8A87B4',
          dim: '#5A567E',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'kyvo-gradient': 'linear-gradient(135deg, #5CC8FF 0%, #7B3FE4 50%, #E94BC1 100%)',
        'kyvo-gradient-soft': 'linear-gradient(135deg, rgba(92,200,255,0.18) 0%, rgba(123,63,228,0.18) 50%, rgba(233,75,193,0.18) 100%)',
        'kyvo-radial': 'radial-gradient(ellipse at top, rgba(123,63,228,0.25) 0%, transparent 60%)',
      },
      boxShadow: {
        'kyvo-glow': '0 0 40px rgba(123, 63, 228, 0.35), 0 0 80px rgba(233, 75, 193, 0.15)',
        'kyvo-card': '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(123, 63, 228, 0.12)',
        'kyvo-card-hover': '0 12px 48px rgba(123, 63, 228, 0.35), 0 0 0 1px rgba(233, 75, 193, 0.4)',
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
          '0%, 100%': { boxShadow: '0 0 20px rgba(123,63,228,0.35), 0 0 40px rgba(233,75,193,0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(123,63,228,0.6), 0 0 80px rgba(233,75,193,0.35)' },
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
