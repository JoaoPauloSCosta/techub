<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '#imports'
import { useTheme } from './composables/useTheme'

const { isDark } = useTheme()

useHead({
  htmlAttrs: {
    lang: 'pt-BR',
    class: computed(() => isDark.value ? 'dark' : '')
  },
  title: 'TechHub - Modern Vue & AI Ecosystem',
  meta: [
    { name: 'description', content: 'The ultimate resource for modern web developers focusing on the Vue ecosystem and Artificial Intelligence.' }
  ],
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: ''
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
    }
  ]
})
</script>

<template>
  <div id="app-root" class="min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-text-primary font-sans antialiased relative transition-colors duration-300">
    <!-- Subtle spotlight effect at top -->
    <div class="pointer-events-none fixed inset-0 bg-gradient-spotlight opacity-60"></div>
    
    <!-- Grain texture overlay for depth -->
    <div class="pointer-events-none fixed inset-0 bg-grain opacity-[0.02] mix-blend-overlay"></div>
    
    <!-- Main content -->
    <div class="relative z-10">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<style>
/* Global CSS Reset & Premium Base Styles */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  line-height: 1.6;
  overflow-x: hidden;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Premium Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background-color: #f3f4f6; /* bg-gray-100 */
}
html.dark ::-webkit-scrollbar-track {
  background-color: #0a0a0a;
}

::-webkit-scrollbar-thumb {
  background-color: #d1d5db; /* bg-gray-300 */
  border-radius: 3px;
}
html.dark ::-webkit-scrollbar-thumb {
  background-color: #2a2a2a;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #9ca3af; /* bg-gray-400 */
}
html.dark ::-webkit-scrollbar-thumb:hover {
  background-color: #3a3a3a;
}

/* Line clamp utilities */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Focus styles - sharp and visible */
:focus-visible {
  outline: 2px solid #10b981;
  outline-offset: 2px;
}

/* Selection styling */
::selection {
  background-color: rgba(16, 185, 129, 0.3);
  color: #ffffff;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Staggered animation delays */
.stagger-1 { animation-delay: 0.05s; }
.stagger-2 { animation-delay: 0.1s; }
.stagger-3 { animation-delay: 0.15s; }
.stagger-4 { animation-delay: 0.2s; }
.stagger-5 { animation-delay: 0.25s; }
.stagger-6 { animation-delay: 0.3s; }

/* Hover lift effect */
.hover-lift {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.hover-lift:hover {
  transform: translateY(-4px);
}

/* Button press effect */
.press-effect {
  transition: transform 0.15s cubic-bezier(0.16, 1, 0.3, 1);
}
.press-effect:active {
  transform: scale(0.97);
}

/* Glow on hover */
.glow-on-hover {
  transition: box-shadow 0.35s ease;
}
.glow-on-hover:hover {
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
}
</style>
