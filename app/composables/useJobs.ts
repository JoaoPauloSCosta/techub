import type { Job } from '../../shared/types'

export function useJobs() {
    const supabase = useSupabaseClient()

    // Transform Supabase row to Job type
    const transformJob = (row: any): Job => ({
        id: row.id,
        title: row.title,
        company: row.company,
        companyLogo: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(row.company), // Fallback logo
        location: row.location,
        salary: row.salary || 'A combinar',
        type: 'remote', // Defaulting to remote for tech jobs usually, or derive from tags if possible
        level: 'Pleno', // Default
        tags: row.tags || [],
        date: row.created_at,
        url: row.apply_url
    })

    const getAllJobs = async (): Promise<Job[]> => {
        const { data, error } = await supabase
            .from('jobs')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(20)

        if (error) {
            console.error('Error fetching jobs:', error)
            return []
        }
        return (data || []).map(transformJob)
    }

    const getJobs = async (limit: number = 5): Promise<Job[]> => {
        const { data, error } = await supabase
            .from('jobs')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(limit)

        if (error) {
            console.error('Error fetching latest jobs:', error)
            return []
        }
        return (data || []).map(transformJob)
    }

    const filterByTag = async (tag: string): Promise<Job[]> => {
        let query = supabase.from('jobs').select('*').order('created_at', { ascending: false })

        if (tag !== 'all') {
            if (tag === 'remote') {
                // If we had a type column, we'd use .eq('type', 'remote'). 
                // For now, looking for 'remote' in location or tags
                query = query.or(`location.ilike.%remote%,tags.cs.{"remote"}`)
            } else {
                query = query.contains('tags', [tag])
            }
        }

        const { data, error } = await query
        if (error) {
            console.error('Error filtering jobs:', error)
            return []
        }
        return (data || []).map(transformJob)
    }

    const getRemoteJobs = async (): Promise<Job[]> => {
        // Logic to find remote jobs
        const { data, error } = await supabase
            .from('jobs')
            .select('*')
            .or(`location.ilike.%remote%,tags.cs.{"remote"}`)
            .order('created_at', { ascending: false })

        if (error) return []
        return (data || []).map(transformJob)
    }

    const getJobById = async (id: string): Promise<Job | undefined> => {
        const { data, error } = await supabase
            .from('jobs')
            .select('*')
            .eq('id', id)
            .single()

        if (error) return undefined
        return transformJob(data)
    }

    return {
        getAllJobs,
        getJobs,
        filterByTag,
        getRemoteJobs,
        getJobById
    }
}

