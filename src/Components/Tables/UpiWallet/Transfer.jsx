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
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../../../Context/SidebarContext';

const Transfer = () => {
  const [member, setMember] = useState('');
  const [availableBalance, setAvailableBalance] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog

  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Display the success dialog
    setIsDialogOpen(true);

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
          UPI-Wallet to E-Wallet Transfer
        </Typography>

        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="member-label">Member</InputLabel>
                <Select
                  labelId="member-label"
                  value={member}
                  onChange={(e) => setMember(e.target.value)}
                  label="Member"
                >
                  <MenuItem value="Member1">Member 1</MenuItem>
                  <MenuItem value="Member2">Member 2</MenuItem>
                  <MenuItem value="Member3">Member 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Available Balance"
                variant="outlined"
                fullWidth
                value={availableBalance}
                onChange={(e) => setAvailableBalance(e.target.value)}
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
            <Grid item xs={12} display="flex" justifyContent="flex-end" spacing={2}>
              <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
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
              The amount has been successfully transferred!
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

export default Transfer;
