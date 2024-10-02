import { useState, useEffect } from "react";
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
  Link,
  InputLabel,
  FormControl,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSidebar } from "../../../Context/SidebarContext";
import axios from "axios";
import { accessToken, domainBase } from "../../../helpingFile";

const API_ENDPOINT = `${domainBase}apiAdmin/v1/wallet/eWalletMember/66c86b75986120a64a2946fa`;
const USER_LIST_API = `${domainBase}apiAdmin/v1/utility/getUserList`;
const ACCESS_TOKEN = accessToken;

const MemberWllt = () => {
  const { isSidebarOpen } = useSidebar();
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState("");
  const [pageSize, setPageSize] = useState("25");
  const [currentPage, setCurrentPage] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [dropdownValue, setDropdownValue] = useState("");
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from API
    axios
      .get(API_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((response) => {
        setTransactions(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error); 
        setLoading(false); 
        // console.error("Error fetching data:", error);
      });
    // Fetch user list
    const fetchUserList = async () => {
      try {
        const response = await axios.get(USER_LIST_API, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
        setUserList(response.data.data); // Store user data
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserList();
  }, []);

  // Filter data based on search query and selected user
  const filteredData = transactions.filter((item) => {
    const matchesMemberId = item.userInfo.memberId
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesUser = dropdownValue
      ? item.userInfo.memberId === dropdownValue
      : true;
    return matchesMemberId && matchesUser;
  });

  const itemsToDisplay =
    pageSize === "all" ? filteredData.length : parseInt(pageSize, 10);

  const startIndex = currentPage * itemsToDisplay;
  const endIndex = startIndex + itemsToDisplay;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setCurrentPage(0); // Reset to first page when page size changes
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && endIndex < filteredData.length) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
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
        <Grid item xs={12} md={3}>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <IconButton color="primary">
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
                My E-Wallet History
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container alignItems="center" spacing={1} mt={1} mb={2}>
          <Grid item xs={12} md={3}>
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
                <MenuItem value="">All Users</MenuItem>
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
            <Link href="/">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ height: "56px", background: "teal" }}
              >
                Add Wallet
              </Button>
            </Link>
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
                  #
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
                  Before Amount
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    border: "1px solid rgba(224, 224, 224, 1)",
                  }}
                >
                  Cr/Dr Amount
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    border: "1px solid rgba(224, 224, 224, 1)",
                  }}
                >
                  After Amount
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
                  Type
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
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {loading ? (
                  <TableRow>
                    <TableCell colSpan={10} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={10} align="center">
                      Error loading data
                    </TableCell>
                  </TableRow>
                ) : paginatedData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} align="center">
                      No records found
                    </TableCell>
                  </TableRow>
                ) : (
              paginatedData.map((transaction, index) => {
                const rowNumber = startIndex + index + 1;

                return (
                  <TableRow key={transaction._id}>
                    <TableCell
                      sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      {rowNumber}
                    </TableCell>
                    <TableCell
                      sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      {transaction.userInfo.memberId}
                    </TableCell>
                    <TableCell
                      sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      {transaction.userInfo.userName}
                    </TableCell>
                    <TableCell
                      sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      {transaction.beforeAmount}
                    </TableCell>
                    <TableCell
                      sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      {transaction.transactionAmount}
                    </TableCell>
                    <TableCell
                      sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      {transaction.afterAmount}
                    </TableCell>
                    <TableCell
                      sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      {new Date(transaction.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell
                      sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      {transaction.transactionType === "Cr." ? (
                        <Button sx={{ color: "green", text: "bold" }}>
                          Cr.
                        </Button>
                      ) : (
                        <Button sx={{ color: "red", text: "bold" }}>Dr.</Button>
                      )}
                    </TableCell>
                    <TableCell
                      sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      {transaction.description}
                    </TableCell>
                    <TableCell
                      sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      {transaction.transactionStatus ? (
                        <Button
                          sx={{
                            color: "green",
                            // text: "bold",
                            textTransform: "lowercase",
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
                            // text: "bold",
                            textTransform: "lowercase",
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
                  </TableRow>
                );
              }))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Controls */}
        <Grid container justifyContent="space-between" mt={2}>
          <Grid item>
            <Button
              variant="contained"
              onClick={() => handlePageChange("prev")}
              disabled={currentPage === 0}
            >
              Previous
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={() => handlePageChange("next")}
              disabled={endIndex >= filteredData.length}
              sx={{ background: "teal" }}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default MemberWllt;
