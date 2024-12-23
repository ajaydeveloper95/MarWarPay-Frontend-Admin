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
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../../utils/http";

const API_ENDPOINT = `apiAdmin/v1/user/login`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    apiPost(API_ENDPOINT, {
      username,
      password,
    })
      .then((response) => {
        const { accessToken, refreshToken } = response.data.data;

        if (accessToken && refreshToken) {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          if (rememberMe) {
            const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
            localStorage.setItem("expirationTime", expirationTime);
          } else {
            const expirationTime = new Date().getTime() + 60 * 60 * 1000;
            localStorage.setItem("expirationTime", expirationTime);
          }

          setSnackbarMessage("Login successful!");
          setOpenSnackbar(true);

          setTimeout(() => {
            navigate("/dashboard");
            window.location.reload();
          }, 2000);
        } else {
          throw new Error(
            "Access token or refresh token is missing in response."
          );
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
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          flex: 1,
          backgroundImage: "url('https://img.freepik.com/premium-vector/woman-is-working-desktop-with-laptop-freelance-online-education-web-surfing-office-worker-vector-illustration-cartoon-style_562639-650.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginLeft: "2rem"
        }}
      >
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container
          component="main"
          sx={{
            width: "70%", // Adjust form width within the 50% section
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                position: "relative",
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
                  position: "absolute",
                  top: "-70px",
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
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                }
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
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarMessage.includes("failed") ? "error" : "success"}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
