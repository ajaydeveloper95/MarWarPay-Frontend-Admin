import { Box, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { accessToken } from '../../helpingFile';
import { useEffect, useState } from 'react';
import { apiGet } from '../../utils/http';

const API_GET_USERS_ENDPOINT = `apiAdmin/v1/utility/getUserWithWallet`;
const ACCESS_TOKEN = accessToken;

function WlltSummary() {
  const [eWalletBalance, setEWalletBalance] = useState(0);
  const [upiWalletBalance, setUpiWalletBalance] = useState(0);

  useEffect(() => {
    // Fetch total balances from API
    const fetchTotalBalances = async () => {
      try {
        const response = await apiGet(API_GET_USERS_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
        if (response.status === 200) {
          const totalEwalletBalance = response.data.data.reduce(
            (total, user) => total + user.EwalletBalance,
            0
          );
          const totalUpiWalletBalance = response.data.data.reduce(
            (total, user) => total + user.upiWalletBalance,
            0
          );
          setEWalletBalance(totalEwalletBalance);
          setUpiWalletBalance(totalUpiWalletBalance);
        }
      } catch (error) {
        console.error('Error fetching balances:', error);
      }
    };

    fetchTotalBalances();
  }, []);

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
              <TableCell align="center">
                ₹{" "}
                {upiWalletBalance.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell align="center">
                ₹{" "}
                {eWalletBalance.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                transition: "background-color 0.3s ease",
                "&:hover": { backgroundColor: "#E0F2F1" },
              }}
            >
              <TableCell>Secondary Wallet</TableCell>
              <TableCell align="center">₹ 00.00</TableCell>
              <TableCell align="center">₹ 00.00</TableCell>
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
                {upiWalletBalance.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>
                ₹{" "}
                {eWalletBalance.toLocaleString("en-IN", {
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
