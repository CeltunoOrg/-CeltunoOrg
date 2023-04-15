// import React , { Component}from 'react';
// import { Routes, Route } from "react-router-dom";
// import * as DayService from "./services/day-firebase-service"
// import DaysList2 from "./components/day-list2.component";
// import "../styles/App.css"
// type State = {
//         isOpen3: boolean
// }
// interface Props {
//     children?: React.ReactNode
//     isOpen3:boolean
// }
// class App2 extends Component <Props,State>{
//     constructor(props: Props) {
//         super(props);
//         this.state ={
//             isOpen3:false
//         }
//     }
//     initDb() {
//         console.log("init db....");
//         DayService.default.inintDb();
//     }
    
//     // componentDidMount(): void {
//     //     let ttt  =0;
//     //     if(ttt === null)
//     //         ttt = 1;
//     // }
//     handleOpenState = (isOpen) =>{            
//        console.log("handleopen")
//        const newState = isOpen
//        this.setState(
//            {
//                isOpen3: newState
//            }
//        )
// //    return newState;//useModal().isOpen3
//    }

//     render() {
//     // }
//     //     const toggle1 = () => {
//     //         let ttt : boolean
//     //         console.log("toggle")
//     //         return useModal().toggle
//     //     }
//         // const { isOpen3, toggle} = useModal()
//         // const handleOpen = () => useModal();
//         // const btnvclick = () =>{ this.handleOpenState(this.state.isOpen3);}
//         // const modalIsOpen ={filter : false, update:false}
//         return (

            
//             <div className='appMainContainer'>
//                     {/* value={modalIsOpen}> */}
//                 <div className='maingridContainer '>
//                     {/* <button onClick={btnvclick}>Toggle</button> */}
//                 {/* <TestModal isOpen3={this.state.isOpen3} toggle={handleOpen} > */}
// {/* modal            </TestModal> */}
//                     <Routes>
//                     <Route path={"/"} element={<DaysList2 />} />
//                     {/* <Route path={"/days"} element={<DaysList2 testString="Days"/>} />
//                     <Route path={"day"} element={<Day />} />
//                     <Route path={"day/:ids"} element={<Day />} /> */}
//                     </Routes>
//                 </div>
//                 <div>
//                 {/* <button onClick={toggle1}>Open Modal </button> */}
//                 {/* <Modal isOpen3={false} toggle={toggle1}></Modal> */}
//                 </div>
//             </div>

//         );
//     }
// }

// export default App2
