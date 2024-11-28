import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSidebar } from "../../../Context/SidebarContext";
import axios from "axios";
import { accessToken, domainBase } from "../../../helpingFile";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import * as XLSX from "xlsx";

const API_ENDPOINT = `${domainBase}apiAdmin/v1/payin/allSuccessPayIn`;
const USER_LIST_API = `${domainBase}apiAdmin/v1/utility/getUserList`;
const ACCESS_TOKEN = accessToken;

const Payin = () => {
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

  const handleExport = () => {
    const exportData = filteredMembers.map((member) => ({
      ID: member.id,
      MemberID: member.memberId,
      Name: member.fullName,
      TxnID: member.txnID,
      RRN: member.bankRRN || "N/A",
      Amount: member.amount,
      Charge: member.charge,
      Credit: member.credit,
      VPA_ID: member.vpaID || "N/A",
      Description: member.description,
      DateTime: member.dateTime,
      Status: member.status ? "Success" : "Failed",
    }));

    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    // Create a workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payin Data");

    // Export the workbook
    XLSX.writeFile(workbook, "Payin_Data.xlsx");
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

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
        setData(
          response.data.data.map((item) => ({
            id: item._id,
            memberId: item.userInfo.memberId,
            fullName: item.userInfo.fullName,
            txnID: item.trxId,
            bankRRN: item.bankRRN,
            amount: `${item.amount}`,
            charge: `${item.chargeAmount}`,
            credit: `${item.finalAmount}`,
            vpaID: item.vpaId,
            description: item.payerName, // Use payerName for description
            dateTime: formatDateTime(item.createdAt),
            status: item.isSuccess,
          }))
        );
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

  // Filter members based on search query and date range
  const filteredMembers = data.filter((member) => {
    const matchesSearch =
      member.memberId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.txnID.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.bankRRN &&
        member.bankRRN.toLowerCase().includes(searchQuery.toLowerCase())); // Check for bankRRN if it exists

    const matchesDate =
      (!startDate || new Date(member.dateTime) >= new Date(startDate)) &&
      (!endDate || new Date(member.dateTime) <= new Date(endDate));

    return matchesSearch && matchesDate;
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
                Total balance
              </Typography>
              <Typography>
                ₹{" "}
                {data.length > 0
                  ? data
                      .reduce(
                        (total, user) => total + parseFloat(user.amount || 0),
                        0
                      )
                      .toLocaleString("en-IN", { minimumFractionDigits: 2 })
                  : "0.00"}
              </Typography>
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
                Total Transaction
              </Typography>
              <Typography>{data.length}</Typography>
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
  {/* Back Button and Title */}
  <Grid item xs={12} md={6} display="flex" alignItems="center">
    <IconButton color="primary" onClick={handleBackButtonClick} sx={{ mr: 1 }}>
      <ArrowBackIcon />
    </IconButton>
    <Typography
      variant="h4"
      component="h1"
      gutterBottom
      sx={{ color: "teal", flexGrow: 1 }}
    >
      UPI Collection
    </Typography>
  </Grid>

  {/* Export Button */}
  <Grid item xs={12} md={6} display="flex" justifyContent={{ xs: "flex-start", md: "flex-end" }}>
    <Button
      variant="contained"
      color="success"
      onClick={handleExport}
      sx={{ marginBottom: 2 }}
    >
      Export
    </Button>
  </Grid>
</Grid>

          <Grid container alignItems="center" spacing={1} mb={2}>
            <Grid item xs={12} md={3}>
              <TextField
                label="Search by MemberID, TxnID, or RRN"
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
                fullWidth
                label="Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
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
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      border: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      border: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    MemberID
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      border: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    Name
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
                    Bank RRN
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
                    Charge
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      border: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    Credit
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      border: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    VPAID
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      border: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    Description
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      border: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    Date Time
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
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No data available
                    </TableCell>
                  </TableRow>
                ) : paginatedMembers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No data available.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedMembers.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        {startIndex + index + 1}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        {row.memberId}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        {row.fullName}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        {row.txnID}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        {row.bankRRN}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        {row.amount}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        {row.charge}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        {row.credit}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        {row.vpaID}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        {row.description}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        {row.dateTime}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        {row.status === "Success" ? (
                          <Button
                            sx={{
                              color: "green",
                              backgroundColor: "rgba(0, 128, 0, 0.1)",
                              // border: "1px solid green",
                              borderRadius: 2,
                              padding: "2px 10px",
                            }}
                          >
                            Success
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
                            Failed
                          </Button>
                        )}
                      </TableCell>

                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() => handleViewClick(row.status)}
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

      {/* Dialog for showing messages */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        PaperProps={{
          sx: {
            width: "500px",
            maxWidth: "90%",
            padding: 2,
            borderRadius: 2,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          },
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
          {dialogSeverity === "success" ? (
            <CheckCircleIcon sx={{ fontSize: 50, color: "green", mb: 2 }} />
          ) : (
            <CancelIcon sx={{ fontSize: 50, color: "red", mb: 2 }} />
          )}
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <Typography
            variant="h6"
            sx={{ color: dialogSeverity === "error" ? "red" : "green" }}
          >
            {dialogMessage}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "end" }}>
          <Button
            onClick={handleDialogClose}
            sx={{ color: "white", background: "blue" }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Payin;
