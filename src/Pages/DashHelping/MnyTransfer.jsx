import { Box, Grid, Typography } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from 'react-chartjs-2';
// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function MnyTransfer() {
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

  return (
    <Box
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 2,
        background: "linear-gradient(135deg, #E0F7FA, #B2EBF2)", // Gradient background
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Typography variant="h5" sx={{ color: "#004D40", mb: 2 }}>
        Money Transfer History
      </Typography>
      <Grid container spacing={2}>
        {/* Total Success Pie Chart */}
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
                      data: [100, 0, 0, 0], // Update data as needed
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
                ₹ 0.00 / 0 {/* Update this value as needed */}
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
        
        {/* Repeat similar structure for other categories */}
        
        {/* Total Pending Pie Chart */}
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
                      data: [0, 100, 0, 0], // Update data as needed
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
                ₹ 0.00 / 0 {/* Update this value as needed */}
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
        
        {/* Add Total Failed and Total Dispute charts similarly */}
        {/* Total Failed Pie Chart */}
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
                      data: [0, 0, 100, 0], // Update data as needed
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
                ₹ 0.00 / 0 {/* Update this value as needed */}
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

        {/* Total Dispute Pie Chart */}
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
                      data: [0, 0, 0, 100], // Update data as needed
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
                ₹ 0.00 / 0 {/* Update this value as needed */}
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
  );
}

export default MnyTransfer;
