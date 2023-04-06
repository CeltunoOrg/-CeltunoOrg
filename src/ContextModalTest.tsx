
// import React,{Component} from "react";

// // const isOpenTest =  {
// //     modalIsOpen:{

// //         filter : false,
// //         update: false
// //     }
// // }
// type ModalProps = {
//     // modalIsOpen: {
//     filter: boolean,
//     update: boolean
//     // }
// }
// const initialState: ModalProps = {
//     // modalIsOpen: {
//     filter: false,
//     update: false
//     // }
// }
// // const MyContext = React.createContext({user:"nouser"});
// const ModalContext = React.createContext(initialState)//)<modalStatus>(modalIsOpen1)//userData.user)


// class ModalProvider extends Component {
//     state = {
//         modalIsOpen:{
//             // filter: true,
//             // update: true
//         },
//     }

//     setModalOpen = (modalIsOpen) => {
//         this.setState((prevState) => ({ modalIsOpen }))// filter: this.state.filter, update: this.state.update }))
//     }
//     render() {
//         // const { children } = this.props
//         const { modalIsOpen } = this.state
//         const { setModalOpen } = this

//         return (
//             <ModalContext.Provider
//                 value={{
//                     modalIsOpen,
//                     // setModalOpen,
//                 }}
//             >
//                 {/* {children} */}
//             </ModalContext.Provider>
//         )
//     }
// }



// // export const ModalProvider = ModalContext.Provider;
// export default ModalContext;
// export const ModalConsumer = ModalContext.Consumer;
// export {ModalProvider}

















// // class UserProvider extends Component {
// //     // constructor(props){
// //     //     super(props)
// //     // };
// //     state = {
// //         user:{}
// //     }
    
// //     setUser = (user) => {
// //         this.setState((prevState) => ({user}));
// //     }
    
// //     render() {
// //              const MyContext = React.createContext(     {
// //                         user: {},
// //                         setUser: () => {}
// //                     }
// //                     );
   
        
// //         const{user} = this.state
// //         const {setUser}  =this
// //         return(
// //             <>
            
// //                 <MyContext.Provider value={{
// //                         user,
// //                         setUser(){}
// //                     }}
// //                     >
                   
// //                     </MyContext.Provider>
                    
// //                     </>
// //         )
// //     }
// // }
    
// // export const UserConsumer = MyContext.Consumer

// // export default MyContext;
// // MyContext.displayName = 'MyDisplayName';
// // export const ContextProvider = ({ children }) => {
// //     const [items, setItems] = useState(0);
    
// // 	return (
    
// //         <MyContext.Consumer>
// //         <MyContext.Provider>
// // 		MyContext.Provider( value:{{ items, setItems }})}>
// // 			{children}
// // 		</Context.Provider>
// // 	);
// // };
