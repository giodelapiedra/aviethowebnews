/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2.5rem',
        xl: '3rem',
      },
      screens: {
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0A0A',
          50: '#F6F6F6',
          100: '#E7E7E7',
          200: '#C2C2C2',
          300: '#9A9A9A',
          400: '#6B6B6B',
          500: '#3D3D3D',
          600: '#262626',
          700: '#1A1A1A',
          800: '#101010',
          900: '#0A0A0A',
          950: '#050505',
        },
        bone: {
          DEFAULT: '#F5F1EA',
          50: '#FBF9F5',
          100: '#F5F1EA',
          200: '#E8E1D2',
        },
        gold: {
          DEFAULT: '#C8A45C',
          50: '#FAF3E1',
          100: '#F1E2B6',
          200: '#E3C880',
          300: '#D4B16A',
          400: '#C8A45C',
          500: '#B08846',
          600: '#8F6B35',
          700: '#6E5128',
        },
        crimson: {
          DEFAULT: '#9B1B30',
          50: '#FBE7EA',
          100: '#F2B8C0',
          200: '#D85F71',
          300: '#B83045',
          400: '#9B1B30',
          500: '#7A1525',
          600: '#5C0F1B',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', '"Times New Roman"', 'serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        read: ['Lora', 'Charter', 'Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['clamp(3.5rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-xl': ['clamp(2.75rem, 6vw, 5rem)', { lineHeight: '1', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(2rem, 4.5vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        eyebrow: ['0.75rem', { lineHeight: '1', letterSpacing: '0.22em' }],
      },
      letterSpacing: {
        widest: '0.25em',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fadeIn 1s ease-out both',
        'marquee': 'marquee 40s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.08 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
      boxShadow: {
        'editorial': '0 30px 80px -40px rgba(0,0,0,0.7)',
      },
    },
  },
  plugins: [],
};
