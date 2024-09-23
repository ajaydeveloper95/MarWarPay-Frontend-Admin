import { useEffect, useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import ApiIcon from '@mui/icons-material/Api';
import axios from 'axios';
import { domainBase, accessToken } from '../../helpingFile';

const API_GET_USERS_ENDPOINT = `${domainBase}apiAdmin/v1/utility/getUserList`;
const API_GET_PACKAGES_ENDPOINT = `${domainBase}apiAdmin/v1/utility/getPackageList`;
const API_GET_PENDING_TICKETS_ENDPOINT = `${domainBase}apiAdmin/v1/utility/getPendingTicketList`;
const API_GET_ALL_MEMBERS_ENDPOINT = `${domainBase}/apiAdmin/v1/utility/getAllMemberList`;
const ACCESS_TOKEN = accessToken;

function DashUtilities() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPackages, setTotalPackages] = useState(0);
  const [pendingTickets, setPendingTickets] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);

  useEffect(() => {
    // Fetch total users from API
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get(API_GET_USERS_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
        if (response.status === 200) {
          setTotalUsers(response.data.data.length);
        }
      } catch (error) {
        console.error('Error fetching total users:', error);
      }
    };

    const fetchTotalMembers = async () => {
      try {
        const response = await axios.get(API_GET_ALL_MEMBERS_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
        if (response.status === 200) {
          setTotalMembers(response.data.data.length);
        }
      } catch (error) {
        console.error('Error fetching total members:', error);
      }
    };

    // Fetch total packages from API
    const fetchTotalPackages = async () => {
      try {
        const response = await axios.get(API_GET_PACKAGES_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
        if (response.status === 200) {
          setTotalPackages(response.data.data.length);
        }
      } catch (error) {
        console.error('Error fetching total packages:', error);
      }
    };

    // Fetch pending tickets from API
    const fetchPendingTickets = async () => {
      try {
        const response = await axios.get(API_GET_PENDING_TICKETS_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
        if (response.status === 200) {
          // Set pendingTickets to the length of the data array
          setPendingTickets(response.data.data.length);
        }
      } catch (error) {
        console.error('Error fetching pending tickets:', error);
      }
    };

    fetchTotalUsers();
    fetchTotalPackages();
    fetchPendingTickets();
    fetchTotalMembers();
  }, []);

  const boxStyles = {
    width: '220px',
    height: '200px',
    p: 2,
    borderRadius: 2,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    // mx: 'auto',
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '300%',
      height: '300%',
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
      transition: 'opacity 0.3s ease',
      opacity: 0,
    },
    '&:hover:before': {
      opacity: 1,
    },
  };

  const iconContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00796B',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    // mb: 2,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      backgroundColor: '#004D40',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.5)',
    },
  };

  const dataItems = [
    {
      label: 'Total Members',
      count: totalMembers, // Assuming you will update this value later
      icon: <SupervisorAccountIcon sx={{ fontSize: 24, color: 'white' }} />,
      background: 'linear-gradient(135deg, #E0F7FA, #80DEEA)',
    },
    {
      label: 'Total Users',
      count: totalUsers,
      icon: <PersonIcon sx={{ fontSize: 24, color: 'white' }} />,
      background: 'linear-gradient(135deg, #FFF9C4, #FBC02D)',
    },
    {
      label: 'Pending Tickets',
      count: pendingTickets,
      icon: <GroupIcon sx={{ fontSize: 24, color: 'white' }} />,
      background: 'linear-gradient(135deg, #E1BEE7, #CE93D8)',
    },
    {
      label: 'Total Packages',
      count: totalPackages,
      icon: <ApiIcon sx={{ fontSize: 24, color: 'white' }} />,
      background: 'linear-gradient(135deg, #CFD8DC, #B0BEC5)',
    },
  ];

  return (
    <Grid container spacing={6} marginTop={3}>
      {dataItems.map((item, index) => (
        <Grid item xs={12} md={3} key={index}>
          <Box
            sx={{
              ...boxStyles,
              background: item.background, // Set gradient background from item
            }}
          >
            <Box sx={iconContainerStyles}>{item.icon}</Box>
            <Typography variant="h6" sx={{ color: '#004D40', fontWeight: 'bold', mb: 1 }}>
              {item.label}
            </Typography>
            <Typography sx={{ color: '#004D40', fontSize: '1.5rem', fontWeight: 'bold' }}>
              {item.count}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default DashUtilities;
