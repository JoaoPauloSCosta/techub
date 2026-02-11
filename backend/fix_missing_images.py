"""
fix_missing_images.py
---------------------
Encontra artigos no Supabase que ficaram sem imagem (placeholder)
e gera novas imagens via Gemini (Nano Banana), fazendo upload
para o Supabase Storage e atualizando o registro.

Uso: python backend/fix_missing_images.py
"""

import sys
import time
from supabase import create_client
import config
from modules.visuals import VisualGenerator

PLACEHOLDER = "https://placehold.co/1200x630?text=TechHub"


def find_posts_without_image(supabase):
    """Busca posts que possuem a imagem placeholder ou sem imagem."""
    print("🔍 Buscando artigos sem imagem no banco de dados...")

    result = supabase.table("posts").select("id, title, slug, image_url").execute()

    if not result.data:
        print("   Nenhum artigo encontrado no banco.")
        return []

    missing = []
    for post in result.data:
        img = post.get("image_url") or ""
        if not img or img == PLACEHOLDER or "placehold" in img.lower():
            missing.append(post)

    return missing


def fix_images(supabase, posts, visuals):
    """Gera e faz upload de imagem para cada post sem imagem."""
    success = 0
    failed = 0

    for i, post in enumerate(posts, 1):
        print(f"\n{'='*60}")
        print(f"[{i}/{len(posts)}] 📝 {post['title']}")
        print(f"   Slug: {post['slug']}")
        print(f"   Imagem atual: {post.get('image_url', 'NENHUMA')}")

        image_url = visuals.generate_and_upload_image(post["title"], post["slug"])

        if image_url:
            supabase.table("posts").update({"image_url": image_url}).eq("id", post["id"]).execute()
            print(f"   ✅ Atualizado no banco: {image_url}")
            success += 1
        else:
            print(f"   ❌ Falha ao gerar imagem para: {post['title']}")
            failed += 1

        # Pequeno delay para não sobrecarregar a API
        if i < len(posts):
            print("   ⏳ Aguardando 3s antes do próximo...")
            time.sleep(3)

    return success, failed


def main():
    print("🚀 Fix Missing Images - TechHub")
    print("=" * 60)

    supabase = create_client(config.SUPABASE_URL, config.SUPABASE_KEY)
    visuals = VisualGenerator()

    if not visuals.client:
        print("❌ NANO_BANANA_KEY não configurada. Impossível gerar imagens.")
        sys.exit(1)

    posts = find_posts_without_image(supabase)

    if not posts:
        print("\n✅ Todos os artigos já possuem imagem! Nada a fazer.")
        return

    print(f"\n📊 Encontrados {len(posts)} artigo(s) sem imagem:")
    for p in posts:
        print(f"   • {p['title']}")

    print(f"\n🎨 Iniciando geração de imagens...")
    success, failed = fix_images(supabase, posts, visuals)

    print(f"\n{'='*60}")
    print(f"🏁 RESULTADO FINAL:")
    print(f"   ✅ Sucesso: {success}")
    print(f"   ❌ Falha:   {failed}")
    print(f"   📊 Total:   {len(posts)}")


if __name__ == "__main__":
    main()
