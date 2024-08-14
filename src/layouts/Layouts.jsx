import React from "react"
import Header from "../components/headers/Header"
import Grid from '@mui/material/Grid';
import Footer from "../components/footers/Footer";
import SideBar from "../components/sidebar/SideBar";

function Layouts() {
  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid xs={2} style={{ backgroundColor: "red" }}>
            <SideBar/>
        </Grid>
        <Grid xs={10}>
          <Header />
          <h1 style={{ backgroundColor: "green" }}>hello 2</h1>
          <Footer />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Layouts
