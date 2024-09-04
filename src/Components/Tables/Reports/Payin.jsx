import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Grid, TextField, Button, MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSidebar } from '../../../Context/SidebarContext';
import axios from 'axios';

const API_ENDPOINT = 'http://pulsesync11.com/api/v1/payin/allSuccessPayIn';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmM4NmI3NTk4NjEyMGE2NGEyOTQ2ZmEiLCJ1c2VyTmFtZSI6Im1haW51c2VyIiwibWVtYmVySWQiOiJNUEFQSTgzNjcwMiIsIm1lbWJlclR5cGUiOiJTdXBlckFkbWluIiwiaWF0IjoxNzI1NDI2MTQ5LCJleHAiOjE3MjU1MTI1NDl9.6HOjL12kSvAAxwFR_kHPqYETKpRAvk7-nnt6Nc3DnTQ';

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

    fetchData();
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
              <Typography variant="h6" sx={{ color: 'blue' }}>
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
              <Typography variant="h6" sx={{ color: 'blue' }}>
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
              <Typography variant="h6" sx={{ color: 'blue' }}>
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
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <IconButton color="primary" onClick={handleBackButtonClick}>
                    <ArrowBackIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography variant="h5" component="h1" gutterBottom>
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
                  label="Dropdown Label"
                >
                  <MenuItem value="option1">Option 1</MenuItem>
                  <MenuItem value="option2">Option 2</MenuItem>
                  <MenuItem value="option3">Option 3</MenuItem>
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
                {paginatedMembers.map((row,index) => (
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
                    <TableCell sx={{  border: '1px solid rgba(224, 224, 224, 1)' }}>{row.status ? 'Success' : 'Failed'}</TableCell>
                    <TableCell>
                      <IconButton color="primary">
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
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
    </>
  );
};

export default Payin;
