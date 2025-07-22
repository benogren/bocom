/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'oswald': ['Oswald', 'sans-serif'],
        'sans': ['Open Sans', 'sans-serif'],
      },
      colors: {
        benblue: {
          '500': '#a666d9',
          '600': '#33bfa6', 
          '700': '#73d959',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'float-delayed-2': 'float 6s ease-in-out infinite 4s',
      },
      keyframes: {
        float: {
          '0%, 100%': { 
            transform: 'translateY(0px) rotate(0deg)', 
            opacity: '0.3' 
          },
          '50%': { 
            transform: 'translateY(-20px) rotate(5deg)', 
            opacity: '0.6' 
          },
        },
      },
      spacing: {
        '15': '3.75rem',
      },
      inset: {
        '1/10': '10%',
        '3/20': '15%',
        '1/5': '20%',
        '1/3': '33.333333%',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at 30% 50%, rgba(74, 144, 226, 0.05) 0%, transparent 50%)',
      },
    },
  },
  plugins: [],
}