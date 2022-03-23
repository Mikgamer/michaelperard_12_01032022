import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import { NavTop, NavLeft } from './Nav'
import Dashboard from './Dashboard'

import './styles/index.css'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/user/:id" element={ 
          <>
            <NavTop />
            <main>
              <NavLeft />
              <Dashboard />
            </main>
          </>
        } />
        <Route path="*" element={ <Navigate to="/user/12" /> } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
