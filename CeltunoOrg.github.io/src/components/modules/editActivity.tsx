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


import "../../../styles/Edit.css"

import PlannerDataService from "../../services/planner-firebase-service"
import IDay, { DataType, IDayActivity, IImagePreset, IMyDay, IPreset, ISelectImage } from '../../types/day.type';
import { Divider, FormControl, ImageListItemBar, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import SelectImage from './selectImage';
import { useTheOnValue } from '../../../firebase-planner';

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
    // activities: IDayActivity[]
    isOpen: boolean
    propMyDay: IMyDay | null
    hideAll: boolean
    editCallback: (theEdited: IMyDay | null) => IMyDay | null//theSelected: ISelectImage []}

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

export default function ActivityEditor(props: Props) {
    const [open, setOpen] = React.useState(false);
    // const {    isOpen, propMyDay, hideAll} = props
    const handleOpen = () => {
        setOpen(true);
        if (props.propMyDay && props.propMyDay !== myDay)
            setMyDay(props.propMyDay)
        // if (props.dayArrayLength > topId)
        //     setTopId(props.dayArrayLength)
        // getPresetDbData()
        if (topId <= 0)
            getAll()

    };
    const handleClose = (save: boolean) => {
        if (save) {
            console.log("Saved")
            if (myDay.Id > 0)
                updateMyDay(myDay.Id);
            else console.log("CLOSING -ID was NULL - no update")
            props.editCallback(myDay)
        }
        setOpen(false);
    };
    const [hidden, setHidden] = React.useState<boolean>(false);
    const [topId, setTopId] = React.useState<number>(0);
    const [presets, setPresets] = React.useState<IPreset[]>([]);
    const [myDay, setMyDay] = React.useState<IMyDay>(
        {
            Id: 0,
            Name: "",
            Description: "",
            Activities: []
        }
    );

    const handleHiding = () => {
        if (props.hideAll)
            setHidden(props.hideAll)
    }

    useEffect(() => {

        if (props.propMyDay && props.propMyDay !== myDay)
            setMyDay(props.propMyDay)
        if (presets.length <= 0)
            handleHiding()
        getPresetDbData()

        getAll()
        // if (props.dayArrayLength > topId)
        //     setTopId(props.dayArrayLength)

    }, []);

    const tmpData: Array<IMyDay> = new Array<IMyDay>;

    function getHighest() {
        const calculateHighest = () => {
            if (tmpData.length > 0) {

                const sortedDays = tmpData.sort((a, b) => (a.Id > b.Id) ? -1 : 1);
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
        PlannerDataService.GetAllItemsDB(DataType.Planner).then((data) => {
            useTheOnValue(data, (snapshot) => {
                if (snapshot.exists()) {
                    console.log("Snapshot found, mapping PLANNER data:");
                    snapshot.forEach(function (childSnapshot) {
                        const key = childSnapshot.key;
                        if (!key)
                            return
                        const values = childSnapshot.val()
                        const childData: IMyDay = {
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
            console.log("After all days")
            getHighest()
        })
        return tmpData
    }

    const updateMyDay = (id: number | null) => {
        const tmpDay = myDay
        if (id === undefined || id === null || id === 0) {
            console.log("No id provided, creating new...");
            getAll()
            id = topId
        }
        console.log("Updating activity");
        if (id === 0)
            return
        if (tmpDay.Description == undefined)
            tmpDay.Description = ""
        PlannerDataService.UpdateMyDayItemDb(id, myDay)
        setMyDay(tmpDay)
    }


    const getOneDay = (key: number) => {
        let day: IMyDay;
        if (key) {
            PlannerDataService.GetDbOne(DataType.Planner, key).then((data) => {
                useTheOnValue(data, (snapshot) => {
                    if (snapshot.exists()) {
                        console.log("Snapshot found PLANNER setting ONE:");
                        const childData = snapshot.val() as IMyDay;
                        console.log(snapshot.val())
                        if (childData.Description == undefined)
                            childData.Description = ""
                        childData.Id = key;
                        day = childData;
                    }
                    handleDay(day)
                })
            })
        }
    }

    const handleDay = (day: IMyDay) => {
        setMyDay(day)
    }

    const tmpPreset: IPreset[] = []

    const setThePresets = () => {
        setPresets(tmpPreset)
    }


    const getPresetDbData = () => {
        PlannerDataService.GetAllItemsDB(DataType.Presets).then((data) => {
            useTheOnValue(data, (snapshot) => {
                if (snapshot.exists()) {
                    console.log("Snapshot found, mapping PRESET data:");
                    snapshot.forEach(function (childSnapshot) {
                        const key = childSnapshot.key;
                        if (!key)
                            return
                        const childData = childSnapshot.val() as IPreset;
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
            const tmpDay = { ...myDay }
            tmpDay.Activities = tmpPreset.Activities
            setMyDay(tmpDay)
            // updateMyDay(tmpDay.Id)
        }
    }

    const updateName = (event) => {
        const name = event.target.value;
        const tmpActivity = { ...myDay }
        tmpActivity.Name = name
        if (tmpActivity.Id === 0) {
            getAll();
            console.log("UPDATENAME - TOPAFTER GETALLL")
            tmpActivity.Id = topId
        }
        setMyDay(tmpActivity)
        return null
        // updateMyDay(tmpActivity.Id)
    }

    const changeOrder = (moveUp: boolean, elementIdString: string, index: number, id: number | null) => {
        console.log(`Index: ${index}  - Id: ${id}`)
        const activityDiv = document.getElementById(`${elementIdString}${index.toString()}`);
        if (activityDiv && id !== null) {
            const tmpActivity: IMyDay = { ...myDay }
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
                setMyDay(tmpActivity)
                console.log(`New order: ${activityDiv.style.order}`)
            }
        }

    }

    const selectCallback = (theSelected: Array<ISelectImage>) => {
        console.log(theSelected)
        const tmpActivities: IDayActivity[] = []
        let tmpData: Array<ISelectImage> = [];
        tmpData = Array.from({ ...theSelected });
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

                tmpActivities.push(tmpActivity)
            }
        })
        const tmpPreset: IMyDay = { ...myDay }
        tmpPreset.Activities = tmpActivities
        setMyDay(tmpPreset)
        return theSelected
    }

    const removeActivity = (activityId: number, activityIndex: number) => {
        const tmpday = { ...myDay }
        if (tmpday.Id && tmpday.Id !== null && activityId !== null) {
            const index: number = tmpday.Activities.indexOf(tmpday.Activities[activityIndex], 0)
            if (index > -1) {
                tmpday.Activities.splice(index, 1);
            }
            // delete tmpday.Activities[activityIndex]
            // tmpday.Activities.[activityIndex]
            // tmpday.Activities.splice(activityIndex,1)
            if (tmpday.Description === undefined)
                tmpday.Description = ""
            handleDay(tmpday)
            PlannerDataService.UpdateMyDayItemDb(tmpday.Id, tmpday)
            getOneDay(tmpday.Id)
        }

    }
    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <Button hidden={hidden} className='classes.button' onClick={handleOpen}>
                {(myDay.Activities && myDay.Activities.length > 0) ? <EditIcon /> : <AddIcon />}
            </Button>
            <BootstrapDialog
                onClose={() => handleClose(false)}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={() => handleClose(false)}>
                    <Typography gutterBottom>
                        Edit Activity
                    </Typography>
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <>
                        {

                            // props.preset?.map((preset, presetIndex) =>
                            // (
                            <div className='padder'>
                                <div>
                                    <TextField
                                        id="standard-basic"
                                        label="Activity name"
                                        variant="standard"
                                        value={myDay.Name}
                                        onChange={e => updateName(e)}
                                    />
                                </div>

                                <Divider component="li" sx={{ margin: '5%' }} variant='inset' />
                                {/* {currentPreset.Name} */}
                                {myDay.Activities ?
                                    <div className='updateBox' >
                                        {
                                            myDay.Activities.map((activity, activityIndex) =>
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
                                                        {/* <Divider component="li" sx={{ margin: '5%' }} variant='middle' /> */}
                                                    </div>
                                                    {/* <Divider component="li" orientation="vertical" flexItem /> */}
                                                    <div className='listContainerRowButtons'>
                                                        {activity.Order !== "0" ?
                                                            <Button onClick={() => changeOrder(true, activity.Name, activityIndex, myDay.Id)}>{' '}<ExpandLessOutlined /></Button>
                                                            :
                                                            ""}
                                                        <br />
                                                        <Button onClick={() => changeOrder(false, activity.Name, activityIndex, myDay.Id)}>{' '}<ExpandMoreOutlined /></Button>
                                                        <br />
                                                        <Button onClick={() => removeActivity(activity.Id, activityIndex)}><i className="fa fa-trash" aria-hidden="true"></i></Button>
                                                    </div>
                                                </div>

                                            )
                                            )}
                                    </div>
                                    : <p>{"No activities"}</p>
                                }
                            </div>
                        }
                    </>
                </DialogContent>
                <DialogActions>
                    {/* <div className='editButtonsBox'></div> */}
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} fullWidth={true} >
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
                    <div className='editButtons'>
                        {presets.length > 0 ?
                            <SelectImage selectCallback={selectCallback} activities={myDay.Activities} images={["image10.png", "image11.png", "image5.png", "image6.png", "image10.png", "image11.png", "image5.png", "image6.png", "image7.png", "image8.png"]} />
                            :
                            ""
                        }
                        <Button autoFocus onClick={() => handleClose(true)}>
                            Save changes
                        </Button>
                    </div>
                {/* </div> */}
            </DialogActions>
        </BootstrapDialog>
        </div >
    );


}