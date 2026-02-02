<script setup lang="ts">
import { useSeoMeta } from '#imports'
import { ref, computed } from 'vue'
import PostCard from '~/components/PostCard.vue'
import { usePosts } from '~/composables/usePosts'
import { MagnifyingGlassIcon, NewspaperIcon, DocumentTextIcon } from '@heroicons/vue/24/outline'

// SEO Meta
useSeoMeta({
  title: 'Últimas Notícias & Artigos - TechHub',
  description: 'Fique por dentro do mundo do desenvolvimento e tecnologia. Artigos, tutoriais e notícias sobre Vue.js, Nuxt, IA Generativa, Automação e muito mais.',
  ogTitle: 'Últimas Notícias & Artigos - TechHub',
  ogDescription: 'Fique por dentro do mundo do desenvolvimento e tecnologia.',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image'
})

// Define layout
definePageMeta({
  layout: 'default-layout'
})

// Data from composables
const { getAllPosts } = usePosts()
const allPosts = getAllPosts()

// Search and filter state
const searchQuery = ref('')
const selectedCategory = ref('Todos')

// Category definitions with their associated tags/keywords
// Maps filter labels to related keywords found in post tags, categories, or content
const categories = [
  { id: 'todos', label: 'Todos', keywords: [] },
  { id: 'vue-nuxt', label: 'Vue.js & Nuxt', keywords: ['vue', 'nuxt', 'nitro', 'vite'] },
  { id: 'ia-generativa', label: 'IA Generativa', keywords: ['ia', 'gpt', 'openai', 'llm', 'claude', 'gemini', 'ai'] },
  { id: 'automacao', label: 'Automação', keywords: ['automação', 'automation', 'script', 'pipeline', 'ci', 'cd'] },
  { id: 'dev-ia', label: 'Desenvolvimento Assistido por IA', keywords: ['copilot', 'cursor', 'ai', 'ia', 'produtividade', 'ia dev'] },
  { id: 'vibe-coding', label: 'Vibe Coding', keywords: ['produtividade', 'ia', 'cursor', 'copilot', 'workflow', 'dx'] }
]

// Filtered posts based on search and category
const filteredPosts = computed(() => {
  let result = allPosts

  // Filter by search query (title or excerpt)
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    result = result.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query)
    )
  }

  // Filter by category
  if (selectedCategory.value !== 'Todos') {
    const category = categories.find(c => c.label === selectedCategory.value)
    if (category && category.keywords.length > 0) {
      result = result.filter(post => {
        // Check tags
        const tagsMatch = post.tags?.some(tag =>
          category.keywords.some(keyword =>
            tag.toLowerCase().includes(keyword.toLowerCase())
          )
        )
        // Check category field
        const categoryMatch = category.keywords.some(keyword =>
          post.category.toLowerCase().includes(keyword.toLowerCase())
        )
        return tagsMatch || categoryMatch
      })
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

// Pagination state
const itemsPerPage = 9
const currentPage = ref(1)

// Paginated posts
const paginatedPosts = computed(() => {
  return filteredPosts.value.slice(0, currentPage.value * itemsPerPage)
})

// Has more posts to load
const hasMorePosts = computed(() => {
  return paginatedPosts.value.length < filteredPosts.value.length
})

// Load more handler
const loadMore = () => {
  currentPage.value++
}

// Reset pagination when filters change
const resetPagination = () => {
  currentPage.value = 1
}
</script>

<template>
  <div id="articles-page">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <header
        v-motion
        :initial="{ opacity: 0, y: -20 }"
        :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 250, damping: 25 } }"
        class="mb-10"
      >
        <div class="flex items-center gap-4 mb-4">
          <div class="w-14 h-14 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
            <NewspaperIcon class="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-text-primary">
              Últimas Notícias
            </h1>
            <p class="text-gray-600 dark:text-text-muted mt-1">
              Fique por dentro do mundo do desenvolvimento e tecnologia
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
            placeholder="Buscar artigos pelo título ou resumo..."
            class="w-full pl-12 pr-4 py-3 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg text-gray-900 dark:text-text-primary placeholder-gray-400 dark:placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
            @input="resetPagination"
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
            @click="toggleCategory(category.label); resetPagination()"
          >
            {{ category.label }}
          </button>
        </div>
      </div>

      <!-- Articles Grid -->
      <section aria-label="Lista de Artigos">
        <!-- Results count -->
        <p
          v-if="filteredPosts.length > 0"
          class="text-sm text-gray-500 dark:text-text-muted mb-4"
        >
          {{ filteredPosts.length }} {{ filteredPosts.length === 1 ? 'artigo encontrado' : 'artigos encontrados' }}
        </p>

        <!-- Grid -->
        <div
          v-if="paginatedPosts.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <PostCard
            v-for="(post, index) in paginatedPosts"
            :key="post.id"
            :post="post"
            :index="index"
          />
        </div>

        <!-- Load More Button -->
        <div
          v-if="hasMorePosts"
          class="flex justify-center mt-10"
        >
          <button
            v-motion
            :initial="{ opacity: 0, y: 10 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
            class="px-8 py-3 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border text-gray-700 dark:text-text-primary font-medium rounded-lg hover:border-primary hover:text-primary transition-all duration-200 flex items-center gap-2"
            @click="loadMore"
          >
            <span>Carregar Mais</span>
            <span class="text-sm text-gray-400 dark:text-text-muted">
              ({{ filteredPosts.length - paginatedPosts.length }} restantes)
            </span>
          </button>
        </div>

        <!-- Empty State -->
        <div
          v-if="filteredPosts.length === 0"
          v-motion
          :initial="{ opacity: 0, scale: 0.95 }"
          :enter="{ opacity: 1, scale: 1 }"
          class="flex flex-col items-center justify-center py-16 px-4"
        >
          <div class="w-20 h-20 bg-gray-100 dark:bg-dark-hover border border-gray-200 dark:border-dark-border rounded-full flex items-center justify-center mb-6">
            <DocumentTextIcon class="w-10 h-10 text-gray-400 dark:text-text-muted" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-text-primary mb-2">
            Nenhum artigo encontrado
          </h3>
          <p class="text-gray-500 dark:text-text-muted text-center max-w-md">
            Não encontramos artigos com os filtros selecionados. Tente ajustar sua busca ou limpar os filtros.
          </p>
          <button
            v-if="searchQuery || selectedCategory !== 'Todos'"
            class="mt-6 px-6 py-2 bg-primary text-dark-bg font-medium rounded-lg hover:bg-primary-light transition-colors duration-200"
            @click="searchQuery = ''; selectedCategory = 'Todos'; resetPagination()"
          >
            Limpar filtros
          </button>
        </div>
      </section>
    </div>
  </div>
</template>
