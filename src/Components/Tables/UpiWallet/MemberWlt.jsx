import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Grid, TextField, Button, MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSidebar } from '../../../Context/SidebarContext';
import axios from 'axios';
import { accessToken, domainBase } from '../../../helpingFile';

const API_ENDPOINT = `${domainBase}apiAdmin/v1/wallet/getAllTransactionUpi`;
const ACCESS_TOKEN = accessToken;

const MemberWlt = () => {
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();
  const [searchQuery, setSearchQuery] = useState('');
  const [date, setDate] = useState('');
  const [pageSize, setPageSize] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [previousPage, setPreviousPage] = useState(0);

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
        setData(response.data.data);
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

  // Filter data based on search query and date
  const filteredMembers = data.filter((member) => {
    const matchesMemberId = member.userInfo.memberId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = date ? new Date(member.createdAt).toLocaleDateString() === new Date(date).toLocaleDateString() : true;
    return matchesMemberId && matchesDate;
  });

  // Determine the number of items to display
  const itemsToDisplay = pageSize === 'all' ? filteredMembers.length : parseInt(pageSize, 10);

  // Calculate start and end indices for pagination
  const startIndex = currentPage * itemsToDisplay;
  const endIndex = startIndex + itemsToDisplay;
  const paginatedMembers = filteredMembers.slice(startIndex, endIndex);

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
  };

  const handlePageChange = (direction) => {
    if (direction === 'next' && endIndex < filteredMembers.length) {
      setPreviousPage(currentPage);
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
      <Container
        maxWidth="xl"
        style={{
          marginLeft: isSidebarOpen ? '16rem' : '10rem',
          transition: 'margin-left 0.3s ease',
          minWidth: '600px',
          maxWidth: '80%',
          marginTop: '8%'
        }}
      >
        <Paper sx={{ p: 2, boxShadow: 3 }}>
          <Grid item>
            <IconButton color="primary" onClick={handleBackButtonClick}>
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid container alignItems="center" spacing={1} mb={2}>
            <Grid item xs={12} md={5}>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'teal' }}>
                    UPI Wallet
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Search by MemberID"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                label="Select Date"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
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

          {/* Table Section */}
          <TableContainer component={Paper}>
            <Table sx={{ borderCollapse: 'collapse' }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>MemberID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Before Amount</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Cr/Dr Amount</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>After Amount</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Date Time</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={9} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={9} align="center">
                      Error: {error.message}
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedMembers.map((member, index) => (
                    <TableRow key={member._id}>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{startIndex + index + 1}</TableCell>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{member.userInfo.memberId}</TableCell>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{member.beforeAmount}</TableCell>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{member.transactionAmount}</TableCell>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{member.afterAmount}</TableCell>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{new Date(member.createdAt).toLocaleString()}</TableCell>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        {member.transactionType === "Cr." ? (
                          <Button
                            sx={{ color: "green", text: 'bold', textTransform: "lowercase" }}
                          >
                            Cr.
                          </Button>
                        ) : (
                          <Button
                            sx={{ color: "red", text: 'bold', textTransform: "lowercase" }}
                          >
                            Dr.
                          </Button>
                        )}
                      </TableCell>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{member.description}</TableCell>
                      <TableCell
  sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
>
  {member.transactionStatus === "Success" ? (
    <Button
      sx={{
        color: "green",
        backgroundColor: 'rgba(0, 128, 0, 0.1)',
        border: '1px solid green', 
        borderRadius: 2, 
        padding: '2px 8px', 
      }}
    >
      Success
    </Button>
  ) : (
    <Button
      sx={{
        color: "red",
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        border: '1px solid red', 
        borderRadius: 2,
        padding: '2px 8px',
      }}
    >
      Failed
    </Button>
  )}
</TableCell>

                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination Section */}
          <Box display="flex" justifyContent="center" marginTop={2}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handlePageChange('prev')}
              disabled={previousPage === 0}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handlePageChange('next')}
              disabled={endIndex >= filteredMembers.length}
            >
              Next
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default MemberWlt;
