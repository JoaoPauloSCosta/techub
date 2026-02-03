<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSeoMeta } from '#imports'
import {
  MapPinIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ClockIcon,
  ArrowLeftIcon,
  ArrowTopRightOnSquareIcon,
  ShareIcon,
  BookmarkIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline'
import { useJobs } from '~/composables/useJobs'
import { formatDate } from '~/utils/formatDate'

// Define layout
definePageMeta({
  layout: 'default-layout'
})

const route = useRoute()
const { getJobById, getJobs } = useJobs()
const jobId = computed(() => route.params.id as string)

const { data: pageData } = await useAsyncData(`job-${jobId.value}`, async () => {
  const [fetchedJob, fetchedRelated] = await Promise.all([
    getJobById(jobId.value),
    getJobs(6)
  ])
  return { job: fetchedJob, related: fetchedRelated }
})

const job = computed(() => pageData.value?.job)

// Related jobs (same type or tags)
const relatedJobs = computed(() => {
  if (!pageData.value?.related || !job.value) return []
  return pageData.value.related
    .filter(j => j.id !== job.value?.id)
    .slice(0, 3)
})

// SEO Meta
useSeoMeta({
  title: computed(() => job.value ? `${job.value.title} - ${job.value.company} | TechHub` : 'Vaga não encontrada'),
  description: computed(() => job.value ? `Vaga de ${job.value.title} na ${job.value.company}. ${job.value.location}. Candidate-se agora!` : '')
})

const typeConfig: Record<string, { label: string; class: string }> = {
  remote: { label: 'Remoto', class: 'bg-success/10 text-success border-success/20' },
  hybrid: { label: 'Híbrido', class: 'bg-accent/10 text-accent border-accent/20' },
  onsite: { label: 'Presencial', class: 'bg-warning/10 text-warning border-warning/20' }
}

// Mock job description sections
const aboutCompany = `A empresa é líder no setor de tecnologia, focada em desenvolver soluções inovadoras para o mercado brasileiro e global. Com uma cultura de inovação e crescimento contínuo, oferecemos um ambiente de trabalho dinâmico e colaborativo.`

const responsibilities = [
  'Desenvolver e manter aplicações web modernas utilizando Vue.js e Nuxt',
  'Colaborar com designers e product managers para implementar interfaces de usuário',
  'Escrever código limpo, testável e bem documentado',
  'Participar de code reviews e contribuir para a melhoria contínua do código',
  'Mentorar desenvolvedores júnior quando necessário',
  'Participar de discussões de arquitetura e decisões técnicas'
]

const requirements = [
  '5+ anos de experiência com desenvolvimento frontend',
  'Domínio de Vue.js 3 e Composition API',
  'Experiência com TypeScript',
  'Conhecimento de Nuxt 3 (diferencial)',
  'Familiaridade com testes unitários e E2E',
  'Inglês intermediário para leitura técnica'
]

const benefits = [
  'Trabalho 100% remoto',
  'Plano de saúde e odontológico',
  'Vale alimentação/refeição',
  'Gympass',
  'Budget para educação e conferências',
  'MacBook Pro para trabalho'
]
</script>

<template>
  <div id="job-detail-page">
    <!-- Job Not Found -->
    <div v-if="!job" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <BuildingOfficeIcon class="w-20 h-20 text-gray-400 dark:text-text-muted mx-auto mb-6" />
      <h1 class="text-2xl font-bold text-gray-900 dark:text-text-primary mb-4">Vaga não encontrada</h1>
      <p class="text-gray-500 dark:text-text-muted mb-8">A vaga que você procura não existe ou foi removida.</p>
      <NuxtLink to="/jobs" class="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white dark:text-dark-bg font-semibold rounded-lg transition-all duration-200 press-effect">
        <ArrowLeftIcon class="w-5 h-5" />
        Ver todas as vagas
      </NuxtLink>
    </div>

    <!-- Job Detail -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Back Button -->
      <NuxtLink
        to="/jobs"
        v-motion
        :initial="{ opacity: 0, x: -10 }"
        :enter="{ opacity: 1, x: 0 }"
        class="inline-flex items-center gap-2 text-gray-500 dark:text-text-muted hover:text-primary transition-colors mb-6"
      >
        <ArrowLeftIcon class="w-4 h-4" />
        Voltar para vagas
      </NuxtLink>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Job Header -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 25 } }"
            class="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg p-6 md:p-8"
          >
            <div class="flex flex-col md:flex-row gap-6">
              <!-- Company Logo -->
              <div v-if="job.companyLogo" class="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200 dark:border-dark-border">
                <img :src="job.companyLogo" :alt="job.company" class="w-full h-full object-cover" />
              </div>
              <div v-else class="w-20 h-20 bg-gray-100 dark:bg-dark-hover border border-gray-200 dark:border-dark-border rounded-lg flex items-center justify-center flex-shrink-0">
                <BuildingOfficeIcon class="w-10 h-10 text-gray-400 dark:text-text-muted" />
              </div>

              <!-- Job Info -->
              <div class="flex-1">
                <div class="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-text-primary mb-2">{{ job.title }}</h1>
                    <p class="text-gray-600 dark:text-text-secondary text-lg mb-4">{{ job.company }}</p>
                  </div>
                  <span
                    :class="[
                      'px-3 py-1.5 text-sm font-semibold border rounded-lg',
                      typeConfig[job.type]?.class || ''
                    ]"
                  >
                    {{ typeConfig[job.type]?.label || job.type }}
                  </span>
                </div>

                <!-- Meta Info -->
                <div class="flex flex-wrap items-center gap-5 text-gray-500 dark:text-text-muted text-sm">
                  <div class="flex items-center gap-1.5">
                    <MapPinIcon class="w-4 h-4" />
                    <span>{{ job.location }}</span>
                  </div>
                  <div v-if="job.salary" class="flex items-center gap-1.5 text-primary font-semibold">
                    <CurrencyDollarIcon class="w-4 h-4" />
                    <span>{{ job.salary }}</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <CalendarIcon class="w-4 h-4" />
                    <span>Publicada {{ formatDate(job.date) }}</span>
                  </div>
                </div>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mt-5">
                  <span
                    v-for="tag in job.tags"
                    :key="tag"
                    class="px-3 py-1 bg-gray-100 dark:bg-dark-hover border border-gray-200 dark:border-dark-border text-gray-600 dark:text-text-secondary text-sm rounded"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- About Company -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
            class="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg p-6 md:p-8"
          >
            <h2 class="text-xl font-bold text-gray-900 dark:text-text-primary mb-4">Sobre a Empresa</h2>
            <p class="text-gray-600 dark:text-text-secondary leading-relaxed">{{ aboutCompany }}</p>
          </div>

          <!-- Responsibilities -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 150 } }"
            class="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg p-6 md:p-8"
          >
            <h2 class="text-xl font-bold text-gray-900 dark:text-text-primary mb-4">Responsabilidades</h2>
            <ul class="space-y-3">
              <li v-for="item in responsibilities" :key="item" class="flex items-start gap-3 text-gray-600 dark:text-text-secondary">
                <CheckCircleIcon class="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <!-- Requirements -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
            class="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg p-6 md:p-8"
          >
            <h2 class="text-xl font-bold text-gray-900 dark:text-text-primary mb-4">Requisitos</h2>
            <ul class="space-y-3">
              <li v-for="item in requirements" :key="item" class="flex items-start gap-3 text-gray-600 dark:text-text-secondary">
                <CheckCircleIcon class="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <!-- Benefits -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 250 } }"
            class="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg p-6 md:p-8"
          >
            <h2 class="text-xl font-bold text-gray-900 dark:text-text-primary mb-4">Benefícios</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div v-for="item in benefits" :key="item" class="flex items-center gap-3 text-gray-600 dark:text-text-secondary bg-gray-50 dark:bg-dark-hover rounded-lg p-3">
                <CheckCircleIcon class="w-5 h-5 text-success flex-shrink-0" />
                <span>{{ item }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <aside class="lg:col-span-1 space-y-6">
          <div class="lg:sticky lg:top-32 space-y-6">
            <!-- Apply Card -->
            <div
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
              class="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg p-6"
            >
              <a
                :href="job.url || '#'"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary hover:bg-primary-hover text-white dark:text-dark-bg font-bold rounded-lg transition-all duration-200 press-effect shadow-glow hover:shadow-glow-lg mb-4"
              >
                Candidatar-se
                <ArrowTopRightOnSquareIcon class="w-5 h-5" />
              </a>
              <div class="flex gap-2">
                <button class="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-dark-hover border border-gray-200 dark:border-dark-border text-gray-600 dark:text-text-secondary hover:text-gray-900 dark:hover:text-text-primary hover:border-primary/30 rounded-lg transition-all duration-200">
                  <BookmarkIcon class="w-5 h-5" />
                  Salvar
                </button>
                <button class="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-dark-hover border border-gray-200 dark:border-dark-border text-gray-600 dark:text-text-secondary hover:text-gray-900 dark:hover:text-text-primary hover:border-primary/30 rounded-lg transition-all duration-200">
                  <ShareIcon class="w-5 h-5" />
                  Compartilhar
                </button>
              </div>
            </div>

            <!-- Job Quick Info -->
            <div
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 150 } }"
              class="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg p-6 space-y-4"
            >
              <h3 class="text-lg font-bold text-gray-900 dark:text-text-primary">Informações</h3>
              <div class="space-y-3 text-sm">
                <div class="flex items-center justify-between">
                  <span class="text-gray-500 dark:text-text-muted">Tipo</span>
                  <span class="text-gray-900 dark:text-text-primary font-medium">{{ typeConfig[job.type]?.label || job.type }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-500 dark:text-text-muted">Localização</span>
                  <span class="text-gray-900 dark:text-text-primary font-medium">{{ job.location }}</span>
                </div>
                <div v-if="job.salary" class="flex items-center justify-between">
                  <span class="text-gray-500 dark:text-text-muted">Salário</span>
                  <span class="text-primary font-semibold">{{ job.salary }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-500 dark:text-text-muted">Publicada</span>
                  <span class="text-gray-900 dark:text-text-primary font-medium">{{ formatDate(job.date) }}</span>
                </div>
              </div>
            </div>

            <!-- Related Jobs -->
            <div
              v-if="relatedJobs.length > 0"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 200 } }"
              class="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg p-6"
            >
              <h3 class="text-lg font-bold text-gray-900 dark:text-text-primary mb-4">Vagas Similares</h3>
              <div class="space-y-3">
                <NuxtLink
                  v-for="relatedJob in relatedJobs"
                  :key="relatedJob.id"
                  :to="`/jobs/${relatedJob.id}`"
                  class="block p-3 bg-gray-50 dark:bg-dark-hover border border-gray-200 dark:border-dark-border rounded-lg hover:border-primary/30 transition-all duration-200"
                >
                  <h4 class="text-gray-900 dark:text-text-primary text-sm font-medium mb-1 truncate">{{ relatedJob.title }}</h4>
                  <p class="text-gray-500 dark:text-text-muted text-xs">{{ relatedJob.company }}</p>
                </NuxtLink>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
