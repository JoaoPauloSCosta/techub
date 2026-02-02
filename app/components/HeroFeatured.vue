<script setup lang="ts">
import { computed } from 'vue'
import { ClockIcon, CalendarIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
import type { Post } from '../../shared/types'
import { formatDate } from '~/utils/formatDate'

interface Props {
  post: Post
}

const props = defineProps<Props>()

const formattedDate = computed(() => formatDate(props.post.date))
</script>

<template>
  <NuxtLink
    :to="`/articles/${post.slug}`"
    id="hero-featured"
    v-motion
    :initial="{ opacity: 0, y: 30 }"
    :enter="{ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 25, delay: 100 } }"
    class="block relative rounded-lg overflow-hidden group cursor-pointer"
  >
    <!-- Background Image with parallax-like effect -->
    <div class="aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
      <img
        :src="post.image"
        :alt="post.title"
        class="w-full h-full object-cover transition-transform duration-700 ease-spring group-hover:scale-105"
      />
    </div>

    <!-- Layered Gradient Overlays for depth -->
    <div class="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/70 to-transparent"></div>
    <div class="absolute inset-0 bg-gradient-to-r from-dark-bg/50 via-transparent to-transparent"></div>

    <!-- Subtle border glow on hover -->
    <div class="absolute inset-0 border border-transparent group-hover:border-primary/20 rounded-lg transition-all duration-500"></div>

    <!-- Content -->
    <div class="absolute bottom-0 left-0 right-0 p-6 md:p-10">
      <!-- Category Badge - Sharp style -->
      <span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-dark-bg text-xs font-bold uppercase tracking-wider rounded mb-4 shadow-glow">
        {{ post.category }}
      </span>

      <!-- Title with text gradient on hover -->
      <h1 class="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-300">
        {{ post.title }}
      </h1>

      <!-- Excerpt -->
      <p class="text-gray-200 text-base md:text-lg mb-6 line-clamp-2 max-w-3xl">
        {{ post.excerpt }}
      </p>

      <!-- Meta Info Row -->
      <div class="flex items-center gap-6 flex-wrap">
        <!-- Author -->
        <div class="flex items-center gap-3">
          <div class="relative">
            <img
              :src="post.author.avatar"
              :alt="post.author.name"
              class="w-10 h-10 rounded object-cover border-2 border-primary/50"
            />
            <!-- Online indicator -->
            <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-primary border-2 border-dark-bg rounded-full"></span>
          </div>
          <div>
            <span class="text-white text-sm font-semibold block">{{ post.author.name }}</span>
            <span v-if="post.author.role" class="text-gray-300 text-xs">{{ post.author.role }}</span>
          </div>
        </div>

        <div class="flex items-center gap-5 text-gray-300 text-sm">
          <!-- Date -->
          <div class="flex items-center gap-1.5">
            <CalendarIcon class="w-4 h-4" />
            <span>{{ formattedDate }}</span>
          </div>

          <!-- Read Time -->
          <div class="flex items-center gap-1.5">
            <ClockIcon class="w-4 h-4" />
            <span>{{ post.readTime }} min</span>
          </div>
        </div>

        <!-- CTA Button -->
        <span
          class="hidden md:flex items-center gap-2 ml-auto px-5 py-2.5 bg-dark-bg/80 border border-white/20 text-white text-sm font-medium rounded group-hover:bg-primary group-hover:border-primary group-hover:text-dark-bg transition-all duration-300"
        >
          <span>Ler artigo</span>
          <ArrowRightIcon class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
