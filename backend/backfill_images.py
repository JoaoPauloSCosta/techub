import os
import sys
import time

# Add current directory to path so we can import modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from supabase import create_client
from modules.visuals import VisualGenerator
import config

def backfill_images():
    print("🖼️ BACKFILL DE IMAGENS - POSTS ANTERIORES 🖼️")
    print("-" * 50)

    # 1. Conectar ao Supabase
    supabase = create_client(config.SUPABASE_URL, config.SUPABASE_KEY)
    visuals = VisualGenerator()

    # 2. Buscar posts sem imagem ou com placeholder
    print("\n📡 Buscando posts que precisam de imagem...")
    
    # Busca posts onde image_url é nulo, vazio, ou é o placeholder
    result = supabase.table("posts").select("id, title, slug, image_url").execute()
    
    posts_to_update = []
    for post in result.data:
        img = post.get('image_url') or ''
        # Considera "sem imagem" se for nulo, vazio, ou placeholder
        if not img or 'placehold' in img.lower():
            posts_to_update.append(post)
    
    if not posts_to_update:
        print("✅ Todos os posts já possuem imagens válidas!")
        return

    print(f"   Encontrados {len(posts_to_update)} posts precisando de imagem.\n")

    # 3. Gerar e atualizar cada post
    success_count = 0
    for i, post in enumerate(posts_to_update, 1):
        print(f"[{i}/{len(posts_to_update)}] Processando: {post['title'][:50]}...")
        
        try:
            image_url = visuals.generate_and_upload_image(post['title'], post['slug'])
            
            if image_url:
                # Atualiza no banco
                supabase.table("posts").update({"image_url": image_url}).eq("id", post['id']).execute()
                print(f"   ✅ Imagem salva e post atualizado!")
                success_count += 1
            else:
                print(f"   ⚠️ Falha na geração (veja logs acima)")
            
            # Delay para não estourar rate limit
            time.sleep(2)
            
        except Exception as e:
            print(f"   ❌ Erro: {e}")

    print(f"\n🏁 Backfill finalizado! {success_count}/{len(posts_to_update)} imagens geradas.")

if __name__ == "__main__":
    backfill_images()
