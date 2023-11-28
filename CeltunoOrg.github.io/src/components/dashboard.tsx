import React, { Component } from 'react';
import "../../styles/App.css"
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
// import { auth } from '../../firebase-planner';
// import { useAuthState } from "react-firebase-hooks/auth";
// import { getAuth, signInWithCredential, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

type State = {
    isOpen: boolean
    loggedIn: boolean
    userPreferences: {
        hideAll: boolean
    }
}
interface Props {
    children?: React.ReactNode
    
    loggedIn: boolean
    isOpen: boolean
    userPreferences: {
        hideAll: boolean
    }
}

let Usercheck = false
class Dashboard extends Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            isOpen: false,
            loggedIn: false,
            userPreferences: {
                hideAll: false
            }
        }
    }

    async CheckAuth() {
        //
        if (this.props.loggedIn)
            Usercheck = true;
        else
            Usercheck = false;
        console.log("Usercheck: " + Usercheck)

    }

    componentDidMount() {
        //Auth
       
    }


    render() {

        return (


            <div className='appMainContainer'>

                    <div className='dashboardBox'>
                        <Button className={'sizeButton'} variant='outlined' href='/#/activities'> Activities </Button>
                        <Button className={'sizeButton'} variant='outlined' href='/#/presets'> Presets    </Button>
                        <Button className={'sizeButton'} variant='outlined' href='/#/deviceView'> Device view    </Button>
                        <Button hidden={!this.props.userPreferences.hideAll} className={'sizeButton'} variant='outlined' href='/#/user'> User    </Button>
                        <Button className={'sizeButton'} variant='outlined' href='/#/test'> Testing    </Button>
                        <Divider component={"li"} />
                        <a className={'sizeButton'} href='/#/activities'> Activities </a>
                        <a className={'sizeButton'} href='/#/presets'> Presets    </a>
                        <a className={'sizeButton'} href='/#/deviceView'> Device view    </a>
                    </div>

                <div>
                    <button className={'sizeButton'} onClick={() => this.CheckAuth()}> Activities </button>
                </div>
            </div>

        );
    }
}

export default Dashboard
