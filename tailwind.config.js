/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Accessibility-focused color palette for seniors
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // High contrast colors for better visibility
        contrast: {
          low: '#f8fafc',
          medium: '#64748b',
          high: '#1e293b',
        },
        // Status colors with high contrast
        success: '#16a34a',
        warning: '#d97706',
        error: '#dc2626',
        info: '#2563eb',
      },
      fontSize: {
        // Larger font sizes for seniors
        'xs-senior': ['16px', '24px'],
        'sm-senior': ['18px', '28px'],
        'base-senior': ['20px', '32px'],
        'lg-senior': ['24px', '36px'],
        'xl-senior': ['28px', '40px'],
        '2xl-senior': ['32px', '44px'],
        '3xl-senior': ['36px', '48px'],
      },
      spacing: {
        // Larger touch targets for seniors
        'touch': '44px',
        'touch-lg': '56px',
      },
    },
  },
  plugins: [],
}