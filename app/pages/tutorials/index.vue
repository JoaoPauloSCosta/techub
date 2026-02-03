<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSeoMeta } from '#imports'
import { usePosts } from '~/composables/usePosts'
import TutorialCard from '~/components/TutorialCard.vue'
import { BookOpenIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/vue/24/outline'

// Logic
const { getPostsByType } = usePosts()
const allTutorials = getPostsByType('tutorial')

const searchQuery = ref('')
const selectedDifficulty = ref<string | null>(null)

// Computed
const filteredTutorials = computed(() => {
  let result = allTutorials

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(t => 
      t.title.toLowerCase().includes(q) || 
      t.excerpt.toLowerCase().includes(q) ||
      t.tags?.some(tag => tag.toLowerCase().includes(q))
    )
  }

  if (selectedDifficulty.value) {
    result = result.filter(t => t.difficulty === selectedDifficulty.value)
  }

  return result
})

const difficulties = ['Iniciante', 'Intermediário', 'Avançado']

// SEO
useSeoMeta({
  title: 'Tutoriais TechHub - Aprenda na Prática',
  description: 'Biblioteca de conhecimento com tutoriais práticos de Vue.js, Nuxt e desenvolvimento web.',
})

definePageMeta({
  layout: 'default-layout'
})
</script>

<template>
  <div class="min-h-screen pb-20">
    <!-- Header Section -->
    <div class="bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border pt-24 pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
                <BookOpenIcon class="w-6 h-6 text-primary" />
              </div>
              <span class="text-primary font-bold tracking-wider uppercase text-sm">Base de Conhecimento</span>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-text-primary mb-4 tracking-tight">
              Tutoriais & Guias
            </h1>
            <p class="text-lg text-gray-600 dark:text-text-secondary max-w-2xl">
              Aprenda com guias passo a passo, do nível iniciante ao avançado. Domine Vue.js, Nuxt e ferramentas de IA.
            </p>
          </div>
          
          <!-- Search & Filter -->
          <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div class="relative group">
              <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Buscar tutorial..."
                class="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-gray-400 dark:text-text-primary"
              />
            </div>
            
            <div class="relative">
              <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <FunnelIcon class="w-4 h-4 text-gray-400" />
              </div>
              <select 
                v-model="selectedDifficulty"
                class="appearance-none pl-9 pr-8 py-2.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all cursor-pointer text-gray-700 dark:text-text-primary"
              >
                <option :value="null">Todos os níveis</option>
                <option v-for="level in difficulties" :key="level" :value="level">{{ level }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div v-if="filteredTutorials.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TutorialCard
          v-for="(tutorial, index) in filteredTutorials"
          :key="tutorial.id"
          :post="tutorial"
          :index="index"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20">
        <div class="w-20 h-20 bg-gray-100 dark:bg-dark-elem rounded-full flex items-center justify-center mx-auto mb-6">
          <BookOpenIcon class="w-10 h-10 text-gray-400" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-text-primary mb-2">Nenhum tutorial encontrado</h3>
        <p class="text-gray-500 dark:text-text-muted">Tente ajustar seus filtros ou busca.</p>
        <button 
          @click="searchQuery = ''; selectedDifficulty = null"
          class="mt-6 px-6 py-2 bg-primary text-white dark:text-dark-bg font-semibold rounded-lg hover:bg-primary-hover transition-colors"
        >
          Limpar filtros
        </button>
      </div>
    </div>
  </div>
</template>
