import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Grid } from '@mui/material';
import { searchContent } from '../services/tmdb';
import MovieCard from '../components/MovieCard';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    const doSearch = async () => {
      setLoading(true);
      const data = await searchContent(query);
      setResults(data);
      setLoading(false);
    };
    doSearch();
  }, [query]);

  if (!query) return <Typography sx={{ p: 3 }}>Type something in the search bar above.</Typography>;
  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Results for "{query}"</Typography>
      {results.length === 0 ? (
        <Typography>No results found.</Typography>
      ) : (
        <Grid container spacing={2}>
          {results.map((item) => (
            <Grid item key={item.id}>
              <MovieCard item={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}