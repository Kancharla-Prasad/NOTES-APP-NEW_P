import react, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import LoginNavbar from '../components/LoginNavbar';
import { validateEmail } from '../utilities/ValidateEmail';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const[error,setError]  = useState();
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    //function to handle register
    const handleRegister = async (e) => {

        e.preventDefault();
        console.log("Registering....");
        if(!name || !email || !password){
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
        const url = "http://localhost:3012/api/users/register";
        const data = { name, email, password }
        await axios.post(url, data).then((res) => {console.log(res)
            navigate("/login");
        })
        .catch((err) => setError("User Already Exists.."));
    }


    return (
        <section className='register-section'>
          <LoginNavbar />
            <div className='login-form-container'>
            <form className='login-form' >
              <h1>Sign Up</h1>
         
                {error &&  <p className='error'>{error}</p> }
                <input type='text' value={name} placeholder='name' onChange={(e) => setName(e.target.value)} />
                <input type='email' value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                <input type='password' value={password} placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                <button type='submit' onClick={handleRegister}>Register</button>
                <small>Already Registered ? <Link to='/login'>Login</Link></small>
            </form>
            </div>


        </section>
    );
}

export default Register;
