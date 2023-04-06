
import React,{Component} from "react";

export const buttonThemes = {
    primary: {
        color: "white",
        background: "#45c496"
    },
    secondary: {
        color: "whitesmoke",
        background: "#d91b42"
    }
}
export const userData = {
    user:
    {
        userName :"InitUser" as string, 
        loggedIn: false as boolean
    }
}

const modalIsOpen1 =  {
    modalIsOpen:{

        filter : false,
        update: false
    }
}
type modalStatus = {
    modalIsOpen: {
        // filter: boolean,
        // update: boolean
    }
}
// const MyContext = React.createContext({user:"nouser"});
const Context2 = React.createContext<modalStatus>(modalIsOpen1)//userData.user)


class ContextProvider extends Component {
    state = {
        modalIsOpen:{
            // filter: true,
            // update: true
        },
    }

    setModalOpen = (modalIsOpen) => {
        this.setState((prevState) => ({ modalIsOpen }))// filter: this.state.filter, update: this.state.update }))
    }
    render() {
        // const { children } = this.props
        const { modalIsOpen } = this.state
        const { setModalOpen } = this

        return (
            <Context2.Provider
                value={{
                    modalIsOpen,
                    // setModalOpen,
                }}
            >
                {/* {children} */}
            </Context2.Provider>
        )
    }
}



// export const ModalProvider = ModalContext.Provider;
export default Context2;
export const ModalConsumer = Context2.Consumer;
export {Context2 as ModalProvider}

















// class UserProvider extends Component {
//     // constructor(props){
//     //     super(props)
//     // };
//     state = {
//         user:{}
//     }
    
//     setUser = (user) => {
//         this.setState((prevState) => ({user}));
//     }
    
//     render() {
//              const MyContext = React.createContext(     {
//                         user: {},
//                         setUser: () => {}
//                     }
//                     );
   
        
//         const{user} = this.state
//         const {setUser}  =this
//         return(
//             <>
            
//                 <MyContext.Provider value={{
//                         user,
//                         setUser(){}
//                     }}
//                     >
                   
//                     </MyContext.Provider>
                    
//                     </>
//         )
//     }
// }
    
// export const UserConsumer = MyContext.Consumer

// export default MyContext;
// MyContext.displayName = 'MyDisplayName';
// export const ContextProvider = ({ children }) => {
//     const [items, setItems] = useState(0);
    
// 	return (
    
//         <MyContext.Consumer>
//         <MyContext.Provider>
// 		MyContext.Provider( value:{{ items, setItems }})}>
// 			{children}
// 		</Context.Provider>
// 	);
// };
