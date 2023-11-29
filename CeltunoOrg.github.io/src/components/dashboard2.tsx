import "../../styles/App.css"
import React, { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../firebase-planner';
import InfoPanel from './modules/infoPanel';
import Calendar from './modules/calendar';
import DashboardMenu from './modules/DashboardMenu';
import { Container, Box, Grid, Paper } from '@mui/material';

// import { getAuth, signInWithCredential, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// type State = {
//     isOpen: boolean
//     loggedIn: boolean
//     userPreferences: {
//         hideAll: boolean
//     }
// }
interface Props {
    children?: React.ReactNode

    loggedIn: boolean
    isOpen: boolean
    userPreferences: {
        hideAll: boolean
    }
}

// let Usercheck = false
const Dashboard2 = (props: Props) => {
    const [testUser, setTestUser] = useState<boolean>(false)
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) {
            console.log("Logged in: " + user.displayName + " - " + user.email);
            //    Usercheck = true;
        }
        else
            console.log("Not logged in: ");
        // Usercheck = false;
        CheckAuth();
    }, [user, loading]);

    const CheckAuth = () => {
        //
        if (user && user.email === "miguelloz.cm@gmail.com")
            setTestUser(true);
        else
            setTestUser(false);
        console.log("Usercheck: " + testUser)

    }


    return (



        <>
            <DashboardMenu user={user} disableUserPage={true} testUser={false}>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    {/* 

                {
                    user
                        ?
                        user.isAnonymous === false
                            ?
                            <>
                                <Button className={'sizeButton'} variant='outlined' href='/#/activities'> Activities </Button>
                                <Button className={'sizeButton'} variant='outlined' href='/#/presets'> Presets    </Button>
                                <Button className={'sizeButton'} variant='outlined' href='/#/deviceView'> Device view    </Button>
                            </>
                            :
                            <Button className={'sizeButton'} variant='outlined' href='/#/deviceView'> Device view  </Button>
                        :
                        <>
                            <Button hidden={!Props.userPreferences.hideAll} className={'sizeButton'} variant='outlined' href='/#/user'> User </Button>
                            <Button hidden={!testUser} className={'sizeButton'} variant='outlined' href='/#/test'> Testing    </Button>
                            <Button hidden={!testUser} className={'sizeButton'} variant='outlined' href='/#/data'> DataReadTesting    </Button>
                        </>
                }
                <div style={{ float: 'right', margin: '10px' }}>
                    <InitLogin editCallback={loginCallback} /> */}
                    {/* {
                        user ?
                        <Button className={'login__btn login__google'} onClick={() => SignOut()}> Logout </Button>
                        :
                        <Button className={'login__btn login__google'} onClick={() => signInWithGoogle() }> Login </Button>
                    } */}
                    {/* </div> */}
                    {/* <Divider component={"li"} />
                Backup links
                <a className={'sizeButton'} href='/#/activities'> Activities </a>
                <a className={'sizeButton'} href='/#/presets'> Presets    </a>
                <a className={'sizeButton'} href='/#/deviceView'> Device view    </a> */}
                    {/* </div > */}


                    {/* <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        //height: "100vh",
                        overflow: "auto",
                        p: 3
                    }}
                > */}
                    <Container maxWidth="lg" sx={{ mt:8, mb: 4 }}>
                    <Grid container spacing={3}>
                        {/* Chart */}
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: "flex",
                                    flexDirection: "column",
                                    height: 240
                                }}
                            >
                                <Calendar user={user} />
                                {/* {showTab(selectedTab)} */}
                            </Paper>
                        </Grid>
                        {/* Recent Deposits */}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: "flex",
                                    flexDirection: "column",
                                    height: 240
                                }}
                            >
                                <InfoPanel />
                            </Paper>
                        </Grid>
                        {/* Recent Orders */}

                        {/*
              <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Orders /> 
              </Paper>
              </Grid>
            */}
                    </Grid>

                    </Container>
                    {/* </Box> */}
                </Box>

            </DashboardMenu>
        </>


    );
}


export default Dashboard2
