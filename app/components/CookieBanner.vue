<script setup lang="ts">
import { ref, watch } from 'vue'
import { useConsent } from '../composables/useConsent'
import { ShieldCheckIcon, XMarkIcon, Cog6ToothIcon, ChartBarIcon, MegaphoneIcon, LockClosedIcon } from '@heroicons/vue/24/outline'

const {
  preferences,
  showBanner,
  showDetails,
  acceptAll,
  rejectNonEssential,
  savePreferences,
  toggleDetails,
  initialize
} = useConsent()

// Inicializar ao montar
initialize()

// Estado local para os toggles no modo detalhado
const localAnalytics = ref(preferences.value.analytics)
const localMarketing = ref(preferences.value.marketing)

// Sincronizar com preferências quando abrir detalhes
watch(showDetails, (value) => {
  if (value) {
    localAnalytics.value = preferences.value.analytics
    localMarketing.value = preferences.value.marketing
  }
})

// Salvar preferências personalizadas
const handleSavePreferences = (): void => {
  savePreferences({
    analytics: localAnalytics.value,
    marketing: localMarketing.value
  })
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-full opacity-0"
    >
      <div
        v-if="showBanner"
        id="cookie-banner"
        class="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
      >
        <!-- Backdrop blur container -->
        <div 
          class="max-w-4xl mx-auto rounded-2xl border border-gray-200/50 dark:border-dark-border/50 bg-white/95 dark:bg-dark-surface/95 backdrop-blur-xl shadow-2xl shadow-black/10 dark:shadow-black/30"
        >
          <!-- Estado Simples -->
          <div v-if="!showDetails" class="p-5 md:p-6">
            <div class="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
              <!-- Ícone e Texto -->
              <div class="flex items-start gap-4 flex-1">
                <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <ShieldCheckIcon class="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 class="text-base font-semibold text-gray-900 dark:text-text-primary mb-1">
                    Sua privacidade importa
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-text-muted leading-relaxed">
                    Usamos cookies para melhorar sua experiência. Você pode aceitar todos, rejeitar os não-essenciais ou personalizar suas preferências.
                  </p>
                </div>
              </div>

              <!-- Botões -->
              <div class="flex flex-wrap items-center gap-2 lg:flex-nowrap lg:gap-3">
                <!-- Personalizar -->
                <button
                  id="cookie-customize-btn"
                  type="button"
                  class="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-text-secondary bg-gray-100 dark:bg-dark-card hover:bg-gray-200 dark:hover:bg-dark-border rounded-xl transition-all duration-200 press-effect"
                  @click="toggleDetails"
                >
                  <Cog6ToothIcon class="w-4 h-4" />
                  Personalizar
                </button>
                
                <!-- Rejeitar -->
                <button
                  id="cookie-reject-btn"
                  type="button"
                  class="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-text-secondary border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-card rounded-xl transition-all duration-200 press-effect"
                  @click="rejectNonEssential"
                >
                  Rejeitar
                </button>
                
                <!-- Aceitar Tudo -->
                <button
                  id="cookie-accept-btn"
                  type="button"
                  class="px-5 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary-hover rounded-xl transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-primary/40 press-effect"
                  @click="acceptAll"
                >
                  Aceitar Tudo
                </button>
              </div>
            </div>
          </div>

          <!-- Estado Detalhado (Personalizar) -->
          <div v-else class="p-5 md:p-6">
            <!-- Header -->
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <Cog6ToothIcon class="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-text-primary">
                    Configurações de Cookies
                  </h3>
                  <p class="text-xs text-gray-500 dark:text-text-muted">
                    Personalize suas preferências de privacidade
                  </p>
                </div>
              </div>
              <button
                id="cookie-close-btn"
                type="button"
                class="w-8 h-8 rounded-lg bg-gray-100 dark:bg-dark-card hover:bg-gray-200 dark:hover:bg-dark-border flex items-center justify-center transition-colors"
                @click="toggleDetails"
              >
                <XMarkIcon class="w-5 h-5 text-gray-500 dark:text-text-muted" />
              </button>
            </div>

            <!-- Cookie Categories -->
            <div class="space-y-4 mb-6">
              <!-- Necessários (sempre ativo) -->
              <div class="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-dark-card border border-gray-100 dark:border-dark-border">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                    <LockClosedIcon class="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 class="text-sm font-medium text-gray-900 dark:text-text-primary">
                      Necessários
                    </h4>
                    <p class="text-xs text-gray-500 dark:text-text-muted">
                      Essenciais para o funcionamento do site
                    </p>
                  </div>
                </div>
                <!-- Toggle travado -->
                <div class="relative">
                  <div class="w-11 h-6 bg-emerald-500 rounded-full shadow-inner cursor-not-allowed opacity-70">
                    <div class="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow" />
                  </div>
                </div>
              </div>

              <!-- Analytics -->
              <div class="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-dark-card border border-gray-100 dark:border-dark-border">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                    <ChartBarIcon class="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 class="text-sm font-medium text-gray-900 dark:text-text-primary">
                      Analytics
                    </h4>
                    <p class="text-xs text-gray-500 dark:text-text-muted">
                      Google Analytics, métricas de uso
                    </p>
                  </div>
                </div>
                <!-- Toggle -->
                <button
                  id="cookie-toggle-analytics"
                  type="button"
                  class="relative w-11 h-6 rounded-full shadow-inner transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-dark-surface"
                  :class="localAnalytics ? 'bg-primary' : 'bg-gray-300 dark:bg-dark-border'"
                  @click="localAnalytics = !localAnalytics"
                >
                  <div 
                    class="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
                    :class="localAnalytics ? 'right-0.5' : 'left-0.5'"
                  />
                </button>
              </div>

              <!-- Marketing -->
              <div class="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-dark-card border border-gray-100 dark:border-dark-border">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center">
                    <MegaphoneIcon class="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h4 class="text-sm font-medium text-gray-900 dark:text-text-primary">
                      Marketing
                    </h4>
                    <p class="text-xs text-gray-500 dark:text-text-muted">
                      YouTube, redes sociais, remarketing
                    </p>
                  </div>
                </div>
                <!-- Toggle -->
                <button
                  id="cookie-toggle-marketing"
                  type="button"
                  class="relative w-11 h-6 rounded-full shadow-inner transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-dark-surface"
                  :class="localMarketing ? 'bg-primary' : 'bg-gray-300 dark:bg-dark-border'"
                  @click="localMarketing = !localMarketing"
                >
                  <div 
                    class="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
                    :class="localMarketing ? 'right-0.5' : 'left-0.5'"
                  />
                </button>
              </div>
            </div>

            <!-- Footer Actions -->
            <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-100 dark:border-dark-border">
              <p class="text-xs text-gray-500 dark:text-text-muted">
                Saiba mais em nossa 
                <a href="/privacy" class="text-primary hover:underline">Política de Privacidade</a>
              </p>
              <div class="flex items-center gap-3">
                <button
                  id="cookie-reject-all-btn"
                  type="button"
                  class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-text-secondary border border-gray-300 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-card rounded-xl transition-all duration-200"
                  @click="rejectNonEssential"
                >
                  Rejeitar Todos
                </button>
                <button
                  id="cookie-save-btn"
                  type="button"
                  class="px-5 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary-hover rounded-xl transition-all duration-200 shadow-lg shadow-primary/25"
                  @click="handleSavePreferences"
                >
                  Salvar Preferências
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
