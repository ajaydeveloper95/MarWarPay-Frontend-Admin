import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import GroupIcon from "@mui/icons-material/Group";
import ApiIcon from "@mui/icons-material/Api";
import { useSidebar } from "../Context/SidebarContext";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./Dashboard.css";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// const pieChartData = {
//   labels: ["Total Balance", "Total Downline Balance"],
//   datasets: [
//     {
//       data: [75, 25],
//       backgroundColor: ["#FF6384", "#36A2EB"],
//       borderColor: ["#fff", "#fff"],
//       borderWidth: 1,
//     },
//   ],
// };

const rechargeChartData = {
  labels: ["Success", "Pending", "Failed", "Dispute"],
  datasets: [
    {
      data: [0, 0, 0, 0],
      backgroundColor: ["#4CAF50", "#FF9800", "#F44336", "#9E9E9E"],
      borderColor: ["#fff", "#fff", "#fff", "#fff"],
      borderWidth: 1,
    },
  ],
};

const chartLegend = [
  { label: "Success", color: "#4CAF50" },
  { label: "Pending", color: "#FF9800" },
  { label: "Failed", color: "#F44336" },
  { label: "Dispute", color: "#9E9E9E" },
];

function DashBoard() {
  const { isSidebarOpen } = useSidebar();

  return (
    <>
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          marginTop: "8%",
          marginLeft: isSidebarOpen ? "16rem" : "8rem",
          minWidth: "600px",
          maxWidth: "80%",
          fontWeight: "700",
          // fontSize: "4rem",
          textTransform: "uppercase",
          letterSpacing: "4px", // Increased spacing for a modern look
          textShadow:
            "0 4px 6px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.3)",
          color: "teal",
          transform: "translateY(0)",
          animation: "fadeInSlide 1s ease-out",
          "&:hover": {
            // color: "#FF80AB",
            transform: "translateY(-3px) scale(1.03)",
          },
        }}
      >
        Dashboard
      </Typography>

      <Box
        sx={{ padding: 3, marginBottom: 2, marginTop: 5 }}
        style={{
          marginLeft: isSidebarOpen ? "16rem" : "1rem",
          transition: "margin-left 0.3s ease",
          minWidth: "600px",
          maxWidth: "100%",
        }}
      >
        {/* New Boxes */}
        <Grid container spacing={3}>
          {/* E-Wallet Balance */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                p: 4,
                borderRadius: 2,
                background: "linear-gradient(135deg, #ff6b6b, #f7c6c7)", // Gradient background
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                textAlign: "center",
                minHeight: "180px",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.4s, box-shadow 0.4s",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.25)",
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "60px",
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))",
                  borderTopLeftRadius: 2,
                  borderTopRightRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  transform: "translateY(100%)",
                  transition: "transform 0.4s",
                  "&:hover": {
                    transform: "translateY(0)",
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  View Details
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" sx={{ color: "white", mb: 1 }}>
                  E-Wallet Balance
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  ₹ 4,963.00
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* UPI-Wallet Balance */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                p: 4,
                borderRadius: 2,
                background: "linear-gradient(135deg, #36d1dc, #5b86e5)", // Gradient background
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                textAlign: "center",
                minHeight: "180px",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.4s, box-shadow 0.4s",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.25)",
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "60px",
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))",
                  borderTopLeftRadius: 2,
                  borderTopRightRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  transform: "translateY(100%)",
                  transition: "transform 0.4s",
                  "&:hover": {
                    transform: "translateY(0)",
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  View Details
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" sx={{ color: "white", mb: 1 }}>
                  UPI-Wallet Balance
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  ₹ 4,963.00
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Box
              sx={{
                p: 4,
                borderRadius: 2,
                background: "linear-gradient(135deg, #ff9a8b, #ff6a00)", // Gradient background
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                textAlign: "center",
                minHeight: "180px",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.4s, box-shadow 0.4s",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.25)",
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "60px",
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))",
                  borderTopLeftRadius: 2,
                  borderTopRightRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  transform: "translateY(100%)",
                  transition: "transform 0.4s",
                  "&:hover": {
                    transform: "translateY(0)",
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  View Details
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" sx={{ color: "white", mb: 1 }}>
                  Open Money Balance
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  ₹ 103,567.81
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Boxes */}

        <Grid container spacing={1} marginTop={5}>
          {/* Total Master Distributor */}
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                width: "240px",
                height: "200px",
                p: 2,
                borderRadius: 2,
                background: "linear-gradient(135deg, #E0F7FA, #80DEEA)", // Gradient background
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                mx: "auto",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)", // Larger scale effect on hover
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                },
                "&:before": {
                  content: '""',
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "300%",
                  height: "300%",
                  background: "rgba(255, 255, 255, 0.2)", // Light overlay for effect
                  borderRadius: "50%",
                  transform: "translate(-50%, -50%)",
                  transition: "opacity 0.3s ease",
                  opacity: 0,
                },
                "&:hover:before": {
                  opacity: 1, // Show overlay on hover
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#00796B", // Dark teal
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  mb: 2,
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
                  transition:
                    "background-color 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#004D40", // Darker teal on hover
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.5)",
                  },
                }}
              >
                <SupervisorAccountIcon sx={{ fontSize: 24, color: "white" }} />
              </Box>
              <Typography
                variant="h6"
                sx={{ color: "#004D40", fontWeight: "bold", mb: 1 }}
              >
                Total Members
              </Typography>
              <Typography
                sx={{
                  color: "#004D40",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                0
              </Typography>
            </Box>
          </Grid>

          {/* Total Distributor */}
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                width: "240px",
                height: "200px",
                p: 2,
                borderRadius: 2,
                background: "linear-gradient(135deg, #FFF9C4, #FBC02D)", // Gradient background
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                mx: "auto",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)", // Larger scale effect on hover
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                },
                "&:before": {
                  content: '""',
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "300%",
                  height: "300%",
                  background: "rgba(255, 255, 255, 0.2)", // Light overlay for effect
                  borderRadius: "50%",
                  transform: "translate(-50%, -50%)",
                  transition: "opacity 0.3s ease",
                  opacity: 0,
                },
                "&:hover:before": {
                  opacity: 1, // Show overlay on hover
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#00796B", // Dark teal
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  mb: 2,
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
                  transition:
                    "background-color 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#004D40", // Darker teal on hover
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.5)",
                  },
                }}
              >
                <PersonIcon sx={{ fontSize: 24, color: "white" }} />
              </Box>
              <Typography
                variant="h6"
                sx={{ color: "#004D40", fontWeight: "bold", mb: 1 }}
              >
                Total Users
              </Typography>
              <Typography
                sx={{
                  color: "#004D40",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                0
              </Typography>
            </Box>
          </Grid>

          {/* Total Retailer */}
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                width: "240px",
                height: "200px",
                p: 2,
                borderRadius: 2,
                background: "linear-gradient(135deg, #E1BEE7, #CE93D8)", // Gradient background
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                mx: "auto",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)", // Larger scale effect on hover
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                },
                "&:before": {
                  content: '""',
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "300%",
                  height: "300%",
                  background: "rgba(255, 255, 255, 0.2)", // Light overlay for effect
                  borderRadius: "50%",
                  transform: "translate(-50%, -50%)",
                  transition: "opacity 0.3s ease",
                  opacity: 0,
                },
                "&:hover:before": {
                  opacity: 1, // Show overlay on hover
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#00796B", // Dark teal
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  mb: 2,
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
                  transition:
                    "background-color 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#004D40", // Darker teal on hover
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.5)",
                  },
                }}
              >
                <GroupIcon sx={{ fontSize: 24, color: "white" }} />
              </Box>
              <Typography
                variant="h6"
                sx={{ color: "#004D40", fontWeight: "bold", mb: 1 }}
              >
                Total Tickets
              </Typography>
              <Typography
                sx={{
                  color: "#004D40",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                2
              </Typography>
            </Box>
          </Grid>

          {/* Total API Member */}
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                width: "240px",
                height: "200px",
                p: 2,
                borderRadius: 2,
                background: "linear-gradient(135deg, #CFD8DC, #B0BEC5)", // Gradient background
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                mx: "auto",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)", // Larger scale effect on hover
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                },
                "&:before": {
                  content: '""',
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "300%",
                  height: "300%",
                  background: "rgba(255, 255, 255, 0.2)", // Light overlay for effect
                  borderRadius: "50%",
                  transform: "translate(-50%, -50%)",
                  transition: "opacity 0.3s ease",
                  opacity: 0,
                },
                "&:hover:before": {
                  opacity: 1, // Show overlay on hover
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#00796B", // Dark teal
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  mb: 2,
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
                  transition:
                    "background-color 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#004D40", // Darker teal on hover
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.5)",
                  },
                }}
              >
                <ApiIcon sx={{ fontSize: 24, color: "white" }} />
              </Box>
              <Typography
                variant="h6"
                sx={{ color: "#004D40", fontWeight: "bold", mb: 1 }}
              >
                Total Package
              </Typography>
              <Typography
                sx={{
                  color: "#004D40",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                36
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Wallet Balance Summary Section */}
        <Box
          sx={{
            mt: 4,
            p: 3,
            borderRadius: 2,
            background: "linear-gradient(135deg, #E0F7FA, #B2EBF2)", // Gradient background
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            position: "relative",
            overflow: "hidden",
            "&:before": {
              content: '""',
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              background: "rgba(255, 255, 255, 0.2)", // Light overlay effect
              transition: "opacity 0.3s ease",
              opacity: 0,
              zIndex: 1,
            },
            "&:hover:before": {
              opacity: 1, // Show overlay on hover
            },
          }}
        >
          <Typography variant="h5" sx={{ color: "#004D40", mb: 2, zIndex: 2 }}>
            Wallet Balance Summary
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              position: "relative",
              zIndex: 2,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight="bold" sx={{ color: "#004D40" }}>
                      Member Type
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold" sx={{ color: "#004D40" }}>
                      UPI-Wallet Balance
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold" sx={{ color: "#004D40" }}>
                      E-Wallet Balance
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{
                    transition: "background-color 0.3s ease",
                    "&:hover": { backgroundColor: "#E0F2F1" },
                  }}
                >
                  <TableCell>Primary Wallet</TableCell>
                  <TableCell align="center">₹ 10,000.00</TableCell>
                  <TableCell align="center">₹ 5,000.00</TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    transition: "background-color 0.3s ease",
                    "&:hover": { backgroundColor: "#E0F2F1" },
                  }}
                >
                  <TableCell>Secondary Wallet</TableCell>
                  <TableCell align="center">₹ 3,000.00</TableCell>
                  <TableCell align="center">₹ 2,000.00</TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    backgroundColor: "#004D40",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  <TableCell sx={{color: 'white'}}>Total</TableCell>
                  <TableCell align="center"  sx={{color: 'white'}}>
                    ₹{" "}
                    {(10000 + 3000).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell align="center" sx={{color: 'white'}}>
                    ₹{" "}
                    {(5000 + 2000).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                </TableRow>
                {/* Add more rows as needed */}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Money Transfer History Section */}
        <Box
          sx={{
            mt: 4,
            p: 3,
            borderRadius: 2,
            backgroundColor: "background.paper",
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Typography variant="h5" sx={{ color: "teal", mb: 2 }}>
            Money Transfer History
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "background.paper",
                  boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "300px",
                  minHeight: "300px",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Total Success
                </Typography>
                <Box sx={{ width: "100%", height: "70%" }}>
                  <Pie
                    data={{
                      ...rechargeChartData,
                      datasets: [
                        {
                          ...rechargeChartData.datasets[0],
                          data: [100, 0, 0, 0],
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                    }}
                  />
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    ₹ 0.00 / 0
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    {chartLegend.map((item) => (
                      <Box
                        key={item.label}
                        sx={{ display: "flex", alignItems: "center", mr: 4 }}
                      >
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            backgroundColor: item.color,
                            borderRadius: "50%",
                            mr: 1,
                          }}
                        />
                        <Typography>{item.label}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "background.paper",
                  boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "300px",
                  minHeight: "300px",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Total Pending
                </Typography>
                <Box sx={{ width: "100%", height: "70%" }}>
                  <Pie
                    data={{
                      ...rechargeChartData,
                      datasets: [
                        {
                          ...rechargeChartData.datasets[0],
                          data: [0, 100, 0, 0],
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                    }}
                  />
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    ₹ 0.00 / 0
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    {chartLegend.map((item) => (
                      <Box
                        key={item.label}
                        sx={{ display: "flex", alignItems: "center", mr: 4 }}
                      >
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            backgroundColor: item.color,
                            borderRadius: "50%",
                            mr: 1,
                          }}
                        />
                        <Typography>{item.label}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "background.paper",
                  boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "300px",
                  minHeight: "300px",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Total Failed
                </Typography>
                <Box sx={{ width: "100%", height: "70%" }}>
                  <Pie
                    data={{
                      ...rechargeChartData,
                      datasets: [
                        {
                          ...rechargeChartData.datasets[0],
                          data: [0, 0, 100, 0],
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                    }}
                  />
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    ₹ 0.00 / 0
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    {chartLegend.map((item) => (
                      <Box
                        key={item.label}
                        sx={{ display: "flex", alignItems: "center", mr: 4 }}
                      >
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            backgroundColor: item.color,
                            borderRadius: "50%",
                            mr: 1,
                          }}
                        />
                        <Typography>{item.label}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "background.paper",
                  boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "300px",
                  minHeight: "300px",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Total Dispute
                </Typography>
                <Box sx={{ width: "100%", height: "70%" }}>
                  <Pie
                    data={{
                      ...rechargeChartData,
                      datasets: [
                        {
                          ...rechargeChartData.datasets[0],
                          data: [0, 0, 0, 100],
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                    }}
                  />
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    ₹ 0.00 / 0
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    {chartLegend.map((item) => (
                      <Box
                        key={item.label}
                        sx={{ display: "flex", alignItems: "center", mr: 4 }}
                      >
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            backgroundColor: item.color,
                            borderRadius: "50%",
                            mr: 1,
                          }}
                        />
                        <Typography>{item.label}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Today Fund Transfer and AEPS Wallet Summary Section */}
        <Box className="box-container">
          <Typography variant="h5" className="typography-header">
            Today Fund Transfer and AEPS Wallet Summary
          </Typography>
          <TableContainer component={Paper} className="table-container">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="table-head-cell">
                    <Typography>Member Type</Typography>
                  </TableCell>
                  <TableCell align="right" className="table-head-cell">
                    <Typography>Wallet Balance</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow className="table-row-hover">
                  <TableCell>AEPS Wallet</TableCell>
                  <TableCell align="right">₹ 10,000.00</TableCell>
                </TableRow>
                <TableRow className="table-row-hover">
                  <TableCell>Fund Transfer</TableCell>
                  <TableCell align="right">₹ 3,000.00</TableCell>
                </TableRow>
                <TableRow className="total-row">
                  <TableCell sx={{color: 'white'}}>Total</TableCell>
                  <TableCell align="right" sx={{color: 'white'}}>
                    ₹{" "}
                    {(10000 + 3000).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Today Distribute Commission Summary Section */}
        <Box className="box-container">
          <Typography variant="h5" className="typography-header">
            Today Distribute Commission Summary
          </Typography>
          <TableContainer component={Paper} className="table-container">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="table-head-cell">
                    <Typography>Member Type</Typography>
                  </TableCell>
                  <TableCell align="right" className="table-head-cell">
                    <Typography>Total Commission</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow className="table-row-hover">
                  <TableCell>Primary Wallet</TableCell>
                  <TableCell align="right">₹ 10,000.00</TableCell>
                </TableRow>
                <TableRow className="table-row-hover">
                  <TableCell>Secondary Wallet</TableCell>
                  <TableCell align="right">₹ 3,000.00</TableCell>
                </TableRow>
                <TableRow className="total-row">
                  <TableCell sx={{color: 'white'}}>Total</TableCell>
                  <TableCell align="right" sx={{color: 'white'}}>
                    ₹{" "}
                    {(10000 + 3000).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box className="box-container">
          <Typography variant="h5" className="typography-header">
            API Summary
          </Typography>
          <TableContainer component={Paper} className="table-container">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="table-head-cell">
                    <Typography>API ID</Typography>
                  </TableCell>
                  <TableCell className="table-head-cell">
                    <Typography>API Name</Typography>
                  </TableCell>
                  <TableCell align="center" className="table-head-cell">
                    <Typography>Current Balance</Typography>
                  </TableCell>
                  <TableCell align="center" className="table-head-cell">
                    <Typography>Success Recharge</Typography>
                  </TableCell>
                  <TableCell align="center" className="table-head-cell">
                    <Typography>Failed Recharge</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow className="table-row-hover">
                  <TableCell>1</TableCell>
                  <TableCell>Recharge API 1</TableCell>
                  <TableCell align="center">₹ 15,000.00</TableCell>
                  <TableCell align="center">200</TableCell>
                  <TableCell align="center">5</TableCell>
                </TableRow>
                <TableRow className="table-row-hover">
                  <TableCell>2</TableCell>
                  <TableCell>Recharge API 2</TableCell>
                  <TableCell align="center">₹ 8,000.00</TableCell>
                  <TableCell align="center">150</TableCell>
                  <TableCell align="center">10</TableCell>
                </TableRow>
                <TableRow className="table-row-hover">
                  <TableCell>3</TableCell>
                  <TableCell>Recharge API 3</TableCell>
                  <TableCell align="center">₹ 12,500.00</TableCell>
                  <TableCell align="center">180</TableCell>
                  <TableCell align="center">8</TableCell>
                </TableRow>
                {/* Add more rows as needed */}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}

export default DashBoard;
