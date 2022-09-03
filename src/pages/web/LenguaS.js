
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Tab, Tabs, Typography, CssBaseline } from "@mui/material";
import IndexTradLS from "../tensorflow/IndexTradLS";
import Indexhandrecog from "../tensorflow/Indexhandrecog";
import IndexImageRecog from '../tensorflow/IndexImageRecog';
// translation
import i18n from '../../i18in'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
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
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


const LenguaS = () => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ mt : 7 }}>
            <CssBaseline />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="tabs sign language">
                    <Tab label={i18n.t('traductor')} {...a11yProps(0)} />
                    <Tab label={i18n.t('recoimg')} {...a11yProps(1)} />
                    <Tab label={i18n.t('recohand')} {...a11yProps(2)} />
                </Tabs>
            </Box>
        <TabPanel value={value} index={0}>
          <IndexTradLS />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <IndexImageRecog />
        </TabPanel>
        <TabPanel value={value} index={2}>
         <Indexhandrecog />
        </TabPanel>
    </Box>
    );
}

export default LenguaS;



