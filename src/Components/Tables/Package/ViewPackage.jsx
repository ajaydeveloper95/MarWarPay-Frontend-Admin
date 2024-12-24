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
import { apiGet } from "../../../utils/http";

const API_ENDPOINT = `apiAdmin/v1/package/allPackage`;

const ViewPackage = () => {
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState("");
  const [pageSize, setPageSize] = useState("25");
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiGet(API_ENDPOINT);
        setData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const filteredMembers = data.filter((member) => {
    const matchesName = member.packageName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesName;
  });

  const itemsToDisplay =
    pageSize === "all" ? filteredMembers.length : parseInt(pageSize, 10);

  const startIndex = currentPage * itemsToDisplay;
  const endIndex = startIndex + itemsToDisplay;
  const paginatedMembers = filteredMembers.slice(startIndex, endIndex);

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setCurrentPage(0); 
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && endIndex < filteredMembers.length) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleViewPackage = (_id) => {
    navigate(`/package/EditPackage/${_id}`);
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <>
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
            <Grid item xs={12} md={3}>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{ color: "teal" }}
                  >
                    View Package
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Search by Package Name"
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
              <Link href="/package/add">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ height: "56px", background: "teal" }}
                >
                  Add Package
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
                    Package Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      border: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    PayOut Cr.
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      border: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    PayIn Cr.
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
                    Is Default?
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      border: "1px solid rgba(224, 224, 224, 1)",
                    }}
                  >
                    Created
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
                  No data available.
                  </TableCell>
                </TableRow>
              ) : paginatedMembers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No data available.
                  </TableCell>
                </TableRow>
              ) : (
                  paginatedMembers.map((member, index) => {
                    // Calculate row number based on pagination
                    const rowNumber = startIndex + index + 1;

                    return (
                      <TableRow key={member._id}>
                        <TableCell
                          sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                        >
                          {rowNumber}
                        </TableCell>
                        <TableCell
                          sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                        >
                          {member.packageName}
                        </TableCell>
                        <TableCell
                          sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                        >
                          {member.payOutPackage?.payOutPackageName}
                        </TableCell>
                        <TableCell
                          sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                        >
                           {member.payInPackage?.payInPackageName}
                        </TableCell>
                        <TableCell
                          sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                        >
                          {member.isActive ? (
                            <Button
                              sx={{
                                color: "green",
                                // fontWeight: "bold",
                                backgroundColor: "rgba(0, 128, 0, 0.1)",
                                // border: "1px solid green",
                                borderRadius: 2,
                                padding: "2px 10px",
                              }}
                            >
                              Active
                            </Button>
                          ) : (
                            <Button
                              sx={{
                                color: "red",
                                // fontWeight: "bold",
                                backgroundColor: "rgba(255, 0, 0, 0.1)",
                                // border: "1px solid red",
                                borderRadius: 2,
                                padding: "2px 10px",
                              }}
                            >
                              Deactive
                            </Button>
                          )}
                        </TableCell>

                        <TableCell
                          sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                        >
                          {member.packagePayOutCharge > 0 ? (
                            <Button
                              sx={{
                                color: "green",
                                text: "bold",
                                textTransform: "lowercase",
                              }}
                            >
                              Yes
                            </Button>
                          ) : (
                            <Button
                              sx={{
                                color: "red",
                                text: "bold",
                                textTransform: "lowercase",
                              }}
                            >
                              No
                            </Button>
                          )}
                        </TableCell>

                        <TableCell
                          sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                        >
                          {formatDateTime(member.createdAt)}
                        </TableCell>
                        <TableCell
                          sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}
                        >
                          <IconButton
                            color="primary"
                            component={Link}
                            onClick={() => handleViewPackage(member._id)}
                          >
                            <VisibilityIcon />
                          </IconButton>
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
              disabled={endIndex >= filteredMembers.length}
            >
              Next
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default ViewPackage;
