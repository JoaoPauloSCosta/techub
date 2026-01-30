<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  MapPinIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  ArrowTopRightOnSquareIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/vue/24/outline'
import type { Job } from '../../shared/types'

interface Props {
  jobs: Job[]
}

const props = defineProps<Props>()

const activeFilter = ref<string>('all')

const filters = [
  { id: 'all', label: 'Todos' },
  { id: 'vue', label: 'Vue.js' },
  { id: 'php', label: 'PHP' },
  { id: 'remote', label: 'Remoto' }
]

const filteredJobs = computed(() => {
  if (activeFilter.value === 'all') return props.jobs
  if (activeFilter.value === 'remote') {
    return props.jobs.filter(job => job.type === 'remote')
  }
  return props.jobs.filter(job =>
    job.tags.some(tag => tag.toLowerCase().includes(activeFilter.value))
  )
})

const typeConfig: Record<Job['type'], { label: string; class: string }> = {
  remote: { label: 'Remoto', class: 'bg-success/10 text-success border-success/20' },
  hybrid: { label: 'Híbrido', class: 'bg-accent/10 text-accent border-accent/20' },
  onsite: { label: 'Presencial', class: 'bg-warning/10 text-warning border-warning/20' }
}
</script>

<template>
  <section
    id="jobs-list"
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 25, delay: 200 } }"
    class="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded p-6"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-primary/10 border border-primary/20 rounded flex items-center justify-center">
          <AdjustmentsHorizontalIcon class="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-text-primary">Vagas em Destaque</h2>
          <p class="text-gray-500 dark:text-text-muted text-sm">{{ filteredJobs.length }} vagas disponíveis</p>
        </div>
      </div>
      <a href="/vagas" class="text-primary text-sm font-medium hover:text-primary-light transition-colors flex items-center gap-1 group">
        Ver todas
        <ArrowTopRightOnSquareIcon class="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>
    </div>

    <!-- Filters -->
    <div class="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
      <button
        v-for="filter in filters"
        :key="filter.id"
        :class="[
          'px-4 py-2 text-sm font-medium transition-all duration-250 flex-shrink-0 press-effect',
          activeFilter === filter.id
            ? 'bg-primary text-dark-bg rounded shadow-glow'
            : 'bg-gray-100 dark:bg-dark-hover border border-gray-200 dark:border-dark-border text-gray-600 dark:text-text-secondary hover:text-gray-900 dark:hover:text-text-primary hover:border-primary/50 rounded'
        ]"
        @click="activeFilter = filter.id"
      >
        {{ filter.label }}
      </button>
    </div>

    <!-- Jobs List -->
    <div class="space-y-3">
      <article
        v-for="(job, index) in filteredJobs"
        :key="job.id"
        v-motion
        :initial="{ opacity: 0, x: -10 }"
        :enter="{ opacity: 1, x: 0, transition: { delay: 100 + index * 50 } }"
        class="bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded p-4 hover:border-primary/50 transition-all duration-300 group cursor-pointer"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1 min-w-0">
            <!-- Title -->
            <h3 class="text-gray-900 dark:text-text-primary font-semibold group-hover:text-primary transition-colors mb-2 truncate">
              {{ job.title }}
            </h3>

            <!-- Company & Location -->
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
                  typeConfig[job.type].class
                ]"
              >
                {{ typeConfig[job.type].label }}
              </span>
            </div>

            <!-- Salary & Tags -->
            <div class="flex flex-wrap items-center gap-3">
              <div v-if="job.salary" class="flex items-center gap-1.5 text-primary text-sm font-semibold">
                <CurrencyDollarIcon class="w-4 h-4" />
                <span>{{ job.salary }}</span>
              </div>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="tag in job.tags.slice(0, 3)"
                  :key="tag"
                  class="px-2 py-0.5 bg-gray-100 dark:bg-dark-hover text-gray-500 dark:text-text-muted text-xs rounded"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- Apply Button -->
          <a
            :href="job.url || '#'"
            class="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-hover text-white dark:text-dark-bg text-sm font-semibold rounded transition-all duration-200 flex-shrink-0 press-effect shadow-glow hover:shadow-glow-lg"
          >
            <span>Aplicar</span>
            <ArrowTopRightOnSquareIcon class="w-4 h-4" />
          </a>
        </div>
      </article>

      <!-- Empty State -->
      <div
        v-if="filteredJobs.length === 0"
        class="text-center py-12"
      >
        <p class="text-gray-500 dark:text-text-muted">Nenhuma vaga encontrada para este filtro.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
