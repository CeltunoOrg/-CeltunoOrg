import React, { useEffect } from 'react';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import PresetDataManager from '../functions/presetDataManager'
import ExpandLessOutlined from '@mui/icons-material/ExpandLessOutlined'
import ExpandMoreOutlined from '@mui/icons-material/ExpandMoreOutlined';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import "../../../styles/Edit.css"

// import PresetDataService from "../../services/preset-firebase-service"
import { IDayActivity, IPreset, ISelectImage } from '../../types/day.type';
import { Divider, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import SelectImage from './selectImage';
import { isNullOrUndefined } from '../functions/common';
// import { useTheOnValue } from '../../../firebase-planner';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;


}

interface Props {
    children?: React.ReactNode

    propCurrentPreset: IPreset | null
    editCallback: (theEdited: IPreset | null) => IPreset | null

}

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

export default function PresetEditor(props: Props) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
        if (props.propCurrentPreset && props.propCurrentPreset !== myPreset)
            setMyPreset(props.propCurrentPreset)
        // if (props.dayArrayLength > topId)
        //     setTopId(props.dayArrayLength)
        const returnData = PresetDataManager.FetchAllPresets()
        if (topId < returnData.topId)
            setTopId(returnData.topId)

    };

    const handleClose = (save: boolean) => {
        if (save) {
            console.log("Saved")
            if (myPreset.Id > 0)
                updateMyPreset(myPreset.Id);
            // else console.log("CLOSING -ID was NULL - no update")
            props.editCallback(myPreset)
        }
        setOpen(false);
    };
    const [topId, setTopId] = React.useState<number>(0);
    const [presets, setPresets] = React.useState<IPreset[]>([]);
    const [myPreset, setMyPreset] = React.useState<IPreset>(
        {
            Id: 0,
            Name: "",
            Description: "",
            Activities: []
        }
    );

    useEffect(() => {

        if (props.propCurrentPreset && props.propCurrentPreset.Id !== myPreset.Id)
            setMyPreset(props.propCurrentPreset)
        if (topId === 0 || presets.length <= 0)
            getAllPresets();
        // if (topId > 0)
        // handleTopId(result.topId)
        console.log(`Effect - TopId: ${topId}`)

        // if (presets.length <= 0)
        //     handlePresets(result.presets)

    }, []);

    let tmpMyPreset: IPreset | null = null;

    const handleTopId = (newId: number) => {
        if (topId < newId)
            setTopId(newId)
    }


    const handlePreset = (preset: IPreset) => {
        console.log(`Handling preset - ${preset.Name} `)
        console.log(preset.Activities)
        setMyPreset(preset)
        console.log("After:")
        console.log(myPreset.Activities)
    }


    const handlePresets = (newPresets: IPreset[]) => {
        setPresets(newPresets)
    }

    const getAllPresets = () => {
        const returnData = PresetDataManager.FetchAllPresets()
        if (returnData.presets)
            handlePresets(returnData.presets)
        if (topId && topId !== 0)
            handleTopId(returnData.topId)

    }

    const updateMyPreset = (id: number | null) => {
        tmpMyPreset = { ...myPreset }
        if (id === undefined || id === null || id === 0) {
            console.log("No id provided, creating new...");
            const returnResult = PresetDataManager.FetchAllPresets()
            if (topId < returnResult.topId)
                setTopId(returnResult.topId)
            id = topId
        }
        if (id === 0)
            return
        console.log("Updating preset");
        if (isNullOrUndefined(tmpMyPreset.Description))
            tmpMyPreset.Description = ""
        if (isNullOrUndefined(tmpMyPreset.Activities))
            tmpMyPreset.Activities = []
        handlePreset(tmpMyPreset)
        PresetDataManager.UpdatePreset(id, tmpMyPreset)
        const fetchedPreset = PresetDataManager.FetchOnePreset(id) as IPreset
        if (fetchedPreset)
            handlePreset(tmpMyPreset)

    }

    const removePresetActivity = (activityId: number, activityIndex: number) => {
        const tmpPreset ={...myPreset}
        const index: number = tmpPreset.Activities.indexOf(tmpPreset.Activities[activityIndex], 0)
        if (index > -1) {
            tmpPreset.Activities.splice(index, 1);
        }
        PresetDataManager.RemovePresetActivity(activityId, activityIndex, tmpPreset)
        handlePreset(tmpPreset)
    }

    const setActivitiesFromPreset = (key: string) => {
        const keyInt = Number.parseInt(key);
        
        tmpMyPreset = { ...myPreset }
        if (tmpMyPreset)
            if (keyInt !== null && keyInt !== undefined) {
                const newPreset = { ...presets[keyInt] }
                tmpMyPreset.Activities = newPreset.Activities
                handlePreset(tmpMyPreset)
                // updateMyPreset(tmpMyPreset.Id)
            }
    }

    const updateName = (event) => {
        const name = event.target.value;
        tmpMyPreset = { ...myPreset }
        tmpMyPreset.Name = name
        // const returnData = PresetManager.FetchAllPresets();
        if (tmpMyPreset.Id === 0) {
            console.log("UPDATENAME - TOPAFTER GETALLL")
            tmpMyPreset.Id = topId
        }
        // setTopId(returnData.topId)
        setMyPreset(tmpMyPreset)
        return null
        // updateMyDay  (tmpActivity.Id)
    }

    const changeOrder = (moveUp: boolean, elementIdString: string, index: number, id: number | null) => {
        console.log(`Index: ${index}  - Id: ${id}`)
        const activityDiv = document.getElementById(`${elementIdString}${index.toString()}`);
        if (activityDiv && id !== null) {
            tmpMyPreset = { ...myPreset }
            if (tmpMyPreset.Activities.length > 0) {
                const activity = tmpMyPreset?.Activities[index]
                let currentOrder = activity.Order
                if (!currentOrder || currentOrder === undefined)
                    currentOrder = "0"
                let activityIdNum = Number.parseInt(currentOrder);
                console.log(`Current order: ${currentOrder}`)
                if (moveUp && activityIdNum > 0) {
                    console.log("Moving up")
                    activityIdNum -= 1;
                }
                else {
                    console.log("Moving down")
                    activityIdNum += 1;
                }
                activityDiv.style.order = `${activityIdNum}`
                activity.Order = activityIdNum ? activityIdNum.toString() : "0";
                tmpMyPreset.Activities[index] = activity
                setMyPreset(tmpMyPreset)
                console.log(`New order: ${activityDiv.style.order}`)
            }
        }

    }

    const selectCallback = (theSelected: Array<ISelectImage>) => {
        console.log(theSelected)
        const newPresetActivities: IDayActivity[] = []

        Object.keys(theSelected).map((i) => {
            if (theSelected[i].Selected) {
                const tmpActivity: IDayActivity =
                {
                    Id: Number.parseInt(i),
                    Name: theSelected[i].Image,
                    Image: theSelected[i].Image,
                    Order: theSelected[i].Order.toString(),
                    Selected: theSelected[i].Selected
                }

                newPresetActivities.push(tmpActivity)
            }
        })
        tmpMyPreset = { ...myPreset }
        tmpMyPreset.Activities = newPresetActivities
        setMyPreset(tmpMyPreset)
        return theSelected
    }

    return (
        <div>            
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <Button className='classes.button' onClick={handleOpen}>
                {(myPreset.Activities && myPreset.Activities.length > 0) ? <EditIcon /> : <AddIcon />}
            </Button>
            <BootstrapDialog
                onClose={() => handleClose(false)}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={() => handleClose(false)}>
                    <Typography gutterBottom>
                        Edit Preset
                    </Typography>
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <>
                        {
                            <div className='padder'>
                                <div>
                                    <TextField
                                        id="standard-basic"
                                        label="Preset name"
                                        variant="standard"
                                        value={myPreset.Name}
                                        onChange={e => updateName(e)}
                                    />
                                </div>

                                <Divider component="li" sx={{ margin: '5%' }} variant='inset' />

                                {myPreset.Activities ?
                                    <div className='updateBox' >
                                        {
                                            myPreset.Activities.map((activity, activityIndex) =>
                                            (
                                                <div className="listContainerRow" id={activity.Name + activityIndex.toString()} key={activityIndex} style={{ order: (activity.Order), }}>
                                                    <div

                                                        className='listContainerRowImages  '
                                                    >
                                                        <img src={`../images/${activity.Image}`} />
                                                        <Divider component="li" sx={{ margin: '5%' }} variant='middle' />
                                                    </div>
                                                    <Divider component="li" orientation="vertical" flexItem />
                                                    <div className='listContainerRowButtons'>
                                                        {activity.Order !== "0" ?
                                                            <Button onClick={() => changeOrder(true, activity.Name, activityIndex, myPreset.Id)}>{' '}<ExpandLessOutlined /></Button>
                                                            :
                                                            ""}
                                                        <br />
                                                        <Button onClick={() => changeOrder(false, activity.Name, activityIndex, myPreset.Id)}>{' '}<ExpandMoreOutlined /></Button>
                                                        <br />
                                                        <Button onClick={() => removePresetActivity(activity.Id, activityIndex)}><i className="fa fa-trash" aria-hidden="true"></i></Button>
                                                    </div>
                                                </div>

                                            )
                                            )}
                                    </div>
                                    : <p>{"No presets"}</p>
                                }
                            </div>
                        }
                    </>
                </DialogContent>
                <DialogActions>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Select template</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="presetSelector"
                            value={`999`}
                            onChange={e => setActivitiesFromPreset(e.target.value)}
                            label="Preset"
                        >
                            <MenuItem value={`999`} key={`999`} selected={true}>
                                <em>None</em>
                            </MenuItem>
                            {presets.map(function (preset, index) {

                                if (preset && preset.Id > 0) {

                                    return <MenuItem key={index} value={index}>{preset.Name}</MenuItem>

                                }
                            }
                            )}
                        </Select>
                    </FormControl>
                    {presets.length > 0 ?
                        <SelectImage selectCallback={selectCallback} activities={myPreset.Activities} images={["image10.png", "image11.png", "image5.png", "image6.png", "image10.png", "image11.png", "image5.png", "image6.png", "image7.png", "image8.png"]} />
                        :
                        ""
                    }
                    <Button autoFocus onClick={() => handleClose(true)}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}