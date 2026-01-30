<script setup lang="ts">
import { ref, markRaw, type Component } from 'vue'
import {
  FireIcon,
  BoltIcon,
  StarIcon,
  ClockIcon
} from '@heroicons/vue/24/solid'

interface QuickTagItem {
  id: string
  label: string
  icon: Component
  count: number
  color: string
}

const activeTag = ref<string | null>(null)

const quickTags: QuickTagItem[] = [
  { id: 'trending', label: 'Trending', icon: markRaw(FireIcon), count: 24, color: 'text-warning' },
  { id: 'new', label: 'Novos', icon: markRaw(BoltIcon), count: 12, color: 'text-accent' },
  { id: 'popular', label: 'Popular', icon: markRaw(StarIcon), count: 48, color: 'text-primary' },
  { id: 'recent', label: 'Recentes', icon: markRaw(ClockIcon), count: 8, color: 'text-text-secondary' }
]

const toggleTag = (id: string): void => {
  activeTag.value = activeTag.value === id ? null : id
}
</script>

<template>
  <div id="quick-tags" class="bg-gray-50 dark:bg-dark-surface/30 py-4">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-3 overflow-x-auto scrollbar-hide">
        <button
          v-for="(tag, index) in quickTags"
          :key="tag.id"
          v-motion
          :initial="{ opacity: 0, y: 10 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: index * 50 } }"
          :class="[
            'flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-250 flex-shrink-0 press-effect',
            activeTag === tag.id
              ? 'bg-white dark:bg-dark-card border-2 border-primary text-gray-900 dark:text-text-primary shadow-glow'
              : 'bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border text-gray-600 dark:text-text-secondary hover:border-primary/50 hover:text-gray-900 dark:hover:text-text-primary'
          ]"
          style="border-radius: 4px;"
          @click="toggleTag(tag.id)"
        >
          <component :is="tag.icon" :class="['w-4 h-4', tag.color]" />
          <span>{{ tag.label }}</span>
          <span class="text-gray-500 dark:text-text-muted text-xs bg-gray-100 dark:bg-dark-hover px-1.5 py-0.5 rounded">{{ tag.count }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
