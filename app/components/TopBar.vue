<script setup lang="ts">
import { ref } from 'vue'
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/vue/24/outline'
import { useTheme } from '../composables/useTheme'

const isMenuOpen = ref<boolean>(false)
const searchQuery = ref<string>('')
const isSearchFocused = ref<boolean>(false)
const { isDark, toggleTheme } = useTheme()

const menuItems = [
  { label: 'News', href: '/news' },
  { label: 'Tutorials', href: '/tutorials' },
  { label: 'Videos', href: '/videos' },
  { label: 'Jobs', href: '/jobs' }
]

const categories = [
  { id: 'vue', name: 'VUE.JS', active: true },
  { id: 'nuxt', name: 'NUXT 3', active: false },
  { id: 'ai', name: 'GENERATIVE AI', active: false },
  { id: 'web-vitals', name: 'WEB VITALS', active: false },
  { id: 'architecture', name: 'ARCHITECTURE', active: false },
  { id: 'case-studies', name: 'CASE STUDIES', active: false }
]

const activeCategory = ref<string>('vue')

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

        <!-- Search Bar - Desktop -->
        <div class="hidden md:flex flex-1 max-w-xl">
          <div class="relative w-full">
            <MagnifyingGlassIcon 
              :class="[
                'absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200',
                isSearchFocused ? 'text-gray-500 dark:text-text-secondary' : 'text-gray-400 dark:text-text-muted'
              ]" 
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search Vue, Nuxt, AI..."
              class="w-full pl-11 pr-16 py-2.5 bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg text-gray-900 dark:text-text-primary placeholder-gray-400 dark:placeholder-text-muted focus:outline-none focus:border-primary/50 transition-all duration-200 text-sm"
              @focus="isSearchFocused = true"
              @blur="isSearchFocused = false"
            />
            <!-- Keyboard shortcut -->
            <div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-2 py-1 bg-gray-200 dark:bg-dark-border/80 text-gray-500 dark:text-text-muted text-xs rounded">
              <span>⌘</span><span>K</span>
            </div>
          </div>
        </div>

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
            Sign In
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

    <!-- Category Navigation Row -->
    <div class="border-t border-gray-200/50 dark:border-dark-border/50 bg-white dark:bg-dark-surface transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="flex items-center gap-1 overflow-x-auto scrollbar-hide py-0">
          <a
            v-for="cat in categories"
            :key="cat.id"
            :href="`/category/${cat.id}`"
            :class="[
              'flex-shrink-0 px-3 py-3 text-xs font-semibold tracking-wide transition-all duration-200 border-b-2 -mb-px',
              activeCategory === cat.id
                ? 'text-primary border-primary'
                : 'text-gray-500 dark:text-text-muted hover:text-gray-900 dark:hover:text-text-secondary border-transparent'
            ]"
            @click.prevent="activeCategory = cat.id"
          >
            {{ cat.name }}
          </a>
        </nav>
      </div>
    </div>

    <!-- Mobile Search (visible when menu closed) -->
    <div class="md:hidden bg-white dark:bg-dark-surface px-4 pb-3 border-t border-gray-200/30 dark:border-dark-border/30 transition-colors duration-300">
      <div class="relative">
        <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-text-muted" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
          class="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg text-gray-900 dark:text-text-primary placeholder-gray-400 dark:placeholder-text-muted focus:outline-none focus:border-primary/50 transition-all duration-200 text-sm"
        />
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
             <span class="text-sm font-medium text-gray-600 dark:text-text-secondary">Switch Theme</span>
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
            Sign In
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
