<script setup lang="ts">
import { computed } from 'vue'
import { ClockIcon, AcademicCapIcon, SignalIcon } from '@heroicons/vue/24/outline'
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

const difficultyColor = computed(() => {
  switch (props.post.difficulty) {
    case 'Iniciante': return 'bg-success text-dark-bg'
    case 'Intermediário': return 'bg-warning text-dark-bg'
    case 'Avançado': return 'bg-error text-dark-bg'
    default: return 'bg-gray-500 text-white'
  }
})

const difficultyIcon = computed(() => {
  switch (props.post.difficulty) {
    case 'Iniciante': return SignalIcon
    case 'Intermediário': return SignalIcon
    case 'Avançado': return AcademicCapIcon
    default: return AcademicCapIcon
  }
})
</script>

<template>
  <NuxtLink
    :to="`/articles/${post.slug}`"
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 20, delay: 50 + (index * 100) } }"
    class="flex flex-col h-full bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl overflow-hidden group hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
  >
    <!-- Image Section -->
    <div class="relative w-full aspect-[16/9] overflow-hidden">
      <img
        :src="post.image"
        :alt="post.title"
        class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>

      <!-- Difficulty Badge -->
      <div class="absolute top-4 left-4 flex gap-2">
        <span 
          v-if="post.difficulty"
          :class="['px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md shadow-lg flex items-center gap-1.5', difficultyColor]"
        >
          <component :is="difficultyIcon" class="w-3.5 h-3.5" />
          {{ post.difficulty }}
        </span>
      </div>
      
      <!-- Type Badge -->
      <div class="absolute top-4 right-4">
        <span class="px-3 py-1.5 bg-dark-bg/80 backdrop-blur-sm text-text-primary text-xs font-bold uppercase tracking-wider rounded-md border border-dark-border">
          Tutorial
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 p-6 flex flex-col">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-primary text-xs font-bold uppercase tracking-widest">{{ post.category }}</span>
        <span class="text-gray-300 dark:text-dark-border">•</span>
        <span class="text-gray-500 dark:text-text-muted text-xs">{{ formattedDate }}</span>
      </div>

      <h3 class="text-2xl font-bold text-gray-900 dark:text-text-primary mb-3 leading-tight group-hover:text-primary transition-colors">
        {{ post.title }}
      </h3>

      <p class="text-gray-600 dark:text-text-secondary text-base mb-6 line-clamp-2">
        {{ post.excerpt }}
      </p>
      
      <div class="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-dark-border/50">
        <div class="flex items-center gap-3">
          <img :src="post.author.avatar" class="w-8 h-8 rounded-full ring-2 ring-gray-100 dark:ring-dark-border" :alt="post.author.name" />
          <div class="text-xs">
            <span class="block font-semibold text-gray-900 dark:text-text-primary">{{ post.author.name }}</span>
            <span class="text-gray-500 dark:text-text-muted">{{ post.author.role || 'Autor' }}</span>
          </div>
        </div>

        <div class="flex items-center gap-1.5 text-primary bg-primary/5 px-3 py-1.5 rounded-full text-xs font-medium">
          <ClockIcon class="w-4 h-4" />
          {{ post.readTime }} min leitura
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
