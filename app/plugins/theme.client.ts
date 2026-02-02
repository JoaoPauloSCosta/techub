import { defineNuxtPlugin } from '#imports'
import { useTheme } from '../composables/useTheme'

/**
 * Plugin client-side para inicialização do tema
 * 
 * Este plugin roda na inicialização do app e garante:
 * 1. Leitura do tema salvo no localStorage
 * 2. Aplicação imediata da classe no DOM para evitar flicker
 * 3. Sincronização do estado global com o valor persistido
 */
export default defineNuxtPlugin(() => {
    const { initTheme } = useTheme()

    // Inicializa o tema imediatamente
    initTheme()
})
