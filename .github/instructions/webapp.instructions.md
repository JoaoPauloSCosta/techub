---
applyTo: '**'
---

# CONTEXTO DO PROJETO

Você está desenvolvendo um aplicativo de colecionismo de filmes físicos (DVD, Blu-ray, VHS, 4K).

Stack obrigatória:
- Nuxt 4 (Vue 3 + Composition API)
- TypeScript (Strict Mode)
- TailwindCSS (tema escuro/premium)
- Supabase (Auth + PostgreSQL + RLS)
- TMDB API (apenas para enriquecimento)
- Arquitetura baseada em composables (useX.ts)

⚠️ IMPORTANTE
- Não use auto-imports
- Não coloque lógica de negócio em componentes Vue
- Siga rigorosamente a estrutura de pastas definida
- Componentes são apenas UI
- Toda lógica vive em composables e utils

---

# PROBLEMA DE NEGÓCIO

O usuário possui grandes coleções físicas (centenas ou milhares de filmes)
e NÃO quer cadastrar filmes manualmente.

O código de barras:
- NÃO identifica diretamente um filme
- Identifica apenas a embalagem física

Portanto, o sistema deve trabalhar com INFERÊNCIA PROBABILÍSTICA,
e não com identificação absoluta.

---

# MODELO MENTAL OBRIGATÓRIO

O sistema NÃO pergunta:
"Qual filme é esse?"

O sistema pergunta:
"Entre vários filmes possíveis, qual é o MAIS PROVÁVEL?"

O resultado nunca é uma certeza.
É uma SUGESTÃO COM NÍVEL DE CONFIANÇA.

---

# PIPELINE FUNCIONAL (OBRIGATÓRIO)

1. Usuário inicia cadastro pelo Dashboard
2. Usuário escolhe "Escanear código de barras"
3. Sistema captura o barcode e o tipo de mídia
4. Sistema obtém pistas imperfeitas:
   - Título aproximado
   - Ano aproximado
   - Idioma
5. Sistema gera uma lista de FILMES CANDIDATOS
6. Sistema compara cada candidato com as pistas
7. Para cada candidato, calcula um CONFIDENCE SCORE (0 → 1)
8. Sistema escolhe o candidato com maior score
9. Sistema EXPLICA os motivos da sugestão
10. Usuário:
    - Confirma
    - Ajusta
    - Rejeita
11. SOMENTE após confirmação:
    - Sistema busca dados completos no TMDB
    - Enriquecimento visual (poster, sinopse, elenco)

---

# HEURÍSTICAS (CONCEITO)

O algoritmo deve:
- Comparar similaridade de título
- Avaliar proximidade de ano
- Verificar compatibilidade de idioma
- Usar popularidade apenas como desempate

Cada heurística gera um "sinal fraco".
O score final é a soma ponderada desses sinais.

O algoritmo NÃO pode:
- Tomar decisão absoluta
- Esconder os critérios
- Ignorar ambiguidades

---

# UX OBRIGATÓRIO (TELAS)

### TELA: Sugestão Automática
A UI deve mostrar claramente:

- Filme sugerido
- Confidence score (ex: 92%)
- Lista de motivos explicativos

Exemplo conceitual:
"Achamos que este filme é X
Confiança: 92%
Motivos:
- Título muito parecido
- Ano compatível
- Idioma da mídia"

Botões:
- Confirmar
- Ajustar
- Não é esse

### REGRA UX IMPORTANTE
- Auto-confirmação apenas se confidence >= 0.85
- Caso contrário, sempre pedir confirmação explícita

---

# ESTRUTURA DE ARQUIVOS (OBRIGATÓRIA)

/app/composables
  - usePhysicalItem.ts        // gerencia o objeto físico
  - useFilmMatching.ts       // orquestra inferência

/app/utils
  - stringSimilarity.ts      // funções puras
  - calculateScore.ts        // score heurístico

/shared/types
  - PhysicalItem.ts
  - FilmCandidate.ts
  - FilmMatchResult.ts

---

# RESPONSABILIDADES

- utils:
  Funções puras, sem estado, sem API

- composables:
  Orquestram o fluxo, controlam estado, chamam server/api

- components:
  Apenas UI, sem regras de negócio

---

# REGRAS ABSOLUTAS

❌ NÃO tratar barcode como ID de filme  
❌ NÃO buscar TMDB antes da inferência  
❌ NÃO decidir pelo usuário  
❌ NÃO esconder score ou motivos  
❌ NÃO usar any  

---

# OBJETIVO FINAL

Criar um fluxo de cadastro extremamente rápido,
baseado em sugestão inteligente,
explicável,
e respeitando a incerteza do mundo real.

Antes de escrever código,
pense como um arquiteto de software e produto.
