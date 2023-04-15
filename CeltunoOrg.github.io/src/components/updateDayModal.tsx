import { Button, Fade } from '@mui/material';
import Modal from '@mui/material/Modal';
import React, { useState, useContext } from 'react';
import { MyContext } from "../Context"
import IDay from "../types/day.type";
import DayService from "../services/day-firebase-service"
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

const shallowClone = obj => Object.assign({}, obj);
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
            theDay: "0",
            day: null
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
        if (this.state.day)
            console.log(this.state.day?.name)

    }
    componentDidMount() {

        if (this.props.runOnLoadingParent === true) {
            // alert("Opening");
        }
        console.log("#updateDay# \nKey from parent")
        console.log(this.props.selectedDayId)
        if (this.props.selectedDayId && this.props.selectedDayId != "0") {

            this.setState({
                theDay: this.props.selectedDayId
            })
            this.getDay();
            console.log("Loaded day page");
            if (this.state.day)
                console.log(this.state.day?.name)
        }
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
    getDay = async () => {
        const key = this.props.selectedDayId;
        if (key === undefined || key === null || key === "") {
            console.log("No key provided");
        }
        else {
            console.log("PreKey:")
            console.log(key)
            await DayService.getOnedb1(key)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        console.log(snapshot.val());
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

    handleday() {
        type IDayActivity = {
            Id: number,
            Name: string
            Description: string
            Image: string
        }
        type IPreset = {

            Id: number,
            Name: string
            Description: string
            Activities: IDayActivity[];
        }
        type IMyDay = {
            Id: number,
            Name: string
            Description: string
            Activities: IDayActivity[];
        } | null
        let myActivity: IDayActivity;
        let myPreset: IPreset

        let myDay: IMyDay;


        let id = 1;
        let myActivties: IDayActivity[] = []
        let myPresets: IPreset[] = []
        let fetchedDay: IMyDay = null
        fetchedDay = {
            Id: id,
            Name: "Name",
            Description: "Description",
            Activities: []
        }
        myActivity = {
            Id: 1,
            Name: "Name",
            Description: "Description",
            Image: "Image"
        }
        let myActivityPreset: IDayActivity = {
            Id: 111,
            Name: "ActivityPreset1",
            Description: "Description",
            Image: "Image"
        }
        myActivties.push(myActivity)
        let myActivity2 = shallowClone(myActivity)
        myActivties.push(myActivity2)
        myActivties[1].Id = 2;
        myActivties[1].Name = "Name2";


        myPreset =
        {
            Id: 1,
            Name: "Preset",
            Description: "Description",
            Activities: [myActivityPreset]
        };

        myPresets = [

            {
                Id: 1,
                Name: "Preset1",
                Description: "Description",
                Activities: []
            },
            {
                Id: 2,
                Name: "Preset2",
                Description: "Description",
                Activities: []

            }
        ]

        console.log(` Day: ${fetchedDay.Id} - ${fetchedDay.Name} `)

        console.log("Activities")
        fetchedDay.Activities = myActivties
        console.log(fetchedDay.Activities);

        console.log("Adding activity")
        let myActivity3 = shallowClone(myActivity);
        myActivity3.Id = 3
        myActivity3.Name = "Name3"
        fetchedDay.Activities.push(myActivity3)
        console.log(fetchedDay.Activities);


        console.log("Presets")
        console.log(myPresets);

        console.log(" \"My preset\" ")
        console.log(myPreset);


        console.log("With one preset")
        myPreset.Activities.map(item =>
            fetchedDay?.Activities.push(item)
        );
        console.log(fetchedDay.Activities);

        // myPreset.Activities.forEach(item => fetchedDay?.Activities.push(item));
        // console.log("With \"my\" preset")
        // console.log( fetchedDay.Activities)
        let myPreset2 = {
            Id: 22,
            Name: "PresetClone",
            Description: "Description",
            Activities: [
                {
                    Id: 222,
                    Name: "ActivityPreset2",
                    Description: "Description",
                    Image: "Image"
                }
            ]
        }
        myPresets.push(myPreset)
        console.log("With \"my\" presets")
        myPresets.map(element => {
            element.Activities.map(item => fetchedDay?.Activities.push(item));
        });
        console.log(fetchedDay.Activities);

        myPresets.push(myPreset2)
        myPresets.map(element => {
            if (element.Id === 22) {

                element.Activities = myPreset2.Activities
                element.Activities.map(item => fetchedDay?.Activities.push(item));

                console.log("presetclone")
                console.log(myPresets)

            }
        })
        console.log(fetchedDay);

    }

    render() {
        return (
            <>
                {/* <div className="d-flex align-items-center justify-content-center"
                    style={{ height: "50vh" }}
                ></div> */}
                <div className=''>
                    <button
                        className='m-3 btn-sm btn btn-success'
                        hidden={this.hasKey(this.props.selectedDayId)}
                        onClick={this.openModal}
                    >
                        Edit
                    </button>
                    <button
                        className='m-3 btn-sm btn btn-success'
                        // hidden={this.hasKey(this.props.Fake day)}
                        onClick={this.handleday}
                    >
                        Fake day
                    </button>

                </div>

                <Modal
                    open={this.state.isOpen} onClose={this.closeModal}>
                    <Fade in={this.state.isOpen}>
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

                            {/* <label>
                                ID:<br/> 
                                
                                {this.props.selectedDay} - {this.state.day?.name}
                            </label> */}

                            <form onSubmit={this.updateDay}>
                                <div className='box2'>
                                    <label>
                                        Name: <br />
                                        <input type="text" name="name" value={this.state.day?.name} onChange={this.handleChange} />
                                    </label>
                                </div>

                                <div className='box3'>
                                    <label>
                                        Formiddag:<br />
                                        <input className='inputUpdate' type="text" name="formiddag" value={this.state.day?.formiddag} onChange={this.handleChange} />
                                        <div className='updateImagecontainer '>
                                            <img onError={e => { e.currentTarget.src = "/images/error.png" }} src={"/images/" + this.state.day?.formiddag} alt={this.state.day?.formiddag}></img>
                                        </div>
                                    </label>
                                </div>
                                <div className='box3'>
                                    <label>
                                        Ettermiddag:<br />
                                        <input type="text" name="ettermiddag" value={this.state.day?.ettermiddag} onChange={this.handleChange} />
                                        <div className='updateImagecontainer '>
                                            <img onError={e => { e.currentTarget.src = "/images/error.png" }} src={"/images/" + this.state.day?.ettermiddag} alt={this.state.day?.ettermiddag}></img>
                                        </div>
                                    </label></div>
                                <div className='box3'>
                                    <label>
                                        Natt:
                                        <br />
                                        <input type="text" name="natt" value={this.state.day?.natt} onChange={this.handleChange} />
                                        <div className='updateImagecontainer '>
                                            <img onError={e => { e.currentTarget.src = "/images/error.png" }} src={"/images/" + this.state.day?.natt} alt={this.state.day?.natt}></img>
                                        </div>
                                    </label>
                                </div>

                                < input className='m-3 btn btn-sm btn-success Button' type="submit" value="Save" />
                            </form>


                            {/* this.props.selectedDay !== null ? this.updateDay(this.props.selectedDay) : this.updateDay}>Save</Button> */}
                            {/* <button onClick={this.updateDay("1")}></button> */}
                        </div>



                        {/* </div> */}
                    </Fade>
                </Modal>

            </>
        )
    }
}
UpdateDayModal.contextType = MyContext;



