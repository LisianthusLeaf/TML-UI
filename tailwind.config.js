/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './docs/**/*.{md,vue}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--tml-color-primary)',
        success: 'var(--tml-color-success)',
        warning: 'var(--tml-color-warning)',
        danger: 'var(--tml-color-danger)',
        info: 'var(--tml-color-info)',
      },
      textColor: {
        primary: 'var(--tml-text-color-primary)',
        regular: 'var(--tml-text-color-regular)',
        secondary: 'var(--tml-text-color-secondary)',
        placeholder: 'var(--tml-text-color-placeholder)',
      },
      backgroundColor: {
        base: 'var(--tml-bg-color)',
        page: 'var(--tml-bg-color-page)',
        overlay: 'var(--tml-bg-color-overlay)',
      },
      borderColor: {
        DEFAULT: 'var(--tml-border-color)',
        light: 'var(--tml-border-color-light)',
        lighter: 'var(--tml-border-color-lighter)',
        'extra-light': 'var(--tml-border-color-extra-light)',
      },
      borderRadius: {
        base: 'var(--tml-border-radius-base)',
        small: 'var(--tml-border-radius-small)',
        round: 'var(--tml-border-radius-round)',
        circle: 'var(--tml-border-radius-circle)',
      },
      fontSize: {
        'extra-large': 'var(--tml-font-size-extra-large)',
        large: 'var(--tml-font-size-large)',
        medium: 'var(--tml-font-size-medium)',
        base: 'var(--tml-font-size-base)',
        small: 'var(--tml-font-size-small)',
        'extra-small': 'var(--tml-font-size-extra-small)',
      },
      spacing: {
        small: 'var(--tml-spacing-small)',
        base: 'var(--tml-spacing-base)',
        large: 'var(--tml-spacing-large)',
      },
      boxShadow: {
        base: 'var(--tml-box-shadow-base)',
        light: 'var(--tml-box-shadow-light)',
      },
    },
  },
  plugins: [],
}
