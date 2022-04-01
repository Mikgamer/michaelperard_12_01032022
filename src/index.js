import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import { NavTop, NavLeft } from './Nav'
import Dashboard from './Dashboard'

import './styles/index.css'

/**
 * Navigation 
 * 
 * @return {ReactElement} Return the user profile page 
 */
const Navigation = () => <>
                           <NavTop />
                           <main>
                             <NavLeft />
                             <Dashboard />
                           </main>
                         </>

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/user/:id" element={ <Navigation /> } />
        <Route path="*" element={ <Navigate to="/user/12" /> } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
