import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useSidebar } from '../../../Context/SidebarContext';
import axios from 'axios';
import { accessToken } from "../../../helpingFile";
const ACCESS_TOKEN = accessToken;

const EditMember = () => {
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/apiAdmin/v1/user/userProfile/${id}`, {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        );
        if (response.data.statusCode === 200) {
          setUserData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
 await axios.post(
        `http://localhost:5000/apiAdmin/v1/user/updateUser/${userData._id}`,
        userData, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      ).then((data)=>{
        console.log(data,"on success")
        // if (response.data.statusCode === 200) {
        //   alert('User updated successfully');
        //   navigate('/members/all_members');
        // } else {
        //   alert('Failed to update user');
        // }
      }).catch((err)=>{
        console.error('Error updating user data:', err);
      })
  };

  const handleBackButtonClick = () => {
    navigate('/members/all_members');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(userData)

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      addresh: {
        ...prevData.addresh,
        [name]: value,
      },
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const { addresh = {} } = userData;
  const {
    country = '',
  } = addresh;

  return (
    <Container
      maxWidth="xl"
      style={{
        marginLeft: isSidebarOpen ? '16rem' : '10rem',
        transition: 'margin-left 0.3s ease',
        minWidth: '600px',
        maxWidth: '80%',
        marginTop: '8%',
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
                value={userData.userName || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                fullWidth
                value={userData.password || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Transaction Password"
                name="trxPassword"
                type="password"
                variant="outlined"
                fullWidth
                value={userData.trxPassword || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Phone"
                name="mobileNumber"
                variant="outlined"
                fullWidth
                value={userData.mobileNumber || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                fullWidth
                value={userData.email || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Package"
                name="package"
                variant="outlined"
                fullWidth
                value={userData.package || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Minimum Wallet Balance"
                name="minWalletBalance"
                variant="outlined"
                fullWidth
                value={userData.minWalletBalance || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="E Wallet Balance"
                name="EwalletBalance"
                variant="outlined"
                fullWidth
                value={userData.EwalletBalance || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="UPI Wallet Balance"
                name="upiWalletBalance"
                variant="outlined"
                fullWidth
                value={userData.upiWalletBalance || ''}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Country"
                name="country"
                variant="outlined"
                fullWidth
                value={country || ''}
                onChange={handleAddressChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="isActive"
                  value={userData.isActive ? 'Active' : 'Deactive'}
                  onChange={(e) => handleChange({ target: { name: 'isActive', value: e.target.value === 'Active' } })}
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

export default EditMember;
