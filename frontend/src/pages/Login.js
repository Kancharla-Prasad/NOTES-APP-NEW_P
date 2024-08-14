import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import LoginNavbar from '../components/LoginNavbar'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { validateEmail } from '../utilities/ValidateEmail';
// import { set } from 'mongoose';

function Login() {
  const [email, setEmail] = useState('');
  const[error,setError] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  //function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login....");
    if(!email || !password){
      setError("Credentials must be Required...");
      return;
    }
    if(!validateEmail(email)){
      setError("Enter the correct email");
      return;
    }

    if(password.length < 5)
    {
      setError("Password Min length will be 5");
      return;
    }
    const url = "http://localhost:3012/api/users/login";
    const data = { email, password };
    try {
      const res = await axios.post(url, data);
      console.log(res.data);
      const token = res.data.token;
      if (token) {
        console.log(token);
        localStorage.setItem('token', token);
        console.log("Successfully set the token...");
        navigate('/');
      } else {
        console.error("Token is undefined or null.");
        setError("Invalid Credentials....");
      }
    } catch (err) {
      console.error("Error during login:", err);
    }
  }


  
  return (
    <section className='login-section'>
      <LoginNavbar />
      <div className='login-form-container'>

        <form onSubmit={handleLogin} className='login-form'>
          <h1>Login</h1>
         { error && <p className='error'>{error}</p> }
          <input type='email' value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)}  />
          <input type='password' value={password} placeholder='password' onChange={(e) => setPassword(e.target.value)} 
          />
          <button type='submit'>Login</button>
          <small>Not Registerd Yet ?  <Link to='/register'> Sign up</Link></small>
        </form>
      </div>
    </section>
  )
}

export default Login
