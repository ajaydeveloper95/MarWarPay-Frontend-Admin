import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Snackbar,
  Alert,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSidebar } from "../../../Context/SidebarContext";
import { useNavigate } from "react-router-dom";
import { apiGet, apiPost } from "../../../utils/http";

const PAYOUT_API_LIST = `apiAdmin/v1/apiswitch/allPayOutSwitch`;

const UpdatePayoutAPI = () => {
  const { isSidebarOpen } = useSidebar();
  const navigate = useNavigate();
  const [payInApiList, setPayInApiList] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [selectedApi, setSelectedApi] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  useEffect(() => {
    const fetchPayInApiList = async () => {
      try {
        const response = await apiGet(PAYOUT_API_LIST);
        setPayInApiList(response.data.data);
      } catch {
        showSnackbar("Failed to fetch PayOut API list.");
      }
    };
    fetchPayInApiList();
  }, []);

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleEditClick = (api) => {
    setSelectedApi(api);
    setEditDialogOpen(true);
  };

  const handleSave = () => {
    setEditDialogOpen(false);
    setConfirmDialogOpen(true);  
  };

  const handleConfirmUpdate = async () => {
    setConfirmDialogOpen(false); 
    if (selectedApi) {
      try {
        const response = await apiPost(
          `apiAdmin/v1/apiswitch/updatePayOutSwitch/${selectedApi._id}`,
          {
            apiName: selectedApi.apiName,
            apiURL: selectedApi.apiURL,
            apiInfo: selectedApi.apiInfo,
            isActive: selectedApi.isActive, 
          }
        );

        if (response.data.statusCode === 200) {
          const updatedResponse = await apiGet(PAYOUT_API_LIST);
          setPayInApiList(updatedResponse.data.data); 
          showSnackbar("API details updated successfully!");
        } else {
          showSnackbar("Failed to update API details.");
        }
      } catch {
        showSnackbar("Error updating API details.");
      }
    }
  };

  const handleCancel = () => navigate(-1);
  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const handleStatusChange = (event) => {
    setSelectedApi((prev) => ({
      ...prev,
      isActive: event.target.checked,
    }));
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
      <Box sx={{ mt: 4, p: 4, borderRadius: 2, boxShadow: 3, backgroundColor: "background.paper", position: "relative" }}>
        <IconButton onClick={handleCancel} color="primary" sx={{ position: "absolute", top: 0, left: 16 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" gutterBottom>PayOut API Status</Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      border: "1px solid rgba(224, 224, 224, 1)",
                    }}>#</TableCell>
                <TableCell sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      border: "1px solid rgba(224, 224, 224, 1)",
                    }}>API Name</TableCell>
                <TableCell sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      border: "1px solid rgba(224, 224, 224, 1)",
                    }}>API Info</TableCell>
                <TableCell sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      border: "1px solid rgba(224, 224, 224, 1)",
                    }}>Status</TableCell>
                <TableCell sx={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      border: "1px solid rgba(224, 224, 224, 1)",
                    }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payInApiList.map((api, index) => (
                <TableRow key={api._id}>
                  <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{index + 1}</TableCell>
                  <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{api.apiName}</TableCell>
                  <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{api.apiInfo}</TableCell>
                  <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{api.isActive ? "Active" : "Inactive"}</TableCell>
                  <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                    <IconButton onClick={() => handleEditClick(api)}>
                      <VisibilityIcon color="primary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Edit Dialog */}
        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
          <DialogTitle>Edit PayOut API</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="dense"
              label="API Name"
              value={selectedApi?.apiName || ""}
              onChange={(e) => setSelectedApi((prev) => ({ ...prev, apiName: e.target.value }))} 
            />
            <TextField
              fullWidth
              margin="dense"
              label="API URL"
              value={selectedApi?.apiURL || ""}
              onChange={(e) => setSelectedApi((prev) => ({ ...prev, apiURL: e.target.value }))} 
            />
             <TextField
              fullWidth
              margin="dense"
              label="API Info"
              value={selectedApi?.apiInfo || ""}
              onChange={(e) => setSelectedApi((prev) => ({ ...prev, apiInfo: e.target.value }))} 
            />
            <div>
              <Typography variant="body1">Status</Typography>
              <Switch
                checked={selectedApi?.isActive || false}
                onChange={handleStatusChange}
                name="isActive"
                color="primary"
              />
              <Typography variant="body2" display="inline" sx={{ ml: 2 }}>
                {selectedApi?.isActive ? "Active" : "Inactive"}
              </Typography>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)} color="secondary">Cancel</Button>
            <Button onClick={handleSave} color="primary">Save</Button>
          </DialogActions>
        </Dialog>

        {/* Confirmation Dialog */}
        <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
          <DialogTitle>Confirm Update</DialogTitle>
          <DialogContent>Are you sure you want to update this API?</DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDialogOpen(false)} color="secondary">Cancel</Button>
            <Button onClick={handleConfirmUpdate} color="primary">Yes, Update</Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: "100%" }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default UpdatePayoutAPI;
