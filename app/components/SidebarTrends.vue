<script setup lang="ts">
import { ChartBarIcon, ArrowTrendingUpIcon } from '@heroicons/vue/24/solid'
import { useTrending } from '~/composables/useTrending'
import type { TrendingTopic } from '../../shared/types'

const { fetchTrending } = useTrending()

// Fetch trending topics from Supabase (real data)
const { data: topics, pending } = await useAsyncData<TrendingTopic[]>(
  'sidebar-trending',
  () => fetchTrending(5),
  { default: () => [] }
)

const formatViews = (views: number): string => {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`
  }
  return views.toString()
}

const getRankStyle = (index: number): string => {
  const styles: Record<number, string> = {
    0: 'bg-primary text-dark-bg font-bold',
    1: 'bg-text-secondary text-dark-bg font-bold',
    2: 'bg-warning text-dark-bg font-bold'
  }
  return styles[index] || 'bg-gray-100 dark:bg-dark-hover text-gray-500 dark:text-text-muted'
}
</script>

<template>
  <div
    id="sidebar-trends"
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 25, delay: 200 } }"
    class="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded p-6"
  >
    <!-- Header -->
    <div class="flex items-center gap-3 mb-5">
      <div class="w-10 h-10 bg-primary/10 border border-primary/20 rounded flex items-center justify-center">
        <ChartBarIcon class="w-5 h-5 text-primary" />
      </div>
      <div>
        <h3 class="text-lg font-bold text-gray-900 dark:text-text-primary">Trending</h3>
        <p class="text-gray-500 dark:text-text-muted text-xs">Mais lidos</p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="space-y-3">
      <div v-for="i in 5" :key="i" class="flex items-center gap-3 p-3 animate-pulse">
        <div class="w-7 h-7 bg-gray-200 dark:bg-dark-hover rounded"></div>
        <div class="flex-1 space-y-2">
          <div class="h-4 bg-gray-200 dark:bg-dark-hover rounded w-3/4"></div>
          <div class="h-3 bg-gray-200 dark:bg-dark-hover rounded w-1/2"></div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!topics || topics.length === 0" class="py-8 text-center">
      <div class="text-4xl mb-3">🚀</div>
      <p class="text-gray-500 dark:text-text-muted text-sm font-medium">
        Seja o primeiro a ler algo!
      </p>
      <p class="text-gray-400 dark:text-text-muted/70 text-xs mt-1">
        Nenhum artigo com visualizações ainda.
      </p>
    </div>

    <!-- Topics List -->
    <div v-else class="space-y-2">
      <NuxtLink
        v-for="(topic, index) in topics.slice(0, 5)"
        :key="topic.id"
        v-motion
        :initial="{ opacity: 0, x: -10 }"
        :enter="{ opacity: 1, x: 0, transition: { delay: 250 + index * 60 } }"
        :to="`/articles/${(topic as any).slug || topic.id}`"
        class="flex items-center gap-3 p-3 rounded hover:bg-gray-100 dark:hover:bg-dark-hover transition-all duration-200 group"
      >
        <!-- Ranking Number -->
        <span
          :class="[
            'w-7 h-7 flex items-center justify-center rounded text-sm',
            getRankStyle(index)
          ]"
        >
          {{ index + 1 }}
        </span>

        <!-- Topic Info -->
        <div class="flex-1 min-w-0">
          <h4 class="text-gray-900 dark:text-text-primary text-sm font-medium group-hover:text-primary transition-colors line-clamp-1">
            {{ topic.title }}
          </h4>
          <div class="flex items-center gap-1.5 text-gray-500 dark:text-text-muted text-xs mt-0.5">
            <ArrowTrendingUpIcon class="w-3 h-3 text-primary" />
            <span>{{ formatViews(topic.views) }} views</span>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- See All Link -->
    <NuxtLink
      to="/trending"
      class="block text-center text-primary text-sm font-medium hover:text-primary-light mt-5 py-2.5 border border-gray-200 dark:border-dark-border hover:border-primary/50 rounded transition-all duration-200"
    >
      Ver todos os trending →
    </NuxtLink>
  </div>
</template>
