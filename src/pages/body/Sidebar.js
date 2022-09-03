import FaceIcon from '@mui/icons-material/Face';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, } from "@mui/material";

import React from "react";

import { Link } from "react-router-dom";
  
  const Sidebar = () => {
    return (
      <Box >
        <Box position="flex">
          <List>
          <ListItem disablePadding>
              <ListItemButton component={Link} to="/lenguas">
                <ListItemIcon>
                  <GTranslateIcon />
                </ListItemIcon>
                <ListItemText primary="Inicio traducción lengua de señas" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/handrecog">
                <ListItemIcon>
                  <FaceIcon />
                </ListItemIcon>
                <ListItemText primary="Reconocimiento de mano (provisional) tensorflow" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/traductorls">
                <ListItemIcon>
                  <GTranslateIcon />
                </ListItemIcon>
                <ListItemText primary="Traductor LSM/ASL" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    );
  };
  
  export default Sidebar;