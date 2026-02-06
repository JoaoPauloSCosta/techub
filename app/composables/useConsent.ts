import { useState, watch, onMounted, computed } from '#imports'

// Tipos de consentimento LGPD
export interface ConsentPreferences {
    necessary: boolean // Sempre true, não pode ser desabilitado
    analytics: boolean // Google Analytics, métricas
    marketing: boolean // YouTube, redes sociais, remarketing
}

// Estrutura do armazenamento
export interface ConsentState {
    preferences: ConsentPreferences
    hasConsented: boolean // Se o usuário já fez uma escolha
    showBanner: boolean // Controla visibilidade do banner
    showDetails: boolean // Controla visibilidade do modal de detalhes
}

const STORAGE_KEY = 'techub-consent'

// Estado padrão - não-essenciais começam como false
const defaultPreferences: ConsentPreferences = {
    necessary: true,
    analytics: false,
    marketing: false
}

export function useConsent() {
    // Estado global reativo usando useState do Nuxt
    const consentState = useState<ConsentState>('consent', () => ({
        preferences: { ...defaultPreferences },
        hasConsented: false,
        showBanner: true,
        showDetails: false
    }))

    // Carregar preferências do localStorage no cliente
    const loadFromStorage = (): void => {
        if (import.meta.client) {
            try {
                const stored = localStorage.getItem(STORAGE_KEY)
                if (stored) {
                    const parsed = JSON.parse(stored) as ConsentPreferences
                    consentState.value.preferences = {
                        necessary: true, // Sempre forçar true
                        analytics: parsed.analytics ?? false,
                        marketing: parsed.marketing ?? false
                    }
                    consentState.value.hasConsented = true
                    consentState.value.showBanner = false
                }
            } catch (error) {
                console.warn('[useConsent] Erro ao carregar preferências:', error)
            }
        }
    }

    // Salvar preferências no localStorage
    const saveToStorage = (prefs: ConsentPreferences): void => {
        if (import.meta.client) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
            } catch (error) {
                console.warn('[useConsent] Erro ao salvar preferências:', error)
            }
        }
    }

    // Aceitar todos os cookies
    const acceptAll = (): void => {
        consentState.value.preferences = {
            necessary: true,
            analytics: true,
            marketing: true
        }
        consentState.value.hasConsented = true
        consentState.value.showBanner = false
        consentState.value.showDetails = false
        saveToStorage(consentState.value.preferences)
        console.log('[Consent] Todos os cookies aceitos')
    }

    // Rejeitar cookies não-essenciais
    const rejectNonEssential = (): void => {
        consentState.value.preferences = {
            necessary: true,
            analytics: false,
            marketing: false
        }
        consentState.value.hasConsented = true
        consentState.value.showBanner = false
        consentState.value.showDetails = false
        saveToStorage(consentState.value.preferences)
        console.log('[Consent] Apenas cookies essenciais aceitos')
    }

    // Salvar preferências personalizadas
    const savePreferences = (prefs: Partial<ConsentPreferences>): void => {
        consentState.value.preferences = {
            necessary: true, // Sempre forçar true
            analytics: prefs.analytics ?? consentState.value.preferences.analytics,
            marketing: prefs.marketing ?? consentState.value.preferences.marketing
        }
        consentState.value.hasConsented = true
        consentState.value.showBanner = false
        consentState.value.showDetails = false
        saveToStorage(consentState.value.preferences)
        console.log('[Consent] Preferências salvas:', consentState.value.preferences)
    }

    // Resetar consentimento (para debug ou novo usuário)
    const resetConsent = (): void => {
        if (import.meta.client) {
            localStorage.removeItem(STORAGE_KEY)
        }
        consentState.value.preferences = { ...defaultPreferences }
        consentState.value.hasConsented = false
        consentState.value.showBanner = true
        consentState.value.showDetails = false
        console.log('[Consent] Consentimento resetado')
    }

    // Abrir banner novamente (para link no footer)
    const openBanner = (): void => {
        consentState.value.showBanner = true
        consentState.value.showDetails = false
    }

    // Abrir diretamente as configurações detalhadas
    const openDetails = (): void => {
        consentState.value.showBanner = true
        consentState.value.showDetails = true
    }

    // Toggle para mostrar/ocultar detalhes
    const toggleDetails = (): void => {
        consentState.value.showDetails = !consentState.value.showDetails
    }

    // Watcher para analytics - sinaliza carregamento do GA4
    if (import.meta.client) {
        watch(
            () => consentState.value.preferences.analytics,
            (newValue, oldValue) => {
                if (newValue && !oldValue) {
                    console.log('[Consent] Analytics habilitado - Carregar GA4')
                    // TODO: Emitir evento ou carregar script do GA4
                    // window.dispatchEvent(new CustomEvent('consent:analytics', { detail: true }))
                } else if (!newValue && oldValue) {
                    console.log('[Consent] Analytics desabilitado')
                }
            }
        )

        watch(
            () => consentState.value.preferences.marketing,
            (newValue, oldValue) => {
                if (newValue && !oldValue) {
                    console.log('[Consent] Marketing habilitado - Carregar scripts de terceiros')
                    // TODO: Emitir evento ou carregar scripts de marketing
                } else if (!newValue && oldValue) {
                    console.log('[Consent] Marketing desabilitado')
                }
            }
        )
    }

    // Inicialização - chamar onMounted no componente que usa
    const initialize = (): void => {
        onMounted(() => {
            loadFromStorage()
        })
    }

    return {
        // Estado
        preferences: computed(() => consentState.value.preferences),
        hasConsented: computed(() => consentState.value.hasConsented),
        showBanner: computed(() => consentState.value.showBanner),
        showDetails: computed(() => consentState.value.showDetails),

        // Ações
        acceptAll,
        rejectNonEssential,
        savePreferences,
        resetConsent,
        openBanner,
        openDetails,
        toggleDetails,
        initialize
    }
}
