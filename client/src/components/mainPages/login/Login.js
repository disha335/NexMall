import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Snackbar from '../utils/snackbar/Snackbar';
import axios from 'axios';
import './loginStyle.css';

const Login = () => {

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const [snackbar, setSnackbar] = useState({ 
      isOpen: false,
      message: '',
      severity: 'info'
    });

  const onChangeInput = e => {
      const {name, value} = e.target;
      setUser({...user, [name]: value});
  }
  
  const loginSubmit = async e => {
    e.preventDefault();
    try{
        await axios.post('/user/login', {...user});
        localStorage.setItem('firstLogin', true);
        setSnackbar({isOpen: true, message: 'Login Successful', severity: 'success'})
        setTimeout(() => (window.location.href = '/'), 2000);
    }
    catch(err){
      setSnackbar({ isOpen: true, message: err.response.data.msg || 'Login failed', severity: 'error' });
    }
  }

  return (
    <div className='login-page'>
      <form className='login-form' onSubmit={loginSubmit}>

      <div className="logo-container">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIKXlyn9O0WfT4b7URDD0ROSJ2WwY97an4vg&s"
          alt="Logo"
          className="logo"
        />
        <h1 className="product-name">NexMall</h1>
      </div>
      <div className='input-container'>
        <input type='email' name='email' placeholder='Email' value={user.email} required onChange={onChangeInput}/>
      </div>

      <div className='input-container'>
        <input type='password' name='password' placeholder='Password' value={user.password} required onChange={onChangeInput} />
      </div>

        <div className='row'>
          <button type='submit' className='login-btn'>Login</button>
          <p>Don't have an account? <Link to='/register' className='register-link'>Sign Up</Link></p>
        </div>

      </form>

      <Snackbar
        message={snackbar.message}
        severity={snackbar.severity}
        isOpen={snackbar.isOpen}
        onClose={() => setSnackbar({ ...snackbar, isOpen: false })}
      />

    </div>
  )
}

export default Login
