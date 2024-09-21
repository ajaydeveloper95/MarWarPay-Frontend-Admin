import { Grid, Box, Typography } from '@mui/material'; // Import necessary Material-UI components

function Total_Blnc() {
  return (
    <Grid container spacing={3}>
      {/* E-Wallet Balance */}
      <Grid item xs={12} sm={6} md={4}>
        <Box
          sx={{
            p: 4,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #ff6b6b, #f7c6c7)', // Gradient background
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
            minHeight: '180px',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.4s, box-shadow 0.4s',
            '&:hover': {
              transform: 'translateY(-10px)',
              boxShadow: '0 12px 24px rgba(0, 0, 0, 0.25)',
            },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '60px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))',
              borderTopLeftRadius: 2,
              borderTopRightRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              transform: 'translateY(100%)',
              transition: 'transform 0.4s',
              '&:hover': {
                transform: 'translateY(0)',
              },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              View Details
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
              E-Wallet Balance
            </Typography>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
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
            background: 'linear-gradient(135deg, #36d1dc, #5b86e5)', // Gradient background
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
            minHeight: '180px',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.4s, box-shadow 0.4s',
            '&:hover': {
              transform: 'translateY(-10px)',
              boxShadow: '0 12px 24px rgba(0, 0, 0, 0.25)',
            },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '60px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))',
              borderTopLeftRadius: 2,
              borderTopRightRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              transform: 'translateY(100%)',
              transition: 'transform 0.4s',
              '&:hover': {
                transform: 'translateY(0)',
              },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              View Details
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
              UPI-Wallet Balance
            </Typography>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
              ₹ 4,963.00
            </Typography>
          </Box>
        </Box>
      </Grid>

      {/* Open Money Balance */}
      <Grid item xs={12} sm={6} md={4}>
        <Box
          sx={{
            p: 4,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #ff9a8b, #ff6a00)', // Gradient background
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
            minHeight: '180px',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.4s, box-shadow 0.4s',
            '&:hover': {
              transform: 'translateY(-10px)',
              boxShadow: '0 12px 24px rgba(0, 0, 0, 0.25)',
            },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '60px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))',
              borderTopLeftRadius: 2,
              borderTopRightRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              transform: 'translateY(100%)',
              transition: 'transform 0.4s',
              '&:hover': {
                transform: 'translateY(0)',
              },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              View Details
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
              Open Money Balance
            </Typography>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
              ₹ 103,567.81
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Total_Blnc;
