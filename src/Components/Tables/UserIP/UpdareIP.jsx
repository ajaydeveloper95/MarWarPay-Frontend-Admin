import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { accessToken, domainBase } from "../../../helpingFile";
import { useSidebar } from "../../../Context/SidebarContext";

const FETCH_API = `${domainBase}apiAdmin/v1/ipWhitelist/getSingleUserIp`;
const UPDATE_API = `${domainBase}apiAdmin/v1/ipWhitelist/updateUserIp/`;
const DELETE_API = `${domainBase}apiAdmin/v1/ipWhitelist/deleteUserIp/`;
const ACCESS_TOKEN = accessToken;

const UpdateIP = () => {
  const { isSidebarOpen } = useSidebar();
  const { id } = useParams(); // Assume `id` is passed as a route parameter
  const [ipDetails, setIpDetails] = useState({
    memberId: "",
    ipUser: "",
    ipUserDev: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navigate = useNavigate();

  // Fetch IP details on component mount
  useEffect(() => {
    const fetchIpDetails = async () => {
      try {
        const response = await axios.get(`${FETCH_API}/${id}`,{
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
              },
        });
        // console.log(response?.data?.data[0])
        setIpDetails(response?.data?.data[0]);
      } catch (err) {
        setError("Failed to fetch IP details. Please try again.",err);
      }
    };
   
    fetchIpDetails();
  }, [id]);

  // Handle form change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIpDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle update action
  const handleUpdate = async () => {
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const payload = {
        memberId: ipDetails.userInfo._id,
        // fullName: ipDetails.userInfo.fullName,
        ipUser: ipDetails.ipUser,
        ipUserDev: ipDetails.ipUserDev,
      };
      const response = await axios.post(`${UPDATE_API}${id}`, payload,{
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
      });

      if (response.status === 200) {
        setSuccessMessage("IP updated successfully!");
        setIsDialogOpen(true);
      }
    } catch (err) {
      setError("Failed to update IP. Please try again.",err);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete action
  const handleDelete = async () => {
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.delete(`${DELETE_API}${id}`,{
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
      });
      if (response.status === 200) {
        setSuccessMessage("IP deleted successfully!");
        setIsDialogOpen(true);
      }
    } catch (err) {
      setError("Failed to delete IP. Please try again.",err);
    } finally {
      setLoading(false);
    }
  };

  // Close dialog and navigate
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    navigate("/ipManagement/allUsersIP"); // Adjust the navigation route as needed
  };

  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <Container
      maxWidth="lg"
      style={{
        marginLeft: isSidebarOpen ? '16rem' : '10rem',
        transition: 'margin-left 0.3s ease',
        minWidth: '600px',
        maxWidth: '80%',
        marginTop: '8%',
      }}
    >
      <Box
        sx={{
          mt: 4,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "background.paper",
          position: "relative",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: "teal" }}>
          Update/Delete IP Whitelist
        </Typography>

        {error && (
          <Typography variant="body1" color="error" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}

        {ipDetails ? (
          <form noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="memberId"
                  name="memberId"
                  variant="outlined"
                  fullWidth
                  value={ipDetails?.userInfo?.memberId || ""}
                  onChange={handleInputChange}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="UserName"
                  name="UserName"
                  variant="outlined"
                  fullWidth
                  value={ipDetails?.userInfo?.fullName || ""}
                  onChange={handleInputChange}
                  disabled
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="IP User"
                  name="ipUser"
                  variant="outlined"
                  fullWidth
                  value={ipDetails.ipUser || ""}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="IP User Dev"
                  name="ipUserDev"
                  variant="outlined"
                  fullWidth
                  value={ipDetails.ipUserDev || ""}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mr: 2 }}
                  onClick={handleUpdate}
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update IP"}
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ mr: 2 }}
                  onClick={handleDelete}
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete IP"}
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        ) : (
          <Typography variant="body1">Loading IP details...</Typography>
        )}

        {/* Success Dialog */}
        <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Success</DialogTitle>
          <DialogContent>
            <Typography>{successMessage}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default UpdateIP;
