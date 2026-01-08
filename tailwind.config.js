/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./frontend/**/*.{html,js}",
  ],
  safelist: [
    'bg-gradient-to-b',
    'bg-gradient-to-r',
    'from-black/60',
    'to-transparent',
    'transform',
    'translate-x-1/2',
    '-translate-x-1/2',
    'translate-y-1/2',
    '-translate-y-1/2',
    'z-10',
    'z-20',
    'inset-0',
    'absolute',
    'relative',
    'backdrop-blur-[4px]',
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
    styled: true,
    base: true,
    utils: true,
  },
};