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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../../../Context/SidebarContext';

const Settlement = () => {
  const [member, setMember] = useState('');
  const { isSidebarOpen } = useSidebar();
  const [availableBalance, setAvailableBalance] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navigate = useNavigate();

  const handleMemberChange = (e) => {
    setMember(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to handle form submission
    setIsDialogOpen(true); // Open the dialog on form submit
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    navigate(-1); // Navigate to the previous page
  };

  // Sample transaction data as an object
  const transactionData = [
    { id: 1, key: "Transaction ID", value: "TXN123456" },
    { id: 2, key: "Member", value: "Member 1" },
    { id: 3, key: "Transfer Amount", value: "1000" },
    { id: 4, key: "Description", value: "Transfer to e-wallet" },
    { id: 5, key: "Status", value: "Success" },
  ];

  return (
    <Container
    maxWidth="xl"
    style={{
      marginLeft: isSidebarOpen ? "16rem" : "10rem",
      transition: "margin-left 0.3s ease",
      minWidth: "600px",
      maxWidth: "80%",
      marginTop: "8%",
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
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'teal' }}>
          Settlement Amount
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
                  {/* Replace the options with actual member data */}
                  <MenuItem value="1">Member 1</MenuItem>
                  <MenuItem value="2">Member 2</MenuItem>
                  <MenuItem value="3">Member 3</MenuItem>
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
            <Grid item xs={12} display="flex" justifyContent="flex-end">
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
            <Typography>The amount has been successfully transferred!</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Box>

      {/* Table Container */}
      <Box
        sx={{
          mt: 4,
          p: 2,
          borderRadius: 2,
          boxShadow: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom sx={{ color: 'teal', fontWeight: 'bold' }}>
          Transaction Details
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'lightgray',border: "1px solid rgba(224, 224, 224, 1)" }}>#</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'lightgray',border: "1px solid rgba(224, 224, 224, 1)" }}>User</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'lightgray',border: "1px solid rgba(224, 224, 224, 1)" }}>Settlement Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactionData.map((transaction, index) => (
                <TableRow key={transaction.id}>
                  <TableCell sx={{border: "1px solid rgba(224, 224, 224, 1)"}}>{index + 1}</TableCell>
                  <TableCell sx={{border: "1px solid rgba(224, 224, 224, 1)"}}>{transaction.key}</TableCell>
                  <TableCell sx={{border: "1px solid rgba(224, 224, 224, 1)"}}>{transaction.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Settlement;
