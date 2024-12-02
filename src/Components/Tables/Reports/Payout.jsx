import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSidebar } from "../../../Context/SidebarContext";
import axios from "axios";
import { accessToken, domainBase } from "../../../helpingFile";
import { saveAs } from "file-saver";
import Papa from "papaparse"; 

const API_ENDPOINT = `${domainBase}apiAdmin/v1/payout/allPayOutOnSuccess`;
const ACCESS_TOKEN = accessToken;


const Payout = () => {
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState("");
  const [pageSize, setPageSize] = useState("25"); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
        setData(
          response.data.data.map((item, index) => ({
            id: index + 1, // Sequential ID starting from 1
            memberId: item.userInfo.memberId,
            name: item.userInfo.fullName,
            accountNumber: item.accountNumber,
            ifsc: item.ifscCode,
            amount: `${item.amount}`,
            chargeAmount: item.chargeAmount,
            finalAmount: item.finalAmount,
            txnId: item.trxId,
            rrn: item.bankRRN, 
            status: item.isSuccess,
            dateTime: formatDateTime(item.createdAt), 
          }))
        );
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.memberId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.txnId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.rrn.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = date ? item.dateTime.startsWith(date) : true;
    return matchesSearch && matchesDate;
  });

  const itemsToDisplay =
    pageSize === "all" ? filteredData.length : parseInt(pageSize, 10);
  const startIndex = (currentPage - 1) * itemsToDisplay;
  const endIndex = startIndex + itemsToDisplay;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setCurrentPage(1); // Reset to first page when pageSize changes
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && endIndex < filteredData.length) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleExport = () => {
    const csvData = filteredData.map((item) => ({
      ID: item.id,
      MemberID: item.memberId,
      Name: item.name,
      AccountNumber: item.accountNumber,
      IFSC: item.ifsc,
      Amount: item.amount,
      ChargeAmount: item.chargeAmount,
      FinalAmount: item.finalAmount,
      TxnID: item.txnId,
      RRN: item.rrn,
      Status: item.status ? "Success" : "Failed",
      DateTime: item.dateTime,
    }));

    const csv = Papa.unparse(csvData); // Convert to CSV format
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" }); // Create Blob
    saveAs(blob, `Payout_History_${new Date().toISOString().split("T")[0]}.csv`); // Save file
  };

  return (
    <>
                <Box
        sx={{ padding: 3, marginBottom: 2, marginTop: 12 }}
        maxWidth="xl"
        style={{
          marginLeft: isSidebarOpen ? "16rem" : "10rem",
          transition: "margin-left 0.3s ease",
          minWidth: "600px",
          maxWidth: "80%",
        }}
      >
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: "background.paper",
                boxShadow: "5px 0 10px -3px rgba(0, 128, 128, 0.6)",
              }}
            >
              <Typography variant="h6" sx={{ color: "teal" }}>
                Total balance
              </Typography>
              <Typography>
          ₹{" "}
          {data.length > 0
            ? data
                .reduce((total, user) => total + parseFloat(user.amount || 0), 0)
                .toLocaleString("en-IN", { minimumFractionDigits: 2 })
            : "0.00"}
        </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: "background.paper",
                boxShadow: "5px 0 10px -3px rgba(0, 128, 128, 0.6)",
              }}
            >
              <Typography variant="h6" sx={{ color: "teal" }}>
                Total Transaction
              </Typography>
              <Typography>{data.length}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Container
      maxWidth="xl"
      style={{
        marginLeft: isSidebarOpen ? "16rem" : "10rem",
        transition: "margin-left 0.3s ease",
        minWidth: "600px",
        maxWidth: "80%",
        // marginTop: "8%",
      }}
    >
      
      <Paper sx={{ p: 2, boxShadow: 3 }}>
      <Grid item xs={12} md={2} align="right" marginBottom={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleExport}
        >
          Export
        </Button>
      </Grid>
        {/* Header Section */}
        <Grid container alignItems="center" spacing={1} mb={2}>
          <Grid item xs={12} md={5}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <IconButton color="primary" onClick={handleBackButtonClick}>
                  <ArrowBackIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="h4" component="h1" gutterBottom sx={{color: 'teal'}}>
                  Payout History
                </Typography>

              </Grid>
              
            </Grid>
            
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Search by Member ID or txn ID or rrn"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
            label="Date"
            type="date"
              variant="outlined"
              fullWidth
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel id="page-size-label">Items Per Page</InputLabel>
              <Select
                labelId="page-size-label"
                value={pageSize}
                onChange={handlePageSizeChange}
                label="Items Per Page"
              >
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
                <MenuItem value="all">View All</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          
        </Grid>

        {/* Table Section */}
        <TableContainer component={Paper}>
          <Table sx={{ borderCollapse: "collapse" }}>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    border: "1px solid rgba(224, 224, 224, 1)",
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    border: "1px solid rgba(224, 224, 224, 1)",
                  }}
                >
                  MemberID
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    border: "1px solid rgba(224, 224, 224, 1)",
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    border: "1px solid rgba(224, 224, 224, 1)",
                  }}
                >
                  Amount
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    border: "1px solid rgba(224, 224, 224, 1)",
                  }}
                >
                  Charge Amt
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    border: "1px solid rgba(224, 224, 224, 1)",
                  }}
                >
                  Final Amt
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    border: "1px solid rgba(224, 224, 224, 1)",
                  }}
                >
                  Txn ID
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    border: "1px solid rgba(224, 224, 224, 1)",
                  }}
                >
                  RRN
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    border: "1px solid rgba(224, 224, 224, 1)",
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    border: "1px solid rgba(224, 224, 224, 1)",
                  }}
                >
                  Date Time
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={10} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={10} align="center">
                  No data available
                  </TableCell>
                </TableRow>
              ) : filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} align="center">
                    Data Not Available
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                      {startIndex + index + 1}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                      {item.memberId}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                      {item.name}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                      {item.amount}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                      {item.chargeAmount}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                      {item.finalAmount}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                      {item.txnId}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                      {item.rrn}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                      {item.status === "Success" ? (
                        <Button
                        sx={{
                          color: "green",
                          backgroundColor: "rgba(0, 128, 0, 0.1)", 
                          // border: "1px solid green",
                          borderRadius: 2,
                          padding: "2px 10px",
                        }}
                      >
                        Success
                      </Button>
                    ) : (
                      <Button
                        sx={{
                          color: "red",
                          backgroundColor: "rgba(255, 0, 0, 0.1)", 
                          // border: "1px solid red",
                          borderRadius: 2,
                          padding: "2px 10px",
                        }}
                      >
                        Failed
                      </Button>
                      )}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
                      {item.dateTime}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Section */}
        <Grid container spacing={2} justifyContent="flex-end" mt={2}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              disabled={currentPage === 1}
              onClick={() => handlePageChange("prev")}
            >
              Previous
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              disabled={endIndex >= filteredData.length}
              onClick={() => handlePageChange("next")}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
    </>

  );
};

export default Payout;
