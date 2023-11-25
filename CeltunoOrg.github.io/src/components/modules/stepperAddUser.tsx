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
import FaceIcon from '@mui/icons-material/Face';
import Face2Icon from '@mui/icons-material/Face2';
import Face3Icon from '@mui/icons-material/Face3';
import Face4Icon from '@mui/icons-material/Face4';
import Face5Icon from '@mui/icons-material/Face5';
import Face6Icon from '@mui/icons-material/Face6';
import PersonAddAlt1SharpIcon from '@mui/icons-material/PersonAddAlt1Sharp';
import "../../../styles/Edit.css"

// import PresetDataService from "../../services/preset-firebase-service"
import { IDayActivity, IPreset, ISelectImage, IUser } from '../../types/day.type';
import { Box, Divider, FormControl, InputLabel, MenuItem, Select, Step, StepContent, StepLabel, Stepper, SvgIcon, TextField } from '@mui/material';
import SelectImage from './selectImage';
import { isNullOrUndefined } from '../../../../Old/functions/common';
import UserDataManager from '../../../../Old/functions/userDataManager';
import { OverridableComponent } from '@mui/material/OverridableComponent';
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
    parentCallBack: (data: string) => string

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

export default function StepAddUser(props: Props) {
    const [open, setOpen] = React.useState(false);
    const [validData, setValidData] = React.useState(false);
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
            // if (user.Id >= 0)
            // updateUser(user.Id);
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
            // Days: [],
            // Presets: [],
            // LastDay: null,
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

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());

    const isStepOptional = (step: number) => {
        return step === 1 || step === 2;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    useEffect(() => {

        // if(activeStep == )
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

    const updateName = (event) => {
        const name = event.target.value;
        tmpMyUser = { ...user }
        tmpMyUser.Name = name
        if (name.length >= 3) {
            setValidData(true)
            // const returnData = PresetManager.FetchAllPresets();
            if (tmpMyUser.Id === 0) {
                console.log("UPDATENAME - TOPAFTER GETALLL")
                // tmpMyUser.Id = topId
            }
            // setTopId(returnData.topId)
        }
        else {
            setValidData(false)
        }
        setUser(tmpMyUser)
        return null
        // updateMyDay  (tmpActivity.Id)
    }

    const [iconDisabled, setIconDisabled] = React.useState<string[]>(
        [
            'disabled',
            'disabled',
            'disabled',
            'disabled',
            'disabled',
            'disabled',
        ]
    );

    const handleIcon = (id) => {
        const tmpIcons: string[] = ['disabled',
            'disabled',
            'disabled',
            'disabled',
            'disabled',
            'disabled',]
        // tmpIcons = { ...iconDisabled }
        // const newArray = tmpIcons.reduce((accumulator, element, index) => {
        //     return [...accumulator, 'disabled'];
        // }, []);
        // const tmpId = e.target.name
        // tmpIcons.forEach(item => {
        //     item = 'disabled'
        //     // return item
        // })
        // if (tmpIcons[id] === '')
        //     tmpIcons[id] = 'disabled'
        // else
        tmpIcons[id] = ''

        setIconDisabled(tmpIcons)
    }
    // const icons = () => {
    //     return (
    //         <Box>


    //             <FaceSharpIcon id="face1" color={'' + iconDisabled + ''} a />
    //             < Face2SharpIcon id="face2" color='disabled' />,
    //             <Face3SharpIcon id="face3" />,
    //             <Face4SharpIcon id="face4" />,
    //             <Face5SharpIcon id="face5" />
    //         </Box>

    //     )
    // }



    const stepcount = 3
    return (
        <div>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <Button className='classes.button' onClick={handleOpen}>
                {(user && user.Name.length > 0) ? <EditIcon /> : <PersonAddAlt1SharpIcon />}
            </Button>
            <BootstrapDialog
                onClose={() => handleClose(false)}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={() => handleClose(false)}>
                    <Typography gutterBottom>
                        Add  profile
                    </Typography>
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <>
                        {
                            // <Box sx={{ flexDirection: 'column', display: 'flex', padding: '3%', width: '100%' }}>
                            <Box sx={{ maxWidth: 600 }}>


                                <Stepper activeStep={activeStep} >
                                    <Step>
                                        <StepLabel>Register your name</StepLabel>
                                        {/* <StepContent> */}

                                        <TextField
                                            id="standard-basic"
                                            label="User name"
                                            variant="standard"
                                            value={user.Name}
                                            onChange={e => updateName(e)}
                                        />
                                        {/* </StepContent> */}

                                    </Step>
                                    <Step>
                                        <StepLabel optional={<Typography variant="caption">Optional</Typography>}>
                                            icon
                                        </StepLabel>
                                        <>
                                            <TextField
                                                id="standard-basic"
                                                label="Icon"
                                                variant="standard"
                                                value={user.Name}
                                                onChange={e => updateName(e)}
                                            />
                                            <IconButton id="tmpFace" aria-label="Example" onClick={() => handleIcon(0)}>
                                                <FaceIcon sx={{ color: '' + iconDisabled[0] + '' }} />
                                            </IconButton>
                                            <IconButton aria-label="Example" onClick={() => handleIcon(1)}>
                                                <Face2Icon sx={{ color: '' + iconDisabled[1] + '' }} />
                                            </IconButton>
                                            <IconButton aria-label="Example" onClick={() => handleIcon(2)}>
                                                <Face3Icon sx={{ color: '' + iconDisabled[2] + '' }} />
                                            </IconButton>
                                            <IconButton aria-label="Example" onClick={() => handleIcon(3)}>
                                                <Face4Icon sx={{ color: '' + iconDisabled[3] + '' }} />
                                            </IconButton>
                                            <IconButton aria-label="Example" onClick={() => handleIcon(4)}>
                                                <Face5Icon sx={{ color: '' + iconDisabled[4] + '' }} />
                                            </IconButton>
                                            <IconButton aria-label="Example" onClick={() => handleIcon(5)}>
                                                <Face6Icon sx={{ color: '' + iconDisabled[5] + '' }} />
                                            </IconButton>
                                        </>
                                    </Step>
                                    <Step>
                                        <StepLabel optional={<Typography variant="caption">Optional</Typography>}>
                                            Config
                                        </StepLabel>
                                        {/* <StepContent> */}
                                        <Box>
                                            <TextField name='title' sx={{ margin: 2 }} id="standard-basic" label="Title" variant="standard" ></TextField>
                                            {/* value={userConfig?.title} onChange={handleUserState()} />  */}
                                            <TextField name='titleSize' sx={{ margin: 2 }} id="standard-basic" label="Title size" variant="standard"></TextField>
                                            {/* value={userConfig?.titleSize} onChange={handleUserState()} /> */}
                                            <TextField name='background' sx={{ margin: 2 }} id="standard-basic" label="Background"></TextField>
                                            {/* variant="standard" value={userConfig?.background} onChange={handleUserState()} /> */}
                                            <TextField name='color1' sx={{ margin: 2 }} id="standard-basic" label="Color 1" variant="standard" ></TextField>
                                            {/* value={userConfig?.color1} onChange={handleUserState()} /> */}
                                            <TextField name='color2' sx={{ margin: 2 }} id="standard-basic" label="Color 2" variant="standard"></TextField>
                                            {/* value={userConfig?.color2} onChange={handleUserState()} /> */}
                                        </Box>
                                        {/* </StepContent> */}
                                    </Step>
                                    <Step completed>
                                        <StepLabel>Click on Finish</StepLabel>
                                    </Step>
                                </Stepper>
                                {activeStep === stepcount ? (
                                    <React.Fragment>
                                        <Typography sx={{ mt: 2, mb: 1 }}>
                                            All steps completed - you&apos;re finished
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                            <Box sx={{ flex: '1 1 auto' }} />
                                            <Button onClick={handleReset}>Reset</Button>
                                        </Box>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                            <Button
                                                color="inherit"
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                                sx={{ mr: 1 }}
                                            >
                                                Back
                                            </Button>
                                            <Box sx={{ flex: '1 1 auto' }} />
                                            {isStepOptional(activeStep) && (
                                                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                                    Skip
                                                </Button>
                                            )}
                                            <Button onClick={handleNext}>
                                                {activeStep === stepcount - 1 ? 'Finish' : 'Next'}
                                            </Button>
                                        </Box>
                                    </React.Fragment>
                                )}

                                {/* <Button onClick={()=> props.parentCallBack(`from parent`)}>Test2</Button> */}
                            </Box>

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
                    <Button disabled={!validData} autoFocus onClick={() => handleClose(true)}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
