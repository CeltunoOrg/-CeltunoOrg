import React, { useEffect, useState } from 'react';
import "../../styles/Activities.css"
import { getDatabase, ref, onValue, child, get } from "firebase/database";
import { Button } from '@mui/material';

const db = getDatabase();
const reference = ref(db, 'planner/');
onValue(reference, (snapshot) => {
  const data = snapshot.val();
  console.log(data);
  
});

const testdata = ()=>{
const dbRef = ref(getDatabase());
get(child(dbRef, `/planner/1}`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
}
interface Props {
    children?: React.ReactNode
    hideAll: boolean
}
const DataReaderTest = (props: Props) => {

    useEffect(() => {
        // if(props.hideAll)        
        //     handleHidden()
        // handleDay(testData[0])
        // getAllData(null);
       



    })
    // const shallowClone = obj => Object.assign({}, obj);

   

    const [day, setDay] = useState({
        Name: "",

    });

    

   
    // const editCallback = (theSelected: IMyDay | null) => {
    //     if (theSelected) {

    //         console.log(`Edit Callback: ${theSelected.Id}`)
    //         if (theSelected.Id !== null) {
    //             PlannerDataService.updateMyDayItemDb(theSelected.Id, theSelected)
    //             getDayDbData()
    //         }
    //     }
    //     return theSelected
    // }


    return (
        <>
            <div className='appMainContainerDevice'>
                <div className='maingridContainer '>
                    {/* <h2>Device</h2> */}
                    {/* <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <ActivityEditor hideAll={true} editCallback={editCallback} propMyDay={day} isOpen={false} />
                        
                    </div> */}
                    <Button hidden={props.hideAll} variant='outlined' onClick={() => { testdata()}}><i className="fa fa-refresh" aria-hidden="true"></i></Button>

                </div>
            </div>
        </>
    );
}


export default DataReaderTest
