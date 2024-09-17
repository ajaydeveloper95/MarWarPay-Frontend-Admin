import { useEffect, useState } from 'react';
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
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../../../Context/SidebarContext';
import axios from 'axios';
import { accessToken, domainBase } from '../../../helpingFile';

const API_GET_USERS_ENDPOINT = `${domainBase}apiAdmin/v1/utility/getUserWithUpiWallet`;
const API_TRANSFER_ENDPOINT = `${domainBase}apiAdmin/v1/wallet/eWalletFundCredit`;
const ACCESS_TOKEN = accessToken;

const Cr = () => {
  const [member, setMember] = useState('');
  const [availableBalance, setAvailableBalance] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [description, setDescription] = useState('');
  const [transactionType, setTransactionType] = useState('CR');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();

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

  const handleMemberChange = async (e) => {
    const selectedMemberId = e.target.value;
    setMember(selectedMemberId);

    // Find the selected member from the data and set the available balance
    const selectedMember = data.find((item) => item._id === selectedMemberId);
    if (selectedMember) {
      setAvailableBalance(selectedMember.upiWalletBalance);
    } else {
      setAvailableBalance('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate transfer amount
    if (parseFloat(transferAmount) > parseFloat(availableBalance)) {
      alert('Transfer amount cannot exceed the available balance.');
      return;
    }

    if (parseFloat(transferAmount) <= 10) {
      alert('Transfer amount must be greater than 10.');
      return;
    }

    // Construct the request body
    const requestBody = {
      transactionAmount: parseFloat(transferAmount),
      transactionType: transactionType === 'CR' ? 'Cr.' : 'Dr.',
    };

    // API Call to transfer the amount
    try {
      const response = await axios.post(
        `${API_TRANSFER_ENDPOINT}/${member}`, // Use member ID in the endpoint
        requestBody, // Pass the request body
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      if (response.status === 200) {
        // Display the success dialog with transaction details
        const { data } = response.data;

        // Update the available balance based on response data
        setAvailableBalance(data.afterAmount.toString());

        setIsDialogOpen(true);
      }
    } catch (err) {
      alert('An error occurred while processing the transaction.');
      console.log(err);
    }

    // Reset form fields
    setMember('');
    setAvailableBalance('');
    setTransferAmount('');
    setDescription('');
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    navigate(-1); // Navigate to the previous page
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
        <Typography variant="h4" component="h1" gutterBottom sx={{color: 'teal'}}>
          Credit Fund
        </Typography>

        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="member-label">Member</InputLabel>
                <Select
                  labelId="member-label"
                  value={member}
                  onChange={handleMemberChange}
                  label="Member"
                >
                  {data.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.fullName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Available Balance"
                variant="outlined"
                fullWidth
                value={availableBalance}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Transfer Amount"
                type="number"
                variant="outlined"
                fullWidth
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="transaction-type-label">Transaction Type</InputLabel>
                <Select
                  labelId="transaction-type-label"
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value)}
                  label="Transaction Type"
                  readOnly
                >
                  <MenuItem value="CR">Credit</MenuItem>
                  <MenuItem value="DR">Debit</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} container spacing={2} justifyContent="flex-end">
              <Button type="submit" variant="contained" color="primary" sx={{ mr: 2, background: 'teal' }}>
                Submit
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* Success Dialog */}
        <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Transfer Successful</DialogTitle>
          <DialogContent>
            <Typography>
              The amount has been successfully credited!
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

export default Cr;
