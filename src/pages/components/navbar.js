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


export default function Navbar() {
  const [weight, setWeight] = useState('0');
  const [scaleStatus, setScaleStatus] = useState('disconnected');
  const [decimalMode, setDecimalMode] = useState(2);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [updateState, setUpdateState] = useState('idle');
  const [updateInfo, setUpdateInfo] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [updatePercent, setUpdatePercent] = useState(0);
  const [updateMenuAnchorEl, setUpdateMenuAnchorEl] = useState(null);

  const isUpdateMenuOpen = Boolean(updateMenuAnchorEl);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // Scale functions
  

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

  // Update handling
  useEffect(() => {
    if (!window.electronAPI || !window.electronAPI.onUpdateStatus) {
      return;
    }

    window.electronAPI.onUpdateStatus((payload) => {
      if (!payload || !payload.state) {
        return;
      }

      setUpdateState(payload.state);
      if (payload.state === 'available' || payload.state === 'downloaded') {
        setUpdateInfo(payload.info || null);
      }
      if (payload.state === 'error') {
        setUpdateError(payload.message || 'Update error');
      }
      if (payload.state === 'downloading') {
        setUpdatePercent(Number(payload.percent || 0));
      }
    });
  }, []);

  const handleUpdateMenuOpen = (event) => {
    setUpdateMenuAnchorEl(event.currentTarget);
  };

  const handleUpdateMenuClose = () => {
    setUpdateMenuAnchorEl(null);
  };

  const handleCheckUpdates = async () => {
    if (window.electronAPI?.checkForUpdates) {
      await window.electronAPI.checkForUpdates();
    }
  };

  const handleDownloadUpdate = async () => {
    if (window.electronAPI?.downloadUpdate) {
      await window.electronAPI.downloadUpdate();
    }
  };

  const handleInstallUpdate = () => {
    if (window.electronAPI?.quitAndInstallUpdate) {
      window.electronAPI.quitAndInstallUpdate();
    }
  };

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
            // onClick={() => navigate('/')}
            sx={{ 
              flexGrow: { xs: 1, md: 0 },
              // cursor: 'pointer',
              '&:hover': { opacity: 0.8 }
            }}
          >
            THE TERMINAL
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
            
            
            
            
          }}>
            {/* Weight Display */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                
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
                {/* {getStatusText()} */}
              </Typography>
              <Box
                sx={{
                 
                  
                  borderRadius: 2.5,
                  backgroundColor: 'rgba(247, 241, 238, 0.18)',
                  border: `2px solid`,
                  fontWeight: 1000,
                  minWidth: 200,
                  textAlign: 'center',
                  color: "black",
                  fontSize: '50px',
                  letterSpacing: '1px',
                  boxShadow: `0 0 18px `
                }}
              >
                {weight} kg
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
              <IconButton
                size="large"
                aria-label="show update notifications"
                color="inherit"
                onClick={handleUpdateMenuOpen}
              >
                <Badge
                  variant={updateState === 'available' || updateState === 'downloaded' ? 'dot' : 'standard'}
                  color="error"
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
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

      <Menu
        anchorEl={updateMenuAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isUpdateMenuOpen}
        onClose={handleUpdateMenuClose}
      >
        <MenuItem disabled>
          <Typography variant="subtitle2">App Updates</Typography>
        </MenuItem>
        <Divider />
        {updateState === 'available' && (
          <MenuItem disabled>
            <Typography variant="body2">
              Update available {updateInfo?.version ? `(${updateInfo.version})` : ''}
            </Typography>
          </MenuItem>
        )}
        {updateState === 'downloading' && (
          <MenuItem disabled>
            <Typography variant="body2">
              Downloading... {updatePercent.toFixed(0)}%
            </Typography>
          </MenuItem>
        )}
        {updateState === 'downloaded' && (
          <MenuItem disabled>
            <Typography variant="body2">
              Update downloaded. Restart to install.
            </Typography>
          </MenuItem>
        )}
        {updateState === 'none' && (
          <MenuItem disabled>
            <Typography variant="body2">No updates available.</Typography>
          </MenuItem>
        )}
        {updateState === 'error' && (
          <MenuItem disabled>
            <Typography variant="body2">{updateError}</Typography>
          </MenuItem>
        )}

        <MenuItem onClick={handleCheckUpdates}>
          <Typography variant="body2">Check for updates</Typography>
        </MenuItem>
        {updateState === 'available' && (
          <MenuItem onClick={handleDownloadUpdate}>
            <Typography variant="body2">Download update</Typography>
          </MenuItem>
        )}
        {updateState === 'downloaded' && (
          <MenuItem onClick={handleInstallUpdate}>
            <Typography variant="body2">Install & restart</Typography>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
}
