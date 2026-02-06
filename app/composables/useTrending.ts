import type { TrendingTopic } from '../../shared/types'

/**
 * Composable for fetching real trending topics from Supabase
 * Queries the 'posts' table ordered by views (descending)
 */
export function useTrending() {
    const supabase = useSupabaseClient()

    /**
     * Fetch trending topics from Supabase (real data)
     * @param limit - Maximum number of topics to return (default: 5)
     */
    const fetchTrending = async (limit: number = 5): Promise<TrendingTopic[]> => {
        const { data, error } = await supabase
            .from('posts')
            .select('id, title, slug, views, type')
            .order('views', { ascending: false, nullsFirst: false })
            .limit(limit)

        if (error) {
            console.error('Error fetching trending topics:', error)
            return []
        }

        // Transform Supabase rows to TrendingTopic format
        return (data || []).map((row: any) => ({
            id: row.id,
            title: row.title,
            views: row.views || 0,
            category: row.type === 'tutorial' ? 'Tutorial' : 'Artigo',
            slug: row.slug
        }))
    }

    return {
        fetchTrending
    }
}
