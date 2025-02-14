import { useState, useEffect } from 'react';
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
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../../../Context/SidebarContext';
import { apiGet, apiPost } from '../../../utils/http';

const API_ENDPOINT = `apiAdmin/v1/package/addPackage`;
const API_PayoutCharge = `apiAdmin/v1/utility/getPayOutPackageList`;
const API_PayinCharge = `apiAdmin/v1/utility/getPayInPackageList`;

const AddPackage = () => {
  const [packageName, setPackageName] = useState('');
  const [packageInfo, setPackageInfo] = useState('');
  const [packagePayOutCharge, setPackagePayOutCharge] = useState('');  
  const [packagePayInCharge, setPackagePayInCharge] = useState('');   
  const [status, setStatus] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [payOutPackages, setPayOutPackages] = useState([]);
  const [payInPackages, setPayInPackages] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();

  useEffect(() => {
    const fetchPayOutPackages = async () => {
      try {
        const response = await apiGet(API_PayoutCharge);
        setPayOutPackages(response.data.data);
      } catch (err) {
        console.error('Error fetching payout packages:', err);
        setError('Failed to load payout packages. Please try again later.');
      }
    };

    const fetchPayInPackages = async () => {
      try {
        const response = await apiGet(API_PayinCharge);
        setPayInPackages(response.data.data);
      } catch (err) {
        console.error('Error fetching payin packages:', err);
        setError('Failed to load payin packages. Please try again later.');
      }
    };

    fetchPayInPackages();
    fetchPayOutPackages();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await apiPost(API_ENDPOINT, {
        packageName,
        packageInfo,
        packagePayOutCharge,
        packagePayInCharge,
        isActive: status,
      });

      setSuccessMessage('The package has been successfully added!');
      setIsDialogOpen(true);
      setPackageName('');
      setPackageInfo('');
      setPackagePayOutCharge('');
      setPackagePayInCharge('');
      setStatus(true);
    } catch (err) {
      console.error('Error posting data:', err);
      setError('Failed to add package. Please check your input and try again.');
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    navigate('/package/view');
  };

  const handleCancel = () => {
    navigate(-1); 
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
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'teal' }}>
          Add Package
        </Typography>

        {error && (
          <Typography variant="body1" color="error" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Package Name"
                variant="outlined"
                fullWidth
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Package Info"
                variant="outlined"
                fullWidth
                value={packageInfo}
                onChange={(e) => setPackageInfo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="pay-out-charge-label">Select PayOut Package</InputLabel>
                <Select
                  labelId="pay-out-charge-label"
                  value={packagePayOutCharge}
                  onChange={(e) => setPackagePayOutCharge(e.target.value)}
                  label="Package Pay Out Charge"
                >
                  {payOutPackages.map((pkg) => (
                    <MenuItem key={pkg._id} value={pkg._id}>
                      {pkg.payOutPackageName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="pay-in-charge-label">Select PayIn Package</InputLabel>
                <Select
                  labelId="pay-in-charge-label"
                  value={packagePayInCharge}
                  onChange={(e) => setPackagePayInCharge(e.target.value)}
                  label="Package PayIn Charge"
                >
                  {payInPackages.map((pkg) => (
                    <MenuItem key={pkg._id} value={pkg._id}>
                      {pkg.payInPackageName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  label="Status"
                >
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Deactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="flex-end" spacing={1}>
              <Button type="submit" variant="contained" color="primary" sx={{ mr: 2, background: 'teal' }}>
                Add Package
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
              {successMessage}
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

export default AddPackage;
