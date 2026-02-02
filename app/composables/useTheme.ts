import type { Ref, ComputedRef } from 'vue'
import { useState, computed, watch } from '#imports'

export type Theme = 'dark' | 'light'

interface ThemeComposable {
    theme: Ref<Theme>
    isDark: ComputedRef<boolean>
    setTheme: (next: Theme) => void
    toggleTheme: () => void
    initTheme: () => void
}

const STORAGE_KEY = 'techub-theme'

/**
 * Obtém o tema preferido do sistema operacional
 */
const getSystemPreference = (): Theme => {
    if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'dark'
}

/**
 * Aplica a classe dark/light no <html> diretamente
 */
const applyThemeToDOM = (theme: Theme): void => {
    if (typeof document !== 'undefined') {
        const html = document.documentElement
        if (theme === 'dark') {
            html.classList.add('dark')
            html.classList.remove('light')
        } else {
            html.classList.remove('dark')
            html.classList.add('light')
        }
    }
}

/**
 * Lê o tema salvo no localStorage
 */
const getSavedTheme = (): Theme | null => {
    if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved === 'dark' || saved === 'light') {
            return saved
        }
    }
    return null
}

/**
 * Salva o tema no localStorage
 */
const saveTheme = (theme: Theme): void => {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, theme)
    }
}

/**
 * Composable para gerenciar o tema (Dark/Light Mode)
 * 
 * Hierarquia de inicialização:
 * 1º - Valor salvo no localStorage
 * 2º - Preferência do sistema (prefers-color-scheme)
 * 3º - Fallback: 'dark'
 */
export const useTheme = (): ThemeComposable => {
    // Inicializa com valor do localStorage se disponível (client-side)
    const getInitialTheme = (): Theme => {
        if (typeof window !== 'undefined') {
            const saved = getSavedTheme()
            if (saved) return saved
            return getSystemPreference()
        }
        return 'dark' // SSR fallback
    }

    const theme = useState<Theme>('theme', getInitialTheme)

    const isDark = computed<boolean>(() => theme.value === 'dark')

    // Watch para atualizar DOM e localStorage quando o tema muda
    if (typeof window !== 'undefined') {
        watch(theme, (newTheme) => {
            applyThemeToDOM(newTheme)
            saveTheme(newTheme)
        }, { immediate: true })
    }

    const setTheme = (next: Theme): void => {
        theme.value = next
    }

    const toggleTheme = (): void => {
        setTheme(theme.value === 'dark' ? 'light' : 'dark')
    }

    const initTheme = (): void => {
        if (typeof window === 'undefined') return

        // Hierarquia: localStorage > sistema > fallback
        const saved = getSavedTheme()
        if (saved) {
            theme.value = saved
        } else {
            theme.value = getSystemPreference()
        }

        // Garante que o DOM está sincronizado
        applyThemeToDOM(theme.value)
    }

    return {
        theme,
        isDark,
        setTheme,
        toggleTheme,
        initTheme
    }
}
