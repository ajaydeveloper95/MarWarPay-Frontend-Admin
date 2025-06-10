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
import { apiGet, apiPost } from "../../../utils/http";
import { Country, State } from "country-state-city";

const API_ENDPOINT = `apiAdmin/v1/user/addUser`;
const PACKAGE_API_ENDPOINT = `apiAdmin/v1/utility/getPackageList`;

const AddMembers = () => {
  const [memberType, setMemberType] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [packageType, setPackageType] = useState("");
  const [minimumWallet, setMinimumWallet] = useState("");
  const [EwalletFundLock, setEwalletFundLock] = useState("");
  const [status, setStatus] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
        const response = await apiGet(PACKAGE_API_ENDPOINT);
        if (response.status === 200) {
          setPackages(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching package data:", err);
        setError("Failed to load packages");
      }
    };

    // Load countries from library
    setCountries(Country.getAllCountries());
    fetchPackages();
  }, []);

  useEffect(() => {
    if (country) {
      const selectedCountry = Country.getAllCountries().find(
        (c) => c.name === country
      );
      if (selectedCountry) {
        const countryStates = State.getStatesOfCountry(selectedCountry.isoCode);
        setStates(countryStates);
      }
    } else {
      setStates([]);
    }
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
      !EwalletFundLock ||
      status === null
    ) {
      setError("Please fill out all required fields.");
      setSubmitting(false);
      return;
    }

    try {
      await apiPost(API_ENDPOINT, {
        memberType,
        fullName,
        email,
        mobileNumber: phone,
        addresh: {
          country,
          state,
          city,
          addresh: address,
          pincode,
        },
        package: packageType,
        EwalletFundLock,
        minWalletBalance: minimumWallet,
        isActive: status,
      });

      setIsDialogOpen(true);
      setMemberType("");
      setFullName("");
      setEmail("");
      setPhone("");
      setCountry("");
      setState("");
      setCity("");
      setAddress("");
      setPincode("");
      setPackageType("");
      setMinimumWallet("");
      setEwalletFundLock("");
      setStatus(null);
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
        <Typography variant="h4" gutterBottom sx={{ color: "teal" }}>
          Add New Member
        </Typography>

        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth required>
                <InputLabel>Member Type</InputLabel>
                <Select
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
                fullWidth
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Phone"
                fullWidth
                required
                inputProps={{ maxLength: 10 }}
                value={phone}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "");
                  if (/^\d{0,10}$/.test(digits)) setPhone(digits);
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth required>
                <InputLabel>Country</InputLabel>
                <Select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  label="Country"
                >
                  {countries.map((c) => (
                    <MenuItem key={c.isoCode} value={c.name}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth required>
                <InputLabel>State</InputLabel>
                <Select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  label="State"
                  disabled={!country}
                >
                  {states.map((s) => (
                    <MenuItem key={s.isoCode} value={s.name}>
                      {s.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="City"
                fullWidth
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Address"
                fullWidth
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Pin Code"
                fullWidth
                required
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth required>
                <InputLabel>Package Type</InputLabel>
                <Select
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
                fullWidth
                required
                value={minimumWallet}
                onChange={(e) => setMinimumWallet(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Fund Lock"
                type="number"
                fullWidth
                required
                value={EwalletFundLock}
                onChange={(e) => setEwalletFundLock(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth required>
                <InputLabel>Status</InputLabel>
                <Select
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

        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

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
