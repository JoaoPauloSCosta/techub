import { useCookie, computed } from '#imports'

export type Theme = 'dark' | 'light' | 'system'

/**
 * Composable para gerenciar o tema da aplicação.
 * Utiliza Cookies para garantir persistência compatível com SSR (evita FOUC).
 */
export const useTheme = () => {
    // Cookie é a fonte da verdade (Server & Client)
    const theme = useCookie<Theme>('techhub-theme', {
        default: () => 'system',
        watch: true,
        maxAge: 60 * 60 * 24 * 365 // 1 ano
    })

    // Computada que resolve o estado visual final
    const isDark = computed(() => {
        if (theme.value === 'dark') return true
        if (theme.value === 'light') return false

        // Se for 'system', verifica no cliente
        if (import.meta.client) {
            return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        }

        // SSR Default (System)
        return false
    })

    const setTheme = (newTheme: Theme) => {
        theme.value = newTheme
    }

    const toggleTheme = () => {
        if (theme.value === 'dark') {
            setTheme('light')
        } else if (theme.value === 'light') {
            setTheme('dark')
        } else {
            // Se estiver em 'system', inverte baseado na preferência atual detectada
            const isSystemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            setTheme(isSystemDark ? 'light' : 'dark')
        }
    }

    return {
        theme,
        isDark,
        setTheme,
        toggleTheme
    }
}
