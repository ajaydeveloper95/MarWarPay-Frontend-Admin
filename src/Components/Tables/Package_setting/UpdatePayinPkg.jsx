import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useSidebar } from "../../../Context/SidebarContext";
import { accessToken, domainBase } from '../../../helpingFile';

const ACCESS_TOKEN = accessToken;

const UpdatePayinPkg = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const packageData = location.state || {};
  const [payInPackageName, setpayInPackageName] = useState(packageData.payInPackageName || "");
  const [payInChargeRange, setpayInChargeRange] = useState(packageData.payInChargeRange || []);
  const [isActive, setIsActive] = useState(packageData.isActive || false);
  const { isSidebarOpen } = useSidebar();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false); // State for the dialog

  useEffect(() => {
    if (!packageData._id) {
      const fetchPackageData = async () => {
        try {
          const response = await axios.get(`${domainBase}apiAdmin/v1/package/getSinglePayInPackage/${id}`, {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          });
          const data = response.data.data;
          setpayInPackageName(data.payInPackageName);
          setpayInChargeRange(data.payInChargeRange);
          setIsActive(data.isActive);
        } catch (err) {
          setError(err.response ? err.response.data.message : "An error occurred");
        }
      };
      fetchPackageData();
    }
  }, [id, packageData._id]);

  const handleChargeChange = (index, field, value) => {
    const updatedChargeRange = [...payInChargeRange];
    updatedChargeRange[index][field] = value;
    setpayInChargeRange(updatedChargeRange);
  };

  const addChargeRange = () => {
    setpayInChargeRange([...payInChargeRange, { lowerLimit: '', upperLimit: '', chargeType: '', charge: '' }]);
  };

  const deleteChargeRange = (index) => {
    const updatedChargeRange = payInChargeRange.filter((_, i) => i !== index);
    setpayInChargeRange(updatedChargeRange);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const updatedChargeRange = payInChargeRange.map(({ _id, ...rest }) => rest);
      await axios.post(
        `${domainBase}apiAdmin/v1/package/updatePayInPackage/${id}`,
        {
          payInPackageName,
          payInChargeRange: updatedChargeRange,
          isActive,
        },
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      setOpenSuccessDialog(true); // Open success dialog
      setLoading(false);
    } catch (err) {
      setError(err.response ? err.response.data.message : "An error occurred");
      setLoading(false);
    }
  };

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
    navigate("/package/settings/payin"); // Navigate after closing the dialog
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
      <Paper sx={{ p: 3, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>
          Update Payin Package
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                label="Package Name"
                fullWidth
                value={payInPackageName}
                onChange={(e) => setpayInPackageName(e.target.value)}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Lower Limit</TableCell>
                      <TableCell>Upper Limit</TableCell>
                      <TableCell>Charge Type</TableCell>
                      <TableCell>Charge</TableCell>
                      <TableCell align="right">
                        <IconButton color="primary" onClick={addChargeRange}>
                          <AddIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {payInChargeRange.map((range, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <TextField
                            type="number"
                            value={range.lowerLimit || ""}
                            onChange={(e) => handleChargeChange(index, "lowerLimit", Number(e.target.value))}
                            fullWidth
                            required
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            value={range.upperLimit || ""}
                            onChange={(e) => handleChargeChange(index, "upperLimit", Number(e.target.value))}
                            fullWidth
                            required
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            select
                            value={range.chargeType || ""}
                            onChange={(e) => handleChargeChange(index, "chargeType", e.target.value)}
                            fullWidth
                            required
                          >
                            <MenuItem value="Flat">Flat</MenuItem>
                            <MenuItem value="Percentage">Percentage</MenuItem>
                          </TextField>
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            value={range.charge || ""}
                            onChange={(e) => handleChargeChange(index, "charge", Number(e.target.value))}
                            fullWidth
                            required
                          />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton color="secondary" onClick={() => deleteChargeRange(index)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Status"
                select
                value={isActive ? "Active" : "Inactive"}
                onChange={(e) => setIsActive(e.target.value === "Active")}
                margin="normal"
                fullWidth
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Box mt={2}>
                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                  {loading ? "Updating..." : "Update Package"}
                </Button>
                {error && <Typography color="error">{error}</Typography>}
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Dialog
        open={openSuccessDialog}
        onClose={handleCloseSuccessDialog}
      >
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <Typography>Payout package updated successfully!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UpdatePayinPkg;