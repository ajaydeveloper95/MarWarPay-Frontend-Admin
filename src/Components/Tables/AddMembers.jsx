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
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../../Context/SidebarContext';

const AddMembers = () => {
  const [memberType, setMemberType] = useState(''); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [transactionPassword, setTransactionPassword] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [packageType, setPackageType] = useState('');
  const [minimumWallet, setMinimumWallet] = useState('');
  const [status, setStatus] = useState('');

  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Member added:', {
      memberType,
      name,
      email,
      role,
      phone,
      password,
      transactionPassword,
      country,
      state,
      city,
      packageType,
      minimumWallet,
      status,
    });

    // Reset form fields
    setMemberType('');
    setName('');
    setEmail('');
    setRole('');
    setPhone('');
    setPassword('');
    setTransactionPassword('');
    setCountry('');
    setState('');
    setCity('');
    setPackageType('');
    setMinimumWallet('');
    setStatus('');
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
          Add New Member
        </Typography>

        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="member-type">Member Type</InputLabel>
                <Select
                  labelId="member-type-label"
                  value={memberType}
                  onChange={(e) => setMemberType(e.target.value)}
                  label="Member Type"
                >
                  <MenuItem value="MasterDistributor">Master Distributor</MenuItem>
                  <MenuItem value="Distributor">Distributor</MenuItem>
                  <MenuItem value="Retailer">Retailer</MenuItem>
                  <MenuItem value="APIUser">API User</MenuItem>
                  <MenuItem value="User">User</MenuItem>
                  <MenuItem value="User">User</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Transaction Password"
                type="password"
                variant="outlined"
                fullWidth
                value={transactionPassword}
                onChange={(e) => setTransactionPassword(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="country-label">Country</InputLabel>
                <Select
                  labelId="country-label"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  label="Country"
                >
                  <MenuItem value="USA">USA</MenuItem>
                  <MenuItem value="Canada">Canada</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="state-label">State</InputLabel>
                <Select
                  labelId="state-label"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  label="State"
                >
                  <MenuItem value="California">California</MenuItem>
                  <MenuItem value="New York">New York</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="package-type-label">Package Type</InputLabel>
                <Select
                  labelId="package-type-label"
                  value={packageType}
                  onChange={(e) => setPackageType(e.target.value)}
                  label="Package Type"
                >
                  <MenuItem value="Basic">Basic</MenuItem>
                  <MenuItem value="Premium">Premium</MenuItem>
                  <MenuItem value="Enterprise">Enterprise</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Minimum Wallet Balance"
                type="number"
                variant="outlined"
                fullWidth
                value={minimumWallet}
                onChange={(e) => setMinimumWallet(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  label="Status"
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Add Member
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AddMembers;
