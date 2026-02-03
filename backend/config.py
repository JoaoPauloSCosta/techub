import os
from dotenv import load_dotenv

load_dotenv()

# Helper function to safely get and clean env vars
def get_env(key):
    val = os.getenv(key)
    return val.strip() if val else None

SUPABASE_URL = get_env("SUPABASE_URL")
SUPABASE_KEY = get_env("SUPABASE_KEY")
NANO_BANANA_KEY = get_env("NANO_BANANA_KEY") # Chave do Gemini/Nano Banana

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError(
        "❌ Erro de Configuração: SUPABASE_URL ou SUPABASE_KEY não encontrados no arquvio .env."
    )
