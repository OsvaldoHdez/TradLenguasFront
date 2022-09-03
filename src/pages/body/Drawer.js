import React  from "react";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link } from "react-router-dom";

const ITEM_HEIGHT = 48;
export default function Drawer() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                aria-controls= {open ? 'menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleMenu}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: '20ch',
                    },
                }}
            >
            <MenuItem component={Link} to="/" onClick={handleClose}>Página de inicio</MenuItem>
            <MenuItem component={Link} to="/informacion" onClick={handleClose}>Información</MenuItem>
            <MenuItem component={Link} to="/lenguas" onClick={handleClose}>Traductor LSM/ASL</MenuItem>
            <MenuItem component={Link} to="/acercade" onClick={handleClose}>Acerca de nosotros</MenuItem>
            </Menu>
        </div>
    );
}