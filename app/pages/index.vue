<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSeoMeta } from '#imports'
import { usePosts } from '~/composables/usePosts'
import { useVideos } from '~/composables/useVideos'
import { useJobs } from '~/composables/useJobs'
import { useTrending } from '~/composables/useTrending'
import HeroFeatured from '~/components/HeroFeatured.vue'
import PostCard from '~/components/PostCard.vue'
import VideoCard from '~/components/VideoCard.vue'
import JobsList from '~/components/JobsList.vue'
import NewsletterBox from '~/components/NewsletterBox.vue'
import SidebarTrends from '~/components/SidebarTrends.vue'
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'

const route = useRoute()

// Data Composables
const { getAllPosts } = usePosts()
const { getAllVideos } = useVideos()
const { getAllJobs } = useJobs()
const { getTrending } = useTrending()
const trendingTopics = getTrending()

const allPosts = getAllPosts()
const allVideos = getAllVideos()
const allJobs = getAllJobs()

// --- 1. Topic Detection ---
const currentTopic = computed(() => {
  const t = route.query.topic as string
  return t || null
})

// --- 2. Topic Mapping Configuration ---
const topicConfig = computed(() => {
  const t = currentTopic.value
  if (!t) return null

  const map: Record<string, any> = {
    'vue-nuxt': {
      title: 'Universo Vue.js',
      subtitle: 'Tudo sobre Vue, Nuxt e o ecossistema.',
      tags: ['Vue', 'Nuxt', 'Vue.js', 'Nuxt.js', 'JavaScript', 'TypeScript']
    },
    'ai-dev': {
      title: 'Desenvolvimento com IA',
      subtitle: 'Ferramentas, Copilots e Engenharia de Prompt.',
      tags: ['IA', 'AI', 'Copilot', 'GPT', 'LLM', 'Python', 'Intelligence']
    },
    'automations': {
      title: 'Automação & Scripts',
      subtitle: 'Bots, Python e otimização de workflow.',
      tags: ['Automação', 'Automation', 'Script', 'Bot', 'Python']
    },
    'vibe-coding': {
      title: 'Foco: Vibe Coding',
      subtitle: 'Setups, Produtividade e Lo-fi.',
      tags: ['Vibe', 'Setup', 'Produtividade', 'Lo-fi']
    },
    'backend': {
      title: 'Backend Engineering',
      subtitle: 'Node.js, PHP, APIs e Arquitetura.',
      tags: ['Backend', 'Node', 'Node.js', 'PHP', 'Laravel', 'API', 'Docker', 'SQL']
    }
  }

  return map[t] || { 
    title: `Tópico: ${t}`, 
    subtitle: `Conteúdo filtrado por ${t}`, 
    tags: [t] 
  }
})

// --- 3. Filtering Helper ---
const filterByTopic = (items: any[], tags: string[]) => {
  if (!tags || tags.length === 0) return items
  
  // Strict match: Item must have at least one tag from the topic list
  return items.filter(item => 
    item.tags?.some((tag: string) => 
      tags.some(t => t.toLowerCase() === tag.toLowerCase())
    ) ||
    (item.category && tags.some(t => t.toLowerCase() === item.category.toLowerCase()))
  )
}

// --- 4. Computed Filtered Lists with Fallback ---
const filteredContent = computed(() => {
  const config = topicConfig.value
  
  // Default values (No filters)
  let posts = allPosts
  let videos = allVideos
  let jobs = allJobs
  let isFallback = false
  
  if (config) {
    const fPosts = filterByTopic(allPosts, config.tags)
    const fVideos = filterByTopic(allVideos, config.tags)
    const fJobs = filterByTopic(allJobs, config.tags)

    // Check if we found ANY content relative to the topic
    const hasContent = fPosts.length > 0 || fVideos.length > 0 || fJobs.length > 0
    
    if (hasContent) {
      posts = fPosts
      videos = fVideos
      jobs = fJobs
    } else {
      isFallback = true
    }
  }

  // Logic for Featured Post: 
  // If specific topic selected -> First filtered post
  // If General or Fallback -> Global featured
  let featured: Post
  if (currentTopic.value && !isFallback && posts.length > 0) {
      featured = posts[0] as Post
  } else {
      featured = (posts.find(p => p.featured) || posts[0] || allPosts[0]) as Post
  }

  // Filter out the featured post from the list to avoid duplication
  const regularPosts = posts.filter(p => p.id !== featured?.id)

  return {
    featured,
    posts: regularPosts,
    videos,
    jobs,
    isFallback
  }
})

// --- SEO ---
useSeoMeta({
  title: topicConfig.value ? `${topicConfig.value.title} | TechHub` : 'TechHub - O ponto de encontro dev',
  description: topicConfig.value?.subtitle || 'Notícias, tutoriais e vagas para desenvolvedores.',
})

definePageMeta({
  layout: 'default-layout'
})
</script>

<template>
  <div class="min-h-screen pb-20">
    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div v-if="topicConfig" class="mb-8 animate-fade-in-down">
         <span class="text-xs font-bold tracking-widest text-primary uppercase mb-2 block">Modo Foco Ativado</span>
         <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-text-primary mb-2 tracking-tight">
           {{ topicConfig.title }}
         </h1>
         <p class="text-xl text-gray-500 dark:text-text-muted max-w-2xl">
           {{ topicConfig.subtitle }}
         </p>
      </div>

      <!-- Fallback Alert -->
      <div 
        v-if="filteredContent.isFallback" 
        class="mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg flex items-start gap-3 animate-fade-in"
      >
        <ExclamationCircleIcon class="w-6 h-6 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
        <div>
          <h3 class="text-sm font-bold text-yellow-800 dark:text-yellow-400">Conteúdo não encontrado para este tópico</h3>
          <p class="text-sm text-yellow-700 dark:text-yellow-500/80 mt-1">
            Ainda não publicamos conteúdo específico sobre <strong>{{ topicConfig?.title }}</strong>. Mostrando todo o conteúdo disponível por enquanto.
          </p>
        </div>
      </div>

      <HeroFeatured :post="filteredContent.featured" />
    </section>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
      <!-- Main Content -->
      <main class="lg:col-span-8 space-y-16">
        
        <!-- Latest Posts -->
        <section>
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-text-primary flex items-center gap-2">
              <span class="w-2 h-8 bg-primary rounded-full"></span>
              Últimas do {{ topicConfig?.title || 'TechHub' }}
            </h2>
          </div>
          
          <div v-if="filteredContent.posts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PostCard
              v-for="(post, index) in filteredContent.posts"
              :key="post.id"
              :post="post"
              :index="index"
            />
          </div>
          <div v-else class="py-12 text-center border-2 border-dashed border-gray-100 dark:border-dark-border rounded-xl">
             <p class="text-gray-500">Nenhum artigo encontrado para este filtro.</p>
          </div>
        </section>

        <NewsletterBox />

        <!-- Videos Section -->
        <section v-if="filteredContent.videos.length > 0 || !currentTopic">
          <div class="flex items-center justify-between mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-text-primary">
              Vídeos em Alta
            </h2>
            <a href="/videos" class="text-primary hover:text-primary-hover font-medium text-sm flex items-center gap-1 group">
              Ver todos 
              <span class="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <VideoCard
              v-for="video in filteredContent.videos.slice(0, 2)"
              :key="video.id"
              :video="video"
            />
          </div>
        </section>

      </main>

      <!-- Sidebar -->
      <aside class="lg:col-span-4 space-y-12">
        <SidebarTrends :topics="trendingTopics" />
        
        <!-- Jobs Widget -->
        <div v-if="filteredContent.jobs.length > 0 || !currentTopic">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-text-primary">
              Vagas Relacionadas
            </h3>
            <a href="/jobs" class="text-sm text-gray-500 hover:text-primary transition-colors">Ver todas</a>
          </div>
          <JobsList :jobs="filteredContent.jobs.slice(0, 4)" :compact="true" />
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in-down {
  animation: fadeInDown 0.5s ease-out;
}
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
