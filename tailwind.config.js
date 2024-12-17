/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '320px',    // Mobile phones
      'md': '768px',    // Tablets
      'lg': '1024px',   // Laptops
      'xl': '1440px',   // Desktop monitors
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            h1: {
              color: '#111827',
            },
            h2: {
              color: '#1F2937',
            },
            h3: {
              color: '#374151',
            },
            strong: {
              color: '#111827',
            },
            a: {
              color: '#3B82F6',
              '&:hover': {
                color: '#2563EB',
              },
            },
          },
        },
      },
      maxWidth: {
        'screen-sm': '480px',
        'screen-md': '1024px',
        'screen-lg': '1440px',
        'screen-xl': '1920px',
      },
      padding: {
        'screen-sm': '1rem',
        'screen-md': '2rem',
        'screen-lg': '3rem',
        'screen-xl': '4rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};