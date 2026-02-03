<script setup lang="ts">
import { PlayIcon, ArrowLeftIcon, CalendarIcon } from '@heroicons/vue/24/solid'
import { useVideos } from '~/composables/useVideos'

const route = useRoute()
const { getVideoById } = useVideos()

const videoId = computed(() => route.params.id as string)
const video = computed(() => getVideoById(videoId.value))

// SEO
useSeoMeta({
  title: () => video.value ? `${video.value.title} | TechHub` : 'Vídeo não encontrado | TechHub',
  description: () => video.value ? `Assista ${video.value.title} no canal ${video.value.channel}` : 'Vídeo não encontrado'
})

// Formatação de data
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

// Formatação de views
const formatViews = (views: number) => {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M visualizações`
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K visualizações`
  }
  return `${views} visualizações`
}

// Extrair ID do YouTube da URL
const youtubeVideoId = computed(() => {
  if (!video.value?.url) return null
  
  const url = video.value.url
  
  // Handle different YouTube URL formats
  // https://www.youtube.com/watch?v=VIDEO_ID
  // https://youtu.be/VIDEO_ID
  // https://www.youtube.com/embed/VIDEO_ID
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  
  return null
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-bg">
    <!-- Video Found -->
    <div v-if="video" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Back Button -->
      <NuxtLink
        to="/videos"
        class="inline-flex items-center gap-2 text-gray-600 dark:text-text-secondary hover:text-primary dark:hover:text-primary transition-colors duration-200 mb-6 group"
      >
        <ArrowLeftIcon class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" />
        <span>Voltar para Vídeos</span>
      </NuxtLink>

      <!-- Player Area -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
        class="relative aspect-video rounded-xl overflow-hidden bg-dark-bg shadow-2xl mb-8"
      >
        <!-- YouTube Embedded Player -->
        <iframe
          v-if="youtubeVideoId"
          :src="`https://www.youtube.com/embed/${youtubeVideoId}?rel=0&modestbranding=1`"
          :title="video.title"
          class="absolute inset-0 w-full h-full"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>

        <!-- Fallback when no YouTube URL -->
        <template v-else>
          <!-- Thumbnail Background -->
          <img
            :src="video.thumbnail"
            :alt="video.title"
            class="absolute inset-0 w-full h-full object-cover"
          />
          
          <!-- Overlay -->
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div class="text-center text-white">
              <PlayIcon class="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p class="text-lg opacity-75">Vídeo não disponível para reprodução</p>
            </div>
          </div>
        </template>



        <!-- Live indicator -->
        <span v-if="video.tags.includes('Live')" class="absolute top-4 right-4 px-3 py-1.5 bg-error text-white text-sm font-bold uppercase tracking-wide rounded-lg animate-pulse z-10">
          LIVE
        </span>
      </div>

      <!-- Video Details -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 100 } }"
        class="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-6 md:p-8"
      >
        <!-- Title -->
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-text-primary mb-4 leading-tight">
          {{ video.title }}
        </h1>

        <!-- Channel & Meta -->
        <div class="flex flex-wrap items-center gap-4 mb-6 text-gray-600 dark:text-text-secondary">
          <!-- Channel with verified -->
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-dark-bg font-bold">
              {{ video.channel.charAt(0) }}
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <span class="font-semibold text-gray-900 dark:text-text-primary">{{ video.channel }}</span>
                <svg class="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
          </div>

          <span class="hidden sm:block text-gray-300 dark:text-dark-border">•</span>

          <!-- Views -->
          <span class="text-sm">{{ formatViews(video.views ?? 0) }}</span>

          <span class="hidden sm:block text-gray-300 dark:text-dark-border">•</span>

          <!-- Date -->
          <div class="flex items-center gap-1.5 text-sm">
            <CalendarIcon class="w-4 h-4" />
            <span>{{ formatDate(video.date) }}</span>
          </div>
        </div>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in video.tags"
            :key="tag"
            class="px-3 py-1.5 bg-gray-100 dark:bg-dark-hover border border-gray-200 dark:border-dark-border text-gray-600 dark:text-text-muted text-sm rounded-lg hover:border-primary/50 hover:text-gray-800 dark:hover:text-text-secondary transition-all duration-200"
          >
            #{{ tag }}
          </span>
        </div>
      </div>
    </div>

    <!-- Video Not Found -->
    <div
      v-else
      class="min-h-[70vh] flex flex-col items-center justify-center px-4"
    >
      <div
        v-motion
        :initial="{ opacity: 0, scale: 0.9 }"
        :enter="{ opacity: 1, scale: 1, transition: { duration: 400 } }"
        class="text-center"
      >
        <div class="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-dark-card rounded-2xl flex items-center justify-center">
          <PlayIcon class="w-12 h-12 text-gray-400 dark:text-text-muted" />
        </div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-text-primary mb-2">
          Vídeo não encontrado
        </h1>
        <p class="text-gray-600 dark:text-text-secondary mb-6">
          O vídeo que você procura não existe ou foi removido.
        </p>
        <NuxtLink
          to="/videos"
          class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-dark-bg font-semibold rounded-lg hover:bg-accent transition-colors duration-200"
        >
          <ArrowLeftIcon class="w-5 h-5" />
          Voltar para Vídeos
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
