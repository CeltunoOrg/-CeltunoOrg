import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
// import * as DayService from "./services/day-firebase-service"
// import DaysList2 from "./components/day-list2.component";
import "../../styles/App.css"
import { IDayActivity, IImagePreset, IMyDay, IPreset, IUser } from '../types/day.type';
import CustomizedDialogs from './dialogTest';
import PresetEditor from './editPreset';
import PresetDataService from "../services/preset-firebase-service"
import { useTheOnValue } from '../../firebase-planner';
import { Button } from '@mui/material';
import ActivityEditor from './editActivity';
// type State = {
//         isOpen: boolean
// }
interface Props {
    children?: React.ReactNode
    isOpen: boolean
}
const Activity = (Props: Props) => {

    useEffect(() => {
        // handleDay(testData[0])
        // getAllData(null);
        getDayDbData("planner")



    })
    const shallowClone = obj => Object.assign({}, obj);

    const [isOpen, setopen] = useState({
        isOpen: false
    });

    const [day, setDay] = useState<IMyDay>({
        Id: 0,
        Name: "",
        Description: "",
        Activities: []
    });

    const [presets, setPresets] = useState<IPreset[]>([]);

    const [activity, setActivity] = useState<IDayActivity>({
        Id: 0,
        Name: "",
        Image: "",
        Order: "0",
        Selected: false
    });
    const [days, setDays] = useState<Array<IMyDay>>(new Array<IMyDay>);

    const [topId, setTopId] = useState<number>(0);
    const myPreset: IImagePreset[] =
        [
            {
                Id: 1,
                Name: "Preset",
                // Description: "Description",
                image: "image8.png",
                Order: "0",
                Selected: false
            }];

    const handleOpenState = (isOpen) => {
        console.log("handleopen")
        const newState = isOpen
        setopen({ isOpen: true })
        //    return newState;//useModal().isOpen3
    }

    let tmpData: Array<IMyDay> = new Array<IMyDay>;
    const getDayDbData = (path: string | null) => {
        PresetDataService.getDbAllDays(path).then((data) => {

            // useTheRef(db, '/');
            useTheOnValue(data, (snapshot) => {
                // const snapshotValue = snapshot.val();
                // console.log(data.toJSON)
                if (snapshot.exists()) {
                    console.log("Snapshot found, mapping data:");
                    snapshot.forEach(function (childSnapshot) {
                        // console.log(childSnapshot.val())
                        const key = childSnapshot.key;
                        const values = childSnapshot.val()
                        let childData: IMyDay = {
                            Id: Number.parseInt(key ?? "0") ?? "",
                            Name: values.Name,
                            Description: values.Descritption,
                            Activities: values.Activities
                        }
                        // childSnapshot.val() as IMyDay;
                        childData.Id = Number.parseInt(key ?? "0") ?? "";
                        tmpData.push(childData);
                    })
                    if (tmpData.length !== days.length)
                        setTheDays(null)
                    console.log("DB items found:");
                    console.log(tmpData.length)
                }
            })
        })
        // if (tmpData.length > 0)
        // handlePreset(tmpData[0])

        return tmpData
    }

    const sortDaysByKey = (array: IMyDay[]) => {
        return array.sort((a, b) => {
            return a.Id >= b.Id
                ? 1
                : -1
        })
    }

    const removeDayItem = (key: number | null) => {
        if (key === null)
            return
        PresetDataService.removeDayItemDb(key)
        getDayDbData("planner")
    }
    const setTheDays = (day: IMyDay | null) => {
        if (day)
            setDay(day)
        setDays(tmpData)
    }

    // const theFakePreset = fakeDay()?.Activities[0];
    // const selectCallback = (theSelected: Array<ISelectImage>) => {
    //     console.log(theSelected)
    const editCallback = (theSelected: IMyDay | null) => {
        if (theSelected) {

            console.log(`Edit Callback: ${theSelected.Id}`)
            if (theSelected.Id !== null) {
                PresetDataService.updateMyDayItemDb(theSelected.Id, theSelected)
                getDayDbData("planner")
            }
        }
        return theSelected
    }
    // const highestFilter = Object.values(arr.reduce((r, o) => {
    //     r[o.Id] = (r[o.Id] && r[o.Id].value > o.value) ? r[o.Id] : o

    //     return r
    //   }, {}))
    // const getHighestFilterByName = (arr:Array<IMyDay>) => {
    //     let tmpArr:Array<IMyDay> = []
    //     arr.map((item) => (
    //         tmpArr.push(item)
    //     ))

    //     const highestFilterByName = Object.values(arr.reduce((r, o) => {
    //         r[o.Name] = (r[o.Name] && r[o.Id].Id > o.Id) ? r[o.Name] : o

    //         return r
    //     }, {}))
    //     return highestFilterByName
    // }
    const theHighest = () => {
       console.log(`Activity-Highest: ${topId}`)
     function getHighest() {
            if (days.length > 0) {

                let sortedDays = days.sort((a, b) => (a.Id > b.Id) ? -1 : 1);
                return sortedDays[0].Id
            }
            else
                return 0
        }
        setTopId(getHighest())
        console.log(`Activity-Highest: ${topId}`)
    }
    return (
        <>
            {setTheDays}
            <div className='appMainContainer'>
                <div className='maingridContainer '>
                    <h2>Activities</h2>
                    <div style={{display: 'flex',flexDirection: 'row'}}>

                    {/* {activities.length <= 0 ? */}
                    <Button variant='outlined' onClick={() => { getDayDbData("planner") }}><i className="fa fa-refresh" aria-hidden="true"></i></Button>
                    <ActivityEditor editCallback={editCallback} myDay={day} dayArrayLength={topId} />

                    </div>
                    <div className="preset-grid-container">
                        {
                            days?.map((dayItem, index) => (
                                <div className='preset-grid-item'>
                                    {/* <p key={dayItem.Name + index.toString()}>{dayItem.Name}</p> */}
                                    <div className="presetDayListContainer ">
                                        {dayItem.Activities ?
                                            //    preset?.Activities.map((activity, index) =>
                                            dayItem?.Activities.map((activity, aactivityIndex) =>
                                            (

                                                <div className="activityDayItem" id={"day" + activity.Id} onClick={() => { alert(activity.Id) }} key={aactivityIndex} style={{ order: (activity.Order), }}>
                                                    {/* <div className="grid-item"> */}

                                                    <div>
                                                        {/* {`Order: ${activity.Order}`} */}
                                                    </div>
                                                    <div className="activityImageListcontainer">
                                                        <img onError={e => { e.currentTarget.src = "images/error.png" }} src={"images/" + activity.Image} alt={activity.Name}></img>
                                                    </div>

                                                    {/* </div> */}
                                                </div>
                                            ))
                                            :
                                            ""
                                        }
                                    </div>

                                    <ActivityEditor editCallback={editCallback} myDay={dayItem} dayArrayLength={topId} />
                                    {/* {dayItem.Name !== "string" && dayItem.Name ?
                                        ""
                                        : <Button onClick={() => { getAllData("planner"); setTheActivities() }}>Fetch</Button>
                                    } */}
                                    {

                                        dayItem.Id !== null ?
                                            <Button onClick={(() => removeDayItem(dayItem.Id))}>
                                                <i className="fa fa-trash" aria-hidden="true"></i>
                                            </Button>
                                            :
                                            ""
                                    }
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
        </>
    );
}


export default Activity
