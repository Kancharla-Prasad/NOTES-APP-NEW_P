import React from 'react'
import { IoMdHappy } from "react-icons/io";
import Note from './Note';
function Notesdisplay({ notes,token,setDeletestatus,setShowmodal}) {
    return (
        <div className='notes-display'>
            {/* <h1>hlelo prasad</h1> */}
            {
                notes.length === 0 ? <div className='no-notes'><h1><IoMdHappy  className='emoji'/>No notes available..<IoMdHappy className='emoji'/></h1></div> : (
                    notes.map((note) => {
                        return <Note note={note} token={token} setDeletestatus={setDeletestatus} setShowmodal={setShowmodal}/>
                    })
                )
            }
        </div>
    )
}

export default Notesdisplay
