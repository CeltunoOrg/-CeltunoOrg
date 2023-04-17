import React, { useEffect, useState } from 'react';
import "../../styles/Presets.css"
import { IDayActivity, IImagePreset, IMyDay, IPreset, IUser } from '../types/day.type';
import PresetEditor from './modules/editPreset';
import PresetDataService from "../services/preset-firebase-service"
import { useTheOnValue } from '../../firebase-planner';
import { Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNewOutlined';



interface Props {
    children?: React.ReactNode
    isOpen: boolean
}
const Presets = (Props: Props) => {

    useEffect(() => {
        // handleDay(testData[0])
        // getAllData(null);
        getPresetDbData("presets")
    })

    const [isOpen, setopen] = useState({
        isOpen: false
    });

    const [preset, setPreset] = useState<IPreset>({
        Id: 0,
        Name: "",
        Description: "",
        Activities: []
    });

    const [presets, setPresets] = useState<Array<IPreset>>(new Array<IPreset>);

    const [topId, setTopId] = useState<number>(0);

    let tmpData: Array<IPreset> = new Array<IPreset>;
    const getPresetDbData = (path: string | null) => {
        PresetDataService.getAllItemsDB(path).then((data) => {
            useTheOnValue(data, (snapshot) => {
                if (snapshot.exists()) {
                    console.log("Snapshot found, mapping data:");
                    snapshot.forEach(function (childSnapshot) {
                        const key = childSnapshot.key;
                        const values = childSnapshot.val()
                        let childData: IPreset = {
                            Id: Number.parseInt(key ?? "0") ?? "",
                            Name: values.Name,
                            Description: values.Descritption,
                            Activities: values.Activities
                        }
                        childData.Id = Number.parseInt(key ?? "0") ?? "";
                        tmpData.push(childData);
                    })
                    if (tmpData.length !== presets.length)
                        setThePresets(null)
                    console.log("DB items found:");
                    console.log(tmpData.length)
                }
            })
        })

        return tmpData
    }

    const sortPresetsByKey = (array: IPreset[]) => {
        return array.sort((a, b) => {
            return a.Id >= b.Id
                ? 1
                : -1
        })
    }

    const removPresetItem = (key: number | null) => {
        if (key === null)
            return
        PresetDataService.removePresetItemDb(key)
        getPresetDbData("preset")
    }
    const setThePresets = (day: IMyDay | null) => {
        if (day)
            setPreset(day)
        setPresets(tmpData)
    }

   
    const editCallback = (theSelected: IMyDay | null) => {
        if (theSelected) {

            console.log(`Edit Callback: ${theSelected.Id}`)
            if (theSelected.Id !== null) {
                PresetDataService.updateMyDayItemDb(theSelected.Id, theSelected)
                getPresetDbData("presets")
            }
        }
        return theSelected
    }
   
    const theHighest = () => {
       console.log(`Activity-Highest: ${topId}`)
     function getHighest() {
            if (presets.length > 0) {

                let sortedPresets = presets.sort((a, b) => (a.Id > b.Id) ? -1 : 1);
                return sortedPresets[0].Id
            }
            else
                return 0
        }
        setTopId(getHighest())
        console.log(`Activity-Highest: ${topId}`)
    }
    return (
            // {setThePresets}
        <>
            <div className='appMainContainer'>
                <div className='maingridContainer '>
                    <h2>Presets</h2>
                    <div style={{display: 'flex',flexDirection: 'row'}}>

                    {/* {activities.length <= 0 ? */}
                    <Button href='/#/'><ArrowBackIcon/></Button>
                        
                    <Button  onClick={() => { getPresetDbData("presets") }}><RefreshIcon/></Button>
                    <PresetEditor editCallback={editCallback} myPreset={preset} dayArrayLength={topId} />

                    </div>
                    <div className="preset-grid-container">
                        {
                            presets?.map((presetItem, presetIndex) => (
                                <div className='preset-grid-item' key={presetItem.Name+presetIndex}>
                                    <h3 >{presetItem.Name}</h3>
                                    <div className="presetListContainer ">
                                        {presetItem.Activities ?
                                            presetItem?.Activities.map((activity, activityIndex) =>
                                            (

                                                <div className="activityPresetItem" id={"preset" + activity.Id} onClick={() => { alert(activity.Id) }} key={activityIndex} style={{ order: (activity.Order), }}>
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
                                    <div className='gridButtons'>
                                    <PresetEditor editCallback={editCallback} myPreset={presetItem} dayArrayLength={topId} />
                                    {

                                        presetItem.Id !== null ?
                                            <Button onClick={(() => removPresetItem(presetItem.Id))}>
                                                <i className="fa fa-trash" aria-hidden="true"></i>
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


export default Presets
