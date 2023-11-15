import {BrowserRouter,  Route, Routes } from "react-router-dom";
import Home from "../Home/Home"
import CakeDetail from "../CakeDetail/CakeDetail"
import { ThemeProvider} from '../ThemeContext';
import React, { Component,useEffect,useState } from "react";

import ProtectedRoute from "./ProtectedRoute";
import SignIn from "../SignIn/SignIn";



const Router = () => {

    

    return <BrowserRouter>
        <Routes>
            <Route element={<SignIn />} path='/'/>
            <Route element={<Home />} path='/cake'/>
            <Route element={<CakeDetail />} path='/cake/:id'/>
            <Route path='*' element={<div>Not Found</div>}/>
        </Routes>
    
    </BrowserRouter>
}
export default Router