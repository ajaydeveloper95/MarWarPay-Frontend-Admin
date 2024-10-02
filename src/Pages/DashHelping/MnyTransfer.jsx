import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';
import { accessToken, domainBase } from '../../helpingFile'; // Ensure correct path and exported variables

// Define colors for the Pie Chart slices
const COLORS = ['#8884d8', '#82ca9d', '#FF8042'];

const MnyTransfer = () => {
  const [ticketData, setTicketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve the token from localStorage using the accessToken key
  const API_ENDPOINT = `${domainBase}apiAdmin/v1/support/allGenTicket`;
  const ACCESS_TOKEN = accessToken;

  useEffect(() => {
    // Function to fetch ticket data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(API_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });

        // Check if the response contains data
        if (response.data && Array.isArray(response.data.data)) {
          setTicketData(response.data.data);
        } else {
          // If data is not in expected format, set as empty array
          setTicketData([]);
        }
      } catch (err) {
        // Handle errors and set error state
        setError(err);
      } finally {
        // Set loading to false after request completes
        setLoading(false);
      }
    };

    // Only fetch data if token exists
    if (ACCESS_TOKEN) {
      fetchData();
    } else {
      setError(new Error('Authentication token not found. Please log in.'));
      setLoading(false);
    }
  },[]);

  // Prepare data for the Pie Chart by filtering ticket statuses
  const pieData = [
    {
      name: 'Pending',
      value: ticketData.filter((ticket) => ticket.isStatus === 'Pending')
        .length,
    },
    {
      name: 'Resolved',
      value: ticketData.filter((ticket) => ticket.isStatus === 'Resolved')
        .length,
    },
    {
      name: 'Rejected',
      value: ticketData.filter((ticket) => ticket.isStatus === 'Rejected')
        .length,
    },
  ];

  return (
    <Box className="box-container" sx={{ p: 3, borderRadius: 2, backgroundColor: "background.paper" }}>

      {/* Grid Layout for Pie Chart and Ticket Counts */}
      <Grid container spacing={3} sx={{ padding: 3 }}>
        {/* Pie Chart Section */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
              background:
                'linear-gradient(to right, #f9f9f9, #e0e0e0)', // Gradient background
              '&:hover': {
                transform: 'scale(1.02)', // Slightly enlarge on hover
                transition: 'transform 0.2s ease-in-out', // Smooth transition
              },
              minHeight: '400px', // Ensure consistent height
            }}
          >
            <Typography variant="h6" gutterBottom>
              Ticket Status Overview
            </Typography>

            {/* Conditional Rendering Based on Loading, Error, and Data States */}
            {loading ? (
              // Loading Indicator
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height={300}
              >
                <CircularProgress />
              </Box>
            ) : error ? (
              // Error Message
              <Typography color="error">Error: {error.message}</Typography>
            ) : ticketData.length === 0 ? (
              // No Data Message
              <Typography>No tickets found.</Typography>
            ) : (
              // Pie Chart Visualization
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    label
                    innerRadius={60}
                    outerRadius={120}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {/* Map each slice to a color */}
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid>

        {/* Ticket Counts Section */}
        <Grid item xs={12} md={6} container spacing={3}>
          {/* Pending Tickets */}
          <Grid item xs={12}>
            <Paper
              sx={{
                padding: 2,
                borderRadius: 2,
                boxShadow: 3,
                background:
                  'linear-gradient(to right, #f9f9f9, #e0e0e0)', // Gradient background
                '&:hover': {
                  transform: 'scale(1.02)', // Slightly enlarge on hover
                  transition: 'transform 0.2s ease-in-out', // Smooth transition
                },
                minHeight: '120px', // Ensure consistent height
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6">Total Pending Tickets</Typography>
              {loading ? (
                <CircularProgress size={24} />
              ) : error ? (
                <Typography color="error">Error</Typography>
              ) : (
                <Typography variant="h4">{pieData[0].value}</Typography>
              )}
            </Paper>
          </Grid>

          {/* Resolved Tickets */}
          <Grid item xs={12}>
            <Paper
              sx={{
                padding: 2,
                borderRadius: 2,
                boxShadow: 3,
                background:
                  'linear-gradient(to right, #f9f9f9, #e0e0e0)', // Gradient background
                '&:hover': {
                  transform: 'scale(1.02)', // Slightly enlarge on hover
                  transition: 'transform 0.2s ease-in-out', // Smooth transition
                },
                minHeight: '120px', // Ensure consistent height
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6">Total Resolved Tickets</Typography>
              {loading ? (
                <CircularProgress size={24} />
              ) : error ? (
                <Typography color="error">Error</Typography>
              ) : (
                <Typography variant="h4">{pieData[1].value}</Typography>
              )}
            </Paper>
          </Grid>

          {/* Rejected Tickets */}
          <Grid item xs={12}>
            <Paper
              sx={{
                padding: 2,
                borderRadius: 2,
                boxShadow: 3,
                background:
                  'linear-gradient(to right, #f9f9f9, #e0e0e0)', // Gradient background
                '&:hover': {
                  transform: 'scale(1.02)', // Slightly enlarge on hover
                  transition: 'transform 0.2s ease-in-out', // Smooth transition
                },
                minHeight: '120px', // Ensure consistent height
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6">Total Rejected Tickets</Typography>
              {loading ? (
                <CircularProgress size={24} />
              ) : error ? (
                <Typography color="error">Error</Typography>
              ) : (
                <Typography variant="h4">{pieData[2].value}</Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MnyTransfer;
