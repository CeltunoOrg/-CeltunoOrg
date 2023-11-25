import React from "react";
import { Root, createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter, useParams } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import Activities from "./components/activities";
import './index.css';
import "../styles/App.css"
import App3 from "./App3";
import DeviceView from "./components/deviceView";

// function BlogPost() {
// let { ids } = useParams();
// console.log("tId: "+ ids)
// return <div style={{ fontSize: "50px" }}>
//        Now showing post {ids}
//      </div>;
// }
let root: Root
const cont = document.getElementById('root');
if (cont) {

    root = createRoot(cont!);

    const AppChoice = (choice: number) => {

        if (choice === 1) {
            return <App3 isOpen3={false} />
        }
        else if (choice === 2) {
            return <Activities />
        }
        else {
            return <DeviceView hideAll={true} />
        }
    }
    root.render(
        <div className="App ">
             {/* <GoogleOAuthProvider clientId="386932037035-k8v833noqjk7m4***********.apps.googleusercontent.com"> */}
{/* <React.StrictMode> */}

            <HashRouter>

                {/* <BrowserRouter> */}

                {AppChoice(1)}

                {/* </BrowserRouter> */}
            </HashRouter>
{/* </React.StrictMode> */}
             {/* </GoogleOAuthProvider> */}
        </div>
    );
}