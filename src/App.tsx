import React, { Component, useEffect } from 'react';
import { Routes, Link, Route } from "react-router-dom";
import { useParams, useMatch } from 'react-router';

import * as DayService from "./services/day-firebase-service"
import DaysList from "./components/day-list.component";
import Add from "./components/add-day";
import Update from "./components/update-day";
import Day from "./components/Unused/day";
import "../styles/App.css"
// import { withRouter } from './withrouter';
import { config as conf } from "../config-fb"
import IDay from './types/day.type';
// function BlogPost() {
//     const {ids} = useParams();

//     console.log("tId: " + ids);
//     return <div style={{ fontSize: "50px" }}>
//         2Now showing post {ids}
//     </div>;
// }
// function withParams(Component) {
//     return props => <Component {...props} params={useParams()} />;
//   }
// const ProductDetails = () => {
//     // const query = new URLSearchParams(window.location.pathname);
//     // const qty = query.get('qty');
//     // const ids = query.get('ids');

//     const match = useMatch('/day/:ids');
//     console.log(match?.params.ids)
//     const ids= match?.params.ids
//     useEffect(() => {
//         console.log({ ids });
//    }, [ids]);
//    return(
//     <div>
//       IDS  {ids}
//     </div>
//    )
//         }
class App extends React.Component {



    initDb() {

        console.log("init db....");
        DayService.default.inintDb();
    }

    componentDidMount(): void {

        // let { id } = this.props.params;
        // const ttt = this.props;
        // console.log(ttt.params)
    }
    render() {

        // useEffect( () => {
        //     // // get the todos
        //     // getTodos();
        //     // // reset loading
        //     // setTimeout( () => {
        //     //   setLoading(false);
        //     // },2000)
        //  },[]);

        // const allfromDB = DayService.default.getdbAll()
        // console.log(allfromDB);

        // const fromDb = DayService.default.getOnedb("/myDay/1/")

        // const addOne = () => { DayService.default.create(); }


        return (

            <div className='container'>

                <nav className="thetop navbar navbar-expand navbar-dark bg-dark">
                    <a href="/days" className="navbar-brand">
                        Day App
                        {/* <ProductDetails/> */}
                    </a>
                    <div id="userName"></div>
                    <div className="navbar-nav mr-auto">
                        {/* 
                        <li className="nav-item">
                            <Link to={"/days"} className="nav-link">
                                Days
                            </Link>
                        </li> */}

                        <li className="nav-item">
                            <Link to={"day/"} className="nav-link">
                                Day
                            </Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link to={"/add"} className="nav-link">
                                Add
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/dayplan"} className="nav-link" >
                                Dayplan
                            </Link>
                        </li> */}
                    </div>
                </nav>

                <div className='middle '>
                    {/* mt-3'> */}

                    {/* <h1 className={'2title'}>
                    Todos app
                </h1> */}

                    {/* < div className={'maincontainer'} > */}
                    {/* <main className={'main'}> */}
                    {/* {React.createElement('div', null, `Hello ${consept} ! `)} */}

                    <Routes>

                        <Route path={"/"} element={<DaysList />} />
                        <Route path={"/days"} element={<DaysList />} />
                        <Route path={'/update/{id}'} element={<Update />} />
                        <Route path={"/add"} element={<Add />} />
                        <Route path={"day"} element={<Day />} />
                        <Route path={"day/:ids"} element={<Day />} />
                        {/* <Route  path="/add" element={<AddDay/>} /> */}

                    </Routes>

                    {/* </main> */}

                </div>
                <footer className={'footer'}>
                    <a
                        href="#"
                        rel="noopener noreferrer"
                    >
                        Day App
                    </a>
                    {/* <button onClick={addOne}>
                            Create
                        </button> */}
                    <button onClick={this.initDb} disabled>
                        Init db
                    </button>
                </footer>
                {/* <BlogPost /> */}
            </div>
        );
    }
}



// const root = createRoot(document.getElementById("root") as HTMLElement);
// render (<App/>, document.getElementById("root"));
export default App
