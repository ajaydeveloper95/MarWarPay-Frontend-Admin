import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
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
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSidebar } from "../../../Context/SidebarContext";
import { accessToken, domainBase } from "../../../helpingFile";

const API_ENDPOINT = `${domainBase}apiAdmin/v1/package/getPayOutPackage`;
const ACCESS_TOKEN = accessToken;

const AllPayout = () => {
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();
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
        setData(response.data.data); // Use response.data.data for the data
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleViewPackage = (_id) => {
    navigate(`/update-payout/${_id}`);
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
        <IconButton color="primary" onClick={handleBackButtonClick}>
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: "teal" }}
        >
          View Payout Packages
        </Typography>

        {/* Main Table Section */}
        <TableContainer component={Paper}>
          <Table sx={{ borderCollapse: "collapse" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Package Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Charge Ranges</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Created At</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Error: {error.message}
                  </TableCell>
                </TableRow>
              ) : (
                data.map((packageItem) => (
                  <TableRow key={packageItem._id}>
                    <TableCell>{packageItem.payOutPackageName}</TableCell>
                    <TableContainer
                      component={Paper}
                      sx={{ borderRadius: 2, marginTop: 2 }}
                    >
                      <Table size="small" aria-label="charge ranges">
                        <TableHead>
                          <TableRow>
                            <TableCell
                              sx={{
                                fontWeight: "bold",
                                backgroundColor: "#f0f0f0",
                                borderBottom: "2px solid #ccc",
                              }}
                            >
                              Lower Limit
                            </TableCell>
                            <TableCell
                              sx={{
                                fontWeight: "bold",
                                backgroundColor: "#f0f0f0",
                                borderBottom: "2px solid #ccc",
                              }}
                            >
                              Upper Limit
                            </TableCell>
                            <TableCell
                              sx={{
                                fontWeight: "bold",
                                backgroundColor: "#f0f0f0",
                                borderBottom: "2px solid #ccc",
                              }}
                            >
                              Charge Type
                            </TableCell>
                            <TableCell
                              sx={{
                                fontWeight: "bold",
                                backgroundColor: "#f0f0f0",
                                borderBottom: "2px solid #ccc",
                              }}
                            >
                              Charge
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {packageItem.payOutChargeRange.map((range, index) => (
                            <TableRow key={range._id || index}>
                              <TableCell
                                sx={{ padding: 1, border: "1px solid #ccc" }}
                              >
                                {range.lowerLimit}
                              </TableCell>
                              <TableCell
                                sx={{ padding: 1, border: "1px solid #ccc" }}
                              >
                                {range.upperLimit}
                              </TableCell>
                              <TableCell
                                sx={{ padding: 1, border: "1px solid #ccc" }}
                              >
                                {range.chargeType}
                              </TableCell>
                              <TableCell
                                sx={{ padding: 1, border: "1px solid #ccc" }}
                              >
                                {range.chargeType === "Flat"
                                  ? `${range.charge}/-`
                                  : `${range.charge}%`}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TableCell>
                      <Button
                        sx={{
                          color: packageItem.isActive ? "green" : "red",
                          backgroundColor: packageItem.isActive
                            ? "rgba(0, 128, 0, 0.1)"
                            : "rgba(255, 0, 0, 0.1)", // Light background
                          border: `1px solid ${
                            packageItem.isActive ? "green" : "red"
                          }`,
                          borderRadius: 2,
                          padding: "2px 8px",
                        }}
                      >
                        {packageItem.isActive ? "Active" : "Inactive"}
                      </Button>
                    </TableCell>

                    <TableCell>
                      {new Date(packageItem.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleViewPackage(packageItem._id)}
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
      </Paper>
    </Container>
  );
};

export default AllPayout;
