from modules.video_scraper import VideoScraper

def test_scraper():
    print("Testing Video Scraper with new channels...")
    scraper = VideoScraper()
    # Print channels to verify they are loaded
    print("Channels loaded:")
    for ch in scraper.channels:
        print(f" - {ch['name']} ({ch['id']})")

    # Fetch videos (limit 1 per channel to be quick)
    print("\nFetching videos...")
    try:
        videos = scraper.get_latest_videos(limit=1)
        print(f"\nSuccessfully fetched {len(videos)} videos.")
        for v in videos:
            print(f" - [{v['author']}] {v['title']}")
    except Exception as e:
        print(f"Error fetching videos: {e}")

if __name__ == "__main__":
    test_scraper()
