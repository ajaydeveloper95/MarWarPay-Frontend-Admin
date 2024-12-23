import { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
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
import { useNavigate } from "react-router-dom";
import { accessToken } from "../../../helpingFile";
import { apiGet, apiPost } from "../../../utils/http";

const API_ENDPOINT = `apiAdmin/v1/ipWhitelist/addUserIp`;
const USER_LIST_API = `apiAdmin/v1/utility/getUserList`;
const ACCESS_TOKEN = accessToken;

const AddIP = () => {
  const [memberId, setMemberId] = useState("");
  const [ipUser, setIpUser] = useState("");
  const [ipUserDev, setIpUserDev] = useState("null");
  const [isStatus, setIsStatus] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userList, setUserList] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await apiGet(USER_LIST_API, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
        if (response.data.statusCode === 200) {
          setUserList(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching user list:", err);
      }
    };

    fetchUserList();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    const data = {
      memberId,
      ipUser,
      ipUserDev,
      isStatus: isStatus.toString(),
    };

    try {
      const response = await apiPost(API_ENDPOINT, data, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });

      if (response.status === 200) {
        setSuccessMessage("IP added successfully!");
        setIsDialogOpen(true);
      }
    } catch (err) {
      if (err.response?.data?.message === "Duplicate key error!") {
        setError("This IP address is already whitelisted for the selected member.");
      } else {
        setError("Error adding IP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    navigate("/ipManagement/allUsersIP"); 
  };

  const handleCancel = () => {
    navigate(-1); 
  };

  return (
    <Container
      maxWidth="lg"
      style={{
        marginLeft: "16rem", 
        transition: "margin-left 0.3s ease",
        minWidth: "600px",
        maxWidth: "80%",
        marginTop: "8%",
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
          Add IP to Whitelist
        </Typography>

        {error && (
          <Typography variant="body1" color="error" sx={{ marginBottom: 2 }}>
            This IP address is already whitelisted for the selected member.
          </Typography>
        )}

        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="member-id-label">Member ID</InputLabel>
                <Select
                  labelId="member-id-label"
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  label="Member ID"
                >
                  {userList.map((user) => (
                    <MenuItem key={user._id} value={user._id}>
                      {`${user.fullName} (${user.memberId})`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="IP User"
                variant="outlined"
                fullWidth
                value={ipUser}
                onChange={(e) => setIpUser(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="IP User Dev"
                variant="outlined"
                fullWidth
                value={ipUserDev}
                onChange={(e) => setIpUserDev(e.target.value)}
                required
              />
              <p style={{color: 'red'}}>Note:- If you use * allow all IP (only use in IP User Dev)</p>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  value={isStatus}
                  onChange={(e) => setIsStatus(e.target.value === "true")}
                  label="Status"
                >
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="flex-end" spacing={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mr: 2, background: "teal" }}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add IP"}
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>

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

export default AddIP;
