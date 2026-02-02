<script setup lang="ts">
import { useSeoMeta } from '#imports'
import HeroFeatured from '~/components/HeroFeatured.vue'
import PostCard from '~/components/PostCard.vue'
import VideoCard from '~/components/VideoCard.vue'
import VideoPlayerModal from '~/components/VideoPlayerModal.vue'
import JobsList from '~/components/JobsList.vue'
import NewsletterBox from '~/components/NewsletterBox.vue'
import SidebarTrends from '~/components/SidebarTrends.vue'
import { usePosts } from '~/composables/usePosts'
import { useVideos } from '~/composables/useVideos'
import { useJobs } from '~/composables/useJobs'
import { useTrending } from '~/composables/useTrending'
import { SparklesIcon, PlayCircleIcon, NewspaperIcon } from '@heroicons/vue/24/outline'
import type { Video } from '#shared/types'

// SEO Meta
useSeoMeta({
  title: 'TechHub - Notícias de Tecnologia, Vue.js, Nuxt e IA',
  description: 'Seu portal de tecnologia com foco em Vue.js, Nuxt, desenvolvimento assistido por IA, notícias de empresas de IA e vagas Vue/PHP.',
  ogTitle: 'TechHub - Notícias de Tecnologia',
  ogDescription: 'Artigos, vídeos e vagas sobre Vue.js, Nuxt, IA e desenvolvimento moderno.',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image'
})

// Data from composables
const { getFeaturedPost, getLatestPosts } = usePosts()
const { getVideos } = useVideos()
const { getJobs } = useJobs()
const { getTrending } = useTrending()

const featuredPost = getFeaturedPost()
const latestPosts = getLatestPosts(6)
const videos = getVideos(4)
const jobs = getJobs(5)
const trendingTopics = getTrending(5)

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

// Define layout
definePageMeta({
  layout: 'default-layout'
})
</script>

<template>
  <div id="home-page">
    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Main Column (8/12 = ~66%) -->
        <div class="lg:col-span-8 space-y-14">
          <!-- Hero Featured Post -->
          <section v-if="featuredPost" aria-label="Destaque">
            <HeroFeatured :post="featuredPost" />
          </section>

          <!-- Latest News Section -->
          <section aria-label="Últimas Notícias">
            <div
              v-motion
              :initial="{ opacity: 0, x: -20 }"
              :enter="{ opacity: 1, x: 0, transition: { delay: 100 } }"
              class="flex items-center gap-3 mb-6"
            >
              <div class="w-10 h-10 bg-primary/10 border border-primary/20 rounded flex items-center justify-center">
                <NewspaperIcon class="w-5 h-5 text-primary" />
              </div>
              <div class="flex-1">
                <h2 class="text-2xl font-bold text-text-primary">
                  Últimas Notícias
                </h2>
                <p class="text-text-muted text-sm">As notícias mais recentes do mundo tech</p>
              </div>
              <a href="/artigos" class="text-primary hover:text-primary-light transition-colors text-sm font-medium">
                Ver todas →
              </a>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <PostCard
                v-for="(post, index) in latestPosts.slice(0, 4)"
                :key="post.id"
                :post="post"
                :index="index"
              />
            </div>
          </section>

          <!-- Author Content Section -->
          <section aria-label="Conteúdo Autoral">
            <div
              v-motion
              :initial="{ opacity: 0, x: -20 }"
              :enter="{ opacity: 1, x: 0, transition: { delay: 100 } }"
              class="flex items-center gap-3 mb-6"
            >
              <div class="w-10 h-10 bg-accent/10 border border-accent/20 rounded flex items-center justify-center">
                <SparklesIcon class="w-5 h-5 text-accent" />
              </div>
              <div class="flex-1">
                <h2 class="text-2xl font-bold text-text-primary">
                  Conteúdo Autoral
                </h2>
                <p class="text-text-muted text-sm">Artigos exclusivos dos nossos especialistas</p>
              </div>
              <a href="/autores" class="text-primary hover:text-primary-light transition-colors text-sm font-medium">
                Ver autores →
              </a>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <PostCard
                v-for="(post, index) in latestPosts.slice(2, 4)"
                :key="`autoral-${post.id}`"
                :post="post"
                :index="index"
              />
            </div>
          </section>

          <!-- Videos Section -->
          <section aria-label="Vídeos">
            <div
              v-motion
              :initial="{ opacity: 0, x: -20 }"
              :enter="{ opacity: 1, x: 0, transition: { delay: 100 } }"
              class="flex items-center gap-3 mb-6"
            >
              <div class="w-10 h-10 bg-error/10 border border-error/20 rounded flex items-center justify-center">
                <PlayCircleIcon class="w-5 h-5 text-error" />
              </div>
              <div class="flex-1">
                <h2 class="text-2xl font-bold text-text-primary">
                  Vídeos em Destaque
                </h2>
                <p class="text-text-muted text-sm">Tutoriais, reviews e entrevistas</p>
              </div>
              <a href="/videos" class="text-primary hover:text-primary-light transition-colors text-sm font-medium">
                Ver todos →
              </a>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <VideoCard
                v-for="(video, index) in videos"
                :key="video.id"
                :video="video"
                :index="index"
                @play="handleVideoPlay"
              />
            </div>
          </section>

          <!-- Jobs Section -->
          <section aria-label="Vagas">
            <JobsList :jobs="jobs" />
          </section>
        </div>

        <!-- Sidebar Column (4/12 = ~33%) -->
        <aside class="lg:col-span-4 space-y-6">
          <!-- Sticky container for sidebar -->
          <div class="lg:sticky lg:top-32 space-y-6">
            <!-- Newsletter Box -->
            <NewsletterBox />

            <!-- Trending Topics -->
            <SidebarTrends :topics="trendingTopics" />

            <!-- Sponsor Card -->
            <div
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }"
              class="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded p-6"
            >
              <span class="text-gray-500 dark:text-text-muted text-xs uppercase tracking-widest font-medium">Patrocinado</span>
              <div class="mt-4 aspect-video bg-gray-100 dark:bg-dark-hover border border-gray-200 dark:border-dark-border rounded flex items-center justify-center">
                <span class="text-gray-500 dark:text-text-muted text-sm">Espaço publicitário</span>
              </div>
              <p class="text-gray-500 dark:text-text-muted text-xs mt-3 text-center">
                <a href="/anuncie" class="text-primary hover:text-primary-light transition-colors">Anuncie aqui</a>
              </p>
            </div>

            <!-- Popular Tags -->
            <div
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
              class="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded p-6"
            >
              <h3 class="text-lg font-bold text-gray-900 dark:text-text-primary mb-4">Tags Populares</h3>
              <div class="flex flex-wrap gap-2">
                <a
                  v-for="tag in ['Vue.js', 'Nuxt', 'TypeScript', 'IA', 'PHP', 'Laravel', 'Remoto']"
                  :key="tag"
                  href="#"
                  class="px-3 py-1.5 bg-gray-100 dark:bg-dark-hover border border-gray-200 dark:border-dark-border hover:border-primary/30 text-gray-600 dark:text-text-secondary hover:text-primary rounded text-sm transition-all duration-200"
                >
                  {{ tag }}
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>

    <!-- Video Player Modal -->
    <VideoPlayerModal
      :video="selectedVideo"
      :is-open="isVideoModalOpen"
      @close="handleVideoModalClose"
    />
  </div>
</template>
