<script setup lang="ts">
import { SparklesIcon } from '@heroicons/vue/24/outline'

// Menu - Navegação interna
const menuLinks = [
  { label: 'Início', href: '/' },
  { label: 'Artigos', href: '/articles' },
  { label: 'Vídeos', href: '/videos' },
  { label: 'Tutoriais', href: '/tutorials' },
  { label: 'Vagas', href: '/jobs' }
]

// TechHub - Páginas institucionais
const techHubLinks = [
  { label: 'Sobre o blog', href: '/about' },
  { label: 'Termos e condições', href: '/terms' },
  { label: 'Contato', href: '/contact' },
  { label: 'Política de privacidade', href: '/privacy' }
]

// Redes sociais
const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jpscosta84/', icon: 'linkedin' },
  { label: 'Instagram', href: 'https://instagram.com/jp.silvacosta', icon: 'instagram' },
  { label: 'Facebook', href: 'https://facebook.com/jp.silvacosta', icon: 'facebook' }
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
            O recurso definitivo para desenvolvedores web modernos focados no ecossistema Vue e Inteligência Artificial.
          </p>
        </div>

        <!-- Menu Column -->
        <div>
          <h4 class="text-text-secondary font-semibold text-sm uppercase tracking-wider mb-4">
            Menu
          </h4>
          <ul class="space-y-3">
            <li v-for="link in menuLinks" :key="link.label">
              <a
                :href="link.href"
                class="text-text-muted hover:text-primary text-sm transition-colors duration-200"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- TechHub Column -->
        <div>
          <h4 class="text-text-secondary font-semibold text-sm uppercase tracking-wider mb-4">
            TechHub
          </h4>
          <ul class="space-y-3">
            <li v-for="link in techHubLinks" :key="link.label">
              <a
                :href="link.href"
                class="text-text-muted hover:text-primary text-sm transition-colors duration-200"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Minhas Redes Column -->
        <div>
          <h4 class="text-text-secondary font-semibold text-sm uppercase tracking-wider mb-4">
            Minhas redes
          </h4>
          <div class="flex items-center gap-3">
            <!-- LinkedIn -->
            <a
              href="https://www.linkedin.com/in/jpscosta84/"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg flex items-center justify-center text-gray-500 dark:text-text-muted hover:text-primary hover:border-primary/30 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <!-- Instagram -->
            <a
              href="https://instagram.com/jp.silvacosta"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg flex items-center justify-center text-gray-500 dark:text-text-muted hover:text-primary hover:border-primary/30 transition-all duration-200"
              aria-label="Instagram"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <!-- Facebook -->
            <a
              href="https://facebook.com/jp.silvacosta"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg flex items-center justify-center text-gray-500 dark:text-text-muted hover:text-primary hover:border-primary/30 transition-all duration-200"
              aria-label="Facebook"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
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
            © 2026 TECH HUB DO BRASIL, FEITO DE PROGRAMADOR PARA PROGRAMADORES VUEJS.
          </p>
          
          <!-- Feito por -->
          <div class="flex items-center gap-2 text-sm">
            <span class="text-gray-500 dark:text-text-muted">Feito por</span>
            <a 
              href="https://www.linkedin.com/in/jpscosta84/" 
              target="_blank"
              rel="noopener noreferrer"
              class="text-primary font-bold uppercase hover:text-primary-hover transition-colors duration-200"
            >
              JOÃO PAULO COSTA
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
