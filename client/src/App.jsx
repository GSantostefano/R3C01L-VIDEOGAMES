import { useState } from 'react';
import {Route,Routes, useLocation} from "react-router-dom";
import  "./App.css";
import Home from "./views/HomePage/HomePage";
import FormPage from "./views/FormPage/FormPage";
import Detail from './views/DetailPage/DetailPage';
import Landing from './views/LandingPage/LandingPage';
import Nav from "./components/Nav/Nav";

function App() {
  const {pathname} = useLocation();
  
  return (
    
      <div className="App">
      {pathname!=="/home" && <Nav />}
      <Routes>
      <Route path="/" element={ <Landing /> } />      
      <Route exact path="/home" element={<Home/>}/>
      <Route path="/id/:id" element={<Detail/>}/>
      <Route path="/form" element={<FormPage/>}/>
      </Routes>
      </div>
  )
}

export default App
