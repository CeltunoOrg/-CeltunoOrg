import IDay, { IMyDay } from "../../types/day.type";
// import {fb, db} from "../../firebase"
import { getDatabase, onValue, set, update, get, push, orderByKey, orderByChild, child } from "firebase/database";
import { db as fireDb, firestore, useTheOnValue, useTheRef } from "../../../firebase"
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
  async getOnedb(id: number) {
    const dayDbRef = useTheRef(db, '/myDay/' + id);
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


  async getAllItemsDB() {
    console.log("Connecting to db...");
    const databaseReference = useTheRef(db, '/');   
    return databaseReference;
  }


  async updateDayItemDb(id: number, theDay: IMyDay | null) {
    try {

      if (theDay === null) {
        console.log("No day data");
        return null
      }
      const updates = {};
      updates['/' + id] = theDay
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
