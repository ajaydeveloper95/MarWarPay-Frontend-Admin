import { useState } from 'react';
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Container,
  Typography,
  Grid,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../../../Context/SidebarContext';

const PayoutCharge = () => {
  const [selectedPackage, setSelectedPackage] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [startRange, setStartRange] = useState('');
  const [endRange, setEndRange] = useState('');
  const [mdCharge, setMdCharge] = useState('');
  const [dtCharge, setDtCharge] = useState('');
  const [rtCharge, setRtCharge] = useState('');
  const [apiCharge, setApiCharge] = useState('');

  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsDialogOpen(true);
    setSelectedPackage('');
    setIsDefault(false);
    setStartRange('');
    setEndRange('');
    setMdCharge('');
    setDtCharge('');
    setRtCharge('');
    setApiCharge('');
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    navigate(-1); 
  };

  const handleSearch = () => {
    console.log('Searching for:', selectedPackage);
  };

  return (
    <Container
      maxWidth="lg"
      style={{
        marginLeft: isSidebarOpen ? '16rem' : '10rem',
        transition: 'margin-left 0.3s ease',
        minWidth: '600px',
        maxWidth: '80%',
        marginTop: '8%',
      }}
    >
      <Box
        sx={{
          mt: 4,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'background.paper',
          position: 'relative',
        }}
      >
        <IconButton
          onClick={() => navigate(-1)}
          color="primary"
          sx={{ position: 'absolute', top: 0, left: 16 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" component="h1" gutterBottom>
          Add Package
        </Typography>

        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs={12} sm={8}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="select-package-label">Select Package</InputLabel>
              <Select
                labelId="select-package-label"
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
                label="Select Package"
              >
                <MenuItem value="Package1">Package 1</MenuItem>
                <MenuItem value="Package2">Package 2</MenuItem>
                <MenuItem value="Package3">Package 3</MenuItem>
                {/* Add more options as needed */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              fullWidth
            >
              Search
            </Button>
          </Grid>
        </Grid>

        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Start Range"
                variant="outlined"
                fullWidth
                value={startRange}
                onChange={(e) => setStartRange(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="End Range"
                variant="outlined"
                fullWidth
                value={endRange}
                onChange={(e) => setEndRange(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="MD Charge"
                variant="outlined"
                fullWidth
                value={mdCharge}
                onChange={(e) => setMdCharge(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="DT Charge"
                variant="outlined"
                fullWidth
                value={dtCharge}
                onChange={(e) => setDtCharge(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="RT Charge"
                variant="outlined"
                fullWidth
                value={rtCharge}
                onChange={(e) => setRtCharge(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="API Charge"
                variant="outlined"
                fullWidth
                value={apiCharge}
                onChange={(e) => setApiCharge(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isDefault}
                    onChange={(e) => setIsDefault(e.target.checked)}
                    color="primary"
                  />
                }
                label=" Is Default ?"
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-end" spacing={2}>
              <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
                Submit
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* Success Dialog */}
        <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Success</DialogTitle>
          <DialogContent>
            <Typography>
              The package has been successfully added!
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default PayoutCharge;
