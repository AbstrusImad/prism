import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          base: '#eef0f4',
          raised: '#f5f7fa',
          sunken: '#e4e7ec',
          hover: '#f0f2f6',
        },
        text: {
          primary: '#1a1d26',
          secondary: '#4a5068',
          tertiary: '#7a8099',
          muted: '#a0a6b8',
        },
        accent: {
          lavender: '#a78bfa',
          rose: '#f472b6',
          peach: '#fb923c',
          mint: '#34d399',
          sky: '#60a5fa',
        },
        border: {
          subtle: 'rgba(0,0,0,0.06)',
          medium: 'rgba(0,0,0,0.10)',
          strong: 'rgba(0,0,0,0.16)',
        },
        semantic: {
          success: '#34d399',
          warning: '#fbbf24',
          danger: '#f87171',
          info: '#60a5fa',
        },
      },
      fontFamily: {
        display: ['Manrope', 'system-ui', 'sans-serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      borderRadius: {
        neumorphic: '20px',
        'neumorphic-lg': '28px',
        'neumorphic-xl': '36px',
      },
      boxShadow: {
        neumorphic: '8px 8px 16px rgba(163,170,188,0.35), -8px -8px 16px rgba(255,255,255,0.85)',
        'neumorphic-sm': '4px 4px 8px rgba(163,170,188,0.3), -4px -4px 8px rgba(255,255,255,0.8)',
        'neumorphic-inset': 'inset 4px 4px 8px rgba(163,170,188,0.25), inset -4px -4px 8px rgba(255,255,255,0.7)',
        'neumorphic-inset-lg': 'inset 6px 6px 12px rgba(163,170,188,0.3), inset -6px -6px 12px rgba(255,255,255,0.75)',
        'neumorphic-hover': '10px 10px 20px rgba(163,170,188,0.4), -10px -10px 20px rgba(255,255,255,0.9)',
      },
      keyframes: {
        'prism-breathe': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.02)' },
        },
        'beam-sweep': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'float-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'refract': {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
      },
      animation: {
        'prism-breathe': 'prism-breathe 6s ease-in-out infinite',
        'beam-sweep': 'beam-sweep 20s linear infinite',
        'float-up': 'float-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-left': 'slide-in-left 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'refract': 'refract 12s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
