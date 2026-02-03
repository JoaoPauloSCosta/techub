<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSeoMeta } from '#imports'
import { usePosts } from '~/composables/usePosts'
import PostCard from '~/components/PostCard.vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

const { getAllPosts } = usePosts()
const allPosts = getAllPosts()

const searchQuery = ref('')
const filteredPosts = computed(() => {
  if (!searchQuery.value) return []
  const q = searchQuery.value.toLowerCase()
  return allPosts.filter(p => 
    p.title.toLowerCase().includes(q) || 
    p.excerpt.toLowerCase().includes(q) ||
    p.tags?.some(tag => tag.toLowerCase().includes(q))
  )
})

useSeoMeta({
  title: 'Pesquisar | TechHub',
  description: 'Pesquise por artigos, tutoriais e notícias.',
})

definePageMeta({
  layout: 'default-layout'
})
</script>

<template>
  <div class="min-h-screen pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto text-center mb-12">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-text-primary mb-6">O que você está procurando?</h1>
      
      <div class="relative">
        <MagnifyingGlassIcon class="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Digite um termo (ex: Vue, IA, Tutorial)..."
          class="w-full pl-12 pr-4 py-4 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl shadow-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-lg"
          autofocus
        />
      </div>
    </div>

    <!-- Results -->
    <div v-if="searchQuery">
      <div v-if="filteredPosts.length > 0">
        <h2 class="text-xl font-bold text-gray-900 dark:text-text-primary mb-6">
          Encontramos {{ filteredPosts.length }} resultados
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PostCard
            v-for="(post, index) in filteredPosts"
            :key="post.id"
            :post="post"
            :index="index"
          />
        </div>
      </div>
      
      <div v-else class="text-center py-20">
        <p class="text-gray-500 dark:text-text-muted text-lg">Nenhum resultado encontrado para "{{ searchQuery }}".</p>
      </div>
    </div>
  </div>
</template>
