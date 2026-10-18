import { Box, Typography } from '@mui/material';
import MovieCard from './MovieCard';

export default function ContentRow({ title, items }) {
  if (!items || items.length === 0) return null;

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', ml: 2, color: 'white' }}>
        {title}
      </Typography>
      <Box sx={{ 
        display: 'flex', 
        overflowX: 'auto', 
        px: 2, 
        pb: 2, 
        '&::-webkit-scrollbar': { display: 'none' } 
      }}>
        {items.map((item) => (
          <MovieCard key={item.id} item={item} />
        ))}
      </Box>
    </Box>
  );
}