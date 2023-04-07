import { Button, Fade } from '@mui/material';
import Modal from '@mui/material/Modal';
import React, { useState, useContext } from 'react';
import { MyContext } from "../Context"
import IDay from "../types/day.type";
import DayService from "../services/day-firebase-service"
import DaysList2 from './day-list2.component';
const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


interface Props {
    selectedDayId: string
    runOnLoadingParent: boolean
    theBool: boolean
}

type State = {
    isOpen: boolean
    theDay: string
    day: IDay | null
}
export default class UpdateDayModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isOpen: false,
            theDay : "0",
            day : null
        }
        // this.getDay = this.getDay.bind(this)
    }

    // static contextType = MyContext;
    // state = {
    //     isOpen: false,
    //     selectedDay : "",
    //     day: null
        
    // };
    openModal = () => {
        this.setState({ isOpen: true })
        this.getDay()

    };
    closeModal = () => this.setState({ isOpen: false });
    componentDidUpdate() {
        // this.setState({
        //     theDay : this.props.selectedDay
        // })
        // this.getDay();
        console.log("Updated day page");
        console.log(this.state.day?.name)
        
    }
    componentDidMount() {

        if (this.props.runOnLoadingParent === true) {
            // alert("Opening");
        }
        console.log("Key from parent")
        console.log(this.props.selectedDayId)
        this.setState({
            theDay : this.props.selectedDayId
        })
        this.getDay();
        console.log("Loaded day page");
        console.log(this.state.day?.name)
    }

    hasKey(key: string) {
        if (!key)
          return true;//return "hidden";
        return false;//"visibie";
      }

    handleChange = (event) => {
        // console.log(event.target.value);
        // console.log(event.target.name);
        let prevStateDay = this.state.day;
        if (prevStateDay === null) {
            prevStateDay = {
                name: "",
                formiddag: "",
                ettermiddag: "",
                natt: ""

            }
        }
        const newState = prevStateDay;
        try {

            switch (event.target.name) {
                case "name": {
                    newState.name = event.target.value;
                    prevStateDay = newState;
                    // this.setState({ day: prevState })
                    break;
                }
                case "formiddag": {
                    newState.formiddag = event.target.value;
                    prevStateDay = newState;
                    // this.setState({ day: prevState })
                    break;
                }
                case "ettermiddag": {
                    newState.ettermiddag = event.target.value;
                    prevStateDay = newState;
                    // this.setState({ day: prevState })
                    break;
                }
                case "natt": {
                    newState.natt = event.target.value;
                    prevStateDay = newState;
                    break;
                }
            }
        }
        finally {
            this.setState({ day: prevStateDay })
            console.log("New state: ")
            console.log(this.state.day)

        }
    }

    updateDay = () => {
        const key = this.props.selectedDayId;
        if (key === undefined || key === null || key === "") {
            console.log("No key provided"); 
            return
        }
        console.log("Adding day");
        DayService.updateItemDb(key, this.state.day)
        console.log("Day added?")
    }
    getDay() {
        const key =this.props.selectedDayId;
        if (key === undefined || key === null || key === "") {
            console.log("No key provided"); 
        }
        else{
            console.log("PreKey:")
            console.log(key)
            const getTheeDay = DayService.getOnedb1(key)
            .then((snapshot) => {
                console.log(snapshot.val());
                if (snapshot.exists()) {
                    console.log("snap")
                    console.log(snapshot.val());
                    this.setState({
                        day: snapshot.val()
                    })

                    // return snapshot.val() as IDay;
                    console.log(this.state.day?.name)
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });

        }
    }



    render() {
        console.log("this.props.selectedDay")
        console.log(this.props.selectedDayId)
        return (
            <>
{/* <div key={this.props.selectedDay}>{this.props.selectedDay}</div> */}
                {/* <div className="d-flex align-items-center justify-content-center"
                    style={{ height: "50vh" }}
                ></div> */}
                <button 
                    className='m-3 btn-sm btn btn-success' 
                    hidden={this.hasKey(this.props.selectedDayId)} 
                    onClick={this.openModal}
                >
                    Edit
                </button>
                
                <Modal
                    open={this.state.isOpen} onClose={this.closeModal}>
                    {/* <Fade in={this.state.isOpen}> */}
                        <div className='updateDay'>
                            {/* className="paper"> */}
                            <h4>Modify day: </h4>
                            <p className='updateModalHeading'>
                                {/* {this.props.selectedDay} - */}
                                 {this.state.day?.name}
                            </p>

                            {/* <button onClick={this.getDay}>
                                get data
                            </button> */}
                            <form onSubmit={this.updateDay}>
                        <div className='box2'>

                            {/* <label>
                                ID:<br/> 
                                
                                {this.props.selectedDay} - {this.state.day?.name}
                            </label> */}

                            <label>
                                Name: <br/>
                                <input type="text" name="name" value={ this.state.day?.name}  onChange={this.handleChange} /> 
                            </label>
                        </div>
                        <div className='box3'>
                            <label>
                                Formiddag:<br/> 
                                <input type="text" name="formiddag" value={this.state.day?.formiddag} onChange={this.handleChange} />
                                <div className='imagecontainer row'>
                                    <img onError={e=>{e.currentTarget.src = "/images/error.png"}} src={"/images/" + this.state.day?.formiddag} alt={this.state.day?.formiddag}></img>
                                </div>
                            </label>
                        </div>
                        <div className='box3'>
                            <label>
                                Ettermiddag:<br/> 
                                <input type="text" name="ettermiddag" value={this.state.day?.ettermiddag} onChange={this.handleChange} />
                                <div className='imagecontainer row'>
                                    <img onError={e=>{e.currentTarget.src = "/images/error.png"}} src={"/images/" + this.state.day?.ettermiddag} alt={this.state.day?.ettermiddag}></img>
                                </div>
                            </label></div>
                        <div className='box3'>
                            <label> 
                                Natt:
                                <br/>      
                                <input type="text" name="natt" value={this.state.day?.natt} onChange={this.handleChange} />
                                <div className='imagecontainer row'>
                                    <img onError={e=>{e.currentTarget.src = "/images/error.png"}} src={"/images/" + this.state.day?.natt} alt={this.state.day?.natt}></img>
                                </div>
                            </label>
                        </div>

                            <input type="submit" value="Save" /> 
                        </form>

                    {/* 
                        {/* this.props.selectedDay !== null ? this.updateDay(this.props.selectedDay) : this.updateDay}>Save</Button> */}
{/* <button onClick={this.updateDay("1")}></button> */}
                        </div>


                        {/* <MyContext.Consumer>
                            {({ user }) => (
                                <div>
                                <button
                                onClick={this.buttonthing}
                                >
                                Toggle Theme
                                </button>
                                {user}
                                </div>
                                )}
                            </MyContext.Consumer> */}
                    {/* </div> */}
                {/* </Fade> */}
                {/* <Box>
                        Woohoo, you're reading this text in a modal!
                    </Box> */}

            </Modal>
                    
            </>
        )
    }
}
UpdateDayModal.contextType = MyContext;



