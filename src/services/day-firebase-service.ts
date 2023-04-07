import IDay from "../types/day.type";
// import {fb, db} from "../../firebase"
import { getDatabase, onValue, set, update, get, push, orderByKey, orderByChild, child } from "firebase/database";
import { db as fireDb, firestore, useTheOnValue, useTheRef } from "../../firebase"
// import { collection, getDocs, addDoc } from "firebase/firestore";

// import React, { Suspense, useEffect, useState } from "react";

const initFirebase = fireDb;
const db = getDatabase();

let day1;

class DayDataService {
  getAll() {
    console.log("Getall: ")
    console.log(db)
    return db;
  }
  async getOnedb(key: string) {
    const dayDbRef = useTheRef(db, '/myDay/' + key);
    onValue(dayDbRef, (snapshot) => {
      const data = snapshot.toJSON();//.val();
      console.log("DataDB: ");
      console.log(data);
    });

    return dayDbRef;


  }
  getOnedb1(key: string) {
      console.log("Get one by key: " + key)
      return  get(child(useTheRef(db), `/` + key));
      
   
  }


  async getdbAll() {

    console.log("Connecting to db...");//Getting all from db");
    const databaseReference = useTheRef(db, '/'); // orderByChild('name'));     
    return databaseReference;
  }

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

  async updateItemDb(key: string, theDay: IDay | null) {
    try {

      if (theDay === null) {
        console.log("No day data");
        return null
      }
      // console.log("Update pre: ");
      // console.log(theDay);
      // theDay.formiddag= "New formiddag"
      const updates = {};
      updates['/' + key] = theDay
      console.log("Add result: ")
      return update(useTheRef(db), updates)
    }
    catch (e) {
      console.error("Error adding document: ", e);
      return e
    }
  }
  inintDb() {
    const db = getDatabase();
    return db.app.name;
  }

  async createdb(day: IDay) {
    try {
      const db = getDatabase();
      console.log("Create pre day: ");
      console.log(day)
      if (day === null)
        return null
      // day = 
      // {
      //   name: "dbName",
      //   formiddag: "dbform",
      //   ettermiddag: "dbetterm",
      //   natt: "dbnatt",
      //   submitted: false
      // } as IDay;
      const result = push(useTheRef(db, '/'), day)
        .then(() => {
          console.log("Item added success");
        }).catch((e) => {
          console.log("Error")
          console.log(e);
        });

      console.log("Add-set result: ")
      console.log(result);
      return result

    } catch (e) {
      console.error("Error adding : ", e);
      return e
    }
  }
}

export default new DayDataService();
