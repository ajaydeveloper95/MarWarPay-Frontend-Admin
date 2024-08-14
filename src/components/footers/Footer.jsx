import React, { useState } from 'react'
import { Box, Container, Grid, Typography, TextField, Button, IconButton, Link } from '@mui/material';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  const [email, setEmail] = useState('');

  return (
    <React.Fragment>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              We are a company dedicated to providing high-quality products and exceptional customer service.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box display="flex" flexDirection="column">
              <Link href="#" color="inherit" underline="hover">
                Home
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Products
              </Link>
              <Link href="#" color="inherit" underline="hover">
                About
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Contact
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Newsletter
            </Typography>
            <form>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
              />
              <Button type="submit" variant="contained" fullWidth>
                Subscribe
              </Button>
            </form>
          </Grid>
        </Grid>
        <Box mt={4} display="flex">
          <Typography variant="body2">
            © 2023 Your Company. All rights reserved.
          </Typography>
          <Box>
            <IconButton aria-label="Facebook" component="a" href="https://facebook.com">
              <FaFacebookF />
            </IconButton>
            <IconButton aria-label="Twitter" component="a" href="https://twitter.com">
              <FaTwitter />
            </IconButton>
            <IconButton aria-label="Instagram" component="a" href="https://instagram.com">
              <FaInstagram />
            </IconButton>
            <IconButton aria-label="LinkedIn" component="a" href="https://linkedin.com">
              <FaLinkedinIn />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  )
}

export default Footer
