import React  from "react";
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Typography, Container, Link } from '@mui/material';

// translation
import i18n from '../../i18in'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {`${i18n.t('derechos')} © `}
      <Link color="inherit">
        Lengua De Señas
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '50vh',
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          marginLeft: 20,
          marginBottom: 10,
        }}
      >
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}