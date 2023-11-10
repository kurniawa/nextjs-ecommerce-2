import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // theme: {
  //   extend: {
  //     backgroundImage: {
  //       'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  //       'gradient-conic':
  //         'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  //     },
  //   },
  // },
  daisyui: {
    themes: [
      {
        mytheme: {
          // warna gelap, perpaduan hijau dan ungu
          "primary": "#90f4b3",
          "secondary": "#ef8dd3",
          "accent": "#eeffad",
          "neutral": "#272d34",
          "base-100": "#4d2d5c",
          "info": "#4a75c4",
          "success": "#3ee57e",
          "warning": "#d57310",
          "error": "#ee675d",
          // warna netral, warna-warni
          // "primary": "#f9bbbf",
          // "secondary": "#c8dd2a",
          // "accent": "#ffc9f1",
          // "neutral": "#19161d",
          // "base-100": "#e8e8e8",
          // "info": "#79a7d2",
          // "success": "#41d899",
          // "warning": "#f6dd6a",
          // "error": "#df494b",
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}
export default config
