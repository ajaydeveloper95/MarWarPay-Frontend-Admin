import { Grid, Box, Typography } from '@mui/material';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import ApiIcon from '@mui/icons-material/Api';

function DashUtilitys() {
  const boxStyles = {
    width: "240px",
    height: "200px",
    p: 2,
    borderRadius: 2,
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
      transform: "scale(1.1)",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
    },
    "&:before": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "300%",
      height: "300%",
      background: "rgba(255, 255, 255, 0.2)",
      borderRadius: "50%",
      transform: "translate(-50%, -50%)",
      transition: "opacity 0.3s ease",
      opacity: 0,
    },
    "&:hover:before": {
      opacity: 1,
    },
  };

  const iconContainerStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00796B",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    mb: 2,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      backgroundColor: "#004D40",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.5)",
    },
  };

  const dataItems = [
    {
      label: "Total Members",
      count: 0,
      icon: <SupervisorAccountIcon sx={{ fontSize: 24, color: "white" }} />,
      background: "linear-gradient(135deg, #E0F7FA, #80DEEA)",
    },
    {
      label: "Total Users",
      count: 0,
      icon: <PersonIcon sx={{ fontSize: 24, color: "white" }} />,
      background: "linear-gradient(135deg, #FFF9C4, #FBC02D)",
    },
    {
      label: "Total Tickets",
      count: 2,
      icon: <GroupIcon sx={{ fontSize: 24, color: "white" }} />,
      background: "linear-gradient(135deg, #E1BEE7, #CE93D8)",
    },
    {
      label: "Total Package",
      count: 36,
      icon: <ApiIcon sx={{ fontSize: 24, color: "white" }} />,
      background: "linear-gradient(135deg, #CFD8DC, #B0BEC5)",
    },
  ];

  return (
    <Grid container spacing={1} marginTop={5}>
      {dataItems.map((item, index) => (
        <Grid item xs={12} md={3} key={index}>
          <Box
            sx={{
              ...boxStyles,
              background: item.background, // Set gradient background from item
            }}
          >
            <Box sx={iconContainerStyles}>{item.icon}</Box>
            <Typography variant="h6" sx={{ color: "#004D40", fontWeight: "bold", mb: 1 }}>
              {item.label}
            </Typography>
            <Typography sx={{ color: "#004D40", fontSize: "1.5rem", fontWeight: "bold" }}>
              {item.count}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default DashUtilitys;
