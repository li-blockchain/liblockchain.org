module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-bg': 'url("/sky.jpg")',
        'staking-hero':
            "radial-gradient(circle, rgba(0,0,0,.8) 0%, rgba(0,0,0,0.6461178221288515) 77%, rgba(0,0,0,0) 100%), url('/sky.jpg')",
      }
    },
  },
  plugins: [],
}