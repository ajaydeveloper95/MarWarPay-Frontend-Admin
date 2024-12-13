import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Link,
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

const API_ENDPOINT = `${domainBase}apiAdmin/v1/ipWhitelist/getUserIp`;
const ACCESS_TOKEN = accessToken;

const AllUserIP = () => {
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();
  const [searchQuery, setSearchQuery] = useState("");
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
        setData(response.data.data);
      } catch (err) {
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredData = data.filter((entry) =>
    entry.userInfo.memberId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemsToDisplay =
    pageSize === "all" ? filteredData.length : parseInt(pageSize, 10);

  const startIndex = currentPage * itemsToDisplay;
  const endIndex = startIndex + itemsToDisplay;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setCurrentPage(0);
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && endIndex < filteredData.length) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev" && currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleViewMember = (memberId) => {
    navigate(`/ip-whitelist/${memberId}`);
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
          <Grid item xs={12} md={4}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ color: "teal" }}
            >
              User IP Whitelist
            </Typography>
          </Grid>
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
            <Link href="/ip-whitelist/add">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ height: "56px", background: "teal" }}
              >
                Add IP
              </Button>
            </Link>
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table sx={{ borderCollapse: "collapse" }}>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Member ID</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>IP User</TableCell>
                <TableCell>IP User Dev</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Last Update</TableCell>
                <TableCell>Action</TableCell>
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
                    {error}
                  </TableCell>
                </TableRow>
              ) : paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((entry, index) => (
                  <TableRow key={entry._id}>
                    <TableCell>{startIndex + index + 1}</TableCell>
                    <TableCell>{entry.userInfo.memberId}</TableCell>
                    <TableCell>{entry.userInfo.fullName}</TableCell>
                    <TableCell>{entry.ipUser}</TableCell>
                    <TableCell>{entry.ipUserDev}</TableCell>
                    <TableCell>{entry.isStatus ? "Active" : "Inactive"}</TableCell>
                    <TableCell>
                      {new Date(entry.updatedAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleViewMember(entry._id)}>
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box mt={2} display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            disabled={currentPage === 0}
            onClick={() => handlePageChange("prev")}
          >
            Prev
          </Button>
          <Button
            variant="outlined"
            disabled={endIndex >= filteredData.length}
            onClick={() => handlePageChange("next")}
          >
            Next
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AllUserIP;