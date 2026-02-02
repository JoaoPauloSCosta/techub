<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/solid'
import type { Video } from '#shared/types'

interface Props {
  video: Video | null
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

// Extract YouTube video ID from URL
const getYouTubeEmbedUrl = (url: string): string => {
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/
  const match = url.match(regex)
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`
  }
  return url
}

const embedUrl = computed(() => {
  if (props.video?.url) {
    return getYouTubeEmbedUrl(props.video.url)
  }
  return ''
})

const handleClose = () => {
  emit('close')
}

const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    handleClose()
  }
}

// Handle escape key
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    handleClose()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen && video"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-bg/90 backdrop-blur-sm"
        @click="handleBackdropClick"
      >
        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.95, y: 20 }"
          :enter="{ opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } }"
          class="relative w-full max-w-5xl bg-dark-card border border-dark-border rounded-lg overflow-hidden shadow-2xl"
        >
          <!-- Header -->
          <div class="flex items-center justify-between p-4 border-b border-dark-border">
            <div class="flex-1 min-w-0 pr-4">
              <h3 class="text-text-primary font-semibold text-lg truncate">
                {{ video.title }}
              </h3>
              <p class="text-text-secondary text-sm mt-1">
                {{ video.channel }} • {{ video.duration }}
              </p>
            </div>
            <button
              @click="handleClose"
              class="p-2 text-text-muted hover:text-text-primary hover:bg-dark-hover rounded-lg transition-colors duration-200"
              aria-label="Fechar modal"
            >
              <XMarkIcon class="w-6 h-6" />
            </button>
          </div>

          <!-- Video Player -->
          <div class="relative aspect-video bg-dark-bg">
            <iframe
              v-if="embedUrl"
              :src="embedUrl"
              class="absolute inset-0 w-full h-full"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>

          <!-- Footer with tags -->
          <div class="p-4 border-t border-dark-border">
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in video.tags"
                :key="tag"
                class="px-3 py-1.5 bg-dark-hover border border-dark-border text-text-muted text-xs rounded-full"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
