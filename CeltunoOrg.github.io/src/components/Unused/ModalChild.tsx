import { Box, Button, Fade, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
// import{makeStyles} from "@mui/styles"
import React, { useState, useContext } from 'react';
import { userData } from "./Context2"
import Select, { MultiValue } from 'react-select'
import IDay from '../../types/day.type';




interface Props {
    test2r: IDay[]
    testr: {
        value: number,
        label: string
    }[],
    myCallBack: (days: Array<IDay>) => {()}
}

type State = {
    user: {
        userName: string
        loggedIn: boolean
    },
    isOpen: boolean
    selectChoices: Array<IDay>
}
// days: Array<IDay>,
// currentDay: IDay | null,

export default class ModalChild extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            user: {
                userName: userData.user.userName,
                loggedIn: userData.user.loggedIn
            },
            isOpen: false,
            selectChoices: [],
        }
    }


    changeContext = () => {
        this.setState(state => ({
            user: {
                userName: this.state.user.userName === userData.user.userName ? userData.user.userName : "NewUser",
                loggedIn: this.state.user.loggedIn === true ? false : true,
            }

        }))
        //)
        console.log(userData.user.userName)
        userData.user.userName = "after2";
    }
    componentDidMount() {
        return
    }

    setSelectChoice(theChoices: MultiValue<{ value: number, label: string }>) {
        const  tmpArray = new Array<string>;
        let tmpChoichesDays = new Array<IDay>;
        const theDays2 = this.props.test2r;
        console.log("Values changed")
        console.log(theChoices)
        theChoices.map((item) => {
            tmpArray.push(item.label)
        })
        tmpChoichesDays = theDays2;
        // Driver code



    }


    render() {
        const theUser = this.context as any;
        const fromParent = this.props.testr;
        const options = this.props.testr;


        return (
            <>
                    <h2>Animated React Modal</h2>
                    <p>
                        1{theUser.userName} - {theUser.loggedIn}
                        2{this.state.user.userName} - {this.state.user.loggedIn}
                    </p>
                 
                    {
                        this.props.test2r.map((day, index) => {
                            { fromParent.push({ value: index, label: day.name }) }
                            <p key={"b" + day.key}>{day.name}
                            </p>
                        })
                    }
                    <p>Select:</p>
                    <Select isMulti options={fromParent} onChange={(choices: MultiValue<{
                        value: number,
                        label: string;
                    }>) => { this.setSelectChoice(choices) }} />
                    {/* //defaultValue={options[0]}/> */}
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan odio enim.
                    </p>
            </>
        )
    // ModalChild.contextType = MyContext;
    }
}



