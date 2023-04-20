import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { IDayActivity, ISelectImage } from '../../types/day.type';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CheckBoxOutlineBlankOutlined  from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
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
                        right: 4,
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
    images: string[]
    activities: IDayActivity[]
    selectCallback: (theSelected: Array<ISelectImage>) => Array<ISelectImage>//theSelected: ISelectImage []}

}

export default function SelectImage(props: Props) {

    const [open, setOpen] = React.useState(false);
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = (save:boolean) => {
        if(save)
            props.selectCallback(selected)
        setOpen(false);
    };
    
    const handleCancel = () => {
        setOpen(false);
    };

    const [order, setOrder] = React.useState<number>(0)
    const [selected, setSelected] = React.useState<IDayActivity[]>([]);



    const imageClick = (image: string, index: number) => {
        if (image) {
            // let tmpImages: ISelectImage[]
            initActivities = { ...selected }
            // let tmpSelcted: string[] = []
            initActivities[index].Selected = initActivities[index].Selected === true ? false : true;
            setSelected(initActivities)
            initActivities[index].Order = order.toString()
            setOrder(order+1)
            // tmpSelcted =  { ...selected }
            // tmpSelcted.push(image)
            // setSelected(tmpSelcted)
            // setSelectedBool(true)
            // let ttt = testData
        }
    }
    let initActivities: IDayActivity[] = [];
    useEffect(() => {
        initActivities = testActivities
        setSelected(initActivities)
    }, []);
    
    initActivities = initActivities.length <= 0 ? testActivities : initActivities// props.activities ?? [] : initImages 
    
    
    return (
        <div>
            <Button  onClick={handleClickOpen}>
                Add images
            </Button>
            <BootstrapDialog
                onClose={()=>handleClose (false)}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={()=>handleClose(false)} images={null}>
                    Select images
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    
                    {/* <Typography gutterBottom>
                        Name - Image - Description
                    </Typography> */}
                    {(initActivities && initActivities.length > 0) 
                    ?
                        <>
                            {
                                <div>
                                    {/* <TextField id="standard-basic" label="Preset name" variant="standard" value={.n
                                    } /> */}
                                    <div className='selectImageBox'>
                                        <ImageList sx={{ width: 500, height: 650 }} cols={3} rowHeight={164}>

                                            {
                                                initActivities.map((selectActivity, imgIndex) =>
                                                (
                                                    <ImageListItem key={selectActivity.Id + imgIndex}>
                                                        <ImageListItemBar
                                                            sx={{
                                                                background:
                                                                'rgba(0,0,0,0)'
                                                                //     'linear-gradient(to bottom, rgba(0,0,0,0.5) 10%, ' +
                                                                //     'rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 80%)'

                                                            }}
                                                            title={""}
                                                            position="top"
                                                            actionIcon={
                                                                <IconButton
                                                                    sx={{ color: 'grey' }}
                                                                    aria-label={`select ${""}`}
                                                                    onClick={() => imageClick(selectActivity.Image, imgIndex)}
                                                                >
                                                                    {selectActivity.Selected ?
                                                                        <DoneIcon /> : <CheckBoxOutlineBlankOutlined/>
                                                                        //<StarBorderIcon/>
                                                                    }
                                                                </IconButton>
                                                            }
                                                            actionPosition="left"
                                                        />
                                                        <div
                                                            id={"act" + imgIndex.toString()} key={"act" + imgIndex} style={{ order: (imgIndex), }}
                                                            className='selectImageContainer'
                                                            onClick={() => { imageClick(selectActivity.Image, imgIndex) }}
                                                        >
                                                            <img
                                                                src={`../images/${selectActivity.Image}`}

                                                                srcSet={`../images/${selectActivity.Image}`}
                                                                alt={selectActivity.Image}
                                                                loading="lazy"
                                                            />
                                                        </div>
                                                    </ImageListItem>
                                                )
                                                )}
                                        </ImageList>
                                    </div>
                                </div>
                            }
                        </>
                        :
                        "No images"
                    }
                </DialogContent>
                <DialogActions>
                    {/* <button onClick={() => { alert("adding") }}>Add image</button> */}
                    <Button autoFocus onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button autoFocus onClick={() =>handleClose(true)}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}

const testActivities: IDayActivity[] =
    [
        {
            Id: 2,
            Name: "Preset",
            Image: "image5.png",
            Selected: false,
            Order: "0",
        },
        {
            Id: 2,
            Name: "Preset",
            Image: "image6.png",
            Selected: false,
            Order: "0",
        },
        {
            Id: 2,
            Name: "Preset",
            Image: "image7.png",
            Selected: false,
            Order: "0",
        },
        {
            Id: 2,
            Name: "Preset",
            Image: "image8.png",
            Selected: false,
            Order: "0",
        },
        {
            Id: 2,
            Name: "Preset",
            Image: "image9.png",
            Selected: false,
            Order: "0",
        },
        {
            Id: 2,
            Name: "Preset",
            Image: "image10.png",
            Selected: false,
            Order: "0",
        },
        {
            Id: 2,
            Name: "Preset",
            Image: "image11.png",
            Selected: false,
            Order: "0",
        },

    ]

