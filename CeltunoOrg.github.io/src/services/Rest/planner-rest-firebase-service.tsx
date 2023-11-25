// import React from "react";
// import { useQuery } from "react-query"
// import axios, { AxiosError } from "axios";



// export const QueryHandler = async () => await fetchData()
// // {
// //     // const {data, isError, error} = handledata() // getDbTest() //fetchData()
// //     // const data= getDbTest()
// //     const data = await fetchData()
// //     // if (isError) {
// //     //     return <p>Error: {error}</p>
// //     // }
// //     return data
// //}
// const handledata = () => {
//     const data = useQuery(
//         'apiTest',
//         fetchData
//     )
//     console.log("usQuery")
//     console.log(data)
//     return data
//     // return {data: data.data, raw:data 
// };


// const getDbTest = () => {
//     // const [, { id }] = params.queryKey;
//     const promise = fetch(`https://planner-65610-default-rtdb.europe-west1.firebasedatabase.app/user.json`);

//     promise.then((response) => {
//         if (!response.ok) {
//             throw new Error("Problem fetching data");
//         }
//         const jsonTest = response.json
//         console.log(jsonTest)
//         return response
//     }
//     )

// }

// async function fetchData() {
//     let returnData: any = {}
//     const data = await axios(`http://localhost:8082/api/planner/user`)
//         //`https://planner-65610-default-rtdb.europe-west1.firebasedatabase.app/user.json`)
//         .then((responseDataElement) => {
//             if (responseDataElement.status !== 200) {
//                 console.log("######## NOT 200 #########")
//                 console.log(responseDataElement.status)
//                 console.log(responseDataElement.statusText)
//                 console.log(responseDataElement.data)
//             }
//             console.log("######## 200 OK #########")
//             console.log(responseDataElement.status)
//             console.log(responseDataElement.statusText)
//             console.log(responseDataElement.data)
//             returnData = responseDataElement
//         })
//         .catch((e: AxiosError) => {
//             console.log("#Axios error:")
//             console.log(e.message)
//         })
//     console.log("axios")
//     return returnData
// }












// export default QueryHandler