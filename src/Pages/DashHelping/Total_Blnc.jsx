import { useEffect, useState } from 'react';
import { Grid, Box, Typography, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { domainBase, accessToken } from '../../helpingFile';

const API_GET_USERS_ENDPOINT = `${domainBase}apiAdmin/v1/utility/getUserWithWallet`;
const ACCESS_TOKEN = accessToken;

function Total_Blnc() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openMoneyBalance, setOpenMoneyBalance] = useState(750000); // Set default/dummy balance here
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_GET_USERS_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
        setData(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Clear previous interval
    if (intervalId) clearInterval(intervalId);

    // Show messages based on balance conditions
    if (openMoneyBalance < 300000) {
      const id = setInterval(() => {
        setSnackbarMessage('Very low balance! Manage it immediately, or services may be suspended.');
        setOpenSnackbar(true);
      }, 1000); // Show message every second for very low balance
      setIntervalId(id);
    } else if (openMoneyBalance >= 300000 && openMoneyBalance <= 600000) {
      const id = setInterval(() => {
        setSnackbarMessage('Your balance is low, consider managing it.');
        setOpenSnackbar(true);
      }, 3000); // Show message every 3 seconds for mid balance
      setIntervalId(id);
    } else {
      setOpenSnackbar(false);
    }

    // Cleanup interval on component unmount or balance change
    return () => clearInterval(intervalId);
  }, [openMoneyBalance]);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Grid container spacing={3}>
        {/* E-Wallet Balance */}
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              p: 4,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #ff6b6b, #f7c6c7)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              textAlign: 'center',
              minHeight: '180px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.4s, box-shadow 0.4s',
              '&:hover': {
                transform: 'translateY(-10px)',
                boxShadow: '0 12px 24px rgba(0, 0, 0, 0.25)',
              },
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                E-Wallet Balance
              </Typography>
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                ₹ {data.length > 0 ? data.reduce((total, user) => total + user.EwalletBalance, 0).toLocaleString('en-IN', { minimumFractionDigits: 2 }) : '0.00'}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* UPI-Wallet Balance */}
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              p: 4,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #36d1dc, #5b86e5)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              textAlign: 'center',
              minHeight: '180px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.4s, box-shadow 0.4s',
              '&:hover': {
                transform: 'translateY(-10px)',
                boxShadow: '0 12px 24px rgba(0, 0, 0, 0.25)',
              },
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                UPI-Wallet Balance
              </Typography>
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                ₹ {data.length > 0 ? data.reduce((total, user) => total + user.upiWalletBalance, 0).toLocaleString('en-IN', { minimumFractionDigits: 2 }) : '0.00'}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Open Money Balance */}
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              p: 4,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #ff9a8b, #ff6a00)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              textAlign: 'center',
              minHeight: '180px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.4s, box-shadow 0.4s',
              '&:hover': {
                transform: 'translateY(-10px)',
                boxShadow: '0 12px 24px rgba(0, 0, 0, 0.25)',
              },
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                Open Money Balance
              </Typography>
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                ₹ {openMoneyBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </Typography>
              {openMoneyBalance < 300000 && <Typography variant="body2" sx={{ color: 'white' }}>Very low balance! Manage it immediately.</Typography>}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Snackbar for low balance alerts */}
      <Snackbar open={openSnackbar} autoHideDuration={1000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Total_Blnc;
