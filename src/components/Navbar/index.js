import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useDispatch} from "react-redux";
import {openModal} from "../../features/AddPost/actions";

export default function Navbar() {
    const dispatch = useDispatch();
    const handleOpenModal = () => {
        dispatch(openModal(true))
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Button color="inherit" onClick={handleOpenModal}>Add post</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
