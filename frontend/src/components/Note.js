import axios from 'axios';
import React from 'react'
import { BsPinFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

function Note({ note, token, setDeletestatus, setShowmodal }) {


    console.log("Note Date: " + note.createAt);

    const handleEditNote = async () => {
        setDeletestatus(prevstate => !prevstate);
        setShowmodal(true);
        //handle edit note

    }

    //delete notes
    const handleDeleteNote = async () => {
        try {
            setDeletestatus((prevstate) => !prevstate);
            console.log("deleting....");
            const noteid = note._id;
            const url = `http://localhost:3012/api/notes/delete-note/${noteid}`
            const res = await axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res);

        } catch (error) {
            console.log(error.message + "in handlelDelete Note..");
        }
    }


    //to convert the date into structed format
    const isoString = note.createAt;

    // Create a new Date object from the ISO string
    const date = new Date(isoString);

    // Get the year, month, and day
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = date.getDate().toString().padStart(2, '0');

    // Format the date as YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}`;



    return (
        <div className='note'>
            <h5 className='title'> {note.title}</h5>
            <div className='date-pin-div'>
                {/* <p className='date'>{note.date}</p> */}
                <p>You created At: </p>
                <small className='data'>{formattedDate}</small>
                {/* <BsPinFill className='pin-btn' /> */}
            </div>
            <p className='content'>
                {note.content}
            </p>
            <div className='tags-edit-del-div'>
                {/* <p className='tags'>{note.tags[0]}</p> */}
                <div className='tags'>
                    {
                        note.tags.map((tag) => {
                            return <span className='tag'>#{tag}  </span>
                        })
                    }
                </div>
                <div className='note-btns'>
                    <Link to={`/editnote/${note._id}`} > <FaEdit className='edit-btn' onClick={handleEditNote}  /> </Link>
                    <MdDelete className='del-btn' onClick={handleDeleteNote}   />
                </div>
            </div>
        </div>
    )
}

export default Note




















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