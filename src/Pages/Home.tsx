import React,{useState,useEffect} from "react";
import Button from "../Component/Button/Button";
import Loader from "../Component/Loader/Loader";

const Home: React.FC = () => {
  // const [draweropen , setdraweropen]
  const [loader , setloader] = useState<boolean>(true);

  
   useEffect(()=>{

      const timer = setTimeout(()=>{

         setloader(false);

      },1000)

      return ()=> clearTimeout(timer)

   },[])




  return (
    <>
    {loader ? (
    
    <div className="spinner">

      <Loader/>
    </div>
    ):
    <div className="flight_search">
      <input type="text" value="Karachi"></input>
      <input type="text" value="Islamabad"></input>
      <Button to="/flightsearch" >
        
         Search

      </Button>
    </div>
}
    </>
  
  );
};

export default Home;
