import React from 'react'
import Login from './components/mainPages/login/Login'
import Register from './components/mainPages/login/Register'
import {Route, Routes} from 'react-router-dom'


const LoginRegister = () => {
  return (
    <div>
    <Routes>
      <Route path='/login' element={<Login/> }></Route>
      <Route path='/register' element={<Register/> }></Route>
    </Routes>
    </div>
  )
}

export default LoginRegister
