import * as React from 'react';
import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { User } from 'firebase/auth';
import { format } from 'date-fns'
type Props = {
    user: User | null | undefined
}
export default function Calendar(props: Props) {

    const [authUser, setUser] = React.useState<User | null | undefined>()
    const currentDate = (dateFormat:string) =>{
       return  format( new Date(), dateFormat);
    }//.toString().form .toLocaleDateString("lookup",{day:"numeric", month:"long"}).format
    
    // const pathToToUpper = () => {
    //     return path.toLowerCase().charAt(0).toUpperCase() + path.toLowerCase().charAt(0).toUpperCase().concat(path).slice(2)
    // }
    // React.useEffect(() => {
    //     setProps()
    // }
    // )
    // const setProps = () => {
    //     setUser(props.user)
    // }
    const calendar = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>

                </Typography>
                <Typography variant="h5" component="div">                    
                    {currentDate("cccc co")}                   
                </Typography>
                <Typography component="div">
                    {currentDate("MMMM")}  
                </Typography>
            </CardContent>
        </React.Fragment>
    );


    return (
        <Box sx={{ minWidth: 375 }}>
          {calendar}
        </Box>
    );
}