import { useEffect, useState } from 'react';
import { Box, CircularProgress, Alert } from '@mui/material';
import { fetchTrending, fetchMovies, fetchTVShows } from '../services/tmdb';
import ContentRow from '../components/ContentRow';

export default function Home() {
  const [data, setData] = useState({ trending: [], movies: [], tv: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [trending, movies, tv] = await Promise.all([
          fetchTrending(), fetchMovies(), fetchTVShows()
        ]);
        setData({ trending, movies, tv });
      } catch (err) {
        setError("Failed to fetch data. Check your API key.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

  return (
    <Box sx={{ py: 3 }}>
      <ContentRow title="Trending Today" items={data.trending} />
      <ContentRow title="Popular Movies" items={data.movies} />
      <ContentRow title="Popular TV Shows" items={data.tv} />
    </Box>
  );
}