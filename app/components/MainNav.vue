<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

interface NavItem {
  id: string
  name: string
  path: string
}

const categories: NavItem[] = [
  { id: 'home', name: 'Início', path: '/' },
  { id: 'articles', name: 'Artigos', path: '/articles' },
  { id: 'videos', name: 'Vídeos', path: '/videos' },
  { id: 'jobs', name: 'Vagas', path: '/jobs' },
  // { id: 'tutorials', name: 'Tutoriais', path: '/tutorials' } // Hidden for now or mapped? User didn't specify tutorials mapping, I'll keep it simple or comment out if not requested. User request map: Home, Artigos, Vídeos, Vagas. I'll stick to those.
]
</script>

<template>
  <nav id="main-nav" class="bg-dark-surface/50 border-b border-dark-border/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
        <NuxtLink
          v-for="(cat, index) in categories"
          :key="cat.id"
          :to="cat.path"
          :style="{ animationDelay: `${index * 0.03}s` }"
          :class="[
            'flex-shrink-0 px-5 py-2 text-sm font-medium transition-all duration-250 animate-fade-up opacity-0 press-effect',
            route.path === cat.path || (cat.path !== '/' && route.path.startsWith(cat.path))
              ? 'bg-primary text-dark-bg rounded shadow-glow'
              : 'bg-dark-card border border-dark-border text-text-secondary hover:text-text-primary hover:border-primary/30 rounded'
          ]"
        >
          {{ cat.name }}
        </NuxtLink>
      </div>
    </div>
  </nav>
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
