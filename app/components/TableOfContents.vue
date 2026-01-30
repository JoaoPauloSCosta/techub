<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ListBulletIcon } from '@heroicons/vue/24/outline'

interface Props {
  content: string
}

interface TocItem {
  id: string
  text: string
}

const props = defineProps<Props>()

const activeId = ref<string>('')

// Extract h2 headings from HTML content
const tocItems = computed<TocItem[]>(() => {
  const regex = /<h2[^>]*id="([^"]*)"[^>]*>([^<]*)<\/h2>/gi
  const items: TocItem[] = []
  let match: RegExpExecArray | null

  while ((match = regex.exec(props.content)) !== null) {
    const id = match[1]
    const text = match[2]
    if (id && text) {
      items.push({ id, text })
    }
  }

  return items
})

// Scroll spy functionality
const handleScroll = (): void => {
  const headings = tocItems.value
    .map(item => document.getElementById(item.id))
    .filter((el): el is HTMLElement => el !== null)

  if (headings.length === 0) return

  const scrollPosition = window.scrollY + 150

  for (let i = headings.length - 1; i >= 0; i--) {
    const heading = headings[i]
    if (heading && heading.offsetTop <= scrollPosition) {
      activeId.value = heading.id
      return
    }
  }

  const firstHeading = headings[0]
  if (firstHeading) {
    activeId.value = firstHeading.id
  }
}

const scrollToHeading = (id: string): void => {
  const element = document.getElementById(id)
  if (element) {
    const offset = 120
    const elementPosition = element.getBoundingClientRect().top + window.scrollY
    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth'
    })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav
    v-if="tocItems.length > 0"
    id="table-of-contents"
    class="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg p-5"
  >
    <div class="flex items-center gap-2 mb-4">
      <ListBulletIcon class="w-5 h-5 text-primary" />
      <h3 class="text-lg font-bold text-gray-900 dark:text-text-primary">Índice</h3>
    </div>

    <ul class="space-y-2">
      <li v-for="item in tocItems" :key="item.id">
        <button
          type="button"
          :class="[
            'w-full text-left text-sm py-2 px-3 rounded-lg transition-all duration-200',
            activeId === item.id
              ? 'bg-primary/10 text-primary border-l-2 border-primary'
              : 'text-gray-500 dark:text-text-muted hover:text-gray-900 dark:hover:text-text-secondary hover:bg-gray-100 dark:hover:bg-dark-hover'
          ]"
          @click="scrollToHeading(item.id)"
        >
          {{ item.text }}
        </button>
      </li>
    </ul>
  </nav>
</template>
