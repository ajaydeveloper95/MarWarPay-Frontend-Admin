import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
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
import { apiGet, apiPost } from "../../../utils/http";


const UpdatePayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const packageData = location.state || {};
  const [payOutPackageName, setPayOutPackageName] = useState(packageData.payOutPackageName || "");
  const [payOutChargeRange, setPayOutChargeRange] = useState(packageData.payOutChargeRange || []);
  const [isActive, setIsActive] = useState(packageData.isActive || false);
  const { isSidebarOpen } = useSidebar();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false); // State for the dialog

  useEffect(() => {
    if (!packageData._id) {
      const fetchPackageData = async () => {
        try {
          const response = await apiGet(`apiAdmin/v1/package/getSinglePayOutPackage/${id}`);
          const data = response.data.data;
          setPayOutPackageName(data.payOutPackageName);
          setPayOutChargeRange(data.payOutChargeRange);
          setIsActive(data.isActive);
        } catch (err) {
          setError(err.response ? err.response.data.message : "An error occurred");
        }
      };
      fetchPackageData();
    }
  }, [id, packageData._id]);

  const handleChargeChange = (index, field, value) => {
    const updatedChargeRange = [...payOutChargeRange];
    updatedChargeRange[index][field] = value;
    setPayOutChargeRange(updatedChargeRange);
  };

  const addChargeRange = () => {
    setPayOutChargeRange([...payOutChargeRange, { lowerLimit: '', upperLimit: '', chargeType: '', charge: '' }]);
  };

  const deleteChargeRange = (index) => {
    const updatedChargeRange = payOutChargeRange.filter((_, i) => i !== index);
    setPayOutChargeRange(updatedChargeRange);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const updatedChargeRange = payOutChargeRange.map(({ _id, ...rest }) => rest);
      await apiPost(
        `apiAdmin/v1/package/updatePayOutPackage/${id}`,
        {
          payOutPackageName,
          payOutChargeRange: updatedChargeRange,
          isActive,
        }
      );
      setOpenSuccessDialog(true); 
      setLoading(false);
    } catch (err) {
      setError(err.response ? err.response.data.message : "An error occurred");
      setLoading(false);
    }
  };

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
    navigate("/package/settings/payout"); 
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
          Update Payout Package
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                label="Package Name"
                fullWidth
                value={payOutPackageName}
                onChange={(e) => setPayOutPackageName(e.target.value)}
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
                    {payOutChargeRange.map((range, index) => (
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

export default UpdatePayout;
