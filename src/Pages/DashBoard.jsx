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
        variant="h2"
        sx={{
          color: "teal",
          textAlign: "center",
          marginTop: "8%",
          marginLeft: isSidebarOpen ? "16rem" : "10rem",
          transition: "margin-left 0.3s ease",
          minWidth: "600px",
          maxWidth: "80%",
        }}
      >
        Dashboard
      </Typography>

      <Box
        sx={{ padding: 3, marginBottom: 2, marginTop: 5 }}
        style={{
          marginLeft: isSidebarOpen ? "16rem" : "10rem",
          transition: "margin-left 0.3s ease",
          minWidth: "600px",
          maxWidth: "80%",
        }}
      >
        {/* New Boxes */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: "background.paper",
                boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.3)",
                textAlign: "center",
                minHeight: "150px",
              }}
            >
              <Typography variant="h5" sx={{ color: "teal", mb: 2 }}>
                E-Wallet : ₹
              </Typography>
              <Typography variant="h4">4,963.00</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: "background.paper",
                boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.3)",
                textAlign: "center",
                minHeight: "150px",
              }}
            >
              <Typography variant="h5" sx={{ color: "teal", mb: 2 }}>
                Open Money Balance : ₹
              </Typography>
              <Typography variant="h4">103,567.81</Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} marginTop={5}>
          {/* Total Master Distributor */}
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                width: "200px",
                height: "200px",
                p: 2,
                borderRadius: 2,
                backgroundColor: "#E0F7FA", // Light cyan
                boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                mx: "auto",
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
                  width: "50px",
                  height: "50px",
                  mb: 2,
                }}
              >
                <SupervisorAccountIcon sx={{ fontSize: 20, color: "white" }} />
              </Box>
              <Typography variant="h6" sx={{ color: "#004D40" }}>
                Total Master Distributor
              </Typography>
              <Typography sx={{ color: "#004D40" }}>0</Typography>
            </Box>
          </Grid>

          {/* Total Distributor */}
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                width: "200px",
                height: "200px",
                p: 2,
                borderRadius: 2,
                backgroundColor: "#FFF9C4", // Light yellow
                boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                mx: "auto",
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
                  width: "50px",
                  height: "50px",
                  mb: 2,
                }}
              >
                <PersonIcon sx={{ fontSize: 20, color: "white" }} />
              </Box>
              <Typography variant="h6" sx={{ color: "#004D40" }}>
                Total Distributor
              </Typography>
              <Typography sx={{ color: "#004D40" }}>0</Typography>
            </Box>
          </Grid>

          {/* Total Retailer */}
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                width: "200px",
                height: "200px",
                p: 2,
                borderRadius: 2,
                backgroundColor: "#E1BEE7", // Light purple
                boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                mx: "auto",
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
                  width: "50px",
                  height: "50px",
                  mb: 2,
                }}
              >
                <GroupIcon sx={{ fontSize: 20, color: "white" }} />
              </Box>
              <Typography variant="h6" sx={{ color: "#004D40" }}>
                Total Retailer
              </Typography>
              <Typography sx={{ color: "#004D40" }}>2</Typography>
            </Box>
          </Grid>

          {/* Total API Member */}
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                width: "200px",
                height: "200px",
                p: 2,
                borderRadius: 2,
                backgroundColor: "#CFD8DC", // Light gray
                boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                mx: "auto",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#00796B", 
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  mb: 2,
                }}
              >
                <ApiIcon sx={{ fontSize: 20, color: "white" }} />
              </Box>
              <Typography variant="h6" sx={{ color: "#004D40" }}>
                Total API Member
              </Typography>
              <Typography sx={{ color: "#004D40" }}>36</Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Wallet Balance Summary Section */}
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
            Wallet Balance Summary
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight="bold">Member Type</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold">R-Wallet Balance</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold">E-Wallet Balance</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Primary Wallet</TableCell>
                  <TableCell align="center">₹ 10,000.00</TableCell>
                  <TableCell align="center">₹ 5,000.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Secondary Wallet</TableCell>
                  <TableCell align="center">₹ 3,000.00</TableCell>
                  <TableCell align="center">₹ 2,000.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell align="center">
                    ₹{" "}
                    {(10000 + 3000).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell align="center">
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
            Today Fund Transfer and AEPS Wallet Summary
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight="bold">Member Type</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography fontWeight="bold">Wallet Balance</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>AEPS Wallet</TableCell>
                  <TableCell align="right">₹ 10,000.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fund Transfer</TableCell>
                  <TableCell align="right">₹ 3,000.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Today Distribute Commission Summary Section */}
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
            Today Distribute Commission Summary
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight="bold">Member Type</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography fontWeight="bold">Total Commission</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Primary Wallet</TableCell>
                  <TableCell align="right">₹ 10,000.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Secondary Wallet</TableCell>
                  <TableCell align="right">₹ 3,000.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell align="right">
                    ₹{" "}
                    {(10000 + 3000).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                </TableRow>
                {/* Add more rows as needed */}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Today Distribute Commission Summary Section */}
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
            API Summary
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight="bold">API ID</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">API Name</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold">Current Balance</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold">Success Recharge</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold">Failed Recharge</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Recharge API 1</TableCell>
                  <TableCell align="center">₹ 15,000.00</TableCell>
                  <TableCell align="center">200</TableCell>
                  <TableCell align="center">5</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2</TableCell>
                  <TableCell>Recharge API 2</TableCell>
                  <TableCell align="center">₹ 8,000.00</TableCell>
                  <TableCell align="center">150</TableCell>
                  <TableCell align="center">10</TableCell>
                </TableRow>
                <TableRow>
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
