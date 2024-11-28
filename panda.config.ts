import { defineConfig, defineGlobalStyles } from '@pandacss/dev'
import { loginUIBaseRecipe, separatorRecipe, messageTextRecipe } from './panda.recipe'

const globalCss = defineGlobalStyles({
  'html, body': {
    fontSize: '12px',
    letterSpacing: '0.1rem',
    color: 'font.main',
    lineHeight: '1rem',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    wordBreak: 'break-all',
    overflowY: 'hidden',
  },
  html: {
    '--global-font-body': 'Roboto, sans-serif',
  },
  button: {
    cursor: 'pointer',
  },
})

export default defineConfig({
  globalCss,

  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  jsxFramework: 'react',

  // Useful for theme customization
  theme: {
    extend: {
      breakpoints: {
        sm: '640px',
        md: '900px',
        lg: '1025px',
        xl: '1400px',
        '2xl': '1536px',
      },
      tokens: {
        colors: {
          primary: {
            main: { value: '#0891b2' },
            dark: { value: '#056178' },
          },
          accent: {
            main: { value: '#ffef44' },
          },
          error: {
            main: { value: '#f22911' },
          },
          message: {
            user: { value: '#0891b226' },
            member: { value: '#0891b208' },
          },
          font: {
            light: { value: '#999999' },
            main: { value: '#545454' },
            dark: { value: '#080808' },
          },
          background: {
            light: { value: '#f0f0f0' },
            main: { value: 'linear-gradient(to top, #0891b2, #0896bd, #0bc2da)' },
          },
          boxShadow: {
            light: { value: 'rgba(200, 200, 200, 0.3)' },
            main: { value: 'rgba(0, 0, 0, 0.3)' },
          },
          selected: {
            main: { value: 'rgba(8, 144, 178, 0.1)' },
          },
        },
        fonts: {
          fira: { value: 'var(--font-fira-code)' },
        },
      },
      recipes: {
        loginUIBase: loginUIBaseRecipe,
        separator: separatorRecipe,
        messageText: messageTextRecipe,
      },
      keyframes: {
        toastIn: {
          from: { opacity: 0, transform: 'translateX(100%)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        toastOut: {
          from: { opacity: 1, transform: 'translateX(0)' },
          to: { opacity: 0, transform: 'translateX(100%)' },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
})
