<script setup lang="ts">
import { ClockIcon } from '@heroicons/vue/24/outline'
import type { Post } from '../../shared/types'
import { formatDate } from '~/utils/formatDate'

interface Props {
  articles: Post[]
}

defineProps<Props>()
</script>

<template>
  <section
    v-if="articles.length > 0"
    id="related-articles"
    class="mt-16 pt-10 border-t border-gray-200 dark:border-dark-border"
  >
    <h2
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0 }"
      class="text-2xl font-bold text-gray-900 dark:text-text-primary mb-6"
    >
      Artigos Relacionados
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <NuxtLink
        v-for="(article, index) in articles"
        :key="article.id"
        :to="`/articles/${article.slug}`"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 100 + index * 50 } }"
        class="group block bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg overflow-hidden hover:border-primary/50 hover:shadow-card-hover transition-all duration-300"
      >
        <!-- Thumbnail -->
        <div class="aspect-video overflow-hidden">
          <img
            :src="article.image"
            :alt="article.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <!-- Content -->
        <div class="p-4">
          <span class="text-primary text-xs font-semibold uppercase tracking-wide">
            {{ article.category }}
          </span>
          <h3 class="text-gray-900 dark:text-text-primary font-semibold mt-2 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {{ article.title }}
          </h3>
          <div class="flex items-center gap-3 text-gray-500 dark:text-text-muted text-xs">
            <span>{{ formatDate(article.date) }}</span>
            <div class="flex items-center gap-1">
              <ClockIcon class="w-3.5 h-3.5" />
              <span>{{ article.readTime }} min</span>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>
