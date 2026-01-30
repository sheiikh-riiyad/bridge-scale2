import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Avatar,
  InputAdornment,
  LinearProgress,
  Tooltip,
  Fade,
  Drawer,
  Badge,
  Snackbar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ScaleIcon from '@mui/icons-material/Scale';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';
import FactoryIcon from '@mui/icons-material/Factory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { styled } from '@mui/material/styles';

// Custom styled components with compact styling
const ScaleCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%)',
  color: 'white',
  borderRadius: '16px',
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)',
  position: 'relative',
  overflow: 'visible',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: 'linear-gradient(45deg, #00bcd4, #2196f3, #3f51b5)',
    borderRadius: '18px',
    zIndex: -1,
  }
}));

const DataField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    '&:hover': {
      backgroundColor: '#e9ecef',
    },
    '&.Mui-focused': {
      backgroundColor: 'white',
      boxShadow: '0 0 0 2px rgba(33, 150, 243, 0.1)',
    }
  },
  '& .MuiInputLabel-root': {
    fontWeight: 500,
    color: '#5f6368',
    fontSize: '0.875rem',
    '&.Mui-focused': {
      color: '#2196f3',
    }
  },
  '& .MuiOutlinedInput-input': {
    padding: '10px 14px',
    fontSize: '0.875rem',
  },
  '& .MuiInputLabel-shrink': {
    transform: 'translate(14px, -7px) scale(0.75)',
    backgroundColor: 'white',
    padding: '0 6px',
    borderRadius: '4px',
  }
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
  border: 0,
  borderRadius: '10px',
  color: 'white',
  height: 40,
  padding: '0 20px',
  boxShadow: '0 2px 10px rgba(33, 150, 243, 0.3)',
  fontWeight: 'bold',
  fontSize: '14px',
  '&:hover': {
    background: 'linear-gradient(45deg, #1976d2 30%, #00b0ff 90%)',
    boxShadow: '0 3px 15px rgba(33, 150, 243, 0.4)',
  }
}));

const ReadWeightButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #4caf50 30%, #8bc34a 90%)',
  border: 0,
  borderRadius: '10px',
  color: 'white',
  height: 40,
  padding: '0 20px',
  boxShadow: '0 2px 10px rgba(76, 175, 80, 0.3)',
  fontWeight: 'bold',
  fontSize: '14px',
  '&:hover': {
    background: 'linear-gradient(45deg, #388e3c 30%, #689f38 90%)',
    boxShadow: '0 3px 15px rgba(76, 175, 80, 0.4)',
  },
  '&:disabled': {
    background: '#cccccc',
    color: '#666666',
    boxShadow: 'none',
  }
}));

const ResetButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #ff9800 30%, #ff5722 90%)',
  border: 0,
  borderRadius: '10px',
  color: 'white',
  height: 40,
  padding: '0 20px',
  boxShadow: '0 2px 10px rgba(255, 152, 0, 0.3)',
  fontWeight: 'bold',
  fontSize: '14px',
  '&:hover': {
    background: 'linear-gradient(45deg, #f57c00 30%, #e64a19 90%)',
    boxShadow: '0 3px 15px rgba(255, 152, 0, 0.4)',
  },
}));

const HeaderStatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0.75),
  borderRadius: '8px',
  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
  boxShadow: '0 3px 8px rgba(0, 0, 0, 0.08)',
  transition: 'transform 0.2s ease-in-out',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
  }
}));

const WeightScaleButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  right: 15,
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1000,
  background: 'linear-gradient(135deg, #ff9800 0%, #ff5722 100%)',
  color: 'white',
  width: 50,
  height: 50,
  boxShadow: '0 4px 15px rgba(255, 87, 34, 0.4)',
  border: '2px solid white',
  '&:hover': {
    background: 'linear-gradient(135deg, #f57c00 0%, #e64a19 100%)',
    transform: 'translateY(-50%) scale(1.1)',
    boxShadow: '0 6px 20px rgba(255, 87, 34, 0.6)',
  },
  '& .MuiBadge-badge': {
    backgroundColor: '#2196f3',
    color: 'white',
    border: '2px solid white',
    fontSize: '0.6rem',
    fontWeight: 'bold',
    top: 4,
    right: 4,
  }
}));

function Home() {
  const [formData, setFormData] = useState({
    driverName: '',
    truckNumber: '',
    sellerName: '',
    buyerName: '',
    productName: '',
    specification: '',
    firstWeight: '',
    secondWeight: '',
    netWeight: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    firstWeightDateTime: '',
    secondWeightDateTime: ''
  });

  const [entries, setEntries] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Sample data for demonstration
  useEffect(() => {
    const sampleEntries = [
      {
        id: 1,
        driverName: 'John Smith',
        truckNumber: 'TRK-7890',
        sellerName: 'ABC Traders',
        buyerName: 'XYZ Corporation',
        productName: 'Steel Rods',
        specification: 'Grade 60, 12mm diameter',
        firstWeight: '45000',
        secondWeight: '15000',
        netWeight: '30000',
        date: '2024-01-15',
        time: '09:30',
        firstWeightDateTime: '2024-01-15T09:15',
        secondWeightDateTime: '2024-01-15T09:30'
      },
      {
        id: 2,
        driverName: 'Mike Johnson',
        truckNumber: 'TRK-5678',
        sellerName: 'Global Metals',
        buyerName: 'BuildRight Inc',
        productName: 'Cement Bags',
        specification: 'OPC 43 Grade, 50kg bags',
        firstWeight: '52000',
        secondWeight: '16000',
        netWeight: '36000',
        date: '2024-01-14',
        time: '14:45',
        firstWeightDateTime: '2024-01-14T14:30',
        secondWeightDateTime: '2024-01-14T14:45'
      },
      {
        id: 3,
        driverName: 'Robert Wilson',
        truckNumber: 'TRK-1234',
        sellerName: 'Steel Works Inc',
        buyerName: 'Construction Co',
        productName: 'Steel Beams',
        specification: 'H-Beam, 200x200mm',
        firstWeight: '60000',
        secondWeight: '18000',
        netWeight: '42000',
        date: '2024-01-16',
        time: '11:15',
        firstWeightDateTime: '2024-01-16T11:00',
        secondWeightDateTime: '2024-01-16T11:15'
      }
    ];
    setEntries(sampleEntries);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Calculate net weight when either firstWeight or secondWeight changes
    if (name === 'firstWeight' || name === 'secondWeight') {
      const firstWeight = name === 'firstWeight' ? value : formData.firstWeight;
      const secondWeight = name === 'secondWeight' ? value : formData.secondWeight;
      
      if (firstWeight && secondWeight) {
        const first = parseFloat(firstWeight);
        const second = parseFloat(secondWeight);
        
        // Determine which is larger and calculate net weight
        const net = Math.abs(first - second);
        
        setFormData(prev => ({
          ...prev,
          netWeight: net > 0 ? net.toFixed(2) : ''
        }));
      } else {
        // If one weight is missing, clear the net weight
        setFormData(prev => ({
          ...prev,
          netWeight: ''
        }));
      }
    }
  };

  const handleReadWeight = () => {
    // Simulate reading weight from scale
    const randomWeight = Math.floor(Math.random() * 50000) + 10000; // Random weight between 10,000 and 60,000 kg
    const now = new Date();
    const dateTimeString = now.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:mm
    
    // Determine which field to fill based on which is empty
    if (!formData.firstWeight) {
      setFormData(prev => ({
        ...prev,
        firstWeight: randomWeight.toString(),
        firstWeightDateTime: dateTimeString
      }));
      setSnackbar({
        open: true,
        message: `First weight recorded: ${randomWeight} kg`,
        severity: 'success'
      });
    } else if (!formData.secondWeight) {
      setFormData(prev => ({
        ...prev,
        secondWeight: randomWeight.toString(),
        secondWeightDateTime: dateTimeString
      }));
      setSnackbar({
        open: true,
        message: `Second weight recorded: ${randomWeight} kg`,
        severity: 'success'
      });
    }
  };

  const handleResetWeight = () => {
    setFormData({
      driverName: '',
      truckNumber: '',
      sellerName: '',
      buyerName: '',
      productName: '',
      specification: '',
      firstWeight: '',
      secondWeight: '',
      netWeight: '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      firstWeightDateTime: '',
      secondWeightDateTime: ''
    });
    setSnackbar({
      open: true,
      message: 'All form fields have been reset!',
      severity: 'info'
    });
  };

  const handleRemoveFirstWeight = () => {
    setFormData(prev => ({
      ...prev,
      firstWeight: '',
      firstWeightDateTime: '',
      netWeight: ''
    }));
    setSnackbar({
      open: true,
      message: 'First weight removed!',
      severity: 'warning'
    });
  };

  const handleRemoveSecondWeight = () => {
    setFormData(prev => ({
      ...prev,
      secondWeight: '',
      secondWeightDateTime: '',
      netWeight: ''
    }));
    setSnackbar({
      open: true,
      message: 'Second weight removed!',
      severity: 'warning'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.driverName || !formData.truckNumber) {
      setSnackbar({
        open: true,
        message: 'Driver name and truck number are required!',
        severity: 'error'
      });
      return;
    }

    if (!formData.firstWeight || !formData.secondWeight) {
      setSnackbar({
        open: true,
        message: 'Both weight measurements are required!',
        severity: 'error'
      });
      return;
    }

    // Auto-set date/time if not provided
    const now = new Date();
    const currentDateTime = now.toISOString().slice(0, 16);
    
    const updatedFormData = { ...formData };
    
    if (!updatedFormData.firstWeightDateTime && updatedFormData.firstWeight) {
      updatedFormData.firstWeightDateTime = currentDateTime;
    }
    
    if (!updatedFormData.secondWeightDateTime && updatedFormData.secondWeight) {
      updatedFormData.secondWeightDateTime = currentDateTime;
    }

    if (editingIndex !== null) {
      const updatedEntries = [...entries];
      updatedEntries[editingIndex] = { ...updatedFormData, id: Date.now() };
      setEntries(updatedEntries);
      setSnackbar({
        open: true,
        message: 'Weight ticket updated successfully!',
        severity: 'success'
      });
      setEditingIndex(null);
    } else {
      setEntries(prev => [...prev, { ...updatedFormData, id: Date.now() }]);
      setSnackbar({
        open: true,
        message: 'New weight ticket created successfully!',
        severity: 'success'
      });
    }

    setFormData({
      driverName: '',
      truckNumber: '',
      sellerName: '',
      buyerName: '',
      productName: '',
      specification: '',
      firstWeight: '',
      secondWeight: '',
      netWeight: '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      firstWeightDateTime: '',
      secondWeightDateTime: ''
    });
  };

  const handleEdit = (index) => {
    setFormData(entries[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setOpenDialog(true);
    setEditingIndex(index);
  };

  const confirmDelete = () => {
    const updatedEntries = entries.filter((_, i) => i !== editingIndex);
    setEntries(updatedEntries);
    setOpenDialog(false);
    setSnackbar({
      open: true,
      message: 'Weight ticket deleted successfully!',
      severity: 'warning'
    });
  };

  const calculateStats = () => {
    const totalWeight = entries.reduce((sum, entry) => sum + (parseFloat(entry.netWeight) || 0), 0);
    const avgWeight = entries.length > 0 ? totalWeight / entries.length : 0;
    const todayEntries = entries.filter(entry => entry.date === new Date().toISOString().split('T')[0]);
    
    return {
      totalWeight: (totalWeight / 1000).toFixed(1) + 'T',
      avgWeight: avgWeight.toFixed(0),
      totalEntries: entries.length,
      todayEntries: todayEntries.length
    };
  };

  const stats = calculateStats();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  // Check if both weights have values
  const isReadWeightDisabled = formData.firstWeight && formData.secondWeight;

  // Format datetime for display
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    return date.toLocaleString();
  };

  // Slide panel content
  const slidePanel = (
    <Box sx={{ width: 320, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ 
        p: 2, 
        background: 'linear-gradient(135deg, #ff9800 0%, #ff5722 100%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: 'white', color: '#ff9800', mr: 1.5, width: 36, height: 36 }}>
            <ScaleIcon fontSize="small" />
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize: '0.95rem' }}>
              Recent Tickets
            </Typography>
            <Typography variant="caption" sx={{ color: '#ffe0b2', fontSize: '0.7rem' }}>
              {entries.length} records • {stats.totalWeight}
            </Typography>
          </Box>
        </Box>
        <IconButton 
          onClick={toggleDrawer(false)} 
          sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }, padding: 0.5 }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', p: 1.5 }}>
        {entries.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <ScaleIcon sx={{ fontSize: 40, color: '#e0e0e0', mb: 1 }} />
            <Typography color="text.secondary" variant="body2">
              No weight tickets yet
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.75rem', p: 1 }}>Truck</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.75rem', p: 1 }} align="right">Net Weight</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.75rem', p: 1 }} align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {entries.slice(0, 8).map((entry, index) => (
                  <TableRow 
                    key={entry.id}
                    hover
                    sx={{ 
                      '&:hover': { backgroundColor: '#f5f7fa' },
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    <TableCell sx={{ p: 1 }}>
                      <Box>
                        <Typography variant="body2" fontWeight="medium" sx={{ fontSize: '0.8rem' }}>
                          {entry.truckNumber}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                          {entry.driverName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right" sx={{ p: 1 }}>
                      <Chip
                        label={`${entry.netWeight || '0.00'} kg`}
                        size="small"
                        sx={{
                          backgroundColor: parseFloat(entry.netWeight) > 20000 ? '#e8f5e9' : '#fff3e0',
                          color: parseFloat(entry.netWeight) > 20000 ? '#2e7d32' : '#f57c00',
                          fontWeight: 'bold',
                          fontSize: '0.7rem',
                          height: 22
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ p: 1 }}>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => {
                            handleEdit(index);
                            setDrawerOpen(false);
                          }}
                          sx={{ mr: 0.5, p: 0.5 }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => {
                            handleDelete(index);
                            setDrawerOpen(false);
                          }}
                          sx={{ p: 0.5 }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      <Box sx={{ p: 1.5, borderTop: '1px solid #e0e0e0' }}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Paper sx={{ p: 1, textAlign: 'center', borderRadius: '6px', bgcolor: '#fff8e1' }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>Today</Typography>
              <Typography variant="h6" fontWeight="bold" color="#ff9800" sx={{ fontSize: '1rem' }}>{stats.todayEntries}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper sx={{ p: 1, textAlign: 'center', borderRadius: '6px', bgcolor: '#e8f5e9' }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>Total Weight</Typography>
              <Typography variant="h6" fontWeight="bold" color="#4caf50" sx={{ fontSize: '1rem' }}>
                {stats.totalWeight}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );

  return (
    <Container 
      maxWidth="xl" 
      sx={{ 
        mt: 0.5, 
        mb: 0.5, 
        px: { xs: 1, sm: 1.5 },
        height: 'calc(80vh - 16px)',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <Fade in={true} timeout={900}>
          <Box sx={{ height: '100%' }}>
            {/* Compact Header Section */}
            <Box sx={{ mb: 1.5 }}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ScaleIcon sx={{ 
                      fontSize: 28, 
                      mr: 1, 
                      color: '#2196f3'
                    }} />
                    <Box>
                      <Typography variant="h5" gutterBottom sx={{ 
                        fontWeight: 'bold',
                        fontSize: '1.4rem',
                        lineHeight: 1.2,
                        background: 'linear-gradient(45deg, #2196f3, #3f51b5)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}>
                        Bridge Scale Management
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 4, fontSize: '0.75rem' }}>
                        Professional weight measurement system
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                {/* Compact Statistics Cards */}
                <Grid item xs={12} md={6} >
                  <Grid container spacing={0.75}>
                    {[
                      { 
                        label: 'Total', 
                        value: stats.totalEntries, 
                        icon: <DashboardIcon sx={{ fontSize: 14, color: '#2196f3' }} />, 
                        color: '#2196f3'
                      },
                      { 
                        label: 'Weight', 
                        value: stats.totalWeight, 
                        icon: <ScaleIcon sx={{ fontSize: 14, color: '#4caf50' }} />, 
                        color: '#4caf50'
                      },
                      { 
                        label: 'Avg', 
                        value: stats.avgWeight, 
                        icon: <TrendingUpIcon sx={{ fontSize: 14, color: '#ff9800' }} />, 
                        color: '#ff9800'
                      },
                      { 
                        label: "Today", 
                        value: stats.todayEntries, 
                        icon: <CalendarTodayIcon sx={{ fontSize: 14, color: '#9c27b0' }} />, 
                        color: '#9c27b0'
                      }
                    ].map((stat, index) => (
                      <Grid item xs={3} key={index}>
                        <HeaderStatCard>
                          <Box sx={{ 
                            display: 'flex', 
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            width: '100%',
                            p: 0.25
                          }}>
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              mb: 0.25
                            }}>
                              <Box sx={{ 
                                width: 22,
                                height: 22,
                                borderRadius: '5px',
                                backgroundColor: stat.color + '15',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 0.25
                              }}>
                                {stat.icon}
                              </Box>
                              <Typography variant="caption" sx={{ 
                                color: '#666',
                                fontWeight: 500,
                                fontSize: '0.6rem',
                                whiteSpace: 'nowrap'
                              }}>
                                {stat.label}
                              </Typography>
                            </Box>
                            <Typography variant="h6" sx={{ 
                              fontWeight: 'bold', 
                              color: stat.color,
                              fontSize: '0.95rem',
                              lineHeight: 1.2
                            }}>
                              {stat.value}
                            </Typography>
                          </Box>
                        </HeaderStatCard>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Box>

            <Grid container spacing={1.5} sx={{ height: 'calc(100% - 70px)' }} mt={5}>
              {/* Main Content Card */}
              <Grid item xs={12} sx={{ height: '100%' }}>
                <ScaleCard sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ 
                        bgcolor: 'white', 
                        color: '#2196f3',
                        width: 40,
                        height: 40,
                        mr: 1.5,
                        boxShadow: '0 2px 8px rgba(33, 150, 243, 0.3)'
                      }}>
                        <ScaleIcon fontSize="small" />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" gutterBottom sx={{ 
                          color: 'white', 
                          fontSize: '1.1rem',
                          fontWeight: 'bold'
                        }}>
                          {editingIndex !== null ? 'Edit Weight Ticket' : 'Create New Weight Ticket'}
                        </Typography>
                        <Typography variant="caption" sx={{ 
                          color: '#bbdefb', 
                          fontSize: '0.75rem'
                        }}>
                          Fill required details for accurate measurement
                        </Typography>
                      </Box>
                    </Box>

                    <Box component="form" onSubmit={handleSubmit} sx={{ flex: 1, overflow: 'auto' }}>
                      <Grid container spacing={1.5}>
                        {/* Driver & Truck Info - Compact */}
                        <Grid item xs={12} md={6}>
                          <Paper sx={{ 
                            p: 1.5, 
                            borderRadius: '8px', 
                            background: 'rgba(255,255,255,0.1)'
                          }}>
                            <Typography variant="subtitle2" gutterBottom sx={{ 
                              color: '#bbdefb', 
                              display: 'flex', 
                              alignItems: 'center',
                              fontSize: '0.85rem',
                              fontWeight: 600
                            }}>
                              <PersonIcon sx={{ mr: 0.75, fontSize: '1rem' }} /> Driver & Vehicle
                            </Typography>
                            <Grid container spacing={1}>
                              <Grid item xs={12}>
                                <DataField
                                  fullWidth
                                  label="Driver Name *"
                                  name="driverName"
                                  value={formData.driverName}
                                  onChange={handleChange}
                                  required
                                  size="small"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <PersonIcon fontSize="small" />
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={{
                                    '& .MuiOutlinedInput-input': {
                                      paddingLeft: '32px',
                                    }
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <DataField
                                  fullWidth
                                  label="Truck Number *"
                                  name="truckNumber"
                                  value={formData.truckNumber}
                                  onChange={handleChange}
                                  required
                                  size="small"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <LocalShippingIcon fontSize="small" />
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={{
                                    '& .MuiOutlinedInput-input': {
                                      paddingLeft: '32px',
                                    }
                                  }}
                                />
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>

                        {/* Transaction Parties - Compact */}
                        <Grid item xs={12} md={6}>
                          <Paper sx={{ 
                            p: 1.5, 
                            borderRadius: '8px', 
                            background: 'rgba(255,255,255,0.1)'
                          }}>
                            <Typography variant="subtitle2" gutterBottom sx={{ 
                              color: '#bbdefb', 
                              display: 'flex', 
                              alignItems: 'center',
                              fontSize: '0.85rem',
                              fontWeight: 600
                            }}>
                              <FactoryIcon sx={{ mr: 0.75, fontSize: '1rem' }} /> Transaction Parties
                            </Typography>
                            <Grid container spacing={1}>
                              <Grid item xs={12}>
                                <DataField
                                  fullWidth
                                  label="Seller Name"
                                  name="sellerName"
                                  value={formData.sellerName}
                                  onChange={handleChange}
                                  size="small"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <FactoryIcon fontSize="small" />
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={{
                                    '& .MuiOutlinedInput-input': {
                                      paddingLeft: '32px',
                                    }
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <DataField
                                  fullWidth
                                  label="Buyer Name"
                                  name="buyerName"
                                  value={formData.buyerName}
                                  onChange={handleChange}
                                  size="small"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <ShoppingCartIcon fontSize="small" />
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={{
                                    '& .MuiOutlinedInput-input': {
                                      paddingLeft: '32px',
                                    }
                                  }}
                                />
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>

                        {/* Product Details - Compact */}
                        <Grid item xs={12} md={6}>
                          <Paper sx={{ 
                            p: 1.5, 
                            borderRadius: '8px', 
                            background: 'rgba(255,255,255,0.1)'
                          }}>
                            <Typography variant="subtitle2" gutterBottom sx={{ 
                              color: '#bbdefb', 
                              display: 'flex', 
                              alignItems: 'center',
                              fontSize: '0.85rem',
                              fontWeight: 600
                            }}>
                              <InventoryIcon sx={{ mr: 0.75, fontSize: '1rem' }} /> Product Details
                            </Typography>
                            <Grid container spacing={1}>
                              <Grid item xs={12}>
                                <DataField
                                  fullWidth
                                  label="Product Name"
                                  name="productName"
                                  value={formData.productName}
                                  onChange={handleChange}
                                  size="small"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <InventoryIcon fontSize="small" />
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={{
                                    '& .MuiOutlinedInput-input': {
                                      paddingLeft: '32px',
                                    }
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <DataField
                                  fullWidth
                                  label="Specification"
                                  name="specification"
                                  value={formData.specification}
                                  onChange={handleChange}
                                  size="small"
                                  multiline
                                  rows={1}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start" sx={{ alignItems: 'flex-start', mt: 0.5 }}>
                                        <DescriptionIcon fontSize="small" />
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={{
                                    '& .MuiOutlinedInput-input': {
                                      paddingLeft: '32px',
                                    }
                                  }}
                                />
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>

                        {/* Weight Measurement - Compact */}
                        <Grid item xs={12} md={6}>
                          <Paper sx={{ 
                            p: 1.5, 
                            borderRadius: '8px', 
                            background: 'rgba(255,255,255,0.1)'
                          }}>
                            <Typography variant="subtitle2" gutterBottom sx={{ 
                              color: '#bbdefb', 
                              display: 'flex', 
                              alignItems: 'center',
                              fontSize: '0.85rem',
                              fontWeight: 600
                            }}>
                              <ScaleIcon sx={{ mr: 0.75, fontSize: '1rem' }} /> Weight Measurement (kg)
                            </Typography>
                            <Grid container spacing={1}>
                              {/* First Weight */}
                              <Grid item xs={6}>
                                <DataField
                                  fullWidth
                                  label="First Weight"
                                  name="firstWeight"
                                  type="number"
                                  value={formData.firstWeight}
                                  onChange={handleChange}
                                  size="small"
                                  InputProps={{
                                    endAdornment: <InputAdornment position="end" sx={{ fontSize: '0.75rem' }}>kg</InputAdornment>,
                                  }}
                                />
                              </Grid>
                              
                              {/* Second Weight */}
                              <Grid item xs={6}>
                                <DataField
                                  fullWidth
                                  label="Second Weight"
                                  name="secondWeight"
                                  type="number"
                                  value={formData.secondWeight}
                                  onChange={handleChange}
                                  size="small"
                                  InputProps={{
                                    endAdornment: <InputAdornment position="end" sx={{ fontSize: '0.75rem' }}>kg</InputAdornment>,
                                  }}
                                />
                              </Grid>

                              {/* Net Weight */}
                              <Grid item xs={12}>
                                <DataField
                                  fullWidth
                                  label="Net Weight"
                                  name="netWeight"
                                  type="number"
                                  value={formData.netWeight}
                                  size="small"
                                  InputProps={{
                                    readOnly: true,
                                    endAdornment: <InputAdornment position="end" sx={{ fontSize: '0.75rem' }}>kg</InputAdornment>,
                                    sx: { 
                                      backgroundColor: 'rgba(255,255,255,0.9)',
                                      fontWeight: 'bold',
                                      color: '#2196f3'
                                    }
                                  }}
                                />
                              </Grid>
                            </Grid>

                            {/* Weight Date & Time - Compact */}
                            <Box sx={{ mt: 1.5, mb: 1 }}>
                              <Grid container spacing={1}>
                                {/* First Weight Date & Time */}
                                <Grid item xs={12} md={6}>
                                  <DataField
                                    fullWidth
                                    label="First Weight DT"
                                    name="firstWeightDateTime"
                                    type="datetime-local"
                                    value={formData.firstWeightDateTime}
                                    onChange={handleChange}
                                    size="small"
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <EventIcon fontSize="small" />
                                        </InputAdornment>
                                      ),
                                    }}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    sx={{
                                      '& .MuiOutlinedInput-input': {
                                        paddingLeft: '32px',
                                      }
                                    }}
                                  />
                                </Grid>

                                {/* Second Weight Date & Time */}
                                <Grid item xs={12} md={6}>
                                  <DataField
                                    fullWidth
                                    label="Second Weight DT"
                                    name="secondWeightDateTime"
                                    type="datetime-local"
                                    value={formData.secondWeightDateTime}
                                    onChange={handleChange}
                                    size="small"
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <AccessTimeIcon fontSize="small" />
                                        </InputAdornment>
                                      ),
                                    }}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    sx={{
                                      '& .MuiOutlinedInput-input': {
                                        paddingLeft: '32px',
                                      }
                                    }}
                                  />
                                </Grid>
                              </Grid>
                            </Box>

                            {/* Weight Action Buttons - Compact */}
                            <Box sx={{ 
                              display: 'flex', 
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              mt: 1,
                              mb: 0.5
                            }}>
                              {/* Remove buttons */}
                              <Box sx={{ display: 'flex', gap: 0.75 }}>
                                {formData.firstWeight && (
                                  <Tooltip title="Remove First Weight">
                                    <Button
                                      variant="contained"
                                      onClick={handleRemoveFirstWeight}
                                      startIcon={<RemoveIcon />}
                                      size="small"
                                      sx={{
                                        background: 'linear-gradient(135deg, #ff5252 0%, #ff4081 100%)',
                                        color: 'white',
                                        borderRadius: '6px',
                                        px: 1,
                                        py: 0.25,
                                        fontWeight: '600',
                                        fontSize: '0.7rem',
                                        textTransform: 'none',
                                        boxShadow: '0 1px 6px rgba(255, 82, 82, 0.3)',
                                        minWidth: 'auto',
                                        '&:hover': {
                                          background: 'linear-gradient(135deg, #d32f2f 0%, #c2185b 100%)',
                                          boxShadow: '0 2px 8px rgba(255, 82, 82, 0.4)',
                                        },
                                      }}
                                    >
                                      First
                                    </Button>
                                  </Tooltip>
                                )}
                                
                                {formData.secondWeight && (
                                  <Tooltip title="Remove Second Weight">
                                    <Button
                                      variant="contained"
                                      onClick={handleRemoveSecondWeight}
                                      startIcon={<RemoveIcon />}
                                      size="small"
                                      sx={{
                                        background: 'linear-gradient(135deg, #ff9800 0%, #ff5722 100%)',
                                        color: 'white',
                                        borderRadius: '6px',
                                        px: 1,
                                        py: 0.25,
                                        fontWeight: '600',
                                        fontSize: '0.7rem',
                                        textTransform: 'none',
                                        boxShadow: '0 1px 6px rgba(255, 152, 0, 0.3)',
                                        minWidth: 'auto',
                                        '&:hover': {
                                          background: 'linear-gradient(135deg, #f57c00 0%, #e64a19 100%)',
                                          boxShadow: '0 2px 8px rgba(255, 152, 0, 0.4)',
                                        },
                                      }}
                                    >
                                      Second
                                    </Button>
                                  </Tooltip>
                                )}
                              </Box>

                              {/* Compact Progress Bar */}
                              <Box sx={{ flex: 1, mx: 1 }}>
                                <LinearProgress 
                                  variant="determinate" 
                                  value={formData.netWeight ? (parseFloat(formData.netWeight) / 50000 * 100) : 0}
                                  sx={{ 
                                    height: 5,
                                    borderRadius: 2,
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    '& .MuiLinearProgress-bar': {
                                      background: 'linear-gradient(90deg, #4caf50, #8bc34a)'
                                    }
                                  }}
                                />
                              </Box>
                            </Box>
                          </Paper>
                        </Grid>

                        {/* Submit Section - Compact Buttons */}
                        <Grid item xs={12}>
                          <Box sx={{ 
                            display: 'flex', 
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'space-between', 
                            alignItems: { xs: 'stretch', sm: 'center' },
                            gap: 1,
                            pt: 1.5,
                            mt: 0.5,
                            borderTop: '1px solid rgba(255,255,255,0.1)'
                          }}>
                            <Box sx={{ 
                              display: 'flex', 
                              flexDirection: { xs: 'column', sm: 'row' },
                              alignItems: { xs: 'stretch', sm: 'center' }, 
                              gap: 1,
                              width: { xs: '100%', sm: 'auto' }
                            }}>
                              {editingIndex !== null && (
                                <>
                                  <Chip
                                    label="Editing"
                                    color="warning"
                                    icon={<EditIcon />}
                                    size="small"
                                    sx={{ 
                                      fontWeight: 600,
                                      fontSize: '0.7rem',
                                      alignSelf: { xs: 'center', sm: 'flex-start' },
                                      height: 24
                                    }}
                                  />
                                  <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => {
                                      setEditingIndex(null);
                                      handleResetWeight();
                                    }}
                                    sx={{ 
                                      color: 'white',
                                      borderColor: 'white',
                                      fontSize: '0.75rem',
                                      height: 32,
                                      '&:hover': { 
                                        borderColor: '#bbdefb', 
                                        backgroundColor: 'rgba(255,255,255,0.1)' 
                                      }
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                </>
                              )}
                              <SubmitButton
                                type="submit"
                                startIcon={editingIndex !== null ? <SaveIcon /> : <AddIcon />}
                                sx={{ 
                                  height: 36,
                                  fontSize: '0.85rem',
                                  padding: '0 18px',
                                  width: { xs: '100%', sm: 'auto' }
                                }}
                              >
                                {editingIndex !== null ? 'UPDATE' : 'CREATE'}
                              </SubmitButton>
                            </Box>
                            
                            {/* Right side buttons - Compact */}
                            <Box sx={{ 
                              display: 'flex', 
                              flexDirection: { xs: 'column', sm: 'row' },
                              alignItems: 'center',
                              gap: 1,
                              width: { xs: '100%', sm: 'auto' }
                            }}>
                              {/* Reset Button */}
                              {editingIndex === null && (
                                <ResetButton
                                  onClick={handleResetWeight}
                                  startIcon={<RestartAltIcon />}
                                  disabled={!formData.driverName && !formData.truckNumber && !formData.firstWeight && !formData.secondWeight}
                                  sx={{ 
                                    height: 36,
                                    fontSize: '0.85rem',
                                    padding: '0 16px',
                                    width: { xs: '100%', sm: 'auto' },
                                    '&:disabled': {
                                      background: '#cccccc',
                                      color: '#666666',
                                      boxShadow: 'none',
                                    }
                                  }}
                                >
                                  RESET
                                </ResetButton>
                              )}
                              
                              {/* Read Weight Button */}
                              <ReadWeightButton
                                onClick={handleReadWeight}
                                disabled={isReadWeightDisabled}
                                startIcon={<VisibilityIcon />}
                                sx={{ 
                                  height: 36,
                                  fontSize: '0.85rem',
                                  padding: '0 16px',
                                  width: { xs: '100%', sm: 'auto' }
                                }}
                              >
                                READ
                              </ReadWeightButton>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </CardContent>
                </ScaleCard>
              </Grid>
            </Grid>
          </Box>
        </Fade>

        {/* Floating Weight Scale Button */}
        <WeightScaleButton onClick={toggleDrawer(true)}>
          <Badge badgeContent={entries.length} color="primary">
            <ScaleIcon sx={{ fontSize: 20 }} />
          </Badge>
        </WeightScaleButton>

        {/* Compact Slide-out Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              width: 300,
              maxWidth: '85vw',
              boxShadow: '-8px 0 20px rgba(0, 0, 0, 0.15)',
              borderRadius: '12px 0 0 12px',
              overflow: 'hidden'
            }
          }}
        >
          {slidePanel}
        </Drawer>

        {/* Delete Confirmation Dialog */}
        <Dialog 
          open={openDialog} 
          onClose={() => setOpenDialog(false)}
          PaperProps={{ sx: { borderRadius: '12px', maxWidth: 400 } }}
        >
          <DialogTitle sx={{ fontWeight: 'bold', color: '#d32f2f', p: 2, fontSize: '1rem' }}>
            Confirm Deletion
          </DialogTitle>
          <DialogContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <Avatar sx={{ bgcolor: '#ffebee', color: '#d32f2f', mr: 1.5, width: 36, height: 36 }}>
                <DeleteIcon fontSize="small" />
              </Avatar>
              <Typography variant="body2">
                Are you sure you want to delete this weight ticket? This action cannot be undone.
              </Typography>
            </Box>
            {editingIndex !== null && entries[editingIndex] && (
              <Paper sx={{ p: 1.5, bgcolor: '#f5f5f5', borderRadius: '6px', mt: 1.5 }}>
                <Typography variant="body2" fontWeight="medium" sx={{ fontSize: '0.9rem' }}>
                  {entries[editingIndex].truckNumber} - {entries[editingIndex].driverName}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                  Net Weight: {entries[editingIndex].netWeight} kg
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5, fontSize: '0.7rem' }}>
                  First Weight: {formatDateTime(entries[editingIndex].firstWeightDateTime)}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.7rem' }}>
                  Second Weight: {formatDateTime(entries[editingIndex].secondWeightDateTime)}
                </Typography>
              </Paper>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button 
              onClick={() => setOpenDialog(false)}
              sx={{ borderRadius: '6px', fontSize: '0.875rem' }}
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmDelete} 
              color="error" 
              variant="contained"
              sx={{ borderRadius: '6px', fontSize: '0.875rem' }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Compact Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{
              borderRadius: '8px',
              boxShadow: '0 3px 15px rgba(0,0,0,0.15)',
              fontSize: '0.85rem',
              fontWeight: 500,
              '& .MuiAlert-icon': {
                fontSize: '1.1rem'
              }
            }}
            iconMapping={{
              success: <CheckCircleOutlineIcon fontSize="inherit" />,
              error: <ErrorOutlineIcon fontSize="inherit" />,
              warning: <WarningAmberIcon fontSize="inherit" />,
              info: <InfoOutlinedIcon fontSize="inherit" />
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}

export default Home;