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
  CircularProgress, // Added for loading indicator
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { useSidebar } from '../../../Context/SidebarContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { accessToken, domainBase } from '../../../helpingFile';

const ACCESS_TOKEN = accessToken;
const API_PayoutCharge = `${domainBase}apiAdmin/v1/utility/getPayOutPackageList`;

const EditPackage = () => {
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();
  const { id } = useParams(); // Package ID from URL parameters

  // State for payout packages
  const [payOutPackages, setPayOutPackages] = useState([]);

  // State for package data
  const [packageData, setPackageData] = useState({
    packageName: '',
    packagePayInCharge: '',
    packagePayOutCharge: '',
    isActive: true,
    // isDefault: false, // Uncomment if needed
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch package data and payout packages on component mount
  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const response = await axios.get(
          `${domainBase}apiAdmin/v1/package/getSinglePackage/${id}`, // API endpoint with package ID
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        );
        if (response.data.statusCode === 200) {
          const data = response.data.data;
          setPackageData({
            packageName: data.packageName || '',
            packagePayInCharge: data.packagePayInCharge || '',
            packagePayOutCharge: data.packagePayOutCharge || '',
            isActive: data.isActive !== undefined ? data.isActive : true,
            // isDefault: data.isDefault || false, // Uncomment if needed
          });
        } else {
          setError(new Error(response.data.message || 'Failed to fetch package data.'));
        }
      } catch (err) {
        console.error('Error fetching package data:', err);
        setError(err);
      }
    };

    const fetchPayOutPackages = async () => {
      try {
        const response = await axios.get(API_PayoutCharge, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
        if (response.data.statusCode === 200) {
          setPayOutPackages(response.data.data);
        } else {
          setError(new Error(response.data.message || 'Failed to fetch payout packages.'));
        }
      } catch (err) {
        console.error('Error fetching payout packages:', err);
        setError(err);
      }
    };

    // Fetch both package data and payout packages concurrently
    const fetchData = async () => {
      await Promise.all([fetchPackageData(), fetchPayOutPackages()]);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPackageData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !packageData.packageName ||
      !packageData.packagePayInCharge ||
      !packageData.packagePayOutCharge
    ) {
      setError(new Error('Please fill in all required fields.'));
      return;
    }

    try {
      const response = await axios.post(
        `${domainBase}apiAdmin/v1/package/updatePackage/${id}`, // API endpoint with package ID
        {
          packageName: packageData.packageName,
          packagePayInCharge: parseFloat(packageData.packagePayInCharge),
          packagePayOutCharge: packageData.packagePayOutCharge,
          isActive: packageData.isActive,
          // isDefault: packageData.isDefault, // Uncomment if needed
        },
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.statusCode === 200) {
        setIsDialogOpen(true);
        setError(null); // Clear any previous errors
        console.log('Package updated successfully!');
      } else {
        setError(new Error(response.data.message || 'Failed to update package.'));
        console.error('Failed to update package:', response.data.message);
      }
    } catch (err) {
      console.error('Error updating package data:', err);
      setError(err);
    }
  };

  // Handle closing of the success dialog
  // Handle closing of the success dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    navigate('/package/view'); // Navigate to the all_packages page
  };

  // Handle cancel button click
  const handleCancel = () => {
    navigate('/package/view'); // Navigate to the all_packages page
  };

  // Loading state
  if (loading) {
    return (
      <Container
        maxWidth="lg"
        style={{
          marginLeft: isSidebarOpen ? '16rem' : '10rem',
          transition: 'margin-left 0.3s ease',
          minWidth: '600px',
          maxWidth: '80%',
          marginTop: '8%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  // Error state
  if (error) {
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
        <Typography variant="h6" color="error">
        No data available
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/packages/all_packages')}
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
      </Container>
    );
  }

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
          onClick={handleCancel}
          color="primary"
          sx={{ position: 'absolute', top: 0, left: 16 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1" gutterBottom>
          Update Package
        </Typography>

        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Package Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Package Name"
                variant="outlined"
                fullWidth
                name="packageName"
                value={packageData.packageName}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Payin Charge */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Package Pay In Charge (%)"
                variant="outlined"
                fullWidth
                name="packagePayInCharge" // Ensure this matches the state key
                value={packageData.packagePayInCharge}
                onChange={handleChange}
                required
                type="number"
                inputProps={{ min: 0, step: '0.01' }}
              />
            </Grid>

            {/* Payout Charge */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="pay-out-charge-label">Package Pay Out Charge</InputLabel>
                <Select
                  labelId="pay-out-charge-label"
                  name='packagePayOutCharge'
                  value={packageData?.packagePayOutCharge}
                  onChange={handleChange}
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

            {/* Status */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status-select"
                  name="isActive"
                  value={packageData.isActive}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Deactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Submit and Cancel Buttons */}
            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mr: 2 }}
              >
                Save Changes
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* Success Dialog */}
        <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Success</DialogTitle>
          <DialogContent>
            <Typography>The package has been successfully updated!</Typography>
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

export default EditPackage;
