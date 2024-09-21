import { useState, useEffect } from 'react';
import {
  TextField,
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
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; 
import { useSidebar } from '../../Context/SidebarContext';

const Profile = () => {
  const [name, setName] = useState('');
  const [firmName, setFirmName] = useState(''); // Changed from `firmName` to `address`
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [frontendLogo, setFrontendLogo] = useState(null);
  const [panelLogo, setPanelLogo] = useState(null);
  const [fileError, setFileError] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();
  const { id } = useParams(); // Get the user ID from the URL parameters

  useEffect(() => {
    // Fetch user data from the API
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/apiAdmin/v1/user/userProfile/${id}`);
        const userData = response.data.data;

        // Update state with user data
        setName(userData.fullName);
        setFirmName(userData.addresh.addresh); // Assuming firmName is the address field
        setEmail(userData.email);
        setMobile(userData.mobileNumber);
        // Add other fields as needed
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]); // Fetch data when component mounts and when ID changes

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/png', 'image/jpeg', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        setFileError('Invalid file type. Only PDF, JPG, and PNG are allowed.');
        return;
      }
      setFileError('');
      setFile(file); // Save the file object instead of a URL
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create FormData object for file uploads
    const formData = new FormData();
    formData.append('fullName', name);
    formData.append('addresh', firmName); // Assuming firmName is the address field
    formData.append('email', email);
    formData.append('mobileNumber', mobile);
    
    // Append the files only if they exist
    if (frontendLogo) {
      formData.append('frontendLogo', frontendLogo);
    }
    if (panelLogo) {
      formData.append('panelLogo', panelLogo);
    }

    try {
      const response = await axios.put(`http://localhost:5000/apiAdmin/v1/user/updateUser/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        // Show success dialog
        setIsDialogOpen(true);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
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
          Update Profile
        </Typography>

        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name*"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Firm Name*"
                variant="outlined"
                fullWidth
                value={firmName}
                onChange={(e) => setFirmName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Mobile*"
                variant="outlined"
                fullWidth
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <input
                type="file"
                accept="image/png, image/jpeg, application/pdf"
                onChange={(e) => handleFileChange(e, setFrontendLogo)}
                style={{ marginBottom: '1rem' }}
              />
              <Typography variant="body2" color="textSecondary">
                Frontend Logo<br />
                {frontendLogo ? 'File selected' : 'No file chosen'}
                <br />
                {fileError && <p style={{ color: 'red' }}>{fileError}</p>}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <input
                type="file"
                accept="image/png, image/jpeg, application/pdf"
                onChange={(e) => handleFileChange(e, setPanelLogo)}
                style={{ marginBottom: '1rem' }}
              />
              <Typography variant="body2" color="textSecondary">
                Panel Logo<br />
                {panelLogo ? 'File selected' : 'No file chosen'}
                <br />
                {fileError && <p style={{ color: 'red' }}>{fileError}</p>}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* Success Dialog */}
        <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Profile Updated Successfully</DialogTitle>
          <DialogContent>
            <Typography>
              Your profile has been successfully updated!
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

export default Profile;
