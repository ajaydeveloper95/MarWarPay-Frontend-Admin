import React, { useState } from "react";
import { TextField, Button, DialogActions, DialogContent } from "@mui/material";
import axios from "axios";
import { accessToken, domainBase } from "../../../helpingFile";

const ACCESS_TOKEN = accessToken;
const UPDATE_API_URL = `${domainBase}apiAdmin/v1/apiswitch/updatePayOutSwitch/`;

const UpdatePayinAPI = ({ onClose }) => {
  const [apiName, setApiName] = useState("");
  const [error, setError] = useState(null);

  const handleApiNameChange = (e) => {
    setApiName(e.target.value);
  };

  const handleUpdate = async () => {
    if (!apiName) {
      setError("API Name is required.");
      return;
    }

    try {
      const response = await axios.put(
        `${UPDATE_API_URL}66c5911216cdfa1241c004a2`, // Example API ID (Replace with the actual ID)
        { apiName },
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      if (response.data.statusCode === 200) {
        alert("API updated successfully.");
        onClose(); // Close dialog after successful update
      }
    } catch (err) {
      setError("Failed to update the API. Please try again.");
    }
  };

  return (
    <div>
      <DialogContent>
        <TextField
          label="PayIn API Name"
          value={apiName}
          onChange={handleApiNameChange}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleUpdate}>Save</Button>
      </DialogActions>
    </div>
  );
};

export default UpdatePayinAPI;
