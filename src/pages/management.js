import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  GlobalStyles,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import RoomIcon from '@mui/icons-material/Room';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { styled } from '@mui/material/styles';

const PageWrap = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'radial-gradient(circle at 12% 8%, #f1f5f9 0%, #ffffff 50%, #f8fafc 100%)',
  padding: theme.spacing(4, 0, 6)
}));

const Panel = styled(Paper)(({ theme }) => ({
  borderRadius: '18px',
  padding: theme.spacing(3),
  background: 'linear-gradient(150deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,0.96) 100%)',
  boxShadow: '0 18px 48px rgba(15, 23, 42, 0.15)',
  border: '1px solid rgba(226, 232, 240, 0.95)'
}));

const SectionCard = styled(Card)(({ theme }) => ({
  borderRadius: '14px',
  border: '1px solid rgba(226, 232, 240, 0.9)',
  boxShadow: '0 10px 28px rgba(15, 23, 42, 0.12)',
  background: 'white',
  height: '100%'
}));

const InfoRow = ({ icon, label, value }) => (
  <Stack direction="row" spacing={1.25} alignItems="center" sx={{ py: 0.5 }}>
    <Box sx={{ color: '#64748b', display: 'grid', placeItems: 'center' }}>{icon}</Box>
    <Typography variant="body2" sx={{ color: '#64748b', minWidth: 110 }}>
      {label}
    </Typography>
    {value ? (
      <Typography variant="body2" sx={{ color: '#0f172a', fontWeight: 600 }}>
        {value}
      </Typography>
    ) : null}
  </Stack>
);

function Management() {
  const [company, setCompany] = useState({
    name: 'Bridge Scale Industries',
    address: '2400 Harbor Road, Bay 3, San Diego, CA 92101',
    logo: 'BS',
    users: 14
  });

  const [owner, setOwner] = useState({
    name: 'Amelia Carter',
    contact: '+1 (619) 555-0142',
    email: 'amelia.carter@bridgescale.com',
    role: 'Owner / Administrator',
    photo: 'AC'
  });

  const [users, setUsers] = useState([
    { id: 1, name: 'Michael Torres', contact: '+1 (619) 555-0181', email: 'm.torres@bridgescale.com', role: 'Weighbridge Operator', photo: '' },
    { id: 2, name: 'Sofia Lin', contact: '+1 (619) 555-0178', email: 's.lin@bridgescale.com', role: 'Logistics Coordinator', photo: '' },
    { id: 3, name: 'Ravi Patel', contact: '+1 (619) 555-0109', email: 'r.patel@bridgescale.com', role: 'QA Supervisor', photo: '' }
  ]);

  const [parties, setParties] = useState([
    { id: 1, name: 'WestCo Steel', contact: '+1 (213) 555-0192', email: 'dispatch@westcosteel.com', address: '1200 Rail Ave, Los Angeles, CA 90001' },
    { id: 2, name: 'GreenLine Cement', contact: '+1 (951) 555-0134', email: 'orders@greenlinecement.com', address: '88 Quarry Way, Riverside, CA 92501' }
  ]);

  const [trucks, setTrucks] = useState([
    { id: 1, truck: 'TRK-2401' },
    { id: 2, truck: 'TRK-5718' }
  ]);

  const [drivers, setDrivers] = useState([
    { id: 1, name: 'Luis Romero', address: '460 Market St, San Diego, CA', contact: '+1 (619) 555-0117' },
    { id: 2, name: 'Nina Brooks', address: '92 Seaside Blvd, Carlsbad, CA', contact: '+1 (760) 555-0166' }
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: 'Steel Rods' },
    { id: 2, name: 'Cement Bags' },
    { id: 3, name: 'Granite Blocks' },
    { id: 4, name: 'Copper Wire Spools' },
    { id: 5, name: 'Limestone' }
  ]);

  const [dialog, setDialog] = useState({ open: false, section: '', mode: 'add', index: null });
  const [form, setForm] = useState({});
  const [deleteDialog, setDeleteDialog] = useState({ open: false, section: '', index: null });

  const openDialog = (section, mode, index = null) => {
    let nextForm = {};
    if (section === 'company') {
      nextForm = { ...company };
    } else if (section === 'owner') {
      nextForm = { ...owner };
    } else if (section === 'users') {
      nextForm = index !== null ? { ...users[index] } : { name: '', contact: '', email: '', role: '' };
    } else if (section === 'parties') {
      nextForm = index !== null ? { ...parties[index] } : { name: '', contact: '', email: '', address: '' };
    } else if (section === 'trucks') {
      nextForm = index !== null ? { ...trucks[index] } : { truck: '' };
    } else if (section === 'drivers') {
      nextForm = index !== null ? { ...drivers[index] } : { name: '', address: '', contact: '' };
    } else if (section === 'products') {
      nextForm = index !== null ? { ...products[index] } : { name: '' };
    }
    setForm(nextForm);
    setDialog({ open: true, section, mode, index });
  };

  const closeDialog = () => {
    setDialog({ open: false, section: '', mode: 'add', index: null });
    setForm({});
  };

  const handleFormChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, photo: String(reader.result || '') }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (dialog.section === 'company') {
      setCompany((prev) => ({ ...prev, ...form }));
    }
    if (dialog.section === 'owner') {
      setOwner((prev) => ({ ...prev, ...form }));
    }
    if (dialog.section === 'users') {
      if (dialog.mode === 'add') {
        setUsers((prev) => [...prev, { ...form, id: Date.now() }]);
      } else {
        setUsers((prev) => prev.map((item, idx) => (idx === dialog.index ? { ...item, ...form } : item)));
      }
    }
    if (dialog.section === 'parties') {
      if (dialog.mode === 'add') {
        setParties((prev) => [...prev, { ...form, id: Date.now() }]);
      } else {
        setParties((prev) => prev.map((item, idx) => (idx === dialog.index ? { ...item, ...form } : item)));
      }
    }
    if (dialog.section === 'trucks') {
      if (dialog.mode === 'add') {
        setTrucks((prev) => [...prev, { ...form, id: Date.now() }]);
      } else {
        setTrucks((prev) => prev.map((item, idx) => (idx === dialog.index ? { ...item, ...form } : item)));
      }
    }
    if (dialog.section === 'drivers') {
      if (dialog.mode === 'add') {
        setDrivers((prev) => [...prev, { ...form, id: Date.now() }]);
      } else {
        setDrivers((prev) => prev.map((item, idx) => (idx === dialog.index ? { ...item, ...form } : item)));
      }
    }
    if (dialog.section === 'products') {
      if (dialog.mode === 'add') {
        setProducts((prev) => [...prev, { ...form, id: Date.now() }]);
      } else {
        setProducts((prev) => prev.map((item, idx) => (idx === dialog.index ? { ...item, ...form } : item)));
      }
    }
    closeDialog();
  };

  const openDeleteDialog = (section, index) => {
    setDeleteDialog({ open: true, section, index });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({ open: false, section: '', index: null });
  };

  const handleDelete = () => {
    const { section, index } = deleteDialog;
    if (section === 'users') {
      setUsers((prev) => prev.filter((_, idx) => idx !== index));
    }
    if (section === 'parties') {
      setParties((prev) => prev.filter((_, idx) => idx !== index));
    }
    if (section === 'trucks') {
      setTrucks((prev) => prev.filter((_, idx) => idx !== index));
    }
    if (section === 'drivers') {
      setDrivers((prev) => prev.filter((_, idx) => idx !== index));
    }
    if (section === 'products') {
      setProducts((prev) => prev.filter((_, idx) => idx !== index));
    }
    closeDeleteDialog();
  };

  const renderPreviewCard = () => (
    <Box
      sx={{
        border: '1px solid #e2e8f0',
        borderRadius: 2,
        p: 3,
        background: '#fff',
        boxShadow: '0 8px 20px rgba(15, 23, 42, 0.08)'
      }}
    >
      {dialog.section === 'users' && (
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src={form.photo || undefined}
              sx={{ width: 72, height: 72, bgcolor: '#c7d2fe', color: '#312e81' }}
            >
              {!form.photo && form.name ? form.name.split(' ').map((part) => part[0]).join('') : null}
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={700}>
                {form.name || 'User Name'}
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                {form.role || 'Role'}
              </Typography>
            </Box>
          </Stack>
          <Divider />
          <InfoRow icon={<PhoneIcon fontSize="small" />} label="Contact" value={form.contact || '-'} />
          <InfoRow icon={<EmailIcon fontSize="small" />} label="Email" value={form.email || '-'} />
        </Stack>
      )}
      {dialog.section === 'parties' && (
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ width: 72, height: 72, bgcolor: '#dcfce7', color: '#166534' }}>
              {form.name ? form.name.split(' ').map((part) => part[0]).join('') : 'P'}
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={700}>
                {form.name || 'Party Name'}
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Partner
              </Typography>
            </Box>
          </Stack>
          <Divider />
          <InfoRow icon={<PhoneIcon fontSize="small" />} label="Contact" value={form.contact || '-'} />
          <InfoRow icon={<EmailIcon fontSize="small" />} label="Email" value={form.email || '-'} />
          <InfoRow icon={<RoomIcon fontSize="small" />} label="Address" value={form.address || '-'} />
        </Stack>
      )}
      {dialog.section === 'drivers' && (
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ width: 72, height: 72, bgcolor: '#ccfbf1', color: '#0f766e' }}>
              {form.name ? form.name.split(' ').map((part) => part[0]).join('') : 'D'}
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={700}>
                {form.name || 'Driver Name'}
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Driver
              </Typography>
            </Box>
          </Stack>
          <Divider />
          <InfoRow icon={<PhoneIcon fontSize="small" />} label="Contact" value={form.contact || '-'} />
          <InfoRow icon={<RoomIcon fontSize="small" />} label="Address" value={form.address || '-'} />
        </Stack>
      )}
    </Box>
  );

  return (
    <PageWrap>
      <GlobalStyles
        styles={{
          '@media print': {
            body: { margin: 0 },
            'body *': { visibility: 'hidden' },
            '#print-profile, #print-profile *': { visibility: 'visible' },
            '#print-profile': {
              display: 'block',
              position: 'fixed',
              inset: 0,
              margin: '24px'
            }
          }
        }}
      />
      <Container maxWidth="lg">
        <Panel>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
            <Box
              sx={{
                width: 46,
                height: 46,
                borderRadius: '12px',
                display: 'grid',
                placeItems: 'center',
                color: '#0f172a',
                background: 'linear-gradient(135deg, #e2e8f0 0%, #f8fafc 100%)',
                border: '1px solid #e2e8f0'
              }}
            >
              <BusinessIcon />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700} sx={{ color: '#0f172a' }}>
                Management
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Company profile, users, parties, drivers, and products.
              </Typography>
            </Box>
            <Box sx={{ ml: 'auto' }} className="no-print">
              <Button variant="outlined" size="small" onClick={() => openDialog('company', 'edit')}>
                Edit Company
              </Button>
            </Box>
          </Box>

          <Grid container spacing={2.5}>
            <Grid item xs={12} md={6}>
              <SectionCard>
                <CardContent>
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                    <Avatar sx={{ bgcolor: '#1e293b' }}>{company.logo}</Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#0f172a' }}>
                        Company Details
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#64748b' }}>
                        Primary company information
                      </Typography>
                    </Box>
                  </Stack>
                  <Divider sx={{ mb: 1.5 }} />
                  <InfoRow icon={<BusinessIcon fontSize="small" />} label="Name" value={company.name} />
                  <InfoRow icon={<RoomIcon fontSize="small" />} label="Address" value={company.address} />
                  <InfoRow icon={<GroupIcon fontSize="small" />} label="Total Users" value={`${company.users} users`} />
                </CardContent>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <SectionCard>
                <CardContent>
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                    <Avatar sx={{ bgcolor: '#0ea5e9' }}>{owner.photo}</Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#0f172a' }}>
                        Owner Information
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#64748b' }}>
                        Account holder and primary contact
                      </Typography>
                    </Box>
                  </Stack>
                  <Divider sx={{ mb: 1.5 }} />
                  <InfoRow icon={<PersonIcon fontSize="small" />} label="Name" value={owner.name} />
                  <InfoRow icon={<PhoneIcon fontSize="small" />} label="Contact" value={owner.contact} />
                  <InfoRow icon={<EmailIcon fontSize="small" />} label="Email" value={owner.email} />
                  <InfoRow icon={<Chip label={owner.role} size="small" />} label="Role" value="" />
                  <Box sx={{ mt: 1 }}>
                    <Button variant="outlined" size="small" onClick={() => openDialog('owner', 'edit')}>
                      Edit Owner
                    </Button>
                  </Box>
                </CardContent>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={7}>
              <SectionCard>
                <CardContent>
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                    <GroupIcon sx={{ color: '#2563eb' }} />
                    <Box>
                      <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#0f172a' }}>
                        Users
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#64748b' }}>
                        Active system users
                      </Typography>
                    </Box>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<AddIcon />}
                      sx={{ ml: 'auto' }}
                      onClick={() => openDialog('users', 'add')}
                    >
                      Add User
                    </Button>
                  </Stack>
                  <Divider sx={{ mb: 1.5 }} />
                  <List disablePadding>
                    {users.map((user, index) => (
                      <ListItem key={user.id} sx={{ px: 0 }}>
                        <ListItemAvatar>
                          <Avatar src={user.photo || undefined} sx={{ bgcolor: '#c7d2fe', color: '#312e81' }}>
                            {!user.photo ? user.name.split(' ').map((part) => part[0]).join('') : null}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={user.name}
                          secondary={
                            <>
                              <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                                {user.role}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                                {user.contact} • {user.email}
                              </Typography>
                            </>
                          }
                        />
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <Tooltip title="Preview user">
                            <IconButton size="small" onClick={() => openDialog('users', 'preview', index)}>
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit user">
                            <IconButton size="small" onClick={() => openDialog('users', 'edit', index)}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete user">
                            <IconButton size="small" color="error" onClick={() => openDeleteDialog('users', index)}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={5}>
              <SectionCard>
                <CardContent>
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                    <Inventory2Icon sx={{ color: '#f97316' }} />
                    <Box>
                      <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#0f172a' }}>
                        Product List
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#64748b' }}>
                        Materials currently handled
                      </Typography>
                    </Box>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<AddIcon />}
                      sx={{ ml: 'auto' }}
                      onClick={() => openDialog('products', 'add')}
                    >
                      Add Product
                    </Button>
                  </Stack>
                  <Divider sx={{ mb: 1.5 }} />
                  <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                    {products.map((product, index) => (
                      <Chip
                        key={product.id}
                        label={product.name}
                        sx={{ bgcolor: '#f1f5f9' }}
                        onDelete={() => openDeleteDialog('products', index)}
                        deleteIcon={<DeleteIcon />}
                        onClick={() => openDialog('products', 'edit', index)}
                      />
                    ))}
                  </Stack>
                </CardContent>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <SectionCard>
                <CardContent>
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                    <BusinessIcon sx={{ color: '#10b981' }} />
                    <Box>
                      <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#0f172a' }}>
                        Party Details
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#64748b' }}>
                        Buyers, sellers, and partners
                      </Typography>
                    </Box>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<AddIcon />}
                      sx={{ ml: 'auto' }}
                      onClick={() => openDialog('parties', 'add')}
                    >
                      Add Party
                    </Button>
                  </Stack>
                  <Divider sx={{ mb: 1.5 }} />
                  <List disablePadding>
                    {parties.map((party, index) => (
                      <ListItem key={party.id} sx={{ px: 0, alignItems: 'flex-start' }}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: '#dcfce7', color: '#166534' }}>
                            {party.name.split(' ').map((part) => part[0]).join('')}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={party.name}
                          secondary={
                            <>
                              <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                                {party.contact} • {party.email}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                                {party.address}
                              </Typography>
                            </>
                          }
                        />
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <Tooltip title="Preview party">
                            <IconButton size="small" onClick={() => openDialog('parties', 'preview', index)}>
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit party">
                            <IconButton size="small" onClick={() => openDialog('parties', 'edit', index)}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete party">
                            <IconButton size="small" color="error" onClick={() => openDeleteDialog('parties', index)}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <SectionCard>
                <CardContent>
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                    <LocalShippingIcon sx={{ color: '#6366f1' }} />
                    <Box>
                      <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#0f172a' }}>
                        Truck Details
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#64748b' }}>
                        Registered truck numbers
                      </Typography>
                    </Box>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<AddIcon />}
                      sx={{ ml: 'auto' }}
                      onClick={() => openDialog('trucks', 'add')}
                    >
                      Add Truck
                    </Button>
                  </Stack>
                  <Divider sx={{ mb: 1.5 }} />
                  <List disablePadding>
                    {trucks.map((truck, index) => (
                      <ListItem key={truck.id} sx={{ px: 0 }}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: '#e0e7ff', color: '#3730a3' }}>
                            {truck.truck.slice(-2)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={truck.truck}
                          secondary={
                            <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                              Truck number
                            </Typography>
                          }
                        />
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <Tooltip title="Edit truck">
                            <IconButton size="small" onClick={() => openDialog('trucks', 'edit', index)}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete truck">
                            <IconButton size="small" color="error" onClick={() => openDeleteDialog('trucks', index)}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <SectionCard>
                <CardContent>
                  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                    <PersonIcon sx={{ color: '#14b8a6' }} />
                    <Box>
                      <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#0f172a' }}>
                        Driver Details
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#64748b' }}>
                        Driver name, address, and contact
                      </Typography>
                    </Box>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<AddIcon />}
                      sx={{ ml: 'auto' }}
                      onClick={() => openDialog('drivers', 'add')}
                    >
                      Add Driver
                    </Button>
                  </Stack>
                  <Divider sx={{ mb: 1.5 }} />
                  <List disablePadding>
                    {drivers.map((driver, index) => (
                      <ListItem key={driver.id} sx={{ px: 0 }}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: '#ccfbf1', color: '#0f766e' }}>
                            {driver.name.split(' ').map((part) => part[0]).join('')}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={driver.name}
                          secondary={
                            <>
                              <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                                {driver.address}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                                {driver.contact}
                              </Typography>
                            </>
                          }
                        />
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <Tooltip title="Preview driver">
                            <IconButton size="small" onClick={() => openDialog('drivers', 'preview', index)}>
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit driver">
                            <IconButton size="small" onClick={() => openDialog('drivers', 'edit', index)}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete driver">
                            <IconButton size="small" color="error" onClick={() => openDeleteDialog('drivers', index)}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </SectionCard>
            </Grid>
          </Grid>
        </Panel>
      </Container>
      <Box id="print-profile" sx={{ display: 'none' }}>
        {dialog.mode === 'preview' && renderPreviewCard()}
      </Box>
      <Dialog open={dialog.open} onClose={closeDialog} fullWidth maxWidth="sm" className="no-print">
        <DialogTitle sx={{ fontWeight: 700 }}>
          {dialog.mode === 'add' ? 'Add' : dialog.mode === 'preview' ? 'Preview' : 'Edit'} {dialog.section.replace('-', ' ')}
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          {dialog.mode === 'preview' && (
            renderPreviewCard()
          )}
          {dialog.section === 'company' && (
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField label="Company Name" value={form.name || ''} onChange={handleFormChange('name')} fullWidth />
              <TextField label="Company Address" value={form.address || ''} onChange={handleFormChange('address')} fullWidth />
              <TextField label="Company Logo (Initials)" value={form.logo || ''} onChange={handleFormChange('logo')} fullWidth />
              <TextField label="Total Users" value={form.users || ''} onChange={handleFormChange('users')} type="number" fullWidth />
            </Stack>
          )}
          {dialog.section === 'owner' && (
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField label="Owner Name" value={form.name || ''} onChange={handleFormChange('name')} fullWidth />
              <TextField label="Contact" value={form.contact || ''} onChange={handleFormChange('contact')} fullWidth />
              <TextField label="Email" value={form.email || ''} onChange={handleFormChange('email')} fullWidth />
              <TextField label="Role" value={form.role || ''} onChange={handleFormChange('role')} fullWidth />
              <TextField label="Photo Initials" value={form.photo || ''} onChange={handleFormChange('photo')} fullWidth />
            </Stack>
          )}
          {dialog.section === 'users' && dialog.mode !== 'preview' && (
            <Stack spacing={2} sx={{ mt: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  src={form.photo || undefined}
                  sx={{ width: 56, height: 56, bgcolor: '#c7d2fe', color: '#312e81' }}
                >
                  {!form.photo && form.name ? form.name.split(' ').map((part) => part[0]).join('') : null}
                </Avatar>
                <Button variant="outlined" component="label" disabled={dialog.mode === 'preview'}>
                  Upload Photo
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handlePhotoChange}
                  />
                </Button>
              </Box>
              <TextField label="User Name" value={form.name || ''} onChange={handleFormChange('name')} fullWidth disabled={dialog.mode === 'preview'} />
              <TextField label="Contact" value={form.contact || ''} onChange={handleFormChange('contact')} fullWidth disabled={dialog.mode === 'preview'} />
              <TextField label="Email" value={form.email || ''} onChange={handleFormChange('email')} fullWidth disabled={dialog.mode === 'preview'} />
              <FormControl fullWidth disabled={dialog.mode === 'preview'}>
                <InputLabel id="user-role-label">Role</InputLabel>
                <Select
                  labelId="user-role-label"
                  label="Role"
                  value={form.role || ''}
                  onChange={handleFormChange('role')}
                >
                  <MenuItem value="User">User</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Super Admin">Super Admin</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          )}
          {dialog.section === 'parties' && dialog.mode !== 'preview' && (
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField label="Party Name" value={form.name || ''} onChange={handleFormChange('name')} fullWidth disabled={dialog.mode === 'preview'} />
              <TextField label="Contact" value={form.contact || ''} onChange={handleFormChange('contact')} fullWidth disabled={dialog.mode === 'preview'} />
              <TextField label="Email" value={form.email || ''} onChange={handleFormChange('email')} fullWidth disabled={dialog.mode === 'preview'} />
              <TextField label="Address" value={form.address || ''} onChange={handleFormChange('address')} fullWidth disabled={dialog.mode === 'preview'} />
            </Stack>
          )}
          {dialog.section === 'trucks' && (
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField label="Truck Name/Number" value={form.truck || ''} onChange={handleFormChange('truck')} fullWidth />
            </Stack>
          )}
          {dialog.section === 'drivers' && dialog.mode !== 'preview' && (
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField label="Driver Name" value={form.name || ''} onChange={handleFormChange('name')} fullWidth disabled={dialog.mode === 'preview'} />
              <TextField label="Driver Address" value={form.address || ''} onChange={handleFormChange('address')} fullWidth disabled={dialog.mode === 'preview'} />
              <TextField label="Driver Contact" value={form.contact || ''} onChange={handleFormChange('contact')} fullWidth disabled={dialog.mode === 'preview'} />
            </Stack>
          )}
          {dialog.section === 'products' && (
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField label="Product Name" value={form.name || ''} onChange={handleFormChange('name')} fullWidth />
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>{dialog.mode === 'preview' ? 'Close' : 'Cancel'}</Button>
          {dialog.mode === 'preview' && (
            <Button variant="contained" onClick={() => window.print()}>
              Print
            </Button>
          )}
          {dialog.mode !== 'preview' && (
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialog.open} onClose={closeDeleteDialog}>
        <DialogTitle sx={{ fontWeight: 700 }}>Confirm Delete</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            Are you sure you want to delete this item? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </PageWrap>
  );
}

export default Management;
