<script setup lang="ts">
import { ref } from 'vue'
import { EnvelopeIcon, CheckCircleIcon, SparklesIcon } from '@heroicons/vue/24/outline'

const email = ref<string>('')
const isSubmitted = ref<boolean>(false)
const isLoading = ref<boolean>(false)

const handleSubmit = async (): Promise<void> => {
  if (!email.value) return

  isLoading.value = true

  // TODO: Replace with actual API call
  await new Promise(resolve => setTimeout(resolve, 1200))

  isSubmitted.value = true
  isLoading.value = false
}
</script>

<template>
  <div
    id="newsletter-box"
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 25, delay: 100 } }"
    class="relative bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded p-6 overflow-hidden"
  >
    <!-- Background glow effect -->
    <div class="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

    <div v-if="!isSubmitted" class="relative">
      <!-- Icon -->
      <div class="w-12 h-12 bg-primary/10 border border-primary/20 rounded flex items-center justify-center mb-4">
        <EnvelopeIcon class="w-6 h-6 text-primary" />
      </div>

      <!-- Title -->
      <h3 class="text-lg font-bold text-text-primary mb-2">
        Newsletter TechHub
      </h3>

      <!-- Description -->
      <p class="text-gray-500 text-sm mb-5 leading-relaxed">
        Receba as melhores notícias de tecnologia, vagas e tutoriais toda semana.
      </p>

      <!-- Benefit pills -->
      <div class="flex flex-wrap gap-2 mb-5">
        <span class="inline-flex items-center gap-1 px-2 py-1 bg-dark-hover text-text-muted text-xs rounded">
          <SparklesIcon class="w-3 h-3 text-primary" />
          Curadoria exclusiva
        </span>
        <span class="inline-flex items-center gap-1 px-2 py-1 bg-dark-hover text-text-muted text-xs rounded">
          <SparklesIcon class="w-3 h-3 text-primary" />
          Sem spam
        </span>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-3">
        <input
          v-model="email"
          type="email"
          placeholder="seu@email.com"
          required
          class="w-full px-4 py-3 bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary/50 focus:shadow-glow transition-all duration-200"
        />
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full px-4 py-3 bg-primary hover:bg-primary-hover disabled:opacity-60 text-white dark:text-dark-bg font-semibold rounded transition-all duration-200 flex items-center justify-center gap-2 shadow-glow hover:shadow-glow-lg press-effect"
        >
          <span v-if="isLoading" class="w-5 h-5 border-2 border-dark-bg/30 border-t-dark-bg rounded-full animate-spin"></span>
          <span v-else>Inscrever-se gratuitamente</span>
        </button>
      </form>

      <!-- Privacy Note -->
      <p class="text-gray-500 text-xs mt-4 text-center">
        Ao se inscrever, você concorda com nossa <a href="#" class="text-primary hover:underline">Política de Privacidade</a>.
      </p>
    </div>

    <!-- Success State -->
    <div v-else class="relative text-center py-6">
      <div
        v-motion
        :initial="{ scale: 0 }"
        :enter="{ scale: 1, transition: { type: 'spring', stiffness: 300, damping: 15 } }"
        class="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <CheckCircleIcon class="w-8 h-8 text-primary" />
      </div>
      <h3 class="text-lg font-bold text-text-primary mb-2">
        Inscrito com sucesso! 🎉
      </h3>
      <p class="text-gray-500 text-sm">
        Confira seu email para confirmar a inscrição.
      </p>
    </div>
  </div>
</template>
