import  React from "react";
import  {createRoot} from "react-dom/client";
import {BrowserRouter , useParams} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import "../styles/App.css"
// import '../styles/tmpstyle.module.css'
import App from './App';
import App2 from './App2';


// function BlogPost() {
// let { ids } = useParams();
// console.log("tId: "+ ids)
// return <div style={{ fontSize: "50px" }}>
//        Now showing post {ids}
//      </div>;
// }
const cont = document.getElementById('root');
const root = createRoot(cont!);
const mySuer = 1;
const AppChoice = () =>{
    if (mySuer >= 2){
        return <App/>
    }
    else{
        return <App2 isOpen3={false}/>
    }
}
root.render(
    <div className="App ">
        
    <BrowserRouter>

    { AppChoice()}
    
    </BrowserRouter>
    </div>
);