import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../Pages/Home';
import Flightsearch from '../Pages/flightSearch';
const AppRoutes:React.FC = () => {
  return (
    
    <>
     <Router>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flightsearch" element={<Flightsearch />} />
      </Routes>
      
    </Router>
    
    
    </>


  )
}

export default AppRoutes
