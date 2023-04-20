import { DataType,IUser } from "../types/day.type";

// import {fb, db} from "../../firebase"
import { getDatabase, set, update, get, push, orderByKey, orderByChild, child, DatabaseReference, remove, ref } from "firebase/database";
import { useTheRef } from "../../firebase-planner"
// import { collection, getDocs, addDoc } from "firebase/firestore";

// import React, { Suspense, useEffect, useState } from "react";

// const initFirebase = fireDb;
const db = getDatabase();

class UserDataService {

  async GetAllItemsDB(dataType: DataType) {
    let databaseReference: DatabaseReference | null = null
    console.log("Connecting to db...");
    dataType
      ? databaseReference = useTheRef(db, `/${dataType}`)
      : databaseReference = useTheRef(db, '/user')

    return databaseReference;
  }

  async GetDbOne(dataType: DataType, key: number) {
    let databaseReference: DatabaseReference | null = null
    console.log("Connecting to db...");
    dataType ?
      databaseReference = useTheRef(db, `/${dataType}/${key}/`) // orderByChild('name'));     
      :
      databaseReference = useTheRef(db, `/user/${key}/`) 
    return databaseReference;
  }

  InsertUser = function writeData(user: IUser) {
    const db = getDatabase();
    set(ref(db, '/user/' + user.Id), user);
  }

  async UpdateUserItemDb(key: number, theActivity: IUser | null) {
    try {

      if (theActivity === null) {
        console.log("No activity data");
        return null
      }
      const updates = {};
      updates['/user/' + key] = theActivity
      console.log("Add result: ")
      return update(useTheRef(db), updates)
    }
    catch (e) {
      console.error("Error updating user: ", e);
      return e
    }
  }
  RemoveUserItemDb(key: number) {
    const itemref = `/user/${key}`

    return remove(useTheRef(db, itemref)).then(() =>
      console.log("Removed user")
    ).catch((e) =>
      console.log(e)
    )
  }
  
}

export default new UserDataService();
