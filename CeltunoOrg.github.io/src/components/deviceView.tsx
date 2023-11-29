import React, { useEffect, useState } from 'react';
import "../../styles/Activities.css"
import { DataType, IDayActivity, IImagePreset, IMyDay, IPreset, IUser } from '../types/day.type';
// import CustomizedDialogs from './modules/dialogTest';
import PlannerDataService from "../services/planner-firebase-service"
import { useTheOnValue } from '../../firebase-planner';
import { Button } from '@mui/material';
import ActivityEditor from './modules/editActivity';

interface Props {
    children?: React.ReactNode
    hideAll: boolean
}
const DeviceView = (props: Props) => {

    useEffect(() => {
        // if(props.hideAll)        
        //     handleHidden()
        // handleDay(testData[0])
        // getAllData(null);
        if (days.length <= 0)
            getDayDbData()



    })
    // const shallowClone = obj => Object.assign({}, obj);

    const [hideAll, setHidden] = useState<boolean>(true);

    const [day, setDay] = useState<IMyDay>({
        Id: 0,
        Name: "",
        Description: "",
        Activities: []
    });

    const [days, setDays] = useState<Array<IMyDay>>(new Array<IMyDay>);

    // const [topId, setTopId] = useState<number>(0);

    // const handleHidden = () => {
    //     const newState = !hideAll
    //     console.log(`From: ${hideAll} To: ${newState}`)
    //     if (props.hideAll === true)
    //         setHidden(props.hideAll)
    // }

    const tmpData: Array<IMyDay> = new Array<IMyDay>;
    const getDayDbData = () => {
        PlannerDataService.GetDBref(DataType.Planner).then((data) => {
            useTheOnValue(data, (snapshot) => {
                if (snapshot.exists()) {
                    console.log("Snapshot found, mapping data:");
                    snapshot.forEach(function (childSnapshot) {
                        const key = childSnapshot.key;
                        const values = childSnapshot.val()
                        const childData: IMyDay = {
                            Id: Number.parseInt(key ?? "0") ?? "",
                            Name: values.Name,
                            Description: values.Descritption,
                            Activities: values.Activities
                        }
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
        // handleHidden()
        return tmpData
    }

    const removeDayItem = (key: number | null) => {
        if (key === null)
            return
        PlannerDataService.RemoveDayItemDb(key)
        getDayDbData()
    }

    const setTheDays = (day: IMyDay | null) => {
        if (day)
            setDay(day)
        setDays(tmpData)
    }

    // const editCallback = (theSelected: IMyDay | null) => {
    //     if (theSelected) {

    //         console.log(`Edit Callback: ${theSelected.Id}`)
    //         if (theSelected.Id !== null) {
    //             PlannerDataService.updateMyDayItemDb(theSelected.Id, theSelected)
    //             getDayDbData()
    //         }
    //     }
    //     return theSelected
    // }


    return (
        <>
            <div className='appMainContainerDevice'>
                <div className='maingridContainer '>
                    {/* <h2>Device</h2> */}
                    {/* <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Button hidden={hideAll} variant='outlined' onClick={() => { getDayDbData() }}><i className="fa fa-refresh" aria-hidden="true"></i></Button>
                        <ActivityEditor hideAll={true} editCallback={editCallback} propMyDay={day} isOpen={false} />

                    </div> */}
                    <div className="day-grid-container">
                        {
                            days?.map((dayItem, dayIndex) => (
                                <div className='day-grid-item' key={dayItem.Name + dayIndex}>
                                    <div className="dayListContainer ">
                                        {dayItem.Activities ?
                                            dayItem?.Activities.map((activity, aactivityIndex) =>
                                            (

                                                <div className="activityDayItem" id={"day" + activity.Id} key={aactivityIndex} style={{ order: (activity.Order), }}>
                                                    <div className="activityImageListcontainer">
                                                        <img onError={e => { e.currentTarget.src = "images/error.png" }} src={"images/" + activity.Image} alt={activity.Name}></img>
                                                    </div>
                                                </div>
                                            ))
                                            :
                                            "No activities"
                                        }
                                    </div>
                                    {/* <ActivityEditor hideAll={hideAll} editCallback={editCallback} propMyDay={dayItem} isOpen={false} />
                                    {
                                        dayItem.Id !== null ?
                                            <Button hidden={hideAll} onClick={(() => removeDayItem(dayItem.Id))}>
                                                <i className="fa fa-trash" aria-hidden="true"></i>
                                            </Button>
                                            :
                                            ""
                                    } */}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}


export default DeviceView
