import { Button, Fade } from '@mui/material';
import Modal from '@mui/material/Modal';
import React, { useState, useContext } from 'react';
import {MyContext} from "../Context"
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
    selectedDay : string
    runOnLoadingParent: boolean
    theBool : boolean
 }

type State = {
    isOpen : boolean
}
export default class ModalItem1 extends React.Component<Props,State> {
    constructor(props: Props) {
        super(props);
        this.state = {          
            isOpen: false
        }
    }

    static contextType = MyContext;
    state = {
        isOpen: false
    };
    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });
    
    componentDidMount() {
       
        if(this.props.runOnLoadingParent === true)
        {
            // alert("Opening");
            // this.openModal
        }

       return
    }
    buttonthing(){
        alert("OK");
    }
  
    render() {

        return (
            <>

                {/* <div className="d-flex align-items-center justify-content-center"
                    style={{ height: "50vh" }}
                ></div> */}
                <Button onClick={this.openModal}>Open OLD modal</Button>
                <Modal
                    open={this.state.isOpen} onClose={this.closeModal}>
                    <Fade in={this.state.isOpen}>
                        <div className='updateDay'>
                            {/* className="paper"> */}
                            <h2>Modify day: {this.props.selectedDay}</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan odio enim.
                            </p>
                            <MyContext.Consumer>
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
                            </MyContext.Consumer>
                        </div>
                    </Fade>
                    {/* <Box>
                        Woohoo, you're reading this text in a modal!
                    </Box> */}

                </Modal>
            </>
        )
    }
}
ModalItem1.contextType = MyContext;



