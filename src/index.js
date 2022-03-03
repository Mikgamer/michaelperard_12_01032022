import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import { NavTop, NavLeft } from './Nav'
import Dashboard from './Dashboard'

ReactDOM.render(
  <React.StrictMode>
    <NavTop />
    <main>
      <NavLeft />
      <Dashboard />
    </main>
  </React.StrictMode>,
  document.getElementById('root')
);
