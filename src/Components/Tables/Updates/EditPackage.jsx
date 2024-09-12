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
  // Checkbox,
  // FormControlLabel,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { useSidebar } from '../../../Context/SidebarContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { accessToken } from '../../../helpingFile';

const ACCESS_TOKEN = accessToken;

const EditPackage = () => {
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [packageData, setPackageData] = useState({
    packageName: '',
    isActive: true,
    // isDefault: false,
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Use `id` instead of `packageName`

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/apiAdmin/v1/package/getSinglePackage/${id}`, // Use `id` for API call
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        );
        if (response.data.statusCode === 200) {
          setPackageData({
            packageName: response.data.data.packageName,
            isActive: response.data.data.isActive,
            // isDefault: response.data.data.packagePayOutCharge > 0, // Example logic for isDefault
          });
        }
      } catch (error) {
        console.error('Error fetching package data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackageData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/apiAdmin/v1/package/updatePackage/${id}`, // Use `id` for API call
        packageData,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data.statusCode === 200) {
        setIsDialogOpen(true);
      } else {
        console.error('Failed to update package:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating package data:', error);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    navigate('/packages/all_packages');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPackageData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSelectChange = (e) => {
    setPackageData((prevData) => ({
      ...prevData,
      isActive: e.target.value === 'Active',
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
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
          onClick={() => navigate('/packages/all_packages')}
          color="primary"
          sx={{ position: 'absolute', top: 0, left: 16 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" component="h1" gutterBottom>
          Update Package
        </Typography>

        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
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
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  name="isActive"
                  value={packageData.isActive ? 'Active' : 'Deactive'}
                  onChange={handleSelectChange}
                  label="Status"
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Deactive">Deactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isDefault"
                    checked={packageData.isDefault}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label="Is Default?"
              />
            </Grid> */}

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
                onClick={() => navigate('/packages/all_packages')}
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
