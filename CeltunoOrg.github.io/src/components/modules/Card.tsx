import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type Props = {
    children :any
    hideAll: boolean
    path: string
}
export default function OutlinedCard(props: Props) {
    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );
    const [hideAll, setHideAll] = React.useState<boolean>()

    const [path, setPath] = React.useState<string>("")

    const pathToToUpper = () => {
        return path.toLowerCase().charAt(0).toUpperCase() + path.toLowerCase().charAt(0).toUpperCase().concat(path).slice(2)
    }
    React.useEffect(() => {
        setProps()
    }
    )
    const setProps = () => {
        setHideAll(props.hideAll)
        setPath(props.path)
    }
    const card = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Page
                </Typography>
                <Typography variant="h5" component="div">
                    {pathToToUpper()}
                    {/* be{bull}nev{bull}o{bull}lent */}
                </Typography>
                <Typography variant="body2">
                    {/* well meaning and kindly. */}
                    <br />
                    {`Visit the ${path} page`}
                    {/* {'"a benevolent smile"'} */}
                </Typography>
            </CardContent>
            <CardActions>
                <Button hidden={hideAll} className={'sizeButton'} variant='outlined' href={`/#/${pathToToUpper()}`}> {pathToToUpper()} </Button>
                {/* <Button size="small">Learn More</Button> */}
            </CardActions>
        </React.Fragment>
    );


    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    );
}