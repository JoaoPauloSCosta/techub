import feedparser
import ssl
from urllib.parse import urlparse, urlunparse

# Fix for potential SSL cert issues in some python environments
if hasattr(ssl, '_create_unverified_context'):
    ssl._create_default_https_context = ssl._create_unverified_context

class Scraper:
    def __init__(self):
        # Using Dev.to Vue tag RSS as a reliable starting source from the user's list
        self.sources = [
            # --- Vue & Nuxt Ecosystem (Existing) ---
            {
                "name": "DEV Community (Vue)",
                "url": "https://dev.to/feed/tag/vue",
                "type": "news"
            },
            {
                "name": "Nuxt Blog",
                "url": "https://nuxt.com/blog/rss.xml",
                "type": "news"
            },
            {
                "name": "TabNews",
                "url": "https://www.tabnews.com.br/rss",
                "type": "news"
            },
            {
                "name": "Vue News",
                "url": "https://feeds.fireside.fm/vuenews/rss",
                "type": "news"
            },
            
            # --- Vibe Coding & AI Tools ---
            # {
            #     "name": "Cursor Blog",
            #     "url": "https://cursor.com/rss.xml", 
            #     "type": "news"
            # },
            {
                "name": "StackBlitz Blog",
                "url": "https://blog.stackblitz.com/rss.xml",
                "type": "news"
            },
            {
                "name": "Vercel Blog",
                "url": "https://vercel.com/atom",
                "type": "news"
            },
            # {
            #     "name": "Replit Blog",
            #     "url": "https://blog.replit.com/feed",
            #     "type": "news"
            # },
            # {
            #     "name": "Codeium Blog",
            #     "url": "https://codeium.com/blog/feed",
            #     "type": "news"
            # },
            # {
            #     "name": "Simon Willison",
            #     "url": "https://simonwillison.net/atom/",
            #     "type": "news"
            # },
            {
                "name": "Hacker News",
                "url": "https://news.ycombinator.com/rss",
                "type": "news"
            },
            {
                "name": "Product Hunt (DevTools)",
                "url": "https://www.producthunt.com/feed?category=engineering-development",
                "type": "news"
            },
            {
                "name": "The New Stack (AI)",
                "url": "https://thenewstack.io/category/ai/feed/",
                "type": "news"
            },

            # --- Fontes Nacionais (Brasil) ---
            # {
            #     "name": "Rocketseat",
            #     "url": "https://blog.rocketseat.com.br/rss/",
            #     "type": "news"
            # },
            # {
            #     "name": "DevGo",
            #     "url": "https://devgo.com.br/feed",
            #     "type": "news"
            # },

            # --- Backend: PHP & Laravel ---
            {
                "name": "PHP.net",
                "url": "https://www.php.net/feeds/latest.rss",
                "type": "news"
            },
            {
                "name": "Laravel News",
                "url": "https://feed.laravel-news.com",
                "type": "news"
            },
            {
                "name": "Stitcher.io",
                "url": "https://stitcher.io/rss",
                "type": "news"
            },
            {
                "name": "PHP.Watch",
                "url": "https://php.watch/feed.xml",
                "type": "news"
            },

            # --- Backend: Node.js ---
            {
                "name": "Node.js Blog",
                "url": "https://nodejs.org/en/feed/blog.xml",
                "type": "news"
            },
            {
                "name": "NodeSource",
                "url": "https://nodesource.com/blog/rss",
                "type": "news"
            },
            {
                "name": "LogRocket Blog",
                "url": "https://blog.logrocket.com/feed/",
                "type": "news"
            },

            # --- Backend: Java ---
            {
                "name": "Baeldung (Java)",
                "url": "http://www.baeldung.com/feed",
                "type": "news"
            },
            {
                "name": "Spring.io",
                "url": "https://spring.io/blog.atom", 
                "type": "news"
            },
            {
                "name": "InfoQ (Java)",
                "url": "https://feed.infoq.com/java",
                "type": "news"
            },

            # --- Backend: Python ---
            {
                "name": "Real Python",
                "url": "https://realpython.com/atom.xml",
                "type": "news"
            },
            {
                "name": "Planet Python",
                "url": "https://planetpython.org/rss20.xml",
                "type": "news"
            },
            {
                "name": "Django Weblog",
                "url": "https://www.djangoproject.com/rss/weblog/",
                "type": "news"
            },

            # --- Backend: .NET & C++ ---
            {
                "name": "Microsoft .NET",
                "url": "https://devblogs.microsoft.com/dotnet/feed/",
                "type": "news"
            },
            {
                "name": "Scott Hanselman",
                "url": "https://www.hanselman.com/blog/rss",
                "type": "news"
            },
            {
                "name": "Standard C++",
                "url": "https://isocpp.org/blog/rss",
                "type": "news"
            },

            # --- Arquitetura & Geral ---
            {
                "name": "Martin Fowler",
                "url": "https://martinfowler.com/feed.atom",
                "type": "news"
            },
            {
                "name": "High Scalability",
                "url": "http://feeds.feedburner.com/HighScalability",
                "type": "news"
            },
            {
                "name": "StackOverflow Blog",
                "url": "https://stackoverflow.blog/feed",
                "type": "news"
            },

            # --- Fontes Oficiais & Ferramentas (New) ---
            {
                "name": "n8n Blog",
                "url": "https://blog.n8n.io/rss",
                "type": "news"
            },
            {
                "name": "Zapier Blog",
                "url": "https://zapier.com/blog/feeds/latest/",
                "type": "news"
            },
            {
                "name": "UiPath Blog",
                "url": "https://www.uipath.com/blog/rss.xml",
                "type": "news"
            },
            
            # --- Portais No-Code & Automação (New) ---
            {
                "name": "TechCrunch (Automation)",
                "url": "https://techcrunch.com/tag/automation/feed/",
                "type": "news"
            },
            {
                "name": "VentureBeat (Automation)",
                "url": "https://venturebeat.com/category/automation/feed/",
                "type": "news"
            },
            {
                 "name": "DEV Community (Automation)",
                 "url": "https://dev.to/feed/tag/automation",
                 "type": "news"
            },

            # --- Comunidades (New) ---
            {
                "name": "Reddit (r/Automate)",
                "url": "https://www.reddit.com/r/Automate/.rss",
                "type": "news"
            },
            {
                "name": "Reddit (r/n8n)",
                "url": "https://www.reddit.com/r/n8n/.rss",
                "type": "news"
            },
            # {
            #     "name": "StackOverflow (Automation)",
            #     "url": "https://stackoverflow.com/feeds/tag?tagnames=automation",
            #     "type": "news"
            # }
        ]

    def get_latest_news(self, limit=1, existing_urls=[]):
        """
        Fetches the latest news from configured sources.
        Returns a list of dictionaries with 'title', 'link', 'summary', 'source'.
        """
        articles = []
        print(f"📡 Iniciando busca de notícias em {len(self.sources)} fontes...")
        
        # Normalize existing URLs for robust comparison (ignoring query params/trailing slashes)
        normalized_existing = set(self._normalize_url(u) for u in existing_urls)

        for source in self.sources:
            try:
                print(f"   Analizando feed: {source['name']}...")
                # Add User-Agent to avoid blocking by some servers (e.g. Reddit)
                feed = feedparser.parse(source['url'], agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
                
                for entry in feed.entries[:limit]:
                    # Check for duplicates immediately
                    if self._normalize_url(entry.link) in normalized_existing:
                        print(f"      ⚠️ Artigo ignorado (Já existe): {entry.title[:30]}...")
                        continue

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
                    
                    # Generate Tags based on title and summary
                    article['tags'] = self._get_tags(entry.title, getattr(entry, 'summary', ''))

                    articles.append(article)

                    # If we just need 'limit' total, we could break here, 
                    # but usually we want at least one from "limit" per source or total?
                    # The prompt implies "Pega a primeira notícia encontrada", so we return list.
            except Exception as e:
                print(f"⚠️ Erro ao ler {source['name']}: {e}")

        print(f"✅ Encontrados {len(articles)} artigos brutos.")
        return articles

    
    def _normalize_url(self, url):
        """
        Removes query parameters and trailing slashes to ensure unique URL detection
        regardless of tracking params (utm_source, etc).
        """
        if not url: return " "
        try:
            parsed = urlparse(url)
            # Reconstruct without query (?) or fragment (#)
            clean_url = urlunparse((parsed.scheme, parsed.netloc, parsed.path, '', '', ''))
            return clean_url.rstrip('/')
        except Exception:
            return url.rstrip('/')

    def _get_tags(self, title, summary=""):
        import re
        tags = []
        text_to_scan = (title + " " + summary).lower()

        def match_keywords(keywords, text):
            pattern = r'\b(?:' + '|'.join(re.escape(k) for k in keywords) + r')\b'
             # C# special case 
            if 'c#' in keywords and 'c#' in text:
                 return True
            return bool(re.search(pattern, text))

        # 1. Vue & Nuxt
        if match_keywords(['nuxt', 'vue', 'pinia', 'vite', 'composition api', 'vue.js', 'nuxt.js'], text_to_scan):
            tags.append('Vue&Nuxt')

        # 2. IA Dev
        if match_keywords(['ia', 'ai', 'gpt', 'claude', 'llm', 'cursor', 'copilot', 'gemini', 'deep seek', 'chatgpt', 'robô', 'agente', 'agent', 'artificial intelligence'], text_to_scan):
            tags.append('IA Dev')

        # 3. Automações
        if match_keywords(['n8n', 'automação', 'automacao', 'automation', 'make', 'zapier', 'workflow', 'bot'], text_to_scan):
            tags.append('Automações')

        # 4. Backend
        if match_keywords(['python', 'sql', 'database', 'api', 'docker', 'server', 'bun', 'node', 'node.js', 'rust', 'go', 'backend', 'java', 'c#', 'php', 'laravel'], text_to_scan):
            tags.append('Backend')

        # 5. Vibe Coding (Less likely in articles but good to have)
        if match_keywords(['vibe', 'setup', 'lo-fi', 'music', 'desk'], text_to_scan):
             tags.append('Vibe Coding')

        return list(set(tags))
