
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Tab, Tabs, Typography, CssBaseline } from "@mui/material";
import TraductorLS from './TraductorLS';
import TraductorLSM from './TranductorLSM';

// translation
import i18n from '../../i18in'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

const Indexhandrecog = () => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', }}>
      <CssBaseline />
        <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
        >
            <Tab label={i18n.t('ls1')} {...a11yProps(0)} />
            <Tab label={i18n.t('ls11')} {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
            <TraductorLSM />
        </TabPanel>
        <TabPanel value={value} index={1}>
            <TraductorLS />
        </TabPanel>
    </Box>
    );
}

export default Indexhandrecog;



