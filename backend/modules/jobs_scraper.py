import requests
import datetime
import random
import re
import feedparser
from dateutil import parser as date_parser
import time

class JobScraper:
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        # RSS/Atom Feeds to scrape
        self.rss_sources = [
            {
                "name": "VueJobs",
                "url": "https://vuejobs.com/feed",
                "tags": ["Vue.js", "Frontend"]
            },
            {
                "name": "WeWorkRemotely", 
                "url": "https://weworkremotely.com/categories/remote-programming-jobs.rss",
                "tags": ["Remote"]
            },
            {
                "name": "Remote.co",
                "url": "https://remote.co/feed/",
                "tags": ["Remote"]
            },
            {
                "name": "Python.org",
                "url": "https://www.python.org/jobs/feed/rss/",
                "tags": ["Python", "Backend"]
            }
        ]

    def get_latest_jobs(self, limit=20, existing_urls=[]):
        """
        Aggregates jobs from multiple sources: RemoteOK API + RSS Feeds
        """
        all_jobs = []
        
        # 1. Fetch from RemoteOK API (JSON)
        print("🌍 Buscando RemoteOK...")
        all_jobs.extend(self._fetch_remoteok(limit=5))
        
        # 2. Fetch from Howdy Latam (HTML Scraping)
        print("🌎 Buscando Howdy Latam...")
        all_jobs.extend(self._fetch_howdy_latam(limit=10))
        
        # 3. Fetch from RSS Feeds
        for source in self.rss_sources:
            print(f"📡 Buscando {source['name']} RSS...")
            feed_jobs = self._fetch_rss(source, limit=5)
            all_jobs.extend(feed_jobs)
            
        # Deduplication
        unique_jobs = []
        seen_urls = set(existing_urls)
        
        for job in all_jobs:
            if job['apply_url'] not in seen_urls:
                unique_jobs.append(job)
                seen_urls.add(job['apply_url'])
                
        # Sort by date (newest first)
        unique_jobs.sort(key=lambda x: x['created_at'], reverse=True)
        
        print(f"✅ Total processado: {len(unique_jobs)} vagas novas.")
        return unique_jobs[:limit]

    def _fetch_remoteok(self, limit=5):
        try:
            url = "https://remoteok.com/api?tag=dev"
            response = requests.get(url, headers=self.headers, timeout=10)
            if response.status_code != 200:
                print(f"   ⚠️ RemoteOK falhou: {response.status_code}")
                return []
                
            data = response.json()
            jobs = []
            count = 0
            
            for item in data:
                if count >= limit: break
                if 'legal' in item: continue
                
                job = {
                    "title": item.get('position', 'Vaga Tech'),
                    "company": item.get('company', 'N/A'),
                    "location": item.get('location', 'Remoto'),
                    "salary": self._format_salary(item.get('salary_min'), item.get('salary_max')),
                    "apply_url": item.get('apply_url') or item.get('url'),
                    "tags": item.get('tags', []),
                    "created_at": item.get('date', datetime.datetime.now().isoformat())
                }
                jobs.append(job)
                count += 1
            return jobs
        except Exception as e:
            print(f"   ❌ Erro RemoteOK: {e}")
            return []

    def _fetch_rss(self, source, limit=5):
        try:
            # Fetch with requests to ensure timeout and headers
            response = requests.get(source['url'], headers=self.headers, timeout=10)
            if response.status_code != 200:
                print(f"   ⚠️ Falha ao acessar feed {source['name']}: {response.status_code}")
                return []
                
            feed = feedparser.parse(response.content)
            jobs = []
            count = 0
            
            for entry in feed.entries:
                if count >= limit: break
                
                # Extract basic info
                title = entry.get('title', 'Vaga Sem Título')
                link = entry.get('link', '')
                published = entry.get('published', datetime.datetime.now().isoformat())
                
                # Attempt to parse date
                try:
                    dt = date_parser.parse(published)
                    published_iso = dt.isoformat()
                except:
                    published_iso = datetime.datetime.now().isoformat()
                
                # Guess company from title "Company: Title" or similar if needed
                company = "N/A"
                if ':' in title:
                    parts = title.split(':')
                    company = parts[0].strip()
                    title = ":".join(parts[1:]).strip()
                elif '-' in title:
                    parts = title.split('-')
                    # Heuristic: usually "Title - Company" or "Company - Title"
                    # We'll assume Title search
                    pass
                    
                job = {
                    "title": title,
                    "company": company,
                    "location": "Remoto" if "remote" in source['tags'] else "Global",
                    "salary": "A combinar",
                    "apply_url": link,
                    "tags": source['tags'], # Inherit source tags
                    "created_at": published_iso
                }
                
                jobs.append(job)
                count += 1
                
            return jobs
        except Exception as e:
            print(f"   ❌ Erro {source['name']}: {e}")
            return []

    def _fetch_howdy_latam(self, limit=10):
        """Scrapes job listings from Howdy Latam opportunities page."""
        try:
            url = "https://www.howdylatam.com/oportunidades"
            response = requests.get(url, headers=self.headers, timeout=15)
            if response.status_code != 200:
                print(f"   ⚠️ Howdy Latam falhou: {response.status_code}")
                return []

            html = response.text
            # Extract all job links: /oportunidades/{slug}
            raw_links = re.findall(
                r'/oportunidades/([a-z0-9][a-z0-9\-]+[a-z0-9])(?="|\?)',
                html, re.IGNORECASE
            )

            # Deduplicate while preserving order
            seen = set()
            slugs = []
            for slug in raw_links:
                if slug not in seen:
                    seen.add(slug)
                    slugs.append(slug)

            jobs = []
            for slug in slugs:
                if len(jobs) >= limit:
                    break

                title, location = self._parse_howdy_slug(slug)
                if not title:
                    continue

                job = {
                    "title": title,
                    "company": "Howdy Latam",
                    "location": location,
                    "salary": "A combinar",
                    "apply_url": f"https://www.howdylatam.com/oportunidades/{slug}",
                    "tags": self._infer_tags(title),
                    "created_at": datetime.datetime.now().isoformat()
                }
                jobs.append(job)

            return jobs
        except Exception as e:
            print(f"   ❌ Erro Howdy Latam: {e}")
            return []

    def _parse_howdy_slug(self, slug):
        """Parses a Howdy Latam URL slug into (title, location)."""
        # Remove Salesforce ID suffix (e.g. a1ZTQ00000JH6se2AD)
        cleaned = re.sub(r'-a1Z[A-Za-z0-9]+$', '', slug)
        if not cleaned:
            return None, None

        # Known location patterns at the end of slugs
        location = "Remoto"
        location_match = re.search(
            r'-((?:guadalajara|bogota|cdmx|mexico-city|medellin|lima|'
            r'santiago|buenos-aires|montevideo|sao-paulo|remote)'
            r'(?:---?(?:mx|co|br|ar|uy|pe|cl|mex))?)$',
            cleaned, re.IGNORECASE
        )
        if location_match:
            raw_loc = location_match.group(1)
            cleaned = cleaned[:location_match.start()]
            # Format location nicely
            location = raw_loc.replace('---', ', ').replace('-', ' ').title()

        title = cleaned.replace('-', ' ').strip().title()
        return title, location

    def _infer_tags(self, title):
        """Infers technology tags from a job title."""
        tag_map = {
            'golang': 'Go', 'go ': 'Go', 'python': 'Python',
            'node': 'Node.js', 'nodejs': 'Node.js',
            'react': 'React', 'reactjs': 'React',
            'vue': 'Vue.js', 'angular': 'Angular',
            'java': 'Java', 'kotlin': 'Kotlin',
            'devops': 'DevOps', 'sre': 'DevOps',
            'data': 'Data', 'machine learning': 'ML',
            'fullstack': 'Full Stack', 'full stack': 'Full Stack',
            'frontend': 'Frontend', 'front end': 'Frontend',
            'backend': 'Backend', 'back end': 'Backend',
            'qa': 'QA', 'quality': 'QA', 'testing': 'QA',
            'ios': 'iOS', 'swift': 'iOS',
            'android': 'Android',
            'aws': 'AWS', 'cloud': 'Cloud',
            'typescript': 'TypeScript',
        }
        title_lower = title.lower()
        tags = []
        seen = set()
        for keyword, tag in tag_map.items():
            if keyword in title_lower and tag not in seen:
                tags.append(tag)
                seen.add(tag)
        return tags if tags else ['Tech']

    def _format_salary(self, min_sal, max_sal):
        if not min_sal or not max_sal:
            return "A combinar"
        return f"${min_sal/1000}k - ${max_sal/1000}k"
