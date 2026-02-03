<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  MapPinIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  ArrowTopRightOnSquareIcon,
  SparklesIcon,
  RocketLaunchIcon,
  GlobeAltIcon,
  BriefcaseIcon
} from '@heroicons/vue/24/outline'
import { FireIcon } from '@heroicons/vue/24/solid'
import type { Job } from '../../shared/types'

interface Props {
  jobs: Job[]
}

const props = defineProps<Props>()

const activeFilter = ref<string>('all')

// Reduzido para 3 filtros como solicitado
const filters = [
  { id: 'all', label: 'Todos' },
  { id: 'vue', label: 'Vue.js' },
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

const typeConfig: Record<Job['type'], { label: string; class: string; dotClass: string }> = {
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

// Check if job is new (posted in last 3 days)
const isNewJob = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays <= 3
}
</script>

<template>
  <section
    id="jobs-list"
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 25, delay: 200 } }"
    class="relative"
  >
    <!-- Decorative Background Gradient -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-2xl -z-10" />
    
    <!-- Main Container with Glass Effect -->
    <div class="bg-white/80 dark:bg-dark-card/80 backdrop-blur-xl border border-gray-200/50 dark:border-dark-border/50 rounded-2xl p-6 shadow-xl shadow-black/5">
      
      <!-- Header Section - CENTRALIZADO e fonte menor -->
      <div class="flex flex-col items-center text-center mb-6">
        <!-- Animated Icon Container -->
        <div class="relative mb-3">
          <div class="absolute inset-0 bg-primary/20 rounded-xl blur-lg animate-pulse" />
          <div class="relative w-10 h-10 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center shadow-lg shadow-primary/25">
            <BriefcaseIcon class="w-5 h-5 text-dark-bg" />
          </div>
        </div>
        <h2 class="text-lg font-bold text-gray-900 dark:text-text-primary tracking-tight mb-1">
          Vagas em Destaque
        </h2>
        <p class="text-gray-500 dark:text-text-muted text-xs flex items-center gap-2">
          <span class="inline-flex items-center gap-1">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {{ filteredJobs.length }} vagas disponíveis
          </span>
        </p>
      </div>

      <!-- Filter Pills - Compactos e centralizados -->
      <div class="flex justify-center gap-2 mb-6">
        <button
          v-for="filter in filters"
          :key="filter.id"
          :class="[
            'px-3 py-1.5 text-xs font-medium transition-all duration-300 rounded-lg',
            activeFilter === filter.id
              ? 'bg-primary text-dark-bg shadow-md shadow-primary/25'
              : 'bg-gray-100 dark:bg-dark-hover text-gray-600 dark:text-text-secondary hover:bg-gray-200 dark:hover:bg-dark-border'
          ]"
          @click="activeFilter = filter.id"
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- Jobs Grid -->
      <div class="space-y-4">
        <article
          v-for="(job, index) in filteredJobs"
          :key="job.id"
          v-motion
          :initial="{ opacity: 0, x: -20 }"
          :enter="{ opacity: 1, x: 0, transition: { delay: 100 + index * 75 } }"
          class="group relative bg-gradient-to-r from-gray-50 to-white dark:from-dark-surface dark:to-dark-card border border-gray-200/80 dark:border-dark-border/80 rounded-xl p-5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer overflow-hidden"
        >
          <!-- Hover Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <!-- New Badge - Premium Style -->
          <div v-if="isNewJob(job.date)" class="absolute -top-0.5 -right-0.5">
            <div class="bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] uppercase font-bold px-3 py-1.5 rounded-bl-xl rounded-tr-xl shadow-lg shadow-red-500/25 flex items-center gap-1">
              <FireIcon class="w-3 h-3" />
              Nova
            </div>
          </div>

          <div class="relative flex flex-col">
            <!-- Title with hover effect -->
            <h3 class="text-gray-900 dark:text-text-primary font-bold text-lg group-hover:text-primary transition-colors duration-300 mb-3 pr-16">
              {{ job.title }}
            </h3>

            <!-- Company & Location Row -->
            <div class="flex flex-wrap items-center gap-4 mb-4">
              <div class="flex items-center gap-2 text-gray-600 dark:text-text-secondary">
                <div class="w-8 h-8 bg-gray-100 dark:bg-dark-hover rounded-lg flex items-center justify-center">
                  <BuildingOfficeIcon class="w-4 h-4 text-gray-500 dark:text-text-muted" />
                </div>
                <span class="text-sm font-medium">{{ job.company }}</span>
              </div>
              <div class="flex items-center gap-1.5 text-gray-500 dark:text-text-muted text-sm">
                <MapPinIcon class="w-4 h-4" />
                <span>{{ job.location }}</span>
              </div>
              <!-- Type Badge with Dot -->
              <span
                :class="[
                  'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full',
                  typeConfig[job.type].class
                ]"
              >
                <span :class="['w-1.5 h-1.5 rounded-full', typeConfig[job.type].dotClass]" />
                {{ typeConfig[job.type].label }}
              </span>
            </div>

            <!-- Salary & Tags Row -->
            <div class="flex flex-wrap items-center gap-3 mb-5">
              <!-- Salary - Premium Display -->
              <div v-if="job.salary" class="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-lg">
                <CurrencyDollarIcon class="w-4 h-4" />
                <span class="text-sm font-bold tracking-tight">{{ job.salary }}</span>
              </div>
              
              <!-- Tech Tags - Styled Pills -->
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in job.tags.slice(0, 3)"
                  :key="tag"
                  class="px-2.5 py-1 bg-gray-100 dark:bg-dark-hover text-gray-600 dark:text-text-muted text-xs font-medium rounded-lg border border-gray-200/50 dark:border-dark-border/50 hover:border-primary/30 hover:text-primary transition-all duration-200"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- Apply Button - ABAIXO das tags, MAIOR e CENTRALIZADO -->
            <a
              :href="job.url || '#'"
              class="flex items-center justify-center gap-2 w-full py-3.5 bg-primary hover:bg-primary-hover text-dark-bg text-base font-bold rounded-xl transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] active:scale-100"
              @click.stop
            >
              <RocketLaunchIcon class="w-5 h-5" />
              <span>Aplicar Agora</span>
            </a>
          </div>
        </article>

        <!-- Empty State - Premium -->
        <div
          v-if="filteredJobs.length === 0"
          class="text-center py-16"
        >
          <div class="w-20 h-20 mx-auto mb-6 bg-gray-100 dark:bg-dark-hover rounded-2xl flex items-center justify-center">
            <BriefcaseIcon class="w-10 h-10 text-gray-400 dark:text-text-muted" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-text-primary mb-2">Nenhuma vaga encontrada</h3>
          <p class="text-gray-500 dark:text-text-muted">Tente ajustar os filtros selecionados.</p>
        </div>
      </div>

      <!-- Ver todas - BOTÃO MENOR E VERDE, ao final -->
      <div class="flex justify-center mt-6">
        <a 
          href="/jobs" 
          class="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-hover text-dark-bg text-xs font-semibold rounded-lg transition-all duration-300 shadow-md shadow-primary/20"
        >
          <span>Ver todas as vagas</span>
          <ArrowTopRightOnSquareIcon class="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
