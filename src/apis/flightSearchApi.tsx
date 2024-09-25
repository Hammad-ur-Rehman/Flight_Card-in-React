// import axios from "axios";
// import { User } from "../Component/Types/Types";
// // import { useState } from "react";


// // const BASE_URL = "http://localhost:5000";
//   const BASE_URL =  "https://www.sastaticket.pk"


//   //  const [api , setapi] = useState();
   


// // export const getUsers = async (): Promise<User[]> => {
// //   try {
// //     const res = await axios.get<User[]>(`${BASE_URL}/flightdetails`);
// //     return res.data;
// //   } catch (error: any) {
// //     // Handle error more gracefully
// //     if (axios.isAxiosError(error)) {
// //       console.log("Axios error:", error.message);
// //     } else {
// //       console.log("Unexpected error:", error);
// //     }
// //     throw new Error(error.message);
// //   }
// // };


// //Payload


// export const flightSearchRequest = async (payload: any): Promise<User[]> => {



//   try {
//     const response = await axios.post<User[]>(`${BASE_URL}/api/v4/flights/`, payload);
//     console.log("Flight Response", response.data);
//     return response.data;
//   } catch (error) {
//     console.log("Error", error);
//     return []; // This ensures the function always returns a User[]
//   }


// };



import axios from "axios";
import { FlightDetails } from "../Component/Types/Types";

const BASE_URL = "https://www.sastaticket.pk";

export interface ApiResponse {

   data: {
      flights: FlightDetails[];

   }
   poll?:boolean;
   

}


export const flightSearchRequest = async (payload:any):Promise<ApiResponse>=>{
  
   try {
        
       const response = await axios.post<ApiResponse>(`${BASE_URL}/api/v4/flights/`,payload)
     
      //  console.log("Flightdata Response" , response.data);
       
      //  const continuePolling = response.data.length > 0;

        return response.data;
          
}

   catch(error){

        console.log("Error" , error);

        return {
             
            data :{

                 flights:[],
            },
            
            poll:false
            
        }

   }


}



