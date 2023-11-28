import { AppBar, Container, Toolbar, IconButton, Typography, Box, Drawer, Divider, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import React, { useState } from "react"

import { auth } from '../../../firebase-planner';
import InitLogin from "./login"
import { User } from "firebase/auth"
import { Menu as MenuIcon, Close, EditCalendarOutlined, EventRepeatOutlined, Face, QuestionMarkRounded } from "@mui/icons-material"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import  from '@mui/icons-material/MenuOutlined';
import { useAuthState } from "react-firebase-hooks/auth";
// import { CalendarTodayOutlined ,MenuOutlined} from '@material-ui/icons';


interface Props {
    // children?: React.ReactNode
    user: User | null | undefined
    disableUserPage: boolean
    testUser: boolean
}


function DashboardMenu(props: Props) {
const [user, loading, error] = useAuthState(auth);
const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
    }
    setState(open);
};
const [open, setState] = useState(false);

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="lg" >
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer(true)}
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
                        </Box>
                        <InitLogin />
                        {/* The outside of the drawer */}
                        <Drawer
                            //from which side the drawer slides in
                            anchor="left"
                            //if open is true --> drawer is shown
                            open={open}
                            //function that is called when the drawer should close
                            onClose={toggleDrawer(false)}

                        >
                            {/* The inside of the drawer */}
                            <Box sx={{
                                p: 2,
                                height: 1,
                                backgroundColor: "#EFF1F3",
                            }}>
                                <IconButton sx={{ mb: 2 }} onClick={toggleDrawer(false)}>
                                    <Close />
                                </IconButton>
                                <Divider sx={{ mb: 2 }} />
                                <Box sx={{ mb: 2 }}>
                                    {user
                                        ?
                                        user.isAnonymous === false
                                        ?
                                        <>
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
                                                    {/* <ListItemIcon>
                                                        <CalendarMonthIcon sx={{ color: "primary.main" }} />
                                                    </ListItemIcon> */}
                                                    <ListItemText primary="Device view" />
                                                </ListItemButton>
                                            </>
                                            :
                                            <ListItemButton href='/#/deviceView'>
                                                {/* <ListItemIcon>
                                                    <CalendarTodayOutlined sx={{ color: "primary.main" }} />
                                                </ListItemIcon> */}
                                                <ListItemText primary="Device view" />
                                            </ListItemButton>
                                        :
                                        'ttt'
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


                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}
export default DashboardMenu