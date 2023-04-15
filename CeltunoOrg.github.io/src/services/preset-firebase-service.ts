import { IDay , IImagePreset, IMyDay, IPreset } from "../types/day.type";

// import {fb, db} from "../../firebase"
import { getDatabase, onValue, set, update, get, push, orderByKey, orderByChild, child, DatabaseReference, remove, ref } from "firebase/database";
import { db as fireDb, firestore, useTheOnValue, useTheRef } from "../../firebase-planner"
// import { collection, getDocs, addDoc } from "firebase/firestore";

// import React, { Suspense, useEffect, useState } from "react";

const initFirebase = fireDb;
const db = getDatabase();

class PresetDataService {
  // getAll() {
  //   console.log("Getall: ")
  //   console.log(db)
  //   return db;
  // }
  // async getOnedb(key: string) {
  //   const dayDbRef = useTheRef(db, '/planner/' + key);
  //   onValue(dayDbRef, (snapshot) => {
  //     const data = snapshot.toJSON();//.val();
  //     console.log("DataDB: ");
  //     console.log(data);
  //   });

  //   return dayDbRef;
  // }

  // getOnedb1(key: string) {
  //     console.log("Get one by key: " + key)
  //     return  get(child(useTheRef(db), `/` + key));   
  // }
async getDbAllDays(path: string |null) {
    let  databaseReference : DatabaseReference | null = null
    console.log("Connecting to db...");//Getting all from db");
    path ? 
    databaseReference = useTheRef(db, `/${path}`) // orderByChild('name'));     
    :
    databaseReference = useTheRef(db, '/planner') // orderByChild('name')); 
    return databaseReference;
  }
  
async getDbOne(path: string |null ,key:number) {
    let  databaseReference : DatabaseReference | null = null
    console.log("Connecting to db...");//Getting all from db");
    path ? 
    databaseReference = useTheRef(db, `/${path}/${key}/`) // orderByChild('name'));     
    :
    databaseReference = useTheRef(db, `/planner/${key}/`) // orderByChild('name')); 
    return databaseReference;
  }


  // async getdb() {

  //   console.log("Connecting to db...");//Getting all from db");
  //   const databaseReference = useTheRef(db, '/planner'); // orderByChild('name'));     
  //   return databaseReference;
  // }
  //  async getdbAll-OLD() {
  //   console.log("Getting all from db");
  //   const data = query(ref(db, 'myDay/'), orderByKey()); // orderByChild('name'));
  //   var result;
  //   var allDays = new Array<IDay>
  //   get(data).then((snapshot) => {
  //     result = snapshot.toJSON()
  //     console.log("AllDataDB: ");
  //     snapshot.forEach((child ) => {
  //       allDays.push(child.val() as IDay)
  //       console.log(allDays[0].name)
  //         // child.key, child.val());
  //     })
  //     return result //as IDay[]
  //   })
  // }
async updateMyDayItemDb(key: number, theActivity: IMyDay | null) {
    try {

      if (theActivity === null) {
        console.log("No activity data");
        return null
      }
      // console.log("Update pre: ");
      // console.log(theDay);
      // theDay.formiddag= "New formiddag"
      const updates = {};
      updates['/planner/' + key] = theActivity
      console.log("Add result: ")
      return update(useTheRef(db), updates)
    }
    catch (e) {
      console.error("Error adding document: ", e);
      return e
    }
  }
  async updatePresetItemDb(key: number, thePreset: IPreset | null) {
    try {

      if (thePreset === null) {
        console.log("No preset data");
        return null
      }
      // console.log("Update pre: ");
      // console.log(theDay);
      // theDay.formiddag= "New formiddag"
      const updates = {};
      updates['/preset/' + key] = thePreset
      console.log("Add result: ")
      return update(useTheRef(db), updates)
    }
    catch (error) {
      console.error("Error adding document: ", error);
      // return e
    }
  }
  removePresetItemDb(key: number){
    const itemref = `/preset/${key}`
      
    return remove(ref(db, itemref))
  }
    removePresetActivityItemDb(dayKey: number, activityKey: number){
    const itemref = `/preset/${dayKey}/${activityKey}`
      
    remove(useTheRef(db, itemref)).then( () =>
      console.log("DOne removing?")
    ).catch((e)=>
    console.log(e)
    )
  }
  removeDayItemDb(key: number){
    const itemref = `/planner/${key}`
      
    return remove(useTheRef(db, itemref)).then( () =>
      console.log("DOne removing?")
    ).catch((e)=>
    console.log(e)
    )
  }
  removeDayActivityItemDb(dayKey: number, activityKey: number, day:IMyDay){
    const itemref = `/planner/${dayKey}/Activities/${activityKey}`
    const updates = {};
    updates[`/planner/${dayKey}/Activities/${activityKey}`] = null
    console.log("Cleared activity: " +activityKey)
    // return update(useTheRef(db), updates)
    update(useTheRef(db),updates).then( () =>
      console.log("DOne removing?")
    ).catch((e)=>
    console.log(e)
    )
  }
  inintDb() {
    const db = getDatabase();
    return db.app.name;
  }

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

export default new PresetDataService();
