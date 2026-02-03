import feedparser
import ssl

# Fix for potential SSL cert issues in some python environments
if hasattr(ssl, '_create_unverified_context'):
    ssl._create_default_https_context = ssl._create_unverified_context

class Scraper:
    def __init__(self):
        # Using Dev.to Vue tag RSS as a reliable starting source from the user's list
        self.sources = [
            {
                "name": "DEV Community (Vue)",
                "url": "https://dev.to/feed/tag/vue",
                "type": "news"
            },
            {
                "name": "Nuxt Blog",
                "url": "https://nuxt.com/rss.xml",
                "type": "news"
            }
        ]

    def get_latest_news(self, limit=1):
        """
        Fetches the latest news from configured sources.
        Returns a list of dictionaries with 'title', 'link', 'summary', 'source'.
        """
        articles = []
        print(f"📡 Iniciando busca de notícias em {len(self.sources)} fontes...")

        for source in self.sources:
            try:
                print(f"   Analizando feed: {source['name']}...")
                feed = feedparser.parse(source['url'])
                
                for entry in feed.entries[:limit]:
                    # Basic cleaning
                    summary = getattr(entry, 'summary', '') or getattr(entry, 'description', '')
                    # Remove HTML tags from summary if simple cleanup needed (optional, Writer AI handles dirty text well)
                    
                    article = {
                        "title": entry.title,
                        "link": entry.link,
                        "summary": summary[:1000], # Limit content sent to AI
                        "source": source['name'],
                        "type": source['type'],
                        "original_date": getattr(entry, 'published', 'N/A')
                    }
                    
                    # Tenta extrair imagem
                    image_url = None
                    # 1. media_content
                    if hasattr(entry, 'media_content') and entry.media_content:
                        image_url = entry.media_content[0].get('url')
                    # 2. media_thumbnail
                    elif hasattr(entry, 'media_thumbnail') and entry.media_thumbnail:
                        image_url = entry.media_thumbnail[0].get('url')
                    # 3. links type image
                    elif hasattr(entry, 'links'):
                        for link in entry.links:
                            if link.get('type', '').startswith('image/'):
                                image_url = link.get('href')
                                break
                                
                    if image_url:
                        article['image_url'] = image_url
                    articles.append(article)
                    # If we just need 'limit' total, we could break here, 
                    # but usually we want at least one from "limit" per source or total?
                    # The prompt implies "Pega a primeira notícia encontrada", so we return list.
            except Exception as e:
                print(f"⚠️ Erro ao ler {source['name']}: {e}")

        print(f"✅ Encontrados {len(articles)} artigos brutos.")
        return articles
