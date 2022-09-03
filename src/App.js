// Paginas
// body
import Navbar from './pages/body/Navbar';
//import Sidebar from './pages/body/Sidebar';
import Footer from './pages/body/Footer';
import Add from './pages/body/Add';

// react loader spinner
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

// Routes 
import { BrowserRouter as Router } from 'react-router-dom';

//auth

import { connect } from 'react-redux';

// materialui
import { useState } from "react";
import { Box, createTheme, ThemeProvider } from "@mui/material";

function App({ checked }) {
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
      {checked && (
        <Navbar /> 
      )}
      <Add setMode={setMode} mode={mode}/>
      <Footer />
      </Box>
      </ThemeProvider>
    </Router>
  );
}

const mapStateToProps = ({session}) => ({
  checked: session.checked,
})

export default connect(mapStateToProps)(App);
