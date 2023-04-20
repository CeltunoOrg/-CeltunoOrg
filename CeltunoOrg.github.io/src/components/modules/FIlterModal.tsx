import { Button, Fade} from '@mui/material';
import Modal from '@mui/material/Modal';
// import{makeStyles} from "@mui/styles"
import React from 'react';

import Select, { MultiValue } from 'react-select'
import IDay from '../../types/day.type';
// import styled from '@emotion/styled';
declare module '@mui/material/styles' {
    interface Palette {
     neutral: Palette['primary'];
   } 
}
interface Props {
    daysFromParent: IDay[]
    choiceNames: {
        value: number,
        label: string
    }[],
    currentfilter: {
        value: number,
        label: string
    }[],
    
    myCallBack: (days: Array<IDay>) => boolean//(days: Array<IDay>) => {null}
}

type State = {
    isOpen: boolean
    selectChoices: Array<IDay>
    // choiceNames: {
    //     value: number,
    //     label: string
    // }[]
}

export default class SetFilter extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            // user: {
            //     userName: userData.user.userName,
            //     loggedIn: userData.user.loggedIn
            // },
            isOpen: false,
            selectChoices: [],

        }
    }

    handleButton = (e) => {
        e.preventDefault();
        this.props.myCallBack(this.state.selectChoices);
        this.closeModal();
    }
    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });
    
    // changeContext = () => {
    //     this.setState(state => ({

    //     }))
    //     //)
    //     // console.log(userData.user.userName)
    // }
    componentDidMount() {
        console.log("#filteModal#")
        return 
    }
    setSelectChoice(theChoices: MultiValue<{ value: number, label: string }>) {
        const tmpArray = new Array<string>;
        const theDays2 = this.props.daysFromParent;
        console.log("Values changed")
        console.log(theChoices)
        theChoices.map((item) => {
            tmpArray.push(item.label)
        })
        
        const evenMoreArrays :IDay[] = [];
        theChoices.forEach(function (value){
            console.log(value.label);
            console.log(value.value);
            const nameMatch = theDays2.find(item => item.name == value.label ); 
            if(nameMatch)
            {
                console.log("Match! -> "+nameMatch.name)
                evenMoreArrays.push(nameMatch);
            }   
            // console.log("Weird" + value.label );            

            theDays2.filter(function(){                     
                return {
                key: value.value,
                name:value.label}
            });                                      
        })
        this.setState({
                selectChoices:evenMoreArrays
                // selectChoices[dataRef.key();]: tmpArray
        })               
        
    }

    // setUser() {
    //     // componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
    //     //      const uvar = this.context;
    //     //     console.log("uvar")
    //     //     console.log(uvar)
    //     // }
    //     useContext
    // }
    render() {
        // const theUser = this.context as any;
        // const  fromParent : tempChoice = []; 
        // const options = this.props.choiceNames;
        // const CustomButton = styled(Button)({
        //     boxShadow: 'none',
        //     textTransform: 'none'})
        // const selected = this.props.currentfilter;
    //    const theme = createTheme({
    //     palette: {
    //         primary: {
    //           main: '#198754',             
    //         }
    //     }
    //    });
       
    
        return (
            <>
                
                {/* <Button onClick={this.changeContext}>Context</Button> */}
                {/* <ThemeProvider theme={theme}> */}

                {/* <CustomButton variant='contained' className=' m-3 btn btn-sm btn-success Button'  hidden={this.props.daysFromParent.length === 0} onClick={this.openModal}>Open filters</CustomButton> */}
                <div className=''>
                <Button className=' m-3 btn btn-sm btn-success Button'  hidden={this.props.daysFromParent.length === 0} onClick={this.openModal}>Open filters</Button>
                </div>
                {/* </ThemeProvider> */}
                <Modal 
                    open={this.state.isOpen} onClose={this.closeModal}>
                <Fade in={this.state.isOpen}>
                       {/* <ModalChild/> */}
                       <div className="filterDays">
                            <h2>Set filters</h2>
                            <p>Select:</p>
                            <Select isMulti  options={this.props.choiceNames} 
                            onChange={(choices: MultiValue<{
                                value: number,
                                label: string;
                            }>) => { this.setSelectChoice(choices) }} />                            
                            <br/>
                            <button className='m-3 btn btn-sm btn-success'  onClick={this.handleButton}>Save</button>
                        </div>
                    </Fade>
                </Modal>
            </>
        )
    }
}



