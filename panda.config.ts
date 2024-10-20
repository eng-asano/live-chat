import { defineConfig, defineGlobalStyles } from '@pandacss/dev'
import { neumorphismDentRecipe, neumorphismDumpRecipe } from './panda.recipe'

const globalCss = defineGlobalStyles({
  'html, body': {
    fontSize: '16px',
    letterSpacing: '0.1rem',
    color: 'gray.700',
    lineHeight: '1.5',
    background: 'background',
  },
  html: {
    '--global-font-body': 'Roboto, sans-serif',
  },
})

export default defineConfig({
  globalCss,

  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./app/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  jsxFramework: 'react',

  // Useful for theme customization
  theme: {
    extend: {
      breakpoints: {
        sm: '640px',
        md: '900px',
        lg: '1024px',
        xl: '1400px',
        '2xl': '1536px',
      },
      tokens: {
        colors: {
          primary: {
            main: { value: '#0891b2' },
          },
          background: { value: '#f5f5f5' },
        },
        fonts: {
          fira: { value: 'var(--font-fira-code)' },
        },
      },
      recipes: {
        neumorphismDent: neumorphismDentRecipe,
        neumorphismDump: neumorphismDumpRecipe,
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
})
