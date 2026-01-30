import type { Config } from 'tailwindcss'

export default {
    content: [
        './app/components/**/*.{vue,js,ts}',
        './app/layouts/**/*.vue',
        './app/pages/**/*.vue',
        './app/composables/**/*.{js,ts}',
        './app/plugins/**/*.{js,ts}',
        './app/app.vue',
        './app/error.vue'
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Dark mode palette - Deep blacks for premium feel
                'dark-bg': '#050505',
                'dark-surface': '#0a0a0a',
                'dark-card': '#111111',
                'dark-border': '#1f1f1f',
                'dark-hover': '#1a1a1a',
                // Primary accent - Emerald
                'primary': '#10b981',
                'primary-hover': '#059669',
                'primary-light': '#34d399',
                'primary-glow': 'rgba(16, 185, 129, 0.15)',
                // Secondary accent - Cyan for contrast
                'accent': '#06b6d4',
                'accent-light': '#22d3ee',
                // Text hierarchy
                'text-primary': '#fafafa',
                'text-secondary': '#a1a1aa',
                'text-muted': '#52525b',
                // Semantic colors
                'success': '#22c55e',
                'warning': '#f59e0b',
                'error': '#ef4444'
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
            },
            fontSize: {
                // Premium typographic scale
                'display': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '800' }],
                'headline': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
                'title': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
                'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
            },
            borderRadius: {
                // Sharp geometry for premium feel (0-4px range)
                'none': '0',
                'sm': '2px',
                'DEFAULT': '4px',
                'md': '6px',
                'lg': '8px',
                'xl': '12px',
                'full': '9999px'
            },
            boxShadow: {
                // Layered shadows for depth
                'card': '0 1px 3px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.3)',
                'card-hover': '0 4px 12px rgba(0,0,0,0.5), 0 12px 32px rgba(0,0,0,0.4)',
                'glow': '0 0 20px rgba(16, 185, 129, 0.3)',
                'glow-lg': '0 0 40px rgba(16, 185, 129, 0.2)',
                'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.05)'
            },
            backgroundImage: {
                // Grain texture for depth
                'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                // Subtle gradients
                'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
                'gradient-spotlight': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(16, 185, 129, 0.15), transparent)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'fade-up': 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'scale-in': 'scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'slide-in-right': 'slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' }
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(-20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' }
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)' },
                    '50%': { boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)' }
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' }
                }
            },
            transitionTimingFunction: {
                'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
                'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
            transitionDuration: {
                '250': '250ms',
                '350': '350ms',
                '400': '400ms',
            }
        }
    },
    plugins: []
} satisfies Config
