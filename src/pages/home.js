import React, { useState, useEffect, useRef } from 'react';
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
import errorSound from '../audio/error.mp3';
import warningSound from '../audio/warning.mp3';
import successSound from '../audio/success.mp3';
import infoSound from '../audio/info.mp3';
import deleteSound from '../audio/delete.mp3';

// Custom styled components with compact styling
const ScaleCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%)',
  color: 'white',
  borderRadius: '16px',
  boxShadow: '0 20px 60px rgba(15, 23, 42, 0.35)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(6px)',
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
  padding: theme.spacing(1.75),
  borderRadius: '8px',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,249,250,0.9) 100%)',
  border: '1px solid rgba(255,255,255,0.5)',
  boxShadow: '0 12px 30px rgba(15, 23, 42, 0.12)',
  backdropFilter: 'blur(8px)',
  transition: 'transform 0.2s ease-in-out',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 18px 40px rgba(15, 23, 42, 0.18)',
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

const Reveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.98)',
        filter: visible ? 'blur(0px)' : 'blur(2px)',
        transition: `opacity 650ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 650ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, filter 650ms ease ${delay}ms`,
        willChange: 'opacity, transform, filter'
      }}
    >
      {children}
    </Box>
  );
};

function Home() {
  const [formData, setFormData] = useState({
    driverName: '',
    truckNumber: '',
    sellerName: '',
    buyerName: '',
    productName: '',
    specification: '',
    fee: '',
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
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [snackbar, setSnackbar] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [liveTime, setLiveTime] = useState(new Date());
  const audioMapRef = useRef(null);

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

  useEffect(() => {
    audioMapRef.current = {
      error: new Audio(errorSound),
      warning: new Audio(warningSound),
      success: new Audio(successSound),
      info: new Audio(infoSound),
      delete: new Audio(deleteSound)
    };

    Object.values(audioMapRef.current).forEach((audio) => {
      audio.preload = 'auto';
    });

    return () => {
      if (!audioMapRef.current) return;
      Object.values(audioMapRef.current).forEach((audio) => {
        audio.pause();
      });
      audioMapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLiveTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedLiveTime = liveTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

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
      const nextNetWeight = formData.secondWeight
        ? Math.abs(randomWeight - parseFloat(formData.secondWeight)).toFixed(2)
        : '';
      setFormData(prev => ({
        ...prev,
        firstWeight: randomWeight.toString(),
        firstWeightDateTime: dateTimeString,
        netWeight: nextNetWeight
      }));
      setSnackbar({
        open: true,
        message: `First weight recorded: ${randomWeight} kg`,
        severity: 'success'
      });
      playAlertSound('success');
    } else if (!formData.secondWeight) {
      const nextNetWeight = formData.firstWeight
        ? Math.abs(parseFloat(formData.firstWeight) - randomWeight).toFixed(2)
        : '';
      setFormData(prev => ({
        ...prev,
        secondWeight: randomWeight.toString(),
        secondWeightDateTime: dateTimeString,
        netWeight: nextNetWeight
      }));
      setSnackbar({
        open: true,
        message: `Second weight recorded: ${randomWeight} kg`,
        severity: 'success'
      });
      playAlertSound('success');
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
      fee: '',
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
    playAlertSound('info');
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
    playAlertSound('warning');
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
    playAlertSound('warning');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.truckNumber || !formData.productName) {
      setSnackbar({
        open: true,
        message: 'Truck number and product name are required!',
        severity: 'error'
      });
      playAlertSound('error');
      return;
    }

    if (!formData.fee) {
      setSnackbar({
        open: true,
        message: 'Fee is required!',
        severity: 'warning'
      });
      playAlertSound('warning');
      return;
    }

    if (!formData.firstWeight && !formData.secondWeight) {
      setSnackbar({
        open: true,
        message: 'At least one weight measurement is required!',
        severity: 'error'
      });
      playAlertSound('error');
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
      playAlertSound('success');
      setEditingIndex(null);
    } else {
      setEntries(prev => [...prev, { ...updatedFormData, id: Date.now() }]);
      setSnackbar({
        open: true,
        message: 'New weight ticket created successfully!',
        severity: 'success'
      });
      playAlertSound('success');
    }

    setFormData({
      driverName: '',
      truckNumber: '',
      sellerName: '',
      buyerName: '',
      productName: '',
      specification: '',
      fee: '',
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
    setDeleteIndex(index);
  };

  const confirmDelete = () => {
    if (deleteIndex === null) {
      setOpenDialog(false);
      return;
    }

    const updatedEntries = entries.filter((_, i) => i !== deleteIndex);
    setEntries(updatedEntries);
    setOpenDialog(false);
    if (editingIndex === deleteIndex) {
      setEditingIndex(null);
    }
    setDeleteIndex(null);
    setSnackbar({
      open: true,
      message: 'Weight ticket deleted successfully!',
      severity: 'warning'
    });
    playAlertSound('delete');
  };

  const calculateStats = () => {
    const totalWeight = entries.reduce((sum, entry) => sum + (parseFloat(entry.netWeight) || 0), 0);
    const avgWeight = entries.length > 0 ? totalWeight / entries.length : 0;
    const todayEntries = entries.filter(entry => entry.date === new Date().toISOString().split('T')[0]);
    
    return {
      totalWeight: totalWeight.toFixed(0) + ' kg',
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

  const playAlertSound = (type = 'error') => {
    const audioMap = audioMapRef.current;
    if (!audioMap) return;
    const audio = audioMap[type] || audioMap.error;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  const averageWeight = (() => {
    const net = parseFloat(formData.netWeight);
    const spec = parseFloat(formData.specification);
    if (!Number.isFinite(net) || !Number.isFinite(spec) || spec === 0) {
      return '';
    }
    return (net / spec).toFixed(2);
  })();

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
        mt: 0, 
        mb: 0, 
        px: { xs: 1, sm: 1.5 },
        // height: '100vh',
        // maxHeight: '100vh',
        overflow: 'hidden',
        background: 'radial-gradient(1200px 600px at 10% 10%, rgba(59, 130, 246, 0.12), transparent 60%), radial-gradient(900px 500px at 90% 15%, rgba(14, 165, 233, 0.15), transparent 60%), linear-gradient(180deg, #f8fbff 0%, #eef4ff 100%)'
      }}
    >
      <Box sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <Fade in={true} timeout={900}>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Compact Header Section */}
            <Box sx={{ mb: { xs: 1, md: 1.5 }, flexShrink: 0 }}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={12} md={4}>
                  <Reveal delay={0}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ScaleIcon sx={{ 
                        fontSize: 30, 
                        mr: 1.25, 
                        color: '#1e88e5',
                        filter: 'drop-shadow(0 6px 10px rgba(30, 136, 229, 0.35))'
                      }} />
                      <Box>
                        <Typography variant="h5" gutterBottom sx={{ 
                          fontWeight: 800,
                          fontSize: '1.5rem',
                          lineHeight: 1.15,
                          background: 'linear-gradient(90deg, #0ea5e9 0%, #2563eb 60%, #1e3a8a 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}>
                          Bridge Scale Management
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ ml: 4, fontSize: '0.8rem', letterSpacing: 0.2 }}>
                          Professional weight measurement system
                        </Typography>
                      </Box>
                    </Box>
                  </Reveal>
                </Grid>
                
                {/* Compact Statistics Cards */}
                <Grid item xs={12} md={8} >
                  <Box sx={{ 
                    display: { xs: 'block', md: 'flex' }, 
                    alignItems: 'center', 
                    gap: 1 
                  }}>
                    <Grid container spacing={2} sx={{ flex: 1 }}>
                      {[
                        { 
                          label: 'Total', 
                          value: stats.totalEntries, 
                          icon: <DashboardIcon sx={{ fontSize: 14, color: '#2196f3' }} />, 
                          color: '#2196f3',
                          

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
                          <Reveal delay={index * 60}>
                            <HeaderStatCard>
                              <Box sx={{ 
                                display: 'flex', 
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                width: '100%',
                                p: 0.25,
                                
                              }}>
                                <Box sx={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  justifyContent: 'center',
                                  mb: 0.25
                                }}>
                                  <Box sx={{ 
                                    width: 28,
                                    height: 28,
                                    borderRadius: '5px',
                                    backgroundColor: stat.color + '15',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mr: 0.5,
                                    
                                  }}>
                                    {React.cloneElement(stat.icon, { sx: { fontSize: 18, color: stat.color } })}
                                  </Box>
                                  <Typography variant="caption" sx={{ 
                                    color: '#666',
                                    fontWeight: 500,
                                    fontSize: '0.75rem',
                                    whiteSpace: 'nowrap'
                                  }}>
                                    {stat.label}
                                  </Typography>
                                </Box>
                                <Typography variant="h6" sx={{ 
                                  fontWeight: 'bold', 
                                  color: stat.color,
                                  fontSize: '1.2rem',
                                  lineHeight: 1.2
                                }}>
                                  {stat.value}
                                </Typography>
                              </Box>
                            </HeaderStatCard>
                          </Reveal>
                        </Grid>
                      ))}
                    </Grid>
                    <Reveal delay={240}>
                      <Box sx={{ 
                        textAlign: { xs: 'left', md: 'right' },
                        px: 1.5,
                        py: 0.75,
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(243,246,251,0.9) 100%)',
                        border: '1px solid rgba(255,255,255,0.6)',
                        boxShadow: '0 12px 30px rgba(30, 64, 175, 0.12)',
                        backdropFilter: 'blur(8px)',
                        minWidth: { xs: 'auto', md: 140 }
                      }}>
                        <Typography sx={{ 
                          fontSize: '0.9rem', 
                          color: '#475569', 
                          fontWeight: 700,
                          letterSpacing: 0.6
                        }}>
                          LIVE TIME
                        </Typography>
                        <Typography sx={{ 
                          fontSize: '1.6rem', 
                          fontWeight: 800, 
                          color: '#0f172a',
                          lineHeight: 1.05
                        }}>
                          {formattedLiveTime}
                        </Typography>
                      </Box>
                    </Reveal>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Grid 
              container 
              spacing={1.5} 
              sx={{ flex: 1, minHeight: 0, overflow: 'hidden' }} 
              mt={{ xs: 1, md: 2.5 }}
            >
              {/* Main Content Card */}
              <Grid item xs={12} sx={{ height: '100%' }}>
                <ScaleCard sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
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
                          {/* Fill required details for accurate measurement */}
                        </Typography>
                      </Box>
                    </Box>

                    <Box component="form" onSubmit={handleSubmit} sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
                  <Grid container spacing={1}>
                        {/* Driver & Truck Info - Compact */}
                        <Grid item xs={12} md={6}>
                          <Reveal delay={0}>
                          <Paper sx={{ 
                            p: 1.5, 
                            borderRadius: '10px', 
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            boxShadow: '0 10px 25px rgba(15, 23, 42, 0.18)',
                            backdropFilter: 'blur(8px)'
                          }}>
                            <Typography variant="subtitle2" gutterBottom sx={{ 
                              color: '#000000', 
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
                          </Reveal>
                        </Grid>

                        {/* Transaction Parties - Compact */}
                        <Grid item xs={12} md={6}>
                          <Reveal delay={80}>
                          <Paper sx={{ 
                            p: 1.5, 
                            borderRadius: '10px', 
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            boxShadow: '0 10px 25px rgba(15, 23, 42, 0.18)',
                            backdropFilter: 'blur(8px)'
                          }}>
                            <Typography variant="subtitle2" gutterBottom sx={{ 
                              color: '#000000', 
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
                          </Reveal>
                        </Grid>

                        {/* Product Details - Compact */}
                        <Grid item xs={12} md={6}>
                          <Reveal delay={160}>
                          <Paper sx={{ 
                            p: 1.5, 
                            borderRadius: '10px', 
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            boxShadow: '0 10px 25px rgba(15, 23, 42, 0.18)',
                            backdropFilter: 'blur(8px)'
                          }}>
                            <Typography variant="subtitle2" gutterBottom sx={{ 
                              color: '#010202', 
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
                                  label="Product Name *"
                                  name="productName"
                                  value={formData.productName}
                                  onChange={handleChange}
                                  required
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
                                  
                                  rows={1}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start" >
                                        <DescriptionIcon fontSize="small" />
                                      </InputAdornment>
                                    ),
                                  }}
                                
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <DataField
                                  fullWidth
                                  label="Fee"
                                  name="fee"
                                  type="number"
                                  value={formData.fee || ''}
                                  onChange={handleChange}
                                  size="small"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
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
                          </Reveal>
                        </Grid>

                        {/* Weight Measurement - Compact */}
                        <Grid item xs={12} md={6}>
                          <Reveal delay={240}>
                          <Paper sx={{ 
                            p: 1.5, 
                            borderRadius: '10px', 
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            boxShadow: '0 10px 25px rgba(15, 23, 42, 0.18)',
                            backdropFilter: 'blur(8px)'
                          }}>
                            <Typography variant="subtitle2" gutterBottom sx={{ 
                              color: '#020303', 
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
                                  onWheel={(e) => e.target.blur()}
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
                                  onWheel={(e) => e.target.blur()}
                                  size="small"
                                  InputProps={{
                                    endAdornment: <InputAdornment position="end" sx={{ fontSize: '0.75rem' }}>kg</InputAdornment>,
                                  }}
                                />
                              </Grid>

                              {/* Net Weight */}
                              <Grid item xs={6}>
                                <DataField
                                  fullWidth
                                  label="Net Weight"
                                  name="netWeight"
                                  type="number"
                                  value={formData.netWeight}
                                  onWheel={(e) => e.target.blur()}
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

                              {/* Average Weight */}
                              <Grid item xs={6}>
                                <DataField
                                  fullWidth
                                  label="Average Weight"
                                  name="averageWeight"
                                  type="number"
                                  value={averageWeight}
                                  onWheel={(e) => e.target.blur()}
                                  size="small"
                                  InputProps={{
                                    readOnly: true,
                                    endAdornment: <InputAdornment position="end" sx={{ fontSize: '0.75rem' }}>kg</InputAdornment>,
                                    sx: { 
                                      backgroundColor: 'rgba(255,255,255,0.9)',
                                      fontWeight: 'bold',
                                      color: '#4caf50'
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
                                <Tooltip title={formData.firstWeight ? "Remove First Weight" : "No First Weight"}>
                                  <span>
                                    <Button
                                      variant="contained"
                                      onClick={handleRemoveFirstWeight}
                                      startIcon={<RemoveIcon />}
                                      size="small"
                                      disabled={!formData.firstWeight}
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
                                        '&.Mui-disabled': {
                                          background: '#e0e0e0',
                                          color: '#9e9e9e',
                                          boxShadow: 'none',
                                        }
                                      }}
                                    >
                                      First
                                    </Button>
                                  </span>
                                </Tooltip>
                                
                                <Tooltip title={formData.secondWeight ? "Remove Second Weight" : "No Second Weight"}>
                                  <span>
                                    <Button
                                      variant="contained"
                                      onClick={handleRemoveSecondWeight}
                                      startIcon={<RemoveIcon />}
                                      size="small"
                                      disabled={!formData.secondWeight}
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
                                        '&.Mui-disabled': {
                                          background: '#e0e0e0',
                                          color: '#9e9e9e',
                                          boxShadow: 'none',
                                        }
                                      }}
                                    >
                                      Second
                                    </Button>
                                  </span>
                                </Tooltip>
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
                          </Reveal>
                        </Grid>
                        
                        <br/>

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
          onClose={() => {
            setOpenDialog(false);
            setDeleteIndex(null);
          }}
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
            {deleteIndex !== null && entries[deleteIndex] && (
              <Paper sx={{ p: 1.5, bgcolor: '#f5f5f5', borderRadius: '6px', mt: 1.5 }}>
                <Typography variant="body2" fontWeight="medium" sx={{ fontSize: '0.9rem' }}>
                  {entries[deleteIndex].truckNumber} - {entries[deleteIndex].driverName}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                  Net Weight: {entries[deleteIndex].netWeight} kg
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5, fontSize: '0.7rem' }}>
                  First Weight: {formatDateTime(entries[deleteIndex].firstWeightDateTime)}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.7rem' }}>
                  Second Weight: {formatDateTime(entries[deleteIndex].secondWeightDateTime)}
                </Typography>
              </Paper>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button 
              onClick={() => {
                setOpenDialog(false);
                setDeleteIndex(null);
              }}
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
