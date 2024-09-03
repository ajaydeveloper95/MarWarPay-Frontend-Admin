import { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../../Context/SidebarContext';

const Profile = () => {
  const [name, setName] = useState('Suresh Dudi');
  const [firmName, setFirmName] = useState('Info Solutions Private Limited');
  const [email, setEmail] = useState('marwarpay@gmail.com');
  const [mobile, setMobile] = useState('8619082889');
  const [frontendLogo, setFrontendLogo] = useState(null);
  const [panelLogo, setPanelLogo] = useState(null);
  const [fileError, setFileError] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for success dialog

  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/png', 'image/jpeg', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        setFileError('Invalid file type. Only PDF, JPG, and PNG are allowed.');
        return;
      }
      setFileError('');
      setFile(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log('Profile updated:', {
      name,
      firmName,
      email,
      mobile,
      frontendLogo,
      panelLogo,
    });

    // Show success dialog
    setIsDialogOpen(true);

    // Reset form fields
    setFrontendLogo(null);
    setPanelLogo(null);
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
