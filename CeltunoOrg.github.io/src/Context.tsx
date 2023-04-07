
import React, {Component} from "react";


// const MyContext = React.createContext({user:"nouser"});
export const MyContext = React.createContext({user:"nouser"})
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
