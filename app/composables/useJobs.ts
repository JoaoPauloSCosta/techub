import type { Job } from '../../shared/types'

// TODO: Replace mock data with useFetch() API calls

const mockJobs: Job[] = [
    {
        id: 'j1',
        title: 'Senior Vue.js Developer',
        company: 'TechCorp Brasil',
        companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
        location: 'São Paulo, SP',
        salary: 'R$ 18.000 - 25.000',
        type: 'remote',
        tags: ['Vue.js', 'TypeScript', 'Nuxt'],
        date: '2026-01-29T10:00:00Z',
        url: '#'
    },
    {
        id: 'j2',
        title: 'Full Stack Developer (PHP + Vue)',
        company: 'StartupAI',
        location: 'Rio de Janeiro, RJ',
        salary: 'R$ 12.000 - 18.000',
        type: 'hybrid',
        tags: ['PHP', 'Laravel', 'Vue.js'],
        date: '2026-01-28T14:00:00Z',
        url: '#'
    },
    {
        id: 'j3',
        title: 'Frontend Engineer - Vue.js',
        company: 'FinTech Global',
        location: 'Remoto (Global)',
        salary: 'USD 5.000 - 8.000',
        type: 'remote',
        tags: ['Vue.js', 'React', 'TypeScript'],
        date: '2026-01-27T09:00:00Z',
        url: '#'
    },
    {
        id: 'j4',
        title: 'PHP Backend Developer',
        company: 'E-commerce BR',
        location: 'Curitiba, PR',
        salary: 'R$ 10.000 - 15.000',
        type: 'onsite',
        tags: ['PHP', 'MySQL', 'Docker'],
        date: '2026-01-26T11:30:00Z',
        url: '#'
    },
    {
        id: 'j5',
        title: 'Nuxt.js Developer - AI Products',
        company: 'DeepTech Labs',
        location: 'Remoto (Brasil)',
        salary: 'R$ 20.000 - 30.000',
        type: 'remote',
        tags: ['Nuxt', 'AI', 'Python'],
        date: '2026-01-25T16:00:00Z',
        url: '#'
    },
    {
        id: 'j6',
        title: 'Vue.js + Laravel Developer',
        company: 'AgriTech Solutions',
        location: 'Campinas, SP',
        salary: 'R$ 14.000 - 20.000',
        type: 'hybrid',
        tags: ['Vue.js', 'Laravel', 'API'],
        date: '2026-01-24T13:00:00Z',
        url: '#'
    }
]

/**
 * Composable for fetching and managing jobs
 */
export function useJobs() {
    /**
     * Get jobs with optional limit
     */
    const getJobs = (limit: number = 5): Job[] => {
        return mockJobs.slice(0, limit)
    }

    /**
     * Get all jobs
     */
    const getAllJobs = (): Job[] => {
        return mockJobs
    }

    /**
     * Filter jobs by tag
     */
    const filterByTag = (tag: string): Job[] => {
        if (tag === 'all') return mockJobs
        if (tag === 'remote') {
            return mockJobs.filter(job => job.type === 'remote')
        }
        return mockJobs.filter(job =>
            job.tags.some((t: string) => t.toLowerCase().includes(tag.toLowerCase()))
        )
    }

    /**
     * Get remote jobs only
     */
    const getRemoteJobs = (): Job[] => {
        return mockJobs.filter(job => job.type === 'remote')
    }

    /**
     * Get job by ID
     */
    const getJobById = (id: string): Job | undefined => {
        return mockJobs.find(job => job.id === id)
    }

    return {
        getJobs,
        getAllJobs,
        filterByTag,
        getRemoteJobs,
        getJobById
    }
}
