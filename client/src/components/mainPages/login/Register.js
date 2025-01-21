import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import api from '../../../api';

const Register = () => {

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const onChangeInput = e => {
      const {name, value} = e.target;
      setUser({...user, [name]: value});
  }
  
  const registerSubmit = async e => {
    e.preventDefault();
    try{
        await api.post('/user/register', {...user})
        localStorage.setItem('firstRegister', true)
        window.location.href = '/'
    }
    catch(err){
      alert(err.response.data.msg);
    }
  }

  return (
    <div className='register-page'>
      <form className='register-form' onSubmit={registerSubmit}>
        <div className="logo-container">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIKXlyn9O0WfT4b7URDD0ROSJ2WwY97an4vg&s"
            alt="Logo"
            className="logo"
          />
          <h1 className="product-name">NexMall</h1>
        </div>

        <div className='input-container'>
            <input type='text' name='name' placeholder='name' value={user.name} onChange={onChangeInput} required />
        </div>

        <div className='input-container'>
            <input type='email' name='email' placeholder='Email' value={user.email} onChange={onChangeInput} required/>
        </div>

        <div className='input-container'>
            <input type='password' name='password' placeholder='Password' value={user.password} onChange={onChangeInput} required />
        </div>

        <div className='row'>
          <button type='submit' className='regsiter-btn'>Register</button>
          <p>Already have a account ? <Link className='login-link' to='/login'>Log In</Link></p>
        </div>

      </form>
    </div>
  )
}

export default Register
