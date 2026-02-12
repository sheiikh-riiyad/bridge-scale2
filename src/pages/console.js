import React, { useEffect, useMemo, useState } from 'react';
import * as XLSX from 'xlsx';
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
  TextField
} from '@mui/material';

function Console() {
  const [rows, setRows] = useState([]);
  const [filters, setFilters] = useState({
    id: '',
    driver: '',
    truck: '',
    seller: '',
    buyer: '',
    product: '',
    startDate: '',
    endDate: '',
    firstWeight: '',
    secondWeight: '',
    fee: ''
  });

  useEffect(() => {
    const loadPrinted = async () => {
      if (window?.electronAPI?.dbListPrinted) {
        try {
          const data = await window.electronAPI.dbListPrinted();
          setRows(Array.isArray(data) ? data : []);
          return;
        } catch (error) {
          console.error('Failed to load printed tickets:', error);
        }
      }
      setRows([]);
    };

    loadPrinted();
  }, []);

  const formatDateTime = (value) => {
    if (!value) return '—';
    const dt = new Date(value);
    if (Number.isNaN(dt.getTime())) return value;
    return dt.toLocaleString();
  };

  const escapeHtml = (value) => {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  const handlePrint = async (row) => {
    let companyInfo = { companyname: '', companyaddress: '', companycontact: '' };
    try {
      if (window?.electronAPI?.dbCompanyGet) {
        const data = await window.electronAPI.dbCompanyGet();
        if (data) companyInfo = data;
      }
    } catch (error) {
      console.error('Failed to load company info for print:', error);
    }

    let userInfo = null;
    try {
      if (window?.electronAPI?.dbUserGet && row.userid) {
        userInfo = await window.electronAPI.dbUserGet(Number(row.userid));
      }
    } catch (error) {
      console.error('Failed to load user info for print:', error);
    }

    const printUserName = userInfo?.username || row.username || '—';
    const printUserContact = userInfo?.contact || '—';

    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (!printWindow) return;

    const content = `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Weight Ticket - ${escapeHtml(row.id ?? '')}</title>
          <style>
            @page { size: A4 portrait; margin: 0.3in; }
            * { box-sizing: border-box; }
            body { margin: 0; font-family: Arial, Helvetica, sans-serif; color: #111; }
            .sheet { width: 8.27in; height: 11.69in; padding: 0.2in; border: 1px solid #ccc; }
            .header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.12in; }
            .title { font-size: 18px; font-weight: 700; }
            .meta { font-size: 12px; color: #000000; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.08in 0.2in; font-size: 12px; }
            .row { display: flex; gap: 0.12in; }
            .label { min-width: 1.1in; color: #000000; font-weight: 600; }
            .value { font-weight: 600; color: #111; }
            .weights { margin-top: 0.15in; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.12in; font-size: 13px; }
            .weight-box { border: 1px solid #ddd; padding: 0.12in; border-radius: 6px; }
            .weight-title { font-size: 11px; color: #000000; margin-bottom: 0.04in; }
            .weight-value { font-size: 15px; font-weight: 700; }
            .contact { margin-top: -18px;}
            .contact2 { margin-top: -1px;}
            .contact3 { margin-top: -1px; float: right}
          </style>
        </head>
        <body>
          <div class="sheet">
            <div class="header">
              <div>
                <div class="title">${escapeHtml(companyInfo.companyname || 'Company')}</div>
                <div class="meta">${escapeHtml(companyInfo.companyaddress || '')}</div>
                <div class="meta">Contact: ${escapeHtml(companyInfo.companycontact || '—')}</div>
              </div>
              <div class="meta">Date: ${escapeHtml(row.createdate ?? '—')}</div>
              <div class="meta">Ticket ID: ${escapeHtml(row.id ?? '—')}</div>
            </div>
            <div class="grid">
              <div class="row"><div class="label">Truck</div><div class="value">${escapeHtml(row.trucknumber)}</div></div>
              <div class="row"><div class="label">Driver</div><div class="value">${escapeHtml(row.drivername)}</div></div>
              <div class="row"><div class="label">Buyer</div><div class="value">${escapeHtml(row.buyername)}</div></div>
              <div class="row"><div class="label">Seller</div><div class="value">${escapeHtml(row.sellername)}</div></div>
              <div class="row"><div class="label">Product</div><div class="value">${escapeHtml(row.productname)}</div></div>
              <div class="row"><div class="label">Spec</div><div class="value">${escapeHtml(row.specification)}</div></div>
              <div class="row"><div class="label">Created By</div><div class="value">${escapeHtml(printUserName)}</div></div>
              <div class="row"><div class="label">User Contact</div><div class="value">${escapeHtml(printUserContact)}</div></div>
              <div class="row"><div class="label">1st Time</div><div class="value">${escapeHtml(formatDateTime(row.firstweightdate))}</div></div>
              <div class="row"><div class="label">2nd Time</div><div class="value">${escapeHtml(formatDateTime(row.secondweightdate))}</div></div>
            </div>
            <div class="weights">
              <div class="weight-box">
                <div class="weight-title">First Weight</div>
                <div class="weight-value">${escapeHtml(row.firstweight)} kg</div>
              </div>
              <div class="weight-box">
                <div class="weight-title">Second Weight</div>
                <div class="weight-value">${escapeHtml(row.secondweight)} kg</div>
              </div>
              <div class="weight-box">
                <div class="weight-title">Net Weight</div>
                <div class="weight-value">${escapeHtml(row.netweight)} kg</div>
              </div>
            </div>
            <p class="contact2">Web: appdevloper.com</p>
            <p class="contact">mail: contact@appdevloper.com</p>
            <p class="contact">whatsapp: +8801710666995</p>
            <p class="contact3">Oparetor Sign</p>
          </div>
              
          <script>
            window.onload = () => { window.focus(); };
            document.addEventListener('keydown', (e) => {
              if ((e.ctrlKey || e.metaKey) && String(e.key).toLowerCase() === 'p') {
                e.preventDefault();
                window.print();
              }
            });
          </script>
        </body>
      </html>`;

    printWindow.document.open();
    printWindow.document.write(content);
    printWindow.document.close();
  };

  const filteredRows = useMemo(() => {
    const toStr = (v) => String(v ?? '').toLowerCase();
    const id = filters.id.trim();
    const driver = filters.driver.trim().toLowerCase();
    const truck = filters.truck.trim().toLowerCase();
    const seller = filters.seller.trim().toLowerCase();
    const buyer = filters.buyer.trim().toLowerCase();
    const product = filters.product.trim().toLowerCase();
    const firstWeight = filters.firstWeight.trim();
    const secondWeight = filters.secondWeight.trim();
    const fee = filters.fee.trim();

    const start = filters.startDate ? new Date(filters.startDate) : null;
    const end = filters.endDate ? new Date(filters.endDate) : null;
    if (end) {
      end.setHours(23, 59, 59, 999);
    }

    return rows.filter((row) => {
      if (id && String(row.id ?? '') !== id) return false;
      if (driver && !toStr(row.drivername).includes(driver)) return false;
      if (truck && !toStr(row.trucknumber).includes(truck)) return false;
      if (seller && !toStr(row.sellername).includes(seller)) return false;
      if (buyer && !toStr(row.buyername).includes(buyer)) return false;
      if (product && !toStr(row.productname).includes(product)) return false;

      if (firstWeight && String(row.firstweight ?? '') !== firstWeight) return false;
      if (secondWeight && String(row.secondweight ?? '') !== secondWeight) return false;
      if (fee && String(row.fee ?? '') !== fee) return false;

      if (start || end) {
        const dt = row.firstweightdate ? new Date(row.firstweightdate) : null;
        if (!dt || Number.isNaN(dt.getTime())) return false;
        if (start && dt < start) return false;
        if (end && dt > end) return false;
      }

      return true;
    });
  }, [rows, filters]);


  const handleExport = () => {
    if (!filteredRows.length) return;
    const data = filteredRows.map((row) => ({
      ID: row.id ?? '',
      Truck: row.trucknumber ?? '',
      Driver: row.drivername ?? '',
      Buyer: row.buyername ?? '',
      Seller: row.sellername ?? '',
      Product: row.productname ?? '',
      Date: row.createdate ?? '',
      Fee: row.fee ?? '',
      'First Weight': row.firstweight ?? '',
      'Second Weight': row.secondweight ?? '',
      'Net Weight': row.netweight ?? '',
      Average: row.avarage ?? '',
      'First Weight Time': row.firstweightdate ?? '',
      'Second Weight Time': row.secondweightdate ?? '',
      'Created By': row.username ?? ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Printed Tickets');

    const stamp = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(workbook, `printed-tickets-${stamp}.xlsx`);
  };

  return (
    <Container maxWidth={false} sx={{ py: 3, maxWidth: '100%' }}>
      <Card sx={{ borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
            Printed Tickets
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Filters
            </Typography>
            <Grid container spacing={1.5}>
              <Grid item xs={12} sm={6} md={2}>
                <TextField label="ID" value={filters.id} onChange={(e) => setFilters({ ...filters, id: e.target.value })} fullWidth size="small" />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField label="Driver" value={filters.driver} onChange={(e) => setFilters({ ...filters, driver: e.target.value })} fullWidth size="small" />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField label="Truck" value={filters.truck} onChange={(e) => setFilters({ ...filters, truck: e.target.value })} fullWidth size="small" />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField label="Seller" value={filters.seller} onChange={(e) => setFilters({ ...filters, seller: e.target.value })} fullWidth size="small" />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField label="Buyer" value={filters.buyer} onChange={(e) => setFilters({ ...filters, buyer: e.target.value })} fullWidth size="small" />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField label="Product" value={filters.product} onChange={(e) => setFilters({ ...filters, product: e.target.value })} fullWidth size="small" />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField label="Start Date" type="date" InputLabelProps={{ shrink: true }} value={filters.startDate} onChange={(e) => setFilters({ ...filters, startDate: e.target.value })} fullWidth size="small" />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField label="End Date" type="date" InputLabelProps={{ shrink: true }} value={filters.endDate} onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} fullWidth size="small" />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField label="First Weight" value={filters.firstWeight} onChange={(e) => setFilters({ ...filters, firstWeight: e.target.value })} fullWidth size="small" />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField label="Second Weight" value={filters.secondWeight} onChange={(e) => setFilters({ ...filters, secondWeight: e.target.value })} fullWidth size="small" />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField label="Fee" value={filters.fee} onChange={(e) => setFilters({ ...filters, fee: e.target.value })} fullWidth size="small" />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Button variant="outlined" size="small" fullWidth onClick={() => setFilters({
                  id: '', driver: '', truck: '', seller: '', buyer: '', product: '',
                  startDate: '', endDate: '', firstWeight: '', secondWeight: '', fee: ''
                })}>
                  Clear
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Button variant="contained" size="small" fullWidth onClick={handleExport}>
                  Export Excel
                </Button>
              </Grid>
            </Grid>
          </Box>

          {filteredRows.length === 0 ? (
            <Box sx={{ py: 6, textAlign: 'center', color: 'text.secondary' }}>
              No printed tickets yet.
            </Box>
          ) : (
            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: 'none' }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Truck</TableCell>
                    <TableCell>Driver</TableCell>
                    <TableCell>Buyer</TableCell>
                    <TableCell>Seller</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Fee</TableCell>
                    <TableCell align="right">First Wt</TableCell>
                    <TableCell align="right">Second Wt</TableCell>
                    <TableCell align="right">Net</TableCell>
                    <TableCell align="right">Average</TableCell>
                    <TableCell>1st Time</TableCell>
                    <TableCell>2nd Time</TableCell>
                    <TableCell>Created By</TableCell>
                    <TableCell align="right">Print</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRows.map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.trucknumber || '—'}</TableCell>
                      <TableCell>{row.drivername || '—'}</TableCell>
                      <TableCell>{row.buyername || '—'}</TableCell>
                      <TableCell>{row.sellername || '—'}</TableCell>
                      <TableCell>{row.productname || '—'}</TableCell>
                      <TableCell>{row.createdate || '—'}</TableCell>
                      <TableCell align="right">{row.fee ?? '—'}</TableCell>
                      <TableCell align="right">{row.firstweight ?? '—'}</TableCell>
                      <TableCell align="right">{row.secondweight ?? '—'}</TableCell>
                      <TableCell align="right">{row.netweight ?? '—'}</TableCell>
                      <TableCell align="right">{row.avarage ?? '—'}</TableCell>
                      <TableCell>{formatDateTime(row.firstweightdate)}</TableCell>
                      <TableCell>{formatDateTime(row.secondweightdate)}</TableCell>
                      <TableCell>{row.username || '—'}</TableCell>
                      <TableCell align="right">
                        <Button size="small" variant="outlined" onClick={() => handlePrint(row)}>
                          Print
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default Console;
