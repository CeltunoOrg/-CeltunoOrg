import React, { Component, useEffect, useState, useCallback } from "react";
import DayDataService from "../services/day-firebase-service";
import IDay from "../types/day.type";

import { useTheOnValue } from "../../firebase"// { auth, useTheOnValue } from "../../firebase"
import "../../styles/App.css"
import SetFilter from "./FIlterModal";
import ModalItem1 from "./OLDModal";
import UpdateDayModal from "./updateDayModal";

// import { MyContext } from "../Context";
import Context2, { ModalConsumer, buttonThemes, userData } from "../Context2"
// import ModalContext from "../Context2"
import { connectFirestoreEmulator } from "firebase/firestore";
import TestModal from "./TestModal";




const dayArray = new Array<IDay>
let filteredDayArray = new Array<IDay>

const dayNameArray = new Array<{
  value: number,
  label: string
}>
const selectedFilters = new Array<{
  value: number,
  label: string
}>

let theDay = ""
let selectDayAr = new Array<string>
let active = false;

interface Props {
  children?: React.ReactNode
  days?: Array<IDay>
  selectedDay: string
  // testString?: string
  // isOpen: boolean
}

// const handleDays = (e) =>{
//   e.preventDefault();
//   setDays({
//     ...days2,
//     name: e.target.value,
//   });
// }
type State = {

  user: {
    userName: string,
    loggedIn: boolean
  }
  buttonText: string | null
  days: IDay[] | null
  daysFiltered: IDay[] | null
  filteredDaysNames: string[]
  selectChoices: object
  selectedDay: string
};
let tName = "qwe";


export default class DaysList2 extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.getFilteredDays = this.getFilteredDays.bind(this);
    // this.setDays = this.setDays.bind(this);
    this.state = {
      user: {
        userName: "N/A",
        loggedIn: false
      },
      selectChoices: {},
      buttonText: "N/A",
      days: null,
      daysFiltered: null,
      filteredDaysNames: [],
      selectedDay: ""
    };

  }

  setDays() {
    this.setState({
      days: dayArray,
      daysFiltered: filteredDayArray ?? dayArray,
      selectedDay : theDay
      
    })
    console.log(this.state.selectedDay)

  }

  getAllDbEnt2() {
    dayArray.length = 0;
    active = true;
    if (filteredDayArray.length > 2221) {

      console.log("filtAr");
      console.log(filteredDayArray)
      return filteredDayArray;
    }
    const queryRef = DayDataService.getdbAll().then((data) => {

      // useTheRef(db, '/');
      useTheOnValue(data, (snapshot) => {
        const snapshotValue = snapshot.val();
        console.log(data.toJSON)
        if (snapshot.exists()) {
          console.log("Mapping data:");
          snapshot.forEach(function (childSnapshot) {
            const key = childSnapshot.key;
            const childData = childSnapshot.val() as IDay;
            childData.key = key;
            dayArray.push(childData);
          })
          console.log("AllDataDBlength: ");
          console.log(dayArray.length)
          filteredDayArray = dayArray
          console.log("DOne")
          dayArray.map((item, index) => {
            dayNameArray.push(
              {
                value: index,
                label: item.name//.toLocaleUpperCase()
              })
          })
          tName = dayArray[0].name
          this.setDays();
        }
      })
    }).finally(() => {
      console.log("fetched " + dayArray.length + " days")
      
      console.log("Finally")
    })

  }

  setButtonText(value: string | null) {
    this.setState({
      buttonText: value
    })
    // console.log("setTxt")
  }

  getFilteredDays() {

    const filters = selectDayAr;
    // .map((item) =>{
    //   tmpAr.push(item.value)

    // })
    //  ["Mandag", "Tirsdag"];
    if (filters.length < 1) {//this.state.daysFiltered === null) {
      console.log("No filter days")
      return null;
    }
    if (dayArray === null) {
      console.log("No state days")

      return null;
    }

    const res = dayArray.filter(item => filters.includes(item.name));
    console.log("res");
    console.log(res);

    filteredDayArray = res;
  }

  clearFilter() {
    if (selectDayAr.length > 0) {

      filteredDayArray.length = 0;
      filteredDayArray = dayArray;
      selectDayAr.length = 0;
      // this.getAllDbEnt2();
    }
  }

  aTest() {
    console.log("first")
    if (this.state.days)
      tName = this.state.days[0].name;
    console.log(tName);
    // useEffect(() => {

    //   return () => {
    //     console.log("second")
    //   }
    // }, [])

  }
  changeContext = () => {
    console.log("#state    -> " + this.state.user.userName)
    console.log("#userData -> " + userData.user.userName)
    // console.log("#props    -> " + this.props.testString)
    console.log("#propschi -> " + this.props.children)
    // this.setState(state => ({
    //   user: {
    //     userName: state.user.userName === userData.user.userName ? userData.user.userName : "NewUser",
    //     loggedIn: state.user.loggedIn === true ? false : true,
    //   }
    //   // buttonTheme: state.buttonTheme === buttonThemes.primary ? buttonThemes.secondary : buttonThemes.primary,
    // }));
    return null
  }

  openFilters = () => {
    <SetFilter daysFromParent={dayArray} myCallBack={this.handleReturn} choiceNames={dayNameArray} currentfilter={selectedFilters} ></SetFilter>
  }

  parseTheInt(stringToCHeck: string | null | undefined) {
    if (stringToCHeck === null || stringToCHeck === undefined)
      return 0;

    return Number.parseInt(stringToCHeck.toString() ?? 0)
  }
  checkData = (values: IDay[]) => {
    console.log("Start check " + tName);
    if (values[0].name !== tName) {
      console.log("Checking....")
      this.setState({
        filteredDaysNames: values.map(item => item.name)
      });
    }
    selectDayAr = values.map(item => item.name);

    // values.map(item => selectedFIlters.push({value: this.parseTheInt(item.key),  label: item.name}))

    console.log("End  check " + this.state.filteredDaysNames[0]);
    return null;

  }
  handleReturn = (data: IDay[]) => {
    console.log("Modal return data:");
    console.log(data);
    if (!data || data.length === 0)
      return false;

    tName = data[0].name
    this.checkData(data)
    return true
  }

  getDateDay() {
    const date = new Date();
    const dateDayName = date.getDay();
    return dateDayName;
  }
  
  
  setKeyFromDate(){
    const d = this.getDateDay();
    if(d != null && d != undefined && d >0){
      // theDay = d.toString()
      console.log("Key from date:")
      console.log(d);
      this.gotoDay(d.toString())
      return d.toString();
    }
  }
  componentDidMount() {

    console.log("mount")
    this.getAllDbEnt2();

    const datekey = this.setKeyFromDate()
    this.gotoDay(datekey)

  }

  hasDaysInList() {
    if (dayArray.length === 0)//!key)
      return true;//return "hidden";
    return false;//"visibie";
  }

  resetselectColor(key: string | null | undefined) {
    if (key !== null && key !== undefined) {
      console.log("Key")
      for (let i = 1; i <= 7; i++) {
        const element = document.getElementById("day" + i)
        if (element) {
          console.log("Element")
          element.style.background = "#99d3b618"
        }
      }
    }
  }
  componentDidUpdate(prevProps) {
    console.log("Update 1");
  }

  gotoDay(key: string | null | undefined) {
    if (key !== null && key !== undefined) {
      theDay = key;

      console.log(theDay)
      this.resetselectColor(key);
      const element = document.getElementById("day" + key)
      if (element)
        element.style.background = '#858e8d31'
      this.setDays;
    }

  }

  render() {

    // auth.onAuthStateChanged(() =>{
    //   // console.log("auth")
    //   // this.setButtonText("Log out");
    // })
    // auth.onAuthStateChanged((user) => {
    //   const loggedInAs = document.getElementById("userName");

    //   if (user) {
    //     // User is signed in, see docs for a list of available properties
    //     // https://firebase.google.com/docs/reference/js/firebase.User



    //     // this.setuser(user.email)
    //     this.setButtonText("Log out");
    //     // if (loggedInAs) {
    //     //   loggedInAs.innerHTML = user?.email || "unauthenticated"
    //     // }
    //   }
      // else {
      //   // User is signed out
      //   // ...
      //   // console.log("Signed out id ");
      //   if (loggedInAs) {
      //     loggedInAs.innerHTML = "unauthenticated"
      //   }
      //   this.setButtonText("Log in")
      //   // this.setuser("Not logged in")

      // }
    // })
    const anum = 1;
    // this.setDays()
    // console.log("Array");
    // console.log(dayArray)
    // console.log("FilterArray");
    // console.log(filteredDayArray)
    // const {modalIsOpen, setModalOpen} = this.context
    return (

      <div >

        <div className="thetop1">
          {/* <button
            className="m-3 btn btn-sm btn-success"
            hidden = {this.hasKey("dummy")}
            onClick={
              this.changeContext

            }
          >
            Change context
          </button> */}
          {/* <MyContext.Provider value={this.state.user}> */}
          {/* <ModalItem testr={dayNameAttay} myCallBack={this.handleReturn} /> */}
          {/* </ModalItem>testr={this.handleReturn} /> */}
          {/* </MyContext.Provider> */}

          {/*OLD modal*/}
          {/* <ModalItem1 selectedDay={theDay} runOnLoadingParent={true} theBool={false}></ModalItem1> */}


          {/* <div> 
                  MOdal - {modalIsOpen}
                  <button
                  onClick={() => {
            const modalIsOpen = { filter: false, update: true }

            setModalOpen(modalIsOpen)
          }}        >
          Update User
          </button>
        </div> */}
          {/*  <ModalConsumer>
              {(props) => {
                return <div> 
                MOdal - {props.update}
                <button
                onClick={() => {
                  const modalIsOpen = { filter: false, update: true }

                  setModalOpen(modalIsOpen)
                }}        >
          Update User
          </button>
          </div>}}
        </ModalConsumer> */}
          {/* <TestModal isOpen3={false} toggle={function (): void {
              throw new Error("Function not implemented.");
          } }></TestModal> */}

          {/* {this.state.user} */}
          {/* {this.state.buttonText} */}
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
          <button 
            className=" btn refreshBtn"
            onClick={this.getAllDbEnt2}
          >
            <i className="fa fa-refresh"></i>
          </button>

        </div>
        <div>
            <div className="col-md-6">
              <SetFilter daysFromParent={dayArray} myCallBack={this.handleReturn} choiceNames={dayNameArray} currentfilter={selectedFilters} />
              <button
                className="m-3 btn btn-sm btn-success"
                hidden={selectDayAr.length === 0}// {this.hasKey("dummy") && this.state.daysFiltered === null && this.state.filteredDaysNames?.length > 0}
                onClick={
                  this.getFilteredDays}
              >
                Apply filter
              </button>
              <button
                className="m-3 btn btn-sm btn-success"

                onClick={
                  this.clearFilter}
              >
                Clear filter
              </button>

              <UpdateDayModal selectedDay={this.state.selectedDay} runOnLoadingParent={true} isOpen={false} getfunc={() =>{return theDay}}></UpdateDayModal>
              <h4>Plan</h4>
              {/* <div id="userName">
                {this.state.user.userName}
              </div> */}
            </div>
              <div className="dayListContainer ">
            {
              active ? (
                <div className="grid-container">

                  {

                    filteredDayArray?.map((day, index) =>
                    (
                      <div className="dayItem" id={"day" + day.key} onClick={() => { this.gotoDay(day.key) }} key={day.key}>


                        <div className="dKey" >

                          {day.name.toLowerCase().charAt(0).toUpperCase().concat(day.name.slice(1))}
                        </div>

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
      </div>
    );
  }
}
// DaysList2.contextType = ModalContext;