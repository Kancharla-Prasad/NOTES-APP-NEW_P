import React, { useEffect } from 'react'
import { useState } from 'react'
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Editnote() {

    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState();
    const [note, setNote] = useState({});
    const { noteid } = useParams();
    console.log(noteid + "noteid");
    // const [token, setToken] = useState();
    const [editstatus, setEditstatus] = useState(false);
    const navigate = useNavigate();
    // const token = localStorage.getItem('token');
    // console.log("Token: "+token);

    //Related to tags
    const addNewTag = () => {
        console.log(tag);
        if (tag === "")
            return;
        else if(tag.trim() !== "") {
            setTags([...tags, tag.trim()]);
            setTag(" ");
        }
    }
    const removeTag = (newTag) => {
        // console.log("hello pras"+newTag);
        const newTags = tags.filter((mytag, index) => { return mytag !== newTag });
        setTags(newTags);
    }


    const closeModal = () => {

    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        const getNoteData = async () => {
            try {
                //
                console.log("Token in getNOdeData: "+token);
                const url = `http://localhost:3012/api/notes/getnote/${noteid}`;
                const res = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(res);
                setNote(res.data.Data);
                setTitle(res.data.Data.title);
                console.log("note.title" + title);
                setContent(res.data.Data.content);
                setTag(res.data.Data.tags);
                console.log('Mytag: ' + title);
            } catch (error) {
                console.log(error.message + " in getNoteData function")
            }
        }
        getNoteData();


    }, []);





    //const 
    const handleEditNote = async () => {
        const token = localStorage.getItem('token');
        console.log("hello " + token);
        const data = {
            title, content, tags
        }

        try {
            //
            const url = `http://localhost:3012/api/notes/edit-note/${noteid}`;
            const res = await axios.put(url, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res);
            navigate("/");

        } catch (error) {
            console.log(error.message + "In handleEditNote function..")
        }
    }

    //addnewnote function


    const setShowmodal = () => {
        //
    }




    return (
        <div className='modal-wrapper'>
            <div className='modal-div'>
                <div className='modal-header'>
                    <h1 className='modal-heading' >Edit Note  </h1>
                    <IoMdClose style={{
                        display: "block",
                        fontSize: "35px",
                        cursor: "pointer"
                    }} onClick={() => navigate("/")} />
                </div>
                <div >
                    <label className='modal-label'>Title</label>
                    <br />
                    <input type='text' className='modal-title' value={title} onChange={(e) => { setTitle(e.target.value) }} />
                </div>
                <div>
                    <label className='modal-label'>Content</label>
                    <br />
                    <textarea
                        rows={5}
                        className='modal-content'
                        value={content} onChange={(e) => { setContent(e.target.value) }}
                    />
                </div>
                <div>
                    <label className='modal-label'>Tags:</label><br />
                    <div className='added-tags'>
                        {
                            tags.length > 0 && tags.map((myTag, index) => {
                                return <p key={index} className='tag-list'>
                                    <span> #{myTag} </span>
                                    <IoMdClose onClick={() => removeTag(myTag)} className='remove-tag-btn' />
                                </p>
                            })
                        }
                    </div>
                </div>
                <div className='tag-div'>
                    <input type='text' value={tag} className='modal-tag' onChange={(e) => { setTag(e.target.value) }} />
                    <button className='tag-btn' onClick={addNewTag}>
                        <FaPlus />
                    </button>
                </div>
                <button type='button' className='modal-add-btn' onClick={handleEditNote}>Edit</button>
            </div>
        </div>
    )
}

export default Editnote
