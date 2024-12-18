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
  Pagination,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSidebar } from "../../../Context/SidebarContext";
import axios from "axios";
import { accessToken, domainBase } from "../../../helpingFile";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { apiGet } from "../../../utils/http";

const API_ENDPOINT = `${domainBase}apiAdmin/v1/payin/allSuccessPayIn`;
const USER_LIST_API = `${domainBase}apiAdmin/v1/utility/getUserList`;
const ACCESS_TOKEN = accessToken;

const Payin = () => {
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterData, setFilterData] = useState({
    page: 1,
    limit: 25,
    keyword: "",
    startDate: "",
    endDate: "",
    memberId: "",
  });
  const [totalCount, setTotalCount] = useState(0);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogSeverity, setDialogSeverity] = useState("info");
  const [userList, setUserList] = useState([]);

  const handleExport = () => {
    const csvData = data.map((member) => ({
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
      Status: member.status,
    }));

    const csv = Papa.unparse(csvData); // Convert to CSV format
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" }); // Create Blob
    saveAs(
      blob,
      `Payout_History_${new Date().toISOString().split("T")[0]}.csv`
    ); // Save file
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
        const response = await apiGet(API_ENDPOINT, { ...filterData });
        setData(
          response.data.data.map((item, index) => ({
            id: index + 1,
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
        setTotalCount(response.data.totalDocs);
        setLoading(false);
      } catch (err) {
        // setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [filterData]);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await axios.get(USER_LIST_API, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
        console.log(response);
        setUserList(response.data.data); // Store user data
      } catch (err) {
        setError(err);
      }
    };
    fetchUserList();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilterData((prev) => ({ ...prev, [key]: value }));
  };
  const handlePageChange = (event, value) => {
    setFilterData((prev) => ({
      ...prev,
      page: value,
    }));
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setFilterData({
        ...filterData,
        keyword: searchQuery,
      });
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [searchQuery]);

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
          <Grid item xs={12} sm={6} md={4}>
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
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: "background.paper",
                boxShadow: "5px 0 10px -3px rgba(0, 128, 128, 0.6)",
              }}
            >
              <Typography variant="h6" sx={{ color: "teal" }}>
                Total Charges
              </Typography>
              <Typography>
                ₹{" "}
                {data.length > 0
                  ? data
                      .reduce(
                        (total, user) => total + parseFloat(user.charge || 0),
                        0
                      )
                      .toLocaleString("en-IN", { minimumFractionDigits: 2 })
                  : "0.00"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
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
              <IconButton
                color="primary"
                onClick={handleBackButtonClick}
                sx={{ mr: 1 }}
              >
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
            <Grid
              item
              xs={12}
              md={6}
              display="flex"
              justifyContent={{ xs: "flex-start", md: "flex-end" }}
            >
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
                label="Search by TxnID"
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
                  value={filterData?.memberId}
                  onChange={(e) =>
                    setFilterData((prev) => ({
                      ...prev,
                      memberId: e.target.value,
                    }))
                  }
                  label="All Users"
                >
                  <MenuItem value="">
                    <em>All Users</em>
                  </MenuItem>
                  {userList?.map((user) => (
                    <MenuItem key={user._id} value={user._id}>
                      {`${user.fullName} (${user.memberId})`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="Start Date & Time"
                type="date"
                value={filterData?.startDate}
                onChange={(e) =>
                  setFilterData({
                    ...filterData,
                    startDate: e.target.value,
                  })
                }
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                label="End Date & Time"
                type="date"
                value={filterData?.endDate}
                onChange={(e) =>
                  setFilterData({
                    ...filterData,
                    endDate: e.target.value,
                  })
                }
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel>Items per Page</InputLabel>
                <Select
                  value={filterData?.limit}
                  onChange={(e) => handleFilterChange("limit", e.target.value)}
                  label="Items per Page"
                >
                  {[25, 50, 100, 500]?.map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
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
                ) : data?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No data available.
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                       {(filterData.limit*(filterData.page-1) + index+1)}
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
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <Pagination
               count={parseInt(totalCount/filterData.limit)==0?parseInt(totalCount/filterData.limit):parseInt(totalCount/filterData.limit)+1}
               page={filterData?.page}
               onChange={handlePageChange}
               variant="outlined"
               shape="rounded"
               color="primary"
            />
          </Box>
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
