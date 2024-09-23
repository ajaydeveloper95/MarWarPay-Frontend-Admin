import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, Table, TableBody, TableCell, TableContainer, Link,
  TableHead, TableRow, Paper, IconButton, Grid, TextField, Button,
  MenuItem, Select, InputLabel, FormControl, Box
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSidebar } from '../../../Context/SidebarContext';
import { accessToken, domainBase } from '../../../helpingFile';
import axios from 'axios';

const API_ENDPOINT = `${domainBase}apiAdmin/v1/user/getUsers`;
const ACCESS_TOKEN = accessToken;

const Users = () => {
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();
  const [searchQuery, setSearchQuery] = useState('');
  const [date, setDate] = useState('');
  const [pageSize, setPageSize] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [previousPage, setPreviousPage] = useState(0);
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        })
        setUsersData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };


  useEffect(() => {
    setCurrentPage(0);
    setPreviousPage(0);
    fetchData()
  }, [pageSize]);

  // Filter users based on search query and date
  const filteredUsers = usersData.filter((user) => {
    const matchesName = user.userName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = date ? user.createdAt.split('T')[0] === date : true;
    return matchesName && matchesDate;
  });

  const itemsToDisplay = pageSize === 'all' ? filteredUsers.length : parseInt(pageSize, 10);
  const startIndex = currentPage * itemsToDisplay;
  const endIndex = startIndex + itemsToDisplay;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
  };

  const handlePageChange = (direction) => {
    if (direction === 'next' && endIndex < filteredUsers.length) {
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
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                p: 4,
                borderRadius: 2,
                backgroundColor: 'background.paper',
                boxShadow: '5px 0 10px -3px rgba(0, 128, 128, 0.6)',
                minHeight: "150px",
              }}
            >
              <Typography variant="h6" sx={{ color: 'teal' }}>
                Total E-Wallet Balance
              </Typography>
              <Typography>₹</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                p: 4,
                borderRadius: 2,
                backgroundColor: 'background.paper',
                boxShadow: '5px 0 10px -3px rgba(0, 128, 128, 0.6)',
                minHeight: "150px",
              }}
            >
              <Typography variant="h6" sx={{ color: 'teal' }}>
                Total UPI-Wallet Balance
              </Typography>
              <Typography>₹</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                p: 4,
                borderRadius: 2,
                backgroundColor: 'background.paper',
                boxShadow: '5px 0 10px -3px rgba(0, 128, 128, 0.6)',
                minHeight: "150px",
              }}
            >
              <Typography variant="h6" sx={{ color: 'teal' }}>
                Total Active Users
              </Typography>
              <Typography>₹</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                p: 4,
                borderRadius: 2,
                backgroundColor: 'background.paper',
                boxShadow: '5px 0 10px -3px rgba(0, 128, 128, 0.6)',
                minHeight: "150px",
              }}
            >
              <Typography variant="h6" sx={{ color: 'teal' }}>
                Total Deactive Users
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
                  <Typography variant="h4" component="h1" gutterBottom sx={{color : 'teal'}}>
                    Users
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Search by Name"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                label="Date"
                type="date"
                variant="outlined"
                fullWidth
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
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
            <Grid item xs={12} md={2}>
              <Link href="/members/addMembers">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ height: '56px', background: 'teal' }}
                >
                  Add Member
                </Button>
              </Link>
            </Grid>
          </Grid>

          <TableContainer component={Paper}>
            <Table sx={{ borderCollapse: 'collapse' }}>
            <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Details</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>WalletBalance</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Created</TableCell>
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
                  paginatedUsers.map((user, index) => (
                    <TableRow key={user._id}>
                     <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{index + 1}</TableCell>
                    <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{user.userName}</TableCell>
                    <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
                      <Table size="small" sx={{ borderCollapse: 'collapse', width: '100%' }}>
                        <TableBody>
                          <TableRow>
                            <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', fontWeight: 'bold' }}>Email:</TableCell>
                            <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{user.email}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', fontWeight: 'bold' }}>Phone:</TableCell>
                            <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{user.mobileNumber}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableCell>
                    <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
                      <Table size="small" sx={{ borderCollapse: 'collapse', width: '100%' }}>
                        <TableBody>
                          <TableRow>
                            <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', fontWeight: 'bold' }}>E wallet</TableCell>
                            <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{user.EwalletBalance}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', fontWeight: 'bold' }}>UPI Wallet</TableCell>
                            <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{user.upiWalletBalance}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableCell>
                    <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{user.createdAt}</TableCell>
                    <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        {user.isActive ? (
                          <Button
                            sx={{
                              color: "green",
                              backgroundColor: "rgba(0, 128, 0, 0.1)",
                              // border: "1px solid green",
                              borderRadius: 2,
                              padding: "2px 10px",
                            }}
                          >
                            Active
                          </Button>
                        ) : (
                          <Button
                            sx={{
                              color: "red",
                              backgroundColor: "rgba(255, 0, 0, 0.1)",
                              // border: "1px solid red",
                              borderRadius: 2,
                              padding: "2px 10px",
                            }}
                          >
                            Deactive
                          </Button>
                        )}
                      </TableCell>
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

          <Box mt={2} display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              onClick={() => handlePageChange('prev')}
              disabled={currentPage === 0}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handlePageChange('next')}
              disabled={endIndex >= filteredUsers.length}
            >
              Next
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Users;



