import type { TrendingTopic } from '~/shared/types'

// TODO: Replace mock data with useFetch() API calls

const mockTrending: TrendingTopic[] = [
    {
        id: 't1',
        title: 'Nuxt 4 Release',
        views: 45200,
        category: 'Nuxt'
    },
    {
        id: 't2',
        title: 'GPT-5 para Developers',
        views: 38700,
        category: 'IA'
    },
    {
        id: 't3',
        title: 'Vue 3.5 Performance',
        views: 28400,
        category: 'Vue.js'
    },
    {
        id: 't4',
        title: 'Vagas Remotas Brasil',
        views: 22100,
        category: 'Vagas'
    },
    {
        id: 't5',
        title: 'Laravel 12 Preview',
        views: 19800,
        category: 'PHP'
    }
]

/**
 * Composable for fetching trending topics
 */
export function useTrending() {
    /**
     * Get trending topics
     */
    const getTrending = (limit: number = 5): TrendingTopic[] => {
        return mockTrending.slice(0, limit)
    }

    return {
        getTrending
    }
}
