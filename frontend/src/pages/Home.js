import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Aboutnotes from '../components/Aboutnotes';
// import Portfolio from '../components/Portfolio';
import { FaPlus } from "react-icons/fa";

import axios from 'axios';
import Notesdisplay from '../components/Notesdisplay';
import Addnotemodal from '../components/Addnotemodal';

function Home() {

  const [token, setToken] = useState();
  const [username, setUsername] = useState();
  const [notes, setNotes] = useState([]);
  const [showModal, setShowmodal] = useState(false);
  const [deleteStatus, setDeletestatus] = useState(false);
  const [logoutStatus, setLogoutstatus] = useState(false);
  const [searchquery, setSearchquery] = useState('');

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  // }

  console.log(localStorage.getItem('token') + " IN HomE.js");
  useEffect(() => {
    setToken(localStorage.getItem('token'));

    console.log(token + "in Home .js");
    if (token) {
      const getUserData = async () => {
        const url = "http://localhost:3012/api/users/myprofile"
        try {

          const res = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })

          console.log(res.data.User.name);
          setUsername(res.data.User.name);
        } catch (err) {
          console.log("Error while fethcing the user data(dashbord.js)" + err.message);
        }
      }
      getUserData();
    }
    else {
      console.log("Token is undefined or nulll check once..");
    }



    //to get all notes
    const getAllNotes = async () => {
      console.log("I am in get all notes...");
      try {
        const url = "http://localhost:3012/api/notes/get-all-notes";

        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        // console.log(res);
        console.log(res.data.Data);
        setNotes(res.data.Data);
        // setNotes(res.data.Data);
      } catch (error) {
        console.log(error.message);
      }
    }
    getAllNotes();


    //get search notes
    // if (searchquery) {

    //   console.log("Hey your are searching something..");
    //   const searchedNotes = notes.filter((note) => {
    //     return note.title.toLowerCase().includes(searchquery.toLowerCase()) || note.content.toLowerCase().includes(searchquery.toLowerCase());
    //   })


    //   setNotes(searchedNotes);
    // }
    // else
    //   getAllNotes();


    //delting notes

    // console.log(note);
    // const noteid = note._id;
    // const handleDeleteNote = async()=>{
    //     try {
    //         console.log("deleting....");
    //         const url = `http://localhost:3012/api/notes/delete-note/${noteid}`
    //         const res = await axios.delete(url,{
    //             headers: {
    //               Authorization: `Bearer ${token}`
    //             }
    //           })
    //         console.log(res);
    //     } catch (error) {
    //         console.log(error.message+"in Handle Delete Note..")
    //     }
    // }
    

  }, [token, showModal, deleteStatus, logoutStatus, searchquery])

  const handleSearch = () => {
    //
    console.log("searching...");
    const searchedNotes = notes.filter((note) => {
      return note.title.toLowerCase().includes(searchquery.toLowerCase()) || note.content.toLowerCase().includes(searchquery.toLowerCase());
    })
    setNotes(searchedNotes);
  }


  //when clicking search btn
  

  return (
    <>
      <section className='home-section'>
        <Navbar token={token} setToken={setToken} username={username} setLogoutstatus={setLogoutstatus} searchquery={searchquery} setSearchquery={setSearchquery} handleSearch={handleSearch} />
        {token === null ? <Aboutnotes /> : <Notesdisplay notes={notes} token={token} setDeletestatus={setDeletestatus} setShowmodal={setShowmodal} />}

      </section>
      {token && <button className='addBtn' onClick={(e) => setShowmodal(true)}> <FaPlus /> </button>}

      {showModal && <Addnotemodal token={token} setShowmodal={setShowmodal} />}



    </>
  )
}

export default Home
