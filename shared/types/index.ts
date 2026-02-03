// Shared TypeScript interfaces for TechHub

export interface Author {
    id: string
    name: string
    avatar: string
    role?: string
}

export interface Post {
    id: string
    slug: string
    title: string
    excerpt: string
    content?: string
    image: string
    category: string
    date: string
    readTime: number
    author: Author
    type?: 'article' | 'tutorial'
    difficulty?: 'Iniciante' | 'Intermediário' | 'Avançado'
    tags?: string[]
    featured?: boolean
}

export interface Video {
    id: string
    title: string
    thumbnail: string
    channel: string
    duration: string
    views?: number
    date: string
    tags: string[]
    url?: string
}

export interface Job {
    id: string
    title: string
    company: string
    companyLogo?: string
    location: string
    salary?: string
    type: 'remote' | 'hybrid' | 'onsite'
    level?: 'Junior' | 'Pleno' | 'Senior' | string
    tags: string[]
    date: string
    url?: string
}

export interface TrendingTopic {
    id: string
    title: string
    views: number
    category?: string
}

export interface Category {
    id: string
    name: string
    slug: string
    icon?: string
}

export interface QuickTag {
    id: string
    label: string
    icon: string
    count?: number
}
