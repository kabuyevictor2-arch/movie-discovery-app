import { Card, CardMedia, CardContent, Typography, IconButton, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext';
import { getImageUrl } from '../services/tmdb';

export default function MovieCard({ item }) {
  const navigate = useNavigate();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  
  const title = item.title || item.name || 'Untitled';
  const type = item.media_type || (item.first_air_date ? 'tv' : 'movie');
  const inWatchlist = isInWatchlist(item.id);

  const handleWatchlistToggle = (e) => {
    e.stopPropagation(); 
    if (inWatchlist) {
      removeFromWatchlist(item.id);
    } else {
      addToWatchlist({ ...item, media_type: type });
    }
  };

  return (
    <Card 
      sx={{ 
        width: 160, 
        minWidth: 160,
        m: 1, 
        cursor: 'pointer', 
        position: 'relative',
        transition: 'transform 0.2s',
        '&:hover': { transform: 'scale(1.05)' } 
      }}
      onClick={() => navigate(`/details/${type}/${item.id}`)}
    >
      <CardMedia
        component="img"
        height="240"
        image={getImageUrl(item.poster_path)}
        alt={title}
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = getImageUrl(null);
        }}
      />
      <Box sx={{ position: 'absolute', top: 5, right: 5 }}>
        <IconButton onClick={handleWatchlistToggle} sx={{ bgcolor: 'rgba(0,0,0,0.6)', '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' } }}>
          {inWatchlist ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon sx={{ color: 'white' }} />}
        </IconButton>
      </Box>
      <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
        <Typography variant="body2" noWrap fontWeight="bold">{title}</Typography>
        <Typography variant="caption" color="text.secondary">
          {type.toUpperCase()}
        </Typography>
      </CardContent>
    </Card>
  );
}