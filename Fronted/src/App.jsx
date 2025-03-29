import React from 'react'

import Navbar from './component/Navbar'
import { Route, Routes } from 'react-router-dom'
import Login from './component/authentication/Login'
import Register from './component/authentication/Register'
import Home from './component/Home'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      
      </Routes>
    </div>
  )
}

export default App
