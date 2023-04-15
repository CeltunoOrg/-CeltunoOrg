import React , { Component}from 'react';
import { Routes, Route } from "react-router-dom";
import DayService from "./services/day-firebase-service"
import PresetDataService from "./services/preset-firebase-service"
// import DaysList2 from "./components/day-list2.component";
import "../styles/App.css"
import Activity from './components/activiy';
import Preset from './components/presets';
type State = {
        isOpen3: boolean
}
interface Props {
    children?: React.ReactNode
    isOpen3:boolean
}
class App3 extends Component <Props,State>{
    constructor(props: Props) {
        super(props);
        this.state ={
            isOpen3:false
        }
    }
    initDb() {
        console.log("init db....");
        DayService.inintDb();
        PresetDataService.inintDb();
    }
    
    // componentDidMount(): void {
   
    render() {

        return (

            
            <div className='appMainContainer'>
                  
                <div className='maingridContainer '>
                    <Routes>
                    <Route path={"/"} element={<Activity isOpen={false} />} />
                    <Route path={"/preset"} element={<Preset isOpen={false} />} />
                    {/* <Route path={"/days"} element={<DaysList2 testString="Days"/>} />
                    <Route path={"day/:ids"} element={<Day />} /> */}
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
