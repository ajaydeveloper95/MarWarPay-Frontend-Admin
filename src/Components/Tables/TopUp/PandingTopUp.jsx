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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSidebar } from "../../../Context/SidebarContext";
import { apiGet } from "../../../utils/http";

const API_ENDPOINT = `apiAdmin/v1/fundAdd/allPendingFundRequest`;

const PandingTopUp = () => {
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState("");
  const [pageSize, setPageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
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

  const filteredTickets = data.filter((ticket) =>
    ticket.trxId?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemsToDisplay =
    pageSize === "all" ? filteredTickets.length : parseInt(pageSize, 10);

  const startIndex = currentPage * itemsToDisplay;
  const endIndex = startIndex + itemsToDisplay;
  const paginatedTickets = filteredTickets.slice(startIndex, endIndex);

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setCurrentPage(0);
  };

  const handleViewTicket = (trxId) => {
    navigate(`/request/ViewTopUp/${trxId}`);
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

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
      <Paper sx={{ p: 2, boxShadow: 3 }}>
        <Grid item>
          <IconButton color="primary" onClick={handleBackButtonClick}>
            <ArrowBackIcon />
          </IconButton>
        </Grid>
        <Grid container alignItems="center" spacing={1} mb={2}>
          <Grid item xs={12} md={5}>
            <Typography variant="h4" gutterBottom sx={{ color: "teal" }}>
              Pending TopUp Request
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Search by Transaction ID"
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
              InputLabelProps={{ shrink: true }}
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

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {[
                  "#",
                  "Member ID",
                  "Transaction Type",
                  "Amount",
                  "Payee Name",
                  "Account Number",
                  "IFSC",
                  "Bank Name",
                  "Payment Mode",
                  "Transaction ID",
                  "Bank RRN",
                  "Status",
                  "Date",
                  "Action",
                ].map((header, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      border: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={13} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={13} align="center">
                    Error fetching data.
                  </TableCell>
                </TableRow>
              ) : paginatedTickets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={13} align="center">
                    No data available.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedTickets.map((ticket, index) => (
                  <TableRow key={ticket._id}>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{startIndex + index + 1}</TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{ticket.userInfo?.memberId || "N/A"}</TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{ticket.transactionType || "N/A"}</TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{ticket.transactionAmount || "N/A"}</TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{ticket.payeeName || "N/A"}</TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{ticket.payeeAccountNumber || "N/A"}</TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{ticket.payeeIFSC || "N/A"}</TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{ticket.payeeBankName || "N/A"}</TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{ticket.paymentMode || "N/A"}</TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{ticket.trxId || "N/A"}</TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{ticket.bankRRN || "N/A"}</TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                        <Button
                          sx={{ 
                            color: ticket.isSuccess === "Pending" ? "orange" : 
                                  ticket.isSuccess === "Success" ? "green" : 
                                  ticket.isSuccess === "Failed" ? "red" : "gray", 
                            textTransform: "lowercase" 
                          }}
                        >
                          {ticket.isSuccess}
                        </Button>
                      </TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{new Date(ticket.paymentDateTime).toLocaleDateString()}</TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                      <IconButton
                        color="primary"
                        onClick={() => handleViewTicket(ticket?.trxId)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default PandingTopUp;
