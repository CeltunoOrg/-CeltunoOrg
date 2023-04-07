import React, { useState } from "react";
// import { ModalProvider } from "../ContextModalTest";




export default function ModalFunc(props) {
    
    const [sOpen, setModalState] = useState(false)

    const handleClose = () => setModalState(false);
    const handleShow = () => setModalState(true);

    return (
        <div>
            <div className='box'>
                <label>
                    Name:
                    <input type="text" name="name" value={props} readOnly={true} />
                </label>
                {/* <ModalProvider i>

                </ModalProvider> */}
            </div>

        </div>
    );



}



















// import React, { Component } from 'react'
// import ModalContext from '../ModalContext'
// type State = {
//     // modalIsOpen: modalStatus
//     modalIsOpen: {
//         filter: boolean,
//         update: boolean
//     }
// }
// interface Props {
//     // modalIsOpen: modalStatus
//     // // modalIsOpen:{
//     //     filter : boolean,
//     // update: boolean
//     aProp: boolean
//     // }
// }
// type modalStatus = {
//     modalIsOpen: {
//         filter: boolean,
//         update: boolean
//     }
// }
// // const modalDefault = {
// //     // modalIsOpen: {
// //     filter : false,
// //     update:true
// //     // }
// // }
// // const ModalContext = React.createContext(modalDefault)

// class ModalProvider1 extends Component<Props, State> {
//     constructor(props) {
//         super(props)
//         // Context state
//         this.state = {
//             modalIsOpen: {
//                 filter: false,
//                 update: false
//             },

//         }
//     }

//     // Method to update state
//     setModalOpen = (modalIsOpen) => {
//         this.setState((prevState) => ({ modalIsOpen }))// filter: this.state.filter, update: this.state.update }))
//     }

//     render() {
//         const { children } = this.props
//         const { modalIsOpen } = this.state
//         const { setModalOpen } = this

//         return (
//             <div>

//                 <ModalContext.Provider
//                     value={{
//                         setModalOpen,
//                         modalIsOpen,
//                     }}
//                 >
//                     {children}
//                 </ModalContext.Provider>
//             </div>
//         )
//     }
// }

// export default ModalContext1

// export { ModalProvider1 }