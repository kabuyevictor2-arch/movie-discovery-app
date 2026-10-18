import { useEffect, useState } from 'react';
import { Grid, Typography, Box, CircularProgress } from '@mui/material';
import MovieCard from '../components/MovieCard';

export default function GridPage({ title, fetchFunc, isWatchlistPage, watchlistData }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(!isWatchlistPage);

  useEffect(() => {
    if (isWatchlistPage) {
      setItems(watchlistData);
      return;
    }
    const load = async () => {
      const data = await fetchFunc();
      setItems(data);
      setLoading(false);
    };
    load();
  }, [fetchFunc, isWatchlistPage, watchlistData]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>{title}</Typography>
      {items.length === 0 ? (
        <Typography>Nothing here yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {items.map((item) => (
            <Grid item key={item.id}>
              <MovieCard item={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}