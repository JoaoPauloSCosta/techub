import type { Post } from '../../shared/types'

export function usePosts() {
    const supabase = useSupabaseClient()

    // Transform Supabase row to Post type
    const transformPost = (row: any): Post => ({
        id: row.id,
        slug: row.slug,
        title: row.title,
        excerpt: row.excerpt || '',
        content: row.content || '',
        image: row.image_url || 'https://placehold.co/800x450',
        category: row.tags?.[0] || 'Vibe Coding',
        date: row.created_at,
        readTime: 5, // Static for now, or calc based on word count
        author: {
            id: 'ai-1',
            name: 'TechHub Bot',
            avatar: 'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=TechHub',
            role: 'Automated Editor'
        },
        tags: row.tags || [],
        type: row.type === 'tutorial' ? 'tutorial' : 'article',
        featured: false, // Logic to be added if needed
        views: row.views || 0
    })

    const getLatestPosts = async (limit: number = 6): Promise<Post[]> => {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(limit)

        if (error) {
            console.error('Error fetching latest posts:', error)
            return []
        }
        return (data || []).map(transformPost)
    }

    const getAllPosts = async (): Promise<Post[]> => {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching all posts:', error)
            return []
        }
        return (data || []).map(transformPost)
    }

    const getPostBySlug = async (slug: string): Promise<Post | undefined> => {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('slug', slug)
            .single()

        if (error) console.error('Error fetching post by slug:', error)
        return data ? transformPost(data) : undefined
    }

    const getFeaturedPost = async (): Promise<Post | undefined> => {
        // For now, just taking the very last one as featured or a specific logic
        const { data } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(1)
            .single()

        return data ? transformPost(data) : undefined
    }

    const getRelatedPosts = async (currentSlug: string, limit: number = 3): Promise<Post[]> => {
        const currentPost = await getPostBySlug(currentSlug)
        if (!currentPost) return []

        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .neq('slug', currentSlug)
            .contains('tags', [currentPost.category]) // Approximate 'related' by matching category/tag
            .limit(limit)

        if (error) {
            console.error('Error fetching related posts:', error)
            return []
        }
        return (data || []).map(transformPost)
    }

    // Increment view counter for a post (calls Supabase RPC)
    const incrementViews = async (id: string): Promise<void> => {
        // Type assertion needed because custom RPC function isn't in generated Supabase types
        const { error } = await (supabase.rpc as any)('increment_view_count', {
            row_id: id,
            table_name: 'posts'
        })
        if (error) {
            console.error('Error incrementing post views:', error)
        }
    }

    // Get top posts ordered by views (for trending page)
    const getTopPosts = async (limit: number = 10): Promise<Post[]> => {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('views', { ascending: false, nullsFirst: false })
            .limit(limit)

        if (error) {
            console.error('Error fetching top posts:', error)
            return []
        }
        return (data || []).map(transformPost)
    }

    return {
        getLatestPosts,
        getAllPosts,
        getPostBySlug,
        getFeaturedPost,
        getRelatedPosts,
        incrementViews,
        getTopPosts
    }
}
