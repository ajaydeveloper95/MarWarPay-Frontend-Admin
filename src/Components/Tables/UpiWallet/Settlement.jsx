import { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Container,
  Typography,
  Grid,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../../../Context/SidebarContext";
import axios from "axios";
import { accessToken, domainBase } from "../../../helpingFile";

const ACCESS_TOKEN = accessToken;
const USER_LIST_API = `${domainBase}apiAdmin/v1/utility/getUserList`;
const SETTLEMENT_API =
  `${domainBase}apiAdmin/v1/wallet/getSettlementAmountAll`;
const SETTLEMENT_ONE_API =
  `${domainBase}apiAdmin/v1/wallet/getSettlementAmountOne/`; // Adjusted API endpoint

const Settlement = () => {
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [userList, setUserList] = useState([]);
  const [dropdownValue, setDropdownValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState()
  const { isSidebarOpen } = useSidebar();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await axios.get(USER_LIST_API, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
        setUserList(response.data.data);
      } catch (err) {
        setError(err)
      }
    };
    fetchUserList();
  }, []);

  const handleStartDateChange = (e) => {
    setStartDateTime(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDateTime(e.target.value);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSearch = async () => {
    try {
      if (!startDateTime || !endDateTime) {
        alert("Please select both start and end dates.");
        return;
      }

      const startDate = new Date(startDateTime);
      const endDate = new Date(endDateTime);

      // Check if start date is greater than end date
      if (startDate >= endDate) {
        alert("Start date cannot be greater than end date.");
        return;
      }

      setLoading(true); // Set loading to true before the API call

      const formattedStartDate = startDate.toISOString();
      const formattedEndDate = endDate.toISOString();

      // API request for settlements based on user selection
      if (dropdownValue) {
        const responseOne = await axios.post(
          `${SETTLEMENT_ONE_API}${dropdownValue}`, // Using the user ID (_id)
          {
            startTimeAndDate: formattedStartDate,
            endTimeAndDate: formattedEndDate,
          },
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        );

        const userSettlement = responseOne.data?.data || [];
        setFilteredTransactions(userSettlement);
      } else {
        // If no user selected, fetch all settlements
        const responseAll = await axios.post(
          SETTLEMENT_API,
          {
            startTimeAndDate: formattedStartDate,
            endTimeAndDate: formattedEndDate,
          },
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        );

        const transactions = responseAll.data?.data?.dataEwallet || [];
        setFilteredTransactions(transactions);
      }
    } catch (err) {
      console.error("Error fetching settlement data:", err);
    } finally {
      setLoading(false); // Set loading to false after the API call
    }
  };

  const handleReset = () => {
    setStartDateTime("");
    setEndDateTime("");
    setDropdownValue("");
    setFilteredTransactions([]);
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
      <Box
        sx={{
          mt: 4,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "background.paper",
          position: "relative",
        }}
      >
        <IconButton
          onClick={handleCancel}
          color="primary"
          sx={{ position: "absolute", top: 0, left: 16 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: "teal" }}
        >
          Settlement Amount
        </Typography>

        <Grid container spacing={2} alignItems="center">
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
                  <MenuItem key={user._id} value={user._id}>
                    {`${user.fullName} (${user.memberId})`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Start Date & Time"
              type="datetime-local"
              value={startDateTime}
              onChange={handleStartDateChange}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="End Date & Time"
              type="datetime-local"
              value={endDateTime}
              onChange={handleEndDateChange}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              disabled={loading} // Disable button while loading
            >
              Search
            </Button>
          </Grid>

          <Grid item xs={12} md={2}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Grid>
        </Grid>

        {/* Table Container */}
        <Box
          sx={{
            mt: 4,
            p: 2,
            borderRadius: 2,
            boxShadow: 2,
            backgroundColor: "background.paper",
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{ color: "teal", fontWeight: "bold" }}
          >
            Transaction Details
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "lightgray",
                      border: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    #
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "lightgray",
                      border: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    User
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "lightgray",
                      border: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    Settlement Amount
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
                  No data available.
                  </TableCell>
                </TableRow>
              ) : filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No data available.
                  </TableCell>
                </TableRow>
              ) : (
                  filteredTransactions.map((transaction, index) => (
                    <TableRow key={transaction._id}>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        {transaction._id|| "N/A"}{" "}
                        {/* Adjusted to show user name */}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                      >
                        {transaction.amount} {/* Displaying the amount */}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Container>
  );
};

export default Settlement;
