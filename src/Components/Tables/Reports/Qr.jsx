import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Grid, TextField, Button, MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSidebar } from '../../../Context/SidebarContext';
import axios from 'axios';
import { accessToken,domainBase } from '../../../helpingFile';

const API_ENDPOINT = `${domainBase}api/v1/payin/allPaymentGenerated`;
const ACCESS_TOKEN = accessToken;

const Qr = () => {
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
        setData(response.data.data); // Updated to use API data structure
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
    const matchesName = member.userInfo.memberId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = (!startDate || new Date(member.createdAt) >= new Date(startDate)) &&
                        (!endDate || new Date(member.createdAt) <= new Date(endDate));
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
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: 'background.paper',
                boxShadow: '5px 0 10px -3px rgba(0, 128, 128, 0.6)',
              }}
            >
              <Typography variant="h6" sx={{ color: 'blue' }}>
                TOTAL BALANCE
              </Typography>
              <Typography>₹</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: 'background.paper',
                boxShadow: '5px 0 10px -3px rgba(0, 128, 128, 0.6)',
              }}
            >
              <Typography variant="h6" sx={{ color: 'blue' }}>
                TOTAL DOWNLINE BALANCE
              </Typography>
              <Typography>₹</Typography>
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
                    UPI QR History
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
                label="Start Date"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                label="End Date"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel id="page-size-label">Items Per Page</InputLabel>
                <Select
                  labelId="page-size-label"
                  value={pageSize}
                  onChange={handlePageSizeChange}
                  label="Items Per Page"
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
            <Table sx={{ borderCollapse: 'collapse' }}>
              <TableHead>
                <TableRow>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Member ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>txnID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>RefID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>IP</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>QR</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Error: {error.message}
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedMembers.map((member, index) => (
                    <TableRow key={member._id}>
                     <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{startIndex + index + 1}</TableCell>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{member.userInfo.memberId}</TableCell>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{member.trxId}</TableCell>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{member.refId}</TableCell>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{member.amount}</TableCell>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{member.ip}</TableCell>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}><button>{member.qr}</button></TableCell>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{new Date(member.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{member.callBackStatus==="Success" ? 'Success' : 'Failed'}</TableCell>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
                        <IconButton color="primary">
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Grid container justifyContent="space-between" mt={2}>
            <Grid item>
              <Button onClick={() => handlePageChange('prev')} disabled={currentPage === 0}>
                Previous
              </Button>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                Page {currentPage + 1} of {Math.ceil(filteredMembers.length / itemsToDisplay)}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                onClick={() => handlePageChange('next')}
                disabled={endIndex >= filteredMembers.length}
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

export default Qr;
