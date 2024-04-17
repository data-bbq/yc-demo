/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    fontFamily: {
      sans: ['Seymour One', 'sans-serif'],
    },
    colors: {
      'success-green': '#52c41a',
      'hover-green': '#73d13d',
    },
  },
};
export const plugins = [];

export const corePlugins = {
  preflight: false
}
