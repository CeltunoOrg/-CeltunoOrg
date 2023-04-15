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
import PresetDataService from "../services/preset-firebase-service"
import IDay, { IDayActivity, IImagePreset, IMyDay, IPreset, ISelectImage } from '../types/day.type';
import { ImageListItemBar, TextField } from '@mui/material';
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
    images: Array<string> | null;
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
    myDay: IMyDay | null
    dayArrayLength: number
    editCallback: (theEdited: IMyDay | null) => IMyDay | null//theSelected: ISelectImage []}

}
export default function ActivityEditor(props: Props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        if (props.myDay && props.myDay !== myDay)
            setMyDay(props.myDay)

    };
    const handleClose = (save: boolean) => {

        if (save) {
            console.log("Saved")
            setMyDay(myDay);
            updateMyDay(myDay.Id);
        }
        props.editCallback(myDay)
        setOpen(false);
    };

    const [myDay, setMyDay] = React.useState<IMyDay>(
        {
            Id: null,
            Name: "",
            Description: "",
            Activities: []

        }
    );
    const initDay: IMyDay =
    {
        Id: props.dayArrayLength,
        Name: "",
        Description: "",
        Activities: []
    }
    // const currentPreset = props.myDay !== null ?
    //     props.myDay
    //     :
    //     initDay



    useEffect(() => {
        // if (currentPreset !== null)
        if (props.myDay && props.myDay !== myDay)
            setMyDay(props.myDay)

        // PresetDataService.getdbAll().then((data) => {

        //     // useTheRef(db, '/');
        //     useTheOnValue(data, (snapshot) => {
        //         // const snapshotValue = snapshot.val();
        //         // console.log(data.toJSON)
        //         if (snapshot.exists()) {
        //             console.log("Snapshot found, mapping data:");
        //             snapshot.forEach(function (childSnapshot) {
        //                 console.log(childSnapshot.val())
        //                 const key = childSnapshot.key;
        //                 const childData = childSnapshot.val() as IPreset;
        //                 childData.Id = key ?? "";
        //                 //   dayArray.push(childData);
        //             })
        //             console.log("DB items found:");
        //             // console.log(dayArray.length)
        //         }
        //     })
        // })
    }
        , []);

    const updateMyDay = (id: number | null) => {
        // const key = this.props.selectedDayId;
        if (id === undefined || id === null) {
            console.log("No id provided, creating new...");
            id = props.dayArrayLength


        }
        console.log("Updating activity");
        PresetDataService.updateMyDayItemDb(id, myDay)
    }
    const getOneDay = (key: number) => {
        let day: IMyDay;
        if (key) {
            PresetDataService.getDbOne("planner", key).then((data) => {

                // useTheRef(db, '/');
                useTheOnValue(data, (snapshot) => {
                    // const snapshotValue = snapshot.val();
                    // console.log(data.toJSON)
                    if (snapshot.exists()) {
                        console.log("Snapshot found, mapping data:");
                        let childData = snapshot.val() as IMyDay;
                        // const key = childSnapshot.key;
                        console.log(snapshot.val())
                        childData.Id = key;
                        day = childData;
                    }
                    // if (tmpData.length !== activities.length)
                    //     setTheActivities()
                    console.log("DB item found:");
                    console.log(day)
                })
                handleDay(day)

            })
        }
    }
    const handleDay = (day: IMyDay) => {
        setMyDay(day)
    }
    const updateName = (event, daysName: string) => {

        let name = event.target.value;
        const tmpActivity = { ...myDay }
        tmpActivity.Name = name
        setMyDay(tmpActivity)
        updateMyDay(tmpActivity.Id)
    }

    const moveUp = (index: number, id: number | null) => {
        console.log(`Index: ${index}  - Id: ${id}`)
        let activityDiv = document.getElementById(`act${index.toString()}`);
        if (activityDiv && id !== null) {
            const tmpActivity: IMyDay = { ...myDay }
            if (tmpActivity.Activities.length > 0) {
                const activity = tmpActivity?.Activities[index]
                let activityIdNum = Number.parseInt(activity.Order ?? "0");
                console.log(`Style: ${activity?.Order}`)
                if (activityIdNum > 0)
                    activityIdNum -= 1;
                activityDiv.style.order = `${activityIdNum}`
                activity.Order = activityIdNum ? activityIdNum.toString() : "0";
                tmpActivity.Activities[index] = activity
                setMyDay(tmpActivity)
                // updateMyDay(id)

                console.log(`Style: ${activityDiv.style.order}`)
            }
        }
    }
    const moveDown = (index: number, id: number | null) => {
        console.log(`Index: ${index}  - Id: ${id}`)
        let activityDiv = document.getElementById(`act${index.toString()}`);
        if (activityDiv && id !== null) {
            const tmpActivity: IMyDay = { ...myDay }
            if (tmpActivity.Activities.length > 0) {
                const activity = tmpActivity?.Activities[index]
                let activityIdNum = Number.parseInt(activity.Order ?? "0");
                console.log(`Style: ${activity?.Order}`)
                if (activityIdNum <= 0)
                    activityIdNum += 2;
                else
                    activityIdNum += 1;
                activityDiv.style.order = `${activityIdNum}`
                activity.Order = activityIdNum ? activityIdNum.toString() : "0";
                tmpActivity.Activities[index] = activity
                setMyDay(tmpActivity)
                // updateMyDay(id)

                console.log(`Style: ${activityDiv.style.order}`)
            }
        }

    }

    const selectImage = (index: number, id: number) => {
        const tmpActivity: IMyDay = { ...myDay }
        if (tmpActivity.Activities.length > 0) {
            const activity = tmpActivity?.Activities[index]
            activity.Selected = true
            activity.Order = "0"
            tmpActivity.Activities[index] = activity
            setMyDay(tmpActivity)
        }
        updateMyDay(id)
    }

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
        let tmpPreset: IMyDay = { ...myDay }
        tmpPreset.Activities = tmpActivities
        setMyDay(tmpPreset)
        return theSelected
    }

    const removeActivity = (activityId: number, activityIndex: number) => {
        let tmpday = { ...myDay }
        if (tmpday.Id && tmpday.Id !== null && activityId !== null) {
            const index: number = tmpday.Activities.indexOf(tmpday.Activities[activityIndex], 0)
            if (index > -1) {
                tmpday.Activities.splice(index, 1);
            }
            // delete tmpday.Activities[activityIndex]
            // tmpday.Activities.[activityIndex]
            // tmpday.Activities.splice(activityIndex,1)
            handleDay(tmpday)
            PresetDataService.updateMyDayItemDb(tmpday.Id, myDay)
            getOneDay(tmpday.Id)
        }

    }
    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <Button variant="outlined" onClick={handleClickOpen}>
                {(myDay.Activities && myDay.Activities.length > 0) ? "Edit activity" : "Add activity"}
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={() => handleClose(false)} images={null}>
                    Edit Activity
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {/* <Typography gutterBottom>
                        Name - Image - Description
                    </Typography> */}
                    <>
                        {

                            // props.preset?.map((preset, presetIndex) =>
                            // (
                            <div>
                                <TextField
                                    id="standard-basic"
                                    label="Activity name"
                                    variant="standard"
                                    value={myDay.Name}
                                    onChange={e => updateName(e, myDay.Name)}
                                />
                                {/* {currentPreset.Name} */}
                                {myDay.Activities ?
                                    <div className='updateBox' >
                                        {
                                            myDay.Activities.map((activity, activityIndex) =>
                                            (
                                                <div className="dayListContainerRow">

                                                    <div
                                                        id={"act" + activityIndex.toString()} key={"act" + activityIndex} style={{ order: (activity.Order), }}
                                                        className='editImageContainer  '
                                                    // onClick={() => { selectImage(activityIndex, activity.Id) }}
                                                    //     style={{
                                                    //         // backgroundColor: 'salmon',
                                                    // }}
                                                    >

                                                        {/* <img src={`../images/image${index+4}.png`} /> */}
                                                        <img src={`../images/${activity.Image}`} />
                                                    </div>
                                                    <div>
                                                        {activity.Order !== "0" ?
                                                            <Button onClick={() => moveUp(activityIndex, myDay.Id)}>Up</Button>
                                                            :
                                                            ""}
                                                        <br />
                                                        <Button onClick={() => moveDown(activityIndex, myDay.Id)}>Down</Button>
                                                        <br />
                                                        <Button onClick={() => removeActivity(activity.Id, activityIndex)}><i className="fa fa-trash" aria-hidden="true"></i></Button>
                                                    </div>
                                                </div>

                                            )
                                            )}
                                    </div>
                                    :


                                    <p>
                                        {"No activities"}
                                    </p>
                                }
                            </div>

                        }
                    </>


                </DialogContent>
                <DialogActions>
                    {props.dayArrayLength > 0 ?
                        <SelectImage selectCallback={selectCallback} activities={myDay.Activities} images={["image10.png", "image11.png", "image5.png", "image6.png", "image10.png", "image11.png", "image5.png", "image6.png", "image7.png", "image8.png"]} />
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