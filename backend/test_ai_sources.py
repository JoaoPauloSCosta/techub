#!/usr/bin/env python3
"""
Script de teste para o scraper de notícias com foco nas novas fontes de IA.
"""
import sys
sys.path.append('backend')

from modules.scraper import Scraper

def test_ai_sources():
    """Testa especificamente as novas fontes de IA adicionadas."""
    print("🧪 Testando novas fontes de IA...\n")
    
    scraper = Scraper()
    
    # Filtra apenas as fontes de IA
    ai_sources = [s for s in scraper.sources if any(keyword in s['name'].lower() 
                  for keyword in ['openai', 'google ai', 'deepmind', 'microsoft ai', 
                                  'meta ai', 'cohere', 'mistral', 'hugging face', 
                                  'stability ai', 'nvidia', 'aws machine'])]
    
    print(f"📊 Total de fontes de IA encontradas: {len(ai_sources)}\n")
    
    for source in ai_sources:
        print(f"🔍 Testando: {source['name']}")
        print(f"   URL: {source['url']}")
        try:
            # Cria um scraper temporário com apenas essa fonte
            temp_scraper = Scraper()
            temp_scraper.sources = [source]
            
            # Tenta pegar uma notícia
            articles = temp_scraper.get_latest_news(limit=1)
            
            if articles:
                print(f"   ✅ Sucesso! Título: {articles[0]['title'][:60]}...")
            else:
                print(f"   ⚠️ Nenhum artigo retornado (pode ser feed vazio)")
        except Exception as e:
            print(f"   ❌ Erro: {str(e)[:100]}")
        print()
    
    # Teste geral
    print("\n" + "="*60)
    print("🔄 Teste geral: buscando 1 artigo de TODAS as fontes...")
    print("="*60 + "\n")
    
    all_articles = scraper.get_latest_news(limit=1)
    print(f"\n✅ Total de artigos coletados: {len(all_articles)}")
    
    # Mostra alguns exemplos de fontes de IA
    ai_articles = [a for a in all_articles if any(keyword in a['source'].lower() 
                   for keyword in ['openai', 'google ai', 'deepmind', 'microsoft', 
                                   'meta', 'cohere', 'mistral', 'hugging', 
                                   'stability', 'nvidia', 'aws'])]
    
    if ai_articles:
        print(f"\n📰 Exemplos de artigos de IA coletados ({len(ai_articles)}):")
        for article in ai_articles[:5]:
            print(f"   • {article['source']}: {article['title'][:60]}...")

if __name__ == "__main__":
    test_ai_sources()
