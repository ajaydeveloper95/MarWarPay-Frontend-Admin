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
import { useSidebar } from "../../../Context/SidebarContext";
import axios from "axios";
import { accessToken, domainBase } from "../../../helpingFile";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ACCESS_TOKEN = accessToken;
const PACKAGE_API_ENDPOINT = `${domainBase}apiAdmin/v1/utility/getPackageList`;

const EditMember = () => {
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();
  const [userData, setUserData] = useState({});
  const [userData1, setUserData1] = useState({});
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/apiAdmin/v1/user/userProfile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        );
        if (response.data.statusCode === 200) {
          setUserData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPackages = async () => {
      try {
        const response = await axios.get(PACKAGE_API_ENDPOINT, {
          headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        });

        if (response.status === 200) {
          setPackages(response.data.data); // Set package data
        }
      } catch (err) {
        console.error("Error fetching package data:", err);
      }
    };

    fetchUserData();
    fetchPackages();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/apiAdmin/v1/user/updateUser/${userData._id}`,
        userData1,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Updated successfully!");
      }
    } catch (err) {
      console.error("Error updating user data:", err);
      toast.error("Error updating user data. Please try again.");
    }
  };

  const handleBackButtonClick = () => {
    navigate("/members/all_members");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "isActive" ? value === "true" : value;
    setUserData1((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
    setUserData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  const onhandle2 = (data) => {
    const { name } = data.target;
    setUserData1((value) => ({
      ...value,
      [name]: data.target.value,
    }));
    setUserData((val) => ({
      ...val,
      [name]: data.target.value,
    }));
  };

  const handlePackageChange = (e) => {
    const { value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      package: {
        ...prevData.package,
        packageId: value,
      },
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
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
        <Typography variant="h5" component="h1" gutterBottom>
          Update Member
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBackButtonClick}
          sx={{ mb: 2 }}
        >
          Back to Members
        </Button>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="User Name"
                name="userName"
                variant="outlined"
                fullWidth
                value={userData.userName || ""}
                onChange={onhandle2}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                fullWidth
                value={userData.password || ""}
                InputProps={{
                  readOnly: true, // Make the field read-only
                }}
                
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Transaction Password"
                name="trxPassword"
                type="password"
                variant="outlined"
                fullWidth
                value={userData.trxPassword || ""}
                InputProps={{
                  readOnly: true, // Make the field read-only
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Phone"
                name="mobileNumber"
                variant="outlined"
                fullWidth
                value={userData.mobileNumber || ""}
                onChange={onhandle2}
                inputProps={{ maxLength: 10 }} // Ensure phone number is 10 digits
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                fullWidth
                value={userData.email || ""}
                onChange={onhandle2}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="package-type-label">Package Type</InputLabel>
                <Select
                  labelId="package-type-label"
                  value={userData.package || ""}
                  onChange={handlePackageChange}
                  label="Package Type"
                >
                  {packages.map((pkg) => (
                    <MenuItem key={pkg._id} value={pkg._id}>
                      {pkg.packageName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Minimum Wallet Balance"
                name="minWalletBalance"
                variant="outlined"
                fullWidth
                value={userData.minWalletBalance || ""}
                onChange={onhandle2}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="E Wallet Balance"
                name="EwalletBalance"
                variant="outlined"
                fullWidth
                value={userData.EwalletBalance || ""}
                InputProps={{
                  readOnly: true, // Make the field read-only
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="UPI Wallet Balance"
                name="upiWalletBalance"
                variant="outlined"
                fullWidth
                value={userData.upiWalletBalance || ""}
                InputProps={{
                  readOnly: true, // Make the field read-only
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  name="isActive"
                  value={userData.isActive ? "true" : "false"}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value="true">Active</MenuItem>
                  <MenuItem value="false">Deactive</MenuItem>
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
              Save Changes
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

export default EditMember;
