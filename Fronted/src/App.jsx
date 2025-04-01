import React from 'react'

import Navbar from './component/Navbar'
import { Route, Routes } from 'react-router-dom'
import Login from './component/authentication/Login'
import Register from './component/authentication/Register'
import Home from './component/Home'
import PrivacyPolicy from './component/PrivacyPolicy'
import TermsAndServices from './component/TermsAndServices'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/termsofService" element={< TermsAndServices/>} />
      
      </Routes>
    </div>
  )
}

export default App
