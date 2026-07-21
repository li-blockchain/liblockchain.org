module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			brand: {
  				cyan: {
  					'50': '#ecfeff',
  					'100': '#cffafe',
  					'200': '#a5f3fc',
  					'300': '#67e8f9',
  					'400': '#22d3ee',
  					'500': '#0099cc',
  					'600': '#0891b2',
  					'700': '#0e7490',
  					'800': '#155e75',
  					'900': '#164e63'
  				},
  				purple: {
  					'50': '#faf5ff',
  					'100': '#f3e8ff',
  					'200': '#e9d5ff',
  					'300': '#d8b4fe',
  					'400': '#c084fc',
  					'500': '#a855f7',
  					'600': '#9333ea',
  					'700': '#7e22ce',
  					'800': '#6b21a8',
  					'900': '#581c87'
  				},
  				pink: {
  					'50': '#fdf2f8',
  					'100': '#fce7f3',
  					'200': '#fbcfe8',
  					'300': '#f9a8d4',
  					'400': '#f472b6',
  					'500': '#ec4899',
  					'600': '#db2777',
  					'700': '#be185d',
  					'800': '#9d174d',
  					'900': '#831843'
  				},
  				slate: {
  					'50': '#f8fafc',
  					'100': '#f1f5f9',
  					'200': '#e2e8f0',
  					'300': '#cbd5e1',
  					'400': '#94a3b8',
  					'500': '#64748b',
  					'600': '#475569',
  					'700': '#334155',
  					'800': '#1e293b',
  					'900': '#0f172a'
  				}
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		backgroundImage: {
  			'hero-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
  			'hero-mesh': 'radial-gradient(at 40% 20%, hsla(189, 100%, 41%, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(271, 76%, 53%, 0.12) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(330, 79%, 56%, 0.08) 0px, transparent 50%)',
  			'card-gradient': 'linear-gradient(135deg, rgba(0, 153, 204, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
  			'purple-gradient': 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)'
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'system-ui',
  				'-apple-system',
  				'sans-serif'
  			]
  		},
  		boxShadow: {
  			glow: '0 0 20px rgba(0, 153, 204, 0.4)',
  			'glow-lg': '0 0 40px rgba(0, 153, 204, 0.5)',
  			'glow-purple': '0 0 30px rgba(168, 85, 247, 0.4)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}