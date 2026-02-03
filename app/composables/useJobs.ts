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
        level: 'Senior',
        tags: ['Vue.js', 'TypeScript', 'Nuxt'],
        date: new Date().toISOString(), // Fresh
        url: '#'
    },
    {
        id: 'j2',
        title: 'Full Stack Developer (PHP + Vue)',
        company: 'StartupAI',
        location: 'Rio de Janeiro, RJ',
        salary: 'R$ 12.000 - 18.000',
        type: 'hybrid',
        level: 'Pleno',
        tags: ['PHP', 'Laravel', 'Vue.js', 'Backend'],
        date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        url: '#'
    },
    {
        id: 'j3',
        title: 'Frontend Engineer - Vue.js',
        company: 'FinTech Global',
        location: 'Remoto (Global)',
        salary: 'USD 5.000 - 8.000',
        type: 'remote',
        level: 'Pleno',
        tags: ['Vue.js', 'React', 'TypeScript'],
        date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        url: '#'
    },
    {
        id: 'j4',
        title: 'PHP Backend Developer',
        company: 'E-commerce BR',
        location: 'Curitiba, PR',
        salary: 'R$ 10.000 - 15.000',
        type: 'onsite',
        level: 'Pleno',
        tags: ['PHP', 'MySQL', 'Docker', 'Backend'],
        date: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
        url: '#'
    },
    {
        id: 'j5',
        title: 'Nuxt.js Developer - AI Products',
        company: 'DeepTech Labs',
        location: 'Remoto (Brasil)',
        salary: 'R$ 20.000 - 30.000',
        type: 'remote',
        level: 'Senior',
        tags: ['Nuxt', 'AI', 'Python', 'AI Engineer', 'IA'],
        date: new Date().toISOString(), // Fresh
        url: '#'
    },
    {
        id: 'j6',
        title: 'Vue.js + Laravel Developer',
        company: 'AgriTech Solutions',
        location: 'Campinas, SP',
        salary: 'R$ 14.000 - 20.000',
        type: 'hybrid',
        level: 'Senior',
        tags: ['Vue.js', 'Laravel', 'API', 'Backend'],
        date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        url: '#'
    },
    {
        id: 'j7',
        title: 'Junior Node.js Developer',
        company: 'WebServices Ltda',
        location: 'São Paulo, SP',
        salary: 'R$ 4.000 - 6.000',
        type: 'onsite',
        level: 'Junior',
        tags: ['Node.js', 'JavaScript', 'Express', 'Backend'],
        date: new Date(Date.now() - 86400000).toISOString(),
        url: '#'
    },
    {
        id: 'j8',
        title: 'QA Automation Engineer',
        company: 'QualitySoft',
        location: 'Remoto',
        salary: 'R$ 8.000 - 12.000',
        type: 'remote',
        level: 'Pleno',
        tags: ['Automation', 'Cypress', 'Playwright', 'Node.js'],
        date: new Date(Date.now() - 604800000).toISOString(), // 7 days ago
        url: '#'
    },
    {
        id: 'j9',
        title: 'AI Researcher Intern',
        company: 'OpenMinds',
        location: 'Belo Horizonte',
        salary: 'R$ 2.500',
        type: 'hybrid',
        level: 'Junior',
        tags: ['AI', 'Python', 'TensorFlow', 'IA / Automação', 'Automação'],
        date: new Date(Date.now() - 10000000).toISOString(),
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
