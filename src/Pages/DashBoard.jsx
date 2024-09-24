import { Box, Typography } from "@mui/material";
import { useSidebar } from "../Context/SidebarContext";
import "./Dashboard.css";
import Total_Blnc from "./DashHelping/Total_Blnc";
import DashUtilitys from "./DashHelping/DashUtilitys";
import WlltSummary from "./DashHelping/WlltSummary";
import MnyTransfer from "./DashHelping/MnyTransfer";
import DistributeSmy from "./DashHelping/DistributeSmy";
import ApiSummary from "./DashHelping/ApiSummary";

function DashBoard() {
  const { isSidebarOpen } = useSidebar();

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          marginTop: "8%",
          marginLeft: isSidebarOpen ? "16rem" : "10rem",
          minWidth: "600px",
          maxWidth: "80%",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "4px",
          textShadow:
            "0 4px 6px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.3)",
          color: "teal",
          transform: "translateY(0)",
          animation: "fadeInSlide 1s ease-out",
          "&:hover": {
            transform: "translateY(-3px) scale(1.03)",
          },
        }}
      >
        Dashboard
      </Typography>

      <Box
        sx={{ padding: 5, }}
        style={{
          marginLeft: isSidebarOpen ? "16rem" : "10rem",
          transition: "margin-left 0.3s ease",
          minWidth: "600px",
          maxWidth: "80%",
        }}
      >
        <Total_Blnc />
        <DashUtilitys />
        <WlltSummary />
        <MnyTransfer />
        <DistributeSmy />
        <ApiSummary />
      </Box>
    </>
  );
}
export default DashBoard;
