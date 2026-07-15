import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Rajdhani', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace']
      },
      colors: {
        void: '#05020a',
        ember: '#ff6a3d',
        coral: '#ff3f6c',
        plasma: '#7c3cff',
        signal: '#ffd2bf'
      },
      boxShadow: {
        glow: '0 0 34px rgba(255, 106, 61, 0.35)'
      }
    }
  },
  plugins: []
} satisfies Config;
