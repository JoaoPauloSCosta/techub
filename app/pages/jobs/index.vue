<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSeoMeta } from '#imports'
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/vue/24/outline'
import { useJobs } from '~/composables/useJobs'
import { formatDate } from '~/utils/formatDate'

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

const { getAllJobs } = useJobs()
const allJobs = getAllJobs()

// Filters
const searchQuery = ref<string>('')
const activeFilter = ref<string>('all')
const filters = [
  { id: 'all', label: 'Todos' },
  { id: 'vue', label: 'Vue.js' },
  { id: 'php', label: 'PHP' },
  { id: 'remote', label: 'Remoto' },
  { id: 'hybrid', label: 'Híbrido' }
]

const typeConfig: Record<string, { label: string; class: string }> = {
  remote: { label: 'Remoto', class: 'bg-success/10 text-success border-success/20' },
  hybrid: { label: 'Híbrido', class: 'bg-accent/10 text-accent border-accent/20' },
  onsite: { label: 'Presencial', class: 'bg-warning/10 text-warning border-warning/20' }
}

const filteredJobs = computed<Job[]>(() => {
  let jobs = allJobs

  // Filter by type or tag
  if (activeFilter.value !== 'all') {
    if (activeFilter.value === 'remote' || activeFilter.value === 'hybrid' || activeFilter.value === 'onsite') {
      jobs = jobs.filter(job => job.type === activeFilter.value)
    } else {
      jobs = jobs.filter(job =>
        job.tags.some(tag => tag.toLowerCase().includes(activeFilter.value))
      )
    }
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    jobs = jobs.filter(job =>
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  return jobs
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
          <h1 class="text-3xl md:text-4xl font-bold text-text-primary">Vagas em Tech</h1>
          <p class="text-text-muted text-lg">{{ filteredJobs.length }} vagas disponíveis</p>
        </div>
      </div>
    </div>

    <!-- Filters Row -->
    <div
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
      class="mb-8 space-y-4"
    >
      <!-- Search Bar -->
      <div class="relative max-w-xl">
        <MagnifyingGlassIcon class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar por cargo, empresa ou tecnologia..."
          class="w-full pl-12 pr-4 py-3 bg-dark-card border border-dark-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary/50 transition-all duration-200"
        />
      </div>

      <!-- Filter Chips -->
      <div class="flex gap-2 flex-wrap">
        <button
          v-for="filter in filters"
          :key="filter.id"
          :class="[
            'px-4 py-2 text-sm font-medium transition-all duration-250 press-effect',
            activeFilter === filter.id
              ? 'bg-primary text-dark-bg rounded shadow-glow'
              : 'bg-dark-card border border-dark-border text-text-secondary hover:text-text-primary hover:border-primary/30 rounded'
          ]"
          @click="activeFilter = filter.id"
        >
          {{ filter.label }}
        </button>
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
        class="block bg-dark-card border border-dark-border rounded-lg p-6 hover:border-primary/30 hover:shadow-card-hover transition-all duration-300 group"
      >
        <div class="flex flex-col md:flex-row md:items-center gap-4">
          <!-- Company Logo -->
          <div v-if="job.companyLogo" class="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border border-dark-border">
            <img :src="job.companyLogo" :alt="job.company" class="w-full h-full object-cover" />
          </div>
          <div v-else class="w-14 h-14 bg-dark-hover border border-dark-border rounded-lg flex items-center justify-center flex-shrink-0">
            <BuildingOfficeIcon class="w-7 h-7 text-text-muted" />
          </div>

          <!-- Job Info -->
          <div class="flex-1 min-w-0">
            <h2 class="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors mb-1 truncate">
              {{ job.title }}
            </h2>
            <div class="flex flex-wrap items-center gap-4 text-text-muted text-sm mb-3">
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
            </div>

            <!-- Tags & Salary -->
            <div class="flex flex-wrap items-center gap-3">
              <div v-if="job.salary" class="flex items-center gap-1.5 text-primary text-sm font-semibold">
                <CurrencyDollarIcon class="w-4 h-4" />
                <span>{{ job.salary }}</span>
              </div>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="tag in job.tags.slice(0, 4)"
                  :key="tag"
                  class="px-2 py-0.5 bg-dark-hover text-text-muted text-xs rounded"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- Right Side -->
          <div class="flex flex-col items-end gap-2 flex-shrink-0">
            <span class="text-text-muted text-xs">{{ formatDate(job.date) }}</span>
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
        <BriefcaseIcon class="w-16 h-16 text-text-muted mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-text-primary mb-2">Nenhuma vaga encontrada</h3>
        <p class="text-text-muted">Tente ajustar os filtros ou buscar por outro termo.</p>
      </div>
    </div>
  </div>
</template>
