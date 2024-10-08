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

const AllPayin = () => {
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState("");
  const [pageSize, setPageSize] = useState("25");
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, ] = useState(null);

  useEffect(() => {
    // Simulate data fetching
    setLoading(true);
    setTimeout(() => {
      setData([
        { _id: 1, packageName: "Package 1", packagePayOutCharge: 10, packagePayInCharge: 20, isActive: true, createdAt: "2023-09-01" },
        { _id: 2, packageName: "Package 2", packagePayOutCharge: 15, packagePayInCharge: 25, isActive: false, createdAt: "2023-09-02" },
        // Add more placeholder data as needed
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredMembers = data.filter((member) => {
    return member.packageName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const itemsToDisplay = pageSize === "all" ? filteredMembers.length : parseInt(pageSize, 10);

  const startIndex = currentPage * itemsToDisplay;
  const endIndex = startIndex + itemsToDisplay;
  const paginatedMembers = filteredMembers.slice(startIndex, endIndex);

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setCurrentPage(0); // Reset to first page when page size changes
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
                <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'teal' }}>
                 Payin Package
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
                sx={{ height: "56px", background: 'teal' }}
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
                      <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                        {rowNumber}
                      </TableCell>
                      <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                        {member.packageName}
                      </TableCell>
                      <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                        {member.packagePayOutCharge}
                      </TableCell>
                      <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                        {member.packagePayInCharge}
                      </TableCell>
                      <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                        {member.isActive ? "Active" : "Inactive"}
                      </TableCell>
                      <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                        {member.isDefault ? "Yes" : "No"}
                      </TableCell>
                      <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                        {member.createdAt}
                      </TableCell>
                      <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                        <IconButton
                          aria-label="view"
                          color="primary"
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

        {/* Pagination Buttons */}
        <Box display="flex" justifyContent="center" marginTop={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 0}
          >
            Previous
          </Button>
          <Box mx={2} display="flex" alignItems="center">
            Page {currentPage + 1} of {Math.ceil(filteredMembers.length / itemsToDisplay)}
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handlePageChange("next")}
            disabled={endIndex >= filteredMembers.length}
          >
            Next
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AllPayin;
