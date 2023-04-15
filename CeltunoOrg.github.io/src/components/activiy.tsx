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
        getAllData("planner")


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


    const [activity, setActivity] = useState<IDayActivity>({
        Id: 0,
        Name: "",
        Image: "",
        Order: "0",
        Selected: false
    });
    const [days, setDays] = useState<IMyDay[]>([]);

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

    let tmpData: IMyDay[] = []
    const getAllData = (path: string | null) => {
        PresetDataService.getDbAllDays(path).then((data) => {

            // useTheRef(db, '/');
            useTheOnValue(data, (snapshot) => {
                // const snapshotValue = snapshot.val();
                // console.log(data.toJSON)
                if (snapshot.exists()) {
                    console.log("Snapshot found, mapping data:");
                    snapshot.forEach(function (childSnapshot) {
                        console.log(childSnapshot.val())
                        const key = childSnapshot.key;
                        let childData = childSnapshot.val() as IMyDay;
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
    const removeDayItem = (key: number | null) => {
        if (key === null)
            return
        PresetDataService.removeDayItemDb(key)
        getAllData("planner")
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
                getAllData("planner")
            }
        }
        return theSelected
    }


    return (
        <>
            {setTheDays}
            <div className='appMainContainer'>
                <div className='maingridContainer '>
                    <h4>Activities</h4>
                    <div className="preset-grid-container">
                        {
                            days?.map((dayItem, index) => (
                                <div className='preset-grid-item'>
                                    <p key={dayItem.Name + index.toString()}>{dayItem.Name}</p>
                                    <div className="presetDayListContainer ">
                                        {dayItem.Activities ?
                                            //    preset?.Activities.map((activity, index) =>
                                            dayItem?.Activities.map((activity, index) =>
                                            (

                                                <div className="activityDayItem" id={"day" + activity.Id} onClick={() => { alert(activity.Id) }} key={activity.Id} style={{ order: (activity.Order), }}>
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

                                    <ActivityEditor editCallback={editCallback} myDay={dayItem} dayArrayLength={days.length} />
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
                    <ActivityEditor editCallback={editCallback} myDay={day} dayArrayLength={days.length} />
                    {/* {activities.length <= 0 ? */}
                    <Button variant='outlined' onClick={() => { getAllData("planner") }}>Fetch</Button>
                    {/* : ""
                    } */}
                </div>
            </div>
        </>
    );
}


export default Activity
