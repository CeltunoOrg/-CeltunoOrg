import React, { Component, useEffect, version } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { useMatch, useLocation, RouteMatch } from "react-router-dom"
import { logIn, logOut, signUp, anunLogIn } from "../../authProvider"
import { db as fireDb, firestore, useTheOnValue, useTheRef } from "../../../firebase"
import { getDatabase, onValue, set, orderByKey, orderByChild, query } from "firebase/database";
import IDay from "../../types/day.type";
import DayService from "../../services/day-firebase-service"


var theId = ""
const initFirebase = fireDb;
const db = getDatabase();

interface Props { };

type State = {
    dayModel: { day: IDay | null, key: string | null },
    dayId: string
};




const MatchDayIdFromURI = () => {

    let match = useMatch('day/:ids');

    const ids = match?.params.ids || "No ID";
    theId = ids;
    // useEffect(() => {
    //     console.log("effect"  +ids);
    //     theId = ids || "none";
    //     if(this !== undefined){            
    //     }
    // }, [ids]);
    return (//ids || "none"

        <input type="text" disabled readOnly value={theId}></input>

    );
}



export default class Day extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.addDay = this.addDay.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getDay = this.getDay.bind(this)
        this.updateDay = this.updateDay.bind(this)

        this.state = {
            dayModel: { day: null, key: null },
            dayId: "",
        };
    }

    // setId() {
    //     // const ttt = ProductDetails();
    //     this.setState({
    //         dayId: theId
    //     })
    // }; 
    handleChange(event) {
        // console.log(event.target.value);
        // console.log(event.target.name);
        let prevStateDay = this.state.dayModel.day;
        let prevStateKey = this.state.dayModel.key;
        if (prevStateDay === null) {
            prevStateDay = {
                name: "",
                formiddag: "",
                ettermiddag: "",
                natt: ""

            }
        }
        let newState = prevStateDay;
        try {

            switch (event.target.name) {
                case "name": {
                    newState.name = event.target.value;
                    prevStateDay = newState;
                    // this.setState({ day: prevState })
                    break;
                }
                case "formiddag": {
                    newState.formiddag = event.target.value;
                    prevStateDay.formiddag = newState.formiddag;
                    // this.setState({ day: prevState })
                    break;
                }
                case "ettermiddag": {
                    newState.ettermiddag = event.target.value;
                    prevStateDay = newState;
                    // this.setState({ day: prevState })
                    break;
                }
                case "natt": {
                    newState.natt = event.target.value;
                    prevStateDay = newState;
                    break;
                }
            }
        }
        finally {
            this.setState({ dayModel: { day: prevStateDay, key: prevStateKey } })
            console.log("New state: ")
            console.log(this.state.dayModel.day)

        }
    }


    addDay() {
        console.log("Adding day");
        var newDay: IDay;
        var result;
        console.log(this.state.dayModel.day)
        if (this.state.dayModel.day !== null) {
            newDay = this.state.dayModel.day;
            newDay.submitted = true;
            DayService.createdb(newDay).then((item) => {
                console.log(item);
            })
        }

        console.log("Day added?" + result)
    }

    getDay() {
        console.log("Fetching day: " + theId)

        // console.log("stateDAy:  " + this.state.dayId)

        const dBdAY = DayService.getOnedb1(theId)
            .then((snapshot) => {
                const day = snapshot.val() as IDay;

                if (snapshot.exists()) {
                    this.setState({
                        dayModel: { day: day, key: snapshot.key }
                    })
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            }).finally(() => {
                console.log("Got data");

            });
    }

    updateDay() {
        const day = this.state.dayModel.day;
        console.log("Updating day");
        console.log("Current state: ")
        console.log(day)
        DayService.updateItemDb(theId, day)
        console.log("Day Updated?");
        this.getDay();
        MatchDayIdFromURI
    }

    componentDidMount(): void {
        this.getDay();
        console.log("Loaded day page");
    }
    render() {
        return (

            <>
                <div className='box' >
                    {/* <button onClick={ this.alogIn}>
            Login
        </button> */}
                    {/* <button onClick={this.getDay}>        
            get data
        </button> */}

                    {/* <div className='dayForm'> */}
                    <form onSubmit={this.state.dayModel.key !== null ? this.updateDay : this.addDay}>
                        <div className='box2'>

                            <label>
                                ID:<br/> 
                                
                                <MatchDayIdFromURI />
                            </label>

                            <label>
                                Name:<br/> 
                                <input type="text" name="name" value={this.state.dayModel.day?.name} onChange={this.handleChange} />
                            </label>
                        </div>
                        <div className='box3'>
                            <label>
                                Formiddag:<br/> 
                                <input type="text" name="formiddag" value={this.state.dayModel.day?.formiddag} onChange={this.handleChange} />
                                <div className='imagecontainer row'>
                                    <img onError={e=>{e.currentTarget.src = "/images/error.png"}} src={"/images/" + this.state.dayModel.day?.formiddag} alt={this.state.dayModel.day?.formiddag}></img>
                                </div>
                            </label>
                        </div>
                        <div className='box3'>
                            <label>
                                Ettermiddag:<br/> 
                                <input type="text" name="ettermiddag" value={this.state.dayModel.day?.ettermiddag} onChange={this.handleChange} />
                                <div className='imagecontainer row'>
                                    <img onError={e=>{e.currentTarget.src = "/images/error.png"}} src={"/images/" + this.state.dayModel.day?.ettermiddag} alt={this.state.dayModel.day?.ettermiddag}></img>
                                </div>
                            </label></div>
                        <div className='box3'>
                            <label>
                                Natt:
                                <br/>      
                                <input type="text" name="natt" value={this.state.dayModel.day?.natt} onChange={this.handleChange} />
                                <div className='imagecontainer row'>
                                    <img onError={e=>{e.currentTarget.src = "/images/error.png"}} src={"/images/" + this.state.dayModel.day?.natt} alt={this.state.dayModel.day?.natt}></img>
                                </div>
                            </label>
                        </div>

                        <button onClick={this.state.dayModel.key !== null ? this.updateDay : this.addDay}>SAve</button>
                        <input type="submit" value="Submit" />

                    </form>
                    {/* </div> */}


                    {/* <div className=''> */}



                    {/* </div> */}

                </div>
            </>
        )
    }
}
