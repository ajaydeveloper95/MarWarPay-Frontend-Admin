import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function DistributeSmy() {
  return (
    <Box
      className="box-container"
      sx={{ p: 3, borderRadius: 2, backgroundColor: "background.paper" }}
    >
      <Typography variant="h5" className="typography-header" sx={{ mb: 2 }}>
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
            <TableRow
              className="total-row"
              sx={{
                backgroundColor: "#004D40",
                color: "white",
                fontWeight: "bold",
              }}
            >
              <TableCell sx={{ color: "white" }}>Total</TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
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
  );
}

export default DistributeSmy;
