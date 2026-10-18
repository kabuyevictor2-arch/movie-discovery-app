import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { WatchlistProvider, useWatchlist } from './context/WatchlistContext';
import { fetchMovies, fetchTVShows } from './services/tmdb';
import Layout from './components/Layout';
import Home from './pages/Home';
import Search from './pages/Search';
import Details from './pages/Details';
import GridPage from './pages/GridPage';

const darkTheme = createTheme({
  palette: { mode: 'dark', primary: { main: '#e50914' } },
});

function AppRoutes() {
  const { watchlist } = useWatchlist();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="details/:type/:id" element={<Details />} />
        <Route path="movies" element={<GridPage title="Popular Movies" fetchFunc={fetchMovies} />} />
        <Route path="tv" element={<GridPage title="Popular TV Shows" fetchFunc={fetchTVShows} />} />
        <Route path="watchlist" element={<GridPage title="My Watchlist" isWatchlistPage={true} watchlistData={watchlist} />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <WatchlistProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </WatchlistProvider>
    </ThemeProvider>
  );
}