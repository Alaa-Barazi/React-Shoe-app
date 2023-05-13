import React, { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';

import { Route, Routes } from "react-router-dom"
import AddShoe from './Components/AddShoe/AddShoe';
import Home from './Components/Home/Home';
import EditShoe from './Components/EditShoe/EditShoe';
import Cart from './Components/Cart/Cart';
import Header from './Components/Header/Header';
function App() {
  return (
    <>
      <div>
        <Header/>
        <Routes>
           <Route path="/" element={<Home />} /> 
           <Route path="/Home" element={<Home />} /> 
           <Route path="/Cart" element={<Cart />}/>
          <Route path="/EditShoe" element={<EditShoe />}>
          <Route path=":id" element={<EditShoe />} />
         
        </Route>
        <Route path="/AddShoe" element={<AddShoe />} />
          
           {/* <Route path="/edit"
           render={(props)=>(
            <EditShoe {...props} 
           )} */}
        
       
        </Routes>
      </div>
    </>
  )
}

export default App
