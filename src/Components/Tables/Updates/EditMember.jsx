import { Container, Typography, TextField, Button, Grid, Paper, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../../../Context/SidebarContext';

const EditView = () => {
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleBackButtonClick = () => {
    navigate('/members/all_members');
  };

  return (
    <Container
      maxWidth="xl"
      style={{
        marginLeft: isSidebarOpen ? '16rem' : '10rem',
        transition: 'margin-left 0.3s ease',
        minWidth: '600px',
        maxWidth: '80%',
        marginTop: '8%'
      }}
    >
      <Paper sx={{ p: 2, boxShadow: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom>
        Update Member
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBackButtonClick}
          sx={{ mb: 2 }}
        >
          Back to Members
        </Button>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="User Name"
                name="userName"
                variant="outlined"
                fullWidth
                // value and onChange handlers here
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                fullWidth
                // value and onChange handlers here
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Transaction Password"
                name="trxPassword"
                type="password"
                variant="outlined"
                fullWidth
                // value and onChange handlers here
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Phone"
                name="mobileNumber"
                variant="outlined"
                fullWidth
                // value and onChange handlers here
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                fullWidth
                // value and onChange handlers here
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Package"
                name="packageName"
                variant="outlined"
                fullWidth
                // value and onChange handlers here
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Minimum Wallet Balance"
                name="minWalletBalance"
                variant="outlined"
                fullWidth
                // value and onChange handlers here
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="E Wallet Balance"
                name="EwalletBalance"
                variant="outlined"
                fullWidth
                // value and onChange handlers here
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="UPI Wallet Balance"
                name="upiWalletBalance"
                variant="outlined"
                fullWidth
                // value and onChange handlers here
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="isActive"
                  // value and onChange handlers here
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Deactive">Deactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mr: 2 }}
            >
              Save Changes
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleBackButtonClick}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default EditView;
