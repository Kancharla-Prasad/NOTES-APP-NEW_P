import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { resolvePath } from 'react-router-dom';

// function Dashbord() {
//     const [notes, setNotes] = useState([]);
//     useEffect(() => {
//         console.log("I am the useffect");
//         const token = localStorage.getItem('token');

//         //fetching the user details
//         if (token !== null) {


//             const getUserData = async () => {

//                 const url = "http://localhost:3012/api/users/myprofile"
//                 try {

//                     const res = await axios.get(url, {
//                         headers: {
//                             Authorization: `Bearer ${token}`
//                         }
//                     })

//                     console.log(res.data);
//                 } catch (err) {
//                     console.log("Error while fethcing the user data(dashbord.js)" + err.message);
//                 }
//             }
//             getUserData();

//             //getallnotes
//             const getAllNotes = async () => {
//                 console.log("I am in get all notes...");
//                 try {
//                     const url = "http://localhost:3012/api/notes/get-all-notes";

//                     const res = await axios.get(url, {
//                         headers: {
//                             Authorization: `Bearer ${token}`
//                         }
//                     })

//                     // console.log(res);
//                     console.log(res.data.Data);
//                     setNotes(res.data.Data);
//                 } catch (error) {
//                     console.log(error.message);
//                 }
//             }
//             getAllNotes();

//         }

//     }, [])
//     return (
//         <div>
//             <h1> Hey prasad are you kancharla </h1>
//             <h1>Token: { localStorage.getItem('token') !== null?localStorage.getItem('token').substring(0, 10):"Authorize karo bhai"}</h1>

//             {
//                 notes.map((note) => {
//                     return <div>
//                         <h1>{note.title}</h1>
//                         <p>{note.content}</p>
//                         <p>{note.tags[0]}</p>
//                     </div>
//                 })
//             }
//         </div>
//     )
// }

export default Dashbord
