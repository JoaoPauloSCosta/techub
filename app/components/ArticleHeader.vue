<script setup lang="ts">
import { computed } from 'vue'
import { ClockIcon, CalendarIcon, TagIcon } from '@heroicons/vue/24/outline'
import type { Post } from '../../shared/types'
import { formatDate } from '~/utils/formatDate'

interface Props {
  article: Post
}

const props = defineProps<Props>()

const categoryColors: Record<string, string> = {
  'nuxt': 'bg-primary/10 text-primary border-primary/20',
  'vue.js': 'bg-success/10 text-success border-success/20',
  'ia dev': 'bg-accent/10 text-accent border-accent/20',
  'ia news': 'bg-accent/10 text-accent border-accent/20',
  'tutoriais': 'bg-warning/10 text-warning border-warning/20',
  'php': 'bg-error/10 text-error border-error/20'
}

const categoryClass = computed<string>(() => {
  const key = props.article.category.toLowerCase()
  return categoryColors[key] || 'bg-dark-hover text-text-secondary border-dark-border'
})
</script>

<template>
  <header id="article-header" class="mb-10">
    <!-- Category Badge -->
    <div
      v-motion
      :initial="{ opacity: 0, y: 10 }"
      :enter="{ opacity: 1, y: 0 }"
      class="mb-4"
    >
      <span
        :class="[
          'inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold border rounded-lg',
          categoryClass
        ]"
      >
        <TagIcon class="w-4 h-4" />
        {{ article.category }}
      </span>
    </div>

    <!-- Title -->
    <h1
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 50 } }"
      class="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-6"
    >
      {{ article.title }}
    </h1>

    <!-- Excerpt -->
    <p
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
      class="text-xl text-text-secondary leading-relaxed mb-8"
    >
      {{ article.excerpt }}
    </p>

    <!-- Author & Meta -->
    <div
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 150 } }"
      class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pb-8 border-b border-dark-border"
    >
      <!-- Author -->
      <div class="flex items-center gap-3">
        <img
          :src="article.author.avatar"
          :alt="article.author.name"
          class="w-12 h-12 rounded-full object-cover border-2 border-dark-border"
        />
        <div>
          <p class="text-text-primary font-semibold">{{ article.author.name }}</p>
          <p v-if="article.author.role" class="text-text-muted text-sm">{{ article.author.role }}</p>
        </div>
      </div>

      <!-- Meta -->
      <div class="flex items-center gap-5 text-text-muted text-sm">
        <div class="flex items-center gap-1.5">
          <CalendarIcon class="w-4 h-4" />
          <span>{{ formatDate(article.date) }}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <ClockIcon class="w-4 h-4" />
          <span>{{ article.readTime }} min de leitura</span>
        </div>
      </div>
    </div>

    <!-- Featured Image -->
    <div
      v-motion
      :initial="{ opacity: 0, scale: 0.98 }"
      :enter="{ opacity: 1, scale: 1, transition: { delay: 200 } }"
      class="mt-8 rounded-lg overflow-hidden border border-dark-border"
    >
      <img
        :src="article.image"
        :alt="article.title"
        class="w-full aspect-video object-cover"
        loading="eager"
      />
    </div>
  </header>
</template>
