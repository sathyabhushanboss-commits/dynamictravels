/** @type {import('tailwindcss').Config} */
// Dynamic Travels theme — orange (logo), cream and sky blue.
// The original token names (asphalt / route / amber / paper / mist) are kept
// and re-pointed at the new palette, so every existing page (booking, cars,
// admin, legal) picks up the new theme automatically.
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // --- brand palette ---
        brand: {
          DEFAULT: '#E67817', // logo orange
          dark: '#C2600B',
          light: '#F59E42',
          50: '#FFF4E8',
          100: '#FDE6CC',
        },
        cream: {
          DEFAULT: '#FFF8EE',
          deep: '#FCEBD3',
          line: '#F1DFC6',
        },
        sky: {
          DEFAULT: '#0EA5E9',
          deep: '#0369A1',
          light: '#7DD3FC',
          soft: '#E6F6FE',
        },
        ink: {
          DEFAULT: '#0F2A3D',
          soft: '#3F5566',
          mute: '#6B7C89',
        },
        // --- legacy tokens, remapped ---
        asphalt: {
          DEFAULT: '#0F2A3D',
          light: '#164560',
          soft: '#1E5573',
        },
        route: {
          teal: '#0284C7',
          green: '#16A34A',
        },
        amber: {
          DEFAULT: '#E67817',
          dark: '#C2600B',
        },
        paper: '#FFFDF8',
        mist: '#EAF6FD',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      backgroundImage: {
        'route-gradient': 'linear-gradient(120deg, #0284C7 0%, #0EA5E9 100%)',
        'asphalt-gradient': 'linear-gradient(160deg, #0B2233 0%, #0F3A55 55%, #0369A1 100%)',
        'brand-gradient': 'linear-gradient(120deg, #E67817 0%, #F59E42 100%)',
        'sky-gradient': 'linear-gradient(135deg, #0369A1 0%, #0EA5E9 60%, #7DD3FC 100%)',
        'cream-gradient': 'linear-gradient(180deg, #FFF8EE 0%, #FFFFFF 100%)',
      },
      boxShadow: {
        ticket: '0 20px 45px -18px rgba(15,42,61,0.30)',
        lift: '0 34px 70px -28px rgba(15,42,61,0.45)',
        glow: '0 0 0 1px rgba(255,255,255,0.06), 0 24px 60px -24px rgba(14,165,233,0.55)',
        soft: '0 10px 40px -12px rgba(15,42,61,0.18)',
        brand: '0 18px 40px -14px rgba(230,120,23,0.55)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        kenburns: { '0%': { transform: 'scale(1.08)' }, '100%': { transform: 'scale(1)' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        marqueeReverse: { '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0)' } },
        wiggle: { '0%,100%': { transform: 'rotate(-6deg)' }, '50%': { transform: 'rotate(6deg)' } },
        pulseRing: { '0%': { transform: 'scale(.9)', opacity: '.7' }, '100%': { transform: 'scale(1.6)', opacity: '0' } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        kenburns: 'kenburns 7s ease-out forwards',
        marquee: 'marquee 40s linear infinite',
        'marquee-slow': 'marquee 55s linear infinite',
        'marquee-reverse': 'marqueeReverse 55s linear infinite',
        wiggle: 'wiggle 2.4s ease-in-out infinite',
        'pulse-ring': 'pulseRing 1.8s ease-out infinite',
      },
    },
  },
  plugins: [],
};
