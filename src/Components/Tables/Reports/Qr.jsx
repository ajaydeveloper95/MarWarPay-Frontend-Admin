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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Icon for success
import CancelIcon from "@mui/icons-material/Cancel"; // Icon for failure
import { useSidebar } from "../../../Context/SidebarContext";
import axios from "axios";
import { accessToken, domainBase } from "../../../helpingFile";

const API_ENDPOINT = `${domainBase}apiAdmin/v1/payin/allPaymentGenerated`;
const USER_LIST_API = "http://localhost:5000/apiAdmin/v1/utility/getUserList";
const ACCESS_TOKEN = accessToken;

const Qr = () => {
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pageSize, setPageSize] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const [previousPage, setPreviousPage] = useState(0);
  const [dropdownValue, setDropdownValue] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogSeverity, setDialogSeverity] = useState("info");
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
        setData(response.data.data); // Updated to use API data structure
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

  // Filter members based on search query, date range, and selected user
  const filteredMembers = data.filter((member) => {
    const matchesName = member.userInfo.memberId
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDate =
      (!startDate || new Date(member.createdAt) >= new Date(startDate)) &&
      (!endDate || new Date(member.createdAt) <= new Date(endDate));
    const matchesUser =
      !dropdownValue || member.userInfo.memberId === dropdownValue;
    return matchesName && matchesDate && matchesUser;
  });

  const itemsToDisplay =
    pageSize === "all" ? filteredMembers.length : parseInt(pageSize, 10);
  const startIndex = currentPage * itemsToDisplay;
  const endIndex = startIndex + itemsToDisplay;
  const paginatedMembers = filteredMembers.slice(startIndex, endIndex);

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && endIndex < filteredMembers.length) {
      setPreviousPage(previousPage);
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 0) {
      setPreviousPage(currentPage);
      setCurrentPage(currentPage - 1);
    }
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleViewClick = (status) => {
    setDialogMessage(
      status === "Success"
        ? "Transaction successfully completed"
        : "Txn in pending or not completed."
    );
    setDialogSeverity(status === "Success" ? "success" : "error");
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Box
        sx={{ padding: 3, marginBottom: 2, marginTop: 12 }}
        maxWidth="xl"
        style={{
          marginLeft: isSidebarOpen ? "16rem" : "10rem",
          transition: "margin-left 0.3s ease",
          minWidth: "600px",
          maxWidth: "80%",
        }}
      >
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: "background.paper",
                boxShadow: "5px 0 10px -3px rgba(0, 128, 128, 0.6)",
              }}
            >
              <Typography variant="h6" sx={{ color: "teal" }}>
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
                backgroundColor: "background.paper",
                boxShadow: "5px 0 10px -3px rgba(0, 128, 128, 0.6)",
              }}
            >
              <Typography variant="h6" sx={{ color: "teal" }}>
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
          marginLeft: isSidebarOpen ? "16rem" : "10rem",
          transition: "margin-left 0.3s ease",
          minWidth: "600px",
          maxWidth: "80%",
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
                  <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{ color: "teal" }}
                  >
                    UPI QR History
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container alignItems="center" spacing={1} mb={2}>
            <Grid item xs={12} md={4}>
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
                  <MenuItem value="">
                    <em>All Users</em>
                  </MenuItem>
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
                <InputLabel>page</InputLabel>
                <Select
                  label="page"
                  value={pageSize}
                  onChange={handlePageSizeChange}
                >
                  <MenuItem value="25">25</MenuItem>
                  <MenuItem value="50">50</MenuItem>
                  <MenuItem value="100">100</MenuItem>
                  <MenuItem value="500">500</MenuItem>
                  <MenuItem value="all">View All</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      border: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    #
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      border: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    Member ID
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      border: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    TxnID
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      border: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    RfxID
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      border: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    Amount
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      border: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    IP
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      border: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    QR Code
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      border: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      border: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      border: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    Actions
                  </TableCell>
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
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        {startIndex + index + 1}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        {member.userInfo.memberId}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        {member.trxId}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        {member.refId}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        {member.amount}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        {member.ip}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        <Button
                          sx={{ color: "white", background: "lightBlue" }}
                        >
                          View QR
                        </Button>
                      </TableCell>
                      <TableCell>
                        {new Date(member.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        <Button
                          sx={{
                            color:
                              member.callBackStatus === "Success"
                                ? "green"
                                : "red",
                            backgroundColor:
                              member.callBackStatus === "Success"
                                ? "rgba(0, 128, 0, 0.1)"
                                : "rgba(255, 0, 0, 0.1)",
                            border:
                              member.callBackStatus === "Success"
                                ? "1px solid green"
                                : "1px solid red",
                            borderRadius: 2,
                            padding: "2px 8px",
                          }}
                        >
                          {member.callBackStatus === "Success"
                            ? "Success"
                            : "Failed"}
                        </Button>
                      </TableCell>

                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        <IconButton
                          color="primary"
                          onClick={() => handleViewClick(member.callBackStatus)}
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
          <Grid container justifyContent="space-between" mt={2}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                disabled={currentPage === 0}
                onClick={() => handlePageChange("prev")}
              >
                Previous
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                disabled={endIndex >= filteredMembers.length}
                onClick={() => handlePageChange("next")}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>
          {dialogSeverity === "success" ? "Success" : "Error"}
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="body1"
            color={dialogSeverity === "success" ? "green" : "red"}
          >
            {dialogSeverity === "success" ? (
              <CheckCircleIcon />
            ) : (
              <CancelIcon />
            )}
            {dialogMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Qr;
