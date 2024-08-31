import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Container, Typography, Table, TableBody, TableCell, TableContainer, Link, TableHead, TableRow, Paper, IconButton, Grid, TextField, Button, MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import back arrow icon
import { useSidebar } from '../../../Context/SidebarContext';

const membersData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', selfBalance: '$1000', downlineBalance: '$500', created: '2023-08-01', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210', selfBalance: '$800', downlineBalance: '$300', created: '2023-07-15', status: 'Inactive' },
  // Add more member objects as needed
];

const Users = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { isSidebarOpen } = useSidebar(); // Get sidebar state
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [date, setDate] = useState(''); // State for selected date
  const [pageSize, setPageSize] = useState('all'); // State for items per page
  const [currentPage, setCurrentPage] = useState(0); // State for current page
  const [previousPage, setPreviousPage] = useState(0); // State for previous page

  useEffect(() => {
    // Reset page number when pageSize changes to handle "View All"
    setCurrentPage(0);
    setPreviousPage(0);
  }, [pageSize]);

  // Filter members based on search query and date
  const filteredMembers = membersData.filter((member) => {
    const matchesName = member.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = date ? member.created === date : true; // Filter by date if selected
    return matchesName && matchesDate;
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
    navigate(-1); // Navigate to the previous page
  };

  return (
    <>
      {/* Boxes outside the main Container */}
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


      {/* Main Container for the rest of the content */}
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
          {/* Header Section */}
          <Grid container alignItems="center" spacing={1} mb={2}>
            <Grid item xs={12} md={3}>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <IconButton
                    color="primary"
                    onClick={handleBackButtonClick}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography variant="h5" component="h1" gutterBottom>
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
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                label="Date"
                type="date"
                variant="outlined"
                fullWidth
                value={date}
                onChange={(e) => setDate(e.target.value)} // Update date
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
                  sx={{ height: '56px' }}
                >
                  Add Member
                </Button>
              </Link>
            </Grid>
          </Grid>

          {/* Table Section */}
          <TableContainer component={Paper}>
            <Table sx={{ borderCollapse: 'collapse' }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Details</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Self Balance</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Downline Balance</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Created</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedMembers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} sx={{ textAlign: 'center' }}>
                      No members found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{member.id}</TableCell>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{member.name}</TableCell>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
                        <Table size="small" sx={{ borderCollapse: 'collapse', width: '100%' }}>
                          <TableBody>
                            <TableRow>
                              <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', fontWeight: 'bold' }}>Email:</TableCell>
                              <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{member.email}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', fontWeight: 'bold' }}>Phone:</TableCell>
                              <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{member.phone}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableCell>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{member.selfBalance}</TableCell>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{member.downlineBalance}</TableCell>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{member.created}</TableCell>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{member.status}</TableCell>
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
          {pageSize !== 'all' && (
            <Grid container spacing={2} justifyContent="center" mt={2}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBackButtonClick}
                  disabled={previousPage === 0}
                >
                  Back
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handlePageChange('prev')}
                  disabled={currentPage === 0}
                >
                  Previous
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handlePageChange('next')}
                  disabled={endIndex >= filteredMembers.length}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default Users;
