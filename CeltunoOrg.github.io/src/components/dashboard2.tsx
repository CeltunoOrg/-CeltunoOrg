import React, { Component, useEffect, useState } from 'react';
import "../../styles/App.css"
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import { auth , signInWithGoogle, SignOut} from '../../firebase-planner';
import { useAuthState } from "react-firebase-hooks/auth";
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
const Dashboard2 = (Props: Props) => {
    const[testUser, setTestUser] = useState<boolean>(false)
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

        <div className='appMainContainer'>

            <div className='maingridContainer '>
                {/* <Button onClick={}>Open Modal </button> */}
                <div className='dashboardBox'>
                    {
                    user 
                    ?
                    <>
                    <Button className={'sizeButton'} variant='outlined' href='/#/activities'> Activities </Button>
                    <Button className={'sizeButton'} variant='outlined' href='/#/presets'> Presets    </Button>
                    <Button className={'sizeButton'} variant='outlined' href='/#/deviceView'> Device view    </Button>
                    </>                    
                    :
                    <Button className={'sizeButton'} variant='outlined' href='/#/deviceView'> Device view    </Button>
                }
                    <Button hidden={!Props.userPreferences.hideAll} className={'sizeButton'} variant='outlined' href='/#/user'> User    </Button>
                    <Button  hidden = {!testUser} className={'sizeButton'} variant='outlined' href='/#/test'> Testing    </Button>
                    <Button  hidden = {!testUser} className={'sizeButton'} variant='outlined' href='/#/data'> DataReadTesting    </Button>
                <div style={{float: 'right', margin: '10px'}}>

                {
                    user ?
                    <Button className={'login__btn login__google'} onClick={() => SignOut()}> Logout </Button>
                    :
                    <Button className={'login__btn login__google'} onClick={() => signInWithGoogle() }> Login </Button>
                }
                </div>
                    <Divider component={"li"} />
                    <a className={'sizeButton'} href='/#/activities'> Activities </a>
                    <a className={'sizeButton'} href='/#/presets'> Presets    </a>
                    <a className={'sizeButton'} href='/#/deviceView'> Device view    </a>
                </div>
            <div>
            </div>

            </div>
        </div>

    );
}


export default Dashboard2
