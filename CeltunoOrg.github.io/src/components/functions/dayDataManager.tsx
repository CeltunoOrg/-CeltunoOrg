
import { useTheOnValue } from '../../../firebase-planner';
import { DataType, IMyDay } from "../../types/day.type";
import PlannerFirebaseService from "../../services/planner-firebase-service";
export const FetchAllDays = () => {
    let topId = 0
    const tmpData: Array<IMyDay> = new Array<IMyDay>
    PlannerFirebaseService.GetDBref(DataType.Planner).then((data) => {
        useTheOnValue(data, (snapshot) => {
            if (snapshot.exists()) {
                console.log("Snapshot found, mapping PRESETS data:");
                snapshot.forEach(function (childSnapshot) {
                    const key = childSnapshot.key;
                    if (!key)
                        return
                    const values = childSnapshot.val()
                    const childData: IMyDay = {
                        Id: Number.parseInt(key),
                        Name: values.Name ?? "",
                        Description: values.Descritption ?? "",
                        Activities: values.Activities
                    }
                    childData.Id = Number.parseInt(key);
                    tmpData.push(childData);
                })
                topId = HighestDayId(tmpData)
                console.log(`DB items found: ${tmpData.length} Top Id: ${topId}`);
            }
        })
    }).then(() => {
        console.log("Fetched days")
    }).catch((error) => {
        console.log(error)
    })
    return { days: tmpData, topId: topId }
}

export const UpdateDay = (id: number, day: IMyDay) => {
    if (id === undefined || id === null || id === 0) {
        console.log("No id provided, creating new...");
        const topId = FetchAllDays().topId
        id = topId
    }
    if (id === 0)
        return

    console.log("Updating day");
    PlannerFirebaseService.UpdateMyDayItemDb(id, day).then(() =>
        console.log("Updated day")

    ).catch((error) => {
        console.log(error)
    })
}

export const HighestDayId = (data: Array<IMyDay>) => {
    if (data.length > 0) {
        const sortedDays = data.sort((a, b) => (a.Id > b.Id) ? -1 : 1);
        return sortedDays[0].Id + 1
    }
    else
        return 1
    // console.log(`GETHIGHEST - Activity-Highest: ${topId}`)
}

export const FetchOneDay = (key: number) => {
    let day:IMyDay  = {
        Id: 0,
        Name: "",
        Description: "",
        Activities: []
    };
    if (key) {
        PlannerFirebaseService.GetDbOne(DataType.Planner, key).then((data) => {
            useTheOnValue(data, (snapshot) => {
                if (snapshot.exists()) {
                    console.log("Snapshot found PRESET setting ONE:");
                    const childData = snapshot.val() as IMyDay;
                    if (childData.Description == undefined)
                        childData.Description = ""
                    childData.Id = key;
                    day =  childData;                 
                }
            })

        }).then(() =>{

            console.log("Fetched day")
        }
        
        ).catch((error) => {
            console.log(error)
        })
    }
    return day.Id === 0?  null: day
}

export const RemoveDayActivity = (activityId: number, activityIndex: number, day: IMyDay) => {
    if (day.Id && day.Id !== null && activityId !== null) {
        const index: number = day.Activities.indexOf(day.Activities[activityIndex], 0)
        if (index > -1) {
            day.Activities.splice(index, 1);
        }
        if (day.Description === undefined)
            day.Description = ""
        PlannerFirebaseService.UpdateMyDayItemDb(day.Id, day).then(() =>
        console.log("Removed day activity")

    ).catch((error) => {
        console.log(error)
    })
    }
}

export const RemoveDay = (key: number) => {
    PlannerFirebaseService.RemoveDayItemDb(key).then(() =>
        console.log("Removed day")

    ).catch((error) => {
        console.log(error)
    })
}
