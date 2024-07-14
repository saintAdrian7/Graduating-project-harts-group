import  { useState } from "react";
import { AppBar, Toolbar, Button, ButtonGroup, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, ClickAwayListener, TextField, Box } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import CreateIcon from '@mui/icons-material/Create';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import Book from "@mui/icons-material/Book";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/Authconstants";

export const MuiNavbar = () => {
    const { state, dispatch } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();

    const setDisplayLogin = () => {
        dispatch({ type: 'SHOW MODAL' });
    };

    const handleLogout = () => {
        localStorage.removeItem("userId");
        dispatch({ type: 'LOGOUT' });
    };

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleCreateCourse = () => {
        navigate('/CreateCourse');
        setSidebarOpen(false); 
    };

    const handleMurphyAI = () => {
        navigate('/murphy-ai');
        setSidebarOpen(false); 
    };

    const handleHome = () => {
        navigate('/Homepage');
        setSidebarOpen(false);
    };

    const handleSearch = () => {
        setShowSearch(true);
        setSidebarOpen(false);
    };

    const handleSearchClose = () => {
        setShowSearch(false);
    };
    const handleAvailableCourses = () => {
        navigate('/CourseList');
        setSidebarOpen(false);
    }

    return (
        <>
            <AppBar>
                <Toolbar className="top-nav-bar">
                    <IconButton className="hambuger-menu" edge="start" color="inherit" aria-label="menu" onClick={handleSidebarToggle}>
                        <MenuIcon />
                    </IconButton>
                    <img src="https://tse4.mm.bing.net/th?id=OIG2.JQKfKP6cxFiMrZwI_m4J&pid=ImgGn" alt="logo" width="40px" />
                    <h1>EDU-Murphy</h1>
                    <ButtonGroup aria-label="text button group">
                        {!state.loggedInUser && <Button variant="text" className="login-button" onClick={setDisplayLogin}>Login or SignUp</Button>}
                        {state.loggedInUser && <Button variant="text" className="login-button" onClick={handleLogout}>Log Out</Button>}
                    </ButtonGroup>
                </Toolbar>

                {/* Sidebar */}
                <Drawer anchor="left" open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
                    <div className="sidebar">
                        <List>
                            <ListItem button onClick={handleHome}>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItem>
                            <ListItem button onClick={handleSearch}>
                                <ListItemIcon>
                                    <SearchIcon />
                                </ListItemIcon>
                                <ListItemText primary="Search" />
                            </ListItem>
                            <ListItem button onClick={handleCreateCourse}>
                                <ListItemIcon>
                                    <CreateIcon />
                                </ListItemIcon>
                                <ListItemText primary="Create Course" />
                            </ListItem>
                            <ListItem button onClick={handleMurphyAI}>
                                <ListItemIcon>
                                    <SchoolIcon />
                                </ListItemIcon>
                                <ListItemText primary="Murphy AI" />
                            </ListItem>
                            <ListItem button onClick={handleAvailableCourses}>
                                <ListItemIcon>
                                    <Book />
                                </ListItemIcon>
                                <ListItemText primary="Available Courses" />
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
            </AppBar>

            {showSearch && (
                <ClickAwayListener onClickAway={handleSearchClose}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '70px', 
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            backgroundColor: 'transparent',
                            padding: '10px',
                            zIndex: 1300, 
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <TextField
                            autoFocus
                            placeholder="Search..."
                            variant="outlined"
                            sx={{
                                width: '80%',
                                maxWidth: '600px',
                            }}
                        />
                    </Box>
                </ClickAwayListener>
            )}
        </>
    );
};
