from supabase import create_client
import config
from modules.scraper import Scraper
from modules.writer import ContentGenerator
from modules.visuals import VisualGenerator
import datetime

def main_pipeline():
    print("🚀 Iniciando Pipeline do TechBub Backend...")
    
    # Init DB Client
    supabase = create_client(config.SUPABASE_URL, config.SUPABASE_KEY)

    # 1. Scraper
    scraper = Scraper()
    articles_found = scraper.get_latest_news(limit=1)
    
    if not articles_found:
        print("📭 Nenhum artigo novo encontrado.")
        return

    # Pega o primeiro para teste
    target_news = articles_found[0]
    print(f"\n🎯 Notícia selecionada: {target_news['title']}")

    # Check for Duplicate (simple check by original url/slug connection usually better, but let's assume always new for now or handle unique constraint)
    # ...

    # 2. Writer (AI)
    writer = ContentGenerator()
    article_data = writer.generate_article(target_news)

    if not article_data:
        print("❌ Falha na geração do artigo.")
        return

    # 3. Visuals (Image Gen)
    # 3. Visuals (Image Gen)
    visuals = VisualGenerator()
    
    # Priority: Original Image > Nano Banana (Gemini) > Placeholder
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
            article_data['image_url'] = "https://placehold.co/1200x630?text=TechHub" # Fallback

    # 4. Save to Database
    print("\n💾 Salvando artigo no Banco de Dados...")
    try:
        # Check if slug already exists to avoid duplicates
        existing_post = supabase.table("posts").select("id").eq("slug", article_data['slug']).execute()
        if existing_post.data:
            print(f"   ⚠️ Artigo duplicado ignorado (Slug já existe): {article_data['slug']}")
            return

        # Prepare payload matching table schema
        payload = {
            "title": article_data['title'],
            "slug": article_data['slug'],
            "content": article_data['content'],
            "excerpt": article_data['excerpt'],
            "image_url": article_data['image_url'],
            "tags": article_data['tags'], # Supabase needs array or jsonb
            "type": article_data['type'],
            "created_at": datetime.datetime.now().isoformat()
        }

        data = supabase.table("posts").insert(payload).execute()
        print("✅ Artigo Publicado com Sucesso!")
        print(f"   ID: {data.data[0]['id']}")

    except Exception as e:
        print(f"❌ Erro ao salvar no banco: {e}")

    # --- 5. JOB SCRAPING ---
    from modules.jobs_scraper import JobScraper
    print("\n💼 INICIANDO AUTOMAÇÃO DE VAGAS...")
    try:
        # Fetch existing URLs to prevent duplicates
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


    # --- 6. VIDEO SCRAPING ---
    from modules.video_scraper import VideoScraper
    print("\n🎬 INICIANDO AUTOMAÇÃO DE VÍDEOS...")
    try:
        # Fetch existing URLs to prevent duplicates
        existing_data = supabase.table("videos").select("url").execute()
        existing_urls = [row['url'] for row in existing_data.data] if existing_data.data else []
        print(f"   ℹ️ {len(existing_urls)} vídeos já cadastrados no banco.")

        video_scraper = VideoScraper()
        # Increased limit to ensure we get new content despite filtering
        videos = video_scraper.get_latest_videos(limit=5, existing_urls=existing_urls)
        
        if videos:
            print(f"   Salvando {len(videos)} vídeos no banco...")
            
            # Adapting keys to match likely DB schema
            db_videos = []
            for v in videos:
                db_videos.append({
                    "title": v['title'],
                    "thumbnail": v['thumbnail'], 
                    "url": v['url'],
                    "channel": v['author'],
                    "views": 0, # Int
                    "duration": v['duration'],
                    "published_at": v['published_at'],
                    "tags": ["Tech", "Video"] # Default tags
                })

            data = supabase.table("videos").insert(db_videos).execute()
            print("✅ Vídeos salvos com sucesso!")
    except Exception as e:
            print(f"❌ Erro no módulo de vídeos: {e}")

    print("\n🏁 Pipeline finalizado!")

if __name__ == "__main__":
    main_pipeline()

