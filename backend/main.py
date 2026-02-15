from supabase import create_client
import config
import random
from modules.scraper import Scraper
from modules.writer import ContentGenerator
from modules.visuals import VisualGenerator
from modules.jobs_scraper import JobScraper
from modules.video_scraper import VideoScraper
import datetime

def run_article_pipeline(supabase):
    print("\n📰 INICIANDO AUTOMAÇÃO DE ARTIGOS...")
    try:
        # Fetch existing URLs to prevent duplicates (PRE-GENERATION CHECK)
        existing_posts = supabase.table("posts").select("original_url").execute()
        existing_urls = [row['original_url'] for row in existing_posts.data if row['original_url']] if existing_posts.data else []
        print(f"   ℹ️ {len(existing_urls)} artigos já cadastrados no histórico.")

        scraper = Scraper()
        articles_found = scraper.get_latest_news(limit=2, existing_urls=existing_urls)
        
        if not articles_found:
            print("📭 Nenhum artigo NOVO encontrado.")
            return

        target_news = random.choice(articles_found)
        print(f"\n🎲 Seleção aleatória entre {len(articles_found)} artigos disponíveis.")
        print(f"🎯 Notícia selecionada: {target_news['title']}")
        print(f"   📂 Fonte: {target_news.get('source', 'N/A')}")

        writer = ContentGenerator()
        article_data = writer.generate_article(target_news)

        if not article_data:
            print("❌ Falha na geração do artigo.")
            return

        visuals = VisualGenerator()
        original_image = target_news.get('image_url')
        
        if original_image:
            print(f"🖼️ Usando imagem original da fonte: {original_image}")
            article_data['image_url'] = original_image
        else:
            print("🎨 Imagem original não encontrada. Acionando Nano Banana...")
            image_url = visuals.generate_and_upload_image(article_data['title'], article_data['slug'])
            
            if image_url:
                article_data['image_url'] = image_url
            else:
                article_data['image_url'] = "https://placehold.co/1200x630?text=TechHub" 

        print("\n💾 Salvando artigo no Banco de Dados...")
        existing_post = supabase.table("posts").select("id").eq("slug", article_data['slug']).execute()
        if existing_post.data:
            print(f"   ⚠️ Artigo duplicado ignorado (Slug já existe): {article_data['slug']}")
            return

        payload = {
            "title": article_data['title'],
            "slug": article_data['slug'],
            "content": article_data['content'],
            "excerpt": article_data['excerpt'],
            "image_url": article_data['image_url'],
            "tags": article_data['tags'],
            "type": article_data['type'],
            "original_url": article_data.get('original_url'), # Save Source Link
            "created_at": datetime.datetime.now().isoformat()
        }

        data = supabase.table("posts").insert(payload).execute()
        print("✅ Artigo Publicado com Sucesso!")
        print(f"   ID: {data.data[0]['id']}")
        
    except Exception as e:
        print(f"❌ Erro no pipeline de artigos: {e}")

def run_job_pipeline(supabase):
    print("\n💼 INICIANDO AUTOMAÇÃO DE VAGAS...")
    try:
        existing_jobs = supabase.table("jobs").select("apply_url").execute()
        existing_job_urls = [row['apply_url'] for row in existing_jobs.data] if existing_jobs.data else []
        print(f"   ℹ️ {len(existing_job_urls)} vagas já cadastradas no banco.")

        job_scraper = JobScraper()
        jobs = job_scraper.get_latest_jobs(limit=5, existing_urls=existing_job_urls)
        
        if jobs:
            print(f"   Salvando {len(jobs)} vagas no banco...")
            data = supabase.table("jobs").insert(jobs).execute()
            print("✅ Vagas salvas com sucesso!")
        else:
            print("   Nenhuma vaga nova encontrada.")
    except Exception as e:
        print(f"❌ Erro no módulo de vagas: {e}")

def run_video_pipeline(supabase):
    print("\n🎬 INICIANDO AUTOMAÇÃO DE VÍDEOS...")
    try:
        existing_data = supabase.table("videos").select("url").execute()
        existing_urls = [row['url'] for row in existing_data.data] if existing_data.data else []
        print(f"   ℹ️ {len(existing_urls)} vídeos já cadastrados no banco.")

        video_scraper = VideoScraper()
        videos = video_scraper.get_latest_videos(limit=5, existing_urls=existing_urls)
        
        if videos:
            print(f"   Salvando {len(videos)} vídeos no banco...")
            db_videos = []
            for v in videos:
                db_videos.append({
                    "title": v['title'],
                    "thumbnail": v['thumbnail'], 
                    "url": v['url'],
                    "channel": v['author'],
                    "views": 0, 
                    "duration": v['duration'],
                    "published_at": v['published_at'],
                    "tags": v.get('tags', ["Tech", "Video"]) 
                })

            data = supabase.table("videos").insert(db_videos).execute()
            print("✅ Vídeos salvos com sucesso!")
        else:
            print("   Nenhum vídeo novo encontrado.")
    except Exception as e:
            print(f"❌ Erro no módulo de vídeos: {e}")

def main_pipeline():
    print("🚀 Iniciando Pipeline do TechBub Backend...")
    
    supabase = create_client(config.SUPABASE_URL, config.SUPABASE_KEY)

    run_article_pipeline(supabase)
    run_job_pipeline(supabase)
    run_video_pipeline(supabase)

    print("\n🏁 Pipeline finalizado!")

if __name__ == "__main__":
    main_pipeline()
