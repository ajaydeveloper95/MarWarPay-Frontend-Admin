import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  MenuItem,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSidebar } from "../../../Context/SidebarContext";
import { accessToken, domainBase } from "../../../helpingFile";

const API_ENDPOINT = `${domainBase}apiAdmin/v1/package/getPayInPackage`;
const ADD_PACKAGE_ENDPOINT = `${domainBase}apiAdmin/v1/package/addPayInPackage`;
const ACCESS_TOKEN = accessToken;

const AllPayin = () => {
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newPackage, setNewPackage] = useState({
    payInPackageName: "",
    payInChargeRange: [],
  });
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
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
        const response = await axios.get(API_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
        setData(response.data.data);
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
    navigate(`/update-payin/${_id}`);
  };

  const handleAddPackageOpen = () => {
    setOpenDialog(true);
  };

  const handleAddPackageClose = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPackage({ ...newPackage, [name]: value });
  };

  const handleChargeRangeChange = (index, field, value) => {
    const updatedChargeRanges = [...newPackage.payInChargeRange];
    updatedChargeRanges[index] = {
      ...updatedChargeRanges[index],
      [field]: value,
    };
    setNewPackage({ ...newPackage, payInChargeRange: updatedChargeRanges });
  };

  const handleAddChargeRange = () => {
    setNewPackage({
      ...newPackage,
      payInChargeRange: [
        ...newPackage.payInChargeRange,
        { lowerLimit: "", upperLimit: "", chargeType: "Flat", charge: "" },
      ],
    });
  };

  const handleRemoveChargeRange = (index) => {
    const updatedChargeRanges = newPackage.payInChargeRange.filter((_, i) => i !== index);
    setNewPackage({ ...newPackage, payInChargeRange: updatedChargeRanges });
  };

  const handleAddPackageSubmit = async () => {
    try {
      await axios.post(ADD_PACKAGE_ENDPOINT, newPackage, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      handleAddPackageClose();
      // Optionally refresh the data after adding a package
      const response = await axios.get(API_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      setData(response.data.data);
    } catch (err) {
      console.error("Error adding package:", err);
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
      <IconButton color="primary" onClick={handleBackButtonClick}>
            <ArrowBackIcon />
          </IconButton>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
         
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: "teal" }}>
            View PayIn Packages
          </Typography>
          <Button variant="contained" color="primary" onClick={handleAddPackageOpen}>
            Add Package
          </Button>
        </Box>

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
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No data available.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((packageItem) => (
                  <TableRow key={packageItem._id}>
                    <TableCell>{packageItem.payInPackageName}</TableCell>
                    <TableContainer
                      component={Paper}
                      sx={{ borderRadius: 2, marginTop: 2, marginBottom: 1 }}
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
                          {packageItem.payInChargeRange.map((range, index) => (
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
                          border: `${
                            packageItem.isActive ? "green" : "red"
                          }`,
                          borderRadius: 2,
                          padding: "2px 10px",
                        }}
                      >
                        {packageItem.isActive ? "Active" : "Inactive"}
                      </Button>
                    </TableCell>

                    <TableCell>
                      {formatDateTime(packageItem.createdAt)}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleViewPackage(packageItem._id)}>
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

      {/* Dialog for Adding Package */}
      <Dialog open={openDialog} onClose={handleAddPackageClose}>
        <DialogTitle>Add PayIn Package</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Package Name"
            fullWidth
            variant="outlined"
            name="payInPackageName"
            value={newPackage.payInPackageName}
            onChange={handleInputChange}
          />
          <Typography variant="h6" gutterBottom>
            Charge Ranges
          </Typography>
          {newPackage.payInChargeRange.map((chargeRange, index) => (
            <Box key={index} display="flex" justifyContent="space-between" mb={2}>
              <TextField
                label="Lower Limit"
                type="number"
                variant="outlined"
                value={chargeRange.lowerLimit}
                onChange={(e) =>
                  handleChargeRangeChange(index, "lowerLimit", e.target.value)
                }
                style={{ marginRight: 8 }}
              />
              <TextField
                label="Upper Limit"
                type="number"
                variant="outlined"
                value={chargeRange.upperLimit}
                onChange={(e) =>
                  handleChargeRangeChange(index, "upperLimit", e.target.value)
                }
                style={{ marginRight: 8 }}
              />
              <TextField
                label="Charge Type"
                select
                variant="outlined"
                value={chargeRange.chargeType}
                onChange={(e) =>
                  handleChargeRangeChange(index, "chargeType", e.target.value)
                }
                style={{ marginRight: 8 }}
              >
                <MenuItem value="Flat">Flat</MenuItem>
                <MenuItem value="Percentage">Percentage</MenuItem>
              </TextField>
              <TextField
                label="Charge"
                type="number"
                variant="outlined"
                value={chargeRange.charge}
                onChange={(e) =>
                  handleChargeRangeChange(index, "charge", e.target.value)
                }
              />
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleRemoveChargeRange(index)}
              >
                Remove
              </Button>
            </Box>
          ))}
          <Button variant="outlined" onClick={handleAddChargeRange}>
            Add Charge Range
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddPackageClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddPackageSubmit} color="primary">
            Add Package
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AllPayin;
