import {
  Container,
  Typography,
  Grid,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Snackbar,
  Dialog, DialogContent, DialogTitle,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../../../Context/SidebarContext";
import { useEffect, useState } from "react";
import AddPayinAPI from "./AddPayinAPI";
import { apiGet, apiPost } from "../../../utils/http";

const USER_LIST_API = `apiAdmin/v1/utility/getUserListSwitchApi`;
const PAYIN_API_LIST = `apiAdmin/v1/utility/getPayInApiList`;
const SWITCH_API = `apiAdmin/v1/apiswitch/AllUserSwitchPayIn`;
const SWITCH_API_SINGLE_USER = `apiAdmin/v1/apiswitch/OneUserSwitchPayIn`;

const PayinSW = () => {
  const { isSidebarOpen } = useSidebar();
  const [userList, setUserList] = useState([]);
  const [payInApiList, setPayInApiList] = useState([]);
  const [dropdownValue, setDropdownValue] = useState("false");
  const [userApiValue, setUserApiValue] = useState("");
  const [selectedApiId, setSelectedApiId] = useState(null);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const fetchUserList = async () => {
    try {
      const response = await apiGet(USER_LIST_API);
      setUserList(response.data.data);
    } catch (err) {
      setError("Please Wait...", err);
    }
  };

  const fetchPayInApiList = async () => {
    try {
      const response = await apiGet(PAYIN_API_LIST);
      setPayInApiList(response.data.data);
    } catch (err) {
      setError("Please Wait...", err);
    }
  };
  useEffect(() => {

    fetchUserList();
    fetchPayInApiList();
  }, []);

  const handleCancel = () => navigate(-1);
  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    fetchUserList();
    fetchPayInApiList();
  };

  const handleUserChange = (e, custom) => {
    const value = e.target.value;
    const payInApiID = custom.props.payinapiid;
    setDropdownValue(value);
    setUserApiValue(payInApiID);
    setSelectedApiId(null);
  };

  const handleStatusChange = (apiId) => {
    setSelectedApiId(apiId);
    setUserApiValue(apiId);
  };

  const handleSave = async () => {
    if (!selectedApiId) {
      setError("Please select an API to switch.");
      return;
    }
  
    try { 
      let response;
      if (dropdownValue === "allusers") {
        response = await apiPost(
          SWITCH_API,
          { apiId: selectedApiId }
        );
      } else {
        response = await apiPost(
          SWITCH_API_SINGLE_USER,
          { userId: dropdownValue, apiId: selectedApiId }
        );
      }
  
      if (response.data.statusCode === 200) {
        const message =
          typeof response.data.data === "string"
            ? response.data.data
            : "API switch successful!"; 
  
        setSnackbarMessage(message);
        setOpenSnackbar(true);
      }
    } catch (error) {
      setError("Please Wait....",error);
    }
  };
  

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setSnackbarMessage("");
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
        <IconButton
          onClick={handleCancel}
          color="primary"
          sx={{ position: "absolute", top: 0, left: 16 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: "teal" }}
        >
          PayIn API Switching
        </Typography>

        {/* Dropdown for selecting user */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel id="dropdown-label">Select User</InputLabel>
              <Select
                labelId="dropdown-label"
                value={dropdownValue}
                onChange={handleUserChange}
                label="Select User"
              >
                <MenuItem value="false">Select User</MenuItem>
                <MenuItem value="allusers">All Users</MenuItem>
                {userList.map((user) => (
                  <MenuItem
                    key={user._id}
                    value={user._id}
                    payinapiid={user?.payInApi?._id}
                  >
                    {`${user.fullName}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <Button variant="contained" color="primary">
              Search
            </Button>
          </Grid>

          <Grid item xs={12} md={3}>
            <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Add New Payin API
      </Button>
      </Grid>
        </Grid>

        
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Add Payin API</DialogTitle>
        <DialogContent>
          <AddPayinAPI onClose={handleCloseDialog} />
        </DialogContent>
      </Dialog>
  

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <Box
          sx={{
            mt: 4,
            p: 2,
            borderRadius: 2,
            boxShadow: 2,
            backgroundColor: "background.paper",
          }}
        >
          <TableContainer component={Paper}>
            <RadioGroup>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ fontWeight: "bold", bgcolor: "lightgray", border: "1px solid rgba(224, 224, 224, 1)"  }}
                    >
                      #
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", bgcolor: "lightgray" , border: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      API
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", bgcolor: "lightgray", border: "1px solid rgba(224, 224, 224, 1)"  }}
                    >
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {payInApiList.map((api, index) => (
                    <TableRow key={api._id}>
                      <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{index + 1}</TableCell>
                      <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>{api.apiName}</TableCell>
                      <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                        {dropdownValue !== "false" ? (
                          <FormControlLabel
                            value={api._id}
                            control={
                              <Radio
                                name="Radio"
                                checked={userApiValue === api._id}
                                value={api._id}
                                onChange={() => handleStatusChange(api._id)}
                              />
                            }
                          />
                        ) : api.isActive ? (
                          "Active"
                        ) : (
                          "Inactive"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </RadioGroup>
          </TableContainer>
        </Box>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>

        {/* Snackbar for success/failure messages */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default PayinSW;
