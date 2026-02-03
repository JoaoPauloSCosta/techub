<script setup lang="ts">
import { useSeoMeta } from '#imports'

// SEO Configuration - Optimized for search engines
useSeoMeta({
  title: 'Sobre o TechHub - O Santuário de Foco para Desenvolvedores Vue.js e Nuxt',
  description: 'Descubra como o TechHub elimina distrações e centraliza conteúdos de Vue.js, IA, Automação e Vibe Coding. Feito de programador para programador.',
  ogTitle: 'Sobre o TechHub - O Santuário de Foco para Desenvolvedores',
  ogDescription: 'Descubra como o TechHub elimina distrações e centraliza conteúdos de Vue.js, IA, Automação e Vibe Coding.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

definePageMeta({
  layout: 'default-layout'
})
</script>

<template>
  <div class="min-h-screen py-12 md:py-20">
    <!-- Main Content Container -->
    <article class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Prose Content -->
      <div class="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-a:text-primary hover:prose-a:text-primary-hover prose-strong:text-gray-900 dark:prose-strong:text-white max-w-none">
        
        <!-- H1 - Main Title -->
        <h1 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8 leading-tight">
          A nossa missão: Devolver o seu foco
        </h1>

        <p>
          Vivemos na era da distração. Você abre o YouTube para aprender sobre a nova Features do Vue.js 3.5, e cinco minutos depois está assistindo a vídeos de política, animes ou esportes. O algoritmo das grandes plataformas não quer que você aprenda; ele quer que você fique viciado.
        </p>

        <p class="text-xl font-medium text-gray-800 dark:text-gray-200 border-l-4 border-primary pl-6 my-8">
          O TechHub nasceu dessa frustração.
        </p>

        <!-- H2 - O Santuário do Desenvolvedor -->
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
          O Santuário do Desenvolvedor
        </h2>

        <p>
          Eu sou <strong>João Paulo Costa</strong>, desenvolvedor e criador deste portal. Assim como você, senti a necessidade de um espaço onde o conteúdo técnico fosse tratado com respeito e exclusividade.
        </p>

        <p>
          O TechHub não é apenas um blog; é uma <strong>ferramenta de curadoria e produtividade</strong>. Aqui, o ruído é filtrado. Se você quer estudar Nuxt 4, Automação ou Inteligência Artificial, você encontrará exatamente isso. Sem clickbaits desnecessários, sem recomendações fora de contexto.
        </p>

        <!-- H2 - Nossos Pilares -->
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
          Nossos Pilares
        </h2>

        <p>
          Este ecossistema foi construído sobre tecnologias modernas para atender desenvolvedores modernos:
        </p>

        <ul class="space-y-4 my-8">
          <li class="flex items-start gap-3">
            <span class="inline-flex items-center justify-center w-2 h-2 mt-2.5 rounded-full bg-primary flex-shrink-0"></span>
            <span>
              <strong class="text-gray-900 dark:text-white">Ecossistema Vue:</strong> 
              O coração do nosso conteúdo. Tudo sobre Vue.js, Nuxt e suas bibliotecas.
            </span>
          </li>
          <li class="flex items-start gap-3">
            <span class="inline-flex items-center justify-center w-2 h-2 mt-2.5 rounded-full bg-primary flex-shrink-0"></span>
            <span>
              <strong class="text-gray-900 dark:text-white">Desenvolvimento Assistido por IA:</strong> 
              Como utilizar LLMs, Copilot e ferramentas generativas para codar mais rápido.
            </span>
          </li>
          <li class="flex items-start gap-3">
            <span class="inline-flex items-center justify-center w-2 h-2 mt-2.5 rounded-full bg-primary flex-shrink-0"></span>
            <span>
              <strong class="text-gray-900 dark:text-white">Vibe Coding:</strong> 
              A estética e o ambiente importam. Tutoriais e dicas para tornar seu setup e seu fluxo de trabalho prazerosos.
            </span>
          </li>
          <li class="flex items-start gap-3">
            <span class="inline-flex items-center justify-center w-2 h-2 mt-2.5 rounded-full bg-primary flex-shrink-0"></span>
            <span>
              <strong class="text-gray-900 dark:text-white">Carreira e Vagas:</strong> 
              Oportunidades reais, filtradas para o nosso nicho.
            </span>
          </li>
        </ul>

        <!-- H2 - Feito para a Comunidade -->
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
          Feito para a Comunidade
        </h2>

        <p>
          Este projeto é <strong>"Open Knowledge"</strong>. Buscamos as melhores referências, documentações e notícias para que você não precise garimpar a internet inteira.
        </p>

        <p class="text-xl font-medium text-gray-800 dark:text-gray-200 mt-8">
          Seja bem-vindo ao seu novo ponto de partida diário.
        </p>

        <!-- Signature -->
        <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p class="text-gray-600 dark:text-gray-400 mb-1">
            <strong class="text-gray-900 dark:text-white">João Paulo Costa</strong>
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-500 italic">
            TechHub Founder
          </p>
        </div>

      </div>
    </article>
  </div>
</template>

<style scoped>
/* Ensure smooth theme transitions */
.prose {
  transition: color 0.2s ease;
}

/* Custom list styling override for better control */
.prose ul {
  list-style: none;
  padding-left: 0;
}

/* Ensure links have proper hover states */
.prose a {
  text-decoration: none;
  transition: color 0.15s ease;
}

.prose a:hover {
  text-decoration: underline;
}
</style>
