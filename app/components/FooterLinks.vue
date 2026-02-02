<script setup lang="ts">
import { SparklesIcon } from '@heroicons/vue/24/outline'
import { AtSymbolIcon } from '@heroicons/vue/24/solid'

const resourceLinks = [
  { label: 'Documentation', href: '/docs' },
  { label: 'Component Library', href: '/components' },
  { label: 'API Reference', href: '/api' },
  { label: 'Templates', href: '/templates' }
]

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Advertise', href: '/advertise' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' }
]
</script>

<template>
  <footer id="footer" class="bg-white dark:bg-dark-surface border-t border-gray-200 dark:border-dark-border">
    <!-- Main Footer -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
        <!-- Brand Column -->
        <div class="md:col-span-1">
          <!-- Logo -->
          <a href="/" class="flex items-center gap-2.5 mb-4">
            <div class="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <SparklesIcon class="w-5 h-5 text-white dark:text-dark-bg" />
            </div>
            <span class="text-xl font-bold tracking-tight text-gray-900 dark:text-text-primary">TechHub</span>
          </a>
          <!-- Description -->
          <p class="text-gray-500 dark:text-text-muted text-sm leading-relaxed">
            The ultimate resource for modern web developers focusing on the Vue ecosystem and Artificial Intelligence.
          </p>
        </div>

        <!-- Resources Column -->
        <div>
          <h4 class="text-text-secondary font-semibold text-sm uppercase tracking-wider mb-4">
            Resources
          </h4>
          <ul class="space-y-3">
            <li v-for="link in resourceLinks" :key="link.label">
              <a
                :href="link.href"
                class="text-text-muted hover:text-primary text-sm transition-colors duration-200"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Company Column -->
        <div>
          <h4 class="text-text-secondary font-semibold text-sm uppercase tracking-wider mb-4">
            Company
          </h4>
          <ul class="space-y-3">
            <li v-for="link in companyLinks" :key="link.label">
              <a
                :href="link.href"
                class="text-text-muted hover:text-primary text-sm transition-colors duration-200"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Connect Column -->
        <div>
          <h4 class="text-text-secondary font-semibold text-sm uppercase tracking-wider mb-4">
            Connect
          </h4>
          <div class="flex items-center gap-3">
            <!-- Email/@ Icon -->
            <a
              href="mailto:contact@techhub.com"
              class="w-10 h-10 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg flex items-center justify-center text-gray-500 dark:text-text-muted hover:text-primary hover:border-primary/30 transition-all duration-200"
              aria-label="Email"
            >
              <AtSymbolIcon class="w-5 h-5" />
            </a>
            <!-- RSS Icon -->
            <a
              href="/rss"
              class="w-10 h-10 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg flex items-center justify-center text-gray-500 dark:text-text-muted hover:text-primary hover:border-primary/30 transition-all duration-200"
              aria-label="RSS Feed"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </a>
            <!-- YouTube Icon -->
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg flex items-center justify-center text-gray-500 dark:text-text-muted hover:text-primary hover:border-primary/30 transition-all duration-200"
              aria-label="YouTube"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="border-t border-gray-200 dark:border-dark-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <!-- Copyright -->
          <p class="text-gray-500 dark:text-text-muted text-sm">
            © 2024 TECH HUB. BUILT WITH NUXT & TAILWIND.
          </p>
          
          <!-- Powered By -->
          <div class="flex items-center gap-2 text-sm">
            <span class="text-gray-500 dark:text-text-muted">Powered by</span>
            <span class="flex items-center gap-1.5 text-primary font-semibold">
              <span class="w-4 h-4 bg-primary rounded flex items-center justify-center">
                <svg class="w-2.5 h-2.5 text-white dark:text-dark-bg" fill="currentColor" viewBox="0 0 24 24">
                  <rect width="24" height="24" rx="4"/>
                </svg>
              </span>
              EdgeNetwork
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
