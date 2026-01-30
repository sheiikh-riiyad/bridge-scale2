import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import TerminalIcon from '@mui/icons-material/Terminal';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useEffect, useState, useCallback } from 'react';
import ScaleIcon from '@mui/icons-material/Scale';

export default function Navbar() {
  const [weight, setWeight] = useState('0.00');
  const [scaleStatus, setScaleStatus] = useState('disconnected');
  const [decimalMode, setDecimalMode] = useState(2);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // Scale functions
  const startScale = async () => {
    if (window.electronAPI) {
      try {
        setScaleStatus('connecting');
        const result = await window.electronAPI.startScale();
        console.log('Scale auto result:', result);
        setScaleStatus('connected');
      } catch (error) {
        console.error('Failed to start scale:', error);
        setScaleStatus('error');
      }
    }
  };

  const startScale2Dec = async () => {
    if (window.electronAPI) {
      try {
        setScaleStatus('connecting');
        const result = await window.electronAPI.startScale2Dec();
        console.log('Scale 2dec result:', result);
        setDecimalMode(2);
        setScaleStatus('connected');
      } catch (error) {
        console.error('Failed to start scale 2dec:', error);
        setScaleStatus('error');
      }
    }
  };

  const startScale3Dec = async () => {
    if (window.electronAPI) {
      try {
        setScaleStatus('connecting');
        const result = await window.electronAPI.startScale3Dec();
        console.log('Scale 3dec result:', result);
        setDecimalMode(3);
        setScaleStatus('connected');
      } catch (error) {
        console.error('Failed to start scale 3dec:', error);
        setScaleStatus('error');
      }
    }
  };

  const testDecimalMode = async () => {
    if (window.electronAPI) {
      try {
        const result = await window.electronAPI.testDecimalMode();
        console.log('Test result:', result);
      } catch (error) {
        console.error('Test failed:', error);
      }
    }
  };

  const stopScale = async () => {
    if (window.electronAPI) {
      try {
        const result = await window.electronAPI.stopScale();
        console.log('Scale stop result:', result);
        setScaleStatus('disconnected');
        setWeight('0.00');
      } catch (error) {
        console.error('Failed to stop scale:', error);
      }
    }
  };

  // Create a stable reference to the scale data handler
  const handleScaleData = useCallback((data) => {
    console.log('📦 Scale data received:', data);
    
    // Handle different data formats
    if (typeof data === 'object' && data.weight !== undefined) {
      // Object format: { weight: number, decimalPlaces: number }
      const currentDecimalMode = data.decimalPlaces || decimalMode;
      const formattedWeight = data.weight.toFixed(currentDecimalMode);
      setWeight(formattedWeight);
      if (data.decimalPlaces) {
        setDecimalMode(data.decimalPlaces);
      }
    } else if (typeof data === 'number') {
      // Number format
      const formattedWeight = data.toFixed(decimalMode);
      setWeight(formattedWeight);
    } else {
      // String or other format
      setWeight(String(data));
    }
    
    setScaleStatus('connected');
  }, [decimalMode]);

  // Initialize scale on component mount
  useEffect(() => {
    if (window.electronAPI) {
      console.log('✅ Electron API available');
      
      // Listen for scale data
      window.electronAPI.onScaleData(handleScaleData);
      
      // Auto-start scale with 2 decimal mode (most common)
      startScale2Dec();
      
      // Cleanup function
      return () => {
        if (window.electronAPI && window.electronAPI.removeScaleDataListener) {
          window.electronAPI.removeScaleDataListener(handleScaleData);
        }
      };
    } else {
      console.log('⚠️ Not in Electron environment - using simulated data');
      setScaleStatus('simulated');
      
      // Simulate scale data for development
      const interval = setInterval(() => {
        const simulatedWeight = (Math.random() * 50).toFixed(decimalMode);
        setWeight(simulatedWeight);
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [decimalMode, handleScaleData]); // Add decimalMode and handleScaleData to dependencies

  // Navigation handlers
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  // Menu configurations
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  // Drawer content for mobile navigation
  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '16px'
      }}>
        <Typography variant="h6" component="div">
          Navigation
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        <ListItem button onClick={() => handleNavigation('/')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/settings')}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Setting" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/console')}>
          <ListItemIcon>
            <TerminalIcon />
          </ListItemIcon>
          <ListItemText primary="Console" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/management')}>
          <ListItemIcon>
            <ManageAccountsIcon />
          </ListItemIcon>
          <ListItemText primary="Management" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <Typography variant="subtitle2" sx={{ pl: 2, color: 'text.secondary' }}>
            Scale Control
          </Typography>
        </ListItem>
        <ListItem button onClick={startScale2Dec}>
          <ListItemIcon>
            <ScaleIcon />
          </ListItemIcon>
          <ListItemText primary="Start (2 decimals)" />
        </ListItem>
        <ListItem button onClick={startScale3Dec}>
          <ListItemIcon>
            <ScaleIcon />
          </ListItemIcon>
          <ListItemText primary="Start (3 decimals)" />
        </ListItem>
        <ListItem button onClick={testDecimalMode}>
          <ListItemIcon>
            <ScaleIcon />
          </ListItemIcon>
          <ListItemText primary="Test Mode" />
        </ListItem>
        <ListItem button onClick={stopScale}>
          <ListItemIcon>
            <ScaleIcon />
          </ListItemIcon>
          <ListItemText primary="Stop Scale" />
        </ListItem>
      </List>
    </Box>
  );

  // Status color mapping
  const getStatusColor = () => {
    switch (scaleStatus) {
      case 'connected': return '#4caf50';
      case 'connecting': return '#ff9800';
      case 'error': return '#f44336';
      case 'simulated': return '#9c27b0';
      default: return '#757575';
    }
  };

  // Status text mapping
  const getStatusText = () => {
    switch (scaleStatus) {
      case 'connected': return '⚡ LIVE';
      case 'connecting': return '🔌 CONNECTING';
      case 'error': return '❌ ERROR';
      case 'simulated': return '🎭 SIMULATED';
      default: return '📴 DISCONNECTED';
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Hamburger menu for mobile */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          {/* Logo/Brand name */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() => navigate('/')}
            sx={{ 
              flexGrow: { xs: 1, md: 0 },
              cursor: 'pointer',
              '&:hover': { opacity: 0.8 }
            }}
          >
            Scale Dashboard
          </Typography>
          
          {/* Desktop Navigation */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' },
            ml: 3,
            flexGrow: 1
          }}>
            <Button 
              color="inherit" 
              sx={{ mx: 1 }}
              startIcon={<HomeIcon />}
              onClick={() => navigate('/')}
            >
              Home
            </Button>
            <Button 
              color="inherit" 
              sx={{ mx: 1 }}
              startIcon={<SettingsIcon />}
              onClick={() => navigate('/settings')}
            >
              Setting
            </Button>
            <Button 
              color="inherit" 
              sx={{ mx: 1 }}
              startIcon={<TerminalIcon />}
              onClick={() => navigate('/console')}
            >
              Console
            </Button>
            <Button 
              color="inherit" 
              sx={{ mx: 1 }}
              startIcon={<ManageAccountsIcon />}
              onClick={() => navigate('/management')}
            >
              Management
            </Button>
          </Box>

          {/* Live Weight Display Section */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mr: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: 2,
            px: 2,
            py: 1
          }}>
            {/* Weight Display */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mr: 2
              }}
            >
              <Typography 
                variant="caption" 
                sx={{ 
                  opacity: 0.9, 
                  fontSize: '0.7rem',
                  color: getStatusColor(),
                  fontWeight: 'bold'
                }}
              >
                {getStatusText()}
              </Typography>
              <Box
                sx={{
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  border: `1px solid ${getStatusColor()}50`,
                  fontWeight: 'bold',
                  minWidth: 120,
                  textAlign: 'center',
                  color: getStatusColor(),
                  fontSize: '1.2rem',
                  letterSpacing: '0.5px'
                }}
              >
                {weight} kg
              </Box>
              <Typography variant="caption" sx={{ fontSize: '0.6rem', mt: 0.5, opacity: 0.7 }}>
                {decimalMode} decimal{decimalMode !== 1 ? 's' : ''}
              </Typography>
            </Box>
            
            {/* Scale Control Buttons */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={startScale2Dec}
                  sx={{ 
                    color: decimalMode === 2 ? '#4caf50' : 'white',
                    borderColor: decimalMode === 2 ? '#4caf50' : 'rgba(255,255,255,0.5)',
                    fontSize: '0.7rem',
                    minWidth: 'auto',
                    px: 1,
                    '&:hover': {
                      borderColor: decimalMode === 2 ? '#4caf50' : 'white'
                    }
                  }}
                >
                  2 Dec
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={startScale3Dec}
                  sx={{ 
                    color: decimalMode === 3 ? '#4caf50' : 'white',
                    borderColor: decimalMode === 3 ? '#4caf50' : 'rgba(255,255,255,0.5)',
                    fontSize: '0.7rem',
                    minWidth: 'auto',
                    px: 1,
                    '&:hover': {
                      borderColor: decimalMode === 3 ? '#4caf50' : 'white'
                    }
                  }}
                >
                  3 Dec
                </Button>
              </Box>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={startScale}
                  sx={{ 
                    color: 'white',
                    borderColor: 'rgba(255,255,255,0.5)',
                    fontSize: '0.7rem',
                    minWidth: 'auto',
                    px: 1,
                    '&:hover': {
                      borderColor: 'white'
                    }
                  }}
                >
                  Auto
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={stopScale}
                  sx={{ 
                    color: 'white',
                    borderColor: 'rgba(255,255,255,0.5)',
                    fontSize: '0.7rem',
                    minWidth: 'auto',
                    px: 1,
                    '&:hover': {
                      borderColor: 'white'
                    }
                  }}
                >
                  Stop
                </Button>
              </Box>
            </Box>
          </Box>
          
          {/* Right side icons and menus */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Desktop Icons */}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              {/* <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton> */}
              {/* <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                sx={{ ml: 1 }}
              >
                <AccountCircle />
              </IconButton> */}
            </Box>
            
            {/* Mobile menu button */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Swipeable Drawer for Mobile Navigation */}
      <SwipeableDrawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        onOpen={handleDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 250,
          },
        }}
      >
        {drawer}
      </SwipeableDrawer>
      
      {/* Render menus */}
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}