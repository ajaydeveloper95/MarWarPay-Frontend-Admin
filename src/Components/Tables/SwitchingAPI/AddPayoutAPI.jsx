import {
  Container,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { accessToken, domainBase } from "../../../helpingFile";

const ADD_PAYOUT_API = `${domainBase}apiAdmin/v1/apiswitch/addPayOutSwitch`;
const ACCESS_TOKEN = accessToken;

const AddPayoutAPI = ({ onClose }) => {
  const [newApiName, setNewApiName] = useState("");
  const [newApiURL, setNewApiURL] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState(null);

  const handleApiNameChange = (e) => setNewApiName(e.target.value);
  const handleApiUrlChange = (e) => setNewApiURL(e.target.value);

  const handleSubmit = async () => {
    if (!newApiName || !newApiURL) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      const response = await axios.post(
        ADD_PAYOUT_API,
        {
          apiName: newApiName,
          apiURL: newApiURL, // Update to use "apiURL" as required by the server
        },
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      if (response.status === 200) {
        setSnackbarMessage("Payout API added successfully!");
        setOpenSnackbar(true);
        setNewApiName("");
        setNewApiURL("");
        onClose(); // Close form after successful addition
      }
    } catch (err) {
      setError("Please Wait....", err);
    }
  };

  const handleSnackbarClose = () => setOpenSnackbar(false);

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Add New Payout API
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="API Name"
        value={newApiName}
        onChange={handleApiNameChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="API URL"
        value={newApiURL}
        onChange={handleApiUrlChange}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ marginTop: "16px" }}
      >
        Add API
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={onClose}
        style={{ marginTop: "16px", marginLeft: "8px" }}
      >
        Cancel
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddPayoutAPI;
