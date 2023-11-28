import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { User } from 'firebase/auth';
import { SignInAnonymously, SignInWithGoogle, SignOut } from '../../../firebase-planner';
import { Avatar, List, ListItem, ListItemButton } from '@mui/material';

type Props = {
    // children: any
    hideAll: boolean
    user: User | null | undefined
}
export default function OutlinedLoginCard(props: Props) {
    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );
    const [hideAll, setHideAll] = React.useState<boolean>()

    const [authUser, setUser] = React.useState<User | null | undefined>()

    // const pathToToUpper = () => {
    //     return path.toLowerCase().charAt(0).toUpperCase() + path.toLowerCase().charAt(0).toUpperCase().concat(path).slice(2)
    // }
    React.useEffect(() => {
        setProps()
    }
    )
    const setProps = () => {
        setHideAll(props.hideAll)
        setUser(props.user)
    }
    const loginCard = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {
                        authUser ?
                            <>
                                <Avatar alt="Profile" src={'' + authUser.photoURL} />
                                {/* <p>{authUser.isAnonymous ? "Anonymous user" : authUser.displayName}</p> */}
                            </>
                            : <p>Not logged in</p>
                    }
                </Typography>
                <Typography variant="h5" component="div">
                    {authUser?.displayName}                   
                </Typography>
                <Typography>
                {authUser?.email}
                </Typography>
            </CardContent>
            <CardActions>
                {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                       
                    </FormControl> */}
                {
                    authUser ?
                        <Button className={'login__btn'} onClick={() => alert("Save settings here")}> Save settings </Button>

                        :
''                        
                        // <List>
                        //         <ListItemButton className={'login__btn'} onClick={() => SignInAnonymously()}> Login anonymously </ListItemButton>
                        //         <ListItemButton className={'login__btn login__google'} onClick={() => SignInWithGoogle()}> Login with Google </ListItemButton>
                        //         <ListItemButton className={'login__btn '} disabled={true} onClick={() => alert("Disabled")}> Login with Apple </ListItemButton>
                        // </List>
                        
                }
            </CardActions>
        </React.Fragment>
    );


    return (
        <Box sx={{ minWidth: 375 }}>
            <Card variant="outlined">{loginCard}</Card>
        </Box>
    );
}