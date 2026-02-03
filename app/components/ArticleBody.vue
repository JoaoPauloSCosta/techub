<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import { computed } from 'vue'

interface Props {
  content: string
}

const props = defineProps<Props>()

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

const renderedContent = computed(() => md.render(props.content || ''))
</script>

<template>
  <article
    id="article-body"
    class="article-content prose prose-lg prose-slate dark:prose-invert max-w-none 
    prose-headings:font-bold prose-headings:scroll-mt-32
    prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-dark-border 
    prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary-light 
    prose-img:rounded-lg prose-img:border prose-img:border-gray-200 dark:prose-img:border-dark-border 
    prose-pre:bg-gray-900 prose-pre:border prose-pre:border-dark-border
    prose-code:text-primary prose-code:bg-gray-100 dark:prose-code:bg-[#1a1a1a] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:border prose-code:border-gray-200 dark:prose-code:border-[#2a2a2a] prose-code:font-mono prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-['']
    prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-[#0f0f0f] prose-blockquote:not-italic prose-blockquote:py-5 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:my-8"
    v-html="renderedContent"
  />
</template>

<style scoped>
/* No custom styles needed if using full Tailwind Typography */
</style>
