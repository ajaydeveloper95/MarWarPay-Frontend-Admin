import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Link,
  Paper,
  IconButton,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { domainBase } from "../../helpingFile";

const API_ENDPOINT = `${domainBase}apiAdmin/v1/user/login`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
  
    axios
      .post(API_ENDPOINT, {
        username,
        password,
      })
      .then((response) => {
        // Extract tokens from response data
        const { accessToken, refreshToken } = response.data.data;
  
        if (accessToken && refreshToken) {
          // Save tokens or user data if needed
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
  
          if (rememberMe) {
            // Save the expiration time for 24 hours
            const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
            localStorage.setItem("expirationTime", expirationTime);
          } else {
            // Save a shorter expiration time if "Remember me" is not checked
            const expirationTime = new Date().getTime() + 60 * 60 * 1000;
            localStorage.setItem("expirationTime", expirationTime);
          }
  
          // Show success message
          setSnackbarMessage("Login successful!");
          setOpenSnackbar(true);
  
          // Redirect to homepage/dashboard after a short delay
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        } else {
          throw new Error("Access token or refresh token is missing in response.");
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        setSnackbarMessage("Login failed. Please try again.");
        setOpenSnackbar(true);
      });
  };
  

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        // backgroundImage: "url('logo.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container
        component="main"
        sx={{
          display: "flex",
          alignItems: "center",
          width: '30%',
          height: '40%',
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              position: 'relative',
            }}
          >
            <img
              src="logo.png"
              alt="Logo"
              style={{
                width: 70,
                height: 70,
                border: "4px solid #1976d2",
                borderRadius: "50%",
                position: 'absolute',
                top: '-70px'
              }}
            />
          </Box>
          <Typography component="h1" variant="h4" gutterBottom>
            Log In
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
              label="Remember me"
              sx={{
                "& .MuiFormControlLabel-label": {
                  color: "#1976d2",
                  "&:hover": {
                    color: "black",
                  },
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  href="#"
                  variant="body2"
                  sx={{
                    color: "#1976d2",
                    textDecoration: "none",
                    "&:hover": {
                      color: "black",
                    },
                  }}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  sx={{
                    color: "#1976d2",
                    textDecoration: "none",
                    "&:hover": {
                      color: "black",
                    },
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>

      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          right: 20,
          display: "flex",
          gap: 1,
        }}
      >
        <IconButton href="https://www.facebook.com" sx={{ color: "white", fontSize: 50 }}>
          <FacebookIcon sx={{ fontSize: "inherit" }} />
        </IconButton>
        <IconButton href="https://www.instagram.com" sx={{ color: "white", fontSize: 50 }}>
          <InstagramIcon sx={{ fontSize: "inherit" }} />
        </IconButton>
        <IconButton href="https://www.twitter.com" sx={{ color: "white", fontSize: 50 }}>
          <TwitterIcon sx={{ fontSize: "inherit" }} />
        </IconButton>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes("failed") ? "error" : "success"}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
