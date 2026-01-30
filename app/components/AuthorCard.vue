<script setup lang="ts">
import type { Post } from '../../shared/types'

interface Props {
  author: Post['author']
}

defineProps<Props>()
</script>

<template>
  <div id="author-card" class="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg p-5">
    <h3 class="text-lg font-bold text-gray-900 dark:text-text-primary mb-4">Sobre o Autor</h3>

    <div class="flex items-center gap-4">
      <img
        :src="author.avatar"
        :alt="author.name"
        class="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-dark-border"
      />
      <div>
        <p class="text-gray-900 dark:text-text-primary font-semibold">{{ author.name }}</p>
        <p v-if="author.role" class="text-gray-500 dark:text-text-muted text-sm">{{ author.role }}</p>
      </div>
    </div>

    <p class="text-gray-500 dark:text-text-muted text-sm mt-4 leading-relaxed">
      Especialista em desenvolvimento web moderno com foco em Vue.js e ecossistema JavaScript.
    </p>

    <div class="flex gap-2 mt-4">
      <a
        href="#"
        class="flex-1 text-center py-2 bg-gray-100 dark:bg-dark-hover border border-gray-200 dark:border-dark-border text-gray-600 dark:text-text-secondary text-sm font-medium rounded-lg hover:text-primary hover:border-primary/50 transition-all duration-200"
      >
        Ver perfil
      </a>
      <a
        href="#"
        class="flex-1 text-center py-2 bg-primary/10 border border-primary/20 text-primary text-sm font-medium rounded-lg hover:bg-primary/20 transition-all duration-200"
      >
        Seguir
      </a>
    </div>
  </div>
</template>
