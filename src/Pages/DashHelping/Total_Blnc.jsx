import { useEffect, useState } from 'react';
import { Grid, Box, Typography, Snackbar, Alert, Tooltip } from '@mui/material';
import { AccountBalanceWallet, AccountBalance, Money } from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts';
import { apiGet } from '../../utils/http';
const API_GET_USERS_ENDPOINT = `apiAdmin/v1/utility/getUserWithWallet`;
const API_GET_BANK_BALANCE = `apiAdmin/v1/utility/getBalanceFetch`;
const API_GET_WAAYUPAY_2_BALANCE = `apiAdmin/v1/utility/getBalanceFetchImpactPeek`


function Total_Blnc() {
  const [data, setData] = useState([]);
  const [waayuPay, setWaayuPay2Data] = useState([])
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openMoneyBalance, setOpenMoneyBalance] = useState(-1);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiGet(API_GET_USERS_ENDPOINT);
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    const fetchBankData = async () => {
      try {
        const response = await apiGet(API_GET_BANK_BALANCE);
        if (response.data && response.data.data !== undefined) {
          setOpenMoneyBalance(response.data.data);
        } else {
          console.error('Invalid response data for open money balance');
        }
      } catch (error) {
        console.error('Error fetching open money balance', error);
      }
    };
    fetchBankData();
  }, []);

  useEffect(() => {
    if (intervalId) clearInterval(intervalId);
    if (openMoneyBalance < 30000) {
      const id = setInterval(() => {
        setSnackbarMessage('Very low balance! Manage it immediately, or services may be suspended.');
        setOpenSnackbar(true);
      }, 1000);
      setIntervalId(id);
    } else if (openMoneyBalance >= 30000 && openMoneyBalance <= 200000) {
      const id = setInterval(() => {
        setSnackbarMessage('Your balance is low, consider managing it.');
        setOpenSnackbar(true);
      }, 3000);
      setIntervalId(id);
    } else {
      setOpenSnackbar(false);
    }
    return () => clearInterval(intervalId);
  }, [openMoneyBalance]);

  useEffect(() => {
    const fetchWaayuPayData = async () => {
      try {
        const response = await apiGet(API_GET_WAAYUPAY_2_BALANCE);
        setWaayuPay2Data(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchWaayuPayData();
  }, []);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const chartData = [
    { name: 'Jan', EwalletBalance: 40000, upiWalletBalance: 24000, openMoneyBalance: 24000 },
    { name: 'Feb', EwalletBalance: 30000, upiWalletBalance: 13980, openMoneyBalance: 22100 },
    { name: 'Mar', EwalletBalance: 20000, upiWalletBalance: 9800, openMoneyBalance: 22900 },
    { name: 'Apr', EwalletBalance: 27800, upiWalletBalance: 39080, openMoneyBalance: 20000 },
    { name: 'May', EwalletBalance: 18900, upiWalletBalance: 4800, openMoneyBalance: 21810 },
    { name: 'Jun', EwalletBalance: 23900, upiWalletBalance: 3800, openMoneyBalance: 25000 },
    { name: 'Jul', EwalletBalance: 34900, upiWalletBalance: 4300, openMoneyBalance: 21000 },
  ];

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #ff6b6b, #f7c6c7)',
              boxShadow: 3,
              textAlign: 'center',
              minHeight: '250px', 
              position: 'relative',
              transition: 'transform 0.4s, box-shadow 0.4s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 24px rgba(0, 0, 0, 0.25)',
              },
            }}
          >
            <Tooltip title="E-Wallet">
              <AccountBalanceWallet sx={{ color: 'white', fontSize: 40, position: 'absolute', top: 16, right: 16 }} />
            </Tooltip>
            <Typography variant="h6" sx={{ color: 'white', mb: 1, mt: 2 }}>
              E-Wallet Balance
            </Typography>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
              ₹ {data?.length > 0 ? data.reduce((total, user) => total + user.EwalletBalance, 0).toLocaleString('en-IN', { minimumFractionDigits: 2 }) : '0.00'}
            </Typography>
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.3)" />
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <RechartsTooltip />
                <Line type="monotone" dataKey="EwalletBalance" stroke="#ffffff" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Grid>

        {/* UPI-Wallet Balance */}
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #36d1dc, #5b86e5)',
              boxShadow: 3,
              textAlign: 'center',
              minHeight: '250px',
              position: 'relative',
              transition: 'transform 0.4s, box-shadow 0.4s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 24px rgba(0, 0, 0, 0.25)',
              },
            }}
          >
            <Tooltip title="UPI-Wallet">
              <AccountBalance sx={{ color: 'white', fontSize: 40, position: 'absolute', top: 16, right: 16 }} />
            </Tooltip>
            <Typography variant="h6" sx={{ color: 'white', mb: 1, mt: 2 }}>
              UPI-Wallet Balance
            </Typography>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
              ₹ {data?.length > 0 ? data.reduce((total, user) => total + user.upiWalletBalance, 0).toLocaleString('en-IN', { minimumFractionDigits: 2 }) : '0.00'}
            </Typography>
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.3)" />
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <RechartsTooltip />
                <Line type="monotone" dataKey="upiWalletBalance" stroke="#ffffff" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Grid>

        

        {/* Open Money Balance */}
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #ff9a8b, #ff6a00)',
              boxShadow: 3,
              textAlign: 'center',
              minHeight: '250px',
              position: 'relative',
              transition: 'transform 0.4s, box-shadow 0.4s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 24px rgba(0, 0, 0, 0.25)',
              },
            }}
          >
            <Tooltip title="Waayupay Money">
              <Money sx={{ color: 'white', fontSize: 40, position: 'absolute', top: 16, right: 16 }} />
            </Tooltip>
            <Typography variant="h6" sx={{ color: 'white', mb: 1, mt: 2 }}>
            Waayupay-Brightbuck Balance
            </Typography>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
              ₹ {openMoneyBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </Typography>
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.3)" />
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <RechartsTooltip />
                <Line type="monotone" dataKey="openMoneyBalance" stroke="#ffffff" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Grid>

         <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #9b4f94, #5b86e5)',
              boxShadow: 3,
              textAlign: 'center',
              minHeight: '250px',
              position: 'relative',
              transition: 'transform 0.4s, box-shadow 0.4s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 24px rgba(0, 0, 0, 0.25)',
              },
            }}
          >
            <Tooltip title="Waayupay-2">
              <AccountBalance sx={{ color: 'white', fontSize: 40, position: 'absolute', top: 16, right: 16 }} />
            </Tooltip>
            <Typography variant="h6" sx={{ color: 'white', mb: 1, mt: 2 }}>
            Waayupay-ImpactPeak Balance
            </Typography>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
              ₹ {waayuPay.data.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </Typography>
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.3)" />
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <RechartsTooltip />
                <Line type="monotone" dataKey="WaayupayBalance" stroke="#ffffff" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Grid>

         <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #dc36a7c4, #131d32)',
              boxShadow: 3,
              textAlign: 'center',
              minHeight: '250px',
              position: 'relative',
              transition: 'transform 0.4s, box-shadow 0.4s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 24px rgba(0, 0, 0, 0.25)',
              },
            }}
          >
            <Tooltip title="Iservu">
              <AccountBalance sx={{ color: 'white', fontSize: 40, position: 'absolute', top: 16, right: 16 }} />
            </Tooltip>
            <Typography variant="h6" sx={{ color: 'white', mb: 1, mt: 2 }}>
            Iservu Balance
            </Typography>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
              ₹ 00.00
            </Typography>
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.3)" />
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <RechartsTooltip />
                <Line type="monotone" dataKey="iservuBalance" stroke="#ffffff" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Grid>

         <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              background: 'linear-gradient(135deg, rgb(80 167 17), #5b86e5)',
              boxShadow: 3,
              textAlign: 'center',
              minHeight: '250px',
              position: 'relative',
              transition: 'transform 0.4s, box-shadow 0.4s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 24px rgba(0, 0, 0, 0.25)',
              },
            }}
          >
            <Tooltip title="IsmartPay">
              <AccountBalance sx={{ color: 'white', fontSize: 40, position: 'absolute', top: 16, right: 16 }} />
            </Tooltip>
            <Typography variant="h6" sx={{ color: 'white', mb: 1, mt: 2 }}>
            IsmartPay Balance
            </Typography>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
              ₹ 00.00
            </Typography>
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.3)" />
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <RechartsTooltip />
                <Line type="monotone" dataKey="ismartPayBalance" stroke="#ffffff" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </Grid>

      {/* Snackbar for low balance alerts */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Total_Blnc;
