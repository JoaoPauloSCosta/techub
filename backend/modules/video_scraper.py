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
            {"name": "Helio Arreche", "id": "UCIhBhRpaWD3-n8YKZcEtR6Q"}
            # TODO: Add AI Coders Academy (Need Channel ID)
            # {"name": "AI Coders Academy", "id": "UC..."}
        ]

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
                
                video = {
                    "title": entry.title,
                    "description": entry.summary if 'summary' in entry else "",
                    "url": video_url,
                    "thumbnail": thumbnail,
                    "author": channel['name'],
                    "views": "N/A", # RSS doesn't give views
                    "duration": "10:00", # RSS doesn't give duration
                    "published_at": entry.published,
                    "source": "youtube"
                }
                
                videos.append(video)
                count += 1
                
        # Shuffle to mix channels
        import random
        random.shuffle(videos)
        print(f"✅ {len(videos)} vídeos encontrados.")
        return videos[:limit*len(self.channels)] # Return all collected
