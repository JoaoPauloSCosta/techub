import type { Ref, ComputedRef } from 'vue'
import { useState, onMounted, computed } from '#imports'
import { getPreferredTheme } from '../utils/getPreferredTheme'

export type Theme = 'dark' | 'light'

interface ThemeComposable {
    theme: Ref<Theme>
    isDark: ComputedRef<boolean>
    setTheme: (next: Theme) => void
    toggleTheme: () => void
    initTheme: () => void
}

export const useTheme = (): ThemeComposable => {
    const theme = useState<Theme>('theme', () => 'dark')

    const isDark = computed<boolean>(() => theme.value === 'dark')

    const setTheme = (next: Theme): void => {
        theme.value = next
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('techhub-theme', next)
        }
    }

    const toggleTheme = (): void => {
        setTheme(theme.value === 'dark' ? 'light' : 'dark')
    }

    const initTheme = (): void => {
        if (typeof localStorage !== 'undefined') {
            const saved = localStorage.getItem('techhub-theme') as Theme | null
            if (saved && (saved === 'dark' || saved === 'light')) {
                setTheme(saved)
            } else {
                const preferred = getPreferredTheme()
                setTheme(preferred)
            }
        }
    }

    return {
        theme,
        isDark,
        setTheme,
        toggleTheme,
        initTheme
    }
}
