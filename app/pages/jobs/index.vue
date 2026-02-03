<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSeoMeta, useRoute } from '#imports'
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  ArrowTopRightOnSquareIcon,
  FireIcon
} from '@heroicons/vue/24/outline'
import { useJobs } from '~/composables/useJobs'
import { formatDate } from '~/utils/formatDate'
import type { Job } from '#shared/types'

// SEO Meta
useSeoMeta({
  title: 'Vagas - TechHub',
  description: 'Encontre vagas de Vue.js, Nuxt, PHP e desenvolvimento web. Oportunidades remotas e híbridas no Brasil e no mundo.',
  ogTitle: 'Vagas - TechHub',
  ogDescription: 'Vagas para desenvolvedores Vue.js, PHP e web em geral.'
})

// Define layout
definePageMeta({
  layout: 'default-layout'
})

const route = useRoute()
const { getAllJobs } = useJobs()
const allJobs = getAllJobs()

// Filter State
const searchQuery = ref<string>('')
const selectedTech = ref<string>('all')
const selectedModel = ref<string>('all')
const selectedLevel = ref<string>('all')

const techFilters = [
  { id: 'all', label: 'Todas' },
  { id: 'Vue.js', label: 'Vue.js' },
  { id: 'Nuxt', label: 'Nuxt' },
  { id: 'Node.js', label: 'Node.js' },
  { id: 'PHP', label: 'PHP' },
  { id: 'IA / Automação', label: 'IA / Automação' }
]

const modelFilters = [
  { id: 'all', label: 'Todos' },
  { id: 'remote', label: 'Remoto' },
  { id: 'hybrid', label: 'Híbrido' },
  { id: 'onsite', label: 'Presencial' }
]

const levelFilters = [
  { id: 'all', label: 'Todos' },
  { id: 'Junior', label: 'Júnior' },
  { id: 'Pleno', label: 'Pleno' },
  { id: 'Senior', label: 'Sênior' }
]

const typeConfig: Record<string, { label: string; class: string }> = {
  remote: { label: 'Remoto', class: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' },
  hybrid: { label: 'Híbrido', class: 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20' },
  onsite: { label: 'Presencial', class: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20' }
}

const isNew = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 + 60 * 60 * 24))
  return diffDays <= 3
}

const filteredJobs = computed<Job[]>(() => {
  return allJobs.filter(job => {
    // Search Query
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase()
      const matchesSearch = 
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.tags.some(tag => tag.toLowerCase().includes(query))
      
      if (!matchesSearch) return false
    }

    // Technology Filter (Tag based)
    if (selectedTech.value !== 'all') {
      const hasTech = job.tags.some(tag => tag.toLowerCase() === selectedTech.value.toLowerCase())
      // Special case for general matching if exact match fails, or strict?
      // User asked: "Vue.js", "Nuxt". Let's do exact or includes for robustness.
      // Actually tags in mock are "Vue.js", "Nuxt". 
      // "IA / Automação" map to tags "AI", "Automation"?
      // Let's improve the logic for "IA / Automação"
      if (selectedTech.value === 'IA / Automação') {
        const aiTags = ['AI', 'Automation', 'IA', 'Machine Learning']
        if (!job.tags.some(tag => aiTags.some(ai => tag.includes(ai)))) return false
      } else {
         if (!job.tags.some(tag => tag.toLowerCase().includes(selectedTech.value.toLowerCase()))) return false
      }
    }

    // Model Filter
    if (selectedModel.value !== 'all') {
      if (job.type !== selectedModel.value) return false
    }

    // Level Filter
    if (selectedLevel.value !== 'all') {
      // Mock data now has level, but we should handle if it's missing or case insensitive
      if (!job.level || job.level.toLowerCase() !== selectedLevel.value.toLowerCase()) return false
    }

    return true
  })
})
</script>

<template>
  <div id="jobs-page" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Page Header -->
    <div
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 25 } }"
      class="mb-10"
    >
      <div class="flex items-center gap-4 mb-4">
        <div class="w-14 h-14 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-center">
          <BriefcaseIcon class="w-7 h-7 text-primary" />
        </div>
        <div>
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-text-primary">Vagas em Tech</h1>
          <p class="text-gray-500 dark:text-text-muted text-lg">{{ filteredJobs.length }} vagas disponíveis</p>
        </div>
      </div>
    </div>

    <!-- Filters Row -->
    <div
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
      class="mb-8 space-y-6"
    >
      <!-- Search Bar -->
      <div class="relative max-w-xl">
        <MagnifyingGlassIcon class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-text-muted" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar por cargo, empresa ou tecnologia..."
          class="w-full pl-12 pr-4 py-3 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg text-gray-900 dark:text-text-primary placeholder-gray-400 dark:placeholder-text-muted focus:outline-none focus:border-primary/50 transition-all duration-200"
        />
      </div>

      <!-- Filters Groups -->
      <div class="flex flex-col gap-4">
        <!-- Techs -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-3">
          <span class="text-sm font-medium text-gray-500 dark:text-text-muted w-20">Tecnologia:</span>
          <div class="flex gap-2 flex-wrap">
            <button
              v-for="tech in techFilters"
              :key="tech.id"
              :class="[
                'px-3 py-1.5 text-xs font-medium transition-all duration-250 press-effect border',
                selectedTech === tech.id
                  ? 'bg-primary/10 border-primary text-primary rounded-full'
                  : 'bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border text-gray-600 dark:text-text-secondary hover:border-primary/30 rounded-full'
              ]"
              @click="selectedTech = tech.id"
            >
              {{ tech.label }}
            </button>
          </div>
        </div>

        <!-- Model -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-3">
          <span class="text-sm font-medium text-gray-500 dark:text-text-muted w-20">Modelo:</span>
          <div class="flex gap-2 flex-wrap">
            <button
              v-for="model in modelFilters"
              :key="model.id"
              :class="[
                'px-3 py-1.5 text-xs font-medium transition-all duration-250 press-effect border',
                selectedModel === model.id
                  ? 'bg-primary/10 border-primary text-primary rounded-full'
                  : 'bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border text-gray-600 dark:text-text-secondary hover:border-primary/30 rounded-full'
              ]"
              @click="selectedModel = model.id"
            >
              {{ model.label }}
            </button>
          </div>
        </div>

        <!-- Level -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-3">
          <span class="text-sm font-medium text-gray-500 dark:text-text-muted w-20">Nível:</span>
          <div class="flex gap-2 flex-wrap">
            <button
              v-for="lvl in levelFilters"
              :key="lvl.id"
              :class="[
                'px-3 py-1.5 text-xs font-medium transition-all duration-250 press-effect border',
                selectedLevel === lvl.id
                  ? 'bg-primary/10 border-primary text-primary rounded-full'
                  : 'bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border text-gray-600 dark:text-text-secondary hover:border-primary/30 rounded-full'
              ]"
              @click="selectedLevel = lvl.id"
            >
              {{ lvl.label }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Jobs List -->
    <div class="space-y-4">
      <NuxtLink
        v-for="(job, index) in filteredJobs"
        :key="job.id"
        :to="`/jobs/${job.id}`"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 150 + index * 50 } }"
        class="block bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg p-6 hover:border-primary/30 hover:shadow-card-hover transition-all duration-300 group relative overflow-hidden"
      >
        <!-- New Badge -->
        <div v-if="isNew(job.date)" class="absolute top-0 right-0">
          <div class="bg-red-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-bl-lg shadow-sm flex items-center gap-1">
            <FireIcon class="w-3 h-3" />
            Novo
          </div>
        </div>

        <div class="flex flex-col md:flex-row md:items-center gap-4">
          <!-- Company Logo -->
          <div v-if="job.companyLogo" class="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200 dark:border-dark-border bg-white">
            <img :src="job.companyLogo" :alt="job.company" class="w-full h-full object-cover" />
          </div>
          <div v-else class="w-14 h-14 bg-gray-100 dark:bg-dark-hover border border-gray-200 dark:border-dark-border rounded-lg flex items-center justify-center flex-shrink-0">
            <BuildingOfficeIcon class="w-7 h-7 text-gray-400 dark:text-text-muted" />
          </div>

          <!-- Job Info -->
          <div class="flex-1 min-w-0 pt-2 md:pt-0">
            <div class="flex items-center gap-2 mb-1">
               <h2 class="text-lg font-semibold text-gray-900 dark:text-text-primary group-hover:text-primary transition-colors truncate">
                {{ job.title }}
              </h2>
            </div>
           
            <div class="flex flex-wrap items-center gap-4 text-gray-500 dark:text-text-muted text-sm mb-3">
              <div class="flex items-center gap-1.5">
                <BuildingOfficeIcon class="w-4 h-4" />
                <span>{{ job.company }}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <MapPinIcon class="w-4 h-4" />
                <span>{{ job.location }}</span>
              </div>
              <span
                :class="[
                  'px-2 py-0.5 text-xs font-medium border rounded',
                  typeConfig[job.type]?.class || ''
                ]"
              >
                {{ typeConfig[job.type]?.label || job.type }}
              </span>
              <span v-if="job.level" class="px-2 py-0.5 text-xs font-medium border border-gray-200 dark:border-dark-border rounded text-gray-600 dark:text-text-secondary bg-gray-50 dark:bg-dark-hover">
                {{ job.level }}
              </span>
            </div>

            <!-- Tags & Salary -->
            <div class="flex flex-wrap items-center gap-3">
              <div v-if="job.salary" class="flex items-center gap-1.5 text-primary text-sm font-semibold">
                <CurrencyDollarIcon class="w-4 h-4" />
                <span>{{ job.salary }}</span>
              </div>
              <div class="flex flex-wrap gap-1.5 border-l border-gray-200 dark:border-dark-border pl-3 ml-1 h-5 items-center">
                <span
                  v-for="tag in job.tags.slice(0, 4)"
                  :key="tag"
                  class="px-2 py-0.5 bg-gray-100 dark:bg-dark-hover text-gray-500 dark:text-text-muted text-xs rounded"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- Right Side -->
          <div class="flex flex-col items-end gap-2 flex-shrink-0 mt-4 md:mt-0">
            <span class="text-gray-400 dark:text-text-muted text-xs">{{ formatDate(job.date) }}</span>
            <div class="flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Ver vaga</span>
              <ArrowTopRightOnSquareIcon class="w-4 h-4" />
            </div>
          </div>
        </div>
      </NuxtLink>

      <!-- Empty State -->
      <div
        v-if="filteredJobs.length === 0"
        class="text-center py-20"
      >
        <BriefcaseIcon class="w-16 h-16 text-gray-400 dark:text-text-muted mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-gray-900 dark:text-text-primary mb-2">Nenhuma vaga encontrada</h3>
        <p class="text-gray-500 dark:text-text-muted">Tente ajustar os filtros ou buscar por outro termo.</p>
      </div>
    </div>
  </div>
</template>
