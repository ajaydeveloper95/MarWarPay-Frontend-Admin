import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSidebar } from "../../../Context/SidebarContext";
import { apiGet, apiPost } from "../../../utils/http";

const API_BASE_URL = "/apiAdmin/v1/fundAdd";
const API_GET_TICKET = `${API_BASE_URL}/getSingleFundRequest/`;
const API_UPDATE_TICKET = `${API_BASE_URL}/updateFundRequestStatus/`;

const EditTopUp = () => {
  const { trxId } = useParams();
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();

  // State Initialization
  const [ticketData, setTicketData] = useState({ isStatus: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [ticData, setTicData] = useState();



  useEffect(() => {
    if (!trxId) {
      toast.error("Invalid request. No ID provided.");
      setError("Invalid request.");
      setLoading(false);
      return;
    }

    const fetchTicket = async () => {
      try {
        const response = await apiGet(`${API_GET_TICKET}${trxId}`);

        if (response.status === 200 && response.data?.data) {
          console.log("API Response:", response.data?.data[0]?._id);
          setTicData(response.data?.data[0]?._id)
          setTicketData({ isStatus: response.data.data.isStatus || "" });
        } else {
          throw new Error("Failed to fetch ticket details.");
        }
      } catch (err) {
        console.error("Error fetching ticket data:", err);
        setError("Error fetching ticket data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [trxId]);

  const handleChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newStatus) {
      toast.error("Please select a valid status.");
      return;
    }
    setOpenDialog(true);
  };

  const handleConfirmUpdate = async () => {
    setOpenDialog(false);

    if (!ticData) {
      toast.error("Invalid request. No ID provided.");
      return;
    }

    const updatedData = { isSuccess: newStatus };

    try {
      console.log("Updating TopUp with:", updatedData);
      const response = await apiPost(`${API_UPDATE_TICKET}${ticData}`, updatedData);

      if (response.status === 200) {
        toast.success("TopUp updated successfully!");
        navigate("/request/allTopUp");
      } else {
        throw new Error("Failed to update the TopUp.");
      }
    } catch (err) {
      console.error("Error updating TopUp:", err);
      toast.error("Error updating TopUp. Please try again.");
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
        <Box display="flex" alignItems="center" mb={2}>
          <Button onClick={handleBackButtonClick} startIcon={<ArrowBackIcon />}>
            Back
          </Button>
          <Typography variant="h5" ml={2}>
            Update TopUp
          </Typography>
        </Box>

        {/* Show error message but keep the UI */}
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  name="isStatus"
                  value={newStatus || ticketData.isStatus}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value="Success">Success</MenuItem>
                  <MenuItem value="Failed">Failed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box mt={2}>
            <Button variant="contained" color="primary" type="submit" sx={{ mr: 2 }}>
              Update TopUp
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleBackButtonClick}>
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">Confirm Update</DialogTitle>
        <DialogContent>
          <Typography id="confirm-dialog-description">
            Are you sure you want to update the topup status to `{newStatus}`?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmUpdate} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </Container>
  );
};

export default EditTopUp;
