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
import { accessToken } from '../../helpingFile';
import { apiGet } from '../../utils/http';

const COLORS = ['#8884d8', '#82ca9d', '#FF8042'];

const MnyTransfer = () => {
  const [ticketData, setTicketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_ENDPOINT = `apiAdmin/v1/support/allGenTicket`;
  const ACCESS_TOKEN = accessToken;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiGet(API_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });

        if (response.data && Array.isArray(response.data.data)) {
          setTicketData(response.data.data);
        } else {
          setTicketData([]);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (ACCESS_TOKEN) {
      fetchData();
    } else {
      setError(new Error('Authentication token not found. Please log in.'));
      setLoading(false);
    }
  }, []);

  // Ensure pieData always includes all entities with default value 0
  const pieData = [
    {
      name: 'Pending',
      value: ticketData.filter((ticket) => ticket.isStatus === 'Pending')
        .length || 0,
    },
    {
      name: 'Resolved',
      value: ticketData.filter((ticket) => ticket.isStatus === 'Resolved')
        .length || 0,
    },
    {
      name: 'Rejected',
      value: ticketData.filter((ticket) => ticket.isStatus === 'Rejected')
        .length || 0,
    },
  ];

  return (
    <Box
      className="box-container"
      sx={{ p: 3, borderRadius: 2, backgroundColor: 'background.paper' }}
    >
      <Grid container spacing={3} sx={{ padding: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
              background:
                'linear-gradient(to right, #f9f9f9, #e0e0e0)',
              '&:hover': {
                transform: 'scale(1.02)',
                transition: 'transform 0.2s ease-in-out',
              },
              minHeight: '400px',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Ticket Status Overview
            </Typography>
            {loading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height={300}
              >
                <CircularProgress />
              </Box>
            ) : error ? (
              <Typography color="error">Error: {error.message}</Typography>
            ) : (
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

        <Grid item xs={12} md={6} container spacing={3}>
          {['Pending', 'Resolved', 'Rejected'].map((status, index) => (
            <Grid item xs={12} key={status}>
              <Paper
                sx={{
                  padding: 2,
                  borderRadius: 2,
                  boxShadow: 3,
                  background:
                    'linear-gradient(to right, #f9f9f9, #e0e0e0)',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    transition: 'transform 0.2s ease-in-out',
                  },
                  minHeight: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6">Total {status} Tickets</Typography>
                {loading ? (
                  <CircularProgress size={24} />
                ) : error ? (
                  <Typography color="error">Error</Typography>
                ) : (
                  <Typography variant="h4">{pieData[index].value}</Typography>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default MnyTransfer;
