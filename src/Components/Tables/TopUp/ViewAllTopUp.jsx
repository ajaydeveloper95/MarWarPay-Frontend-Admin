import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSidebar } from "../../../Context/SidebarContext";
import { apiGet } from "../../../utils/http";

const API_ENDPOINT = `apiAdmin/v1/fundAdd/allGenFundRequest`;

const ViewAllTopUp = () => {
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState("25");
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
    const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiGet(API_ENDPOINT);
        setData(response.data.data || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredTransactions = data.filter((transaction) =>
    transaction.trxId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemsToDisplay =
    pageSize === "all" ? filteredTransactions.length : parseInt(pageSize, 10);
  
  const startIndex = currentPage * itemsToDisplay;
  const endIndex = startIndex + itemsToDisplay;
  const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setCurrentPage(0);
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && endIndex < filteredTransactions.length) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev" && currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <Container maxWidth="xl" style={{ marginLeft: isSidebarOpen ? "16rem" : "10rem", transition: "margin-left 0.3s ease", minWidth: "600px", maxWidth: "80%", marginTop: "8%" }}>
      <Paper sx={{ p: 2, boxShadow: 3 }}>
        <Grid item>
          <IconButton color="primary" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
        </Grid>
        <Grid container alignItems="center" spacing={1} mb={2}>
          <Grid item xs={12} md={5}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'teal' }}>
              All TopUp Request
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField label="Search by Transaction ID" variant="outlined" fullWidth value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
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
              <InputLabel>Items Per Page</InputLabel>
              <Select value={pageSize} onChange={handlePageSizeChange}>
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
          <Table>
            <TableHead>
              <TableRow>
                {["#", "Member ID", "Transaction Type", "Amount", "Payee Name", "Account Number", "IFSC", "Bank Name", "Payment Mode", "Transaction ID", "Bank RRN","Status", "Date"].map((header) => (
                  <TableCell key={header} sx={{ fontWeight: "bold", fontSize: "16px", border: "1px solid rgba(224, 224, 224, 1)" }}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={12} align="center">Loading...</TableCell></TableRow>
              ) : error ? (
                <TableRow><TableCell colSpan={12} align="center">No data available</TableCell></TableRow>
              ) : filteredTransactions.length === 0 ? (
                <TableRow><TableCell colSpan={12} align="center">No data available.</TableCell></TableRow>
              ) : (
                paginatedTransactions.map((transaction, index) => (
                  <TableRow key={transaction._id}>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{startIndex + index + 1}</TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{transaction?.userInfo?.memberId}</TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{transaction.transactionType}</TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{transaction.transactionAmount}</TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{transaction.payeeName}</TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{transaction.payeeAccountNumber}</TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{transaction.payeeIFSC}</TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{transaction.payeeBankName}</TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{transaction.paymentMode}</TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{transaction.trxId}</TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{transaction.bankRRN}</TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                        <Button
                          sx={{ 
                            color: transaction.isSuccess === "Pending" ? "orange" : 
                            transaction.isSuccess === "Success" ? "green" : 
                            transaction.isSuccess === "Failed" ? "red" : "gray", 
                            textTransform: "lowercase" 
                          }}
                        >
                          {transaction.isSuccess}
                        </Button>
                      </TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{new Date(transaction.paymentDateTime).toLocaleString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Section */}
        <Box display="flex" justifyContent="center" marginTop={2}>
          <Button variant="outlined" onClick={() => handlePageChange("prev")} disabled={currentPage === 0}>Previous</Button>
          <Button variant="outlined" onClick={() => handlePageChange("next")} disabled={endIndex >= filteredTransactions.length} sx={{ marginLeft: 2 }}>Next</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ViewAllTopUp;
