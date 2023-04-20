
import { useTheOnValue } from '../../../firebase-planner';
import { DataType, IUser } from "../../types/day.type";
import userFirebaseService from '../../services/user-firebase-service';

const tmpData: Array<IUser> = new Array<IUser>
let topId = 0
export const FetchAllUserData = () => {
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
                console.log("Snapshot found, mapping USER data:");
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
                topId = HighestUserId(tmpData)
                console.log(`DB items found: ${tmpData.length} Top Id: ${topId}`);
            }
        })
        // }).then(() => {
        //     console.log("Fetched user")
        // }).catch((error) => {
        //     console.log(error)
    })
    return { users: tmpData, topId: topId }
}

export const UpdateUser = (id: number, user: IUser) => {
    if (id === undefined || id === null || id === 0) {
        console.log("No id provided, creating new...");
        const userData = FetchAllUserData()
        if (!user)
            return
        id = userData.topId > id
            ?
            userData.topId
            :
            id

        if (id === 0)
            return
    }
    console.log("Updating user");
    userFirebaseService.UpdateUserItemDb(id, user).then(() =>
        console.log("Updated user")

    ).catch((error) => {
        console.log(error)
    })
}

export const HighestUserId = (data: Array<IUser>) => {
    if (data.length > 0) {
        const sortedUsers = data.sort((a, b) => (a.Id > b.Id) ? -1 : 1);
        return sortedUsers[0].Id + 1
    }
    else
        return 1
    // console.log(`GETHIGHEST - Activity-Highest: ${topId}`)
}

export const FetchOneUser = (key: number) => {
    let user: IUser = {
        Id: 0,
        Name: '',
        Days: [],
        Presets: [],
        LastDay: null,
        Config: {
            title: '',
            titleSize: '',
            color1: '',
            color2: '',
            background: '',
            role: ''
        }
    };
    if (key) {
        userFirebaseService.GetDbOne(DataType.User, key).then((data) => {
            useTheOnValue(data, (snapshot) => {
                if (snapshot.exists()) {
                    console.log("Snapshot found USER setting ONE:");
                    const childData = snapshot.val() as IUser;
                    childData.Id = key;
                    user = childData;
                }
            })

        }).then(() => {

            console.log("Fetched user")
        }

        ).catch((error) => {
            console.log(error)
        })
    }
    return user.Id === 0 ? null : user
}

// export const RemoveUSerActivity = (activityId: number, activityIndex: number, user: IUser) => {
//     if (user.Id && user.Id !== null && activityId !== null) {
//         const index: number = user.Activities.indexOf(user.Activities[activityIndex], 0)
//         if (index > -1) {
//             user.Activities.splice(index, 1);
//         }
//         if (user.Description === undefined)
//             user.Description = ""
//         userFirebaseService.UpdateUserItemDb(user.Id, user).then(() =>
//         console.log("Removed user activity")

//     ).catch((error) => {
//         console.log(error)
//     })
//     }
// }

export const RemoveUser = (key: number) => {
    userFirebaseService.RemoveUserItemDb(key).then(() =>
        console.log("Removed user")

    ).catch((error) => {
        console.log(error)
    })
}

const UserDataManager = {
    FetchAllUserData,
    UpdateUser,
    FetchOneUser,
    RemoveUser,
    // RemoveUserActivity,

}

export default UserDataManager
