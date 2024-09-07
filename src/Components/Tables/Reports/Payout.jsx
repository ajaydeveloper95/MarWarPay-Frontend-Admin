import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSidebar } from '../../../Context/SidebarContext';
import axios from 'axios';
import { accessToken,domainBase } from '../../../helpingFile';

const API_ENDPOINT = `${domainBase}api/v1/payout/allPayOutPayment`;
const ACCESS_TOKEN = accessToken;

const Payout = () => {
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();
  const [searchQuery, setSearchQuery] = useState('');
  const [date, setDate] = useState('');
  const [pageSize, setPageSize] = useState('25'); // Default to 25 items per page
  const [currentPage, setCurrentPage] = useState(1); // Pagination starts at 1
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
        setData(response.data.data.map((item, index) => ({
          id: index + 1, // Sequential ID starting from 1
          memberId: item.userInfo.memberId,
          name: item.userInfo.fullName,
          accountNumber: item.accountNumber,
          ifsc: item.ifscCode,
          amount: `${item.amount}`,
          txnId: item.trxId,
          rrn: 'N/A', // No RRN field in the response
          status: item.isSuccess,
          dateTime: new Date(item.createdAt).toISOString().split('T')[0], // Convert to 'YYYY-MM-DD'
        })));
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((item) => {
    const matchesSearch = item.memberId.toLowerCase().includes(searchQuery.toLowerCase()) || item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = date ? item.dateTime.startsWith(date) : true;
    return matchesSearch && matchesDate;
  });

  const itemsToDisplay = pageSize === 'all' ? filteredData.length : parseInt(pageSize, 10);
  const startIndex = (currentPage - 1) * itemsToDisplay;
  const endIndex = startIndex + itemsToDisplay;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setCurrentPage(1); // Reset to first page when pageSize changes
  };

  const handlePageChange = (direction) => {
    if (direction === 'next' && endIndex < filteredData.length) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
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
      <Container
        maxWidth="xl"
        style={{
          marginLeft: isSidebarOpen ? '16rem' : '10rem',
          transition: 'margin-left 0.3s ease',
          minWidth: '600px',
          maxWidth: '80%',
          marginTop: '8%',
        }}
      >
        <Paper sx={{ p: 2, boxShadow: 3 }}>
          {/* Header Section */}
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
                    Payout
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Search by Member ID or Name"
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
          </Grid>

          {/* Table Section */}
          <TableContainer component={Paper}>
            <Table sx={{ borderCollapse: 'collapse' }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>MemberID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Account No.</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>IFSC</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Txn ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>RRN</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', border: '1px solid rgba(224, 224, 224, 1)' }}>Date Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} sx={{ textAlign: 'center' }}>
                      No data found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{item.id}</TableCell>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{item.memberId}</TableCell>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{item.name}</TableCell>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{item.accountNumber}</TableCell>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{item.ifsc}</TableCell>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{item.amount}</TableCell>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{item.txnId}</TableCell>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{item.rrn}</TableCell>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{item.status}</TableCell>
                      <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{item.dateTime}</TableCell>
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
                  onClick={() => handlePageChange('prev')}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handlePageChange('next')}
                  disabled={endIndex >= filteredData.length}
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

export default Payout;
