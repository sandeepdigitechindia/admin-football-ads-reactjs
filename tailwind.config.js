/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      DEFAULT: {
        css: {
          color: '#333',
          a: {
            color: '#1d4ed8',
            '&:hover': {
              color: '#1e40af',
            },
          },
        },
      },
      boxShadow: {
        'md': '0 2px 4px rgba(0, 0, 0, 0.8)',
        'text': '2px 2px 4px rgba(0, 0, 0, 0.6)',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),

  ],
}

