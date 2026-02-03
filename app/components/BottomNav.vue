<script setup lang="ts">
import { computed, markRaw, onMounted, ref } from 'vue'
import { useRoute } from '#imports'
import { 
  HomeIcon, 
  CodeBracketIcon, 
  SparklesIcon, 
  CogIcon, 
  MusicalNoteIcon, 
  ServerIcon,
  MagnifyingGlassIcon
} from '@heroicons/vue/24/outline'

import { 
  HomeIcon as HomeIconSolid, 
  CodeBracketIcon as CodeBracketIconSolid, 
  SparklesIcon as SparklesIconSolid, 
  CogIcon as CogIconSolid, 
  MusicalNoteIcon as MusicalNoteIconSolid,
  ServerIcon as ServerIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid
} from '@heroicons/vue/24/solid'

interface NavItem {
  id: string
  label: string
  href: string
  icon: any
  iconActive: any
}

const route = useRoute()

// Active state based on ?topic=...
const activeId = computed(() => {
  if (route.path === '/search') return 'search'
  
  const t = route.query.topic as string
  if (!t) return route.path === '/' ? 'general' : ''
  
  // Mapping topics to IDs
  if (t === 'vue-nuxt') return 'vue-nuxt'
  if (t === 'ai-dev') return 'ai-dev'
  if (t === 'automations') return 'automations'
  if (t === 'vibe-coding') return 'vibe-coding'
  if (t === 'backend') return 'backend'
  
  return ''
})

const navItems: NavItem[] = [
  { id: 'general', label: 'Geral', href: '/', icon: markRaw(HomeIcon), iconActive: markRaw(HomeIconSolid) },
  { id: 'vue-nuxt', label: 'Vue & Nuxt', href: '/?topic=vue-nuxt', icon: markRaw(CodeBracketIcon), iconActive: markRaw(CodeBracketIconSolid) },
  { id: 'ai-dev', label: 'IA Dev', href: '/?topic=ai-dev', icon: markRaw(SparklesIcon), iconActive: markRaw(SparklesIconSolid) },
  { id: 'automations', label: 'Automações', href: '/?topic=automations', icon: markRaw(CogIcon), iconActive: markRaw(CogIconSolid) },
  { id: 'vibe-coding', label: 'Vibe Coding', href: '/?topic=vibe-coding', icon: markRaw(MusicalNoteIcon), iconActive: markRaw(MusicalNoteIconSolid) },
  { id: 'backend', label: 'Backend', href: '/?topic=backend', icon: markRaw(ServerIcon), iconActive: markRaw(ServerIconSolid) },
  { id: 'search', label: 'Buscar', href: '/search', icon: markRaw(MagnifyingGlassIcon), iconActive: markRaw(MagnifyingGlassIconSolid) }
]
</script>

<template>
  <div class="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-dark-surface/90 backdrop-blur-lg border-t border-gray-200 dark:border-dark-border pb-safe">
    <div class="max-w-7xl mx-auto">
      <!-- Scrollable Container -->
      <nav class="flex items-center overflow-x-auto scrollbar-hide px-2 py-1 md:justify-center md:gap-8">
        <NuxtLink
          v-for="item in navItems"
          :key="item.id"
          :to="item.href"
          class="flex flex-col items-center justify-center min-w-[72px] py-2 px-1 gap-1 text-[10px] font-medium transition-all duration-200 select-none flex-shrink-0"
          :class="activeId === item.id ? 'text-primary' : 'text-gray-500 dark:text-text-muted hover:text-gray-900 dark:hover:text-text-secondary'"
        >
          <div 
            class="p-1.5 rounded-xl transition-all duration-200 relative group"
            :class="activeId === item.id ? 'bg-primary/10' : ''"
          >
            <component 
              :is="activeId === item.id ? item.iconActive : item.icon" 
              class="w-6 h-6 transition-transform duration-200"
              :class="activeId === item.id ? 'scale-110' : 'group-hover:scale-110'"
            />
            
            <!-- Notification Dot (Optional placeholder) -->
            <span v-if="item.id === 'vibe-coding'" class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-dark-surface"></span>
          </div>
          <span class="truncate max-w-[80px]">{{ item.label }}</span>
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom, 20px);
}

.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
