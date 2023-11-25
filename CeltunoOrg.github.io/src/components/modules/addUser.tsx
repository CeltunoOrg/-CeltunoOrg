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
import PresetDataManager from '../../../../Old/functions/presetDataManager'
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import "../../../styles/Edit.css"

// import PresetDataService from "../../services/preset-firebase-service"
import { IDayActivity, IPreset, ISelectImage, IUser } from '../../types/day.type';
import { Divider, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import SelectImage from './selectImage';
import { isNullOrUndefined } from '../../../../Old/functions/common';
import UserDataManager from '../../../../Old/functions/userDataManager';
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

    propCurrentUser: IUser | null
    addUserCallback: (newUser: IUser | null) => IUser | null

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

export default function AddUser(props: Props) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
        if (props.propCurrentUser && props.propCurrentUser !== user)
            setUser(props.propCurrentUser)
        // if (props.dayArrayLength > topId)
        //     setTopId(props.dayArrayLength)
        if (topId <= 0) {
            const returnData = UserDataManager.FetchAllUserData()
            if (topId < returnData.topId)
                setTopId(returnData.topId)
        }
    };

    const handleClose = (save: boolean) => {
        if (save) {
            console.log("Saved")
            if (user.Id >= 0)
                updateUser(user.Id);
            // else console.log("CLOSING -ID was NULL - no update")
            props.addUserCallback(user)
        }
        setOpen(false);
    };
    const [topId, setTopId] = React.useState<number>(0);
    // const [user, setPresets] = React.useState<IPreset[]>([]);
    const [user, setUser] = React.useState<IUser>(
        {
            Id: 0,
            Name: "",
            Days: [],
            Presets: [],
            LastDay: null,
            Config: {
                title: "",
                titleSize: "",
                color1: "",
                color2: "",
                background: "",
                role: ""
            }
        }
    );

    useEffect(() => {

        if (props.propCurrentUser && props.propCurrentUser.Id !== user.Id)
            setUser(props.propCurrentUser)
        // if (topId === 0  user.length <= 0)
        const returnData = UserDataManager.FetchAllUserData()
        if (topId < returnData.topId)
            setTopId(returnData.topId)
        // getAllPresets();
        // if (topId > 0)
        // handleTopId(result.topId)
        // console.log(`Effect - TopId: ${topId}`)

        // if (presets.length <= 0)
        //     handlePresets(result.presets)

    }, []);

    let tmpMyUser: IUser | null = null;

    // const handleTopId = (newId: number) => {
    //     if (topId < newId)
    //         setTopId(newId)
    // }


    const handleUser = (newUser: IUser) => {
        console.log(`Handling user - ${newUser.Name} `)
        console.log(newUser)
        setUser(newUser)
        console.log("After:")
        console.log(user)
    }


    // const handlePresets = (newUser: IUser) => {
    //     setUser(newUser)
    // }

    const getAllPresets = () => {
        const returnData = UserDataManager.FetchAllUserData()
        // if (returnData.Users)
        // handleUser(returnData.Users)
        // if (topId && topId !== 0)
        //     handleTopId(returnData.topId)

    }

    const updateUser = (id: number | null) => {
        const tmpMyUser1 = { ...user }
        if (id === undefined || id === null || id === 0) {
            console.log("No id provided, creating new...");
            const returnResult = UserDataManager.FetchAllUserData()            
                setTopId(returnResult.topId)
            id = topId
        }
        console.log("Updating user");
        if (id === 0)
            return
        UserDataManager.UpdateUser(id, tmpMyUser1)
        setUser(tmpMyUser1)

    }

    // const removePresetActivity = (activityId: number, activityIndex: number) => {
    //     const tmpPreset ={...myPreset}
    //     const index: number = tmpPreset.Activities.indexOf(tmpPreset.Activities[activityIndex], 0)
    //     if (index > -1) {
    //         tmpPreset.Activities.splice(index, 1);
    //     }
    //     PresetDataManager.RemovePresetActivity(activityId, activityIndex, tmpPreset)
    //     handlePreset(tmpPreset)
    // }

    // const setActivitiesFromPreset = (key: string) => {
    //     const keyInt = Number.parseInt(key);

    //     tmpMyPreset = { ...myPreset }
    //     if (tmpMyPreset)
    //         if (keyInt !== null && keyInt !== undefined) {
    //             const newPreset = { ...user[keyInt] }
    //             tmpMyPreset.Activities = newPreset.Activities
    //             handlePreset(tmpMyPreset)
    //             // updateMyPreset(tmpMyPreset.Id)
    //         }
    // }

    const updateName = (event) => {
        const name = event.target.value;
        tmpMyUser = { ...user }
        tmpMyUser.Name = name
        // const returnData = PresetManager.FetchAllPresets();
        if (tmpMyUser.Id === 0) {
            console.log("UPDATENAME - TOPAFTER GETALLL")
            // tmpMyUser.Id = topId
        }
        // setTopId(returnData.topId)
        setUser(tmpMyUser)
        return null
        // updateMyDay  (tmpActivity.Id)
    }

    // const changeOrder = (moveUp: boolean, elementIdString: string, index: number, id: number | null) => {
    //     console.log(`Index: ${index}  - Id: ${id}`)
    //     const activityDiv = document.getElementById(`${elementIdString}${index.toString()}`);
    //     if (activityDiv && id !== null) {
    //         tmpMyPreset = { ...myPreset }
    //         if (tmpMyPreset.Activities.length > 0) {
    //             const activity = tmpMyPreset?.Activities[index]
    //             let currentOrder = activity.Order
    //             if (!currentOrder || currentOrder === undefined)
    //                 currentOrder = "0"
    //             let activityIdNum = Number.parseInt(currentOrder);
    //             console.log(`Current order: ${currentOrder}`)
    //             if (moveUp && activityIdNum > 0) {
    //                 console.log("Moving up")
    //                 activityIdNum -= 1;
    //             }
    //             else {
    //                 console.log("Moving down")
    //                 activityIdNum += 1;
    //             }
    //             activityDiv.style.order = `${activityIdNum}`
    //             activity.Order = activityIdNum ? activityIdNum.toString() : "0";
    //             tmpMyPreset.Activities[index] = activity
    //             setMyPreset(tmpMyPreset)
    //             console.log(`New order: ${activityDiv.style.order}`)
    //         }
    //     }

    // }

    const selectCallback = (theSelected: Array<ISelectImage>) => {
        console.log(theSelected)
        const newUserItems: IDayActivity[] = []

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

                newUserItems.push(tmpActivity)
            }
        })
        tmpMyUser = { ...user }
        // tmpMyUser.Activities = newPresetActivities
        setUser(tmpMyUser)
        return theSelected
    }

    return (
        <div>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <Button className='classes.button' onClick={handleOpen}>
                {(user && user.Days.length > 0) ? <EditIcon /> : <AddIcon />}
            </Button>
            <BootstrapDialog
                onClose={() => handleClose(false)}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={() => handleClose(false)}>
                    <Typography gutterBottom>
                        Add  User
                    </Typography>
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <>
                        {
                            <div className='padder'>
                                <div>
                                    <TextField
                                        id="standard-basic"
                                        label="User name"
                                        variant="standard"
                                        value={user.Name}
                                        onChange={e => updateName(e)}
                                    />
                                </div>

                                <Divider component="li" sx={{ margin: '5%' }} variant='inset' />

                                {user.Days ?
                                    <div className='updateBox' >
                                        {
                                            user.Days.map((day, activityIndex) =>
                                            (
                                                <div className="listContainerRow" id={day.Name + activityIndex.toString()} key={activityIndex} style={{ order: "0", }}>
                                                    <div

                                                        className='listContainerRowImages  '
                                                    >
                                                        No data
                                                        {/* <img src={`../images/${activity.Image}`} /> */}
                                                        <Divider component="li" sx={{ margin: '5%' }} variant='middle' />
                                                    </div>
                                                    <Divider component="li" orientation="vertical" flexItem />
                                                    {/* <div className='listContainerRowButtons'>
                                                        {activity.Order !== "0" ?
                                                            <Button onClick={() => changeOrder(true, activity.Name, activityIndex, user.Id)}>{' '}<ExpandLessOutlined /></Button>
                                                            :
                                                            ""}
                                                        <br />
                                                        <Button onClick={() => changeOrder(false, activity.Name, activityIndex, user.Id)}>{' '}<ExpandMoreOutlined /></Button>
                                                        <br />
                                                        <Button onClick={() => removePresetActivity(activity.Id, activityIndex)}><i className="fa fa-trash" aria-hidden="true"></i></Button>
                                                    </div> */}
                                                </div>

                                            )
                                            )}
                                    </div>
                                    : <p>{"No Users"}</p>
                                }
                            </div>

                        }
                    </>
                </DialogContent>
                <DialogActions>
                    {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Select template</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="presetSelector"
                            value={`999`}
                            // onChange={e => setActivitiesFromPreset(e.target.value)}
                            label="Preset"
                        >
                            <MenuItem value={`999`} key={`999`} selected={true}>
                                <em>None</em>
                            </MenuItem>
                            {user.Days.map(function (preset, index) {

                                if (preset && preset.Id > 0) {

                                    return <MenuItem key={index} value={index}>{preset.Name}</MenuItem>

                                }
                            }
                            )}
                        </Select>
                    </FormControl> */}
                    {/* {user.Days.length > 0 ?
                        <SelectImage selectCallback={selectCallback} activities={user.Days} images={["image10.png", "image11.png", "image5.png", "image6.png", "image10.png", "image11.png", "image5.png", "image6.png", "image7.png", "image8.png"]} />
                        :
                        ""
                    } */}
                    <Button autoFocus onClick={() => handleClose(true)}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
