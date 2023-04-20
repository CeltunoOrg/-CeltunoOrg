import { DataType, IDay, IImagePreset, IMyDay, IPreset } from "../types/day.type";

// import {fb, db} from "../../firebase"
import { getDatabase, onValue, set, update, get, push, orderByKey, orderByChild, child, DatabaseReference, remove, ref } from "firebase/database";
import { db as fireDb, firestore, useTheOnValue, useTheRef } from "../../firebase-planner"
// import { collection, getDocs, addDoc } from "firebase/firestore";

// import React, { Suspense, useEffect, useState } from "react";

// const initFirebase = fireDb;
const db = getDatabase();

class PresetDataService {

  async GetAllItemsDB(dataType: DataType) {
    let databaseReference: DatabaseReference | null = null
    console.log("Connecting to db...");
    dataType
      ? databaseReference = useTheRef(db, `/${dataType}`)
      : databaseReference = useTheRef(db, '/preset')

    return databaseReference;
  }

  async GetDbOne(dataType: DataType, key: number) {
    let databaseReference: DatabaseReference | null = null

    console.log("Connecting to db...");
    databaseReference = useTheRef(db, `/${dataType}/${key}/`) // orderByChild('name'));     

    return databaseReference;
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
}

export default new PresetDataService();
