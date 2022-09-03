import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Button, Menu, MenuItem, Box, Toolbar, List, CssBaseline, Typography, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import InfoIcon from '@mui/icons-material/Info';
import { AccountCircle } from "@mui/icons-material";

// Pages
// web
import i18n from '../../i18in'
import Home from '../web/Home'
import Acercade from '../web/Acercade'
import Dashboard from '../web/Dashboard';
import LenguaS from '../web/LenguaS'
import Informacion from '../web/Informacion';

// users
import Login from '../users/Login';
import Register from '../users/Signup';
import EmailSent from '../users/EmailSent';
import ForgottenPassword from '../users/ForgottenPassword';
import PasswordReset from '../users/PasswordReset';

// Routes 
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from "react-redux";
import { logoutUser } from '../../auth/actions/userActions';
import { useHistory } from "react-router-dom";
import AuthRoute from '../../components/AuthRoute';
import BasicRoute from '../../components/BasicRoute';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Navbar = ({ authenticated, logoutUser }) => {

  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    {
      text: i18n.t('inicio'),
      icon: HomeIcon,
      to: "/",
    },
    {
      text: i18n.t('informacion'),
      icon: LibraryBooksIcon,
      to: "/informacion",
    },
    {
      text: i18n.t('traductor'),
      icon: GTranslateIcon,
      to: "/lenguas",
    },
    {
      text: i18n.t('acercade'),
      icon: InfoIcon,
      to: "/acercade",
    },
  ];

  return (
    <>
    <Box sx={{ display: 'flex' }}>
      <>
      {!authenticated ? (
        <>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            &nbsp;
          </Typography>
          <Button component={Link} to="/login" color="inherit">{i18n.t('sesion')}</Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map(({ text, icon: Icon, to }, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={Link}
                to = {to}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      </>
      ) : (
        <>
        <AppBar position="fixed" open={open}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
              mr: 2,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            &nbsp;
          </Typography>
          <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem component={Link} to="/dashboard" onClick={handleClose}>{i18n.t('perfil')}</MenuItem>
                <MenuItem component={Link} to="/account" onClick={handleClose}>{i18n.t('cuenta')}</MenuItem>
                <MenuItem to="#" onClick={() => logoutUser(history)}>{i18n.t('sesion2')}</MenuItem>
              </Menu>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map(({ text, icon: Icon, to }, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={Link}
                to = {to}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      </>
      )}
      </>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Switch>
            <BasicRoute path="/passwordreset/:userId?/:resetString?"> <PasswordReset /> </BasicRoute>
            <BasicRoute path="/forgottenpassword"> <ForgottenPassword /> </BasicRoute>
            <BasicRoute path="/emailsent/:userEmail?/:reset?"> <EmailSent /> </BasicRoute>
            <BasicRoute path="/login/:userEmail?"> <Login /> </BasicRoute>
            <BasicRoute path="/signup"> <Register /> </BasicRoute>
            <AuthRoute path="/dashboard"> <Dashboard /> </AuthRoute>
            <Route path="/informacion"> <Informacion /> </Route>
            <Route path="/lenguaS"> <LenguaS /> </Route>
            <Route path="/acercade"> <Acercade /> </Route>
            <Route path="/"> <Home /> </Route>
        </Switch>
      </Box>
    </Box>
    </>
  );
};

const mapStateToProps = ({session}) => ({
  authenticated: session.authenticated
})

export default connect(mapStateToProps, {logoutUser})(Navbar);
