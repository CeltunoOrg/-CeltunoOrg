import React, { useEffect, useState } from 'react';
import "../../styles/Presets.css"
import { DataType, IMyDay, IPreset } from '../types/day.type';
import PresetEditor from './modules/editPreset';
import { Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import PresetDataManager from './functions/presetDataManager';
import userFirebaseService from '../services/user-firebase-service';
import { useTheOnValue } from '../../firebase-planner';
import presetFirebaseService from '../services/preset-firebase-service';



interface Props {
    children?: React.ReactNode
    isOpen: boolean
}
const Presets = (Props: Props) => {

    useEffect(() => {
        if (!presets || presets.length <= 0)
        
        getPresetDbData()
    })

    // const [isOpen, setopen] = useState({
    //     isOpen: false
    // });

    const [preset, setPreset] = useState<IPreset>({
        Id: 0,
        Name: "",
        Description: "",
        Activities: []
    });

    const [presets, setPresets] = useState<Array<IPreset>>(new Array<IPreset>);

    const [topId, setTopId] = useState<number>(0);

    const tmpData: Array<IPreset> = new Array<IPreset>;
    const getPresetDbData = () => {
        // const returndata = PresetDataManager.FetchAllPresets()
        // if (returndata && returndata.presets.length > 0)
        //     tmpData = returndata.presets;
        // setThePresets(null)
        //                 setThePresets(null)
        presetFirebaseService.GetAllItemsDB(DataType.Presets).then((data) => {
            useTheOnValue(data, (snapshot) => {
                if (snapshot.exists()) {
                    tmpData.length = 0
                    console.log("Snapshot found, mapping data:");
                    snapshot.forEach(function (childSnapshot) {
                        const key = childSnapshot.key;
                        const values = childSnapshot.val()
                        const childData: IPreset = {
                            Id: Number.parseInt(key ?? "0") ?? "",
                            Name: values.Name,
                            Description: values.Descritption,
                            Activities: values.Activities
                        }
                        childData.Id = Number.parseInt(key ?? "0") ?? "";
                        tmpData.push(childData);
                        setThePresets(null)
                    })
                    if (tmpData.length !== presets.length)
                    console.log("DB items found:");
                    console.log(tmpData.length)
                }
            })
        })

        return tmpData
    }

    // const sortPresetsByKey = (array: IPreset[]) => {
    //     return array.sort((a, b) => {
    //         return a.Id >= b.Id
    //             ? 1
    //             : -1
    //     })
    // }

    const removePresetItem = (key: number | null) => {
        if (key === null)
            return


        PresetDataManager.RemovePreset(key)
        getPresetDbData()
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
                PresetDataManager.UpdatePreset(theSelected.Id, theSelected)
                getPresetDbData()
                setThePresets(null)
            }
        }
        return theSelected
    }

    return (
        <>
            <div className='appMainContainer'>
                <div className='maingridContainer '>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Button href='/#/'><ArrowBackIcon /></Button>

                        <Button onClick={() => { getPresetDbData() }}><RefreshIcon /></Button>

                        <PresetEditor editCallback={editCallback} propCurrentPreset={preset} />
                    </div>
                    <div className='presetTitle'>
                        <h2>Presets</h2>
                    </div>
                    <div className="preset-grid-container">
                        {
                            presets?.map((presetItem, presetIndex) => (
                                <div className='preset-grid-item' key={presetItem.Name + presetIndex}>
                                    <div className="presetListContainer ">
                                        <h3 >{presetItem.Name}</h3>
                                        {presetItem.Activities ?
                                            presetItem?.Activities.map((activity, activityIndex) =>
                                            (

                                                <div className="activityPresetItem" id={"preset" + activity.Id} key={activityIndex} style={{ order: (activity.Order), }}>

                                                    <div className="activityImageListcontainer">
                                                        <img onError={e => { e.currentTarget.src = "images/error.png" }} src={"images/" + activity.Image} alt={activity.Name}></img>
                                                    </div>
                                                </div>
                                            ))
                                            :
                                            ""
                                        }
                                    </div>
                                    <div className='gridButtons'>
                                        <PresetEditor editCallback={editCallback} propCurrentPreset={presetItem} />
                                        {

                                            presetItem.Id !== null ?
                                                <Button onClick={(() => removePresetItem(presetItem.Id))}>
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


export default Presets
