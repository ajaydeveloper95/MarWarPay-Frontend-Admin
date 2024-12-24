import {
    Container,
    Typography,
    TextField,
    Button,
    Snackbar,
    Alert,
  } from "@mui/material";
  import { useState } from "react";
import { apiPost } from "../../../utils/http";
  
  const ADD_PAYOUT_API = `apiAdmin/v1/apiswitch/addPayOutSwitch`;
  
  const AddPayout = ({ onClose }) => {
    const [newApiName, setNewApiName] = useState("");
    const [newApiURL, setNewApiURL] = useState("");
    const [newApiInfo, setNewApiInfo] = useState("");
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [error, setError] = useState(null);
  
    const handleApiNameChange = (e) => setNewApiName(e.target.value);
    const handleApiUrlChange = (e) => setNewApiURL(e.target.value);
    const handleApiInfoChange = (e) => setNewApiInfo(e.target.value);
  
    const handleSubmit = async () => {
      if (!newApiName || !newApiURL) {
        setError("All fields are require.");
        return;
      }
  
      try {
        const response = await apiPost(
          ADD_PAYOUT_API,
          {
            apiName: newApiName,
            apiURL: newApiURL,
            apiInfo: newApiInfo
          }
        );
  
        if (response.status === 200) {
          setSnackbarMessage("Payout API added successfully!");
          setOpenSnackbar(true);
          setNewApiName("");
          setNewApiURL("");
          setNewApiInfo("");
          onClose(); 
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
         <TextField
          fullWidth
          margin="normal"
          label="API Info"
          value={newApiInfo}
          onChange={handleApiInfoChange}
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
  
  export default AddPayout;
  