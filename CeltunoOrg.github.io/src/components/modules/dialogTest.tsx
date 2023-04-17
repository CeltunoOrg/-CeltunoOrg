import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { IDayActivity, IMyDay } from '../../types/day.type';

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
    activities: IDayActivity[]
}
export default function CustomizedDialogs(props: Props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const moveUp = (index:number)=>
    {    
        
        console.log(index)    
       let act = document.getElementById(`act1${index.toString()}`);
       if(act){
            console.log(act.style.order)
            if(act.style.order !== "0")
                act.style.order = `${index-1}`
       }

    }
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Select image
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} images={null}>
                    Select image
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                    --------#--------
                    </Typography>
                    {props.activities ?

                        <div>{
                            props.activities?.map((activity, index) =>
                            (
                                <div key={"act"+index+1} style={{order: index,
                                }}>
                                    <div>
                                        {activity.Name}

                                    </div>
                                    <div 
                                        id={"act"+1+activity.Id.toString()}
                                        className='imageContainer'  
                                        style={{
                                            backgroundColor: 'salmon',
                                        }}
                                    >
                                        <img src={`../images/image${index+4}.png`} />

                                    </div>
                                    <button onClick={() =>moveUp(index+1)}>Move up</button>
                                </div>
                            ))}
                        </div>

                        :

                        "No activities"


                        //       <div> </div>


                        //   :
                        //   {

                        //   }

                    }
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
