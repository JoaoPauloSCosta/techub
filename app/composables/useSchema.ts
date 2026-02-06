// Schema.org JSON-LD Composables
// Gera estruturas de dados estruturados para SEO

/**
 * Gera Schema.org Organization para o TechHub
 */
export function useOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'TechHub Brasil',
        alternateName: 'TechHub',
        url: 'https://techhub.com.br',
        logo: 'https://techhub.com.br/logo.png',
        description: 'Portal de curadoria técnica focado em Vue.js, Nuxt, IA e Desenvolvimento Moderno. Feito de programador para programador.',
        sameAs: [
            'https://github.com/JoaoPauloSCosta',
            'https://linkedin.com/company/techhub-brasil'
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Support',
            availableLanguage: ['pt-BR']
        },
        areaServed: {
            '@type': 'Country',
            name: 'Brasil'
        },
        founder: {
            '@type': 'Person',
            name: 'João Paulo Costa',
            jobTitle: 'Fundador e Desenvolvedor'
        }
    }
}

/**
 * Gera Schema.org Article para posts/artigos
 */
export function useArticleSchema(article: any) {
    const config = useRuntimeConfig()
    const baseUrl = 'https://techhub.com.br'

    return {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: article.title,
        description: article.excerpt,
        image: article.image || `${baseUrl}/default-og-image.png`,
        datePublished: article.created_at,
        dateModified: article.updated_at || article.created_at,
        author: {
            '@type': 'Person',
            name: article.author?.name || 'TechHub Editorial',
            url: article.author?.url || baseUrl
        },
        publisher: {
            '@type': 'Organization',
            name: 'TechHub Brasil',
            logo: {
                '@type': 'ImageObject',
                url: `${baseUrl}/logo.png`
            }
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${baseUrl}/articles/${article.slug}`
        },
        keywords: article.tags?.join(', ') || '',
        articleSection: article.category || 'Tecnologia',
        inLanguage: 'pt-BR'
    }
}

/**
 * Gera Schema.org BreadcrumbList para navegação
 */
export function useBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
    const baseUrl = 'https://techhub.com.br'

    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${baseUrl}${item.url}`
        }))
    }
}

/**
 * Gera Schema.org VideoObject para vídeos
 */
export function useVideoSchema(video: any) {
    const baseUrl = 'https://techhub.com.br'

    return {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: video.title,
        description: video.description || video.title,
        thumbnailUrl: video.thumbnail || `${baseUrl}/default-video-thumb.png`,
        uploadDate: video.created_at,
        duration: video.duration || 'PT0M0S', // Formato ISO 8601: PT5M30S = 5min 30s
        contentUrl: video.url,
        embedUrl: video.embedUrl || video.url,
        publisher: {
            '@type': 'Organization',
            name: 'TechHub Brasil',
            logo: {
                '@type': 'ImageObject',
                url: `${baseUrl}/logo.png`
            }
        },
        author: {
            '@type': 'Person',
            name: video.author?.name || 'TechHub Editorial'
        },
        inLanguage: 'pt-BR'
    }
}

/**
 * Gera Schema.org JobPosting para vagas
 */
export function useJobPostingSchema(job: any) {
    const baseUrl = 'https://techhub.com.br'

    return {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: job.title,
        description: job.description,
        datePosted: job.created_at,
        validThrough: job.expires_at || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 dias se não especificado
        employmentType: job.employment_type || 'FULL_TIME', // FULL_TIME, PART_TIME, CONTRACTOR, etc
        hiringOrganization: {
            '@type': 'Organization',
            name: job.company || 'TechHub Brasil',
            sameAs: job.company_url || baseUrl,
            logo: job.company_logo || `${baseUrl}/logo.png`
        },
        jobLocation: job.location === 'Remote' || job.remote ? {
            '@type': 'Place',
            address: {
                '@type': 'PostalAddress',
                addressCountry: 'BR',
                addressLocality: 'Remoto'
            }
        } : {
            '@type': 'Place',
            address: {
                '@type': 'PostalAddress',
                streetAddress: job.address || '',
                addressLocality: job.city || 'São Paulo',
                addressRegion: job.state || 'SP',
                postalCode: job.postal_code || '',
                addressCountry: 'BR'
            }
        },
        baseSalary: job.salary ? {
            '@type': 'MonetaryAmount',
            currency: 'BRL',
            value: {
                '@type': 'QuantitativeValue',
                value: job.salary,
                unitText: job.salary_period || 'MONTH'
            }
        } : undefined,
        workRemote: job.remote || job.location === 'Remote',
        jobLocationType: job.remote ? 'TELECOMMUTE' : undefined,
        applicantLocationRequirements: {
            '@type': 'Country',
            name: 'Brasil'
        },
        url: `${baseUrl}/jobs/${job.id}`
    }
}

/**
 * Gera Schema.org WebSite para busca
 */
export function useWebSiteSchema() {
    const baseUrl = 'https://techhub.com.br'

    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'TechHub Brasil',
        url: baseUrl,
        description: 'O Santuário de Foco para Desenvolvedores Vue.js e Nuxt',
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${baseUrl}/articles?q={search_term_string}`
            },
            'query-input': 'required name=search_term_string'
        },
        inLanguage: 'pt-BR'
    }
}
