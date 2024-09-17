import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Container, Typography, Table, TableBody, TableCell,Dialog,DialogContent,DialogActions, DialogTitle,TableContainer, TableHead, TableRow, Paper, IconButton, Grid, TextField, Button, MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSidebar } from '../../../Context/SidebarContext';
import axios from 'axios';
import { accessToken,domainBase } from '../../../helpingFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Icon for success
import CancelIcon from '@mui/icons-material/Cancel'; // Icon for failure

const API_ENDPOINT = `${domainBase}apiAdmin/v1/payin/allSuccessPayIn`;
const USER_LIST_API = 'http://localhost:5000/apiAdmin/v1/utility/getUserList';
const ACCESS_TOKEN = accessToken;

const Payin = () => {
  const navigate = useNavigate(); 
  const { isSidebarOpen } = useSidebar(); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [startDate, setStartDate] = useState(''); 
  const [endDate, setEndDate] = useState(''); 
  const [pageSize, setPageSize] = useState('all'); 
  const [currentPage, setCurrentPage] = useState(0); 
  const [previousPage, setPreviousPage] = useState(0); 
  const [dropdownValue, setDropdownValue] = useState(''); 

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogSeverity, setDialogSeverity] = useState('info');
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
        // Adjust response data mapping here
        setData(response.data.data.map(item => ({
          id: item._id,
          memberId: item.userInfo.memberId,
          txnID: item.trxId,
          bankRRN: item.bankRRN,
          amount: `${item.amount}`,
          charge: `${item.chargeAmount}`,
          credit: `${item.finalAmount}`,
          vpaID: item.vpaId,
          description: item.payerName, // Use payerName for description
          dateTime: new Date(item.createdAt).toISOString().split('T')[0], // Convert to 'YYYY-MM-DD'
          status: item.isSuccess
        })));
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    const fetchUserList = async () => {
      try {
        const response = await axios.get(USER_LIST_API, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
        setUserList(response.data.data); // Store user data
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
    fetchUserList();

  }, []);

  useEffect(() => {
    setCurrentPage(0);
    setPreviousPage(0);
  }, [pageSize]);

  // Filter members based on search query and date range
  const filteredMembers = data.filter((member) => {
    const matchesName = member.memberId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = (!startDate || new Date(member.dateTime) >= new Date(startDate)) &&
                        (!endDate || new Date(member.dateTime) <= new Date(endDate));
    return matchesName && matchesDate;
  });

  const itemsToDisplay = pageSize === 'all' ? filteredMembers.length : parseInt(pageSize, 10);
  const startIndex = currentPage * itemsToDisplay;
  const endIndex = startIndex + itemsToDisplay;
  const paginatedMembers = filteredMembers.slice(startIndex, endIndex);

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
  };

  const handlePageChange = (direction) => {
    if (direction === 'next' && endIndex < filteredMembers.length) {
      setPreviousPage(previousPage);
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 0) {
      setPreviousPage(currentPage);
      setCurrentPage(currentPage - 1);
    }
  };

  const handleBackButtonClick = () => {
    navigate(-1); 
  };

  const handleViewClick = (status) => {
    setDialogMessage(status === 'Success' ? 'Transaction successfully completed' : 'Txn in pending or not completed.');
    setDialogSeverity(status === 'Success' ? 'success' : 'error');
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Box
        sx={{ padding: 3, marginBottom: 2, marginTop: 12 }}
        maxWidth="xl"
        style={{
          marginLeft: isSidebarOpen ? '16rem' : '10rem',
          transition: 'margin-left 0.3s ease',
          minWidth: '600px',
          maxWidth: '80%',
        }}
      >
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: 'background.paper',
                boxShadow: '5px 0 10px -3px rgba(0, 128, 128, 0.6)',
              }}
            >
              <Typography variant="h6" sx={{ color: 'teal' }}>
              Total Success
              </Typography>
              <Typography>₹ 0.00/0</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: 'background.paper',
                boxShadow: '5px 0 10px -3px rgba(0, 128, 128, 0.6)',
              }}
            >
              <Typography variant="h6" sx={{ color: 'teal' }}>
              Total Success Charge
              </Typography>
              <Typography>₹ 0.00/0</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: 'background.paper',
                boxShadow: '5px 0 10px -3px rgba(0, 128, 128, 0.6)',
              }}
            >
              <Typography variant="h6" sx={{ color: 'teal' }}>
              Total Failed
              </Typography>
              <Typography>₹ 0.00/0</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Container
        maxWidth="xl"
        style={{
          marginLeft: isSidebarOpen ? '16rem' : '10rem',
          transition: 'margin-left 0.3s ease',
          minWidth: '600px',
          maxWidth: '80%',
        }}
      >
        <Paper sx={{ p: 2, boxShadow: 3 }}>
          <Grid container alignItems="center" spacing={1} mb={2}>
            <Grid item xs={12} md={3}>
            <Grid item>
                  <IconButton color="primary" onClick={handleBackButtonClick}>
                    <ArrowBackIcon />
                  </IconButton>
                </Grid>
              <Grid container alignItems="center" spacing={1}>
                
                <Grid item>
                  <Typography variant="h4" component="h1" gutterBottom sx={{color: 'teal'}}>
                  UPI Collection
                  </Typography> 
                </Grid>
                
              </Grid>
              
            </Grid>
          </Grid>
          <Grid container alignItems="center" spacing={1} mb={2}>
            <Grid item xs={12} md={3}>
              <TextField
                label="Search by Member ID"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={2}>
          <FormControl fullWidth>
            <InputLabel id="dropdown-label">All Users</InputLabel>
            <Select
              labelId="dropdown-label"
              value={dropdownValue}
              onChange={(e) => setDropdownValue(e.target.value)}
              label="All Users"
            >
              {userList.map((user) => (
                <MenuItem key={user._id} value={user.memberId}>
                  {`${user.fullName} (${user.memberId})`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                type="date"
                label="Start Date"
                variant="outlined"
                fullWidth
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                type="date"
                label="End Date"
                variant="outlined"
                fullWidth
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id="page-size-label">Page Size</InputLabel>
                <Select
                  labelId="page-size-label"
                  value={pageSize}
                  onChange={handlePageSizeChange}
                  label="Page Size"
                >
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                  <MenuItem value="all">View All</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <TableContainer component={Paper}>
            <Table>
            <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>MemberID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>TxnID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Bank RRN</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Charge</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Credit</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>VPAID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Date Time</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    Error: {error.message}
                  </TableCell>
                </TableRow>
              ) : paginatedMembers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No data available.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedMembers.map((row,index) => (
                  <TableRow key={row.id}>
                    <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{startIndex + index + 1}</TableCell>
                    <TableCell  sx={{  border: '1px solid rgba(224, 224, 224, 1)' }}>{row.memberId}</TableCell>
                    <TableCell sx={{  border: '1px solid rgba(224, 224, 224, 1)' }}>{row.txnID}</TableCell>
                    <TableCell sx={{  border: '1px solid rgba(224, 224, 224, 1)' }}>{row.bankRRN}</TableCell>
                    <TableCell sx={{  border: '1px solid rgba(224, 224, 224, 1)' }}>{row.amount}</TableCell>
                    <TableCell sx={{  border: '1px solid rgba(224, 224, 224, 1)' }}>{row.charge}</TableCell>
                    <TableCell sx={{  border: '1px solid rgba(224, 224, 224, 1)' }}>{row.credit}</TableCell>
                    <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{row.vpaID}</TableCell>
                    <TableCell sx={{  border: '1px solid rgba(224, 224, 224, 1)' }}>{row.description}</TableCell>
                    <TableCell sx={{  border: '1px solid rgba(224, 224, 224, 1)' }}>{row.dateTime}</TableCell>
                    <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        {row.status==="Success" ? (
                          <Button
                          sx={{ color: "green", text: 'bold', textTransform: "lowercase"}}
                          >
                            Success
                          </Button>
                        ) : (
                          <Button
                          sx={{ color: "red", text: 'bold', textTransform: "lowercase"}}
                          >
                            Failed
                          </Button>
                        )}
                      </TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleViewClick(row.status)}>
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container justifyContent="space-between" mt={2}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                disabled={currentPage === 0}
                onClick={() => handlePageChange('prev')}
              >
                Previous
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                disabled={endIndex >= filteredMembers.length}
                onClick={() => handlePageChange('next')}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>

            {/* Dialog for showing messages */}
            <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        PaperProps={{
          sx: {
            width: '500px',
            maxWidth: '90%',
            padding: 2,
            borderRadius: 2,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
          },
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center'}}>
        {dialogSeverity === 'success' ? <CheckCircleIcon sx={{ fontSize: 50, color: 'green', mb: 2 }} /> : <CancelIcon sx={{ fontSize: 50, color: 'red', mb: 2 }} />}
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: dialogSeverity === 'error' ? 'red' : 'green' }}>
           
            {dialogMessage}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'end' }}>
          <Button onClick={handleDialogClose} sx={{color: 'white', background: 'blue'}}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Payin;
