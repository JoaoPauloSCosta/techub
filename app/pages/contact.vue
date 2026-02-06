<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useSeoMeta } from '#imports'

// --- State ---
const form = reactive({
  name: '',
  email: '',
  message: '',
  website: '', // Honeypot
  mathAnswer: ''
})

const mathChallenge = reactive({
  x: 0,
  y: 0
})

const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMessage = ref('')

// --- Lifecycle ---
onMounted(() => {
  generateMathChallenge()
})

// --- Logic ---
const generateMathChallenge = () => {
  mathChallenge.x = Math.floor(Math.random() * 10) + 1
  mathChallenge.y = Math.floor(Math.random() * 10) + 1
  form.mathAnswer = ''
}

const validateForm = (): boolean => {
  // 1. Check Empty Fields
  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
    errorMessage.value = 'Por favor, preencha todos os campos obrigatórios.'
    return false
  }

  // 2. Check Math Challenge
  const sum = mathChallenge.x + mathChallenge.y
  if (parseInt(form.mathAnswer) !== sum) {
    errorMessage.value = `A resposta da soma está incorreta. Quanto é ${mathChallenge.x} + ${mathChallenge.y}?`
    return false
  }

  return true
}

const submitForm = async () => {
  errorMessage.value = ''
  status.value = 'idle'

  if (!validateForm()) {
    status.value = 'error'
    return
  }

  status.value = 'loading'

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        message: form.message,
        website: form.website // Sending honeypot
      }
    })

    status.value = 'success'
    // Optional: clear form
    form.name = ''
    form.email = ''
    form.message = ''
    form.mathAnswer = ''
    generateMathChallenge() // Reset challenge for next time

  } catch (error: any) {
    status.value = 'error'
    errorMessage.value = 'Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.'
    console.error('Contact error:', error)
  }
}

// --- SEO ---
useSeoMeta({
  title: 'Fale Conosco | TechHub',
  description: 'Entre em contato com a equipe do TechHub.',
})
</script>

<template>
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-dark-bg transition-colors duration-300">
    <div class="max-w-2xl mx-auto">
      
      <!-- Header -->
      <div class="text-center mb-10">
        <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
          Fale Conosco
        </h1>
        <p class="mt-4 text-lg text-gray-500 dark:text-gray-400">
          Tem alguma dúvida, sugestão ou quer apenas dar um oi? Mande sua mensagem!
        </p>
      </div>

      <!-- Form Card -->
      <div class="bg-white dark:bg-dark-card rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-dark-border">
        <div class="p-8">
          
          <form @submit.prevent="submitForm" class="space-y-6">
            
            <!-- Honeypot (Hidden) -->
            <div v-show="false" class="hidden" aria-hidden="true">
              <label for="website">Website</label>
              <input 
                id="website" 
                v-model="form.website" 
                type="text" 
                name="website" 
                tabindex="-1" 
                autocomplete="off"
              />
            </div>

            <!-- Name -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nome <span class="text-red-500">*</span>
              </label>
              <div class="mt-1">
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark-bg text-gray-900 dark:text-white transition-colors"
                  placeholder="Seu nome completo"
                />
              </div>
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                E-mail <span class="text-red-500">*</span>
              </label>
              <div class="mt-1">
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark-bg text-gray-900 dark:text-white transition-colors"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <!-- Message -->
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Mensagem <span class="text-red-500">*</span>
              </label>
              <div class="mt-1">
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="4"
                  required
                  class="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark-bg text-gray-900 dark:text-white transition-colors resize-y"
                  placeholder="Como podemos ajudar?"
                ></textarea>
              </div>
            </div>

            <!-- Math Challenge -->
            <div class="bg-gray-50 dark:bg-dark-bg p-4 rounded-lg border border-gray-200 dark:border-dark-border">
              <label for="math" class="block text-sm font-medium text-gray-700 dark:text-text-secondary">
                Verificação de segurança <span class="text-red-500">*</span>
              </label>
              <div class="mt-2 flex items-center gap-3">
                <span class="text-lg font-bold text-gray-900 dark:text-text-primary select-none">
                  Quanto é {{ mathChallenge.x }} + {{ mathChallenge.y }}?
                </span>
                <input
                  id="math"
                  v-model="form.mathAnswer"
                  type="number"
                  required
                  class="block w-24 px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark-card text-gray-900 dark:text-text-primary text-center"
                  placeholder="?"
                />
              </div>
            </div>

            <!-- Feedback Messages -->
            <div v-if="status === 'success'" class="rounded-md bg-green-50 dark:bg-green-900/30 p-4 animate-fade-in">
              <div class="flex">
                <div class="flex-shrink-0">
                  <!-- Check Icon -->
                  <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-green-800 dark:text-green-200">
                    Mensagem enviada com sucesso! Entraremos em contato em breve.
                  </p>
                </div>
              </div>
            </div>

            <div v-if="status === 'error'" class="rounded-md bg-red-50 dark:bg-red-900/30 p-4 animate-fade-in">
              <div class="flex">
                <div class="flex-shrink-0">
                  <!-- X Circle Icon -->
                  <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-red-800 dark:text-red-200">
                    {{ errorMessage || 'Erro ao enviar mensagem.' }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div>
              <button
                type="submit"
                :disabled="status === 'loading' || status === 'success'"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <span v-if="status === 'loading'" class="flex items-center gap-2">
                  <svg class="animate-spin -ml-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </span>
                <span v-else>
                  Enviar Mensagem
                </span>
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
