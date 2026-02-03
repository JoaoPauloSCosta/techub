# PLAN-backend-automation

> **Goal**: Create a robust backend using Supabase and an automated Python pipeline to populate the Tech Hub blog with news, tutorials, and jobs.

## 1. Context & Architecture (Option A)

We are building a "Headless CMS + Worker" architecture.
- **Database/Auth**: Supabase (Postgres)
- **Frontend**: Nuxt 4 (Existing)
- **Automation Worker**: Python Scripts (Scraping + AI)
- **AI Models**: LLM (Text) + Nano Banana (Images)

## 2. Open Questions (TBD)
> 🛑 **Please review these before we code:**
1.  **Hosting**: Where will the Python script run in production? (Local machine, GitHub Actions, VPS, or Railway?)
2.  **Sources**: Do you have specific target URLs for news/jobs, or should we define generic search terms?
3.  **Frequency**: How often should this run? (e.g., Once a day, every 6 hours?)

## 3. Implementation Phases

### Phase 1: Supabase Foundation 🗄️
Set up the centralized data store.
- [x] Create Supabase Project
- [x] **Table `posts`**: `id`, `title`, `slug`, `content`, `excerpt`, `image_url`, `tags`, `type` (news/tutorial), `created_at`
- [x] **Table `jobs`**: `id`, `title`, `company`, `location`, `salary`, `apply_url`, `created_at`
- [x] **Storage Bucket**: `blog-images` (Public)
- [x] Setup RLS (Row Level Security) policies (Public Read, Service Role Write)

### Phase 2: Python Environment & Scaffolding 🐍
Prepare the automation workspace.
- [x] Create `backend/` directory (separate from `app/`)
- [x] Setup `venv` and `requirements.txt`
    - `supabase`: Database connection
    - `playwright` or `beautifulsoup4`: Scraping
    - `requests`: APIs
    - `openai` or `google-generativeai`: Text Gen
    - `pillow`: Image processing
- [x] Create `config.py` for environment variables (`SUPABASE_URL`, `SUPABASE_KEY`, `NANO_BANANA_KEY`)

### Phase 3: The Automation Pipeline ⚙️
The core logic script (`main.py` driving modules).

#### 3.1 Scraper Module (`modules/scraper.py`)
- [x] **News fetcher**: Scrape predefined tech sites or RSS feeds.
- [ ] **YouTube fetcher**: Use YouTube API or scraping to find trending tech tutorials.
- [ ] **Jobs fetcher**: Scrape job boards for specific tech roles.

#### 3.2 Content Generator (`modules/writer.py`)
- [x] **Summarizer**: Take raw scraped content and generate a unique summary/intro.
- [x] **Article Writer**: Generate full markdown content formatted for the blog.
- [x] **Tagging**: Auto-generate tags based on content.

#### 3.3 Visual Engine (`modules/visuals.py`)
- [x] **Prompt Engineering**: Create an image prompt based on the article title.
- [x] **Nano Banana Integration**: Call the API to generate the image.
- [x] **Optimization**: Resize/Expose using Pillow if needed.
- [x] **Upload**: Helper function to upload file to Supabase Storage and get public URL.

### Phase 4: Integration 🚀
Connecting the worker to the DB and DB to Frontend.
- [ ] **Data Fetching Refactor**:
    - Update `usePosts.ts` to use `useSupabaseClient`.
    - Create sync functions: `fetchPosts()`, `fetchPostBySlug()`.
    - Map Supabase columns (`image_url`) to Frontend types (`image`).
- [ ] **Frontend Update**:
    - Verify `pages/index.vue` displays DB data.
    - Verify `pages/articles/[slug].vue` renders markdown correctly.
- [ ] **Test the full loop**: Run Script -> Data in DB -> Shows on Localhost.

### Phase 5: Complete Automation (Jobs & Videos) 🎥💼
Expand the worker to cover all content types.

#### 5.1 Jobs Automation
- [ ] **Job Scraper**: Implement `modules/jobs_scraper.py` to fetch remote jobs (e.g., using `remoteok` API or `weworkremotely` RSS).
- [ ] **Supabase Sync**: Save jobs to the `jobs` table (ensure schema matches: `title`, `company`, `location`, `salary`, `apply_url`, `tags`).
- [ ] **Frontend**: Update `useJobs.ts` to fetch from Supabase.

#### 5.2 Video Automation
- [ ] **Video Fetcher**: Implement `modules/video_scraper.py` using YouTube RSS feeds (cheaper/easier than API).
- [ ] **Supabase Sync**: Create `videos` table in Supabase (or use `posts` with type='video').
    - Decision: Create separate `videos` table for specific metadata (`video_id`, `channel_name`, `views`).
- [ ] **Frontend**: Update `useVideos.ts` to fetch from Supabase.

#### 5.3 Tutorials
- [ ] **Tagging**: Update `writer.py` to identify if a post is a "Tutorial" based on content (e.g., "How to", "Guide").
- [ ] Ensure specific tutorial sources are in `scraper.py` sources list.

## 4. Execution Order

1.  **Supabase Setup** (Completed)
2.  **Python Script Basic** (Completed)
3.  **Scraping Logic** (Completed)
4.  **AI & Image Integration** (Completed)
5.  **Frontend Hookup** (Completed for Posts)
6.  **Jobs & Videos** (Current Focus)

---
**Status**: IN PROGRESS
**Next Step**: Implement Job Scraper.

