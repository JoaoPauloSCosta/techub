<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Bars3Icon,
  XMarkIcon,
  SparklesIcon,
  SunIcon,
  MoonIcon,
  HomeIcon,
  CodeBracketIcon,
  CpuChipIcon,
  CogIcon,
  MusicalNoteIcon,
  ServerIcon
} from '@heroicons/vue/24/outline'
import { useTheme } from '../composables/useTheme'

const route = useRoute()
const router = useRouter()
const isMenuOpen = ref<boolean>(false)
const { isDark, toggleTheme } = useTheme()

const menuItems = [
  { label: 'Notícias', href: '/articles' },
  { label: 'Tutoriais', href: '/tutorials' },
  { label: 'Vídeos', href: '/videos' },
  { label: 'Vagas', href: '/jobs' }
]

// Topic categories for filtering
const topics = [
  { id: 'home', slug: '', name: 'INÍCIO', icon: HomeIcon },
  { id: 'vue-nuxt', slug: 'vue-nuxt', name: 'VUE & NUXT', icon: CodeBracketIcon },
  { id: 'ia-dev', slug: 'ia-dev', name: 'IA DEV', icon: CpuChipIcon },
  { id: 'automacoes', slug: 'automacoes', name: 'AUTOMAÇÕES', icon: CogIcon },
  { id: 'vibe-coding', slug: 'vibe-coding', name: 'VIBE CODING', icon: MusicalNoteIcon },
  { id: 'backend', slug: 'backend', name: 'BACKEND', icon: ServerIcon }
]

// Track active topic from URL
const activeTopic = computed(() => {
  const topic = route.query.topic as string | undefined
  return topic || ''
})

// Navigate to topic
const navigateToTopic = (slug: string) => {
  if (slug === '') {
    router.push('/')
  } else {
    router.push(`/?topic=${slug}`)
  }
}

const toggleMenu = (): void => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header id="top-bar" class="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border transition-colors duration-300">
    <!-- Main Header Row -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 gap-6">
        <!-- Logo -->
        <a href="/" class="flex items-center gap-2.5 flex-shrink-0 group">
          <div class="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white dark:text-dark-bg">
            <SparklesIcon class="w-5 h-5" />
          </div>
          <span class="text-xl font-bold tracking-tight text-gray-900 dark:text-text-primary">TechHub</span>
        </a>



        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-6">
          <a
            v-for="item in menuItems"
            :key="item.label"
            :href="item.href"
            class="text-gray-600 dark:text-text-secondary hover:text-gray-900 dark:hover:text-text-primary transition-colors duration-200 text-sm font-medium"
          >
            {{ item.label }}
          </a>
          
          <!-- Divider -->
          <div class="w-px h-5 bg-gray-200 dark:bg-dark-border"></div>

          <!-- Theme Toggle -->
          <button
            id="theme-toggle"
            aria-label="Alternar tema"
            class="p-2 rounded-lg bg-gray-50 dark:bg-dark-card border border-transparent hover:border-primary/50 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-all duration-200"
            @click="toggleTheme"
          >
            <SunIcon v-if="isDark" class="w-5 h-5" />
            <MoonIcon v-else class="w-5 h-5" />
          </button>
          
          <!-- Sign In Button -->
          <a
            href="/login"
            class="px-5 py-2 bg-primary hover:bg-primary-hover text-white dark:text-dark-bg text-sm font-semibold rounded-lg transition-all duration-200 press-effect"
          >
            Entrar
          </a>
        </nav>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden p-2.5 text-gray-600 dark:text-text-secondary hover:text-primary dark:hover:bg-dark-hover rounded transition-all duration-200 press-effect"
          aria-label="Menu"
          @click="toggleMenu"
        >
          <Bars3Icon v-if="!isMenuOpen" class="w-6 h-6" />
          <XMarkIcon v-else class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Topic Navigation Row -->
    <div class="border-t border-gray-200/50 dark:border-dark-border/50 bg-white dark:bg-dark-surface transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="flex items-center gap-1 overflow-x-auto scrollbar-hide py-0">
          <button
            v-for="topic in topics"
            :key="topic.id"
            type="button"
            :class="[
              'flex-shrink-0 flex items-center gap-1.5 px-3 py-3 text-xs font-semibold tracking-wide transition-all duration-200 border-b-2 -mb-px cursor-pointer',
              activeTopic === topic.slug
                ? 'text-primary border-primary'
                : 'text-gray-500 dark:text-text-muted hover:text-gray-900 dark:hover:text-text-secondary border-transparent'
            ]"
            @click="navigateToTopic(topic.slug)"
          >
            <component :is="topic.icon" class="w-4 h-4" />
            {{ topic.name }}
          </button>
        </nav>
      </div>
    </div>



    <!-- Mobile Menu Dropdown -->
    <Transition
      enter-active-class="transition duration-250 ease-spring"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-out"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <nav
        v-if="isMenuOpen"
        class="md:hidden bg-gray-50 dark:bg-dark-card border-t border-gray-200 dark:border-dark-border transition-colors duration-300"
      >
        <div class="px-4 py-3 space-y-1">
          <div class="flex items-center justify-between px-4 py-2 mb-2">
             <span class="text-sm font-medium text-gray-600 dark:text-text-secondary">Alternar Tema</span>
             <button
                id="theme-toggle-mobile"
                aria-label="Alternar tema"
                class="p-2 rounded-lg bg-gray-200 dark:bg-dark-hover text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-all duration-200"
                @click="toggleTheme"
              >
                <SunIcon v-if="isDark" class="w-5 h-5" />
                <MoonIcon v-else class="w-5 h-5" />
              </button>
          </div>
          <a
            v-for="(item, index) in menuItems"
            :key="item.label"
            :href="item.href"
            :style="{ animationDelay: `${index * 0.05}s` }"
            class="block px-4 py-3 text-gray-600 dark:text-text-secondary hover:text-primary hover:bg-gray-100 dark:hover:bg-dark-hover rounded transition-all duration-200 animate-fade-up opacity-0"
            @click="isMenuOpen = false"
          >
            {{ item.label }}
          </a>
          <a
            href="/login"
            class="block px-4 py-3 mt-2 bg-primary text-white dark:text-dark-bg text-center font-semibold rounded-lg"
          >
            Entrar
          </a>
        </div>
      </nav>
    </Transition>
  </header>
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
