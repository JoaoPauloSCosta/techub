<script setup lang="ts">
import { computed } from 'vue'
import { ClockIcon } from '@heroicons/vue/24/outline'
import type { Post } from '../../shared/types'
import { formatDate } from '~/utils/formatDate'

interface Props {
  post: Post
  index?: number
}

const props = withDefaults(defineProps<Props>(), {
  index: 0
})

const formattedDate = computed(() => formatDate(props.post.date))
</script>

<template>
  <NuxtLink
    :to="`/articles/${post.slug}`"
    :id="`post-card-${post.id}`"
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 250, damping: 25, delay: 50 + (index * 80) } }"
    class="block bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded overflow-hidden group cursor-pointer transition-all duration-350 hover:border-primary/50 hover:shadow-card-hover hover-lift"
  >
    <!-- Thumbnail -->
    <div class="relative aspect-video overflow-hidden">
      <img
        :src="post.image"
        :alt="post.title"
        class="w-full h-full object-cover transition-transform duration-500 ease-spring group-hover:scale-105"
      />
      
      <!-- Overlay on hover -->
      <div class="absolute inset-0 bg-gradient-to-t from-dark-bg/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <!-- Category Badge - Sharp -->
      <span class="absolute top-3 left-3 px-2.5 py-1 bg-primary text-dark-bg text-xs font-bold uppercase tracking-wide rounded shadow-sm">
        {{ post.category }}
      </span>
    </div>

    <!-- Content -->
    <div class="p-5">
      <!-- Title -->
      <h3 class="text-gray-900 dark:text-text-primary font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
        {{ post.title }}
      </h3>

      <!-- Excerpt -->
      <p class="text-gray-500 dark:text-text-muted text-sm mb-4 line-clamp-2">
        {{ post.excerpt }}
      </p>

      <!-- Meta Row -->
      <div class="flex items-center justify-between">
        <!-- Author -->
        <div class="flex items-center gap-2.5">
          <img
            :src="post.author.avatar"
            :alt="post.author.name"
            class="w-7 h-7 rounded object-cover border border-gray-200 dark:border-dark-border"
          />
          <span class="text-gray-600 dark:text-text-secondary text-sm">{{ post.author.name }}</span>
        </div>

        <!-- Date & Read Time -->
        <div class="flex items-center gap-3 text-gray-400 dark:text-text-muted text-xs">
          <span>{{ formattedDate }}</span>
          <div class="flex items-center gap-1">
            <ClockIcon class="w-3.5 h-3.5" />
            <span>{{ post.readTime }}min</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom accent line - appears on hover -->
    <div class="h-0.5 bg-gradient-to-r from-primary via-accent to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
  </NuxtLink>
</template>
