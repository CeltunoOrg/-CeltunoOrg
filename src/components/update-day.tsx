import React, { Component } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { render } from 'react-dom';
import { useLocation , useParams} from "react-router-dom"
import { logIn, logOut, signUp, anunLogIn } from "../authProvider"
import { db as fireDb, firestore, useTheOnValue, useTheRef } from "../../firebase"
import { getDatabase, onValue, set, orderByKey, orderByChild } from "firebase/database";
import IDay from "../types/day.type";
import DayService from "../services/day-firebase-service"
const initFirebase = fireDb;
const db = getDatabase();

interface Props {
    propItem: string
 }

type State = {
    day: IDay | null
    dayId : string
};
// const dayId = "1";

export default class Login extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.updateDay = this.updateDay.bind(this)
        this.getDay = this.getDay.bind(this)
        this.state = {
            day: null,
            dayId: "1"
        };
    }
    setId(){
            const{id} = useParams();
            this.setState({
                dayId : id || "1"
            })

    }
    updateDay() {
        console.log("Adding day");
        DayService.updateItemDb("1", this.state.day)
        console.log("Day added?")
    }
    
    getDay() {
        const getTheeDay = DayService.getOnedb1(this.state.dayId)
        .then((snapshot) => {
            console.log(snapshot.val());
            if (snapshot.exists()) {
                console.log("snap")
                console.log(snapshot.val());
                this.setState({
                    day: snapshot.val()
                })
                
                // return snapshot.val() as IDay;
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    
    render() {
        return (
        
            <>
                <div>
                    {/* <button onClick={ this.alogIn}>
                        Login
                    </button> */}
                    {/* <button onClick={this.getDay}> 
                        get data
                    </button> */}
                    <div className='box'>

                        {/* <form onSubmit={this.updateDay}> */}
                            <label>
                                Name:
                                <input type="text" name="name" value={this.state.day?.name} readOnly={true} />
                            </label>
                            <label>
                                FOr:
                                <input type="text" name="name" value={this.state.day?.formiddag} />
                            </label>
                            <label>
                                Etter:
                                <input type="text" name="name" value={this.state.day?.ettermiddag} />
                            </label>
                            <label>
                                Natt:
                                <input type="text" name="name" value={this.state.day?.natt} />
                            </label>
                            <input type="submit" value="Submit" />

                            <button onClick={this.updateDay}>Save</button>
                        {/* </form> */}
                    </div>

                </div>


            </>
        )
    }
}
