import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IUser, IUserConfig } from '../../types/day.type';
import { Chip, Grid, TextField, ThemeProvider, createTheme } from '@mui/material';
import UserDataManager from '../../../../Old/functions/userDataManager';

type Props = {
    hideAll: boolean
    user: IUser
    buttons: Array<typeof Button>
    userCallback: (updatedUser: IUser | null) => IUser | null

}
export default function UserCard(props: Props) {

    const [hideAll, setHideAll] = React.useState<boolean>()
    // const [buttons, setButtons] = React.useState<[]>([])
    const [user, setUser] = React.useState<IUser | null>(null)
    const [userConfig, setUserConfig] = React.useState<IUserConfig | null>(null)

    let tmpUser: IUser | null = null
    let tmpUserConfig: IUserConfig | null = null

    const handleKeyPress = React.useCallback((event) => {
        // console.log(`Key pressed: ${event.key}`);
        if (event.key === "Enter") {
            // setUserConfig(tmpUserConfig)
            sendSaveCallback();
            console.log(tmpUser)
            console.log(user)
        }
    }, []);
    React.useEffect(() => {
        // document.addEventListener('keydown', handleKeyPress);

        if ((user === null || tmpUser === null) && props.user) {
            tmpUser = props.user
            setProps()

        }
        // return () => {
        //     document.removeEventListener('keydown', handleKeyPress);
        // };
    }, [])//, [handleKeyPress]);

    const setProps = async () => {
        setHideAll(props.hideAll)
        const fetchedUser = await UserDataManager.FetchOneUser(props.user.Id)
        if (tmpUser || fetchedUser)
            handleUser(tmpUser)
        if (tmpUser?.Config)//props.user.Config)
            handleUserConfig(props.user.Config)
    }

    const handleUser = (user: IUser | null) => {
        if (user !== null) {
            setUser(user)
            tmpUser = user
        }
    }

    const handleUserConfig = (config: IUserConfig | null) => {
        if (config !== null)
            setUserConfig(config)
    }
    const handleUserState = () => (e) => {
        console.log(`Name: ${e.target.name} Value: ${e.target.value}`)
        const newValue: string = e.target.value !== undefined ? e.target.value : ""
        const newName: string = e.target.name !== undefined ? e.target.name : ""
        if (userConfig)
            tmpUserConfig = { ...userConfig }
        if (tmpUserConfig)
            tmpUserConfig[newName] = newValue
        // const newData = { tmpUserConfig[`newName`], newValue }
        handleUserConfig(tmpUserConfig)
        if (tmpUser && tmpUserConfig)
            tmpUser.Config = tmpUserConfig
        return

    }

    const sendSaveCallback = () => {
        console.log("Saving-...")
        let saveUser: IUser | null = null
        if (user || tmpUser) {
            saveUser = user ? { ...user } : tmpUser
            if (saveUser && userConfig) {
                console.log(userConfig)
                saveUser.Config = userConfig
                handleUser(saveUser)
                tmpUser = saveUser
            }
            if (saveUser === null && tmpUser && tmpUserConfig) {
                saveUser = tmpUser
                console.log(tmpUser)
                saveUser.Config = tmpUserConfig
                handleUser(saveUser)
                tmpUser = saveUser
            }
        }

        props.userCallback(tmpUser)
    }



    const setChipConfigLabelColor = (length = 0) => {
        if (length > 1)
            return <Chip size='small' color='success' label="Set" />
        return <Chip size='small' color='warning' label="Not set"></Chip>
    }

    const userTheme = createTheme({
        palette: {
            primary: {
                light: '#757ce8',
                main: '#3f50b5',
                dark: '#002884',
                contrastText: '#fff',
            },
            secondary: {
                light: '#ff7961',
                main: '#f44336',
                dark: '#ba000d',
                contrastText: '#000',
            },
        },
    });

    const nameToToUpper = (): string => {
        const returnString = user ? user?.Name.toLowerCase().charAt(0).toUpperCase() + user?.Name.toLowerCase().charAt(0).toUpperCase().concat(user.Name).slice(2) : ""
        return returnString
    }
    const card = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Profile id: {user?.Id}
                </Typography>
                <Typography variant="h5" component="div">
                    <br />
                    {nameToToUpper()}
                    {/* be{bull}nev{bull}o{bull}lent */}
                </Typography>
                <Box>
                    {`${nameToToUpper()} data:`}
                    <br />
                    {/* {`Days: ${user?.Days ? user.Days.length : 0}`}
                    <br />
                    {`Presets: ${user?.Presets ? user.Presets.length : 0}`}
                    <br />
                    {`Last day: ${user?.LastDay
                        ?

                        <Typography variant="body2">
                            {user.LastDay.Id}
                            <br />
                            {user.LastDay.Name}
                            <br />
                            {user.LastDay.Description}
                            <br />
                            Activities: {user.LastDay.Activities?.length ?? 0}
                        </Typography>
                        :
                        "Not set"}`} */}

                </Box>
                {/* well meaning and kindly. */}
                <br />
                {/* {'"a benevolent smile"'} */}
                <Box sx={{ display: 'inline-flex' }}>

                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Config:
                        {/* <Chip color='success' label="Set" />
                        {user?.Config && user?.Config.title.length > 1 ? `${<Chip color='success' label="Set" />}` : `${<Chip color='warning' label="Not set"></Chip>}`}`} */}
                    </Typography>
                    {setChipConfigLabelColor(user?.Config.title.length)}
                </Box>
                {
                    user?.Config ?
                        <Grid>

                            <Box>
                                {/* {ListThing()} */}
                                {/* <Typography color="text.secondary"> */}

                                <Box>

                                    <TextField name='title' sx={{ margin: 2 }} id="standard-basic" label="Title" variant="standard" value={userConfig?.title} onChange={handleUserState()} onKeyDown={handleKeyPress} />
                                </Box>

                                <Box>
                                    <TextField name='titleSize' sx={{ margin: 2 }} id="standard-basic" label="Title size" variant="standard" value={userConfig?.titleSize} onChange={handleUserState()} />
                                </Box>

                                <Box>
                                    <TextField name='background' sx={{ margin: 2 }} id="standard-basic" label="Background" variant="standard" value={userConfig?.background} onChange={handleUserState()} />
                                </Box>

                                <Box>
                                    <TextField name='color1' sx={{ margin: 2 }} id="standard-basic" label="Color 1" variant="standard" value={userConfig?.color1} onChange={handleUserState()} />
                                </Box>

                                <Box>
                                    <TextField name='color2' sx={{ margin: 2 }} id="standard-basic" label="Color 2" variant="standard" value={userConfig?.color2} onChange={handleUserState()} />
                                </Box>

                                {/* </Typography> */}
                            </Box>
                        </Grid>
                        :
                        "Config not found"}
            </CardContent>
            <CardActions>
                <Box
                    sx={{ marginLeft: "auto" }}
                    m={1}
                    //margin
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                // sx={boxDefault}
                >
                    <Button hidden={!(user?.Name !== undefined && user?.Name.length >= 1)} className={'sizeButton'} variant='outlined' color='success' onClick={() => sendSaveCallback()}> Save </Button>
                    {/* href={`/#/${nameToToUpper()}`} */}
                    {/* <Button size="small">Learn More</Button> */}
                </Box>
            </CardActions>
        </React.Fragment>
    );


    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    );
}