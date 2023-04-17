import React, { useEffect } from 'react';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import ExpandLessOutlined from '@mui/icons-material/ExpandLessOutlined'
import ExpandMoreOutlined from '@mui/icons-material/ExpandMoreOutlined';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import "../../styles/Edit.css"

import PresetDataService from "../services/preset-firebase-service"
import IDay, { IDayActivity, IImagePreset, IMyDay, IPreset, ISelectImage } from '../types/day.type';
import { Divider, FormControl, ImageListItemBar, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import SelectImage from './selectImage';
import { useTheOnValue } from '../../firebase-planner';

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
interface Props {
    children?: React.ReactNode
    // activities: IDayActivity[]

    myPreset: IPreset | null
    dayArrayLength: number
    editCallback: (theEdited: IPreset | null) => IPreset | null//theSelected: ISelectImage []}

}
export default function PresetEditor(props: Props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        if (props.myPreset && props.myPreset !== myPreset)
            setMyPreset(props.myPreset)
        // if (props.dayArrayLength > topId)
        //     setTopId(props.dayArrayLength)
        getPresetDbData()
        if (topId <= 0)
            getAll()

    };
    const handleClose = (save: boolean) => {
        if (save) {

            console.log("Saved")
            if (myPreset.Id > 0)
                updateMyPreset(myPreset.Id);
            else console.log("CLOSING -ID was NULL - no update")
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

        if (props.myPreset && props.myPreset !== myPreset)
            setMyPreset(props.myPreset)
        if (presets.length <= 0)
            getPresetDbData()

        getAll()
        // if (props.dayArrayLength > topId)
        //     setTopId(props.dayArrayLength)

    }, []);

    const tmpData: Array<IPreset> = new Array<IPreset>;

    function getHighest() {
        const calculateHighest = () => {
            if (tmpData.length > 0) {

                let sortedDays = tmpData.sort((a, b) => (a.Id > b.Id) ? -1 : 1);
                return sortedDays[0].Id + 1
            }
            else
                return 1
        }
        const theHighest = calculateHighest()
        setTopId(theHighest)
        // console.log(`GETHIGHEST - Activity-Highest: ${topId}`)
    }
    const getAll = () => {


        PresetDataService.getAllItemsDB("presets").then((data) => {
            useTheOnValue(data, (snapshot) => {
                if (snapshot.exists()) {
                    console.log("Snapshot found, mapping PRESET data:");
                    snapshot.forEach(function (childSnapshot) {
                        const key = childSnapshot.key;
                        if (!key)
                            return
                        const values = childSnapshot.val()
                        let childData: IPreset = {
                            Id: Number.parseInt(key),
                            Name: values.Name ?? "",
                            Description: values.Descritption ?? "",
                            Activities: values.Activities
                        }
                        childData.Id = Number.parseInt(key);
                        tmpData.push(childData);
                    })
                    getHighest()
                    console.log(`DB items found: ${tmpData.length} Top Id: ${topId}`);
                }
            })
        }).then(() => {
            console.log("After all presets")
            getHighest()
        })
        return tmpData
    }

    const updateMyPreset = (id: number | null) => {
        const tmpPreset = myPreset
        if (id === undefined || id === null || id === 0) {
            console.log("No id provided, creating new...");
            getAll()
            id = topId
        }
        console.log("Updating preset");
        if (id === 0)
            return
        if (tmpPreset.Description == undefined)
            tmpPreset.Description = ""
        PresetDataService.updatePresetItemDb(id, myPreset)
    }


    const getOnePreset = (key: number) => {
        let preset: IPreset;
        if (key) {
            PresetDataService.getDbOne("presets", key).then((data) => {
                useTheOnValue(data, (snapshot) => {
                    if (snapshot.exists()) {
                        console.log("Snapshot found PRESET setting ONE:");
                        let childData = snapshot.val() as IPreset;
                        console.log(snapshot.val())
                        if (childData.Description == undefined)
                            childData.Description = ""
                        childData.Id = key;
                        preset = childData;
                    }
                    handlePreset(preset)
                })
            })
        }
    }

    const handlePreset = (preset: IPreset) => {
        setMyPreset(preset)
    }

    let tmpPreset: IPreset[] = []

    const setThePresets = () => {
        setPresets(tmpPreset)
    }


    const getPresetDbData = () => {
        PresetDataService.getAllItemsDB("presets").then((data) => {
            useTheOnValue(data, (snapshot) => {
                if (snapshot.exists()) {
                    console.log("Snapshot found, mapping PRESET data:");
                    snapshot.forEach(function (childSnapshot) {
                        const key = childSnapshot.key;
                        if (!key)
                            return
                        let childData = childSnapshot.val() as IPreset;
                        childData.Id = Number.parseInt(key);
                        tmpPreset.push(childData);
                    })
                    if (tmpPreset.length !== presets.length)
                        setThePresets()
                    console.log(tmpPreset.length)
                }
            })
        })
        return tmpPreset
    }


    const setActivitiesFromPreset = (key: string) => {
        const keyInt = Number.parseInt(key);

        if (keyInt !== null && keyInt !== undefined) {
            const tmpPreset = { ...presets[keyInt] }
            const tmpMyPreset = { ...myPreset }
            tmpMyPreset.Activities = tmpPreset.Activities
            setMyPreset(tmpMyPreset)
            updateMyPreset(tmpMyPreset.Id)
        }
    }

    const updateName = (event) => {
        let name = event.target.value;
        const tmpActivity = { ...myPreset }
        tmpActivity.Name = name
        if (tmpActivity.Id === 0) {
            getAll();
            console.log("UPDATENAME - TOPAFTER GETALLL")
            tmpActivity.Id = topId
        }
        setMyPreset(tmpActivity)
        return null
        updateMyPreset(tmpActivity.Id)
    }

    
    const changeOrder = (moveUp: boolean, elementIdString: string, index: number, id: number | null) => {
        console.log(`Index: ${index}  - Id: ${id}`)
        let activityDiv = document.getElementById(`${elementIdString}${index.toString()}`);
        if (activityDiv && id !== null) {
            const tmpActivity: IPreset = { ...myPreset }
            if (tmpActivity.Activities.length > 0) {
                const activity = tmpActivity?.Activities[index]
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
                tmpActivity.Activities[index] = activity
                setMyPreset(tmpActivity)
                console.log(`New order: ${activityDiv.style.order}`)
            }
        }

    }

    // const selectImage = (index: number, id: number) => {
    //     const tmpMyPreset: IPreset = { ...myPreset }
    //     if (tmpMyPreset.Activities.length > 0) {
    //         let activity = tmpMyPreset?.Activities[index]
    //         activity.Selected = true
    //         activity.Order = "0"
    //         tmpMyPreset.Activities[index] = activity
    //         setMyPreset(tmpMyPreset)
    //     }
    //     updateMyPreset(id)
    // }

    const selectCallback = (theSelected: Array<ISelectImage>) => {
        console.log(theSelected)
        let tmpActivities: IDayActivity[] = []
        let tmpData: Array<ISelectImage> = [];
        tmpData = Array.from({ ...theSelected });
        Object.keys(theSelected).map((i) => {
            if (theSelected[i].Selected) {
                let tmpActivity: IDayActivity =
                {
                    Id: Number.parseInt(i),
                    Name: theSelected[i].Image,
                    Image: theSelected[i].Image,
                    Order: theSelected[i].toString(),
                    Selected: theSelected[i].Selected
                }

                tmpActivities.push(tmpActivity)
            }
        })
        let tmpPreset: IPreset = { ...myPreset }
        tmpPreset.Activities = tmpActivities
        setMyPreset(tmpPreset)
        return theSelected
    }

    const removeActivity = (activityId: number, activityIndex: number) => {
        let tmpPreset = { ...myPreset }
        if (tmpPreset.Id && tmpPreset.Id !== null && activityId !== null) {
            const index: number = tmpPreset.Activities.indexOf(tmpPreset.Activities[activityIndex], 0)
            if (index > -1) {
                tmpPreset.Activities.splice(index, 1);
            }
            // delete tmpday.Activities[activityIndex]
            // tmpday.Activities.[activityIndex]
            // tmpday.Activities.splice(activityIndex,1)
            if (tmpPreset.Description === undefined)
                tmpPreset.Description = ""
            handlePreset(tmpPreset)
            PresetDataService.updatePresetItemDb(tmpPreset.Id, tmpPreset)
            getOnePreset(tmpPreset.Id)
        }

    }
    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <Button className='classes.button'  onClick={handleClickOpen}>
                {(myPreset.Activities && myPreset.Activities.length > 0) ? <EditIcon/> : <AddIcon/>}
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
                                                    // onClick={() => { selectImage(activityIndex, activity.Id) }}
                                                    //     style={{
                                                    //         // backgroundColor: 'salmon',
                                                    // }}
                                                    >
                                                        <img src={`../images/${activity.Image}`} />
                                                        <Divider component="li" sx={{ margin: '5%' }} variant='middle' />
                                                    </div>
                                                    <Divider component="li" orientation="vertical" flexItem />
                                                    <div className='listContainerRowButtons'>
                                                        {activity.Order !== "0" ?
                                                            <Button onClick={() => changeOrder(true,activity.Name, activityIndex, myPreset.Id)}>{' '}<ExpandLessOutlined /></Button>
                                                            :
                                                            ""}
                                                        <br />
                                                        <Button onClick={() => changeOrder(false,activity.Name,activityIndex, myPreset.Id)}>{' '}<ExpandMoreOutlined /></Button>
                                                        <br />
                                                        <Button onClick={() => removeActivity(activity.Id, activityIndex)}><i className="fa fa-trash" aria-hidden="true"></i></Button>
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



                            {/* )} */}
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