import feedparser
import datetime

class VideoScraper:
    def __init__(self):
        # List of Channel IDs
        # Fireship, Nuxt, Vue.js, Rocketseat (BR), Filipe Deschamps (BR)
        self.channels = [
            {"name": "Luciana Papini", "id": "UCwCyve8wJg4gC3dwaqqc1ow"},
            {"name": "Enzo Sparo", "id": "UCifUfSNdly4yFOfzSDS2xog"},
            {"name": "Rodrigo Rahman", "id": "UC5hvPObwya8kzWWB-wmVlXg"},
            {"name": "Fireship", "id": "UCsBjURrPoezykLs9EqgamOA"},
            {"name": "Rocketseat", "id": "UCSfwM5u0Kce6Cce8_S72oLg"},
            {"name": "Nuxt", "id": "UCnC8M_x58m4eazr_4C1-NMg"},
            {"name": "Matheus | IA Coding", "id": "UCpuJeRIQ_MySvluzBLFT2Pw"},
            {"name": "Helio Arreche", "id": "UCIhBhRpaWD3-n8YKZcEtR6Q"},
            {"name": "AI Coders Academy", "id": "UCB0zxJZkEkb7TH6DdS-Fe_A"}
        ]

    def _get_tags(self, title, channel_name):
        tags = []
        title_lower = title.lower()

        def match_keywords(keywords, text):
            import re
            pattern = r'\b(?:' + '|'.join(re.escape(k) for k in keywords) + r')\b'
            # C# special case (boundary doesn't work well with #)
            if 'c#' in keywords and 'c#' in text:
                 return True
            return bool(re.search(pattern, text))

        # 1. Vue & Nuxt (Prioritize these Frameworks)
        if match_keywords(['nuxt', 'vue', 'pinia', 'vite', 'composition api'], title_lower):
            tags.append('Vue&Nuxt')
        elif channel_name in ['Nuxt', 'Rodrigo Rahman']: # Channel fallback
           if not match_keywords(['ia'], title_lower): # Avoid tagging AI videos from these channels purely as Vue/Nuxt if they are about AI
               tags.append('Vue&Nuxt')

        # 2. IA Dev (AI for Developers)
        if match_keywords(['ia', 'ai', 'gpt', 'claude', 'llm', 'cursor', 'copilot', 'gemini', 'deep seek', 'chatgpt', 'robô', 'agente', 'agent'], title_lower):
            tags.append('IA Dev')
        elif channel_name in ['Matheus | IA Coding', 'AI Coders Academy']:
            tags.append('IA Dev')

        # 3. Automações (N8N, Automation)
        if match_keywords(['n8n', 'automação', 'automacao', 'automation', 'make', 'zapier', 'workflow'], title_lower):
            tags.append('Automações')
        elif channel_name in ['Luciana Papini', 'Enzo Sparo', 'Helio Arreche']:
             # Enzo and Helio talk a lot about AI too, so check simple overlap
            tags.append('Automações')

        # 4. Backend (General Backend Tech)
        if match_keywords(['python', 'sql', 'database', 'api', 'docker', 'server', 'bun', 'node', 'rust', 'go', 'backend', 'java', 'c#'], title_lower):
            tags.append('Backend')

        # 5. Vibe Coding (Lifestyle / Vlog)
        if match_keywords(['vibe coding', 'coding vlog', 'setup', 'music for coding', 'study with me'], title_lower):
             tags.append('Vibe Coding')

        # Fallback
        if not tags:
            tags.append('Tech')
            
        return list(set(tags)) # Remove duplicates

    def get_latest_videos(self, limit=2, existing_urls=[]):
        print(f"🎬 Buscando vídeos recientes no YouTube RSS...")
        videos = []
        
        for channel in self.channels:
            url = f"https://www.youtube.com/feeds/videos.xml?channel_id={channel['id']}"
            feed = feedparser.parse(url)
            
            count = 0
            for entry in feed.entries:
                if count >= limit:
                    break
                    
                # Parse entry
                # atom content: video id, published, title, thumbnail (media_thumbnail)
                
                video_id = entry.yt_videoid
                video_url = f"https://www.youtube.com/watch?v={video_id}"
                
                # Check duplication
                if video_url in existing_urls:
                    print(f"   ⚠️ Vídeo duplicado ignorado: {entry.title}")
                    continue

                # Use thumbnail from feed (usually hqdefault) to ensure it exists
                if 'media_thumbnail' in entry and len(entry.media_thumbnail) > 0:
                    thumbnail = entry.media_thumbnail[0]['url']
                else:
                    thumbnail = f"https://img.youtube.com/vi/{video_id}/hqdefault.jpg"
                
                # Generate Tags
                video_tags = self._get_tags(entry.title, channel['name'])

                video = {
                    "title": entry.title,
                    "description": entry.summary if 'summary' in entry else "",
                    "url": video_url,
                    "thumbnail": thumbnail,
                    "author": channel['name'],
                    "views": "N/A", # RSS doesn't give views
                    "duration": "10:00", # RSS doesn't give duration
                    "published_at": entry.published,
                    "source": "youtube",
                    "tags": video_tags
                }
                
                videos.append(video)
                count += 1
                
        # Shuffle to mix channels
        import random
        random.shuffle(videos)
        print(f"✅ {len(videos)} vídeos encontrados.")
        return videos[:limit*len(self.channels)] # Return all collected
