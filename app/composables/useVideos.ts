import type { Video } from '../../shared/types'

export function useVideos() {
    const supabase = useSupabaseClient()

    // Transform Supabase row to Video type
    const transformVideo = (row: any): Video => ({
        id: row.id,
        title: row.title,
        thumbnail: row.thumbnail || 'https://placehold.co/800x450',
        channel: row.channel,
        duration: row.duration || '10:00',
        views: row.views || 0,
        date: row.published_at,
        tags: row.tags || [],
        url: row.url
    })

    const getVideos = async (limit: number = 4): Promise<Video[]> => {
        const { data, error } = await supabase
            .from('videos')
            .select('*')
            .order('published_at', { ascending: false })
            .limit(limit)

        if (error) {
            console.error('Error fetching videos:', error)
            return []
        }
        return (data || []).map(transformVideo)
    }

    const getAllVideos = async (): Promise<Video[]> => {
        const { data, error } = await supabase
            .from('videos')
            .select('*')
            .order('published_at', { ascending: false })

        if (error) {
            console.error('Error fetching all videos:', error)
            return []
        }
        return (data || []).map(transformVideo)
    }

    const getVideosByTag = async (tag: string): Promise<Video[]> => {
        const { data, error } = await supabase
            .from('videos')
            .select('*')
            .contains('tags', [tag])
            .order('published_at', { ascending: false })

        if (error) {
            console.error('Error fetching videos by tag:', error)
            return []
        }
        return (data || []).map(transformVideo)
    }

    const getVideoById = async (id: string): Promise<Video | undefined> => {
        const { data, error } = await supabase
            .from('videos')
            .select('*')
            .eq('id', id)
            .single()

        if (error) return undefined
        return transformVideo(data)
    }

    return {
        getVideos,
        getAllVideos,
        getVideosByTag,
        getVideoById
    }
}

