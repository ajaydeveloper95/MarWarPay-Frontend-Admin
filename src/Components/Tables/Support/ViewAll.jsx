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
import axios from "axios";
import { accessToken, domainBase } from "../../../helpingFile";

const API_ENDPOINT = `${domainBase}apiAdmin/v1/support/allGenTicket`;
const ACCESS_TOKEN = accessToken;

const ViewAll = () => {
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState("");
  const [pageSize, setPageSize] = useState("25");
  const [currentPage, setCurrentPage] = useState(0);
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
    ticket.TicketID.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemsToDisplay =
    pageSize === "all" ? filteredTickets.length : parseInt(pageSize, 10);
  
  const startIndex = currentPage * itemsToDisplay;
  const endIndex = startIndex + itemsToDisplay;
  const paginatedTickets = filteredTickets.slice(startIndex, endIndex);

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setCurrentPage(0); // Reset to first page when page size changes
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && endIndex < filteredTickets.length) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev" && currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
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
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'teal' }}>
                  All Tickets
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Search by Ticket ID"
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
          <Table sx={{ borderCollapse: "collapse" }}>
            <TableHead>
              <TableRow>
                {["#", "Member", "TicketID", "Subject", "Related To", "Last Update", "Status"].map((header) => (
                  <TableCell
                    key={header}
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
                  <TableCell colSpan={7} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Error: {error.message}
                  </TableCell>
                </TableRow>
              ) : filteredTickets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No data available.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedTickets.map((ticket, index) => {
                  const rowNumber = startIndex + index + 1;
                  return (
                    <TableRow key={ticket._id}>
                      <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{rowNumber}</TableCell>
                      <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                        {ticket.userInfo ? ticket.userInfo.userName : 'N/A'} {/* Check for userInfo */}
                      </TableCell>
                      <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{ticket.TicketID}</TableCell>
                      <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{ticket.subject}</TableCell>
                      <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{ticket.relatedTo}</TableCell>
                      <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                        <Button
                          sx={{ 
                            color: ticket.isStatus === "Pending" ? "orange" : 
                                  ticket.isStatus === "Resolved" ? "green" : 
                                  ticket.isStatus === "Rejected" ? "red" : "gray", 
                            textTransform: "lowercase" 
                          }}
                        >
                          {ticket.isStatus}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Section */}
        <Box display="flex" justifyContent="center" marginTop={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 0}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handlePageChange("next")}
            disabled={endIndex >= filteredTickets.length}
            sx={{ marginLeft: 2 }}
          >
            Next
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ViewAll;
