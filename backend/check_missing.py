"""Quick check: artigos que ainda possuem placeholder."""
from supabase import create_client
import config

sb = create_client(config.SUPABASE_URL, config.SUPABASE_KEY)
r = sb.table("posts").select("id, title, slug, image_url").like("image_url", "%placehold%").execute()

print(f"\nArtigos com placeholder: {len(r.data)}")
for p in r.data:
    print(f"  ID: {p['id']} | {p['title']}")
    print(f"    image_url: {p['image_url']}")

if not r.data:
    print("✅ Nenhum artigo com placeholder encontrado!")
