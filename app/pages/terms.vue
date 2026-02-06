<script setup lang="ts">
import { useSeoMeta } from '#imports'
import { 
  ScaleIcon, 
  ExclamationTriangleIcon, 
  CpuChipIcon, 
  DocumentDuplicateIcon, 
  LinkIcon, 
  ChatBubbleLeftRightIcon, 
  ArrowPathIcon
} from '@heroicons/vue/24/outline'

useSeoMeta({
  title: 'Termos de Uso - TechHub',
  description: 'Leia os Termos de Uso do TechHub. Regras, isenção de responsabilidade e direitos autorais.'
})

// Última atualização
const lastUpdate = '05 de Fevereiro de 2026'
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-bg py-12 md:py-20">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-2xl mb-6">
          <ScaleIcon class="w-8 h-8 text-primary" />
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-text-primary mb-4">
          Termos de Uso
        </h1>
        <p class="text-gray-500 dark:text-text-muted">
          Última atualização: {{ lastUpdate }}
        </p>
      </div>

      <!-- Content -->
      <article class="prose prose-lg dark:prose-invert prose-emerald max-w-none">
        
        <!-- Aceitação -->
        <section class="mb-10">
          <p class="text-gray-600 dark:text-text-secondary leading-relaxed">
            Bem-vindo ao <strong class="text-gray-900 dark:text-text-primary">TechHub</strong>. 
            Ao acessar e utilizar nosso site, você concorda em cumprir e sujeitar-se aos seguintes Termos de Uso. 
            Se você não concorda com qualquer parte destes termos, você não deve acessar o site.
          </p>
        </section>

        <!-- 1. Isenção de Responsabilidade -->
        <section class="mb-10">
          <h2 class="text-xl font-bold text-gray-900 dark:text-text-primary flex items-center gap-2 mb-4">
            <span class="w-8 h-8 bg-amber-100 dark:bg-amber-500/20 rounded-lg flex items-center justify-center text-sm font-bold text-amber-600 dark:text-amber-400">1</span>
            Isenção de Responsabilidade (Disclaimer)
          </h2>
          <div class="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-5 mb-4">
            <div class="flex items-start gap-3 mb-2">
              <ExclamationTriangleIcon class="w-6 h-6 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
              <p class="text-gray-700 dark:text-text-primary font-medium m-0">
                Uso por Conta e Risco
              </p>
            </div>
            <p class="text-gray-600 dark:text-text-secondary text-sm m-0">
              Todo o conteúdo disponibilizado no TechHub, incluindo artigos, snippets de código, tutoriais e exemplos, 
              é fornecido <strong>"como está" (as is)</strong>, exclusivamente para fins educacionais e informativos.
            </p>
          </div>
          <p class="text-gray-600 dark:text-text-secondary leading-relaxed">
            O TechHub e seus colaboradores <strong>não se responsabilizam</strong> por quaisquer danos diretos, indiretos, incidentais ou 
            consequenciais, incluindo, mas não se limitando a, perda de dados, bugs em produção ou falhas de segurança 
            resultantes do uso ou implementação de códigos encontrados neste site.
          </p>
          <p class="text-gray-600 dark:text-text-secondary leading-relaxed mt-2">
            Recomendamos fortemente que todo código seja testado em um ambiente seguro e auditado antes de ser utilizado em projetos reais ou de produção.
          </p>
        </section>

        <!-- 2. Uso de Inteligência Artificial -->
        <section class="mb-10">
          <h2 class="text-xl font-bold text-gray-900 dark:text-text-primary flex items-center gap-2 mb-4">
            <span class="w-8 h-8 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400">2</span>
            Uso de Inteligência Artificial
          </h2>
          <p class="text-gray-600 dark:text-text-secondary leading-relaxed mb-4">
            Prezamos pela transparência tecnológica. O TechHub utiliza ferramentas de Inteligência Artificial (IA) para:
          </p>
          <ul class="space-y-2 text-gray-600 dark:text-text-secondary list-none pl-0">
            <li class="flex items-start gap-3">
              <CpuChipIcon class="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
              <span>Auxiliar na curadoria e pesquisa de tópicos relevantes.</span>
            </li>
            <li class="flex items-start gap-3">
              <CpuChipIcon class="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
              <span>Traduzir e adaptar conteúdos técnicos internacionais.</span>
            </li>
            <li class="flex items-start gap-3">
              <CpuChipIcon class="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
              <span>Gerar ou aprimorar imagens ilustrativas e snippets de código.</span>
            </li>
          </ul>
          <p class="text-gray-600 dark:text-text-secondary leading-relaxed mt-4">
            Apesar do uso dessas ferramentas, todo o conteúdo passa por <strong>revisão humana</strong> para garantir precisão, 
            qualidade e relevância para a comunidade de desenvolvedores.
          </p>
        </section>

        <!-- 3. Propriedade Intelectual -->
        <section class="mb-10">
          <h2 class="text-xl font-bold text-gray-900 dark:text-text-primary flex items-center gap-2 mb-4">
            <span class="w-8 h-8 bg-purple-100 dark:bg-purple-500/20 rounded-lg flex items-center justify-center text-sm font-bold text-purple-600 dark:text-purple-400">3</span>
            Propriedade Intelectual
          </h2>
          <p class="text-gray-600 dark:text-text-secondary leading-relaxed mb-4">
            Todo o conteúdo textual, gráfico e estrutural deste site é de propriedade do TechHub, salvo indicação em contrário.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white dark:bg-dark-card border border-green-200 dark:border-green-500/20 rounded-xl p-4">
              <h3 class="font-semibold text-green-700 dark:text-green-400 text-sm mb-2 uppercase tracking-wide">Permitido ✅</h3>
              <p class="text-sm text-gray-600 dark:text-text-muted">
                Você é livre para usar, modificar e incorporar os <strong>exemplos de código (snippets)</strong> 
                em seus próprios projetos pessoais ou comerciais, sem necessidade de atribuição (embora seja apreciada).
              </p>
            </div>
            <div class="bg-white dark:bg-dark-card border border-red-200 dark:border-red-500/20 rounded-xl p-4">
              <h3 class="font-semibold text-red-700 dark:text-red-400 text-sm mb-2 uppercase tracking-wide">Proibido ❌</h3>
              <p class="text-sm text-gray-600 dark:text-text-muted">
                É proibida a cópia integral ou reprodução sistemática dos artigos, tutoriais e estrutura do site 
                para a criação de serviços concorrentes (Scraping ou Clonagem), sob pena de medidas legais.
              </p>
            </div>
          </div>
        </section>

        <!-- 4. Links Externos -->
        <section class="mb-10">
          <h2 class="text-xl font-bold text-gray-900 dark:text-text-primary flex items-center gap-2 mb-4">
            <span class="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-sm font-bold text-gray-600 dark:text-gray-300">4</span>
            Links Externos
          </h2>
          <p class="text-gray-600 dark:text-text-secondary leading-relaxed">
            O TechHub pode conter links para sites de terceiros (como fontes de notícias originais, páginas de vagas ou documentação). 
            Nós <strong>não controlamos</strong> e não somos responsáveis pelo conteúdo, políticas de privacidade ou práticas desses sites. 
            O acesso a esses links é de sua inteira responsabilidade.
          </p>
        </section>

        <!-- 5. Regras de Conduta -->
        <section class="mb-10">
          <h2 class="text-xl font-bold text-gray-900 dark:text-text-primary flex items-center gap-2 mb-4">
            <span class="w-8 h-8 bg-teal-100 dark:bg-teal-500/20 rounded-lg flex items-center justify-center text-sm font-bold text-teal-600 dark:text-teal-400">5</span>
            Regras de Conduta
          </h2>
          <p class="text-gray-600 dark:text-text-secondary leading-relaxed">
            Caso o site ofereça áreas interativas (como comentários), você concorda em não postar conteúdo que seja:
          </p>
          <ul class="list-disc pl-5 mt-2 space-y-1 text-gray-600 dark:text-text-secondary">
            <li>Ilegal, ofensivo, difamatório ou discriminatório.</li>
            <li>Spam, publicidade não autorizada ou "correntes".</li>
            <li>Malware ou código malicioso.</li>
          </ul>
          <p class="text-gray-600 dark:text-text-secondary leading-relaxed mt-2">
            Reservamo-nos o direito de remover qualquer conteúdo que viole estas regras.
          </p>
        </section>

        <!-- 6. Alterações e Legislação -->
        <section class="mb-10">
          <div class="space-y-6">
            <div>
              <h2 class="text-xl font-bold text-gray-900 dark:text-text-primary flex items-center gap-2 mb-2">
                <ArrowPathIcon class="w-5 h-5 text-gray-500" />
                Alterações nos Termos
              </h2>
              <p class="text-gray-600 dark:text-text-secondary leading-relaxed">
                Podemos revisar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação no site. 
                Recomendamos que você revise esta página periodicamente.
              </p>
            </div>
            <div>
              <h2 class="text-xl font-bold text-gray-900 dark:text-text-primary flex items-center gap-2 mb-2">
                <ScaleIcon class="w-5 h-5 text-gray-500" />
                Legislação Aplicável
              </h2>
              <p class="text-gray-600 dark:text-text-secondary leading-relaxed">
                Estes termos são regidos e interpretados de acordo com as leis da <strong>República Federativa do Brasil</strong>. 
                Qualquer disputa relacionada a estes termos estará sujeita à jurisdição exclusiva dos tribunais brasileiros.
              </p>
            </div>
          </div>
        </section>

      </article>

      <!-- Back Link -->
      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-dark-border text-center">
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
