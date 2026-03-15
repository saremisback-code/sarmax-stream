const YOUTUBE_API_KEY = 'AIzaSyAt5iYYiu4wUAlqEnA22xhgHMIBq488_e4';

export interface YouTubeSearchResult {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: string;
}

export async function searchYouTube(query: string): Promise<YouTubeSearchResult[]> {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&type=video&videoCategoryId=10&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}`
  );
  const data = await res.json();

  if (!data.items) return [];

  const videoIds = data.items.map((item: any) => item.id.videoId).join(',');

  // Get durations
  const detailsRes = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds}&key=${YOUTUBE_API_KEY}`
  );
  const detailsData = await detailsRes.json();

  return (detailsData.items || []).map((item: any) => ({
    id: item.id,
    title: cleanTitle(item.snippet.title),
    artist: item.snippet.channelTitle.replace(/ - Topic$/, '').replace(/VEVO$/i, ''),
    thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
    duration: parseDuration(item.contentDetails.duration),
  }));
}

export async function getTrendingMusic(): Promise<YouTubeSearchResult[]> {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=mostPopular&videoCategoryId=10&maxResults=20&regionCode=US&key=${YOUTUBE_API_KEY}`
  );
  const data = await res.json();

  return (data.items || []).map((item: any) => ({
    id: item.id,
    title: cleanTitle(item.snippet.title),
    artist: item.snippet.channelTitle.replace(/ - Topic$/, '').replace(/VEVO$/i, ''),
    thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
    duration: parseDuration(item.contentDetails.duration),
  }));
}

function cleanTitle(title: string): string {
  return title
    .replace(/\(Official\s*(Music\s*)?Video\)/gi, '')
    .replace(/\[Official\s*(Music\s*)?Video\]/gi, '')
    .replace(/\(Official\s*Audio\)/gi, '')
    .replace(/\[Official\s*Audio\]/gi, '')
    .replace(/\(Lyrics?\)/gi, '')
    .replace(/\[Lyrics?\]/gi, '')
    .replace(/\(Visualizer\)/gi, '')
    .replace(/\|.*$/g, '')
    .replace(/ft\.\s*/gi, 'ft. ')
    .trim();
}

function parseDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '0:00';
  const h = parseInt(match[1] || '0');
  const m = parseInt(match[2] || '0');
  const s = parseInt(match[3] || '0');
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
