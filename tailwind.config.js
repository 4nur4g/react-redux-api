/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0070f3',
        deepblue: '#374259',
        shadeblue: '#545B77',
        greenish: '#5C8984',
        pinkish: '#F2D8D8',
      },
    },
  },
  plugins: [],
};
