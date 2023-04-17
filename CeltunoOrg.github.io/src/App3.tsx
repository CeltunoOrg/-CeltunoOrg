import React, { Component } from 'react';
import { Routes, Route } from "react-router-dom";
// import DayService from "./services/day-firebase-service"
import PresetDataService from "./services/preset-firebase-service"
// import DaysList2 from "./components/day-list2.component";
import "../styles/App.css"
import Activities from './components/activities';
import Presets from './components/presets';
import Dashboard from './components/dashboard';
import DeviceView from './components/deviceView';
import Testing from './components/stepper';
type State = {
    isOpen3: boolean
}
interface Props {
    children?: React.ReactNode
    isOpen3: boolean
}
class App3 extends Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            isOpen3: false
        }
    }
    initDb() {
        console.log("init db....");
        // DayService.inintDb();
        PresetDataService.inintDb();
    }

    // componentDidMount(): void {

    render() {

        return (


            <div className='appMainContainer'>

                <div className='maingridContainer '>
                    <Routes>
                        <Route path={"/"} element={<Dashboard isOpen={false} userPreferences={{
                            hideAll: false
                        }} />} />
                        <Route path={"/activities"} element={<Activities isOpen={false} />} />
                        <Route path={"/presets"} element={<Presets isOpen={false} />} />
                        <Route path={"/deviceView"} element={<DeviceView hideAll={true}  />} />
                        <Route path={"/test"} element={<Testing  />} />
                    </Routes>
                </div>
                <div>
                    {/* <button onClick={toggle1}>Open Modal </button> */}
                </div>
            </div>

        );
    }
}

export default App3
