<script setup lang="ts">
import { ref, markRaw, type Component } from 'vue'
import {
  HomeIcon,
  TagIcon,
  PlayCircleIcon,
  BriefcaseIcon
} from '@heroicons/vue/24/outline'
import {
  HomeIcon as HomeIconSolid,
  TagIcon as TagIconSolid,
  PlayCircleIcon as PlayCircleIconSolid,
  BriefcaseIcon as BriefcaseIconSolid
} from '@heroicons/vue/24/solid'

interface NavItem {
  id: string
  label: string
  href: string
  icon: Component
  iconActive: Component
}

const activeItem = ref<string>('hub')

const navItems: NavItem[] = [
  { id: 'hub', label: 'HUB', href: '/', icon: markRaw(HomeIcon), iconActive: markRaw(HomeIconSolid) },
  { id: 'topics', label: 'TOPICS', href: '/topics', icon: markRaw(TagIcon), iconActive: markRaw(TagIconSolid) },
  { id: 'watch', label: 'WATCH', href: '/videos', icon: markRaw(PlayCircleIcon), iconActive: markRaw(PlayCircleIconSolid) },
  { id: 'jobs', label: 'JOBS', href: '/vagas', icon: markRaw(BriefcaseIcon), iconActive: markRaw(BriefcaseIconSolid) }
]

const setActive = (id: string): void => {
  activeItem.value = id
}
</script>

<template>
  <nav id="bottom-nav" class="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-dark-card/95 backdrop-blur-xl border-t border-gray-200 dark:border-dark-border">
    <div class="flex items-center justify-around h-16 max-w-md mx-auto">
      <a
        v-for="item in navItems"
        :key="item.id"
        :href="item.href"
        :class="[
          'flex flex-col items-center justify-center flex-1 py-2 transition-all duration-200 relative group',
          activeItem === item.id ? 'text-primary' : 'text-gray-500 dark:text-text-muted hover:text-gray-900 dark:hover:text-text-secondary'
        ]"
        @click="setActive(item.id)"
      >
        <!-- Active indicator -->
        <div
          v-if="activeItem === item.id"
          class="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full"
        ></div>

        <component
          :is="activeItem === item.id ? item.iconActive : item.icon"
          :class="[
            'w-6 h-6 transition-transform duration-200',
            activeItem === item.id ? 'scale-110' : 'group-hover:scale-105'
          ]"
        />
        <span class="text-[10px] font-semibold uppercase tracking-wider mt-1">{{ item.label }}</span>
      </a>
    </div>
    <!-- Safe area padding for iOS -->
    <div class="h-safe-bottom bg-white dark:bg-dark-card"></div>
  </nav>
</template>

<style scoped>
.h-safe-bottom {
  height: env(safe-area-inset-bottom, 0);
}
</style>
