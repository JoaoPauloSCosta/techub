<script setup lang="ts">
import { computed } from 'vue'
import { useSeoMeta } from '#imports'
import { usePosts } from '~/composables/usePosts'
import { useJobs } from '~/composables/useJobs'
import PostCard from '~/components/PostCard.vue'
import {
  FireIcon,
  ChartBarIcon,
  SparklesIcon,
  BriefcaseIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  EyeIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/vue/24/outline'
import { formatDate } from '~/utils/formatDate'

definePageMeta({
  layout: 'default-layout'
})

// SEO
useSeoMeta({
  title: 'Em Alta no TechHub | O conteúdo mais acessado',
  description: 'Descubra os artigos e vagas mais populares da comunidade TechHub esta semana.'
})

const { getTopPosts } = usePosts()
const { getTopJobs } = useJobs()

// Fetch top content
const { data: topPosts } = await useAsyncData('trending-posts', () => getTopPosts(10))
const { data: topJobs } = await useAsyncData('trending-jobs', () => getTopJobs(10))

const posts = computed(() => topPosts.value || [])
const jobs = computed(() => topJobs.value || [])

// Type config for job badges
const typeConfig: Record<string, { label: string; class: string; dotClass: string }> = {
  remote: { 
    label: 'Remoto', 
    class: 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20',
    dotClass: 'bg-emerald-400'
  },
  hybrid: { 
    label: 'Híbrido', 
    class: 'bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/20',
    dotClass: 'bg-sky-400'
  },
  onsite: { 
    label: 'Presencial', 
    class: 'bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20',
    dotClass: 'bg-amber-400'
  }
}

// Format view count
const formatViews = (views: number | undefined): string => {
  if (!views) return '0'
  if (views >= 1000) return `${(views / 1000).toFixed(1)}k`
  return views.toString()
}
</script>

<template>
  <div id="trending-page" class="min-h-screen pb-20">
    <!-- Hero Header -->
    <section class="relative overflow-hidden">
      <!-- Gradient Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      
      <div 
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative"
        v-motion
        :initial="{ opacity: 0, y: -20 }"
        :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 25 } }"
      >
        <div class="flex items-center gap-3 mb-4">
          <div class="relative">
            <div class="absolute inset-0 bg-primary/30 rounded-xl blur-lg animate-pulse" />
            <div class="relative w-12 h-12 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
              <FireIcon class="w-6 h-6 text-dark-bg" />
            </div>
          </div>
          <span class="text-xs font-bold tracking-widest text-primary uppercase">Trending</span>
        </div>
        
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-text-primary mb-4 tracking-tight">
          Em Alta no <span class="text-primary">TechHub</span>
        </h1>
        <p class="text-xl text-gray-500 dark:text-text-muted max-w-2xl">
          O conteúdo mais consumido pela comunidade esta semana.
        </p>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <!-- Top Articles Section -->
      <section>
        <div 
          class="flex items-center gap-3 mb-8"
          v-motion
          :initial="{ opacity: 0, x: -20 }"
          :enter="{ opacity: 1, x: 0, transition: { delay: 100 } }"
        >
          <div class="w-10 h-10 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg flex items-center justify-center">
            <SparklesIcon class="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-text-primary">Artigos em Destaque</h2>
            <p class="text-sm text-gray-500 dark:text-text-muted">Os artigos mais lidos da semana</p>
          </div>
        </div>

        <div v-if="posts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="(post, index) in posts.slice(0, 6)" 
            :key="post.id"
            class="relative"
          >
            <!-- Ranking Badge for top 3 -->
            <div 
              v-if="index < 3"
              :class="[
                'absolute -top-2 -left-2 z-10 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shadow-lg',
                index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-dark-bg' :
                index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-dark-bg' :
                'bg-gradient-to-br from-amber-600 to-amber-700 text-white'
              ]"
            >
              #{{ index + 1 }}
            </div>
            <PostCard :post="post" :index="index" />
          </div>
        </div>

        <div v-else class="text-center py-16 bg-gray-50 dark:bg-dark-surface rounded-xl border-2 border-dashed border-gray-200 dark:border-dark-border">
          <ChartBarIcon class="w-12 h-12 text-gray-400 dark:text-text-muted mx-auto mb-4" />
          <p class="text-gray-500 dark:text-text-muted">Nenhum artigo com visualizações ainda.</p>
        </div>
      </section>

      <!-- Top Jobs Section -->
      <section>
        <div 
          class="flex items-center gap-3 mb-8"
          v-motion
          :initial="{ opacity: 0, x: -20 }"
          :enter="{ opacity: 1, x: 0, transition: { delay: 200 } }"
        >
          <div class="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
            <BriefcaseIcon class="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-text-primary">Oportunidades em Alta</h2>
            <p class="text-sm text-gray-500 dark:text-text-muted">As vagas mais visualizadas</p>
          </div>
        </div>

        <div v-if="jobs.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article 
            v-for="(job, index) in jobs.slice(0, 6)" 
            :key="job.id"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 250 + index * 50 } }"
            class="group relative bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
          >
            <!-- Ranking Badge for top 3 -->
            <div 
              v-if="index < 3"
              :class="[
                'absolute -top-2 -left-2 z-10 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shadow-lg',
                index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-dark-bg' :
                index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-dark-bg' :
                'bg-gradient-to-br from-amber-600 to-amber-700 text-white'
              ]"
            >
              #{{ index + 1 }}
            </div>

            <!-- View Count Badge -->
            <div class="absolute top-3 right-3 flex items-center gap-1 text-xs text-gray-400 dark:text-text-muted">
              <EyeIcon class="w-4 h-4" />
              <span>{{ formatViews(job.views) }}</span>
            </div>

            <!-- Job Title -->
            <NuxtLink 
              :to="`/jobs/${job.id}`"
              class="block"
            >
              <h3 class="text-lg font-bold text-gray-900 dark:text-text-primary group-hover:text-primary transition-colors mb-3 pr-16 line-clamp-2">
                {{ job.title }}
              </h3>
            </NuxtLink>

            <!-- Company & Location -->
            <div class="flex flex-wrap items-center gap-3 mb-4">
              <div class="flex items-center gap-2 text-gray-600 dark:text-text-secondary">
                <div class="w-7 h-7 bg-gray-100 dark:bg-dark-hover rounded-lg flex items-center justify-center">
                  <BuildingOfficeIcon class="w-4 h-4 text-gray-500 dark:text-text-muted" />
                </div>
                <span class="text-sm font-medium">{{ job.company }}</span>
              </div>
              <div class="flex items-center gap-1 text-gray-500 dark:text-text-muted text-sm">
                <MapPinIcon class="w-4 h-4" />
                <span>{{ job.location }}</span>
              </div>
            </div>

            <!-- Type Badge -->
            <div class="flex items-center gap-2 mb-4">
              <span
                :class="[
                  'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full',
                  typeConfig[job.type]?.class || ''
                ]"
              >
                <span :class="['w-1.5 h-1.5 rounded-full', typeConfig[job.type]?.dotClass || '']" />
                {{ typeConfig[job.type]?.label || job.type }}
              </span>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-5">
              <span
                v-for="tag in job.tags.slice(0, 3)"
                :key="tag"
                class="px-2.5 py-1 bg-gray-100 dark:bg-dark-hover text-gray-600 dark:text-text-muted text-xs font-medium rounded-lg"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Apply Button -->
            <a
              :href="job.url || `/jobs/${job.id}`"
              class="flex items-center justify-center gap-2 w-full py-3 bg-primary hover:bg-primary-hover text-dark-bg text-sm font-bold rounded-lg transition-all duration-300 shadow-md shadow-primary/20 hover:shadow-primary/40"
            >
              Ver Vaga
              <ArrowTopRightOnSquareIcon class="w-4 h-4" />
            </a>
          </article>
        </div>

        <div v-else class="text-center py-16 bg-gray-50 dark:bg-dark-surface rounded-xl border-2 border-dashed border-gray-200 dark:border-dark-border">
          <BriefcaseIcon class="w-12 h-12 text-gray-400 dark:text-text-muted mx-auto mb-4" />
          <p class="text-gray-500 dark:text-text-muted">Nenhuma vaga com visualizações ainda.</p>
        </div>
      </section>
    </div>
  </div>
</template>
