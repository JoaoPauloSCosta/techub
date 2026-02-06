<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRuntimeConfig, showError } from '#imports'
import { useSeoMeta, useHead } from '#imports'
import ArticleHeader from '~/components/ArticleHeader.vue'
import ArticleBody from '~/components/ArticleBody.vue'
import TableOfContents from '~/components/TableOfContents.vue'
import SocialShare from '~/components/SocialShare.vue'
import AuthorCard from '~/components/AuthorCard.vue'
import RelatedArticles from '~/components/RelatedArticles.vue'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import { usePosts } from '~/composables/usePosts'
import { useArticleSchema, useBreadcrumbSchema } from '~/composables/useSchema'

// Define layout
definePageMeta({
  layout: 'default-layout'
})

const route = useRoute()
const { getPostBySlug, getRelatedPosts, incrementViews } = usePosts()

// Get slug from route
const slug = computed<string>(() => route.params.slug as string)

// Get article data
const { data: article } = await useAsyncData(
  `article-${slug.value}`, 
  () => getPostBySlug(slug.value)
)

// Handle 404
if (!article.value) {
  showError({
    statusCode: 404,
    statusMessage: 'Artigo não encontrado'
  })
}

// Increment view count (client-side only to avoid SSR double-counting)
onMounted(() => {
  if (article.value?.id) {
    incrementViews(article.value.id)
  }
})

// Related articles
const { data: relatedArticles } = await useAsyncData(
  `related-${slug.value}`,
  () => getRelatedPosts(slug.value, 3),
  {
      lazy: true, // Load related posts after main content
      default: () => []
  }
)


// Article URL for sharing
const articleUrl = computed<string>(() => {
  if (typeof window !== 'undefined') {
    return window.location.href
  }
  return `/articles/${slug.value}`
})

// Dynamic SEO
useSeoMeta({
  title: computed(() => article.value ? `${article.value.title} | TechHub` : 'Artigo não encontrado'),
  description: computed(() => article.value?.excerpt || ''),
  ogTitle: computed(() => article.value?.title || ''),
  ogDescription: computed(() => article.value?.excerpt || ''),
  ogImage: computed(() => article.value?.image || ''),
  ogType: 'article',
  twitterCard: 'summary_large_image',
  twitterTitle: computed(() => article.value?.title || ''),
  twitterDescription: computed(() => article.value?.excerpt || ''),
  twitterImage: computed(() => article.value?.image || '')
})

// Schema.org JSON-LD (somente se artigo existe)
if (article.value) {
  const articleSchema = useArticleSchema(article.value)
  const breadcrumbSchema = useBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Artigos', url: '/articles' },
    { name: article.value.title, url: `/articles/${article.value.slug}` }
  ])
  
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(articleSchema)
      },
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(breadcrumbSchema)
      }
    ]
  })
}
</script>

<template>
  <div id="article-page">
    <!-- 404 State -->
    <div v-if="!article" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div class="text-6xl mb-6">📄</div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-text-primary mb-4">Artigo não encontrado</h1>
      <p class="text-gray-500 dark:text-text-muted mb-8">O artigo que você procura não existe ou foi removido.</p>
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white dark:text-dark-bg font-semibold rounded-lg transition-all duration-200 press-effect"
      >
        <ArrowLeftIcon class="w-5 h-5" />
        Voltar para a home
      </NuxtLink>
    </div>

    <!-- Article Content -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Back Button -->
      <NuxtLink
        to="/"
        v-motion
        :initial="{ opacity: 0, x: -10 }"
        :enter="{ opacity: 1, x: 0 }"
        class="inline-flex items-center gap-2 text-gray-500 dark:text-text-muted hover:text-primary transition-colors mb-6"
      >
        <ArrowLeftIcon class="w-4 h-4" />
        Voltar para a home
      </NuxtLink>

      <!-- 2-Column Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <!-- Main Content Column (75%) -->
        <main class="lg:col-span-9">
          <!-- Header -->
          <ArticleHeader :article="article" />

          <!-- Body -->
          <div
            v-if="article.content"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 250 } }"
            class="mt-10"
          >
            <ArticleBody :content="article.content" />
          </div>

          <div
            v-if="article.tags && article.tags.length > 0"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }"
            class="mt-10 pt-8 border-t border-gray-200 dark:border-dark-border"
          >
            <h3 class="text-sm font-semibold text-gray-500 dark:text-text-muted uppercase tracking-wide mb-3">Tags</h3>
            <div class="flex flex-wrap gap-2">
              <NuxtLink
                v-for="tag in article.tags"
                :key="tag"
                :to="`/tags/${tag}`"
                class="px-3 py-1.5 bg-gray-100 dark:bg-dark-hover border border-gray-200 dark:border-dark-border text-gray-600 dark:text-text-secondary text-sm rounded-lg hover:border-primary/30 hover:text-primary transition-all duration-200"
              >
                #{{ tag }}
              </NuxtLink>
            </div>
          </div>

          <!-- Related Articles -->
          <RelatedArticles :articles="relatedArticles" />
        </main>

        <!-- Sidebar Column (25%) -->
        <aside class="lg:col-span-3">
          <div class="lg:sticky lg:top-32 space-y-6">
            <!-- Table of Contents -->
            <TableOfContents v-if="article.content" :content="article.content" />

            <!-- Author Card -->
            <AuthorCard :author="article.author" />

            <!-- Social Share -->
            <SocialShare
              :article-url="articleUrl"
              :article-title="article.title"
            />
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
