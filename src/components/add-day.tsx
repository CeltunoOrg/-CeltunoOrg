import React, { Component } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { render } from 'react-dom';
import { useLocation } from "react-router-dom"
import { logIn, logOut, signUp, anunLogIn } from "../authProvider"
import { db as fireDb, firestore, useTheOnValue, useTheRef } from "../../firebase"
import { getDatabase, onValue, set, orderByKey, orderByChild } from "firebase/database";
import IDay from "../types/day.type";
import DayService from "../services/day-firebase-service"
import dayFirebaseService from '../services/day-firebase-service';
const initFirebase = fireDb;
const db = getDatabase();

interface Props {
    children?: React.ReactNode
 }

type State = {
    day: IDay | null
};




// const quer = new URLSearchParams(useLocation().search);
// const id = quer.get("id") || "";
export default class Login extends Component<Props, State> {
    constructor(props) {
        super(props);
        // this.refreshList = this.refreshList.bind(this);
        // this.setActiveDay = this.setActiveDay.bind(this);
        // this.adduser = this.adduser.bind(this);
        // this.onDataChange = this.onDataChange.bind(this);
        this.addDay = this.addDay.bind(this)
        // this.getDay = this.getDay.bind(this)
        this.state = { day : null} ;
        // {
        //     day: {
        //         name: "",
        //         formiddag: "",
        //         ettermiddag: "",
        //         natt: ""

        //     },
    }

    addDay() {
        console.log("Adding day");
        console.log(this.state.day)
        // DayService.createdb(this.state.day)
        console.log("Day added?")
    }

    // getDay() {
    //     const tkk = DayService.getOnedb1("1")
    //     .then((snapshot) => {
    //         console.log(snapshot.val());
    //         if (snapshot.exists()) {
    //             console.log("snap")
    //             console.log(snapshot.val());
    //             this.setState({
    //               day: snapshot.val()  
    //             })

    //             // return snapshot.val() as IDay;
    //         } else {
    //             console.log("No data available");
    //         }
    //     }).catch((error) => {
    //         console.error(error);
    //     });




    // adduser(email, password) {
    //     const auth = getAuth();

    //     createUserWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {
    //             // Signed in 
    //             const user = userCredential.user;
    //         }
    //             // ...
    //         )
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             // ..
    //         });
    // }
    // alogIn = ()  => {
    //     logIn("r","r")
    // } 

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

                        <form onSubmit={this.addDay}>
                            <label>
                                Name:
                                <input type="text" name="name" value={this.state.day?.name} />
                            </label>
                            <label>
                                FOr:
                                <input type="text" name="formiddag" value={this.state.day?.formiddag} />
                            </label>
                            <label>
                                Etter:
                                <input type="text" name="ettermiddag" value={this.state.day?.ettermiddag} />
                            </label>
                            <label>
                                Natt:
                                <input type="text" name="natt" value={this.state.day?.natt} />
                            </label>
                            <input type="submit" value="Submit" />
                            <button onClick={this.addDay}>Save</button>
                        </form>
                        <div className='box'>
                            <img src={"/images/" + this.state.day?.formiddag} alt={this.state.day?.formiddag}></img>
                        </div>
                    </div>

                </div>


            </>
        )
    }
}
