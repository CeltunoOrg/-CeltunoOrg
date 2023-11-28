import React, { useEffect, useState } from 'react';
import "../../styles/Activities.css"
import { DataType, IDayActivity, IImagePreset, IMyDay, IPreset, IUser } from '../types/day.type';
// import CustomizedDialogs from './modules/dialogTest';
import PlannerDataService from "../services/planner-firebase-service"
import { useTheOnValue } from '../../firebase-planner';
import { Button } from '@mui/material';
import ActivityEditor from './modules/editActivity';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
// import { useAuthState } from 'react-firebase-hooks/auth';


const Activities = () => {

    useEffect(() => {
        if (!days || days.length <= 0)
            getDayDbData()
    })

    const [day, setDay] = useState<IMyDay>({
        Id: 0,
        Name: "",
        Description: "",
        Activities: []
    });

    const [days, setDays] = useState<Array<IMyDay>>(new Array<IMyDay>);

    const [topId, setTopId] = useState<number>(0);

    const tmpData: Array<IMyDay> = new Array<IMyDay>;
    const getDayDbData = () => {
        PlannerDataService.GetDBref(DataType.Planner).then((data) => {
            useTheOnValue(data, (snapshot) => {
                if (snapshot.exists()) {                    
                    tmpData.length = 0;
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
                    // if (tmpData.length !== days.length)
                        setTheDays(null)
                    console.log("DB items found:");
                    console.log(tmpData.length)
                }
            })
        })
    .catch((error) => {
        console.error(error);
      });
        // .catch((error) => {
        //     console.log("Error fetching data: " + error);
        //     // An error happened.
        // });

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

    const editCallback = (theSelected: IMyDay | null) => {
        if (theSelected) {

            console.log(`Edit Callback: ${theSelected.Id}`)
            if (theSelected.Id !== null) {
                // PlannerDataService.updateMyDayItemDb(theSelected.Id, theSelected)
                getDayDbData()
                setTheDays(null)
            }
        }
        return theSelected
    }
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const handleEditOpen = () =>{
        setEditOpen(!editOpen)
        console.log(`EditOpen: ${editOpen}`)
    }
    return (
        <>
            <div className='appMainContainer'>
                <div className='maingridContainer '>
                    <h2>Activities</h2>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Button href='/#/'><ArrowBackIcon /></Button>
                        <Button onClick={() => { getDayDbData() }}><RefreshIcon /></Button>
                        <ActivityEditor isOpen={editOpen} hideAll={false} editCallback={editCallback} propMyDay={day} />

                    </div>
                    <div className="day-grid-container" onClick={handleEditOpen}>
                        {
                            days?.map((dayItem, dayIndex) => (
                                <div className='day-grid-item' key={dayItem.Name + dayIndex}>
                                    <div className="dayListContainer ">
                                        <h3 >{dayItem.Name}</h3>
                                        {dayItem.Activities ?
                                            dayItem?.Activities.map((activity, activityIndex) =>
                                            (
                                                <div className="activityDayItem" id={"day" + activity.Id} key={activityIndex} style={{ order: (activity.Order), }}>
                                                    <div className="activityImageListcontainer">
                                                        <img onError={e => { e.currentTarget.src = "images/error.png" }} src={"images/" + activity.Image} alt={activity.Name}></img>
                                                    </div>
                                                </div>
                                            ))
                                            :
                                            ""
                                        }
                                    </div>
                                    <div className='gridActivityButtons'>
                                        <ActivityEditor hideAll={false} editCallback={editCallback} propMyDay={dayItem} isOpen= {editOpen}/>
                                        {
                                            dayItem.Id !== null
                                                ?
                                                <Button onClick={(() => removeDayItem(dayItem.Id))}>
                                                    <DeleteIcon />
                                                </Button>
                                                :
                                                ""
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
        </>
    );
}


export default Activities
