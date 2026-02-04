import os
import sys

# Add current directory to path so we can import modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from modules.visuals import VisualGenerator
import config

def test_nano_banana():
    print("🍌 TESTE DO NANO BANANA (GEMINI IMAGE GEN) 🍌")
    print("-" * 50)

    # 1. Verifica Config
    print(f"🔑 Verificando Chaves:")
    if config.NANO_BANANA_KEY:
        print(f"   [OK] NANO_BANANA_KEY encontrada (Inicia com: {config.NANO_BANANA_KEY[:4]}...)")
    else:
        print(f"   [ERRO] NANO_BANANA_KEY não encontrada!")
        return

    if config.SUPABASE_URL and config.SUPABASE_KEY:
         print(f"   [OK] Supabase Configurada")
    else:
        print(f"   [ERRO] Falha na config do Supabase")
        return

    # 2. Inicializa Gerador
    print("\n🚀 Inicializando VisualGenerator...")
    try:
        visuals = VisualGenerator()
    except Exception as e:
        print(f"   [ERRO] Falha ao iniciar VisualGenerator: {e}")
        return

    # 3. Tenta gerar imagem
    print("\n🎨 Tentando gerar imagem de teste...")
    test_title = "Teste de Conexão Nano Banana"
    test_slug = "teste-nano-banana-debug"
    
    try:
        image_url = visuals.generate_and_upload_image(test_title, test_slug)
        
        if image_url:
            print("\n✅ SUCESSO! Imagem gerada e salva.")
            print(f"🔗 URL: {image_url}")
            print("\n👉 Abra o link acima no navegador para confirmar se a imagem carrega.")
        else:
            print("\n❌ FALHA: A função retornou None. Verifique os logs acima para o erro específico.")
            
    except Exception as e:
        print(f"\n❌ ERRO CRÍTICO na execução: {e}")

if __name__ == "__main__":
    test_nano_banana()
