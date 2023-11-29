import React, { Component, useState } from 'react';
import { Routes, Route } from "react-router-dom";
// import PlannerDataService from "./services/planner-firebase-service"
// import DaysList2 from "./components/day-list2.component";
import "../styles/App.css"
import Activities from './components/activities';
import Presets from './components/presets';
// import Dashboard from './components/dashboard';
import DeviceView from './components/deviceView';
// import Testing from './components/stepper';
// import User from './components/user';
// import { GoogleLogin } from '@react-oauth/google';
// import { GoogleAuthProvider, User, getAuth, signInWithPopup } from 'firebase/auth';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from '../firebase-planner';
import Dashboard2 from './components/dashboard2';
// import DataReaderTest from './components/dataReadTest';
type State = {
    isOpen3: boolean
    appLoggedIn :boolean
}
interface Props {
    children?: React.ReactNode
    isOpen3: boolean
    
}
    const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };
    // const [user, setUser] = useState<typeof User>();    
    // const [ profile, setProfile ] = useState();
    class App3 extends Component<Props, State>{
        constructor(props: Props) {
            super(props);
            this.state = {
                isOpen3: false,
                appLoggedIn :false
            }
        }
        // async CheckAuth() {
            //     //
            // const auth = getAuth();
            // const provider = new GoogleAuthProvider();
            // signInWithPopup(auth, provider)
            //     .then((result) => {
                //         // This gives you a Google Access Token. You can use it to access the Google API.
                //         const credential = GoogleAuthProvider.credentialFromResult(result);
                //         const token = credential.accessToken ?? "No token";
                //         console.log("Token: " + token)
                //         // The signed-in user info.
                //         const user = result.user;
                //         console.log("User. "+ user.email + " | " + user.email)
                
                //         // IdP data available using getAdditionalUserInfo(result)
                //         // ...
                //     }).catch((error) => {
                    //         // Handle Errors here.
                    //         const errorCode = error.code;
                    //         const errorMessage = error.message;
                    //         // The email of the user's account used.
                    //         const email = error.customData.email;
                    //         // The AuthCredential type that was used.
                    //         const credential = GoogleAuthProvider.credentialFromError(error);
                    //         console.log("Error: " + errorCode + " - " + errorMessage)
                    //         console.log("Email: "+ email + " - " + credential)
                    //         // ...
                    //     });
                    // }
                    // initDb() {
                        //     console.log("init db....");
                        //     // DayService.inintDb();
                        //     PlannerDataService.inintDb();
                        // }
                        
                        // componentDidMount(): void { PlannerDataService.initDb(); }
                        
                        render() {

                            return (


            <div className='appMainContainer'>
                {/* <GoogleLogin onSuccess={responseMessage} onError={()=>errorMessage} /> */}
                
                    <div>
                    {/* Menu</div> */}
                    <Routes>
                        <Route path={"/"} element={<Dashboard2 loggedIn={this.state.appLoggedIn} isOpen={false} userPreferences={{
                            hideAll: false
                        }} />} />
                        <Route path={"/activities"} element={<Activities/>} />
                        <Route path={"/presets"} element={<Presets isOpen={false} />} />
                        <Route path={"/deviceView"} element={<DeviceView hideAll={true}  />} />
                        {/* <Route path={"/user"} element={<User isOpen={false}  />} /> */}
                        {/* <Route path={"/test"} element={<Testing  />} />
                        <Route path={"/data"} element={<DataReaderTest  hideAll={false} />} /> */}
                    </Routes>
                    </div>
                    <div>

                        {/* Auth */}
                    </div>

                <div>
                    {/* <button onClick={toggle1}>Open Modal </button> */}
                </div>
            </div>

        );
    }
}

export default App3
