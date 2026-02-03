from google import genai
from google.genai import types
from PIL import Image
import os
import io
import config
from supabase import create_client

class VisualGenerator:
    def __init__(self):
        if not config.NANO_BANANA_KEY:
            print("⚠️ AVISO: NANO_BANANA_KEY não encontrada. Geração de imagem desativada.")
            self.client = None
        else:
            self.client = genai.Client(api_key=config.NANO_BANANA_KEY)
        
        self.supabase = create_client(config.SUPABASE_URL, config.SUPABASE_KEY)
        self.bucket = "blog-images"

    def generate_and_upload_image(self, title, slug):
        """
        Generates an image via Gemini 2.5 (Nano Banana), saves to buffer,
        uploads to Supabase Storage, and returns public URL.
        """
        if not self.client:
            return None

        print(f"🎨 Gerando imagem para: '{title}'...")
        
        # Engenharia de Prompt para Capa de Blog Tech
        prompt = (
            f"Create a high quality, modern, abstract tech blog header image for an article titled '{title}'. "
            "Style: Digital art, vibrant colors, futuristic, minimal, gradient lighting, 4k. "
            "No text overlays."
        )

        try:
            response = self.client.models.generate_content(
                model="gemini-2.5-flash-image",
                contents=[prompt],
            )

            generated_image = None
            for part in response.parts:
                if part.inline_data is not None:
                    generated_image = part.as_image()
                    break
            
            if not generated_image:
                print("❌ Nenhuma imagem retornada pelo modelo.")
                return None

            # Convert PIL Image to Bytes
            img_byte_arr = io.BytesIO()
            generated_image.save(img_byte_arr, format='PNG')
            img_byte_arr = img_byte_arr.getvalue()

            # Upload to Supabase
            file_path = f"{slug}.png"
            print(f"☁️ Enviando imagem para Supabase Storage: {file_path}...")
            
            # Tenta remover anterior se existir (opcional, mas evita erro de duplicata)
            # self.supabase.storage.from_(self.bucket).remove([file_path]) 

            self.supabase.storage.from_(self.bucket).upload(
                path=file_path,
                file=img_byte_arr,
                file_options={"content-type": "image/png", "upsert": "true"}
            )

            # Get Public URL
            public_url = self.supabase.storage.from_(self.bucket).get_public_url(file_path)
            print(f"✅ Imagem salva: {public_url}")
            return public_url

        except Exception as e:
            print(f"❌ Erro na geração/upload de imagem: {e}")
            return None
