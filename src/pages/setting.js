import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Chip
} from '@mui/material';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import SpeedIcon from '@mui/icons-material/Speed';
import UsbIcon from '@mui/icons-material/Usb';
import TuneIcon from '@mui/icons-material/Tune';
import SaveIcon from '@mui/icons-material/Save';
import { styled } from '@mui/material/styles';

const Panel = styled(Paper)(({ theme }) => ({
  borderRadius: '16px',
  padding: theme.spacing(2.5),
  background: 'linear-gradient(140deg, rgba(255,255,255,0.95) 0%, rgba(245,247,250,0.95) 100%)',
  boxShadow: '0 16px 40px rgba(15, 23, 42, 0.15)',
  border: '1px solid rgba(226, 232, 240, 0.9)'
}));

const SectionCard = styled(Card)(({ theme }) => ({
  borderRadius: '14px',
  border: '1px solid rgba(226, 232, 240, 0.9)',
  boxShadow: '0 10px 28px rgba(15, 23, 42, 0.12)',
  background: 'white'
}));

const SettingField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    backgroundColor: '#f8fafc'
  }
}));

function Setting() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at 10% 10%, #eef2ff 0%, #f8fafc 40%, #ffffff 100%)',
        py: { xs: 3, md: 6 }
      }}
    >
      <Container maxWidth="lg">
        <Panel>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: '12px',
                display: 'grid',
                placeItems: 'center',
                color: '#0f172a',
                background: 'linear-gradient(135deg, #e2e8f0 0%, #f8fafc 100%)',
                border: '1px solid #e2e8f0'
              }}
            >
              <SettingsInputComponentIcon />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700} sx={{ color: '#0f172a' }}>
                Device Settings
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Configure COM port, bitrate, and device behavior.
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={2.5}>
            <Grid item xs={12} md={6}>
              <SectionCard>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <UsbIcon sx={{ color: '#2563eb' }} />
                    <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#0f172a' }}>
                      COM Port
                    </Typography>
                    <Chip
                      label="Connected"
                      size="small"
                      sx={{
                        ml: 'auto',
                        backgroundColor: '#dcfce7',
                        color: '#166534',
                        fontWeight: 600
                      }}
                    />
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="com-port-label">Port</InputLabel>
                        <Select labelId="com-port-label" label="Port" defaultValue="COM3">
                          <MenuItem value="COM1">COM1</MenuItem>
                          <MenuItem value="COM2">COM2</MenuItem>
                          <MenuItem value="COM3">COM3</MenuItem>
                          <MenuItem value="COM4">COM4</MenuItem>
                          <MenuItem value="COM5">COM5</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="com-parity-label">Parity</InputLabel>
                        <Select labelId="com-parity-label" label="Parity" defaultValue="None">
                          <MenuItem value="None">None</MenuItem>
                          <MenuItem value="Even">Even</MenuItem>
                          <MenuItem value="Odd">Odd</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="com-data-bits-label">Data Bits</InputLabel>
                        <Select labelId="com-data-bits-label" label="Data Bits" defaultValue={8}>
                          <MenuItem value={5}>5</MenuItem>
                          <MenuItem value={6}>6</MenuItem>
                          <MenuItem value={7}>7</MenuItem>
                          <MenuItem value={8}>8</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="com-stop-bits-label">Stop Bits</InputLabel>
                        <Select labelId="com-stop-bits-label" label="Stop Bits" defaultValue={1}>
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <SettingField
                        fullWidth
                        size="small"
                        label="Auto-reconnect (sec)"
                        defaultValue="10"
                        type="number"
                        inputProps={{ min: 1, max: 120 }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </SectionCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <SectionCard>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <SpeedIcon sx={{ color: '#0ea5e9' }} />
                    <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#0f172a' }}>
                      Bitrate
                    </Typography>
                    <Chip
                      label="Stable"
                      size="small"
                      sx={{
                        ml: 'auto',
                        backgroundColor: '#e0f2fe',
                        color: '#075985',
                        fontWeight: 600
                      }}
                    />
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl fullWidth size="small">
                        <InputLabel id="bitrate-label">Preset</InputLabel>
                        <Select labelId="bitrate-label" label="Preset" defaultValue="9600">
                          <MenuItem value="9600">9600</MenuItem>
                          <MenuItem value="19200">19200</MenuItem>
                          <MenuItem value="38400">38400</MenuItem>
                          <MenuItem value="57600">57600</MenuItem>
                          <MenuItem value="115200">115200</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="caption" sx={{ color: '#64748b' }}>
                        Custom bitrate
                      </Typography>
                      <Slider
                        defaultValue={9600}
                        min={1200}
                        max={115200}
                        step={1200}
                        valueLabelDisplay="auto"
                        sx={{ mt: 1 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <SettingField
                        fullWidth
                        size="small"
                        label="Read Timeout (ms)"
                        defaultValue="500"
                        type="number"
                        inputProps={{ min: 50, max: 5000 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Enable low-latency mode"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </SectionCard>
            </Grid>

            <Grid item xs={12}>
              <SectionCard>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <TuneIcon sx={{ color: '#f97316' }} />
                    <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#0f172a' }}>
                      Device Behavior
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <FormControlLabel control={<Switch defaultChecked />} label="Auto-connect on launch" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControlLabel control={<Switch />} label="Auto-read weight" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControlLabel control={<Switch defaultChecked />} label="Play alert sounds" />
                    </Grid>
                    <Grid item xs={12}>
                      <SettingField
                        fullWidth
                        size="small"
                        label="Device label"
                        defaultValue="Main Scale - Bay 1"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </SectionCard>
            </Grid>
          </Grid>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 1,
              mt: 3
            }}
          >
            <Button variant="outlined">Cancel</Button>
            <Button variant="contained" startIcon={<SaveIcon />}>
              Save Settings
            </Button>
          </Box>
        </Panel>
      </Container>
    </Box>
  );
}

export default Setting;
