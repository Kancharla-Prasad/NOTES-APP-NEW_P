import logo from './logo.svg';
import React, { useState } from 'react'
import axios from 'axios';
// import Login from './Login';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    //function to handle register
    const handleLogin = async (e) => {
      e.preventDefault();
      console.log("Login....");
      const url = "http://localhost:3012/api/users/login";
      const data = { email, password }
      await axios.post(url, data)
      .then((res)=>{
        console.log(res.data);
        console.log(res.data.token);
        localStorage.setItem('token',res.data.token);
        console.log("successfully Set the token...");
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    return (
  
      <form onSubmit={handleLogin}><br /><br /><br />
        <input type='email' value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)} /><br />
        <input type='password' value={password} placeholder='password' onChange={(e) => setPassword(e.target.value)} /><br />
        <button type='submit'>Login</button>
      </form>
    );
}

export default Login
