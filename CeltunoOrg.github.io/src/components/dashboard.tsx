import React, { Component } from 'react';
import "../../styles/App.css"
import Button from '@mui/material/Button';

type State = {
    isOpen: boolean
    userPreferences: {
        hideAll: boolean
    }
}
interface Props {
    children?: React.ReactNode
    isOpen: boolean
    userPreferences: {
        hideAll: boolean
    }
}
class Dashboard extends Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            isOpen: false,
            userPreferences: {
                hideAll: false
            }
        }
    }


    // componentDidMount(){}

    render() {

        return (


            <div className='appMainContainer'>

                <div className='maingridContainer '>
                    {/* <Button onClick={}>Open Modal </button> */}
                    <div className='dashboardBox'>
                        <Button className={'sizeButton'} variant='outlined' href='/activities'> Activities </Button>
                        <Button className={'sizeButton'} variant='outlined' href='/presets'> Presets    </Button>
                        <Button className={'sizeButton'} variant='outlined' href='/deviceView'> Device view    </Button>
                        <Button className={'sizeButton'} variant='outlined' href='/test'> Testing    </Button>
                    </div>

                </div>
                <div>
                </div>
            </div>

        );
    }
}

export default Dashboard
