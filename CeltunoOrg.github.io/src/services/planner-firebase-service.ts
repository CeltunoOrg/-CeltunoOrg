import { DataType, IDay, IImagePreset, IMyDay, IPreset } from "../types/day.type";

// import {fb, db} from "../../firebase"
import { getDatabase, onValue, set, update, get, push, orderByKey, orderByChild, child, DatabaseReference, remove, ref } from "firebase/database";
import { db as fireDb, firestore, useTheOnValue, useTheRef } from "../../firebase-planner"
// import { collection, getDocs, addDoc } from "firebase/firestore";

// import React, { Suspense, useEffect, useState } from "react";

// const initFirebase = fireDb;
const db = getDatabase();

class PlannerDataService {

  async GetAllItemsDB(dataType: DataType) {
    let databaseReference: DatabaseReference | null = null
    console.log("Connecting to db...");
    dataType
      ? databaseReference = useTheRef(db, `/${dataType}`)
      : databaseReference = useTheRef(db, '/planner')

    return databaseReference;
  }

  async GetDbOne(dataType: DataType, key: number) {
    let databaseReference: DatabaseReference | null = null
    console.log("Connecting to db...");
    dataType ?
      databaseReference = useTheRef(db, `/${dataType}/${key}/`) // orderByChild('name'));     
      :
      databaseReference = useTheRef(db, `/planner/${key}/`) 
    return databaseReference;
  }

  InsertDay = function writeData(day: IMyDay) {
    const db = getDatabase();
    set(ref(db, '/planner/' + day.Id), day);
  }

  async UpdateMyDayItemDb(key: number, theActivity: IMyDay | null) {
    try {

      if (theActivity === null) {
        console.log("No activity data");
        return null
      }
      const updates = {};
      updates['/planner/' + key] = theActivity
      console.log("Add result: ")
      return update(useTheRef(db), updates)
    }
    catch (e) {
      console.error("Error updating day: ", e);
      return e
    }
  }
  RemoveDayItemDb(key: number) {
    const itemref = `/planner/${key}`

    return remove(useTheRef(db, itemref)).then(() =>
      console.log("Removed day")
    ).catch((e) =>
      console.log(e)
    )
  }
  RemoveDayActivityItemDb(dayKey: number, activityKey: number) {
    // const itemref = `/planner/${dayKey}/Activities/${activityKey}`
    const updates = {};
    updates[`/planner/${dayKey}/Activities/${activityKey}`] = null
    console.log("Cleared activity: " + activityKey)
    update(useTheRef(db), updates).then(() =>
      console.log("DOne removing day activity?")
    ).catch((e) =>
      console.log(e)
    )
  }

  InsertPreset = function writeData(preset: IPreset) {
    if (preset) {

      const db = getDatabase();
      set(ref(db, '/presets/' + preset.Id), preset)
    }
  }

  async UpdatePresetItemDb(key: number, alteredPreset: IPreset | null) {
    try {

      if (alteredPreset === null) {
        console.log("No preset data");
        return null
      }
      const updates = {};
      updates['/presets/' + key] = alteredPreset
      console.log("Updating preset...")
      return update(useTheRef(db), updates)
    }
    catch (error) {
      console.error("Error updating preset: ", error);
    }
  }

  RemovePresetItemDb(key: number) {
    const itemref = `/presets/${key}`
    return remove(ref(db, itemref)).then(() =>
      console.log("Removed preset")
    ).catch((e) =>
      console.log(e)
    )
  }

  RemovePresetActivityItemDb(dayKey: number, activityKey: number) {
    // const itemref = `/presets/${dayKey}/Activities/${activityKey}`
    const updates = {};
    updates[`/presets/${dayKey}/Activities/${activityKey}`] = null
    console.log("Cleared activity: " + activityKey)
    update(useTheRef(db), updates).then(() =>
      console.log("Done removing preset activity?")
    ).catch((e) =>
      console.log(e)
    )
  }



  // inintDb() {
  //   const db = getDatabase();
  //   return db.app.name;
  // }

  // async createdb(day: IDay) {
  //   try {
  //     const db = getDatabase();
  //     console.log("Create pre preset: ");
  //     console.log(day)
  //     if (day === null)
  //       return null
  //     // day = 
  //     // {
  //     //   name: "dbName",
  //     //   formiddag: "dbform",
  //     //   ettermiddag: "dbetterm",
  //     //   natt: "dbnatt",
  //     //   submitted: false
  //     // } as IDay;
  //     const result = push(useTheRef(db, '/'), day)
  //       .then(() => {
  //         console.log("Item added success");
  //       }).catch((e) => {
  //         console.log("Error")
  //         console.log(e);
  //       });

  //     console.log("Add-set result: ")
  //     console.log(result);
  //     return result

  //   } catch (e) {
  //     console.error("Error adding : ", e);
  //     return e
  //   }
  // }
}

export default new PlannerDataService();
