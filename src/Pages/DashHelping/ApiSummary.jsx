import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function ApiSummary() {
  return (
    <Box className="box-container" sx={{ p: 3, borderRadius: 2, backgroundColor: "background.paper" }}>
      <Typography variant="h5" className="typography-header" sx={{ mb: 2 }}>
        API Summary
      </Typography>
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="table-head-cell">
                <Typography>API ID</Typography>
              </TableCell>
              <TableCell className="table-head-cell">
                <Typography>API Name</Typography>
              </TableCell>
              <TableCell align="center" className="table-head-cell">
                <Typography>Current Balance</Typography>
              </TableCell>
              <TableCell align="center" className="table-head-cell">
                <Typography>Success Recharge</Typography>
              </TableCell>
              <TableCell align="center" className="table-head-cell">
                <Typography>Failed Recharge</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow className="table-row-hover">
              <TableCell>1</TableCell>
              <TableCell>Recharge API 1</TableCell>
              <TableCell align="center">₹ 15,000.00</TableCell>
              <TableCell align="center">200</TableCell>
              <TableCell align="center">5</TableCell>
            </TableRow>
            <TableRow className="table-row-hover">
              <TableCell>2</TableCell>
              <TableCell>Recharge API 2</TableCell>
              <TableCell align="center">₹ 8,000.00</TableCell>
              <TableCell align="center">150</TableCell>
              <TableCell align="center">10</TableCell>
            </TableRow>
            <TableRow className="table-row-hover">
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
  );
}

export default ApiSummary;
