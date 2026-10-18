import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { fetchDetails, getImageUrl } from '../services/tmdb';
import { useWatchlist } from '../context/WatchlistContext';

export default function Details() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      const data = await fetchDetails(type, id);
      setDetails(data);
      setLoading(false);
    };
    loadDetails();
  }, [type, id]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
  if (!details) return <Typography sx={{ p: 3 }}>Details not found.</Typography>;

  const title = details.title || details.name;
  const inWatchlist = isInWatchlist(details.id);

  return (
    <Box sx={{ p: { xs: 2, md: 5 }, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ alignSelf: 'flex-start', mb: 2, display: { md: 'none' } }}>
        Back
      </Button>
      
      <Box sx={{ flex: 1, maxWidth: 400 }}>
        <img src={getImageUrl(details.poster_path, 'w500')} alt={title} style={{ width: '100%', borderRadius: 8 }} />
      </Box>

      <Box sx={{ flex: 2 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2, display: { xs: 'none', md: 'flex' } }}>
          Back
        </Button>
        
        <Typography variant="h3" fontWeight="bold" gutterBottom>{title}</Typography>
        
        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Chip label={`Rating: ${details.vote_average?.toFixed(1)}/10`} color="primary" />
          <Chip label={`Release: ${details.release_date || details.first_air_date || 'N/A'}`} />
        </Box>

        <Typography variant="h6" sx={{ mt: 3 }}>Overview</Typography>
        <Typography variant="body1" paragraph>{details.overview || "No overview available."}</Typography>

        <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap' }}>
          {details.genres?.map(g => <Chip key={g.id} label={g.name} variant="outlined" />)}
        </Box>

        <Button 
          variant="contained" 
          sx={{ mt: 4, px: 4, py: 1.5 }}
          color={inWatchlist ? "error" : "primary"}
          onClick={() => inWatchlist ? removeFromWatchlist(details.id) : addToWatchlist({ ...details, media_type: type })}
        >
          {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        </Button>
      </Box>
    </Box>
  );
}