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
import { IDayActivity, IImagePreset, IMyDay, IPreset , ISelectImage} from '../types/day.type';
import { TextField } from '@mui/material';
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
    preset: IPreset

}
export default function PresetEditor(props: Props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        
        setPreset(preset)
        updatePreset(preset.Id)
        setOpen(false);
    };

    const [preset, setPreset] = React.useState<IPreset>(
        {
            Id: 0,
            Name: "string",
            Description: "string",
            Activities: []

        }
    );
    const [lastNum, setLastNum] = React.useState("");

    const currentPreset = props.preset;

    const addImage = (key: number, image: string) => {
        // updateDay(key)
        console.log("Adding image")
        // currentPreset.Activities.image = image
        PresetDataService.updatePresetItemDb(key, currentPreset)
        console.log(currentPreset.Activities)

    }

    useEffect(() => {

        setPreset(currentPreset)

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











        // const fetchData = async () => {
        //   await getAllDbEntries();      
        // }      
        // call the function
        // fetchData().then(
        // setKeyFromDate)
        //   // make sure to catch any error
        //  .catch(console.error);
    }
        , []);

    const updatePreset = (id: number | null) => {
        // const key = this.props.selectedDayId;
        if (id === undefined || id === null) {
            console.log("No id provided");
            return
        }
        console.log("Updating preset");
        PresetDataService.updatePresetItemDb(id, preset)
    }

    const updateName = (event) => {

        let name = event.target.value;
        const tmpPreset = {...preset}        
        tmpPreset.Name = name
        setPreset(tmpPreset)
        updatePreset(tmpPreset.Id)
    }

    const moveUp = (index: number, id: number) => {
        console.log(`Index: ${index}  - Id: ${id}`)
        let activityDiv = document.getElementById(`act${index.toString()}`);
        if (activityDiv) {
            const tmpPreset: IPreset = { ...preset }
            if (tmpPreset.Activities.length > 0) {

                const activity = tmpPreset?.Activities[index]
                let activityIdNum = Number.parseInt(activity.Order ?? "0");
                console.log(`Style: ${activity?.Order}`)
                if (activityIdNum > 0)
                    activityIdNum -= 1;
                activityDiv.style.order = `${activityIdNum}`
                activity.Order = activityIdNum ? activityIdNum.toString() :"0";
                tmpPreset.Activities[index] = activity
                setPreset(tmpPreset)
                updatePreset(id)

                console.log(`Style: ${activityDiv.style.order}`)
                // setLastNum(activityDiv.style.order)
            }
        }
    }
    const moveDown = (index: number, id: number) => {

        console.log(`Index: ${index}  - Id: ${id}`)
        let activityDiv = document.getElementById(`act${index.toString()}`);
        if (activityDiv) {
            const tmpPreset: IPreset = { ...preset }
            if (tmpPreset.Activities.length > 0) {
                const activity = tmpPreset?.Activities[index]
                let activityIdNum = Number.parseInt(activity.Order ?? "0");
                console.log(`Style: ${activity?.Order}`)
                if (activityIdNum <= 0)
                    activityIdNum += 2;
                else
                    activityIdNum += 1;
                activityDiv.style.order = `${activityIdNum}`
                activity.Order = activityIdNum ? activityIdNum.toString() :"0";
                tmpPreset.Activities[index] = activity
                setPreset(tmpPreset)
                updatePreset(id)

                console.log(`Style: ${activityDiv.style.order}`)
                // setLastNum(activityDiv.style.order)
            }
        }

    }

    const selectImage = (index: number, id: number) =>{
        const tmpPreset: IPreset = { ...preset }
        if (tmpPreset.Activities.length > 0) {
            const activity = tmpPreset?.Activities[index]
            activity.Selected = true
            activity.Order = "0"
            tmpPreset.Activities[index] = activity
            setPreset(tmpPreset)

        }
        updatePreset(id)

    }
    const selectCallback = (theSelected: Array<ISelectImage>) =>{

        console.log(theSelected)
        let tmpActivities: IDayActivity[] = []
        let tmpData : Array<ISelectImage> = [];
        tmpData =Array.from({...theSelected});
        Object.keys(theSelected).map((i)=>{
        // let newArray = merge(theSelected,tmpData);
        // tmpData = merge(tmpData,theSelected)
        // for (let i = 0; i < tmpData.length; i++) {
            
            if(theSelected[i].Selected){
                
                let tmpActivity:IDayActivity = 
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
        let tmpPreset : IPreset = {...preset}
        tmpPreset.Activities  = tmpActivities
        setPreset(tmpPreset)
        return theSelected
    }
    function merge(arr1: unknown[], arr2: unknown[]) {
        const newArr: unknown[] = [...arr1];
        for (let i = 0; i < arr2.length; i++) {
            const item = arr2[i];
            if (newArr.includes(item)) continue;
            newArr.push(item);
        }
        return newArr;
    }
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Edit preset
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} images={null}>
                    Edit preset
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {/* <Typography gutterBottom>
                        Name - Image - Description
                    </Typography> */}
                    {preset.Activities ?
                        <>


                            {

                                // props.preset?.map((preset, presetIndex) =>
                                // (
                                <div>
                                    <TextField 
                                    id="standard-basic" 
                                    label="Preset name" 
                                    variant="standard" 
                                    value={preset.Name} 
                                    onChange={updateName } 
                                    />
                                    {/* {currentPreset.Name} */}
                                    <div className='updateBox' >
                                        {
                                            preset.Activities.map((activity, activityIndex) =>
                                            (

                                                <div
                                                    id={"act" + activityIndex.toString()} key={"act" + activityIndex} style={{ order: (activity.Order), }}
                                                    className='editImageContainer'
                                                    onClick={() => {selectImage(activityIndex, currentPreset.Id )}}
                                                //     style={{
                                                //         // backgroundColor: 'salmon',
                                                // }}
                                                >
                                                    {/* <img src={`../images/image${index+4}.png`} /> */}
                                                    <img src={`../images/${activity.Image}`} />

                                                    <button onClick={() => moveUp(activityIndex, currentPreset.Id)}>Up</button>
                                                    <button onClick={() => moveDown(activityIndex, currentPreset.Id)}>Down</button>
                                                </div>

                                            )
                                            )}
                                    </div>
                                </div>
                            }
                        </>

                        :

                        "No activities"

                    }
                </DialogContent>
                <DialogActions>
                    <SelectImage selectCallback = {selectCallback} activities={preset.Activities} images={["image10.png", "image11.png", "image5.png", "image6.png", "image10.png", "image11.png", "image5.png", "image6.png", "image7.png", "image8.png"]} />
                    {/* <button onClick={() => { addImage(0, "image7.png") }}>Add image</button> */}
                    <Button autoFocus onClick={handleClose}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );


}