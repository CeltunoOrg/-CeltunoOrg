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
// type State = {
//         isOpen: boolean
// }
interface Props {
    children?: React.ReactNode
    isOpen: boolean
}
const Preset = (Props: Props) => {

    useEffect(() => {
        // handleDay(testData[0])
        getAllData(null);

    })
    const shallowClone = obj => Object.assign({}, obj);

    const [isOpen, setopen] = useState({
        isOpen: false
    });

    const [day, handleDay] = useState<IMyDay>({
        Id: 0,
        Name: "",
        Description: "",
        Activities: []
    });

    const [user, handleUser] = useState<IUser>({
        Presets: [],
        LastDay: null
    });

    const [preset, handlePreset] = useState<IPreset>({
        Id: 0,
        Name: "",
        Description: "",
        Activities: []
    });
    const [presets, handlePresets] = useState<IPreset[]>([]);
    const [activity, handleActivity] = useState<IDayActivity>({
        Id: 0,
        Name: "",
        Image: "",
        Order: "0",
        Selected: false
    })


    const fakeDay = () => {

        let myActivity: IDayActivity;
        let myPreset: IPreset
        let myDay: IMyDay;
        let id = 1;
        let myActivties: IDayActivity[] = []
        let myPresets: IPreset[] = []

        let fetchedDay: IMyDay | null = null

        myDay = testData[0]

        fetchedDay = {
            Id: id,
            Name: "Name",
            Description: "Description",
            // images: [],
            Activities: []
        }

        myActivity = {
            Id: 1,
            Name: "Name",
            // Description: "Description",
            Image: "Image",
            Order: "0",
            Selected: false
        }

        let myActivityPreset: IDayActivity = {
            Id: 111,
            Name: "ActivityPreset1",
            // Description: "Description",
            Image: "Image",
            Order: "0",
            Selected: false
        }

        myActivties.push(myActivity)
        let myActivity2 = shallowClone(myActivity)
        myActivties.push(myActivity2)
        myActivties[1].Id = 2;
        myActivties[1].Name = "Name2";


        myPreset =
        {
            Id: 1,
            Name: "Preset",
            Description: "Description",
            Activities: [myActivityPreset]
        };

        myPresets = [

            {
                Id: 1,
                Name: "Preset1",
                Description: "Description",
                Activities: []
            },
            {
                Id: 2,
                Name: "Preset2",
                Description: "Description",
                Activities: []

            }
        ]

        console.log(` Day: ${fetchedDay.Id} - ${fetchedDay.Name} `)

        console.log("Activities")
        fetchedDay.Activities = myActivties
        console.log(fetchedDay.Activities);

        console.log("Adding activity")
        let myActivity3 = shallowClone(myActivity);
        myActivity3.Id = 3
        myActivity3.Name = "Name3"
        fetchedDay.Activities.push(myActivity3)
        console.log(fetchedDay.Activities);


        console.log("Presets")
        console.log(myPresets);

        console.log(" \"My preset\" ")
        console.log(myPreset);


        console.log("With one preset")
        myPreset.Activities.map(item =>
            fetchedDay?.Activities.push(item)
        );
        console.log(fetchedDay.Activities);

        // myPreset.Activities.forEach(item => fetchedDay?.Activities.push(item));
        // console.log("With \"my\" preset")
        // console.log( fetchedDay.Activities)
        let myPreset2 = {
            Id: 22,
            Name: "PresetClone",
            Description: "Description",
            Activities: [
                {
                    Id: 222,
                    Name: "ActivityPreset2",
                    // Description: "Description",
                    Image: "Image",
                    Order: "0",
                    Selected: false
                }
            ]
        }
        // myPresets.push(myPreset)
        console.log("With \"my\" presets")
        myPresets.map(element => {
            element.Activities.map(item => fetchedDay?.Activities.push(item));
        });
        console.log(fetchedDay.Activities);

        myPresets.push(myPreset2)
        myPresets.map(element => {
            if (element.Id === 22) {

                element.Activities = myPreset2.Activities
                element.Activities.map(item => fetchedDay?.Activities.push(item));

                console.log("presetclone")
                console.log(myPresets)

            }
        })
        // console.log(fetchedDay);
        return fetchedDay;

    }

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

    let tmpData: IPreset[] = []
    const getAllData = (path: string | null) => {
        PresetDataService.getDbAllPresets(path).then((data) => {

            // useTheRef(db, '/');
            useTheOnValue(data, (snapshot) => {
                // const snapshotValue = snapshot.val();
                // console.log(data.toJSON)
                if (snapshot.exists()) {
                    console.log("Snapshot found, mapping data:");
                    snapshot.forEach(function (childSnapshot) {
                        console.log(childSnapshot.val())
                        const key = childSnapshot.key;
                        const childData = childSnapshot.val() as IPreset;
                        childData.Id = Number.parseInt(key ?? "0") ?? "";
                        tmpData.push(childData);
                    })
                    console.log("DB items found:");
                    console.log(tmpData.length)
                }
            })
        })
        if (tmpData.length > 0)
            // handlePreset(tmpData[0])
            setThePresets()
        return tmpData
    }

    const setThePresets = () => {
        handlePreset(tmpData[0])
        handlePresets(tmpData)
    }
    const theFakeActivities = fakeDay()?.Activities ?? [];
    // const theFakePreset = fakeDay()?.Activities[0];
    return (

        <>
            <div className='appMainContainer'>
                {/* value={modalIsOpen}> */}
                <div className='maingridContainer '>
                    {/* <CustomizedDialogs activities={theFakeActivities} /> */}
                    <h4>Presets</h4>
                    <div className="preset-grid-container">
                    {
                        presets?.map((presetItem, index) => (
                            <div className='preset-grid-item'>
                                <p key={presetItem.Name + index.toString()}>{presetItem.Name}</p>
                                <div className="presetDayListContainer ">
                                    {
                                    //    preset?.Activities.map((activity, index) =>
                                        presetItem?.Activities.map((activity, index) =>
                                        (

                                            <div className="activityDayItem" id={"day" + activity.Id} onClick={() => { alert(activity.Id) }} key={activity.Id} style={{ order: (activity.Order), }}>
                                                {/* <div className="grid-item"> */}

                                                <div>
                                                    {/* {activity.Name} */}
                                                </div>
                                                <div>
                                                    {`Order: ${activity.Order}`}
                                                </div>
                                                <div className="activityImageListcontainer">
                                                    <img onError={e => { e.currentTarget.src = "images/error.png" }} src={"images/" + activity.Image} alt={activity.Name}></img>
                                                </div>

                                                {/* </div> */}
                                            </div>
                                        ))
                                    }
                                </div>

                                {presetItem.Name !== "string" && presetItem.Name ?
                                    <PresetEditor preset={presetItem as unknown as IPreset} />
                                    : <Button onClick={() => getAllData}>Fetch</Button>
                                }
                            </div>
                        ))
                    }
                    </div>
                    <Button onClick={() => { getAllData("presets") }}>Fetch</Button>
                </div>
            </div>
        </>
    );
}

const testData: IMyDay[] =
    [
        {
            Id: 1,
            Name: "Preset",
            Description: "Description",
            // images: ["image5.png","image7.png"],
            Activities: [

                {
                    Id: 2,
                    Name: "Preset",
                    // Description: "Description",
                    Image: "image6.png",
                    Order: "0",
                    Selected: false
                },
                {
                    Id: 3,
                    Name: "Preset",
                    // Description: "Description",
                    Image: "image7.png",
                    Order: "1",
                    Selected: false
                },
                {
                    Id: 4,
                    Name: "Preset",
                    // Description: "Description",
                    Image: "image8.png",
                    Order: "2",
                    Selected: false
                },
                {
                    Id: 6,
                    Name: "Preset",
                    // Description: "Description",
                    Image: "image10.png",
                    Order: "3",
                    Selected: false
                },
                {
                    Id: 7,
                    Name: "Preset",
                    // Description: "Description",
                    Image: "image11.png",
                    Order: "4",
                    Selected: false
                }
            ]
        },
        {
            Id: 5,
            Name: "Preset2",
            Description: "Description2",
            // images: ["image9.png"],
            Activities: [
                {
                    Id: 6,
                    Name: "Preset",
                    // Description: "Description",
                    Image: "image10.png",
                    Order: "0",
                    Selected: false
                },
                {
                    Id: 7,
                    Name: "Preset",
                    // Description: "Description",
                    Image: "image11.png",
                    Order: "1",
                    Selected: false
                }
            ]
        }
    ]

export default Preset
