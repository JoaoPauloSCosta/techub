<script setup lang="ts">
import { PlayIcon } from '@heroicons/vue/24/solid'
import type { Video } from '#shared/types'

interface Props {
  video: Video
  index?: number
}

const props = withDefaults(defineProps<Props>(), {
  index: 0
})

const emit = defineEmits<{
  play: [video: Video]
}>()

const handleClick = () => {
  emit('play', props.video)
}
</script>

<template>
  <article
    :id="`video-card-${video.id}`"
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 250, damping: 25, delay: 50 + (index * 80) } }"
    class="relative bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded overflow-hidden group cursor-pointer transition-all duration-350 hover:border-primary/50 hover:shadow-card-hover hover-lift"
    @click="handleClick"
  >
    <!-- Thumbnail -->
    <div class="relative aspect-video overflow-hidden">
      <img
        :src="video.thumbnail"
        :alt="video.title"
        class="w-full h-full object-cover transition-transform duration-500 ease-spring group-hover:scale-105"
      />

      <!-- Dark overlay -->
      <div class="absolute inset-0 bg-dark-bg/30 group-hover:bg-dark-bg/50 transition-colors duration-300"></div>

      <!-- Play Button - Premium style -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-16 h-16 bg-primary/90 backdrop-blur-sm rounded flex items-center justify-center transform scale-90 opacity-90 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-glow press-effect">
          <PlayIcon class="w-7 h-7 text-dark-bg ml-1" />
        </div>
      </div>

      <!-- Duration Badge -->
      <span class="absolute bottom-3 right-3 px-2 py-1 bg-dark-bg/90 backdrop-blur-sm text-text-primary text-xs font-mono font-medium rounded">
        {{ video.duration }}
      </span>

      <!-- Live indicator (optional) -->
      <span v-if="video.tags.includes('Live')" class="absolute top-3 right-3 px-2 py-1 bg-error text-white text-xs font-bold uppercase tracking-wide rounded animate-pulse">
        LIVE
      </span>
    </div>

    <!-- Content -->
    <div class="p-5">
      <!-- Title -->
      <h3 class="text-gray-900 dark:text-text-primary font-semibold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
        {{ video.title }}
      </h3>

      <!-- Channel with verified style -->
      <p class="text-gray-600 dark:text-text-secondary text-sm mb-3 flex items-center gap-1.5">
        <span>{{ video.channel }}</span>
        <svg class="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in video.tags.slice(0, 3)"
          :key="tag"
          class="px-2.5 py-1 bg-gray-100 dark:bg-dark-hover border border-gray-200 dark:border-dark-border text-gray-500 dark:text-text-muted text-xs rounded hover:border-primary/50 hover:text-gray-700 dark:hover:text-text-secondary transition-all duration-200"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- Bottom accent line -->
    <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
  </article>
</template>
