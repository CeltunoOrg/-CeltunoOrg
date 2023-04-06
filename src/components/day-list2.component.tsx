import React, { Component, useEffect, useState, useCallback } from "react";
import DayDataService from "../services/day-firebase-service";
import IDay from "../types/day.type";
import { useTheOnValue } from "../../firebase"// { auth, useTheOnValue } from "../../firebase"
import "../../styles/App.css"
import SetFilter from "./FIlterModal";
import UpdateDayModal from "./updateDayModal";

import Context2, { ModalConsumer, buttonThemes, userData } from "../Context2"





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
let daysNames: string[]
let filteredDaysNames: string[] = []
// let theDay = ""
// let selectDayAr = new Array<string>
// let active = false;

// interface Props {
//   children?: React.ReactNode
//   days?: Array<IDay>
//   selectedDay: string
// }

// type State = {
//   days: IDay[] | null
//   daysFiltered: IDay[] | null
//   
//   selectChoices: object
//   selectedDay: string
// };
// let tName = "nonMatchingDayName";

export const Daysfunc = () => {
  const [key, setKey] = useState({
    selectedDay: "0",
    testString: "Test",
    selectedDayName: ""
  });
  const initDays: IDay[] = [];
  const [stateDays, setDays] = useState({
    days: initDays,
  })
  const [stateFilterDays, setFilterDays] = useState({
    daysFiltered: initDays
  })
  // let selectedDayName = ""
  useEffect(() => {
    const fetchData = async () => {
      await getAllDbEntries();
      // const data = await fetch('https://yourapi.com');
    }
  
    // call the function
    fetchData().then(
    setKeyFromDate)
      // make sure to catch any error
      .catch(console.error)

  
    
    // alert(
    //   `Loaded ${dayArray.length} days from DB` //"This was the componentDidMount in Cats.js but now it's coming from the ChangeCat.js useEffect to the DOM"
    // );
  }, []);
  const handleClick = (e) => setKey({ ...key, selectedDay: e.target.value });
  const handleClick1 = (newKey) => setKey({ ...key, selectedDay: newKey});




  // constructor(props: Props) {
  //   super(props);
  //   this.getFilteredDays = this.getFilteredDays.bind(this);
  //   // this.setDays = this.setDays.bind(this);
  //   this.state = {
  //     selectChoices: {},
  //     days: null,
  //     daysFiltered: null,
  //     filteredDaysNames: [],
  //     selectedDay: ""
  //   };

  // }

  // setDays() {
  //   this.setState({
  //     days: dayArray,
  //     daysFiltered: filteredDayArray ?? dayArray,
  //     selectedDay: theDay

  //   })
  //   console.log(this.state.selectedDay)

  // }
  const getDb = (e) => {
    getAllDbEntries();
    return
  }


  async function getAllDbEntries() {
    dayArray.length = 0;
    if (filteredDayArray.length > 2221) {

      console.log("filter");
      console.log(filteredDayArray)
      return filteredDayArray;
    }
    await DayDataService.getdbAll().then((data) => {

      // useTheRef(db, '/');
      useTheOnValue(data, (snapshot) => {
        // const snapshotValue = snapshot.val();
        // console.log(data.toJSON)
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
          setDays({ ...stateDays, days: dayArray })
          setKeyFromDate
          // setDays();
console.log("fetched " + dayArray.length + " days")

        }
      })
    }).finally(() => {
      
      console.log("Finally")
    })

  }


  function setFilteredDays() {  
   
    if (filteredDaysNames.length < 1) {//this.state.daysFiltered === null) {
      console.log("No filter days")
      return null;
    }
    if (dayArray === null) {
      console.log("No state days")

      return null;
    }

    const tmpFilter = dayArray.filter(item => filteredDaysNames.includes(item.name));
    console.log("res");
    console.log(tmpFilter);

    filteredDayArray = tmpFilter;
    setFilterDays({...stateFilterDays, daysFiltered: filteredDayArray})
    // getAllDbEntries
  }

  function clearFilter() {
    getAllDbEntries
    setDays({ ...stateDays, days: dayArray })
    if (filteredDayArray.length > 0) {
      filteredDayArray = stateDays.days;
      // filteredDayArray.length = 0;
      filteredDaysNames.length = 0;
      setFilterDays({...stateFilterDays,daysFiltered: filteredDayArray})
    }
  }

  // changeContext = () => {
  //   console.log("#state    -> " + this.state.user.userName)
  //   console.log("#userData -> " + userData.user.userName)
  //   // console.log("#props    -> " + this.props.testString)
  //   console.log("#propschi -> " + this.props.children)
  //   // this.setState(state => ({
  //   //   user: {
  //   //     userName: state.user.userName === userData.user.userName ? userData.user.userName : "NewUser",
  //   //     loggedIn: state.user.loggedIn === true ? false : true,
  //   //   }
  //   //   // buttonTheme: state.buttonTheme === buttonThemes.primary ? buttonThemes.secondary : buttonThemes.primary,
  //   // }));
  //   return null
  // }

  // openFilters = () => {
  //   <SetFilter daysFromParent={dayArray} myCallBack={this.handleReturn} choiceNames={dayNameArray} currentfilter={selectedFilters} ></SetFilter>
  // }

  // parseTheInt(stringToCHeck: string | null | undefined) {
  //   if (stringToCHeck === null || stringToCHeck === undefined)
  //     return 0;

  //   return Number.parseInt(stringToCHeck.toString() ?? 0)
  // }

  const checkData = (values: IDay[]) => {
    // console.log("Start check ");

    console.log("Checking....")

    filteredDaysNames = values.map(item => item.name)

    daysNames = values.map(item => item.name);

    setFilterDays({ ...stateFilterDays, daysFiltered: values })



    console.log(`End  check ${filteredDaysNames}`);
    return null;

  }
  const handleReturn = (data: IDay[]) => {
    console.log("Modal return data:");
    console.log(data);
    if (!data || data.length === 0)
      return false;


    checkData(data)
    return true
  }

  function getDateDay() {
    const date = new Date();
    const dateDayName = date.getDay();
    return dateDayName;
  }

  function setKeyFromDate() {
    const d = getDateDay();
    if (d != null && d != undefined && d > 0) {
      // theDay = d.toString()
      console.log("Key from date:")
      console.log(d);
      gotoDay(d.toString())
      return d.toString();
    }    
  }
  // componentDidMount() {
  //   console.log("mount")
  //   this.getAllDbEnt2();

  //   const datekey = this.setKeyFromDate()
  //   this.gotoDay(datekey)
  // }

  // componentDidUpdate(prevProps) {
  //   console.log("Update 1");
  // }

  // hasDaysInList() {
  //   if (dayArray.length === 0)//!key)
  //     return true;//return "hidden";
  //   return false;//"visibie";
  // }

  const resetselectColor = (key: string | null | undefined) => {
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
  let theDay = "";
  function gotoDay(key: string | null | undefined){
    if (key !== null && key !== undefined) {
      theDay = key;
      console.log(theDay)
      resetselectColor(key);
      const element = document.getElementById("day" + key)
      if (element)
      element.style.background = '#858e8d31'
      // const tmpName = dayNameArray?.at(Number.parseInt(key)).label ?? ""
      handleClick1(theDay);
      
    }
  }

  // render() {
  //   const anum = 1;
  //   return (
  //     <div >
  //       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
  //       {/* <div className="thetop1">
  //         <button
  //           className=" btn refreshBtn"
  //           onClick={this.getAllDbEnt2}
  //         >
  //           <i className="fa fa-refresh"></i>
  //         </button>

  //       </div> */}
  //       <div>
  //         <div className="col-md-6">
  //           <SetFilter daysFromParent={dayArray} myCallBack={this.handleReturn} choiceNames={dayNameArray} currentfilter={selectedFilters} />
  //           <button
  //             className="m-3 btn btn-sm btn-success"
  //             hidden={selectDayAr.length === 0}// {this.hasKey("dummy") && this.state.daysFiltered === null && this.state.filteredDaysNames?.length > 0}
  //             onClick={
  //               this.getFilteredDays}
  //           >
  //             Apply filter
  //           </button>
  //           <button
  //             className="m-3 btn btn-sm btn-success"

  //             onClick={
  //               this.clearFilter}
  //           >
  //             Clear filter
  //           </button>

  //           <UpdateDayModal selectedDay={this.state.selectedDay} runOnLoadingParent={true} isOpen={false} getfunc={() => { return theDay }}></UpdateDayModal>
  //         </div>
  //         <div className="dayListContainer ">
  //           {
  //             active ? (
  //               <div className="grid-container">

  //                 {

  //                   filteredDayArray?.map((day, index) =>
  //                   (
  //                     <div className="dayItem" id={"day" + day.key} onClick={() => { this.gotoDay(day.key) }} key={day.key}>


  //                       <div className="dKey" >

  //                         {day.name.toLowerCase().charAt(0).toUpperCase().concat(day.name.slice(1))}
  //                       </div>

  //                       <div className="grid-item">
  //                         <ul className="">
  //                           <li key={"1-" + anum + index}>
  //                             {/* {day.formiddag} */}
  //                             <br />
  //                             <div className="imagecontainer">

  //                               <img onError={e => { e.currentTarget.src = "/images/error.png" }} src={"/images/" + day.formiddag} alt={day.formiddag}></img>
  //                             </div>
  //                           </li>
  //                           <li key={"2-" + anum + index}>
  //                             {/* {day.ettermiddag} */}
  //                             <div className="imagecontainer">

  //                               <img onError={e => { e.currentTarget.src = "/images/error.png" }} src={"/images/" + day.ettermiddag} alt={day.ettermiddag}></img>
  //                             </div>
  //                           </li>
  //                           <li key={"3-" + anum}>
  //                             {/* {day.natt} */}
  //                             <div className="imagecontainer">

  //                               <img onError={e => { e.currentTarget.src = "/images/error.png" }} src={"/images/" + day.natt} alt={day.natt}></img>
  //                             </div>
  //                           </ li>
  //                         </ul>
  //                       </div>
  //                     </div>
  //                   ))
  //                 }

  //               </div>

  //             )
  //               :
  //               (
  //                 <div className="box">
  //                   <a onClick={this.getAllDbEnt2}>
  //                     Click to fetch
  //                   </a>
  //                 </div>
  //               )
  //           }
  //         </div>
  //       </div >
  //     </div>
  //   );
  // }
  const anum = 1
  return (
    <>

      <h1 style={{ color: 'red' }}>Ukeplan</h1>

      <h4>
        { 
        filteredDayArray.at(Number.parseInt(key.selectedDay)-1)?.name//.toLowerCase().charAt(0).toUpperCase().concat(filteredDayArray.at(Number.parseInt(key.selectedDay))?.name.slice(1))  ({key.selectedDay}) Test: {key.testString}
}
        .
      </h4>
        <p>                   </p>
      <UpdateDayModal theBool={true} runOnLoadingParent={true} key={key.selectedDay} selectedDayId={key.selectedDay.toString()} />
      <SetFilter daysFromParent={stateDays.days} myCallBack={handleReturn} choiceNames={dayNameArray} currentfilter={selectedFilters} />
      <button
        className="m-3 btn btn-sm btn-success"
        hidden={filteredDaysNames.length === 0}// {this.hasKey("dummy") && this.state.daysFiltered === null && this.state.filteredDaysNames?.length > 0}
        onClick={
          setFilteredDays}
      >
        Apply filter
      </button>
      <button
        className="m-3 btn btn-sm btn-success"

        onClick={
          clearFilter}
      >
        Clear filter
      </button>
      <div className="dayListContainer ">

        <div className="grid-container">

          {

            filteredDayArray?.map((day, index) =>
            (
              <div className="dayItem" id={"day" + day.key} onClick={() => { gotoDay(day.key) }} key={day.key}>


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


      </div>
    </>
  );
}

export default Daysfunc