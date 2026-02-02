import type { Post } from '../../shared/types'

// Mock article HTML content
const articleContent = `
<p>O Nuxt 4 chegou trazendo uma série de melhorias significativas que prometem revolucionar a forma como desenvolvemos aplicações Vue.js. Neste artigo, vamos explorar as principais mudanças e como você pode migrar seus projetos existentes.</p>

<h2 id="nova-estrutura-de-pastas">Nova Estrutura de Pastas</h2>

<p>Uma das mudanças mais visíveis é a nova organização de diretórios. O Nuxt 4 introduz o conceito de <strong>app/</strong> como diretório raiz para código da aplicação:</p>

<pre><code class="language-bash">app/
├── components/
├── composables/
├── layouts/
├── pages/
└── app.vue</code></pre>

<p>Esta mudança permite uma separação mais clara entre código da aplicação e configurações do projeto, facilitando a manutenção em projetos grandes.</p>

<h2 id="melhorias-de-performance">Melhorias de Performance</h2>

<p>O Nuxt 4 traz otimizações significativas no tempo de build e hydration:</p>

<ul>
<li><strong>Build 40% mais rápido</strong> em projetos de médio porte</li>
<li><strong>Hydration parcial</strong> para componentes que não precisam de interatividade</li>
<li><strong>Lazy loading inteligente</strong> de chunks baseado em padrões de navegação</li>
</ul>

<blockquote>
<p>"O Nuxt 4 representa um salto significativo em termos de developer experience e performance. Estamos muito animados com o feedback da comunidade." — Evan You</p>
</blockquote>

<h2 id="compatibilidade-vue-35">Compatibilidade com Vue 3.5</h2>

<p>O framework agora suporta totalmente o Vue 3.5, incluindo as novas features:</p>

<pre><code class="language-typescript">// Novo defineModel com opções
const modelValue = defineModel('value', {
  type: String,
  default: '',
  required: true
})

// Reactive Props Destructure
const { count = 0 } = defineProps<{
  count?: number
}>()</code></pre>

<h2 id="migracao-de-projetos">Migração de Projetos Existentes</h2>

<p>A equipe do Nuxt disponibilizou uma ferramenta CLI para auxiliar na migração:</p>

<pre><code class="language-bash">npx nuxi upgrade --force</code></pre>

<p>Além disso, um <a href="/docs/migration">guia completo de migração</a> está disponível na documentação oficial com todas as breaking changes e suas soluções.</p>

<h2 id="conclusao">Conclusão</h2>

<p>O Nuxt 4 é uma evolução natural do framework que mantém a filosofia de simplicidade enquanto adiciona poder e flexibilidade. Se você ainda não migrou, agora é a hora de começar a planejar sua atualização.</p>
`

// Mock posts with slug and content
const mockPosts: Post[] = [
    {
        id: '1',
        slug: 'nuxt-4-tudo-que-voce-precisa-saber',
        title: 'Nuxt 4 está aqui: Tudo que você precisa saber sobre o novo release',
        excerpt: 'Explore as principais mudanças do Nuxt 4, incluindo a nova estrutura de pastas, melhorias de performance e compatibilidade com Vue 3.5.',
        content: articleContent,
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop',
        category: 'Nuxt',
        date: '2026-01-28T10:00:00Z',
        readTime: 8,
        author: {
            id: 'a1',
            name: 'Maria Silva',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
            role: 'Editor Principal'
        },
        tags: ['nuxt', 'vue', 'javascript'],
        featured: true
    },
    {
        id: '2',
        slug: 'ia-revolucionando-desenvolvimento-vue',
        title: 'Como a IA está revolucionando o desenvolvimento Vue.js',
        excerpt: 'Descubra ferramentas de IA como Copilot, Cursor e Claude que estão transformando a forma como escrevemos código Vue.',
        content: articleContent,
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
        category: 'IA Dev',
        date: '2026-01-27T14:30:00Z',
        readTime: 6,
        author: {
            id: 'a2',
            name: 'Carlos Mendes',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
        },
        tags: ['ia', 'vue', 'produtividade']
    },
    {
        id: '3',
        slug: 'vue-35-performance-benchmarks',
        title: 'Vue 3.5 Performance: Benchmarks e otimizações reais',
        excerpt: 'Análise detalhada das melhorias de performance do Vue 3.5 com benchmarks em projetos reais.',
        content: articleContent,
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
        category: 'Vue.js',
        date: '2026-01-26T09:15:00Z',
        readTime: 10,
        author: {
            id: 'a3',
            name: 'Ana Costa',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
        },
        tags: ['vue', 'performance', 'benchmark']
    },
    {
        id: '4',
        slug: 'openai-gpt-5-desenvolvedores',
        title: 'OpenAI lança GPT-5: O que muda para desenvolvedores',
        excerpt: 'Nova versão do modelo promete capacidades avançadas de codificação e melhor entendimento de contexto.',
        content: articleContent,
        image: 'https://images.unsplash.com/photo-1679083216051-aa510a1a2c0e?w=800&h=450&fit=crop',
        category: 'IA News',
        date: '2026-01-25T16:45:00Z',
        readTime: 5,
        author: {
            id: 'a1',
            name: 'Maria Silva',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
        },
        tags: ['openai', 'gpt', 'ia']
    },
    {
        id: '5',
        slug: 'apis-nitro-guia-iniciantes',
        title: 'Construindo APIs com Nitro: Guia completo para iniciantes',
        excerpt: 'Aprenda a criar APIs robustas e escaláveis usando o Nitro, o servidor embutido do Nuxt.',
        content: articleContent,
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop',
        category: 'Tutoriais',
        date: '2026-01-24T11:00:00Z',
        readTime: 12,
        author: {
            id: 'a2',
            name: 'Carlos Mendes',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
        },
        tags: ['nitro', 'api', 'nuxt']
    },
    {
        id: '6',
        slug: 'php-9-novidades-breaking-changes',
        title: 'PHP 9 está chegando: Novidades e breaking changes',
        excerpt: 'Preview das principais features do PHP 9 e o que você precisa preparar no seu código.',
        content: articleContent,
        image: 'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=800&h=450&fit=crop',
        category: 'PHP',
        date: '2026-01-23T13:20:00Z',
        readTime: 7,
        author: {
            id: 'a3',
            name: 'Ana Costa',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
        },
        tags: ['php', 'backend', 'update']
    }
]

/**
 * Composable for fetching and managing posts
 */
export function usePosts() {
    /**
     * Get the featured post (most recent with featured flag)
     */
    const getFeaturedPost = (): Post | undefined => {
        return mockPosts.find(post => post.featured) || mockPosts[0]
    }

    /**
     * Get latest posts excluding the featured one
     */
    const getLatestPosts = (limit: number = 6): Post[] => {
        const featured = getFeaturedPost()
        return mockPosts
            .filter(post => post.id !== featured?.id)
            .slice(0, limit)
    }

    /**
     * Get posts by category
     */
    const getPostsByCategory = (category: string): Post[] => {
        if (category === 'all') return mockPosts
        return mockPosts.filter(
            post => post.category.toLowerCase() === category.toLowerCase()
        )
    }

    /**
     * Get all posts
     */
    const getAllPosts = (): Post[] => {
        return mockPosts
    }

    /**
     * Get post by slug
     */
    const getPostBySlug = (slug: string): Post | undefined => {
        return mockPosts.find(post => post.slug === slug)
    }

    /**
     * Get related posts (same category, excluding current)
     */
    const getRelatedPosts = (currentSlug: string, limit: number = 3): Post[] => {
        const currentPost = getPostBySlug(currentSlug)
        if (!currentPost) return []

        return mockPosts
            .filter(post => post.slug !== currentSlug && post.category === currentPost.category)
            .slice(0, limit)
    }

    return {
        getFeaturedPost,
        getLatestPosts,
        getPostsByCategory,
        getAllPosts,
        getPostBySlug,
        getRelatedPosts
    }
}
