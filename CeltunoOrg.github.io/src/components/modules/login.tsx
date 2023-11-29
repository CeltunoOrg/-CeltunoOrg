import React, { useEffect } from 'react';

import "../../../styles/Edit.css"
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
// import CloseIcon from '@mui/icons-material/Close';
// import SettingsIcon from '@mui/icons-material/Settings';
// import LogoutIcon from '@mui/icons-material/Logout';
// import LoginIcon from '@mui/icons-material/Login';
import { Avatar, Box, Divider, List, ListItemIcon, Menu, MenuItem, Tooltip,ListItemButton } from '@mui/material';
// import Typography from '@mui/material/Typography';
// import ExpandLessOutlined from '@mui/icons-material/ExpandLessOutlined'
// import ExpandMoreOutlined from '@mui/icons-material/ExpandMoreOutlined';
// import PresetDataManager from '../functions/presetDataManager'
// import EditIcon from '@mui/icons-material/Edit';
// import AddIcon from '@mui/icons-material/Add';


// import {
//     FacebookLoginButton,
//     GoogleLoginButton,
//     GithubLoginButton,
//     AmazonLoginButton,
//     InstagramLoginButton,
//     LinkedInLoginButton,
//     MicrosoftLoginButton,
//     TwitterLoginButton,
//     AppleLoginButton,
//     DiscordLoginButton,
//     BufferLoginButton
// } from 'react-social-login-buttons';


import { SignOut, auth, SignInAnonymously, SignInWithGoogle } from '../../../firebase-planner';
import { useAuthState } from 'react-firebase-hooks/auth';
import { User } from 'firebase/auth';
// import UserCard from './userCard';
// import Card from './Card';
import OutlinedLoginCard from './loginCard';
import { Apple, Facebook, Google, Login, Person } from '@mui/icons-material';
// import { MenuList } from 'react-select/dist/declarations/src/components/Menu';

// import { Face, FaceSharp } from '@material-ui/icons';
// import Face2 from '@mui/icons-material/Face2';
// import { Face2Sharp } from '@mui/icons-material';

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


    

}



const CheckAuth = (user: User | null | undefined) => {
    //
    if (user)//&& user.email === "miguelloz.cm@gmail.com")
        console.log("Logged in: " + user.displayName + " - " + user.email);
    else
        console.log("Not logged in: ");

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
                    {/* <CloseIcon /> */}
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

export default function InitLogin(props: Props) {
    const [openSettings, setOpenSettings] = React.useState(false);
    const [user, loading, error] = useAuthState(auth);
    // const handleOpen = () => {
    //     setOpen(true);
    // if (props.propCurrentPreset && props.propCurrentPreset !== myPreset)
    //     setMyPreset(props.propCurrentPreset)
    // if (props.dayArrayLength > topId)
    //     setTopId(props.dayArrayLength)
    // const returnData = PresetDataManager.FetchAllPresets()
    // if (topId < returnData.topId)
    //     setTopId(returnData.topId)

    // };
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        // setOpen(false);
        setAnchorEl(null);
    };
    const handleCloseSettings = () => {
        setOpenSettings(false);
        setAnchorEl(null);
    };
    const logout = () => {
        SignOut();
        handleClose();
    }
    const settings = () => {
        setOpenSettings(!openSettings);
    }
    const [presets, setPresets] = React.useState<number[]>([]);

    useEffect(() => {
        CheckAuth(user)
        console.log(`Effect - User: ${user?.displayName}`)
    }, []);

    // const handlePresets = (newPresets: number[]) => {
    //     setPresets(newPresets)
    // }


    return (
        <Box>
            {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" /> */}

            <Tooltip title={"Account settings"}>
                <Button  onClick={handleClick}>
                    {
                    (user) 
                    ? 
                        <Avatar alt="Profile" src={'' + user.photoURL} /> 
                    :
                    <ListItemIcon>
                        <Login sx={{color:'#000000099'}}/>
                    </ListItemIcon>
                        }
                </Button>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={() => { handleClose }}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        minWidth: 275,
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClick}>
                    <Avatar alt="Profile" src={'' + user?.photoURL} />
                    {/* <OutlinedLoginCard hideAll={false} user={user} /> */}
                    Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    {user ? (user.isAnonymous ? 'Anonymous user' : user.displayName) : ''}
                </MenuItem>
                <Divider />
                <List>
                    {
                        user ?
                            <>
                                <MenuItem onClick={settings}>
                                    <ListItemIcon>
                                        {/* <SettingsIcon fontSize="small" /> */}
                                    </ListItemIcon>
                                    Settings
                                </MenuItem>
                                <MenuItem onClick={logout}>
                                    <ListItemIcon>
                                        {/* <LogoutIcon fontSize="small" /> */}
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </>
                            :
                            <>

                                <MenuItem>
                                    <ListItemButton className={'login__btn login__google'} onClick={() => SignInWithGoogle()}> <Google sx={{ m:'15px'}}/> Login with Google </ListItemButton>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemButton className={'login__btn '} disabled={true} onClick={() => alert("Disabled")}> <Apple sx={{m:'15px'}}/>Login with Apple </ListItemButton>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemButton className={'login__btn '} disabled={true} onClick={() => alert("Disabled")}><Facebook sx={{m:'15px'}}/>Login with Facebook</ListItemButton>
                                </MenuItem>
                                <Divider/>
                                <MenuItem>
                                    <ListItemButton className={'login__btn'} onClick={() => SignInAnonymously()}> <Person sx={{m:'15px'}}/> Login anonymously </ListItemButton>
                                </MenuItem>
                            </>
                    }
                </List>
            </Menu>
            <BootstrapDialog
            onClose={() => handleCloseSettings()}
            aria-labelledby="customized-dialog-title"
            open={openSettings}
        >
            {/* <BootstrapDialogTitle id="customized-dialog-title" onClose={() => handleClose(false)}>
                <Typography gutterBottom>
                    Login
                </Typography>
            </BootstrapDialogTitle> */}
            <DialogContent dividers>
                <>
                    {
                        <div className='padder'>
                            <OutlinedLoginCard hideAll={false} user={user} />
                            {/* {
                                user ?
                                <OutlinedLoginCard hideAll = {false} user={user}>

                                <span>{"Logged inn as:"}</span>
                                    <Divider component="li" sx={{ margin: '5%' }} variant='inset' />
                                <div style={{overflow:"auto"}}>
                                    <Avatar alt="Profile" src={''+user.photoURL}/>
                                    <p>{ user.isAnonymous ? "Anonymous user" :user.displayName}</p>  </div>
                                </OutlinedLoginCard>
                                :
                            <div className='updateBox' >
                                <p>{"Select login method"}</p>
                            </div> */}
                        </div>
                    }

                </>
            </DialogContent>
            <DialogActions>
                {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>

                </FormControl> */}
                {/* {
                    user ?
                        <Button className={'login__btn login__google'} onClick={() => SignOut()}> Logout </Button>

                        :
                        <>
                            <Button className={'login__btn'} onClick={() => SignInAnonymously()}> Login anonymously </Button>
                            <Button className={'login__btn login__google'} onClick={() => SignInWithGoogle()}> Login with Google </Button>
                            <Button className={'login__btn '} disabled={true} onClick={() => alert("Disabled")}> Login with Apple </Button>
                        </>
                } */}
                <Button autoFocus onClick={() => handleCloseSettings()}>
                    Cancel
                </Button>
            </DialogActions>
        </BootstrapDialog>
                </Box>
                );
}