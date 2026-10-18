import { useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, IconButton, Box, TextField, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:900px)');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery('');
      setMobileOpen(false);
    }
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Movies', path: '/movies' },
    { text: 'TV Shows', path: '/tv' },
    { text: 'My Watchlist', path: '/watchlist' },
  ];

  const drawerContent = (
    <Box onClick={() => setMobileOpen(false)}>
      <Toolbar>
        <Typography variant="h6" color="primary" fontWeight="bold">MovieBox</Typography>
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} component={Link} to={item.path}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', bgcolor: '#141414', minHeight: '100vh', color: 'white' }}>
      {/* Top Bar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#1f1f1f' }}>
        <Toolbar>
          {isMobile && (
            <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(!mobileOpen)} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#e50914', fontWeight: 'bold' }}>
            MovieBox
          </Typography>
          <Box component="form" onSubmit={handleSearch}>
            <TextField
              size="small"
              placeholder="Search movies or TV..."
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ 
                bgcolor: 'white', borderRadius: 1, 
                input: { color: 'black' },
                width: { xs: 150, sm: 250 }
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={() => setMobileOpen(false)}
          sx={{
            '& .MuiDrawer-paper': { 
              width: drawerWidth, boxSizing: 'border-box', bgcolor: '#1f1f1f', color: 'white' 
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 0, width: { sm: `calc(100% - ${drawerWidth}px)` }, mt: 8 }}>
        <Outlet />
      </Box>
    </Box>
  );
}