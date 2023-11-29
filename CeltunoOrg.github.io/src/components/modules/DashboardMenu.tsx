import { Container, Toolbar, IconButton, Typography, Box, Drawer as MuiDrawer, Divider, ListItemButton, ListItemIcon, ListItemText, CssBaseline, styled, Theme, CSSObject } from "@mui/material"
import React, { useState } from "react"

import { auth } from '../../../firebase-planner';
import InitLogin from "./login"
import { User } from "firebase/auth"
import { Menu as MenuIcon, Close, EditCalendarOutlined, EventRepeatOutlined, Face, QuestionMarkRounded, CalendarMonth, CalendarTodayOutlined, Home } from "@mui/icons-material"
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import  from '@mui/icons-material/MenuOutlined';
import { useAuthState } from "react-firebase-hooks/auth";
// import { CalendarTodayOutlined ,MenuOutlined} from '@material-ui/icons';
import {AppBar as MuiAppBar, AppBarProps as MuiAppBarProps } from '@mui/material';

interface Props {
    children?: React.ReactNode
    user: User | null | undefined
    disableUserPage: boolean
    testUser: boolean
}

const openedMixin = (theme: Theme): CSSObject => ({
    width: 240,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });
  
  const closedMixin = (theme: Theme): CSSObject => ({
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
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: 240,
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
  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: 240,
      width: `calc(100% - ${240}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  function DashboardMenu(props: Props) {
    function closeDrawer(){
      setDrawerOpen(false);
    }
    function openDrawer(){
      setDrawerOpen(true);
    }
    const [user, loading, error] = useAuthState(auth);
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(!open);
    };
    const [open, setDrawerOpen] = useState(true);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                {/* <Container maxWidth="lg" > */}
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={open ? closeDrawer : openDrawer}
                            sx={{
                                mr: 2,
                                display: {
                                    xs: 'block',
                                    sm: 'block',

                                }
                            }}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
                            Menu
                        </Typography>

                        <Box component="div" sx={{
                            display: {
                                xs: 'block',
                                sm: 'block',
                            }
                        }}>
                            <InitLogin />
                        </Box>
                        {/* The outside of the drawer */}
                    </Toolbar>
                {/* </Container> */}
            </AppBar>
            
            <Drawer
                //from which side the drawer slides in
                anchor="left"
                //if open is true --> drawer is shown
                open={open}
                //function that is called when the drawer should close
                // onClose={toggleDrawer(false)}
                
                variant="permanent"
            >
                {/* The inside of the drawer */}
                <Box sx={{
                    p: 2,
                    height: 1,
                    backgroundColor: "#EFF1F3",
                }}>
                    <IconButton sx={{ mb: 2 }} onClick={closeDrawer}>
                        <Close />
                    </IconButton>
                    
                    <Divider sx={{ mb: 2 }} />
                    <Box sx={{ mb: 2 }}>
                        {user
                            ?
                            user.isAnonymous === false
                                ?
                                <>
                                    <ListItemButton href='/#'>
                                        <ListItemIcon>
                                            <Home sx={{ color: "primary.main" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Home" />
                                    </ListItemButton>
                                    <ListItemButton href='/#/activities'>
                                        <ListItemIcon>
                                            <EditCalendarOutlined sx={{ color: "primary.main" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Activities" />
                                    </ListItemButton>
                                    <ListItemButton href='/#/presets'>
                                        <ListItemIcon>
                                            <EventRepeatOutlined sx={{ color: "primary.main" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Presets" />
                                    </ListItemButton>
                                    <ListItemButton href='/#/deviceView'>
                                        <ListItemIcon>
                                            <CalendarMonth sx={{ color: "primary.main" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Device view" />
                                    </ListItemButton>
                                </>
                                :
                                <ListItemButton href='/#/deviceView'>
                                    <ListItemIcon>
                                        <CalendarTodayOutlined sx={{ color: "primary.main" }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Device view" />
                                </ListItemButton>
                            :
                            <>
                                <InitLogin />
                                Log in
                            </>
                        }

                        <ListItemButton hidden={props.disableUserPage} href='/#/user'>
                            <ListItemIcon>
                                <Face sx={{ color: "primary.main" }} />
                            </ListItemIcon>
                            <ListItemText primary="User" />
                        </ListItemButton>
                        <ListItemButton hidden={!props.testUser} href='/#/test'>
                            <ListItemIcon>
                                <QuestionMarkRounded sx={{ color: "primary.main" }} />
                            </ListItemIcon>
                            <ListItemText primary="Test" />
                        </ListItemButton>


                        {/* <Box sx={{
                                        display: "flex",
                                    justifyContent: "center",
                                    position: "absolute",
                                    bottom: "0",
                                    left: "50%",
                                    transform: "translate(-50%, 0)"
                                }}
                                >
                                    <List>
                                    
                                    <Button variant="contained" sx={{ m: 1, width: .5 }}>Register</Button>
                                    <Button variant="outlined" sx={{ m: 1, width: .5 }}>Login</Button>
                                    </List>
                                */}
                    </Box>
                </Box>

            </Drawer>
            {props.children}
        </Box>
    )
}
export default DashboardMenu