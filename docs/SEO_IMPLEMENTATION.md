# SEO Implementation Guide - TechHub Brasil

## 📋 Visão Geral

Esta implementação inclui:
- ✅ **robots.txt** atualizado
- ✅ **Sitemap.xml dinâmico** (via API /api/sitemap.xml.get)
- ✅ **Schema.org JSON-LD** para melhorar Rich Snippets
- ✅ **Meta tags otimizadas** focadas no Brasil (pt-BR)
- ✅ **Open Graph e Twitter Cards** configurados

---

## 🤖 1. Robots.txt

Localização: `public/robots.txt`

### Configuração
- **Permite** indexação de todo o site
- **Bloqueia** páginas: `/contact`, `/terms`, `/privacy`
- **Aponta** para sitemap: `https://techhub.com.br/sitemap.xml`

---

## 🗺️ 2. Sitemap Dinâmico

Localização: `server/api/sitemap.xml.get.ts`

### Como Funciona
- Gera automaticamente URLs de:
  - Páginas estáticas (Home, About, Articles, Videos, Jobs, Trending)
  - Artigos do Supabase (tabela `posts`)
  - Vídeos do Supabase (tabela `videos`)
  - Vagas do Supabase (tabela `jobs`)

### Acessar
```
https://techhub.com.br/sitemap.xml
```

### Atualização
O sitemap é gerado **em tempo real** a cada requisição, sempre refletindo o conteúdo mais recente do banco de dados.

---

## 📊 3. Schema.org JSON-LD

Localização: `app/composables/useSchema.ts`

### Schemas Implementados

#### 3.1. Organization Schema
**Onde:** Home (`/`)  
**Propósito:** Identifica o TechHub como organização  
**Benefícios:**
- Logo na busca Google
- Informações de contato
- Links para redes sociais

#### 3.2. WebSite Schema
**Onde:** Home (`/`)  
**Propósito:** Define o site e ativa a busca  
**Benefícios:**
- Barra de pesquisa nos resultados do Google
- Identificação clara do site

#### 3.3. Article/NewsArticle Schema
**Onde:** `/articles/[slug]`  
**Propósito:** Rich Snippets para artigos  
**Benefícios:**
- Imagem destacada nos resultados
- Data de publicação visível
- Autor e publisher identificados
- Categorias e tags

#### 3.4. BreadcrumbList Schema
**Onde:** Todas as páginas internas  
**Propósito:** Navegação estruturada  
**Benefícios:**
- Breadcrumbs nos resultados de busca
- Melhor compreensão da hierarquia do site

#### 3.5. VideoObject Schema
**Onde:** `/videos/[id]` (quando implementado)  
**Propósito:** Rich Snippets para vídeos  
**Benefícios:**
- Thumbnail nos resultados
- Duração visível
- Embed player

#### 3.6. JobPosting Schema
**Onde:** `/jobs/[id]` (quando implementado)  
**Propósito:** Google for Jobs integration  
**Benefícios:**
- Vagas aparecem no Google Jobs
- Filtros de localização e tipo de trabalho
- Informações de salário (se disponível)

---

## 🏷️ 4. Meta Tags Globais

Localização: `nuxt.config.ts`

### SEO Core
- **Title:** "TechHub - O Santuário de Foco para Desenvolvedores Vue.js e Nuxt"
- **Description:** Focada em proposta de valor (sem distrações, curadoria técnica)
- **Keywords:** Vue.js tutorial, Nuxt 3, Nuxt 4, IA para programadores, vibe coding, vagas Vue.js

### Localização
- **geo.region:** BR
- **geo.placename:** Brasil
- **language:** Portuguese
- **og:locale:** pt_BR

### Social Media
- **Open Graph** completo (Facebook, LinkedIn)
- **Twitter Cards** com imagens grandes
- **Imagem OG:** 1200x630px recomendado

---

## 🎯 5. Palavras-Chave Estratégicas

### Core / Branding
- TechHub Brasil
- Blog de Tecnologia Focado
- Curadoria para Desenvolvedores
- Estudar programação sem distração
- Foco para desenvolvedores

### Por Pilar

#### A. Ecossistema Vue.js & Nuxt
**Head Terms:**
- Vue.js tutorial
- Nuxt 3 / Nuxt 4
- Desenvolvimento Frontend Vue

**Long Tail:**
- Como migrar de Vue 2 para Vue 3
- Melhores práticas Nuxt 4
- Pinia vs Vuex qual usar
- Componentes Vue.js reutilizáveis
- Server Side Rendering com Nuxt

#### B. Desenvolvimento com IA
**Head Terms:**
- IA para programadores
- Engenharia de Prompt para Devs
- Copilot tutorial

**Long Tail:**
- Melhores ferramentas de IA para frontend
- Como usar o ChatGPT para refatorar código
- Alternativas ao GitHub Copilot gratuitas
- Automatizar testes com IA

#### C. Vibe Coding
**Head Terms:**
- Vibe Coding
- Setup Minimalista
- Lo-fi para programar

**Long Tail:**
- Músicas para foco e programação
- Setup produtivo para home office
- Temas VS Code dark mode
- Organização de ambiente de desenvolvimento

#### D. Carreira & Vagas
**Head Terms:**
- Vagas Vue.js remoto
- Carreira Desenvolvedor Frontend

**Long Tail:**
- Quanto ganha um desenvolvedor Nuxt
- Vagas TechHub
- Trabalhar para o exterior com Vue.js

---

## 📝 6. Como Usar os Schemas

### Exemplo: Adicionar Schema em Nova Página

```vue
<script setup lang="ts">
import { useHead } from '#imports'
import { useVideoSchema, useBreadcrumbSchema } from '~/composables/useSchema'

// Suponha que você tenha os dados do vídeo
const video = {
  title: 'Vue.js 3.5 - Novas Features',
  description: 'Conheça as novidades do Vue.js 3.5',
  thumbnail: 'https://...',
  url: 'https://youtube.com/watch?v=...',
  duration: 'PT10M30S', // 10min 30s
  created_at: '2026-02-01',
  author: { name: 'João Paulo Costa' }
}

// Gerar schemas
const videoSchema = useVideoSchema(video)
const breadcrumbSchema = useBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Vídeos', url: '/videos' },
  { name: video.title, url: `/videos/${video.id}` }
])

// Inserir no head
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(videoSchema)
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(breadcrumbSchema)
    }
  ]
})
</script>
```

---

## 🔍 7. Verificação Pós-Implementação

### Ferramentas Recomendadas

1. **Google Search Console**
   - Submeta o sitemap: `https://techhub.com.br/sitemap.xml`
   - Verifique erros de indexação
   - Monitore posições de keywords

2. **Schema Markup Validator**
   - URL: https://validator.schema.org/
   - Teste cada página com Schema.org
   - Verifique erros e avisos

3. **Google Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Confirme se os Rich Snippets estão funcionando
   - Teste Article, VideoObject, JobPosting

4. **Facebook Sharing Debugger**
   - URL: https://developers.facebook.com/tools/debug/
   - Valide Open Graph tags
   - Limpe cache se necessário

5. **Twitter Card Validator**
   - URL: https://cards-dev.twitter.com/validator
   - Confirme preview dos cards

---

## 📈 8. Próximos Passos

### Implementações Futuras

1. **Criar páginas individuais**
   - `/videos/[id].vue` com VideoObject Schema
   - `/jobs/[id].vue` com JobPosting Schema

2. **Gerar og:image dinâmico**
   - Criar endpoint para gerar imagens OG personalizadas por artigo
   - Usar Vercel OG ou similar

3. **Implementar FAQ Schema**
   - Adicionar na página About
   - Melhorar presença nos Featured Snippets

4. **HowTo Schema**
   - Para tutoriais técnicos
   - Steps visuais no Google

5. **Analytics E-A-T**
   - Adicionar autor biography completo
   - Links para perfis profissionais
   - Métricas de expertise (Google E-E-A-T)

---

## 📞 Suporte

Para dúvidas sobre a implementação de SEO:
- Revisar: `app/composables/useSchema.ts`
- Consultar: https://schema.org/docs/schemas.html
- Google Docs: https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data

---

**Última atualização:** 2026-02-05  
**Autor:** João Paulo Costa  
**Versão:** 1.0.0
