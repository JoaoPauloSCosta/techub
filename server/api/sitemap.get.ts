// Sitemap dinâmico para TechHub
// Gera automaticamente URLs de artigos, vídeos e vagas

// Tipos para URLs do sitemap
interface SitemapUrl {
    loc: string
    changefreq: string
    priority: number
    lastmod?: string
}

export default defineEventHandler(async (event) => {
    // Base URL - ajuste conforme seu domínio em produção
    const baseUrl = process.env.NODE_ENV === 'production'
        ? 'https://techhub.com.br'
        : 'http://localhost:3000'

    // Páginas estáticas
    const staticPages: SitemapUrl[] = [
        { loc: '/', changefreq: 'daily', priority: 1.0 },
        { loc: '/about', changefreq: 'monthly', priority: 0.8 },
        { loc: '/articles', changefreq: 'daily', priority: 0.9 },
        { loc: '/videos', changefreq: 'weekly', priority: 0.8 },
        { loc: '/jobs', changefreq: 'daily', priority: 0.9 },
        { loc: '/trending', changefreq: 'hourly', priority: 0.8 },
    ]

    // TODO: Buscar conteúdo dinâmico do Supabase quando disponível
    // Descomentar as linhas abaixo quando o Supabase estiver configurado
    /*
    import { serverSupabaseClient } from '#supabase/server'
    const supabase = await serverSupabaseClient(event)
    
    const { data: articles } = await supabase
      .from('posts')
      .select('slug, updated_at, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false })
    
    const { data: videos } = await supabase
      .from('videos')
      .select('id, updated_at, created_at')
      .order('created_at', { ascending: false })
    
    const { data: jobs } = await supabase
      .from('jobs')
      .select('id, updated_at, created_at')
      .order('created_at', { ascending: false })
    */

    // URLs dinâmicas (incluir quando tiver dados do Supabase)
    const dynamicUrls: SitemapUrl[] = [
        // ...articles.map(post => ({
        //   loc: `/articles/${post.slug}`,
        //   lastmod: post.updated_at || post.created_at,
        //   changefreq: 'weekly',
        //   priority: 0.7
        // })),
    ]

    // Combinar todas as URLs
    const allUrls: SitemapUrl[] = [...staticPages, ...dynamicUrls]

    // Gerar XML do sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${allUrls.map(url => `  <url>
    <loc>${baseUrl}${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${new Date(url.lastmod).toISOString()}</lastmod>` : ''}
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`

    // Retornar XML
    event.node.res.setHeader('Content-Type', 'application/xml')
    return sitemap
})
