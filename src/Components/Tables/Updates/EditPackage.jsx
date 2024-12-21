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
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { useSidebar } from '../../../Context/SidebarContext';
import { useState, useEffect } from 'react';
import { accessToken } from '../../../helpingFile';
import { apiDelete, apiGet, apiPost } from '../../../utils/http';

const ACCESS_TOKEN = accessToken;
const API_GET_PACKAGE = `apiAdmin/v1/package/getSinglePackage/`;
const API_UPDATE_PACKAGE = `apiAdmin/v1/package/updatePackage/`;
const API_DELETE_PACKAGE = `apiAdmin/v1/package/deletePackage/`;
const API_PayoutCharge = `apiAdmin/v1/utility/getPayOutPackageList`;
const API_PayinCharge = `apiAdmin/v1/utility/getPayInPackageList`;

const EditPackage = () => {
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();
  const { id } = useParams();

  const [payOutPackages, setPayOutPackages] = useState([]);
  const [payInPackages, setPayInPackages] = useState([]);
  const [packageData, setPackageData] = useState({
    packageName: '',
    packagePayInCharge: '',
    packagePayOutCharge: '',
    isActive: true,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const response = await apiGet(`${API_GET_PACKAGE}${id}`, {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        });
        if (response.data.statusCode === 200) {
          const data = response.data.data;
          setPackageData({
            packageName: data.packageName || '',
            packagePayInCharge: data.packagePayInCharge || '',
            packagePayOutCharge: data.packagePayOutCharge || '',
            isActive: data.isActive !== undefined ? data.isActive : true,
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
        const response = await apiGet(API_PayoutCharge, {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
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

    const fetchPayInPackages = async () => {
      try {
        const response = await apiGet(API_PayinCharge, {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        });
        if (response.data.statusCode === 200) {
          setPayInPackages(response.data.data);
        } else {
          setError(new Error(response.data.message || 'Failed to fetch payin packages.'));
        }
      } catch (err) {
        console.error('Error fetching payin packages:', err);
        setError(err);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchPackageData(), fetchPayOutPackages(), fetchPayInPackages()]);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPackageData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !packageData.packageName ||
      !packageData.packagePayInCharge ||
      !packageData.packagePayOutCharge
    ) {
      setError(new Error('Please fill in all required fields.'));
      return;
    }

    try {
      const response = await apiPost(
        `${API_UPDATE_PACKAGE}${id}`,
        {
          packageName: packageData.packageName,
          packagePayInCharge: packageData.packagePayInCharge,
          packagePayOutCharge: packageData.packagePayOutCharge,
          isActive: packageData.isActive,
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
        setError(null);
      } else {
        setError(new Error(response.data.message || 'Failed to update package.'));
      }
    } catch (err) {
      console.error('Error updating package data:', err);
      setError(err);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await apiDelete(`${API_DELETE_PACKAGE}${id}`, {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      });

      if (response.data.statusCode === 200) {
        alert('Package deleted successfully.');
        navigate('/package/view'); 
      } else {
        setError(new Error(response.data.message || 'Failed to delete package.'));
      }
    } catch (err) {
      console.error('Error deleting package:', err);
      setError(err);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    navigate('/package/view'); 
  };

  const handleCancel = () => {
    navigate('/package/view'); 
  };

  if (loading) {
    return (
      <Container maxWidth="lg" style={{ marginTop: '10%', display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" style={{ marginTop: '10%' }}>
        <Typography variant="h6" color="error">
          {error.message}
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/package/view')}>
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
        <IconButton onClick={handleCancel} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" gutterBottom>
          Update Package
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Form Fields */}
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
              <FormControl fullWidth variant="outlined" required>
                <InputLabel>Select Payin Package</InputLabel>
                <Select
                  name="packagePayInCharge"
                  value={packageData.packagePayInCharge}
                  onChange={handleChange}
                >
                  {payInPackages.map((pkg) => (
                    <MenuItem key={pkg._id} value={pkg._id}>
                      {pkg.payInPackageName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Payout Charge */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel>Select Payout Package</InputLabel>
                <Select
                  name="packagePayOutCharge"
                  value={packageData.packagePayOutCharge}
                  onChange={handleChange}
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
                <InputLabel>Status</InputLabel>
                <Select
                  name="isActive"
                  value={packageData.isActive}
                  onChange={handleChange}
                >
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Deactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Submit and Delete Buttons */}
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
                variant="contained"
                color="error"
                onClick={handleDelete}
                sx={{ mr: 2 }}
              >
                Delete
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
      </Box>

      {/* Success Dialog */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <Typography>The package has been updated successfully.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="contained" color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EditPackage;
