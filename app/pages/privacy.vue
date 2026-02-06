<script setup lang="ts">
import { useSeoMeta } from '#imports'
import { useConsent } from '../composables/useConsent'
import { ShieldCheckIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline'

const { openDetails } = useConsent()

useSeoMeta({
  title: 'Política de Privacidade - TechHub',
  description: 'Saiba como o TechHub coleta, utiliza e protege seus dados pessoais em conformidade com a LGPD (Lei Geral de Proteção de Dados).'
})

// Última atualização da política
const lastUpdate = '05 de Fevereiro de 2026'
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-bg py-12 md:py-20">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-2xl mb-6">
          <ShieldCheckIcon class="w-8 h-8 text-primary" />
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-text-primary mb-4">
          Política de Privacidade
        </h1>
        <p class="text-gray-500 dark:text-text-muted">
          Última atualização: {{ lastUpdate }}
        </p>
      </div>

      <!-- Content -->
      <article class="prose prose-lg dark:prose-invert prose-emerald max-w-none">
        <!-- Introdução -->
        <section class="mb-10">
          <p class="text-gray-600 dark:text-text-secondary leading-relaxed">
            O <strong class="text-gray-900 dark:text-text-primary">TechHub</strong> valoriza a privacidade de seus visitantes e usuários. 
            Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais, 
            em conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)</strong>.
          </p>
          <p class="text-gray-600 dark:text-text-secondary leading-relaxed">
            Ao acessar e utilizar nosso blog, você concorda com os termos descritos nesta política. 
            Recomendamos a leitura integral deste documento.
          </p>
        </section>

        <!-- 1. Coleta de Dados -->
        <section class="mb-10">
          <h2 class="text-xl font-bold text-gray-900 dark:text-text-primary flex items-center gap-2 mb-4">
            <span class="w-8 h-8 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg flex items-center justify-center text-sm font-bold text-emerald-600 dark:text-emerald-400">1</span>
            Coleta de Dados
          </h2>
          <p class="text-gray-600 dark:text-text-secondary leading-relaxed mb-4">
            O TechHub pode coletar os seguintes tipos de dados pessoais:
          </p>
          <div class="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-5 mb-4">
            <h3 class="font-semibold text-gray-900 dark:text-text-primary mb-3">Dados fornecidos diretamente por você:</h3>
            <ul class="space-y-2 text-gray-600 dark:text-text-secondary">
              <li class="flex items-start gap-2">
                <span class="text-primary mt-1">•</span>
                <span><strong class="text-gray-900 dark:text-text-primary">E-mail:</strong> Ao se inscrever em nossa newsletter ou entrar em contato conosco.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-primary mt-1">•</span>
                <span><strong class="text-gray-900 dark:text-text-primary">Nome:</strong> Quando preenchido em formulários de contato ou comentários.</span>
              </li>
            </ul>
          </div>
          <div class="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-5">
            <h3 class="font-semibold text-gray-900 dark:text-text-primary mb-3">Dados coletados automaticamente:</h3>
            <ul class="space-y-2 text-gray-600 dark:text-text-secondary">
              <li class="flex items-start gap-2">
                <span class="text-primary mt-1">•</span>
                <span><strong class="text-gray-900 dark:text-text-primary">Logs de acesso:</strong> Endereço IP, tipo de navegador, sistema operacional, páginas visitadas e horários de acesso.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-primary mt-1">•</span>
                <span><strong class="text-gray-900 dark:text-text-primary">Cookies:</strong> Pequenos arquivos armazenados em seu dispositivo para melhorar a experiência de navegação.</span>
              </li>
            </ul>
          </div>
        </section>

        <!-- 2. Uso de Cookies -->
        <section class="mb-10">
          <h2 class="text-xl font-bold text-gray-900 dark:text-text-primary flex items-center gap-2 mb-4">
            <span class="w-8 h-8 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400">2</span>
            Uso de Cookies
          </h2>
          <p class="text-gray-600 dark:text-text-secondary leading-relaxed mb-4">
            Utilizamos cookies para diferentes finalidades, categorizados da seguinte forma:
          </p>
          <div class="space-y-3">
            <div class="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-4">
              <h3 class="font-semibold text-gray-900 dark:text-text-primary mb-1">🔒 Cookies Necessários</h3>
              <p class="text-sm text-gray-600 dark:text-text-muted">
                Essenciais para o funcionamento do site. Incluem preferências de tema (claro/escuro) e suas escolhas de consentimento.
              </p>
            </div>
            <div class="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-4">
              <h3 class="font-semibold text-gray-900 dark:text-text-primary mb-1">📊 Cookies de Analytics</h3>
              <p class="text-sm text-gray-600 dark:text-text-muted">
                Utilizamos o Google Analytics para entender como os visitantes interagem com nosso conteúdo, 
                permitindo melhorias contínuas. Estes cookies são opcionais e só são ativados com seu consentimento.
              </p>
            </div>
            <div class="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-4">
              <h3 class="font-semibold text-gray-900 dark:text-text-primary mb-1">📢 Cookies de Marketing</h3>
              <p class="text-sm text-gray-600 dark:text-text-muted">
                Permitem a exibição de vídeos do YouTube e integrações com redes sociais. 
                Também são opcionais e requerem seu consentimento expresso.
              </p>
            </div>
          </div>
          <p class="text-gray-600 dark:text-text-secondary leading-relaxed mt-4">
            Você pode gerenciar suas preferências de cookies a qualquer momento clicando no botão ao final desta página.
          </p>
        </section>

        <!-- 3. Automação e IA -->
        <section class="mb-10">
          <h2 class="text-xl font-bold text-gray-900 dark:text-text-primary flex items-center gap-2 mb-4">
            <span class="w-8 h-8 bg-amber-100 dark:bg-amber-500/20 rounded-lg flex items-center justify-center text-sm font-bold text-amber-600 dark:text-amber-400">3</span>
            Automação e Inteligência Artificial
          </h2>
          <p class="text-gray-600 dark:text-text-secondary leading-relaxed mb-4">
            O TechHub utiliza tecnologias de automação e Inteligência Artificial para aprimorar a experiência do usuário:
          </p>
          <div class="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-5">
            <ul class="space-y-3 text-gray-600 dark:text-text-secondary">
              <li class="flex items-start gap-3">
                <span class="text-amber-500 mt-0.5">⚡</span>
                <span><strong class="text-gray-900 dark:text-text-primary">Curadoria de Conteúdo:</strong> Scripts automatizados podem processar dados públicos para agregar notícias e vagas de emprego relevantes para a comunidade de desenvolvedores.</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-amber-500 mt-0.5">🤖</span>
                <span><strong class="text-gray-900 dark:text-text-primary">Geração de Resumos:</strong> Ferramentas de IA podem ser utilizadas para criar resumos e descrições de artigos, sempre com supervisão editorial.</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-amber-500 mt-0.5">📈</span>
                <span><strong class="text-gray-900 dark:text-text-primary">Análise de Tendências:</strong> Algoritmos podem analisar padrões de leitura para identificar conteúdos em alta e melhorar nossas recomendações.</span>
              </li>
            </ul>
          </div>
          <p class="text-gray-600 dark:text-text-secondary leading-relaxed mt-4 text-sm">
            <strong class="text-gray-900 dark:text-text-primary">Importante:</strong> Nenhum dado pessoal identificável é compartilhado com sistemas de IA de terceiros sem seu consentimento explícito.
          </p>
        </section>

        <!-- 4. Seus Direitos -->
        <section class="mb-10">
          <h2 class="text-xl font-bold text-gray-900 dark:text-text-primary flex items-center gap-2 mb-4">
            <span class="w-8 h-8 bg-purple-100 dark:bg-purple-500/20 rounded-lg flex items-center justify-center text-sm font-bold text-purple-600 dark:text-purple-400">4</span>
            Seus Direitos
          </h2>
          <p class="text-gray-600 dark:text-text-secondary leading-relaxed mb-4">
            A LGPD garante a você, titular dos dados, os seguintes direitos:
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-4">
              <h3 class="font-semibold text-gray-900 dark:text-text-primary text-sm mb-1">✅ Confirmação e Acesso</h3>
              <p class="text-xs text-gray-600 dark:text-text-muted">
                Confirmar a existência de tratamento e acessar seus dados pessoais.
              </p>
            </div>
            <div class="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-4">
              <h3 class="font-semibold text-gray-900 dark:text-text-primary text-sm mb-1">✏️ Correção</h3>
              <p class="text-xs text-gray-600 dark:text-text-muted">
                Solicitar a correção de dados incompletos, inexatos ou desatualizados.
              </p>
            </div>
            <div class="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-4">
              <h3 class="font-semibold text-gray-900 dark:text-text-primary text-sm mb-1">🗑️ Exclusão</h3>
              <p class="text-xs text-gray-600 dark:text-text-muted">
                Solicitar a exclusão de dados desnecessários ou tratados em desconformidade.
              </p>
            </div>
            <div class="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-4">
              <h3 class="font-semibold text-gray-900 dark:text-text-primary text-sm mb-1">📤 Portabilidade</h3>
              <p class="text-xs text-gray-600 dark:text-text-muted">
                Solicitar a portabilidade dos dados para outro serviço ou produto.
              </p>
            </div>
            <div class="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-4">
              <h3 class="font-semibold text-gray-900 dark:text-text-primary text-sm mb-1">🚫 Revogação</h3>
              <p class="text-xs text-gray-600 dark:text-text-muted">
                Revogar o consentimento a qualquer momento, de forma gratuita e facilitada.
              </p>
            </div>
            <div class="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-4">
              <h3 class="font-semibold text-gray-900 dark:text-text-primary text-sm mb-1">ℹ️ Informação</h3>
              <p class="text-xs text-gray-600 dark:text-text-muted">
                Ser informado sobre as entidades com as quais compartilhamos seus dados.
              </p>
            </div>
          </div>
          <p class="text-gray-600 dark:text-text-secondary leading-relaxed mt-4">
            Para exercer qualquer um desses direitos, entre em contato conosco através da página de 
            <a href="/contact" class="text-primary hover:underline font-medium">Contato</a>.
          </p>
        </section>

        <!-- 5. Contato -->
        <section class="mb-10">
          <h2 class="text-xl font-bold text-gray-900 dark:text-text-primary flex items-center gap-2 mb-4">
            <span class="w-8 h-8 bg-teal-100 dark:bg-teal-500/20 rounded-lg flex items-center justify-center text-sm font-bold text-teal-600 dark:text-teal-400">5</span>
            Contato e Responsável
          </h2>
          <p class="text-gray-600 dark:text-text-secondary leading-relaxed">
            Em caso de dúvidas sobre esta Política de Privacidade ou para exercer seus direitos previstos na LGPD, 
            entre em contato pelo e-mail: <strong class="text-primary">privacidade@techhub.com.br</strong>
          </p>
          <p class="text-gray-600 dark:text-text-secondary leading-relaxed mt-2">
            O responsável pelo tratamento de dados pessoais no TechHub é <strong class="text-gray-900 dark:text-text-primary">João Paulo Costa</strong>.
          </p>
        </section>
      </article>

      <!-- CTA - Gerenciar Cookies -->
      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-dark-border">
        <div class="bg-gradient-to-r from-primary/5 to-emerald-500/5 dark:from-primary/10 dark:to-emerald-500/10 border border-primary/20 rounded-2xl p-6 text-center">
          <Cog6ToothIcon class="w-10 h-10 text-primary mx-auto mb-4" />
          <h3 class="text-lg font-bold text-gray-900 dark:text-text-primary mb-2">
            Gerencie suas preferências
          </h3>
          <p class="text-gray-600 dark:text-text-muted text-sm mb-5 max-w-md mx-auto">
            Você pode alterar suas preferências de cookies a qualquer momento. 
            Clique no botão abaixo para abrir o painel de configurações.
          </p>
          <button
            id="privacy-manage-cookies-btn"
            type="button"
            class="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white dark:text-dark-bg font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-primary/40 press-effect"
            @click="openDetails"
          >
            <Cog6ToothIcon class="w-5 h-5" />
            Gerenciar minhas preferências de Cookies
          </button>
        </div>
      </div>

      <!-- Back Link -->
      <div class="mt-8 text-center">
        <a 
          href="/" 
          class="text-gray-500 dark:text-text-muted hover:text-primary text-sm transition-colors"
        >
          ← Voltar para a página inicial
        </a>
      </div>
    </div>
  </div>
</template>
