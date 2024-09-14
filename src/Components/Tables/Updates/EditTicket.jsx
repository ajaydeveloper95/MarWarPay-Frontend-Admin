import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { accessToken, domainBase } from "../../../helpingFile";
import { useSidebar } from "../../../Context/SidebarContext";

const API_GET_TICKET = `${domainBase}apiAdmin/v1/support/getSingleTicket/`;
const API_UPDATE_TICKET = `${domainBase}apiAdmin/v1/support/updateTicketStatus/`;

const EditTicket = () => {
  const { id } = useParams(); // Get ticket ID from URL params
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();
  const [ticketData, setTicketData] = useState({
    subject: "",
    relatedTo: "",
    message: "",
    isStatus: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`${API_GET_TICKET}${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Adjust the request body according to API requirements
    const updatedData = {
      // Include only the fields that are allowed by the API
      isStatus: ticketData.isStatus,
    };

    try {
      const response = await axios.post(`${API_UPDATE_TICKET}${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        toast.success("Ticket updated successfully!");
        navigate("/viewAllTickets");
      } else {
        toast.error("Failed to update the ticket.");
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
      toast.error("Error updating ticket. Please try again.");
    }
  };

  const handleBackButtonClick = () => {
    navigate(-1); // Go back to previous page
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
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Subject"
                name="subject"
                variant="outlined"
                fullWidth
                value={ticketData.subject || ""}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Related To"
                name="relatedTo"
                variant="outlined"
                fullWidth
                value={ticketData.relatedTo || ""}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Message"
                name="message"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={ticketData.message || ""}
                onChange={handleChange}
                required
              />
            </Grid>

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
                  <MenuItem value="Pending">Pending</MenuItem>
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
      <ToastContainer />
    </Container>
  );
};

export default EditTicket;
