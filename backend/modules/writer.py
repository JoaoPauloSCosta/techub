from openai import OpenAI
import os
import json_repair
import config

class ContentGenerator:
    def __init__(self):
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            print("⚠️ AVISO: OPENAI_API_KEY não encontrada no .env. A geração de texto falhará.")
        
        self.client = OpenAI(api_key=api_key)
        self.model = "gpt-4o-mini" # Cost-effective and fast

    def generate_article(self, scraped_item):
        """
        Generates a full blog post based on the scraped item.
        """
        print(f"🤖 Gerando artigo para: '{scraped_item['title']}'...")

        system_prompt = (
            "Você é um Desenvolvedor Sênior Especialista em Vue.js, Nuxt e Automação. "
            "Você escreve para o blog TechHub. Seu tom é técnico, direto ('Vibe Coding'), entusiasta, mas profissional. "
            "Seu objetivo é criar conteúdo de alto valor para desenvolvedores brasileiros."
        )

        user_prompt = f"""
        Escreva um artigo técnico completo para o blog TechHub baseado nesta notícia/conteúdo:

        Título Original: {scraped_item['title']}
        Fonte: {scraped_item['source']}
        Link Original: {scraped_item['link']}
        Resumo do Conteúdo: {scraped_item['summary']}
        Tags Detectadas pelo Sistema: {', '.join(scraped_item.get('tags', []))}

        Instruções de Saída:
        1. O artigo deve ser em Markdown.
        2. Título Catchy e Técnico em PT-BR (não use traduções literais estranhas).
        3. Introdução que conecte o assunto ao ecossistema Vue/Tech.
        4. O corpo deve explicar o conceito, novidade ou tutorial de forma didática.
        5. Se for código, use blocos de código com linguagem especificada.
        6. Cite a fonte original no final com link: "Fonte: [Nome](Link)".
        7. Selecione as tags APENAS desta lista (escolha as que se aplicam, mínimo 1, máximo 2): 
           ["Vue&Nuxt", "IA Dev", "Automações", "Vibe Coding", "Backend"].
           IMPORTANTE: Se as "Tags Detectadas pelo Sistema" acima incluírem alguma destas, use-a com prioridade.
           
           NÃO invente novas tags. Use exatamente como escrito (Title Case).
           - "Vue&Nuxt": Para notícias de Vue, Nuxt, Vite.
           - "IA Dev": Para IA, LLMs, Agentes, ChatGPT.
           - "Automações": Para N8N, Zapier, Bots.
           - "Backend": Para Python, APIs, Banco de Dados, Docker.
           - "Vibe Coding": Apenas se for sobre lifestyle/setup (raro para notícias).

        Retorne APENAS um JSON válido (sem markdown code blocks ```json) com a seguinte estrutura:
        {{
            "title": "Seu Título Aqui",
            "slug": "seu-slug-aqui",
            "content": "Conteúdo markdown completo aqui...",
            "excerpt": "Resumo curto de 1-2 frases para o card.",
            "tags": ["Tag1", "Tag2"],
            "original_url": "{scraped_item['link']}",
            "type": "{scraped_item['type']}"
        }}
        """

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.7
            )

            content_raw = response.choices[0].message.content.strip()
            
            # Remove code blocks if the potential "vibes" of the model added them despite instructions
            if content_raw.startswith("```json"):
                content_raw = content_raw.replace("```json", "").replace("```", "")
            
            article_data = json_repair.loads(content_raw)
            return article_data

        except Exception as e:
            print(f"❌ Erro ao gerar artigo com IA: {e}")
            return None
