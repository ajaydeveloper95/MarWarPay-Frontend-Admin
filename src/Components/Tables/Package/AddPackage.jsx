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
import axios from "axios";
import { accessToken,domainBase } from '../../../helpingFile';

const API_ENDPOINT = `${domainBase}apiAdmin/v1/package/addPackage`;
const ACCESS_TOKEN = accessToken;

const AddPackage = () => {
  const [packageName, setPackageName] = useState('');
  const [packageInfo, setPackageInfo] = useState('');
  const [packagePayOutCharge, setPackagePayOutCharge] = useState('');
  const [packagePayInCharge, setPackagePayInCharge] = useState('');
  const [status, setStatus] = useState(true);
  const [isDefault, setIsDefault] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Make the POST request to the API endpoint
      await axios.post(API_ENDPOINT, {
        packageName,
        packageInfo,
        packagePayOutCharge,
        packagePayInCharge,
        isActive: status,
        // isDefault,
      }, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
  
      // Display the success dialog
      setIsDialogOpen(true);
  
      // Reset form fields after a successful POST request
      setPackageName('');
      setPackageInfo('');
      setPackagePayOutCharge('');
      setPackagePayInCharge('');
      setStatus(true);
      setIsDefault(false);
  
      console.log('Data posted successfully!');
    } catch (err) {
      console.error('Error posting data:', err);
      setError(err);
    }
  };

  if (error) return <div>Error: {error.message}</div>;

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    navigate(-1); // Navigate to the previous page
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
              <TextField
                label="Package Pay Out Charge"
                variant="outlined"
                fullWidth
                type="number"
                value={packagePayOutCharge}
                onChange={(e) => setPackagePayOutCharge(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Package Pay In Charge"
                variant="outlined"
                fullWidth
                type="number"
                value={packagePayInCharge}
                onChange={(e) => setPackagePayInCharge(e.target.value)}
              />
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
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isDefault}
                    onChange={(e) => setIsDefault(e.target.checked)}
                    color="primary"
                  />
                }
                label="Is Default?"
              />
            </Grid>
            
            <Grid item xs={12} display="flex" justifyContent="flex-end" spacing={2}>
              <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
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

export default AddPackage;