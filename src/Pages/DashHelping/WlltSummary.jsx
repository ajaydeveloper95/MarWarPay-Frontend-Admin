import { Box, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

function WlltSummary() {
  return (
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
          top: 0,
          left: 0,
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
              <TableCell sx={{ color: 'white' }}>Total</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>
                ₹{" "}
                {(10000 + 3000).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>
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
  );
}

export default WlltSummary;
