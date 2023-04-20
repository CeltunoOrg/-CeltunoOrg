
import { useTheOnValue } from '../../../firebase-planner';
import { DataType, IPreset } from "../../types/day.type";
import presetFirebaseService from "../../services/preset-firebase-service";


let topId = 0
export const FetchAllPresets = () => {
    // const[topId, setTopId] = useState<number>(0)
    const tmpData: Array<IPreset> = new Array<IPreset>
    presetFirebaseService.GetAllItemsDB(DataType.Presets).then((data) => {
        useTheOnValue(data, (snapshot) => {
            if (snapshot.exists()) {
                tmpData.length = 0;
                console.log("Snapshot found, mapping PRESETS data:");
                snapshot.forEach(function (childSnapshot) {
                    const key = childSnapshot.key;
                    if (!key)
                        return
                    const values = childSnapshot.val()
                    const childData: IPreset = {
                        Id: Number.parseInt(key),
                        Name: values.Name ?? "",
                        Description: values.Descritption ?? "",
                        Activities: values.Activities
                    }
                    childData.Id = Number.parseInt(key);
                    tmpData.push(childData);
                })

                const tmpId = HighestPresetId(tmpData)
                if (topId < tmpId)
                    topId = tmpId
                console.log(`DB items found: ${tmpData.length} Top Id: ${topId}`);
            }
        })
    }).then(() => {
        console.log("Fetched presets")
    }).catch((error) => {
        console.log(error)
    })
    return { presets: tmpData, topId: topId }
}

export const UpdatePreset = (id: number, preset: IPreset) => {
    if (id === undefined || id === null || id === 0) {
        console.log("No id provided, creating new...");
        const topId = FetchAllPresets().topId
        id = topId
    }
    if (id === 0)
        return
    if (preset.Description == undefined)
        preset.Description = ""
    console.log("Updating preset");
    presetFirebaseService.UpdatePresetItemDb(id, preset).then(() =>
        console.log("Updated preset")

    ).catch((error) => {
        console.log(error)
    })
}

export const HighestPresetId = (data: Array<IPreset>) => {
    if (data.length > 0) {
        const sortedDays = data.sort((a, b) => (a.Id > b.Id) ? -1 : 1);
        return sortedDays[0].Id + 1
    }
    else
        return 1
    // console.log(`GETHIGHEST - Activity-Highest: ${topId}`)
}

export const FetchOnePreset = (key: number) => {
    let preset: IPreset = {
        Id: 0,
        Name: "",
        Description: "",
        Activities: []
    };// IPreset | null;    
    if (key) {
        presetFirebaseService.GetDbOne(DataType.Presets, key).then((data) => {
            useTheOnValue(data, (snapshot) => {
                if (snapshot.exists()) {
                    console.log("Snapshot found PRESET setting ONE:");
                    const childData = snapshot.val() as IPreset;
                    if (childData.Description == undefined)
                        childData.Description = ""
                    childData.Id = key;
                    preset = childData;
                    // return preset
                }
                // else
                //     return null
                // handlePreset(preset)
            })

        }).then(() => {

            console.log("Fetched preset")
        }

        ).catch((error) => {
            console.log(error)
        })
    }
    return preset.Id === 0 ? null : preset
    // else
    //     return null
}

export const RemovePresetActivity = (activityId: number, activityIndex: number, preset: IPreset) => {
    if (preset.Id && preset.Id !== null && activityId !== null) {
        const index: number = preset.Activities.indexOf(preset.Activities[activityIndex], 0)
        if (index > -1) {
            preset.Activities.splice(index, 1);
        }
        if (preset.Description === undefined)
            preset.Description = ""
        presetFirebaseService.UpdatePresetItemDb(preset.Id, preset).then(() =>
            console.log("Removed preset activity")

        ).catch((error) => {
            console.log(error)
        })
    }
}

export const RemovePreset = (key: number) => {
    presetFirebaseService.RemovePresetItemDb(key).then(() =>
        console.log("Removed preset")

    ).catch((error) => {
        console.log(error)
    })
}
const PresetDataManager = {
    FetchAllPresets,
    UpdatePreset,
    FetchOnePreset,
    RemovePresetActivity,
    RemovePreset,
    HighestPresetId
}

export default PresetDataManager
// const getPresetDbData = () => {
//     PresetDataService.getAllItemsDB("presets").then((data) => {
//         useTheOnValue(data, (snapshot) => {
//             if (snapshot.exists()) {
//                 console.log("Snapshot found, mapping PRESET data:");
//                 snapshot.forEach(function (childSnapshot) {
//                     const key = childSnapshot.key;
//                     if (!key)
//                         return
//                     let childData = childSnapshot.val() as IPreset;
//                     childData.Id = Number.parseInt(key);
//                     tmpPreset.push(childData);
//                 })
//                 if (tmpPreset.length !== presets.length)
//                     setThePresets()
//                 console.log(tmpPreset.length)
//             }
//         })
//     })
//     return tmpPreset
// }