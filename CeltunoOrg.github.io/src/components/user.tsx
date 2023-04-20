import React, { useEffect, useState } from 'react';
import "../../styles/Presets.css"
import { DataType, IUser } from '../types/day.type';
import PresetEditor from './modules/editPreset';
import { Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import UserDataManager, { HighestUserId } from './functions/userDataManager';
import AddUser from './modules/addUser';
import userFirebaseService from '../services/user-firebase-service';
// import userFirebaseService from '../services/user-firebase-service';
import { useTheOnValue } from '../../firebase-planner';


interface Props {
    children?: React.ReactNode
    isOpen: boolean
}
let counter = 0
const User = (Props: Props) => {
    useEffect(() => {
        // handleDay(testData[0])
        // getAllData(null);
        if(!users || users.length <= 0 && counter <=88){            
            getUserDbData()
            counter++
        }
    })

    // const [isOpen, setopen] = useState({
    //     isOpen: false
    // });
    const [users, setUsers] = useState<Array<IUser>>(new Array<IUser>);
    const [user, setUser] = useState<IUser>({
        Id: 0,
        Name: "",
        Days: [],
        Presets: [],
        LastDay: null,
        Config: {
            title: "",
            titleSize: "",
            color1: "",
            color2: "",
            background: "",
            role: ""
        }
    });

    let tmpData: Array<IUser> = new Array<IUser>;
    
    const getUserDbData = () => {
        const returnData  = FetchAllUserData()
        if(returnData && returnData.Users.length > 0)
            tmpData= returnData.Users;    
        handleUsers(null)
        // return tmpData
    }

    const FetchAllUserData = () => {
        let topId = 0
        // = {
        //     Id: 0,
        //     Name: '',
        //     Days: [],
        //     Presets: [],
        //     LastDay: null,
        //     Config: {
        //         title: '',
        //         titleSize: '',
        //         color1: '',
        //         color2: '',
        //         background: '',
        //         role: ''
        //     }
        // }
        userFirebaseService.GetAllItemsDB(DataType.User).then((data) => {
            useTheOnValue(data, (snapshot) => {
                if (snapshot.exists()) {
                    tmpData.length = 0
                    snapshot.forEach(function (childSnapshot) {
                        const key = childSnapshot.key;
                        if (!key)
                            return
                        const values = childSnapshot.val()
                        const childData: IUser = {
                            Id: Number.parseInt(key ?? "0"),
                            Name: values.Name,
                            Days: values.Days,
                            LastDay: values.LastDay,
                            Presets: values.Presets,
                            Config: values.Config
                        }
                        // childData.Id = Number.parseInt(key ?? "0");
                        tmpData.push(childData);
                    })
                    const tmpId = HighestUserId(tmpData)
                    if (topId < tmpId)
                        topId = tmpId
                    console.log(`DB items found: ${tmpData.length} Top Id: ${topId}`);
                }
            })
        }).then(() => {
            tmpData.length >0 ? console.log(`${tmpData.length} users found`) : console.log(`No users found`)
            // handleUsers(null)
        }).catch((error) => {
            console.log(error)
        })
        
        return { Users: tmpData }
    }
    
    // const sortPresetsByKey = (array: IPreset[]) => {
    //     return array.sort((a, b) => {
    //         return a.Id >= b.Id
    //             ? 1
    //             : -1
    //     })
    // }

const handleUsers= (user:IUser | null) =>{
    if(user)
        setUser(user)
    setUsers(tmpData)
}

    const removePresetItem = (key: number | null) => {
        if (key === null)
            return


        UserDataManager.RemoveUser(key)
        getUserDbData()
    }

    const setThePresets = (user: IUser | null) => {
        if (user)
            setUser(user)
        // setUser(tmpData)
    }


    const addUserCallback = (newUser: IUser | null) => {
        if (newUser) {

            console.log(`Edit Callback: ${newUser.Id}`)
            if (newUser.Id !== null) {
                getUserDbData()
                UserDataManager.UpdateUser(newUser.Id, newUser)
                // setThePresets(null)
                
                handleUsers(null)
            }
        }
        return newUser
    }

    return (
        <>
            <div className='appMainContainer'>
                <div className='maingridContainer '>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Button href='/#/'><ArrowBackIcon /></Button>

                        <Button onClick={() => { getUserDbData() }}><RefreshIcon /></Button>

                        <AddUser addUserCallback={addUserCallback} propCurrentUser={user} />
                    </div>
                    <div className='presetTitle'>
                        <h2>USER</h2>
                    </div>
                    <div className="preset-grid-container">
                        {
                            users?.map((userItem, userDayIndex) => (
                                <div className='preset-grid-item' key={userItem.Name + userDayIndex}>
                                    <div className="presetListContainer ">
                                        <h3 >{userItem.Name}</h3>
                                        Background: {userItem.Config.background}
                                        {userItem.Days ?
                                            userItem?.Days.map((day, dayIndex) =>
                                            (

                                                <div className="activityPresetItem" id={"preset" + day.Id} key={dayIndex} style={{ order: (day.Id), }}>

                                                    <div className="activityImageListcontainer">
                                                        <img onError={e => { e.currentTarget.src = "images/error.png" }} src={"images/" + day.Name} alt={day.Name}></img>
                                                    </div>
                                                </div>
                                            ))
                                            :
                                            ""
                                        }
                                    </div>
                                    <div className='gridButtons'>
                                        <AddUser addUserCallback={addUserCallback} propCurrentUser={user} />
                                        {

                                            userItem.Id !== null ?
                                                <Button onClick={(() => removePresetItem(userItem.Id))}>
                                                    <DeleteIcon />
                                                </Button>
                                                :
                                                ""
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
        </>
    );
}


export default User
