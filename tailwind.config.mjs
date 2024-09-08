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
            '--tw-prose-links': 'var(--color-foreground)',
            '--tw-prose-bold': 'var(--color-foreground)',
            '--tw-prose-counters': 'var(--color-foreground)',
            '--tw-prose-bullets': 'var(--color-foreground)',
            '--tw-prose-hr': 'var(--color-border)',
            '--tw-prose-quotes': 'var(--color-foreground)',
            '--tw-prose-quote-borders': 'var(--color-border)',
            '--tw-prose-captions': 'var(--color-foreground)',
            '--tw-prose-code': 'var(--color-foreground)',
            '--tw-prose-pre-code': 'var(--color-zinc-200)',
            '--tw-prose-pre-bg': 'var(--color-zinc-800)',
            '--tw-prose-th-borders': 'var(--color-border)',
            '--tw-prose-td-borders': 'var(--color-border)',
            'h1,h2,h3,h4,h5,h6': {
              fontFamily: 'var(--font-serif)',
              fontWeight: 500,
            },
          },
        },
      }),
    },
  },
};
