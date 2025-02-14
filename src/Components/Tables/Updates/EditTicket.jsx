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

const API_GET_TICKET = `apiAdmin/v1/support/getSingleTicket/`;
const API_UPDATE_TICKET = `apiAdmin/v1/support/updateTicketStatus/`;

const EditTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();
  const [ticketData, setTicketData] = useState({
    isStatus: "",
  });
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await apiGet(`${API_GET_TICKET}${id}`);
        if (response.status === 200) {
          setTicketData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching ticket data:", error);
        toast.error("Error fetching ticket data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setNewStatus(value); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenDialog(true); 
  };

  const handleConfirmUpdate = async () => {
    setOpenDialog(false);
    const updatedData = {
      isStatus: newStatus,
    };

    try {
      const response = await apiPost(`${API_UPDATE_TICKET}${id}`, updatedData);
      if (response.status === 200) {
        toast.success("Ticket updated successfully!");
        navigate("/support/allTicket");
      } else {
        toast.error("Failed to update the ticket.");
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
      toast.error("Error updating ticket. Please try again.");
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleBackButtonClick = () => {
    navigate(-1); 
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

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
            Update Ticket
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  name="isStatus"
                  value={ticketData.isStatus || ""}
                  onChange={handleChange}
                  label="Status"
                >
                  {/* <MenuItem value="Pending">Pending</MenuItem> */}
                  <MenuItem value="Resolved">Resolved</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mr: 2 }}
            >
              Update Ticket
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleBackButtonClick}
            >
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
            Are you sure you want to update the ticket status to `{newStatus}`?
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

export default EditTicket;
