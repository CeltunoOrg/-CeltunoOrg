import React, { Component, useRef, useEffect, useState } from "react";
import DayDataService from "../services/day-firebase-service";
// import Day from "./day.component";
import IDay from "../types/day.type";
import { getAuth, User } from "firebase/auth";



// import { FirebaseAuthProvider, useFirebaseAuth } from "../firebaseAuthContext";
import fireb, { auth, db, useTheOnValue, useTheRef } from "../../firebase"
import { logIn, logOut, signUp, anunLogIn } from "../authProvider"
// import firebase from "../firebase" //"firebase/app";
// import config from "../config";
import "../../styles/App.css"
import { get, onValue } from "firebase/database";
import dayFirebaseService from "../services/day-firebase-service";
import { connectFirestoreEmulator } from "firebase/firestore";


var dayArray = new Array<IDay>
var filteredDayArray = new Array<IDay>
var active = false;
interface Props { };

type State = {
  // days: Array<IDay>,
  // currentDay: IDay | null,
  // currentIndex: number
  auser: string | null
  buttonText: string | null
  days: IDay[] | null
  daysFiltered: IDay[] | null
};

// const auth = getAuth();

export default class DaysList extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.setDays = this.setDays.bind(this);
    this.getFilteredDays = this.getFilteredDays.bind(this);
    this.theLog = this.theLog.bind(this);
    this.state = {
      auser: "Not loggd in?",
      buttonText: "N/A",
      days: null,
      daysFiltered: null
    };
  }
  theLog() {
    console.log("LOG")
    return <div>Log</div>
  }

  setDays() {
    this.setState({
      days: dayArray
    })
  };

  getAllDbEnt2() {
    // const fromDb = DayDataService.getdbAll()
    dayArray.length = 0;
    active = true;
    if (filteredDayArray.length >1){

      console.log("filtAr");
      console.log(filteredDayArray)
      return filteredDayArray;
    }
    const queryRef = DayDataService.getdbAll().then((data) => {

      // useTheRef(db, '/');
      useTheOnValue(data, (snapshot) => {
        const data = snapshot.val();

        if (snapshot.exists()) {
          console.log("Mapping data:");
          snapshot.forEach(function (childSnapshot: any) {
            let key = childSnapshot.key;
            let data = childSnapshot.val() as IDay;
            data.key = key;
            dayArray.push(data);
          })
          console.log("AllDataDBlength: ");
          console.log(dayArray.length)
        }
      })
    }).finally(() => {
      filteredDayArray = dayArray
      console.log("DOne")
      // this.setDays
    })
    // this.theLog();

  }
  getAllDbEnt() {
    // console.log(this.state.daysFiltered)

    const fromDb = DayDataService.getdbAll()
      .then(function (result) {
        return useTheOnValue(result, (snapshot) => {

          // const inComingData = snapshot.val();
          dayArray.length = 0;
          if (snapshot.exists()) {
            console.log("Mapping data:");
            snapshot.forEach(function (childSnapshot: any) {
              let key = childSnapshot.key;
              let data = childSnapshot.val();
              dayArray.push(data);
            })
            console.log("AllDataDBlength: ");
            console.log(dayArray.length)

            // return dayArray            
          }
        })

      }).finally(function () {

        return dayArray
      }
      ).catch((error) => {
        console.error(error);
      });
    // this.setDays();

  }

  setuser(value: string | null) {
    this.setState({
      auser: value,

    });
  }

  setButtonText(value: string | null) {
    this.setState({
      buttonText: value
    })
  }
  setArray() {
    if (this.state.days !== null)
      dayArray = this.state.days;
  }

  getFilteredDays() {

    //  this.setArray();
    // dayArray = this.state.days;
    const filters = ["Mandag", "Tirsdag"];
    if (filters.length < 1) {//this.state.daysFiltered === null) {
      console.log("No filter days")
      return null;
    }
    if (dayArray === null) {
      console.log("No state days")

      return null;
    }
    // console.log(this.state.days)
    var res = dayArray.filter(item => filters.includes(item.name));
    console.log("res");
    console.log(res);

    filteredDayArray = res;
    const setA = () => {

      this.setState({
        daysFiltered: filteredDayArray
      })
    };
    // return res;
  }

  clearFilter(){
    filteredDayArray. length = 0;
    filteredDayArray = dayArray;
  }
  UserName() {

    // console.log("User: " + auth.currentUser?.email)
    // const user = useFirebaseAuth();
    return <div id="userstate">{auth.currentUser?.displayName || "unauthenticated"}</div>;
  }

  UserEmail() {
    const user2 = auth.currentUser;
    // const user = useFirebaseAuth();
    return <div>{user2?.email || "-"}</div>;

  }

  componentDidMount() {
    this.setState({
      days: dayArray,
      daysFiltered: filteredDayArray 
    })


  }
  gotoDay(key: string | null | undefined) {
    if (key !== null && key !== undefined)
      window.location.pathname = "day/" + key;
  }
  render() {

    let uid = "";

    auth.onAuthStateChanged((user) => {
      const loggedInAs = document.getElementById("userName");

      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User

        uid = user.uid;

        this.setuser(user.email)
        this.setButtonText("Log out");
        if (loggedInAs) {
          loggedInAs.innerHTML = user?.email || "unauthenticated"
        }
      }
      else {
        // User is signed out
        // ...    
        // console.log("Signed out id ");
        if (loggedInAs) {
          loggedInAs.innerHTML = "unauthenticated"
        }
        this.setButtonText("Log in")
        this.setuser("Not logged in")

      }
    })
    let anum = 1;
    return (

      <>
        <div className="boxlist ">
          {/* <div className="box"> */}
          [ {this.state.auser} ]

          <button className="btn-success"
            onClick={() => {
              if (auth.currentUser) {
                logOut()
              }
              else {
                logIn("test1@test.tst", "passw1");
              }
            }
            }>
            {this.state.buttonText}
          </button>


          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={anunLogIn}
          >
            Anon
          </button>
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.getAllDbEnt2}
          >
            Get all
          </button>
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={
              this.getFilteredDays}
          >
            filter
          </button>
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={
              this.clearFilter}
          >
            filter
          </button>
          {/* </div> */}
        </div>


        <div className="maincontainer">
          <div className="col-md-6">
            <h4>Day List</h4>
          </div>
          <div>
            {
              active ? (
                //   <div>
                //     <div className="grid-item onthetop">
                //      <div></div>
                //     </div>
                //     <div className="grid-item">
                //       <ul>
                //         <li key={'b1'}>
                //           Formiddag
                //         </li >
                //         <li key={'b2'}>
                //           Ettermiddag
                //         </li>
                //         <li key={'b3'}>
                //           Natt
                //         </li >
                //       </ul>
                //     </div>
                //   </div>
                <div className="grid-container">

                  {
                    filteredDayArray?.map((day, index) =>
                    (
                      <div className="dayItem" onClick={() => { this.gotoDay(day.key) }}>
                        <div className="dKey" >
                          {/* {anum ++} {" - " + day.key} */}
                          {day.name}
                        </div>
                        {/* <div className="grid-item onthetop">
                          <ul className="" >
                            <li key={index+anum +"-a"+ day.name} >
                              
                              
                            </li>
                          </ul>
                        </div> */}
                        <div className="grid-item">
                          <ul className="">
                            <li key={"1-" + anum + index}>
                              {/* {day.formiddag} */}
                              <br />
                              <div className="imagecontainer">

                                <img onError={e => { e.currentTarget.src = "/images/error.png" }} src={"/images/" + day.formiddag} alt={day.formiddag}></img>
                              </div>
                            </li>
                            <li key={"2-" + anum + index}>
                              {/* {day.ettermiddag} */}
                              <div className="imagecontainer">

                                <img onError={e => { e.currentTarget.src = "/images/error.png" }} src={"/images/" + day.ettermiddag} alt={day.ettermiddag}></img>
                              </div>
                            </li>
                            <li key={"3-" + anum}>
                              {/* {day.natt} */}
                              <div className="imagecontainer">

                                <img onError={e => { e.currentTarget.src = "/images/error.png" }} src={"/images/" + day.natt} alt={day.natt}></img>
                              </div>
                            </ li>
                          </ul>
                        </div>
                      </div>
                    ))
                  }

                </div>

              )
                :
                (
                  <div className="box">
                    <a onClick={this.getAllDbEnt2}>
                      Click to fetch
                    </a>
                  </div>
                )
            }
          </div>
        </div >
      </>
    );
  }
}