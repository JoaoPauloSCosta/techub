<script setup lang="ts">
import { useSeoMeta } from '#imports'
import { ref, computed } from 'vue'
import VideoCard from '~/components/VideoCard.vue'
import VideoPlayerModal from '~/components/VideoPlayerModal.vue'
import { useVideos } from '~/composables/useVideos'
import { MagnifyingGlassIcon, PlayCircleIcon, FilmIcon } from '@heroicons/vue/24/outline'
import type { Video } from '#shared/types'

// SEO Meta
useSeoMeta({
  title: 'Vídeos e Tutoriais - TechHub',
  description: 'Biblioteca de vídeos sobre Vue.js, Nuxt, IA Generativa, Automação e desenvolvimento assistido por IA. Tutoriais, reviews e entrevistas.',
  ogTitle: 'Vídeos e Tutoriais - TechHub',
  ogDescription: 'Aprenda com os melhores vídeos sobre tecnologia, programação e IA.',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image'
})

// Define layout
definePageMeta({
  layout: 'default-layout'
})

// Data from composables
const { getAllVideos } = useVideos()
const { data: dbVideos } = await useAsyncData('videos-page', () => getAllVideos())
const allVideos = computed(() => dbVideos.value || [])

// Search and filter state
const searchQuery = ref('')
const selectedCategory = ref('Todos')

// Category definitions with their associated tags
const categories = [
  { id: 'todos', label: 'Todos', tags: [] },
  { id: 'vue-nuxt', label: 'Vue.js & Nuxt', tags: ['Vue', 'Nuxt'] },
  { id: 'ia-generativa', label: 'IA Generativa', tags: ['IA', 'GPT', 'LLM'] },
  { id: 'automacao', label: 'Automação', tags: ['Automação'] },
  { id: 'dev-ia', label: 'Desenvolvimento Assistido por IA', tags: ['Copilot', 'Cursor', 'AI'] },
  { id: 'vibe-coding', label: 'Vibe Coding', tags: ['Vibe Coding'] }
]

// Filtered videos based on search and category
const filteredVideos = computed(() => {
  let result = allVideos.value

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    result = result.filter(video =>
      video.title.toLowerCase().includes(query)
    )
  }

  // Filter by category
  if (selectedCategory.value !== 'Todos') {
    const category = categories.find(c => c.label === selectedCategory.value)
    if (category && category.tags.length > 0) {
      result = result.filter(video =>
        video.tags.some(tag =>
          category.tags.some(catTag =>
            tag.toLowerCase().includes(catTag.toLowerCase())
          )
        )
      )
    }
  }

  return result
})

// Category toggle handler
const toggleCategory = (categoryLabel: string) => {
  if (selectedCategory.value === categoryLabel) {
    selectedCategory.value = 'Todos'
  } else {
    selectedCategory.value = categoryLabel
  }
}

// Video modal state
const selectedVideo = ref<Video | null>(null)
const isVideoModalOpen = ref(false)

const handleVideoPlay = (video: Video) => {
  selectedVideo.value = video
  isVideoModalOpen.value = true
}

const handleVideoModalClose = () => {
  isVideoModalOpen.value = false
  selectedVideo.value = null
}
</script>

<template>
  <div id="videos-page">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <header
        v-motion
        :initial="{ opacity: 0, y: -20 }"
        :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 250, damping: 25 } }"
        class="mb-10"
      >
        <div class="flex items-center gap-4 mb-4">
          <div class="w-14 h-14 bg-error/10 border border-error/20 rounded-lg flex items-center justify-center">
            <PlayCircleIcon class="w-7 h-7 text-error" />
          </div>
          <div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-text-primary">
              Vídeos e Tutoriais
            </h1>
            <p class="text-gray-600 dark:text-text-muted mt-1">
              Aprenda com os melhores conteúdos em vídeo sobre tecnologia e programação
            </p>
          </div>
        </div>
      </header>

      <!-- Search and Filters -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
        class="mb-8 space-y-4"
      >
        <!-- Search Input -->
        <div class="relative max-w-md">
          <MagnifyingGlassIcon class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-text-muted" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar vídeos pelo título..."
            class="w-full pl-12 pr-4 py-3 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg text-gray-900 dark:text-text-primary placeholder-gray-400 dark:placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
          />
        </div>

        <!-- Category Pills -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="category in categories"
            :key="category.id"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              selectedCategory === category.label
                ? 'bg-primary text-dark-bg shadow-glow'
                : 'bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border text-gray-600 dark:text-text-secondary hover:border-primary/50 hover:text-primary'
            ]"
            @click="toggleCategory(category.label)"
          >
            {{ category.label }}
          </button>
        </div>
      </div>

      <!-- Videos Grid -->
      <section aria-label="Lista de Vídeos">
        <!-- Results count -->
        <p
          v-if="filteredVideos.length > 0"
          class="text-sm text-gray-500 dark:text-text-muted mb-4"
        >
          {{ filteredVideos.length }} {{ filteredVideos.length === 1 ? 'vídeo encontrado' : 'vídeos encontrados' }}
        </p>

        <!-- Grid -->
        <div
          v-if="filteredVideos.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <VideoCard
            v-for="(video, index) in filteredVideos"
            :key="video.id"
            :video="video"
            :index="index"
            @play="handleVideoPlay"
          />
        </div>

        <!-- Empty State -->
        <div
          v-else
          v-motion
          :initial="{ opacity: 0, scale: 0.95 }"
          :enter="{ opacity: 1, scale: 1 }"
          class="flex flex-col items-center justify-center py-16 px-4"
        >
          <div class="w-20 h-20 bg-gray-100 dark:bg-dark-hover border border-gray-200 dark:border-dark-border rounded-full flex items-center justify-center mb-6">
            <FilmIcon class="w-10 h-10 text-gray-400 dark:text-text-muted" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-text-primary mb-2">
            Nenhum vídeo encontrado
          </h3>
          <p class="text-gray-500 dark:text-text-muted text-center max-w-md">
            Não encontramos vídeos com os filtros selecionados. Tente ajustar sua busca ou limpar os filtros.
          </p>
          <button
            v-if="searchQuery || selectedCategory !== 'Todos'"
            class="mt-6 px-6 py-2 bg-primary text-dark-bg font-medium rounded-lg hover:bg-primary-light transition-colors duration-200"
            @click="searchQuery = ''; selectedCategory = 'Todos'"
          >
            Limpar filtros
          </button>
        </div>
      </section>
    </div>

    <!-- Video Player Modal -->
    <VideoPlayerModal
      :video="selectedVideo"
      :is-open="isVideoModalOpen"
      @close="handleVideoModalClose"
    />
  </div>
</template>
