from modules.jobs_scraper import JobScraper
import json

def test_scraper():
    print("🚀 Iniciando teste do JobScraper...")
    scraper = JobScraper()
    
    # Fetch jobs (limit 5 per source effectively)
    jobs = scraper.get_latest_jobs(limit=20)
    
    print(f"\n✨ Total de vagas encontradas: {len(jobs)}")
    
    if jobs:
        print("\n🔍 Exemplo das 3 primeiras vagas:")
        for job in jobs[:3]:
            print(json.dumps(job, indent=2, ensure_ascii=False))
            
        print("\n📊 Distribuição por fonte (estimada):")
        sources = {}
        for job in jobs:
            # Heurística simples baseada na URL para identificar a fonte
            if "vuejobs" in job['apply_url']: src = "VueJobs"
            elif "weworkremotely" in job['apply_url']: src = "WeWorkRemotely"
            elif "remote.co" in job['apply_url']: src = "Remote.co"
            elif "python.org" in job['apply_url']: src = "Python.org"
            elif "remoteok" in job['apply_url'] or "remoteok" in str(job).lower(): src = "RemoteOK"
            elif "howdylatam" in job['apply_url']: src = "Howdy Latam"
            else: src = "Outro"
            
            sources[src] = sources.get(src, 0) + 1
            
        for src, count in sources.items():
            print(f"   - {src}: {count}")

if __name__ == "__main__":
    test_scraper()
