<script setup lang="ts">
import { ref } from 'vue'
import type { Category } from '#shared/types'

const activeCategory = ref<string>('all')

const categories: Category[] = [
  { id: 'all', name: 'Todos', slug: 'all' },
  { id: 'vue', name: 'Vue.js', slug: 'vue' },
  { id: 'nuxt', name: 'Nuxt', slug: 'nuxt' },
  { id: 'ai-dev', name: 'IA Dev', slug: 'ai-dev' },
  { id: 'ai-news', name: 'IA News', slug: 'ai-news' },
  { id: 'php', name: 'PHP', slug: 'php' },
  { id: 'jobs', name: 'Vagas', slug: 'jobs' },
  { id: 'tutorials', name: 'Tutoriais', slug: 'tutorials' }
]

const selectCategory = (slug: string): void => {
  activeCategory.value = slug
}
</script>

<template>
  <nav id="main-nav" class="bg-dark-surface/50 border-b border-dark-border/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
        <button
          v-for="(cat, index) in categories"
          :key="cat.id"
          :style="{ animationDelay: `${index * 0.03}s` }"
          :class="[
            'flex-shrink-0 px-5 py-2 text-sm font-medium transition-all duration-250 animate-fade-up opacity-0 press-effect',
            activeCategory === cat.slug
              ? 'bg-primary text-dark-bg rounded shadow-glow'
              : 'bg-dark-card border border-dark-border text-text-secondary hover:text-text-primary hover:border-primary/30 rounded'
          ]"
          @click="selectCategory(cat.slug)"
        >
          {{ cat.name }}
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
