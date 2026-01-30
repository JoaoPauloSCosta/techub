import type { Video } from '~/shared/types'

// TODO: Replace mock data with useFetch() API calls

const mockVideos: Video[] = [
    {
        id: 'v1',
        title: 'Nuxt 4 Migration Guide - Passo a passo completo',
        thumbnail: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=450&fit=crop',
        channel: 'TechHub Official',
        duration: '24:35',
        views: 15420,
        date: '2026-01-28T10:00:00Z',
        tags: ['Nuxt', 'Vue', 'Tutorial']
    },
    {
        id: 'v2',
        title: 'Criando apps com IA: Copilot + Vue.js na prática',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
        channel: 'Code with AI',
        duration: '18:22',
        views: 8930,
        date: '2026-01-26T14:00:00Z',
        tags: ['IA', 'Copilot', 'Vue']
    },
    {
        id: 'v3',
        title: 'Vue 3 Composition API: Dicas avançadas que você não conhecia',
        thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=450&fit=crop',
        channel: 'Vue Mastery BR',
        duration: '32:10',
        views: 22150,
        date: '2026-01-24T09:30:00Z',
        tags: ['Vue', 'Composition API', 'Avançado']
    },
    {
        id: 'v4',
        title: 'PHP + Laravel em 2026: Ainda vale a pena?',
        thumbnail: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=800&h=450&fit=crop',
        channel: 'Dev Backend BR',
        duration: '15:48',
        views: 12840,
        date: '2026-01-22T16:00:00Z',
        tags: ['PHP', 'Laravel', 'Backend']
    },
    {
        id: 'v5',
        title: 'Entrevista: Como consegui uma vaga remota como Vue Dev',
        thumbnail: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=450&fit=crop',
        channel: 'Carreiras Tech',
        duration: '42:15',
        views: 35670,
        date: '2026-01-20T11:00:00Z',
        tags: ['Carreira', 'Remoto', 'Entrevista']
    }
]

/**
 * Composable for fetching and managing videos
 */
export function useVideos() {
    /**
     * Get videos with optional limit
     */
    const getVideos = (limit: number = 4): Video[] => {
        return mockVideos.slice(0, limit)
    }

    /**
     * Get all videos
     */
    const getAllVideos = (): Video[] => {
        return mockVideos
    }

    /**
     * Get videos by tag
     */
    const getVideosByTag = (tag: string): Video[] => {
        return mockVideos.filter(video =>
            video.tags.some(t => t.toLowerCase() === tag.toLowerCase())
        )
    }

    return {
        getVideos,
        getAllVideos,
        getVideosByTag
    }
}
