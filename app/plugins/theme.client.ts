import { defineNuxtPlugin } from '#imports'
import { useTheme } from '../composables/useTheme'

export default defineNuxtPlugin((nuxtApp) => {
    const { initTheme } = useTheme()
    initTheme()
})
