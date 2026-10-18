const BASE_URL = 'https://api.themoviedb.org/3';
const TOKEN = import.meta.env.VITE_TMDB_TOKEN?.trim();

const placeholderSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="500" height="750"><rect width="100%" height="100%" fill="#222"/><text x="50%" y="50%" fill="#fff" text-anchor="middle" font-family="sans-serif" font-size="28">No image</text></svg>';
const PLACEHOLDER_IMAGE = `data:image/svg+xml,${encodeURIComponent(placeholderSvg)}`;

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return PLACEHOLDER_IMAGE;
  return `https://image.tmdb.org/t/p/${size}/${path.replace(/^\/+/, '')}`;
};

const request = async (url) => {
  if (!TOKEN) {
    throw new Error('Missing VITE_TMDB_TOKEN. Configure it in your deployment settings or project-root .env file.');
  }

  const res = await fetch(url, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error(`TMDB request failed (${res.status} ${res.statusText})`);
  }

  return res.json();
};

export const fetchTrending = async () => {
  const data = await request(`${BASE_URL}/trending/all/day`);
  return data.results ?? [];
};

export const fetchMovies = async () => {
  const data = await request(`${BASE_URL}/movie/popular`);
  return data.results ?? [];
};

export const fetchTVShows = async () => {
  const data = await request(`${BASE_URL}/tv/popular`);
  return data.results ?? [];
};

export const searchContent = async (query) => {
  const params = new URLSearchParams({ query });
  const data = await request(`${BASE_URL}/search/multi?${params}`);
  return (data.results ?? []).filter(item => item.media_type === 'movie' || item.media_type === 'tv');
};

export const fetchDetails = (type, id) => request(`${BASE_URL}/${type}/${id}`);