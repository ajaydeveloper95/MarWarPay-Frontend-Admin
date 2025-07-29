import {
  Container,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { useState } from "react";
import { apiPost } from "../../../utils/http";

const ADD_PAYIN_API = `apiAdmin/v1/apiswitch/addPayInSwitch`;

const AddPayinAPI = ({ onClose }) => {
  const [newApiName, setNewApiName] = useState("");
  const [newApiURL, setNewApiURL] = useState("");
  const [newApiInfo, setNewApiInfo] = useState("");
  const [newTrxIdType, setNewTrxIdType] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState(null);

  const handleApiNameChange = (e) => setNewApiName(e.target.value);
  const handleApiUrlChange = (e) => setNewApiURL(e.target.value);
  const handleApiInfoChange = (e) => setNewApiInfo(e.target.value);

  const handleSubmit = async () => {
    if (!newApiName || !newApiURL || !newTrxIdType) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await apiPost(ADD_PAYIN_API, {
        apiName: newApiName,
        apiURL: newApiURL,
        apiInfo: newApiInfo,
        trxIdType: newTrxIdType,
      });

      if (response.status === 200) {
        setSnackbarMessage("Payin API added successfully!");
        setOpenSnackbar(true);
        setNewApiName("");
        setNewApiURL("");
        setNewTrxIdType("");
        setNewApiInfo("");
        onClose();
      }
    } catch (err) {
      setError("An error occurred while adding the API.",err);
    }
  };

  const handleSnackbarClose = () => setOpenSnackbar(false);

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Add New Payin API
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

      <FormControl component="fieldset" margin="normal">
        <RadioGroup
          row
          value={newTrxIdType}
          onChange={(e) => setNewTrxIdType(e.target.value)}
        >
          <FormControlLabel value="Num" control={<Radio />} label="Num" />
          <FormControlLabel
            value="AlphaNum"
            control={<Radio />}
            label="Alphanum"
          />
        </RadioGroup>
      </FormControl>

      {error && <Typography color="error">{error}</Typography>}

     <div>
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
     </div>

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

export default AddPayinAPI;
