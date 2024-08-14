import react, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    //function to handle register
    const handleRegister = async (e) => {
        e.preventDefault();
        console.log("Registering....");
        const url = "http://localhost:3012/api/users/register";
        const data = { name, email, password }
        await axios.post(url, data).then((res) => {console.log(res)
            navigate("/login");
        })
            .catch((err) => alert("User Already Exists.."));
    }


    return (
        <>
            <form ><br /><br /><br />
                <input type='text' value={name} placeholder='name' onChange={(e) => setName(e.target.value)} /><br />
                <input type='email' value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)} /><br />
                <input type='password' value={password} placeholder='password' onChange={(e) => setPassword(e.target.value)} /><br />
                <button type='submit' onClick={handleRegister}>Register</button>
            </form>


        </>
    );
}

export default Register;
