<script setup lang="ts">
import { ChartBarIcon, ArrowTrendingUpIcon } from '@heroicons/vue/24/solid'
import type { TrendingTopic } from '../../shared/types'

interface Props {
  topics: TrendingTopic[]
}

defineProps<Props>()

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
        <p class="text-gray-500 dark:text-text-muted text-xs">Últimas 24h</p>
      </div>
    </div>

    <!-- Topics List -->
    <div class="space-y-2">
      <a
        v-for="(topic, index) in topics.slice(0, 5)"
        :key="topic.id"
        v-motion
        :initial="{ opacity: 0, x: -10 }"
        :enter="{ opacity: 1, x: 0, transition: { delay: 250 + index * 60 } }"
        href="#"
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
      </a>
    </div>

    <!-- See All Link -->
    <a
      href="/trending"
      class="block text-center text-primary text-sm font-medium hover:text-primary-light mt-5 py-2.5 border border-gray-200 dark:border-dark-border hover:border-primary/50 rounded transition-all duration-200"
    >
      Ver todos os trending →
    </a>
  </div>
</template>
