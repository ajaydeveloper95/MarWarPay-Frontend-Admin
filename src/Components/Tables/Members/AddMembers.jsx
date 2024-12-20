import { useEffect, useState } from "react";
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../../../Context/SidebarContext";
import axios from "axios";
import { accessToken, domainBase } from "../../../helpingFile";

const API_ENDPOINT = `${domainBase}apiAdmin/v1/user/addUser`;
const PACKAGE_API_ENDPOINT = `${domainBase}apiAdmin/v1/utility/getPackageList`;
const COUNTRY_API_ENDPOINT = `https://restcountries.com/v3.1/all`;
const STATE_API_ENDPOINT = `https://countriesnow.space/api/v0.1/countries/states`;
const ACCESS_TOKEN = accessToken;

const AddMembers = () => {
  const [memberType, setMemberType] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  // const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [packageType, setPackageType] = useState("");
  const [minimumWallet, setMinimumWallet] = useState("");
  const [status, setStatus] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for success dialog
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(null);
  const [packages, setPackages] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();

  useEffect(() => {
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
        setError(err);
      }
    };

    // Fetch countries data
    const fetchCountries = async () => {
      try {
        const response = await axios.get(COUNTRY_API_ENDPOINT);

        if (response.status === 200) {
          // Sort countries by name
          const sortedCountries = response.data
            .map((country) => country.name.common)
            .sort();
          setCountries(sortedCountries); // Set country data
        }
      } catch (err) {
        console.error("Error fetching countries data:", err);
        setError(err);
      }
    };

    fetchPackages();
    fetchCountries();
  }, []);

  useEffect(() => {
    // Fetch states based on selected country
    const fetchStates = async () => {
      if (country) {
        try {
          const response = await axios.post(STATE_API_ENDPOINT, {
            country: country,
          });

          if (response.status === 200 && response.data.data) {
            setStates(response.data.data.states); // Set state data
          }
        } catch (err) {
          console.error("Error fetching states data:", err);
          setError(err);
        }
      }
    };

    fetchStates();
  }, [country]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    if (
      !memberType ||
      !fullName ||
      !email ||
      !phone ||
      !country ||
      !state ||
      !city ||
      !address ||
      !pincode ||
      !packageType ||
      !minimumWallet ||
      status === null
    ) {
      setError("Please fill out all required fields.");
      setSubmitting(false);
      return;
    }

    try {
      // Make the POST request to the API endpoint
      await axios.post(
        API_ENDPOINT,
        {
          memberType,
          fullName,
          email,
          // role,
          mobileNumber: phone,
          addresh: {
            country,
            state,
            city,
            addresh: address,
            pincode,
          },
          // country,
          // state,
          // city,
          package: packageType,
          minWalletBalance: minimumWallet,
          isActive: status,
        },
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      // Show success dialog
      setIsDialogOpen(true);

      // Reset form fields after a successful POST request
      setMemberType("");
      setFullName("");
      setEmail("");
      // setRole("");
      setPhone("");
      setCountry("");
      setState("");
      setCity("");
      setAddress("");
      setPincode("");
      setPackageType("");
      setMinimumWallet("");
      setStatus("");
    } catch (err) {
      console.error("Error posting data:", err);
      setError(err.message || "Failed to submit form.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    navigate("/members/all_members");
  };

  return (
    <Container
      maxWidth="lg"
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
          onClick={() => navigate(-1)}
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
          Add New Member
        </Typography>

        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="member-type">Member Type</InputLabel>
                <Select
                  labelId="member-type-label"
                  value={memberType}
                  onChange={(e) => setMemberType(e.target.value)}
                  label="Member Type"
                >
                  <MenuItem value="Users">User</MenuItem>
                  <MenuItem value="Manages">Manager</MenuItem>
                  <MenuItem value="Retailer">Retailer</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                value={phone}
                onChange={(e) => {
                  const phoneNumber = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                  if (/^\d{0,10}$/.test(phoneNumber)) {
                    setPhone(phoneNumber);
                  }
                }}
                required
                inputProps={{ maxLength: 10 }}
              />
            </Grid>
            {/* Country Dropdown */}
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="country-label">Country</InputLabel>
                <Select
                  labelId="country-label"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  label="Country"
                >
                  {countries.map((countryName, index) => (
                    <MenuItem key={index} value={countryName}>
                      {countryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* State Dropdown */}
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="state-label">State</InputLabel>
                <Select
                  labelId="state-label"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  label="State"
                  disabled={!country} // Disable if no country is selected
                >
                  {states.map((stateObj, index) => (
                    <MenuItem key={index} value={stateObj.name}>
                      {stateObj.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Pin Code"
                variant="outlined"
                fullWidth
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="package-type-label">Package Type</InputLabel>
                <Select
                  labelId="package-type-label"
                  value={packageType}
                  onChange={(e) => setPackageType(e.target.value)}
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

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Minimum Wallet Balance"
                type="number"
                variant="outlined"
                fullWidth
                value={minimumWallet}
                onChange={(e) => setMinimumWallet(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  label="Status"
                >
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={submitting}
                sx={{ background: "teal" }}
              >
                Add Member
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* Error Display */}
        {error && (
          <Typography variant="body2" color="error" paragraph>
            {error}
          </Typography>
        )}

        {/* Success Dialog */}
        <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Member Added Successfully</DialogTitle>
          <DialogContent>
            <Typography>The new member has been successfully added!</Typography>
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

export default AddMembers;
