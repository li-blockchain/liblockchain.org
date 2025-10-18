module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand color palette - from logo (cyan, purple, pink)
        brand: {
          cyan: {
            50: '#ecfeff',
            100: '#cffafe',
            200: '#a5f3fc',
            300: '#67e8f9',
            400: '#22d3ee',
            500: '#0099cc', // Primary logo blue
            600: '#0891b2',
            700: '#0e7490',
            800: '#155e75',
            900: '#164e63',
          },
          purple: {
            50: '#faf5ff',
            100: '#f3e8ff',
            200: '#e9d5ff',
            300: '#d8b4fe',
            400: '#c084fc',
            500: '#a855f7',
            600: '#9333ea',
            700: '#7e22ce',
            800: '#6b21a8',
            900: '#581c87',
          },
          pink: {
            50: '#fdf2f8',
            100: '#fce7f3',
            200: '#fbcfe8',
            300: '#f9a8d4',
            400: '#f472b6',
            500: '#ec4899',
            600: '#db2777',
            700: '#be185d',
            800: '#9d174d',
            900: '#831843',
          },
          slate: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
          }
        }
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        'hero-mesh': 'radial-gradient(at 40% 20%, hsla(189, 100%, 41%, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(271, 76%, 53%, 0.12) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(330, 79%, 56%, 0.08) 0px, transparent 50%)',
        'card-gradient': 'linear-gradient(135deg, rgba(0, 153, 204, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
        'purple-gradient': 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 153, 204, 0.4)',
        'glow-lg': '0 0 40px rgba(0, 153, 204, 0.5)',
        'glow-purple': '0 0 30px rgba(168, 85, 247, 0.4)',
      }
    },
  },
  plugins: [],
}