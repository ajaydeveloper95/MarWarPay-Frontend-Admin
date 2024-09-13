import { Typography } from '@mui/material';
import { useSidebar } from '../../Context/SidebarContext';

function Footer() {
    const { isSidebarOpen } = useSidebar();
  return (
    <Typography 
        sx={{ 
          textAlign: 'center', 
          marginTop: '8%',
          marginLeft: isSidebarOpen ? '16rem' : '10rem',
          transition: 'margin-left 0.3s ease',
          
        }}
      >
        Copyright © Marwarpay info Solutions Private Limited 2024
      </Typography>
  );
}

export default Footer;
