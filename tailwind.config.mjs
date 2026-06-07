/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--color-foreground)',
            '--tw-prose-headings': 'var(--color-foreground)',
            '--tw-prose-lead': 'var(--color-foreground)',
            '--tw-prose-links': 'var(--color-primary)',
            '--tw-prose-bold': 'var(--color-foreground)',
            '--tw-prose-counters': 'var(--color-foreground)',
            '--tw-prose-bullets': 'var(--color-foreground)',
            '--tw-prose-hr': 'var(--color-border)',
            '--tw-prose-quotes': 'var(--color-foreground)',
            '--tw-prose-quote-borders': 'var(--color-border)',
            '--tw-prose-captions': 'var(--color-foreground)',
            '--tw-prose-code': 'var(--color-foreground)',
            '--tw-prose-pre-code': 'var(--color-secondary-foreground)',
            '--tw-prose-pre-bg': 'var(--color-secondary)',
            '--tw-prose-th-borders': 'var(--color-border)',
            '--tw-prose-td-borders': 'var(--color-border)',
            'h1,h2,h3,h4,h5,h6': {
              fontFamily: 'var(--font-serif)',
              fontWeight: 500,
            },
            h1: {
              marginTop: 0,
            },
            a: {
              textDecoration: 'underline',
              textDecorationColor: 'color-mix(in oklch, var(--color-foreground) 25%, transparent)',
              textUnderlineOffset: '3px',
              fontWeight: '500',
            },
            'a:hover': {
              textDecorationColor: 'var(--color-foreground)',
            },
          },
        },
      }),
    },
  },
};
