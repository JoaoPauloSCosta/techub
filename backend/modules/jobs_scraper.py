import requests
import datetime
import random

class JobScraper:
    def __init__(self):
        # Using RemoteOK API as a source for tech jobs
        # They allow fetching jobs as JSON
        self.api_url = "https://remoteok.com/api?tag=dev"
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }

    def get_latest_jobs(self, limit=5, existing_urls=[]):
        """
        Fetches latest jobs from RemoteOK API and formats them for our database.
        """
        print(f"💼 Buscando vagas de: {self.api_url} ...")
        
        try:
            response = requests.get(self.api_url, headers=self.headers, timeout=10)
            if response.status_code != 200:
                print(f"⚠️ Erro ao acessar API de vagas: {response.status_code}")
                return []

            data = response.json()
            # RemoteOK data is a list; first item is legal/metadata usually, so skip it if needed
            # Or filter strictly for valid items
            
            jobs = []
            count = 0
            
            for item in data:
                if count >= limit:
                    break
                    
                # Skip the "legal" text block if present
                if 'legal' in item:
                    continue
                
                # Format to our "jobs" table schema
                # required: title, company, location, salary, apply_url, created_at
                # tags can be derived
                
                apply_url = item.get('apply_url') or item.get('url')

                # Check duplication
                if apply_url in existing_urls:
                    print(f"   ⚠️ Vaga duplicada ignorada: {item.get('position', 'Vaga')}")
                    continue

                job = {
                    "title": item.get('position', 'Vaga Tech'),
                    "company": item.get('company', 'Empresa Confidencial'),
                    "location": item.get('location', 'Remoto'),
                    "salary": self._format_salary(item),
                    "apply_url": apply_url,
                    "tags": item.get('tags', []),
                    "created_at": item.get('date', datetime.datetime.now().isoformat())
                }
                
                jobs.append(job)
                count += 1
                
            print(f"✅ {len(jobs)} vagas processadas.")
            return jobs

        except Exception as e:
            print(f"❌ Erro ao buscar vagas: {e}")
            return []

    def _format_salary(self, item):
        # RemoteOK usually puts salary in raw range like "$60k - $100k"
        # If missing, we can assume "A combinar" or omit
        salary_min = item.get('salary_min')
        salary_max = item.get('salary_max')
        
        if salary_min and salary_max:
             return f"${salary_min/1000}k - ${salary_max/1000}k" # approximated
        
        # Fallback to text description if available or generic
        return "R$ Competitive" 
