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
  Box,
  InputLabel,
  FormControl,
  Pagination,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSidebar } from "../../../Context/SidebarContext";
import { apiGet } from "../../../utils/http";

const API_ENDPOINT = `apiAdmin/v1/payout/allPayOutPayment`;
const USER_LIST_API = `apiAdmin/v1/utility/getUserList`;

const PayoutGenerate = () => {
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterData, setFilterData] = useState({
    page: 1,
    limit: 25,
    keyword: "",
    startDate: "",
    endDate: "",
    status: "",
    memberId: "",
  });
  const [data, setData] = useState([]);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const fetchData = async (exportCSV = false) => {
    setLoading(true);
    try {
      const response = await apiGet(API_ENDPOINT, {
        ...filterData,
        export: exportCSV,
      });
      if (exportCSV == "true") {
        const blob = new Blob([response.data], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `payout${filterData.startDate}-${filterData.endDate}.csv`;

        link.click();
        link.remove();
      } else {
        setData(
          response.data.data.map((item, index) => ({
            id: index + 1,
            memberId: item.userInfo.memberId,
            name: item.userInfo.fullName,
            accountNumber: item.accountNumber,
            ifsc: item.ifscCode,
            amount: `${item.amount}`,
            txnId: item.trxId,
            status: item.isSuccess,
            dateTime: formatDateTime(item.createdAt),
          }))
        );

        setTotalCount(response.data.totalDocs);
      }
    } catch (err) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserList = async () => {
    try {
      const response = await apiGet(USER_LIST_API);
      setUserList(response.data.data);
    } catch (err) {
      // setError(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterData]);

  useEffect(() => {
    fetchUserList();
  }, []);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setFilterData({
        ...filterData,
        keyword: searchQuery,
      });
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [searchQuery]);

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
                Total Transaction Generate
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
          {/* Header Section */}
          <Grid container alignItems="center" spacing={1} mb={2}>
            <Grid item xs={12} md={5}>
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
                    Payout Genarate
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Search by txnID"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
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
            <Grid item xs={12} md={2} align="right" marginBottom={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => fetchData("true")}
              >
                Export
              </Button>
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
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filterData.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  // onChange={handleStatusChange}
                  label="Status"
                >
                  <MenuItem value="">
                    <em>All</em>
                  </MenuItem>
                  <MenuItem value="Success">Success</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Failed">Failed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Table Section */}
          <TableContainer component={Paper}>
            <Table sx={{ borderCollapse: "collapse" }}>
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
                    Account No.
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      border: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    IFSC
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
                    Txn ID
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
                    Date Time
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
                  data?.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        {filterData.limit * (filterData.page - 1) + index + 1}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        {item.memberId}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        {item.name}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        {item.accountNumber}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        {item.ifsc}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        {item.amount}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        {item.txnId}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        <Button
                          sx={{
                            color:
                              item.status === "Success"
                                ? "green"
                                : item.status === "Failed"
                                ? "red"
                                : "orange", // Color for Pending
                            backgroundColor:
                              item.status === "Success"
                                ? "rgba(0, 128, 0, 0.1)"
                                : item.status === "Failed"
                                ? "rgba(255, 0, 0, 0.1)"
                                : "rgba(255, 165, 0, 0.1)", // Background for Pending
                            borderRadius: 2,
                            padding: "2px 10px",
                          }}
                        >
                          {item.status === "Success"
                            ? "Success"
                            : item.status === "Failed"
                            ? "Failed"
                            : "Pending"}{" "}
                          {/* Display Pending when callBackStatus is not Success or Failed */}
                        </Button>
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        {item.dateTime}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <Pagination
              count={
                parseInt(totalCount / filterData.limit) == 0
                  ? parseInt(totalCount / filterData.limit)
                  : parseInt(totalCount / filterData.limit) + 1
              }
              page={filterData?.page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              color="primary"
            />
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default PayoutGenerate;
